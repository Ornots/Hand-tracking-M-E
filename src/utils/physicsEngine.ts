import Matter from 'matter-js';
import { AppSettings, SmoothedHand } from '../types';

export class PhysicsPlayground {
  private engine: Matter.Engine;
  private world: Matter.World;
  private runner: Matter.Runner | null = null;
  private boundaries: Matter.Body[] = [];
  
  // Store a kinematic body for each active hand (using palmCenter)
  private handBodies: Map<number, Matter.Body> = new Map();
  // Constraints for grabbed objects
  private grabConstraints: Map<number, Matter.Constraint> = new Map();

  private canvasWidth: number = 0;
  private canvasHeight: number = 0;
  public isInitialized: boolean = false;

  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 1.0;
  }

  public init(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.isInitialized = true;
    
    // Clear old bodies
    Matter.World.clear(this.world, false);
    this.handBodies.clear();
    this.grabConstraints.clear();
    
    // Create boundaries (walls, floor)
    const thickness = 60;
    this.boundaries = [
      Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, { isStatic: true, friction: 0.8 }), // Floor
      Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, { isStatic: true, friction: 0.2 }), // Left wall
      Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, { isStatic: true, friction: 0.2 }), // Right wall
    ];
    Matter.World.add(this.world, this.boundaries);

    // Add some initial fun objects
    this.spawnBox(width / 2, height / 2 - 200, 60, '#9333ea');
    this.spawnCircle(width / 2 - 100, height / 2 - 300, 40, '#06b6d4');
    this.spawnPolygon(width / 2 + 100, height / 2 - 150, 50, 5, '#f59e0b');
  }

  public spawnBox(x: number, y: number, size: number, color: string) {
    const box = Matter.Bodies.rectangle(x, y, size, size, { 
      restitution: 0.6, 
      friction: 0.1,
      render: { fillStyle: color }
    });
    Matter.World.add(this.world, box);
  }

  public spawnCircle(x: number, y: number, radius: number, color: string) {
    const circle = Matter.Bodies.circle(x, y, radius, { 
      restitution: 0.8,
      friction: 0.05,
      render: { fillStyle: color }
    });
    Matter.World.add(this.world, circle);
  }

  public spawnPolygon(x: number, y: number, radius: number, sides: number, color: string) {
    const poly = Matter.Bodies.polygon(x, y, sides, radius, {
      restitution: 0.5,
      friction: 0.2,
      render: { fillStyle: color }
    });
    Matter.World.add(this.world, poly);
  }

  public updateAndRender(ctx: CanvasRenderingContext2D, hands: SmoothedHand[], settings: AppSettings) {
    // 1. Step the physics engine at 60 FPS
    Matter.Engine.update(this.engine, 1000 / 60);

    // 2. Out-of-bounds protection: Teleport objects falling or flying off screen
    const allBodies = Matter.Composite.allBodies(this.world);
    allBodies.forEach(body => {
      if (!body.isStatic && !this.boundaries.includes(body)) {
        if (
          body.position.y > this.canvasHeight + 150 ||
          body.position.x < -150 ||
          body.position.x > this.canvasWidth + 150 ||
          body.position.y < -300
        ) {
          Matter.Body.setPosition(body, {
            x: this.canvasWidth / 2 + (Math.random() * 120 - 60),
            y: 80,
          });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        }
      }
    });

    // 3. Synchronize Hand Bodies & Remove Disappeared Hands
    const currentHandIds = new Set(hands.map(h => h.id));

    // Instant cleanup of hands that are no longer detected
    for (const [id, body] of this.handBodies.entries()) {
      if (!currentHandIds.has(id)) {
        Matter.World.remove(this.world, body);
        this.handBodies.delete(id);
        
        const constraint = this.grabConstraints.get(id);
        if (constraint) {
          Matter.World.remove(this.world, constraint);
          this.grabConstraints.delete(id);
        }
      }
    }

    // Update or create physics bodies for current hands
    hands.forEach(hand => {
      let handBody = this.handBodies.get(hand.id);
      const handRadius = Math.max(25, 45 * settings.effectScale);

      if (!handBody) {
        handBody = Matter.Bodies.circle(hand.palmCenter.x, hand.palmCenter.y, handRadius, {
          isStatic: true,
          friction: 0.6,
          restitution: 0.4,
          render: { fillStyle: 'transparent' }
        });
        this.handBodies.set(hand.id, handBody);
        Matter.World.add(this.world, handBody);
      } else {
        // Move kinematic body and assign real physical velocity so striking objects imparts momentum
        Matter.Body.setPosition(handBody, { x: hand.palmCenter.x, y: hand.palmCenter.y });
        Matter.Body.setVelocity(handBody, { x: hand.velocity.vx * 2.0, y: hand.velocity.vy * 2.0 });
      }

      // 4. Handle Grabbing (Pinch) with Throw Mechanics
      const isPinching = hand.isThumbIndexActive;
      const constraint = this.grabConstraints.get(hand.id);

      if (isPinching && !constraint) {
        const pinchPos = { x: hand.thumbIndexCenter.x, y: hand.thumbIndexCenter.y };
        const dynamicBodies = Matter.Composite.allBodies(this.world).filter(b => !b.isStatic && !this.handBodies.has(b.id));

        let closestBody: Matter.Body | null = null;
        let minDistance = 120; // Grab reach radius

        for (const body of dynamicBodies) {
          const dist = Math.hypot(body.position.x - pinchPos.x, body.position.y - pinchPos.y);
          const isInside = Matter.Query.point([body], pinchPos).length > 0;
          if (isInside || dist < minDistance) {
            minDistance = dist;
            closestBody = body;
          }
        }

        if (closestBody) {
          const newConstraint = Matter.Constraint.create({
            bodyA: handBody,
            bodyB: closestBody,
            pointA: { x: pinchPos.x - hand.palmCenter.x, y: pinchPos.y - hand.palmCenter.y },
            pointB: { x: 0, y: 0 },
            stiffness: 0.85,
            damping: 0.1,
            length: 0,
            render: { visible: true, strokeStyle: '#c084fc', lineWidth: 3 }
          });
          Matter.World.add(this.world, newConstraint);
          this.grabConstraints.set(hand.id, newConstraint);
        }
      } else if (!isPinching && constraint) {
        // Release object and impart throwing impulse based on hand velocity
        if (constraint.bodyB) {
          Matter.Body.setVelocity(constraint.bodyB, {
            x: hand.velocity.vx * 2.5,
            y: hand.velocity.vy * 2.5,
          });
          Matter.Body.setAngularVelocity(constraint.bodyB, (Math.random() - 0.5) * 0.2);
        }
        Matter.World.remove(this.world, constraint);
        this.grabConstraints.delete(hand.id);
      } else if (isPinching && constraint) {
        constraint.pointA = {
          x: hand.thumbIndexCenter.x - hand.palmCenter.x,
          y: hand.thumbIndexCenter.y - hand.palmCenter.y,
        };
      }
    });

    // 5. Render Physics Objects & Cyber Tethers
    this.renderCustom(ctx);
  }

  private renderCustom(ctx: CanvasRenderingContext2D) {
    const bodies = Matter.Composite.allBodies(this.world);
    const constraints = Matter.Composite.allConstraints(this.world);

    ctx.save();
    
    // Draw Constraints (Laser beams for grabbed objects)
    constraints.forEach(c => {
      if (!c.bodyA || !c.bodyB) return;
      const p1 = { x: c.bodyA.position.x + c.pointA.x, y: c.bodyA.position.y + c.pointA.y };
      const p2 = { x: c.bodyB.position.x + c.pointB.x, y: c.bodyB.position.y + c.pointB.y };
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = c.render?.strokeStyle as string || '#9333ea';
      ctx.lineWidth = c.render?.lineWidth || 3;
      ctx.stroke();
    });

    // Draw Bodies
    bodies.forEach(body => {
      // Don't draw the invisible boundaries or hand proxy bodies
      if (body.render?.fillStyle === 'transparent' || this.boundaries.includes(body)) return;

      ctx.beginPath();
      const vertices = body.vertices;
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let j = 1; j < vertices.length; j++) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      
      ctx.fillStyle = body.render?.fillStyle as string || '#ffffff';
      
      // Cyberpunk glow
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 15;
      
      ctx.fill();
      
      // Wireframe outline
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
      ctx.shadowBlur = 0; // reset
    });

    ctx.restore();
  }
}
