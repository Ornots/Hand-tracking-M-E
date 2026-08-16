import { Particle } from '../types';

export class CircleParticleSystem {
  private particles: Particle[] = [];
  private maxParticles = 220;

  public setMaxParticles(limit: number) {
    this.maxParticles = limit;
  }

  // 1. Partículas orbitais ao redor da mandala / círculo
  public emitOrbitalSparks(cx: number, cy: number, radius: number, primaryColor: string, secondaryColor: string, count: number = 2) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.85 + Math.random() * 0.35);
      const isWhite = Math.random() > 0.4;

      this.particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
        size: Math.random() * 3 + 1.5,
        color: isWhite ? '#ffffff' : (Math.random() > 0.5 ? primaryColor : secondaryColor),
        alpha: 0.95,
        decay: 0.025 + Math.random() * 0.02,
        life: 1.0,
        maxLife: 1.0,
        angle,
        radius: r,
        orbitSpeed: (Math.random() * 0.06 + 0.04) * (Math.random() > 0.5 ? 1 : -1),
        type: 'spark',
      });
    }
  }

  // 2. Partículas na linha de conexão entre Indicador e Polegar (com transição de cor no meio)
  public emitBeamEnergy(p1: { x: number; y: number }, p2: { x: number; y: number }, primaryColor: string, secondaryColor: string, count: number = 3) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const distFromCenter = Math.abs(t - 0.5) * 2; 

      const perpAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2;
      const offset = (Math.random() - 0.5) * 16 * (1 - distFromCenter);

      const px = p1.x + (p2.x - p1.x) * t + Math.cos(perpAngle) * offset;
      const py = p1.y + (p2.y - p1.y) * t + Math.sin(perpAngle) * offset;

      const isMiddle = distFromCenter < 0.45;
      const color = isMiddle ? primaryColor : (distFromCenter < 0.75 ? secondaryColor : '#ffffff');

      this.particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3.5 + 1.5,
        color,
        alpha: 0.95,
        decay: 0.035 + Math.random() * 0.02,
        life: 1.0,
        maxLife: 1.0,
        type: 'spark',
      });
    }
  }

  // 3. Faíscas holográficas nos 4 cantos da fenda
  public emitFendaCornerSparks(px: number, py: number, primaryColor: string, secondaryColor: string) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < 2; i++) {
      this.particles.push({
        x: px + (Math.random() - 0.5) * 8,
        y: py + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 2.0,
        vy: (Math.random() - 0.5) * 2.0,
        size: Math.random() * 2.5 + 1.2,
        color: Math.random() > 0.4 ? '#ffffff' : (Math.random() > 0.5 ? primaryColor : secondaryColor),
        alpha: 0.9,
        decay: 0.045,
        life: 1.0,
        maxLife: 1.0,
        type: 'spark',
      });
    }
  }

  // 4. Faíscas ao redor do Mega Escudo Mágico
  public emitMegaShieldSparks(cx: number, cy: number, radius: number, primaryColor: string, secondaryColor: string) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.9 + Math.random() * 0.2);
      this.particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: Math.cos(angle) * (Math.random() * 2 + 1),
        vy: Math.sin(angle) * (Math.random() * 2 + 1),
        size: Math.random() * 4 + 1.5,
        color: Math.random() > 0.5 ? '#ffffff' : (Math.random() > 0.5 ? primaryColor : secondaryColor),
        alpha: 0.95,
        decay: 0.03,
        life: 1.0,
        maxLife: 1.0,
        type: 'spark',
      });
    }
  }

  // 5. Faíscas holográficas nas bordas do visor retangular
  public emitFrameSparks(minX: number, minY: number, maxX: number, maxY: number, primaryColor: string, count: number = 2) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < count; i++) {
      const edge = Math.floor(Math.random() * 4);
      let px = minX;
      let py = minY;

      if (edge === 0) { // Topo
        px = minX + Math.random() * (maxX - minX);
        py = minY;
      } else if (edge === 1) { // Direita
        px = maxX;
        py = minY + Math.random() * (maxY - minY);
      } else if (edge === 2) { // Base
        px = minX + Math.random() * (maxX - minX);
        py = maxY;
      } else { // Esquerda
        px = minX;
        py = minY + Math.random() * (maxY - minY);
      }

      this.particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 2.5 + 1,
        color: Math.random() > 0.4 ? '#ffffff' : primaryColor,
        alpha: 0.9,
        decay: 0.04,
        life: 1.0,
        maxLife: 1.0,
        type: 'spark',
      });
    }
  }

  // 6. Anel de onda de choque ao trocar de filtro (Sinal de V)
  public emitFilterSwitchRipple(cx: number, cy: number, color: string) {
    for (let i = 0; i < 3; i++) {
      this.particles.push({
        x: cx,
        y: cy,
        vx: 0,
        vy: 0,
        size: 3 - i * 0.5,
        color,
        alpha: 0.9 - i * 0.2,
        decay: 0.03,
        life: 1.0,
        maxLife: 1.0,
        radius: 20 + i * 30,
        type: 'ring',
      });
    }
  }

  // 7. Faíscas de Impacto e Dispersão de Laser
  public emitLaserImpactSparks(x: number, y: number, primaryColor: string, secondaryColor: string, count: number = 3) {
    if (this.particles.length >= this.maxParticles) return;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.2,
        color: Math.random() > 0.5 ? '#ffffff' : (Math.random() > 0.5 ? primaryColor : secondaryColor),
        alpha: 1.0,
        decay: 0.05 + Math.random() * 0.03,
        life: 1.0,
        maxLife: 1.0,
        type: 'spark',
      });
    }
  }

  // 8. Partículas do Feixe Direcional Contínuo (Mão Disparadora)
  public emitBeamTrail(startX: number, startY: number, endX: number, endY: number, primaryColor: string) {
    if (this.particles.length >= this.maxParticles) return;

    const t = Math.random();
    const px = startX + (endX - startX) * t;
    const py = startY + (endY - startY) * t;

    this.particles.push({
      x: px + (Math.random() - 0.5) * 6,
      y: py + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.4 ? '#ffffff' : primaryColor,
      alpha: 0.9,
      decay: 0.04,
      life: 1.0,
      maxLife: 1.0,
      type: 'spark',
    });
  }

  public update(width: number, height: number) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);

      if (p.type === 'ring') {
        p.radius = (p.radius || 10) + 8;
      } else if (p.radius !== undefined && p.angle !== undefined && p.orbitSpeed !== undefined) {
        p.angle += p.orbitSpeed;
        p.radius = Math.max(8, p.radius * 0.985);
      } else {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
      }

      if (p.life <= 0 || p.x < -40 || p.x > width + 40 || p.y < -40 || p.y > height + 40) {
        this.particles.splice(i, 1);
      }
    }
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.alpha <= 0.01) continue;

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      if (p.type === 'ring') {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = Math.max(1.5, p.size * p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius || 10, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size * p.alpha), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  public clear() {
    this.particles = [];
  }
}
