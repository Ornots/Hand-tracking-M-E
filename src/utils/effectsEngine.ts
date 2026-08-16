import { SmoothedHand, CircleFilter, FendaFilter, AppSettings, FilterInfo, DualHandInteraction, FendaQuad, ColorPaletteTheme } from '../types';
import { CircleParticleSystem } from './particleSystem';
import { PhysicsPlayground } from './physicsEngine';

// Paletas de Cor Pré-definidas para Temas Globais
export const COLOR_PALETTES: Record<ColorPaletteTheme, { name: string; primary: string; secondary: string; glow: string }> = {
  DEFAULT_SIGNATURE: {
    name: 'Cores Padrão (Exclusivas de cada Mago)',
    primary: '#f59e0b',
    secondary: '#fef08a',
    glow: '#b45309',
  },
  DEFAULT_PURPLE: {
    name: 'Púrpura & Branco Astral',
    primary: '#9333ea',
    secondary: '#e9d5ff',
    glow: '#7e22ce',
  },
  CYAN_NEON: {
    name: 'Ciano Elétrico & Glacial',
    primary: '#06b6d4',
    secondary: '#cffafe',
    glow: '#0891b2',
  },
  SOLAR_GOLD: {
    name: 'Ouro Solar & Ambar',
    primary: '#eab308',
    secondary: '#fef08a',
    glow: '#ca8a04',
  },
  CRIMSON_RUBY: {
    name: 'Rubi Escarlate & Fogo Místico',
    primary: '#e11d48',
    secondary: '#fecdd3',
    glow: '#be123c',
  },
  EMERALD_NATURE: {
    name: 'Esmeralda & Jade Astral',
    primary: '#10b981',
    secondary: '#d1fae5',
    glow: '#059669',
  },
  COSMIC_VIOLET: {
    name: 'Violeta Noturno Profundo',
    primary: '#7c3aed',
    secondary: '#ddd6fe',
    glow: '#4c1d95',
  },
  CUSTOM_RGB: {
    name: 'Personalizado (RGB)',
    primary: '#9333ea',
    secondary: '#ffffff',
    glow: '#7e22ce',
  },
};

// 10 MANDALAS - CADA UMA COM SUA PALETA DE CORES ÚNICA E EXCLUSIVA
export const FILTER_METADATA: Record<CircleFilter, FilterInfo> = {
  MYSTIC_MANDALA: {
    id: 'MYSTIC_MANDALA',
    name: '1. Mandala de Kamar-Taj (Dr. Estranho)',
    subtitle: 'Mandala rúnica do Mago Supremo com octagramas dourados e escrita eldritch',
    icon: 'Shield',
    primaryColor: '#f59e0b',    // Dourado/Amber Místico de Kamar-Taj
    secondaryColor: '#fef08a',  // Luz Amarelada Reluzente
    glowColor: '#b45309',       // Brilho Fogo Dourado
  },
  COSMIC_VORTEX: {
    id: 'COSMIC_VORTEX',
    name: '2. Vórtice Cósmico (Adam Warlock)',
    subtitle: 'Vórtice gravitacional de energia quântica violeta e espirais douradas',
    icon: 'Sparkles',
    primaryColor: '#a855f7',    // Púrpura Quântico Cósmico
    secondaryColor: '#fef08a',  // Dourado Estelar
    glowColor: '#581c87',       // Brilho Púrpura Escuro
  },
  PLASMA_CHAKRAM: {
    id: 'PLASMA_CHAKRAM',
    name: '3. Chakram do Caos (Feiticeira Escarlate)',
    subtitle: 'Lâminas de magia do caos de Wanda com tiara mística e tom rubi escarlate',
    icon: 'Zap',
    primaryColor: '#f43f5e',    // Rubi Escarlate Caótico
    secondaryColor: '#fbcfe8',  // Rosa Místico Astral
    glowColor: '#991b1b',       // Brilho Vinho Rubi
  },
  DIMENSIONAL_PORTAL: {
    id: 'DIMENSIONAL_PORTAL',
    name: '4. Portal Sling Ring (Wong)',
    subtitle: 'Anel portal de faíscas estelares e geometria mística do Mago Wong',
    icon: 'Radio',
    primaryColor: '#f97316',    // Laranja Ígneo do Portal Sling Ring
    secondaryColor: '#fef08a',  // Faíscas Amarelas Douradas
    glowColor: '#c2410c',       // Brilho Fogo Laranja
  },
  SACRED_RINGS: {
    id: 'SACRED_RINGS',
    name: '5. Anéis do Destino (Senhor do Destino)',
    subtitle: 'Ankh Sagrado de Nabu com anéis celestes e hieróglifos egípcios',
    icon: 'Disc',
    primaryColor: '#eab308',    // Ouro Divino de Nabu
    secondaryColor: '#38bdf8',  // Azul Celeste Celestial
    glowColor: '#a16207',       // Brilho Âmbar Nobre
  },
  SOLAR_RUNIC_LOTUS: {
    id: 'SOLAR_RUNIC_LOTUS',
    name: '6. Lótus Astral (Anciã / Ancient One)',
    subtitle: 'Lótus de 12 pétalas transcendentais com espirais solares',
    icon: 'Sun',
    primaryColor: '#eab308',    // Amarelo Solar Transcendente
    secondaryColor: '#fef08a',  // Ouro Solar Claro
    glowColor: '#ca8a04',       // Brilho Âmbar Solar
  },
  CYBER_TECH_MATRIX: {
    id: 'CYBER_TECH_MATRIX',
    name: '7. Reator Arc HUD (Homem de Ferro)',
    subtitle: 'Visor tático do Reator Arc cibernético com retículos e vetores táticos',
    icon: 'Cpu',
    primaryColor: '#06b6d4',    // Ciano Elétrico Tático JARVIS
    secondaryColor: '#e0f2fe',  // Branco Glacial Tático
    glowColor: '#0891b2',       // Brilho Ciano Neon
  },
  ETHEREAL_SUPERNOVA: {
    id: 'ETHEREAL_SUPERNOVA',
    name: '8. Supernova de Azarath (Ravena)',
    subtitle: 'Ondas da alma de Azarath Metrion com asas de corvo e diamante de alma',
    icon: 'Flame',
    primaryColor: '#c084fc',    // Ametista Astral Ravena
    secondaryColor: '#f472b6',  // Magenta Alma
    glowColor: '#581c87',       // Brilho Púrpura Profundo Azarath
  },
  CELESTIAL_CHRONO: {
    id: 'CELESTIAL_CHRONO',
    name: '9. Olho de Agamotto (Mago do Tempo)',
    subtitle: 'Astrolábio temporal do Olho de Agamotto com relógio místico e verde esmeralda',
    icon: 'Clock',
    primaryColor: '#10b981',    // Esmeralda Temporal
    secondaryColor: '#a7f3d0',  // Verde Místico Claro
    glowColor: '#047857',       // Brilho Verde Jade
  },
  DRAGON_SEAL_VORTEX: {
    id: 'DRAGON_SEAL_VORTEX',
    name: '10. Selo do Dragão de Shou-Lao (Mago Dragão)',
    subtitle: 'Selo astral do dragão místico com garras e chamas cósmicas',
    icon: 'Compass',
    primaryColor: '#ef4444',    // Vermelho Fogo Dragão
    secondaryColor: '#fbbf24',  // Ouro Flamejante Dragão
    glowColor: '#991b1b',       // Brilho Chamas Rubi
  },
};

export const FENDA_METADATA: Record<FendaFilter, FilterInfo> = {
  FENDA_PRISMA: {
    id: 'FENDA_PRISMA',
    name: 'Fenda Prisma Pop-Art',
    subtitle: 'Espectro térmico vibrante de magenta, ciano e amarelo',
    icon: 'Crop',
    primaryColor: '#ec4899',
    secondaryColor: '#06b6d4',
    glowColor: '#a855f7',
  },
  FENDA_COSMICA: {
    id: 'FENDA_COSMICA',
    name: 'Fenda Cósmica Violeta',
    subtitle: 'Inversão estelar violeta e nebulosa mística',
    icon: 'Sparkles',
    primaryColor: '#9333ea',
    secondaryColor: '#c084fc',
    glowColor: '#581c87',
  },
  FENDA_QUANTICA: {
    id: 'FENDA_QUANTICA',
    name: 'Fenda Matrix Quântica',
    subtitle: 'Scanlines cibernéticas e grade de dados neon',
    icon: 'Cpu',
    primaryColor: '#a855f7',
    secondaryColor: '#ffffff',
    glowColor: '#7e22ce',
  },
  FENDA_NEGATIVO: {
    id: 'FENDA_NEGATIVO',
    name: 'Fenda Eletro-Negativo',
    subtitle: 'Contraste invertido com radiação eletrizante',
    icon: 'Zap',
    primaryColor: '#c084fc',
    secondaryColor: '#ffffff',
    glowColor: '#9333ea',
  },
  FENDA_MANDALA: {
    id: 'FENDA_MANDALA',
    name: 'Fenda Rúnica Ancestral',
    subtitle: 'Projeção holográfica de runas e mandalas no visor',
    icon: 'Shield',
    primaryColor: '#9333ea',
    secondaryColor: '#f3e8ff',
    glowColor: '#7e22ce',
  },
};

// Runas e Caracteres Místicos da Mandala Sagrada
const RUNIC_GLYPHS = ['術', '陣', '禁', '始', '無', '注', '境', '新', '形', '迷', '銀', '退', '光', '星', '道', '印', '選', '理', '長', '法', '雷', '魂', '天', '宙', '秘', '結', '界', '聖', '龍', '神', '極', '覇'];
const RUNIC_SYMBOLS_OUTER = ['᚛', '᚜', 'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛈ', 'ᛇ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛟ', 'ᛞ'];

export class CircleEffectsEngine {
  private rotationAngle = 0;
  private rippleAlpha = 0;
  private rippleRadius = 0;
  private rippleText = '';
  public physicsPlayground: PhysicsPlayground;

  constructor() {
    this.physicsPlayground = new PhysicsPlayground();
  }

  public triggerFilterSwitch(filterName: string) {
    this.rippleAlpha = 1.0;
    this.rippleRadius = 10;
    this.rippleText = filterName;
  }

  // Resolve as cores ativas considerando a paleta configurada pelo usuário
  private resolveColors(info: FilterInfo, settings: AppSettings): FilterInfo {
    // Opção 1: "Cores Padrão" -> Preserva as cores únicas exclusivas de cada mandala!
    if (!settings.colorTheme || settings.colorTheme === 'DEFAULT_SIGNATURE' || settings.colorTheme === 'DEFAULT_PURPLE') {
      return info;
    }

    // Opção 2: "Cor Personalizada (RGB)" -> Aplica as cores RGB escolhidas pelo usuário em todas as mandalas
    if (settings.colorTheme === 'CUSTOM_RGB') {
      return {
        ...info,
        primaryColor: settings.customPrimaryColor || info.primaryColor,
        secondaryColor: settings.customSecondaryColor || info.secondaryColor,
        glowColor: settings.customGlowColor || info.glowColor,
      };
    }

    // Opção 3: Temas Cromáticos Globais
    const palette = COLOR_PALETTES[settings.colorTheme];
    if (palette) {
      return {
        ...info,
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        glowColor: palette.glow,
      };
    }

    return info;
  }

  public render(
    ctx: CanvasRenderingContext2D,
    videoElement: HTMLVideoElement | null,
    width: number,
    height: number,
    hands: SmoothedHand[],
    dualHand: DualHandInteraction,
    activeFilter: CircleFilter,
    activeFendaFilter: FendaFilter,
    settings: AppSettings,
    particles: CircleParticleSystem,
    deltaTime: number
  ) {
    const rotSpeed = (settings.rotationSpeed || 1.0) * 0.025;
    this.rotationAngle += rotSpeed * (deltaTime / 16.6);

    // Initialize Physics Playground if not initialized
    if (settings.physicsEnabled && (!this.physicsPlayground.isInitialized || width !== (this.physicsPlayground as any).canvasWidth)) {
      this.physicsPlayground.init(width, height);
    }

    // =========================================================================
    // 0. NOVO MODO: DETECÇÃO PURA DA MÃO (CYBER HUD ANALYTICS & NÓS ESQUELÉTICOS)
    // =========================================================================
    if (settings.renderMode === 'MODO_DETECCAO_PURA') {
      const rawFilterInfo = FILTER_METADATA[activeFilter] || FILTER_METADATA.MYSTIC_MANDALA;
      const themeInfo = this.resolveColors(rawFilterInfo, settings);
      
      hands.forEach((hand, handIndex) => {
        if (settings.skeletonStyle === 'FULL') {
          this.renderPureTrackingHUD(ctx, hand, handIndex, themeInfo, settings, this.rotationAngle, width, height);
        } else if (settings.skeletonStyle === 'CLEAN') {
          this.renderMinimalSkeleton(ctx, hand);
        }
      });

      // Se houver 2 mãos, desenhar telemetria e vetor de distância entre elas
      if (hands.length >= 2 && settings.skeletonStyle === 'FULL') {
        this.renderDualHandTelemetry(ctx, hands[0], hands[1], themeInfo);
      }

      // Parquinho de Física
      if (settings.physicsEnabled) {
        this.physicsPlayground.updateAndRender(ctx, hands, settings);
      }

      // Indicador do gesto V
      hands.forEach((hand) => {
        if (hand.isVSign) {
          this.drawVSignIndicator(ctx, hand, themeInfo);
        }
      });

      if (this.rippleAlpha > 0.01) {
        this.drawFilterSwitchRipple(ctx, width, height, themeInfo);
      }
      return;
    }

    // =========================================================================
    // 1. MODO FENDA: Preso nos dedos ou projetado com 1 mão
    // =========================================================================
    if (settings.renderMode === 'MODO_FENDA') {
      const rawFendaInfo = FENDA_METADATA[activeFendaFilter] || FENDA_METADATA.FENDA_PRISMA;
      const fendaInfo = this.resolveColors(rawFendaInfo, settings);

      // Desenhar esqueleto se ativado
      if (settings.skeletonStyle !== 'HIDDEN') {
        hands.forEach((hand) => {
          if (hand.smoothedLandmarks.length === 21) {
            this.renderMinimalSkeleton(ctx, hand);
          }
        });
      }

      if (dualHand.isFendaActive && dualHand.fendaQuad) {
        this.drawPinnedFenda(
          ctx,
          videoElement,
          dualHand.fendaQuad,
          activeFendaFilter,
          fendaInfo,
          particles,
          this.rotationAngle,
          width,
          height
        );
      }

      // Indicador do gesto V
      hands.forEach((hand) => {
        if (hand.isVSign) {
          this.drawVSignIndicator(ctx, hand, fendaInfo);
        }
      });

      // Renderizar Ripple de troca de filtro
      if (this.rippleAlpha > 0.01) {
        this.drawFilterSwitchRipple(ctx, width, height, fendaInfo);
      }
      return;
    }

    // =========================================================================
    // 2. MODO ESFERAS & CONEXÃO LASER AVANÇADO
    // =========================================================================
    const rawFilterInfo = FILTER_METADATA[activeFilter] || FILTER_METADATA.MYSTIC_MANDALA;
    const filterInfo = this.resolveColors(rawFilterInfo, settings);

    // MODO CONEXÃO LASER APRIMORADO E MULTI-INTERATIVO
    if (settings.renderMode === 'MODO_CONEXAO') {
      const subMode = settings.activeLaserSubMode || 'LASER_CROSS_FINGERS';
      const laserThickness = settings.laserThickness || 1.0;
      const jitter = settings.laserArcJitter || 1.0;

      // Desenhar esqueleto se ativado
      if (settings.skeletonStyle !== 'HIDDEN') {
        hands.forEach((hand) => {
          if (hand.smoothedLandmarks.length === 21) {
            this.renderMinimalSkeleton(ctx, hand);
          }
        });
      }

      // 1. Processar cada mão individualmente
      hands.forEach((hand) => {
        if (hand.isClosedFist) return;

        this.renderInteractiveLaserSystem(
          ctx,
          hand,
          subMode,
          filterInfo,
          settings.effectScale,
          laserThickness,
          jitter,
          particles,
          width,
          height
        );

        if (hand.isVSign) {
          this.drawVSignIndicator(ctx, hand, filterInfo);
        }
      });

      // 2. Conexão laser avançada entre duas mãos
      if (hands.length >= 2 && !hands[0].isClosedFist && !hands[1].isClosedFist) {
        this.renderDualHandLaserBridge(
          ctx,
          hands[0],
          hands[1],
          subMode,
          filterInfo,
          settings.effectScale,
          laserThickness,
          particles
        );
      }

      if (this.rippleAlpha > 0.01) {
        this.drawFilterSwitchRipple(ctx, width, height, filterInfo);
      }
      return;
    }

    // MODO ESFERAS / MANDALAS
    // Verificar fusão de 2 mãos no Mega Escudo
    const isMerging = settings.renderMode === 'MODO_ESFERAS' && dualHand.isMergingShield;
    if (isMerging) {
      this.drawMergedDualShield(
        ctx,
        dualHand.shieldCenter.x,
        dualHand.shieldCenter.y,
        155 * settings.effectScale,
        activeFilter,
        filterInfo,
        this.rotationAngle,
        particles
      );
    }

    hands.forEach((hand) => {
      // Esqueleto minimalista
      if (settings.skeletonStyle !== 'HIDDEN' && hand.smoothedLandmarks.length === 21) {
        this.renderMinimalSkeleton(ctx, hand);
      }

      // No modo esferas: NÃO desenhar se a mão estiver fechada em punho
      if (hand.isClosedFist) {
        return;
      }

      // 5. Efeito Mandala na Palma da Mão ou Pinça (Visível quando a mão está aberta e não está mesclando escudo)
      if (!isMerging && !hand.isVSign) {
        if (settings.mandalaPosition === 'PINCH') {
          if (hand.isThumbIndexActive) {
            const cx = hand.thumbIndexCenter.x;
            const cy = hand.thumbIndexCenter.y;
            const baseRadius = Math.max(38, Math.min(145, hand.thumbIndexDistance * 0.95)) * settings.effectScale;
            particles.emitOrbitalSparks(cx, cy, baseRadius, filterInfo.primaryColor, filterInfo.secondaryColor, 2);
            this.drawSphereFilter(ctx, cx, cy, baseRadius, activeFilter, filterInfo, this.rotationAngle);
          }
        } else {
          // Default: PALM
          const cx = hand.palmCenter.x;
          const cy = hand.palmCenter.y;
          const baseRadius = 110 * settings.effectScale;
          particles.emitOrbitalSparks(cx, cy, baseRadius, filterInfo.primaryColor, filterInfo.secondaryColor, 2);
          this.drawSphereFilter(ctx, cx, cy, baseRadius, activeFilter, filterInfo, this.rotationAngle);
        }
      }

      // Indicador de Gesto V
      if (hand.isVSign && !hand.isClosedFist) {
        this.drawVSignIndicator(ctx, hand, filterInfo);
      }
    });

    // Ponte de Energia entre as duas mãos se ambas tiverem indicador+polegar ativos
    if (hands.length >= 2 && hands[0].isThumbIndexActive && hands[1].isThumbIndexActive && !hands[0].isClosedFist && !hands[1].isClosedFist && !isMerging) {
      this.drawInterHandEnergyBridge(ctx, hands[0].thumbIndexCenter, hands[1].thumbIndexCenter, filterInfo, settings.effectScale);
    }

    // Ripple de troca de filtro
    if (this.rippleAlpha > 0.01) {
      this.drawFilterSwitchRipple(ctx, width, height, filterInfo);
    }
  }

  // =========================================================================
  // IMPLEMENTAÇÃO DA FENDA PRESA NOS 4 DEDOS (IMAGEM 2)
  // =========================================================================
  private drawPinnedFenda(
    ctx: CanvasRenderingContext2D,
    videoElement: HTMLVideoElement | null,
    quad: FendaQuad,
    activeFendaFilter: FendaFilter,
    info: FilterInfo,
    particles: CircleParticleSystem,
    time: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const { pTL, pTR, pBR, pBL, center } = quad;

    ctx.save();

    // 1. Criar Máscara de Recorte no Quadrilátero Exato dos Dedos
    ctx.beginPath();
    ctx.moveTo(pTL.x, pTL.y);
    ctx.lineTo(pTR.x, pTR.y);
    ctx.lineTo(pBR.x, pBR.y);
    ctx.lineTo(pBL.x, pBL.y);
    ctx.closePath();

    ctx.save();
    ctx.clip();

    // 2. Renderizar o Filtro Interno Escolhido dentro da Fenda
    this.renderFendaInternalFilter(ctx, videoElement, quad, activeFendaFilter, info, time, canvasWidth, canvasHeight);

    ctx.restore();

    // 3. Moldura Externa de Neon e Fixação nos 4 Dedos
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.moveTo(pTL.x, pTL.y);
    ctx.lineTo(pTR.x, pTR.y);
    ctx.lineTo(pBR.x, pBR.y);
    ctx.lineTo(pBL.x, pBL.y);
    ctx.closePath();
    ctx.stroke();

    // Linha Secundária Colorida
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.0;
    ctx.stroke();

    // 4. Presilhas Magnéticas / Orbes de Fixação nos 4 Cantos (Pontas dos Dedos)
    const corners = [pTL, pTR, pBR, pBL];
    corners.forEach((pt) => {
      // Anel Externo
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
      ctx.stroke();

      // Anel Interno
      ctx.strokeStyle = info.primaryColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
      ctx.stroke();

      // Ponto Central Branco
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Emitir partículas nas presilhas
      particles.emitFendaCornerSparks(pt.x, pt.y, info.primaryColor, info.secondaryColor);
    });

    // 5. Marcador de Retículo Central da Fenda
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(center.x, center.y, 16, 0, Math.PI * 2);
    ctx.stroke();

    // Cruz do retículo
    ctx.beginPath();
    ctx.moveTo(center.x - 22, center.y);
    ctx.lineTo(center.x - 10, center.y);
    ctx.moveTo(center.x + 10, center.y);
    ctx.lineTo(center.x + 22, center.y);
    ctx.moveTo(center.x, center.y - 22);
    ctx.lineTo(center.x, center.y - 10);
    ctx.moveTo(center.x, center.y + 10);
    ctx.lineTo(center.x, center.y + 22);
    ctx.stroke();

    ctx.restore();
  }

  // Filtros internos dentro do polígono da fenda
  private renderFendaInternalFilter(
    ctx: CanvasRenderingContext2D,
    videoElement: HTMLVideoElement | null,
    quad: FendaQuad,
    filter: FendaFilter,
    info: FilterInfo,
    time: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    const { pTL, pTR, pBR, pBL, center } = quad;
    const minX = Math.min(pTL.x, pBL.x, pTR.x, pBR.x);
    const maxX = Math.max(pTL.x, pBL.x, pTR.x, pBR.x);
    const minY = Math.min(pTL.y, pBL.y, pTR.y, pBR.y);
    const maxY = Math.max(pTL.y, pBL.y, pTR.y, pBR.y);
    const boxW = maxX - minX;
    const boxH = maxY - minY;

    switch (filter) {
      case 'FENDA_PRISMA': {
        const grad = ctx.createLinearGradient(pTL.x, pTL.y, pBR.x, pBR.y);
        grad.addColorStop(0, 'rgba(236, 72, 153, 0.65)');
        grad.addColorStop(0.3, 'rgba(168, 85, 247, 0.55)');
        grad.addColorStop(0.65, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'rgba(234, 179, 8, 0.55)');

        ctx.fillStyle = grad;
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        for (let y = minY; y <= maxY; y += 6) {
          ctx.beginPath();
          ctx.moveTo(minX, y);
          ctx.lineTo(maxX, y);
          ctx.stroke();
        }
        break;
      }

      case 'FENDA_COSMICA': {
        const grad = ctx.createRadialGradient(center.x, center.y, 10, center.x, center.y, Math.max(boxW, boxH));
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(0.4, 'rgba(147, 51, 234, 0.7)');
        grad.addColorStop(0.85, 'rgba(59, 7, 100, 0.85)');
        grad.addColorStop(1, 'rgba(15, 23, 42, 0.9)');

        ctx.fillStyle = grad;
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);

        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 24; i++) {
          const sx = minX + ((i * 37 + time * 20) % boxW);
          const sy = minY + ((i * 47) % boxH);
          ctx.beginPath();
          ctx.arc(sx, sy, (i % 3) + 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }

      case 'FENDA_QUANTICA': {
        ctx.fillStyle = 'rgba(126, 34, 206, 0.45)';
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);

        ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
        ctx.lineWidth = 1;
        const step = 24;
        for (let x = minX; x <= maxX; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, minY);
          ctx.lineTo(x, maxY);
          ctx.stroke();
        }
        for (let y = minY; y <= maxY; y += step) {
          ctx.beginPath();
          ctx.moveTo(minX, y);
          ctx.lineTo(maxX, y);
          ctx.stroke();
        }
        break;
      }

      case 'FENDA_NEGATIVO': {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);

        ctx.fillStyle = 'rgba(88, 28, 135, 0.4)';
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);
        break;
      }

      case 'FENDA_MANDALA': {
        ctx.fillStyle = 'rgba(46, 16, 101, 0.7)';
        ctx.fillRect(minX - 20, minY - 20, boxW + 40, boxH + 40);

        this.drawDoctorStrangeMandala(ctx, center.x, center.y, Math.min(boxW, boxH) * 0.4, info, time);
        break;
      }
    }
  }

  // =========================================================================
  // 3. FILTROS DE ESFERAS (10 MANDALAS & CÍRCULOS NO TOTAL)
  // =========================================================================
  private drawSphereFilter(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number,
    filter: CircleFilter,
    info: FilterInfo,
    angle: number
  ) {
    switch (filter) {
      case 'MYSTIC_MANDALA':
        this.drawDoctorStrangeMandala(ctx, cx, cy, radius, info, angle);
        break;
      case 'COSMIC_VORTEX':
        this.drawCosmicVortex(ctx, cx, cy, radius, info, angle);
        break;
      case 'PLASMA_CHAKRAM':
        this.drawPlasmaChakram(ctx, cx, cy, radius, info, angle);
        break;
      case 'DIMENSIONAL_PORTAL':
        this.drawDimensionalPortal(ctx, cx, cy, radius, info, angle);
        break;
      case 'SACRED_RINGS':
        this.drawSacredRings(ctx, cx, cy, radius, info, angle);
        break;
      case 'SOLAR_RUNIC_LOTUS':
        this.drawSolarRunicLotus(ctx, cx, cy, radius, info, angle);
        break;
      case 'CYBER_TECH_MATRIX':
        this.drawCyberTechMatrix(ctx, cx, cy, radius, info, angle);
        break;
      case 'ETHEREAL_SUPERNOVA':
        this.drawEtherealSupernova(ctx, cx, cy, radius, info, angle);
        break;
      case 'CELESTIAL_CHRONO':
        this.drawCelestialChrono(ctx, cx, cy, radius, info, angle);
        break;
      case 'DRAGON_SEAL_VORTEX':
        this.drawDragonSealVortex(ctx, cx, cy, radius, info, angle);
        break;
      default:
        this.drawDoctorStrangeMandala(ctx, cx, cy, radius, info, angle);
    }
  }

  // 1. MANDALA RÚNICA DOUTOR ESTRANHO (VISUAL DE FILME, ALTA PERFORMANCE)
  private drawDoctorStrangeMandala(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 0. Halo de luz sutil no fundo
    const gradGlow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 1.1);
    gradGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradGlow.addColorStop(0.5, info.primaryColor + '40'); // 25% opacidade
    gradGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // 1. Anel Externo com "Runas" Simuladas (Usando setLineDash para altíssima performance)
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 6;
    ctx.setLineDash([4, 6, 2, 4, 8, 4, 2, 6]); // Padrão complexo simulando texto
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.95, -angle * 0.5, -angle * 0.5 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // Reset
    
    // Borda fina segurando as runas
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.99, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.91, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Anel Principal Branco (Glow forte)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.0;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0; // Reset glow para as formas internas

    // 3. Octagrama Sagrado (2 Quadrados rotacionados a 45 graus)
    const octRadius = r * 0.85;
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.5;
    
    for (let s = 0; s < 2; s++) {
      const sqAngle = angle + (s * Math.PI) / 4;
      ctx.beginPath();
      for (let j = 0; j < 4; j++) {
        const a = sqAngle + (j * Math.PI) / 2;
        const px = cx + Math.cos(a) * octRadius;
        const py = cy + Math.sin(a) * octRadius;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 4. Círculo Interno que tangencia os quadrados
    const innerCircRadius = octRadius * 0.707; // sen(45) aproxima a tangente
    ctx.strokeStyle = info.secondaryColor;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(cx, cy, innerCircRadius, 0, Math.PI * 2);
    ctx.stroke();

    // 5. Linhas Cruzadas no Núcleo (Estrela / Olho de Agamotto)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    const lines = 8;
    ctx.beginPath();
    for(let i = 0; i < lines; i++) {
       const a = -angle * 2 + (i * Math.PI * 2) / lines;
       ctx.moveTo(cx, cy);
       ctx.lineTo(cx + Math.cos(a) * innerCircRadius, cy + Math.sin(a) * innerCircRadius);
    }
    ctx.stroke();

    // Círculo central do núcleo
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
    ctx.stroke();

    // Esfera luminosa no meio
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // 2. VÓRTICE CÓSMICO
  private drawCosmicVortex(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const gradGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, r * 2.0);
    gradGlow.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
    gradGlow.addColorStop(0.4, info.primaryColor);
    gradGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 2.0, 0, Math.PI * 2);
    ctx.fill();

    const arms = 6;
    for (let arm = 0; arm < arms; arm++) {
      const armOffset = (arm * Math.PI * 2) / arms;
      ctx.strokeStyle = arm % 2 === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = arm % 2 === 0 ? 2.5 : 3.5;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      for (let theta = 0; theta < Math.PI * 4; theta += 0.12) {
        const rad = (theta / (Math.PI * 4)) * r;
        const a = theta + angle * 2.5 + armOffset;
        const px = cx + Math.cos(a) * rad;
        const py = cy + Math.sin(a) * rad;
        if (theta === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Desenha a Tiara / Coroa Mística da Feiticeira Escarlate
  private drawScarletTiara(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    scale: number,
    color: string,
    glowColor: string
  ) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(2.5, scale * 0.08);
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;

    const w = scale * 0.85;
    const h = scale * 0.65;
    const topY = cy - h * 0.7;

    ctx.beginPath();
    // Ponta central alta
    ctx.moveTo(cx, topY);
    // Curva interna esquerda até o pico esquerdo da tiara
    ctx.quadraticCurveTo(cx - w * 0.25, cy - h * 0.2, cx - w * 0.48, topY + h * 0.22);
    // Curva externa esquerda até ponta lateral inferior
    ctx.quadraticCurveTo(cx - w * 0.58, cy + h * 0.35, cx - w * 0.38, cy + h * 0.42);
    // Base inferior arqueada
    ctx.quadraticCurveTo(cx, cy + h * 0.18, cx + w * 0.38, cy + h * 0.42);
    // Curva externa direita até o pico direito da tiara
    ctx.quadraticCurveTo(cx + w * 0.58, cy + h * 0.35, cx + w * 0.48, topY + h * 0.22);
    // Curva interna direita de volta para a ponta central alta
    ctx.quadraticCurveTo(cx + w * 0.25, cy - h * 0.2, cx, topY);
    ctx.closePath();

    ctx.fillStyle = color + '40';
    ctx.fill();
    ctx.stroke();

    // Destaque interno de borda (linha brilhante branca)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, topY + 4);
    ctx.quadraticCurveTo(cx - w * 0.2, cy - h * 0.15, cx - w * 0.42, topY + h * 0.25);
    ctx.moveTo(cx, topY + 4);
    ctx.quadraticCurveTo(cx + w * 0.2, cy - h * 0.15, cx + w * 0.42, topY + h * 0.25);
    ctx.stroke();

    // Joia / Chakra Rubi central
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(cx, cy - h * 0.05, scale * 0.09, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // 3. CHAKRAM DO CAOS (FEITICEIRA ESCARLATE / WANDA)
  private drawPlasmaChakram(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 1. Halo profundo de Magia do Caos Rubi
    const radGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.4);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.25, '#f472b6');
    radGrad.addColorStop(0.65, info.primaryColor);
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.4, 0, Math.PI * 2);
    ctx.fill();

    // 2. Tiara Mística da Feiticeira Escarlate no topo/centro
    this.drawScarletTiara(ctx, cx, cy, r * 0.65, '#f43f5e', info.glowColor);

    // 3. Barreira de Hexágonos de Caos Entrelançados (Dobra de Realidade)
    for (let h = 0; h < 2; h++) {
      const hAngle = (h === 0 ? angle * 1.5 : -angle * 2.0) + (h * Math.PI) / 6;
      ctx.strokeStyle = h === 0 ? info.primaryColor : '#ffffff';
      ctx.lineWidth = h === 0 ? 3.0 : 1.8;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const ha = hAngle + (s * Math.PI) / 3;
        const px = cx + Math.cos(ha) * (r * (0.85 + h * 0.2));
        const py = cy + Math.sin(ha) * (r * (0.85 + h * 0.2));
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 4. Feixes e Fitas Fluindo em Espiral de Magia do Caos
    const tendrils = 8;
    for (let t = 0; t < tendrils; t++) {
      const ta = -angle * 2.8 + (t * Math.PI * 2) / tendrils;
      ctx.strokeStyle = t % 2 === 0 ? '#ffffff' : '#f472b6';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(
        cx + Math.cos(ta + 0.5) * (r * 0.75),
        cy + Math.sin(ta + 0.5) * (r * 0.75),
        cx + Math.cos(ta) * (r * 1.15),
        cy + Math.sin(ta) * (r * 1.15)
      );
      ctx.stroke();
    }

    // 5. Núcleo Rubi Ofuscante
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // 4. PORTAL DIMENSIONAL (REFEITO: Círculo Verde/Místico Rúnico Intricado)
  private drawDimensionalPortal(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Fundo esverdeado/luminoso (depende da cor escolhida, mas por padrão usará a cor principal)
    const portalGlow = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.2);
    portalGlow.addColorStop(0, info.primaryColor + '60');
    portalGlow.addColorStop(0.8, info.secondaryColor + '20');
    portalGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = portalGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Linha dentada externa (simulando runas digitais/quadradas)
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    const jaggedSegments = 60;
    for(let i = 0; i <= jaggedSegments; i++) {
      const a = angle + (i * Math.PI * 2) / jaggedSegments;
      // Alterna o raio para fazer um padrão quadrado estilo "digital"
      const offsetR = r * (i % 2 === 0 ? 1.05 : 0.95);
      const px = cx + Math.cos(a) * offsetR;
      const py = cy + Math.sin(a) * offsetR;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Anel grosso interno
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
    ctx.stroke();

    // Dois quadrados sobrepostos formando octagrama interno
    for (let s = 0; s < 2; s++) {
      const sqAngle = -angle * 1.5 + (s * Math.PI) / 4;
      const sqRadius = r * 0.7;

      ctx.strokeStyle = info.primaryColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      for (let j = 0; j < 4; j++) {
        const a = sqAngle + (j * Math.PI) / 2;
        const px = cx + Math.cos(a) * sqRadius;
        const py = cy + Math.sin(a) * sqRadius;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Núcleo com runas e pequenos círculos
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
    ctx.stroke();

    for(let i=0; i < 8; i++) {
      const a = angle * 2 + (i * Math.PI * 2) / 8;
      ctx.fillStyle = info.secondaryColor;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * r * 0.4, cy + Math.sin(a) * r * 0.4, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // 5. ANÉIS DO DESTINO (SENHOR DO DESTINO / DOCTOR FATE)
  private drawSacredRings(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Halo Dourado Divino
    const gradGlow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.3);
    gradGlow.addColorStop(0, '#ffffff');
    gradGlow.addColorStop(0.4, info.primaryColor);
    gradGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Ankh Sagrado no Centro (Símbolo de Nabu / Senhor do Destino)
    const ankhH = r * 0.4;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.0;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;

    // Loop da Ankh
    ctx.beginPath();
    ctx.ellipse(cx, cy - ankhH * 0.35, ankhH * 0.2, ankhH * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Braços e Haste da Ankh
    ctx.beginPath();
    ctx.moveTo(cx - ankhH * 0.4, cy - ankhH * 0.05);
    ctx.lineTo(cx + ankhH * 0.4, cy - ankhH * 0.05);
    ctx.moveTo(cx, cy - ankhH * 0.05);
    ctx.lineTo(cx, cy + ankhH * 0.5);
    ctx.stroke();

    // 8 Anéis do Destino Concentricos
    for (let i = 1; i <= 4; i++) {
      ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(cx, cy, r * (0.35 + i * 0.15), 0, Math.PI * 2);
      ctx.stroke();
    }

    // Hieróglifos egípcios na borda
    const hieros = ['𓋹', '𓁹', '𓏞', '𓋴', '𓌔', '𓎛', '𓀔', '𓃭'];
    ctx.font = `bold ${Math.max(14, r * 0.16)}px serif`;
    ctx.fillStyle = info.secondaryColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let h = 0; h < hieros.length; h++) {
      const ha = angle * 1.2 + (h * Math.PI * 2) / hieros.length;
      const hx = cx + Math.cos(ha) * (r * 0.95);
      const hy = cy + Math.sin(ha) * (r * 0.95);
      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(ha + Math.PI / 2);
      ctx.fillText(hieros[h], 0, 0);
      ctx.restore();
    }

    ctx.restore();
  }

  // 6. LÓTUS ASTRAL (ANCIÃ / ANCIENT ONE)
  private drawSolarRunicLotus(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;
    ctx.lineWidth = 1.8;

    // 12 Pétalas em espiral com geometria de leque astral da Anciã
    const petals = 12;
    for (let layer = 0; layer < 3; layer++) {
      const layerR = r * (0.45 + layer * 0.28);
      const layerAngle = angle * (layer % 2 === 0 ? 1.5 : -1.5) + layer * 0.2;

      for (let p = 0; p < petals; p++) {
        const a = (p * Math.PI * 2) / petals + layerAngle;
        const px = cx + Math.cos(a) * layerR;
        const py = cy + Math.sin(a) * layerR;

        ctx.strokeStyle = layer === 0 ? '#ffffff' : (p % 2 === 0 ? info.primaryColor : info.secondaryColor);
        ctx.beginPath();
        ctx.ellipse(px, py, layerR * 0.35, layerR * 0.15, a + Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Anel externo com raios solares da Anciã
    const rays = 24;
    ctx.strokeStyle = '#ffffff';
    for (let i = 0; i < rays; i++) {
      const ra = (i * Math.PI * 2) / rays - angle * 2;
      const r1 = r * 0.92;
      const r2 = r * (i % 2 === 0 ? 1.18 : 1.05);
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ra) * r1, cy + Math.sin(ra) * r1);
      ctx.lineTo(cx + Math.cos(ra) * r2, cy + Math.sin(ra) * r2);
      ctx.stroke();
    }

    // Núcleo Solar
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // 7. NÚCLEO CIBERNÉTICO HUD (NOVA)
  private drawCyberTechMatrix(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Retículo de mira hexagonal
    for (let hex = 0; hex < 3; hex++) {
      const hexR = r * (0.4 + hex * 0.3);
      const hAngle = angle * (hex % 2 === 0 ? 2 : -2);
      ctx.strokeStyle = hex === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const sa = hAngle + (s * Math.PI) / 3;
        const px = cx + Math.cos(sa) * hexR;
        const py = cy + Math.sin(sa) * hexR;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Marcadores de mira cruzada
    const crossSize = r * 1.25;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(cx - crossSize, cy);
    ctx.lineTo(cx - r * 0.2, cy);
    ctx.moveTo(cx + r * 0.2, cy);
    ctx.lineTo(cx + crossSize, cy);
    ctx.moveTo(cx, cy - crossSize);
    ctx.lineTo(cx, cy - r * 0.2);
    ctx.moveTo(cx, cy + r * 0.2);
    ctx.lineTo(cx, cy + crossSize);
    ctx.stroke();

    // Segmentos de arco estilo HUD
    for (let i = 0; i < 4; i++) {
      const startA = angle * 1.5 + (i * Math.PI) / 2 + 0.1;
      const endA = startA + Math.PI / 3;
      ctx.strokeStyle = info.secondaryColor;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.05, startA, endA);
      ctx.stroke();
    }

    ctx.restore();
  }

  // 8. SUPERNOVA DE AZARATH (RAVENA)
  private drawEtherealSupernova(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Fundo Violeta/Ametista Cósmico
    const radGrad = ctx.createRadialGradient(cx, cy, r * 0.1, cx, cy, r * 1.3);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.3, info.secondaryColor);
    radGrad.addColorStop(0.7, info.primaryColor);
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Asas Místicas do Corvo de Ravena (Alma de Azarath)
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.8;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 18;

    ctx.beginPath();
    // Asa Esquerda
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cx - r * 0.4, cy - r * 0.65, cx - r * 0.95, cy - r * 0.15, cx - r * 0.85, cy + r * 0.35);
    ctx.bezierCurveTo(cx - r * 0.55, cy + r * 0.15, cx - r * 0.2, cy + r * 0.05, cx, cy);
    // Asa Direita
    ctx.bezierCurveTo(cx + r * 0.2, cy + r * 0.05, cx + r * 0.55, cy + r * 0.15, cx + r * 0.85, cy + r * 0.35);
    ctx.bezierCurveTo(cx + r * 0.95, cy - r * 0.15, cx + r * 0.4, cy - r * 0.65, cx, cy);
    ctx.stroke();

    // Ondas da alma de Azarath pulsantes
    const shockwaves = 5;
    for (let sw = 0; sw < shockwaves; sw++) {
      const swR = ((angle * 90 + sw * (r / shockwaves)) % r) + r * 0.2;
      const alpha = 1.0 - swR / (r * 1.25);
      ctx.strokeStyle = sw % 2 === 0 ? '#ffffff' : info.secondaryColor;
      ctx.lineWidth = Math.max(1, 3 * alpha);
      ctx.beginPath();
      ctx.arc(cx, cy, swR, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Chakra / Joia da Testa em Diamante Radiant
    const gemSize = r * 0.2;
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#f472b6';
    ctx.lineWidth = 2.0;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.moveTo(cx, cy - gemSize);
    ctx.lineTo(cx + gemSize * 0.6, cy);
    ctx.lineTo(cx, cy + gemSize);
    ctx.lineTo(cx - gemSize * 0.6, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Raios do Chakra Soul-Self em 8 Direções
    const rays = 8;
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.8;
    for (let i = 0; i < rays; i++) {
      const ra = angle * 1.5 + (i * Math.PI * 2) / rays;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ra) * (gemSize * 0.8), cy + Math.sin(ra) * (gemSize * 0.8));
      ctx.lineTo(cx + Math.cos(ra) * (r * 0.95), cy + Math.sin(ra) * (r * 0.95));
      ctx.stroke();
    }

    ctx.restore();
  }

  // 9. ASTROLÁBIO CRONOS (NOVA)
  // 9. ASTROLÁBIO DO TEMPO (CHRONOS) - Estilo Julius Novachrono (Black Clover)
  private drawCelestialChrono(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Fundo do mostrador do relógio
    const clockBg = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
    clockBg.addColorStop(0, info.primaryColor + '40');
    clockBg.addColorStop(0.7, info.secondaryColor + '10');
    clockBg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = clockBg;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Círculos Externos e Engrenagens
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.95, -angle * 0.5, -angle * 0.5 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.strokeStyle = info.secondaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.75, 0, Math.PI * 2);
    ctx.stroke();

    // 12 Números Romanos Cósmicos
    const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const fontSize = Math.max(12, r * 0.15);
    ctx.font = `bold ${fontSize}px "Times New Roman", serif`;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 10;

    for (let h = 0; h < 12; h++) {
      // 0 = topo (XII), então subtraimos 90 graus (PI/2)
      const ha = (h * Math.PI * 2) / 12 - Math.PI / 2 + angle * 0.1; // Rotaciona lentamente o mostrador todo
      const textRadius = r * 0.86;
      const hx = cx + Math.cos(ha) * textRadius;
      const hy = cy + Math.sin(ha) * textRadius;
      
      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(ha + Math.PI / 2); // Mantém o texto apontando para fora/dentro
      ctx.fillText(romanNumerals[h], 0, 0);
      ctx.restore();
    }

    // Marcações de Minutos (60 ticks)
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 1.5;
    for (let m = 0; m < 60; m++) {
      if (m % 5 === 0) continue; // Pula a marcação da hora
      const ma = (m * Math.PI * 2) / 60 - Math.PI / 2 + angle * 0.1;
      const mx1 = cx + Math.cos(ma) * (r * 0.9);
      const my1 = cy + Math.sin(ma) * (r * 0.9);
      const mx2 = cx + Math.cos(ma) * (r * 0.95);
      const my2 = cy + Math.sin(ma) * (r * 0.95);
      ctx.beginPath();
      ctx.moveTo(mx1, my1);
      ctx.lineTo(mx2, my2);
      ctx.stroke();
    }

    // Geometria Sagrada no Centro (Estrela e Círculos)
    ctx.strokeStyle = info.secondaryColor;
    ctx.lineWidth = 1.5;
    for (let t = 0; t < 2; t++) {
      const triAngle = angle * 1.5 + (t * Math.PI) / 3;
      const triRadius = r * 0.45;
      ctx.beginPath();
      for (let j = 0; j < 3; j++) {
        const a = triAngle + (j * Math.PI * 2) / 3;
        const px = cx + Math.cos(a) * triRadius;
        const py = cy + Math.sin(a) * triRadius;
        if (j === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // 3 Ponteiros Místicos Rotacionando em Velocidades Diferentes
    // Ponteiro das Horas (Lento, Curto, Grosso)
    const hourAngle = angle * 0.8 - Math.PI/4;
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(hourAngle)*10, cy - Math.sin(hourAngle)*10); // Contrapeso
    ctx.lineTo(cx + Math.cos(hourAngle) * (r * 0.45), cy + Math.sin(hourAngle) * (r * 0.45));
    ctx.stroke();
    
    // Ponteiro dos Minutos (Médio)
    const minAngle = angle * 4.5 + Math.PI/2;
    ctx.strokeStyle = info.secondaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(minAngle)*15, cy - Math.sin(minAngle)*15);
    ctx.lineTo(cx + Math.cos(minAngle) * (r * 0.65), cy + Math.sin(minAngle) * (r * 0.65));
    ctx.stroke();

    // Ponteiro dos Segundos/Tempo (Mágico, Muito Rápido)
    const secAngle = -angle * 12; // Rotação contrária e veloz
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(cx - Math.cos(secAngle)*20, cy - Math.sin(secAngle)*20);
    ctx.lineTo(cx + Math.cos(secAngle) * (r * 0.88), cy + Math.sin(secAngle) * (r * 0.88));
    ctx.stroke();
    
    // Esfera/Engrenagem Central do Relógio
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // 10. SELO DO DRAGÃO DE SHOU-LAO (MAGO DRAGÃO)
  private drawDragonSealVortex(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    info: FilterInfo,
    angle: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Halo de Chamas do Dragão
    const gradGlow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.3);
    gradGlow.addColorStop(0, '#ffffff');
    gradGlow.addColorStop(0.4, info.primaryColor);
    gradGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Octagrama Sagrado do Dragão (2 Quadrados de 8 pontas)
    for (let o = 0; o < 2; o++) {
      const oAngle = angle * 1.8 + (o * Math.PI) / 4;
      ctx.strokeStyle = o === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      for (let s = 0; s < 4; s++) {
        const sa = oAngle + (s * Math.PI) / 2;
        const px = cx + Math.cos(sa) * (r * 0.82);
        const py = cy + Math.sin(sa) * (r * 0.82);
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Garras Astrais do Dragão de Shou-Lao
    const claws = 8;
    for (let c = 0; c < claws; c++) {
      const ca = (c * Math.PI * 2) / claws - angle * 2.5;
      const c1x = cx + Math.cos(ca) * (r * 0.5);
      const c1y = cy + Math.sin(ca) * (r * 0.5);
      const c2x = cx + Math.cos(ca + 0.3) * (r * 1.15);
      const c2y = cy + Math.sin(ca + 0.3) * (r * 1.15);
      const c3x = cx + Math.cos(ca) * (r * 0.85);
      const c3y = cy + Math.sin(ca) * (r * 0.85);

      ctx.strokeStyle = c % 2 === 0 ? '#ffffff' : info.secondaryColor;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(c1x, c1y);
      ctx.quadraticCurveTo(c3x, c3y, c2x, c2y);
      ctx.stroke();
    }

    // Ideogramas do Dragão Oriental
    const dChars = ['龍', '火', '神', '極', '覇', '爪', '印', '炎'];
    ctx.font = `bold ${Math.max(14, r * 0.16)}px sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let d = 0; d < dChars.length; d++) {
      const da = -angle * 1.5 + (d * Math.PI * 2) / dChars.length;
      const dx = cx + Math.cos(da) * (r * 0.95);
      const dy = cy + Math.sin(da) * (r * 0.95);
      ctx.save();
      ctx.translate(dx, dy);
      ctx.rotate(da + Math.PI / 2);
      ctx.fillText(dChars[d], 0, 0);
      ctx.restore();
    }

    // Anel Central e Orbe de Fogo Astral
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.35, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // =========================================================================
  // 4. MODO CONEXÃO LASER COM AJUSTE DE ESPESSURA E COR
  // =========================================================================
  private drawEnhancedLaserBeam(
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    cx: number,
    cy: number,
    info: FilterInfo,
    scale: number,
    thicknessFactor: number = 1.0
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const angle = Math.atan2(dy, dx);
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    // Gradiente: Branco nos Dedos -> Cor Primária no Meio -> Branco
    const gradGlow = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    gradGlow.addColorStop(0.2, info.secondaryColor);
    gradGlow.addColorStop(0.5, info.primaryColor);
    gradGlow.addColorStop(0.8, info.secondaryColor);
    gradGlow.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

    // Feixe Externo
    ctx.strokeStyle = gradGlow;
    ctx.lineWidth = Math.max(12, 24 * scale * thicknessFactor);
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 32;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Feixe Principal
    ctx.strokeStyle = gradGlow;
    ctx.lineWidth = Math.max(6, 11 * scale * thicknessFactor);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Núcleo Branco
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(2.5, 4 * scale * thicknessFactor);
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Arcos Elétricos
    const arcCount = 3;
    for (let a = 0; a < arcCount; a++) {
      const freq = 4 + a * 2;
      const phase = this.rotationAngle * 5 * (a % 2 === 0 ? 1 : -1) + a * 1.5;
      const amp = (Math.sin(this.rotationAngle * 4 + a) * 10 + 8) * scale;

      ctx.strokeStyle = a === 0 ? '#ffffff' : (a === 1 ? info.secondaryColor : info.primaryColor);
      ctx.lineWidth = a === 0 ? 1.5 : 2.0;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);

      const segments = 24;
      for (let s = 1; s < segments; s++) {
        const t = s / segments;
        const basePx = p1.x + dx * t;
        const basePy = p1.y + dy * t;
        const envelope = Math.sin(t * Math.PI);
        const wave = Math.sin(t * freq * Math.PI + phase) * amp * envelope;
        ctx.lineTo(basePx + perpX * wave, basePy + perpY * wave);
      }
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }

    // Anéis de Pulso Viajantes
    const ringTravel = (this.rotationAngle * 3) % 1;
    const ringPx = p1.x + dx * ringTravel;
    const ringPy = p1.y + dy * ringTravel;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(ringPx, ringPy, 14 * scale, 6 * scale, angle + Math.PI / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Núcleo de Reação Central
    const centerSize = Math.max(10, 18 * scale * thicknessFactor);
    const gradCenter = ctx.createRadialGradient(cx, cy, 2, cx, cy, centerSize * 2.5);
    gradCenter.addColorStop(0, '#ffffff');
    gradCenter.addColorStop(0.35, info.primaryColor);
    gradCenter.addColorStop(0.7, info.glowColor);
    gradCenter.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradCenter;
    ctx.beginPath();
    ctx.arc(cx, cy, centerSize * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Orbes e Foco nas Pontas dos Dedos
    [p1, p2].forEach((tip) => {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 14 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = info.primaryColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 10 * scale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = info.secondaryColor;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 8 * scale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 4.5 * scale, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  // =========================================================================
  // MEGA ESCUDO FUNDIDO COM DUAS MÃOS: CARACTERÍSTICAS ÚNICAS POR MANDALA
  // =========================================================================
  private drawMergedDualShield(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number,
    activeFilter: CircleFilter,
    info: FilterInfo,
    angle: number,
    particles: CircleParticleSystem
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 1. Renderizar a esfera ativa em tamanho gigante
    this.drawSphereFilter(ctx, cx, cy, radius * 1.1, activeFilter, info, angle);

    const outerR = radius * 1.35;

    // 2. ELEMENTOS DE FUSÃO EXCLUSIVOS E ÚNICOS PARA CADA MANDALA DE HERÓI/FEITICEIRO
    switch (activeFilter) {
      case 'MYSTIC_MANDALA': {
        // DOUTOR ESTRANHO: Dimensão de Espelhos e Escudo Eldritch de Kamar-Taj
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = info.glowColor;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
        ctx.stroke();

        // Grade de Espelhos Celestiais
        const latticeCount = 8;
        ctx.strokeStyle = info.primaryColor;
        ctx.lineWidth = 2.0;
        for (let i = 0; i < latticeCount; i++) {
          const lAngle = angle * 1.2 + (i * Math.PI * 2) / latticeCount;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(lAngle) * (outerR * 0.4), cy + Math.sin(lAngle) * (outerR * 0.4));
          ctx.lineTo(cx + Math.cos(lAngle + Math.PI / 4) * outerR, cy + Math.sin(lAngle + Math.PI / 4) * outerR);
          ctx.stroke();
        }

        // Anel de Runas de Kamar-Taj
        this.drawRunicTextCircle(ctx, cx, cy, outerR * 0.9, -angle * 0.8, RUNIC_GLYPHS, info.secondaryColor, Math.max(12, radius * 0.08));
        break;
      }

      case 'COSMIC_VORTEX': {
        // ADAM WARLOCK: Singularidade e Supernova Cósmica
        const arms = 12;
        for (let a = 0; a < arms; a++) {
          const aAngle = (a * Math.PI * 2) / arms + angle * 2;
          const px = cx + Math.cos(aAngle) * (outerR * 1.15);
          const py = cy + Math.sin(aAngle) * (outerR * 1.15);

          ctx.strokeStyle = a % 2 === 0 ? '#ffffff' : info.primaryColor;
          ctx.lineWidth = 2.5;
          ctx.shadowColor = info.glowColor;
          ctx.shadowBlur = 18;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(
            cx + Math.cos(aAngle + 0.6) * (outerR * 0.7),
            cy + Math.sin(aAngle + 0.6) * (outerR * 0.7),
            px, py
          );
          ctx.stroke();
        }

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.05, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }

      case 'PLASMA_CHAKRAM': {
        // FEITICEIRA ESCARLATE (WANDA): Singularidade do Caos & Tiara Mística
        const hexRadius = outerR * 1.15;

        // Tiara Colossal de Feiticeira Escarlate no Centro do Mega Escudo
        this.drawScarletTiara(ctx, cx, cy, radius * 0.95, '#f43f5e', '#991b1b');

        // Barreiras Hexagonais de Caos Triplas Concentricas
        for (let h = 0; h < 3; h++) {
          const haOffset = (h === 0 ? angle * 1.2 : (h === 1 ? -angle * 1.8 : angle * 2.2)) + (h * Math.PI) / 9;
          const hRadius = hexRadius * (0.75 + h * 0.2);
          ctx.strokeStyle = h === 0 ? '#ffffff' : (h === 1 ? '#f472b6' : '#dc2626');
          ctx.lineWidth = 3.5 - h * 0.5;
          ctx.shadowColor = '#991b1b';
          ctx.shadowBlur = 24;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const ha = haOffset + (s * Math.PI) / 3;
            const px = cx + Math.cos(ha) * hRadius;
            const py = cy + Math.sin(ha) * hRadius;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Fitas Orbitais de Magia do Caos em 3D
        const orbRibbons = 12;
        ctx.lineWidth = 2.5;
        for (let r = 0; r < orbRibbons; r++) {
          const ra = -angle * 2.5 + (r * Math.PI * 2) / orbRibbons;
          ctx.strokeStyle = r % 2 === 0 ? '#ffffff' : '#f43f5e';
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.quadraticCurveTo(
            cx + Math.cos(ra + 0.6) * (hexRadius * 0.8),
            cy + Math.sin(ra + 0.6) * (hexRadius * 0.8),
            cx + Math.cos(ra) * (hexRadius * 1.2),
            cy + Math.sin(ra) * (hexRadius * 1.2)
          );
          ctx.stroke();
        }
        break;
      }

      case 'DIMENSIONAL_PORTAL': {
        // WONG / SLING RING: Megagrandioso Portal Dimensional Multiversal
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 6.0;
        ctx.shadowColor = '#b45309';
        ctx.shadowBlur = 32;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.02, 0, Math.PI * 2);
        ctx.stroke();

        // Dentes de Fenda Dimensional
        const teeth = 36;
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2.5;
        for (let t = 0; t < teeth; t++) {
          const ta = angle * 3 + (t * Math.PI * 2) / teeth;
          const innerP = outerR * 0.95;
          const outerP = outerR * (t % 2 === 0 ? 1.22 : 1.1);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ta) * innerP, cy + Math.sin(ta) * innerP);
          ctx.lineTo(cx + Math.cos(ta) * outerP, cy + Math.sin(ta) * outerP);
          ctx.stroke();
        }
        break;
      }

      case 'SACRED_RINGS': {
        // SENHOR DO DESTINO (DOCTOR FATE): Santuário Inviolável e Ankh do Destino
        ctx.strokeStyle = '#eab308';
        ctx.lineWidth = 5.0;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.1, 0, Math.PI * 2);
        ctx.stroke();

        // Ankh Dourado Gigante no Centro
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        const ankhScale = radius * 0.45;
        
        // Loop da Ankh
        ctx.beginPath();
        ctx.ellipse(cx, cy - ankhScale * 0.4, ankhScale * 0.22, ankhScale * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Braços e Haste da Ankh
        ctx.beginPath();
        ctx.moveTo(cx - ankhScale * 0.45, cy - ankhScale * 0.1);
        ctx.lineTo(cx + ankhScale * 0.45, cy - ankhScale * 0.1);
        ctx.moveTo(cx, cy - ankhScale * 0.1);
        ctx.lineTo(cx, cy + ankhScale * 0.55);
        ctx.stroke();

        // Hieróglifos do Destino na Borda
        const fateGlyphs = ['𓋹', '𓁹', '𓏞', '𓋴', '𓌔', '𓎛', '𓀔', '𓃭'];
        ctx.font = `bold ${Math.max(16, radius * 0.11)}px serif`;
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let g = 0; g < fateGlyphs.length; g++) {
          const ga = angle * 0.9 + (g * Math.PI * 2) / fateGlyphs.length;
          const gx = cx + Math.cos(ga) * (outerR * 0.92);
          const gy = cy + Math.sin(ga) * (outerR * 0.92);
          ctx.save();
          ctx.translate(gx, gy);
          ctx.rotate(ga + Math.PI / 2);
          ctx.fillText(fateGlyphs[g], 0, 0);
          ctx.restore();
        }
        break;
      }

      case 'SOLAR_RUNIC_LOTUS': {
        // ANCIÃ (ANCIENT ONE): Mega Lótus Solar Astral Transcendente
        const lotusLayers = 24;
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#fef08a';
        ctx.shadowBlur = 22;

        for (let p = 0; p < lotusLayers; p++) {
          const pa = (p * Math.PI * 2) / lotusLayers + angle * 1.5;
          const px = cx + Math.cos(pa) * (outerR * 0.85);
          const py = cy + Math.sin(pa) * (outerR * 0.85);

          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(pa + Math.PI / 2);
          ctx.beginPath();
          ctx.ellipse(0, 0, outerR * 0.25, outerR * 0.08, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Raios Solares Transcendentais
        const rays = 36;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        for (let r = 0; r < rays; r++) {
          const ra = (r * Math.PI * 2) / rays - angle * 2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ra) * outerR, cy + Math.sin(ra) * outerR);
          ctx.lineTo(cx + Math.cos(ra) * (outerR * 1.25), cy + Math.sin(ra) * (outerR * 1.25));
          ctx.stroke();
        }
        break;
      }

      case 'CYBER_TECH_MATRIX': {
        // HOMEM DE FERRO: Reator Arc 100% Overdrive HUD Grid
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 4;
        ctx.shadowColor = '#0891b2';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.08, 0, Math.PI * 2);
        ctx.stroke();

        // Grade Cibernética Hexagonal
        const hexGridRadius = outerR * 0.85;
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.lineWidth = 1.5;
        for (let h = 0; h < 3; h++) {
          const hAngle = -angle * 2 + (h * Math.PI) / 3;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const sa = hAngle + (s * Math.PI) / 3;
            const px = cx + Math.cos(sa) * hexGridRadius;
            const py = cy + Math.sin(sa) * hexGridRadius;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();
        }

        // HUD Vórtices & Retículos Tecnológicos em Vetor
        const ticks = 36;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.0;
        for (let t = 0; t < ticks; t++) {
          const ta = angle * 2 + (t * Math.PI * 2) / ticks;
          const rInner = outerR * (t % 3 === 0 ? 0.95 : 1.02);
          const rOuter = outerR * 1.08;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ta) * rInner, cy + Math.sin(ta) * rInner);
          ctx.lineTo(cx + Math.cos(ta) * rOuter, cy + Math.sin(ta) * rOuter);
          ctx.stroke();
        }

        // Mira/Crosshair Central do Reator Arc
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx - outerR * 0.6, cy);
        ctx.lineTo(cx + outerR * 0.6, cy);
        ctx.moveTo(cx, cy - outerR * 0.6);
        ctx.lineTo(cx, cy + outerR * 0.6);
        ctx.stroke();
        break;
      }

      case 'ETHEREAL_SUPERNOVA': {
        // RAVENA: Manifestação da Alma de Azarath (Raven Soul-Self)
        // Asas Colossais do Corvo Místico
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 4.0;
        ctx.shadowColor = '#581c87';
        ctx.shadowBlur = 28;

        ctx.beginPath();
        // Asa Esquerda
        ctx.moveTo(cx, cy);
        ctx.bezierCurveTo(cx - outerR * 0.7, cy - outerR * 0.9, cx - outerR * 1.3, cy - outerR * 0.2, cx - outerR * 1.15, cy + outerR * 0.45);
        ctx.bezierCurveTo(cx - outerR * 0.75, cy + outerR * 0.2, cx - outerR * 0.4, cy + outerR * 0.1, cx, cy);
        // Asa Direita
        ctx.bezierCurveTo(cx + outerR * 0.4, cy + outerR * 0.1, cx + outerR * 0.75, cy + outerR * 0.2, cx + outerR * 1.15, cy + outerR * 0.45);
        ctx.bezierCurveTo(cx + outerR * 1.3, cy - outerR * 0.2, cx + outerR * 0.7, cy - outerR * 0.9, cx, cy);
        ctx.stroke();

        // Anéis Astrais de Ametista
        for (let ring = 1; ring <= 3; ring++) {
          ctx.strokeStyle = ring % 2 === 0 ? '#ffffff' : '#a855f7';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, outerR * (0.7 + ring * 0.18), 0, Math.PI * 2);
          ctx.stroke();
        }

        // Chakra / Gem de Alma no Centro em Diamante Gigante
        const bigGem = radius * 0.35;
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#f472b6';
        ctx.lineWidth = 3.0;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(cx, cy - bigGem);
        ctx.lineTo(cx + bigGem * 0.6, cy);
        ctx.lineTo(cx, cy + bigGem);
        ctx.lineTo(cx - bigGem * 0.6, cy);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Feixes de Luz da Alma em 12 Direções
        const soulRays = 12;
        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 2.0;
        for (let sr = 0; sr < soulRays; sr++) {
          const sra = angle * 1.8 + (sr * Math.PI * 2) / soulRays;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(sra) * bigGem, cy + Math.sin(sra) * bigGem);
          ctx.lineTo(cx + Math.cos(sra) * (outerR * 1.2), cy + Math.sin(sra) * (outerR * 1.2));
          ctx.stroke();
        }
        break;
      }

      case 'CELESTIAL_CHRONO': {
        // OLHO DE AGAMOTTO (MAGO DO TEMPO): Dobra Temporal Múltipla
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4.5;
        ctx.shadowColor = '#047857';
        ctx.shadowBlur = 28;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.1, 0, Math.PI * 2);
        ctx.stroke();

        // Olho de Agamotto Aberto
        const eyeWidth = outerR * 0.7;
        const eyeHeight = outerR * 0.35;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(cx - eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy - eyeHeight * 1.5, cx + eyeWidth, cy);
        ctx.quadraticCurveTo(cx, cy + eyeHeight * 1.5, cx - eyeWidth, cy);
        ctx.stroke();

        // Íris e Pupila do Olho Temporal
        ctx.fillStyle = '#a7f3d0';
        ctx.beginPath();
        ctx.arc(cx, cy, eyeHeight * 0.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#047857';
        ctx.beginPath();
        ctx.arc(cx, cy, eyeHeight * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Engrenagens do Passado e Futuro
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.0;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 0.88, angle * 2, angle * 2 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }

      case 'DRAGON_SEAL_VORTEX': {
        // SHOU-LAO (MAGO DRAGÃO): Invocação do Dragão Astral de Shou-Lao
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 5.0;
        ctx.shadowColor = '#991b1b';
        ctx.shadowBlur = 30;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR * 1.1, 0, Math.PI * 2);
        ctx.stroke();

        // Espiral do Dragão Oriental Coiled
        const coils = 50;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        for (let i = 0; i < coils; i++) {
          const ca = angle * 2.5 + (i * Math.PI * 4) / coils;
          const cr = (i / coils) * outerR * 0.95;
          const px = cx + Math.cos(ca) * cr;
          const py = cy + Math.sin(ca) * cr;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Ideogramas do Dragão Oriental
        const dragonChars = ['龍', '火', '神', '極', '覇', '爪', '印', '炎'];
        ctx.font = `bold ${Math.max(16, radius * 0.12)}px sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        for (let d = 0; d < dragonChars.length; d++) {
          const da = -angle * 1.5 + (d * Math.PI * 2) / dragonChars.length;
          const dx = cx + Math.cos(da) * (outerR * 0.92);
          const dy = cy + Math.sin(da) * (outerR * 0.92);
          ctx.save();
          ctx.translate(dx, dy);
          ctx.rotate(da + Math.PI / 2);
          ctx.fillText(dragonChars[d], 0, 0);
          ctx.restore();
        }
        break;
      }
    }

    particles.emitMegaShieldSparks(cx, cy, outerR, info.primaryColor, info.secondaryColor);

    ctx.restore();
  }

  // Auxiliar para desenhar texto rúnico em círculo
  private drawRunicTextCircle(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    r: number,
    rotAngle: number,
    glyphs: string[],
    color: string,
    fontSize: number
  ) {
    const count = glyphs.length;
    ctx.font = `bold ${fontSize}px "Hiragino Sans", "Yu Gothic", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < count; i++) {
      const gAngle = rotAngle + (i * Math.PI * 2) / count;
      const gx = cx + Math.cos(gAngle) * r;
      const gy = cy + Math.sin(gAngle) * r;
      const glyph = glyphs[i % glyphs.length];

      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(gAngle + Math.PI / 2);
      ctx.fillText(glyph, 0, 0);
      ctx.restore();
    }
  }

  // Ponte de energia entre mãos
  private drawInterHandEnergyBridge(
    ctx: CanvasRenderingContext2D,
    c1: { x: number; y: number },
    c2: { x: number; y: number },
    info: FilterInfo,
    scale: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 40) {
      ctx.restore();
      return;
    }

    const angle = Math.atan2(dy, dx);
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.0;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    const segments = 16;
    for (let s = 1; s < segments; s++) {
      const t = s / segments;
      const bx = c1.x + dx * t;
      const by = c1.y + dy * t;
      const wave = Math.sin(t * Math.PI * 3 + this.rotationAngle * 4) * 8 * scale;
      ctx.lineTo(bx + perpX * wave, by + perpY * wave);
    }
    ctx.lineTo(c2.x, c2.y);
    ctx.stroke();

    ctx.restore();
  }

  // Indicador do Gesto V
  private drawVSignIndicator(ctx: CanvasRenderingContext2D, hand: SmoothedHand, info: FilterInfo) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const pIndex = hand.indexTip;
    const pMiddle = hand.middleTip;
    const midX = (pIndex.x + pMiddle.x) / 2;
    const midY = (pIndex.y + pMiddle.y) / 2 - 25;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.arc(pIndex.x, pIndex.y, 10, 0, Math.PI * 2);
    ctx.arc(pMiddle.x, pMiddle.y, 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(pIndex.x, pIndex.y);
    ctx.lineTo(pMiddle.x, pMiddle.y);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✌️ Filtro', midX, midY);

    ctx.restore();
  }

  // Ripple de Transição ao Trocar de Filtro
  private drawFilterSwitchRipple(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    info: FilterInfo
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const cx = width / 2;
    const cy = height / 2;

    ctx.strokeStyle = `rgba(255, 255, 255, ${this.rippleAlpha})`;
    ctx.lineWidth = 3.5;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(cx, cy, this.rippleRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = `rgba(168, 85, 247, ${this.rippleAlpha * 0.7})`;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.max(0, this.rippleRadius - 20), 0, Math.PI * 2);
    ctx.stroke();

    // Banner Central com Nome do Filtro
    ctx.fillStyle = `rgba(255, 255, 255, ${this.rippleAlpha * 0.95})`;
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.rippleText, cx, cy - 30);

    ctx.restore();

    this.rippleRadius += 18;
    this.rippleAlpha *= 0.92;
  }

  // Esqueleto Anatômico Minimalista
  private renderMinimalSkeleton(ctx: CanvasRenderingContext2D, hand: SmoothedHand) {
    const lms = hand.smoothedLandmarks;
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17],
    ];

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1.5;

    connections.forEach(([i, j]) => {
      ctx.beginPath();
      ctx.moveTo(lms[i].x, lms[i].y);
      ctx.lineTo(lms[j].x, lms[j].y);
      ctx.stroke();
    });

    lms.forEach((pt, idx) => {
      const isTip = [4, 8, 12, 16, 20].includes(idx);
      ctx.fillStyle = isTip ? '#ffffff' : 'rgba(192, 132, 252, 0.8)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isTip ? 3.5 : 2.0, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  // =========================================================================
  // NOVO MODO: DETECÇÃO PURA DA MÃO (CYBER HUD ANALYTICS & NÓS ESQUELÉTICOS)
  // =========================================================================
  private renderPureTrackingHUD(
    ctx: CanvasRenderingContext2D,
    hand: SmoothedHand,
    handIndex: number,
    info: FilterInfo,
    settings: AppSettings,
    time: number,
    canvasW: number,
    canvasH: number
  ) {
    if (!hand.smoothedLandmarks || hand.smoothedLandmarks.length < 21) return;

    const lms = hand.smoothedLandmarks;
    const style = settings.pureTrackingStyle || 'NEON_CYBER';

    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // 1. Conexões anatômicas em neon
    const bonePairs = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Polegar
      [0, 5], [5, 6], [6, 7], [7, 8],       // Indicador
      [0, 9], [9, 10], [10, 11], [11, 12],  // Médio
      [0, 13], [13, 14], [14, 15], [15, 16],// Anelar
      [0, 17], [17, 18], [18, 19], [19, 20],// Mínimo
      [5, 9], [9, 13], [13, 17],            // Palma transversal
    ];

    // Desenho dos ossos com gradiente de profundidade
    bonePairs.forEach(([i, j]) => {
      const p1 = lms[i];
      const p2 = lms[j];
      const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      grad.addColorStop(0, info.primaryColor);
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(1, info.secondaryColor);

      ctx.strokeStyle = grad;
      ctx.lineWidth = style === 'MINIMAL_CLEAN' ? 2.0 : 3.0;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = style === 'HOLO_GLOW' ? 18 : 8;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // 2. Bounding Box Cibernética Dinâmica em torno da mão
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    lms.forEach((p) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const pad = 24;
    minX = Math.max(10, minX - pad);
    minY = Math.max(10, minY - pad);
    maxX = Math.min(canvasW - 10, maxX + pad);
    maxY = Math.min(canvasH - 10, maxY + pad);
    const boxW = maxX - minX;
    const boxH = maxY - minY;

    // Cantos angulares estilizados do HUD
    const cornerSize = Math.min(22, boxW * 0.25, boxH * 0.25);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 12;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(minX, minY + cornerSize);
    ctx.lineTo(minX, minY);
    ctx.lineTo(minX + cornerSize, minY);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(maxX - cornerSize, minY);
    ctx.lineTo(maxX, minY);
    ctx.lineTo(maxX, minY + cornerSize);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(maxX, maxY - cornerSize);
    ctx.lineTo(maxX, maxY);
    ctx.lineTo(maxX - cornerSize, maxY);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(minX + cornerSize, maxY);
    ctx.lineTo(minX, maxY);
    ctx.lineTo(minX, maxY - cornerSize);
    ctx.stroke();

    // Borda pontilhada do HUD
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.strokeRect(minX, minY, boxW, boxH);
    ctx.setLineDash([]);

    // 3. Nó de cada Articulação com Retículos e Coordenadas
    lms.forEach((p, idx) => {
      const isTip = [4, 8, 12, 16, 20].includes(idx);
      const isWrist = idx === 0;

      if (isTip) {
        // Retículo giratório na ponta do dedo
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = info.glowColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = info.primaryColor;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 12, time * 2 + idx, time * 2 + idx + Math.PI * 1.2);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Rótulo da ponta
        const tipNames: Record<number, string> = { 4: 'POLEGAR', 8: 'INDICADOR', 12: 'MÉDIO', 16: 'ANELAR', 20: 'MÍNIMO' };
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(tipNames[idx] || `T${idx}`, p.x + 12, p.y + 3);
      } else if (isWrist) {
        // Anel de pulso
        ctx.strokeStyle = info.secondaryColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = info.primaryColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Articulações normais
        ctx.fillStyle = info.secondaryColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 4. Centro da Palma: Giroscópio e Telemetria
    const palm = hand.palmCenter;
    const palmRadius = 24;
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(palm.x, palm.y, palmRadius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(palm.x, palm.y, palmRadius * 0.65, time * 3, time * 3 + Math.PI);
    ctx.stroke();

    // Cruz interna
    ctx.beginPath();
    ctx.moveTo(palm.x - 8, palm.y);
    ctx.lineTo(palm.x + 8, palm.y);
    ctx.moveTo(palm.x, palm.y - 8);
    ctx.lineTo(palm.x, palm.y + 8);
    ctx.stroke();

    // 5. Painel de Dados Telegráficos (HUD Analytics)
    const tagX = minX;
    const tagY = Math.max(16, minY - 12);
    const speed = Math.round(hand.velocity.speed);
    const conf = Math.round(hand.score * 100);
    const pinchDist = Math.round(hand.thumbIndexDistance);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(tagX, tagY - 14, 170, 20);
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(tagX, tagY - 14, 170, 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`MÃO ${handIndex + 1} [${hand.handedness.toUpperCase()}] • ${conf}% CONF`, tagX + 6, tagY);

    // Bloco Inferior de Dados
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(minX, maxY + 6, 190, 36);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.strokeRect(minX, maxY + 6, 190, 36);

    ctx.fillStyle = info.secondaryColor;
    ctx.font = '9px monospace';
    ctx.fillText(`VEL: ${speed}px/f | PINCH: ${pinchDist}px`, minX + 6, maxY + 20);
    ctx.fillText(`STATUS: ${hand.isClosedFist ? 'PUNHO FECHADO' : hand.isThumbIndexActive ? 'PINCH ATIVO' : hand.isVSign ? 'SINAL V' : 'RASTREAMENTO 21-PTS'}`, minX + 6, maxY + 34);

    ctx.restore();
  }

  // Telemetria entre 2 mãos no modo detecção pura
  private renderDualHandTelemetry(
    ctx: CanvasRenderingContext2D,
    h1: SmoothedHand,
    h2: SmoothedHand,
    info: FilterInfo
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const p1 = h1.palmCenter;
    const p2 = h2.palmCenter;
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // Linha de Conexão Vetorial Tracejada
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Marcador de Distância Central
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(midX - 55, midY - 14, 110, 24);
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(midX - 55, midY - 14, 110, 24);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`DIST: ${Math.round(dist)} px`, midX, midY + 2);

    ctx.restore();
  }

  // =========================================================================
  // SISTEMA DE LASER AVANÇADO E MULTI-INTERATIVO (LIMPO E OTIMIZADO)
  // =========================================================================
  private renderInteractiveLaserSystem(
    ctx: CanvasRenderingContext2D,
    hand: SmoothedHand,
    subMode: string,
    info: FilterInfo,
    scale: number,
    thickness: number,
    jitter: number,
    particles: CircleParticleSystem,
    canvasW: number,
    canvasH: number
  ) {
    const lms = hand.smoothedLandmarks;
    if (lms.length < 21) return;

    const thumbTip = lms[4];
    const indexTip = lms[8];
    const middleTip = lms[12];
    const ringTip = lms[16];
    const pinkyTip = lms[20];
    const palm = hand.palmCenter;

    const tips = [thumbTip, indexTip, middleTip, ringTip, pinkyTip];

    switch (subMode) {
      // 1. Contorno Sequencial dos Dedos (Mais limpo que o antigo cruzamento)
      case 'LASER_CROSS_FINGERS': {
        // Conecta o polegar ao indicador, indicador ao médio, etc.
        for (let i = 0; i < tips.length - 1; i++) {
          const pA = tips[i];
          const pB = tips[i + 1];
          const mid = { x: (pA.x + pB.x) / 2, y: (pA.y + pB.y) / 2 };
          this.drawEnhancedLaserBeam(ctx, pA, pB, mid.x, mid.y, info, scale * 0.7, thickness * 0.6);
        }
        // Feixe suave conectando o mindinho de volta ao polegar para fechar o circuito
        this.drawEnhancedLaserBeam(ctx, tips[4], tips[0], palm.x, palm.y, info, scale * 0.5, thickness * 0.4);
        break;
      }

      // 2. Feixe Direcional de Energia (Raio Limpo)
      case 'LASER_ENERGY_BEAM': {
        // Dispara a partir do centro da palma na direção apontada pela mão (usando a linha do pulso ao dedo médio)
        const p1 = lms[0]; // Pulso
        const p2 = lms[9]; // Base do dedo médio
        const dirX = p2.x - p1.x;
        const dirY = p2.y - p1.y;
        const len = Math.hypot(dirX, dirY);
        if (len < 5) break;

        const uX = dirX / len;
        const uY = dirY / len;
        const beamLength = 1200; // Alcance do laser saindo da palma
        
        // Offset para sair do centro da palma
        const targetX = palm.x + uX * beamLength;
        const targetY = palm.y + uY * beamLength;

        // Disparo contínuo com partículas bem controladas (apenas 1 emissão)
        particles.emitBeamTrail(palm.x, palm.y, targetX, targetY, info.primaryColor);

        this.drawDirectionalLaserBeam(ctx, palm, { x: targetX, y: targetY }, info, scale, thickness);
        break;
      }

      // 3. Arcos Elétricos de Alta Voltagem (Apenas o visual elétrico puro, sem poluição)
      case 'LASER_ARC_LIGHTNING': {
        for (let i = 0; i < tips.length - 1; i++) {
          const pA = tips[i];
          const pB = tips[i + 1];
          this.drawHighVoltageArc(ctx, pA, pB, info, scale, thickness, jitter);
        }
        // Arco central ligando polegar e mindinho cruzando a palma
        this.drawHighVoltageArc(ctx, tips[4], tips[0], info, scale, thickness * 1.5, jitter * 1.5);
        break;
      }

      // 4. Teia Holográfica (Fina e Minimalista)
      case 'LASER_MATRIX_WEB': {
        // Linhas bem finas e translúcidas conectando palma e dedos
        const webInfo = { ...info, glowColor: 'rgba(0,0,0,0)' }; // Remove o glow extra para não poluir
        tips.forEach((tip) => {
          this.drawEnhancedLaserBeam(ctx, palm, tip, (palm.x + tip.x) / 2, (palm.y + tip.y) / 2, webInfo, scale * 0.4, thickness * 0.3);
        });
        for (let i = 0; i < tips.length; i++) {
          const pNext = tips[(i + 1) % tips.length];
          this.drawEnhancedLaserBeam(ctx, tips[i], pNext, (tips[i].x + pNext.x) / 2, (tips[i].y + pNext.y) / 2, webInfo, scale * 0.4, thickness * 0.3);
        }
        
        // Núcleo central na palma
        ctx.fillStyle = info.primaryColor;
        ctx.beginPath();
        ctx.arc(palm.x, palm.y, 8 * scale, 0, Math.PI*2);
        ctx.fill();
        break;
      }

      // 5. Padrão: Indicador + Polegar (Pinça de Energia Clássica)
      case 'LASER_DUAL_CONNECT':
      default: {
        if (hand.isThumbIndexActive || hand.isLShape) {
          const cx = hand.thumbIndexCenter.x;
          const cy = hand.thumbIndexCenter.y;
          // Partículas apenas ativadas no momento do feixe
          if (Math.random() > 0.5) particles.emitBeamEnergy(thumbTip, indexTip, info.primaryColor, info.secondaryColor, 2);
          this.drawEnhancedLaserBeam(ctx, thumbTip, indexTip, cx, cy, info, scale, thickness);
        }
        break;
      }
    }
  }

  // Ponte Laser entre as duas mãos (Conexão Única e Limpa)
  private renderDualHandLaserBridge(
    ctx: CanvasRenderingContext2D,
    h1: SmoothedHand,
    h2: SmoothedHand,
    subMode: string,
    info: FilterInfo,
    scale: number,
    thickness: number,
    particles: CircleParticleSystem
  ) {
    const p1 = h1.palmCenter;
    const p2 = h2.palmCenter;
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // Apenas um feixe robusto e imponente entre as palmas das duas mãos
    if (Math.random() > 0.7) {
      particles.emitBeamEnergy(p1, p2, info.primaryColor, info.secondaryColor, 2);
    }
    this.drawEnhancedLaserBeam(ctx, p1, p2, midX, midY, info, scale * 1.5, thickness * 1.5);
  }

  // Feixe Laser Direcional Infinito (Disparador)
  private drawDirectionalLaserBeam(
    ctx: CanvasRenderingContext2D,
    start: { x: number; y: number },
    end: { x: number; y: number },
    info: FilterInfo,
    scale: number,
    thickness: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    // Feixe Externo
    const grad = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, info.secondaryColor);
    grad.addColorStop(0.6, info.primaryColor);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.strokeStyle = grad;
    ctx.lineWidth = Math.max(10, 20 * scale * thickness);
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 28;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    // Núcleo Branco Puro
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(3, 6 * scale * thickness);
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    // Orbe de Foco na Ponta do Dedo
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(start.x, start.y, 10 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 16 * scale, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // Arco Elétrico de Alta Voltagem
  private drawHighVoltageArc(
    ctx: CanvasRenderingContext2D,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    info: FilterInfo,
    scale: number,
    thickness: number,
    jitter: number
  ) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 5) {
      ctx.restore();
      return;
    }

    const angle = Math.atan2(dy, dx);
    const perpX = -Math.sin(angle);
    const perpY = Math.cos(angle);

    const segments = 16;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = Math.max(2, 3.5 * scale * thickness);
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 16;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);

    for (let s = 1; s < segments; s++) {
      const t = s / segments;
      const bx = p1.x + dx * t;
      const by = p1.y + dy * t;
      const noise = (Math.random() - 0.5) * 16 * jitter * scale;
      ctx.lineTo(bx + perpX * noise, by + perpY * noise);
    }
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    // Brilho colorido em volta
    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = Math.max(4, 8 * scale * thickness);
    ctx.stroke();

    ctx.restore();
  }
}
