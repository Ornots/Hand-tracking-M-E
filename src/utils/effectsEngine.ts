import { SmoothedHand, CircleFilter, FendaFilter, AppSettings, FilterInfo, DualHandInteraction, FendaQuad, ColorPaletteTheme } from '../types';
import { CircleParticleSystem } from './particleSystem';

// Paletas de Cor Pré-definidas
export const COLOR_PALETTES: Record<ColorPaletteTheme, { name: string; primary: string; secondary: string; glow: string }> = {
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
    name: 'Personalizado',
    primary: '#9333ea',
    secondary: '#ffffff',
    glow: '#7e22ce',
  },
};

// 10 CÍRCULOS & MANDALAS NO TOTAL
export const FILTER_METADATA: Record<CircleFilter, FilterInfo> = {
  MYSTIC_MANDALA: {
    id: 'MYSTIC_MANDALA',
    name: '1. Mandala do Dr. Estranho',
    subtitle: 'Mandala sagrada com escritas místicas e estrelas entrelaçadas',
    icon: 'Shield',
    primaryColor: '#9333ea',
    secondaryColor: '#e9d5ff',
    glowColor: '#7e22ce',
  },
  COSMIC_VORTEX: {
    id: 'COSMIC_VORTEX',
    name: '2. Vórtice Cósmico',
    subtitle: 'Vórtice gravitacional de pura energia e espirais infinitas',
    icon: 'Sparkles',
    primaryColor: '#a855f7',
    secondaryColor: '#c084fc',
    glowColor: '#7e22ce',
  },
  PLASMA_CHAKRAM: {
    id: 'PLASMA_CHAKRAM',
    name: '3. Chakram de Plasma',
    subtitle: 'Disco giratório de lâminas de plasma de alta frequência',
    icon: 'Zap',
    primaryColor: '#c084fc',
    secondaryColor: '#f3e8ff',
    glowColor: '#581c87',
  },
  DIMENSIONAL_PORTAL: {
    id: 'DIMENSIONAL_PORTAL',
    name: '4. Portal Dimensional',
    subtitle: 'Anel giratório de faíscas estelares e fendas cósmicas',
    icon: 'Radio',
    primaryColor: '#d8b4fe',
    secondaryColor: '#a855f7',
    glowColor: '#3b0764',
  },
  SACRED_RINGS: {
    id: 'SACRED_RINGS',
    name: '5. Anéis Sagrados',
    subtitle: 'Ressonância harmônica de anéis concêntricos e pétalas',
    icon: 'Disc',
    primaryColor: '#a855f7',
    secondaryColor: '#ffffff',
    glowColor: '#9333ea',
  },
  SOLAR_RUNIC_LOTUS: {
    id: 'SOLAR_RUNIC_LOTUS',
    name: '6. Lótus Rúnica Solar',
    subtitle: 'Geometria de 12 pétalas sagradas com runas radiais',
    icon: 'Sun',
    primaryColor: '#eab308',
    secondaryColor: '#ffffff',
    glowColor: '#ca8a04',
  },
  CYBER_TECH_MATRIX: {
    id: 'CYBER_TECH_MATRIX',
    name: '7. Núcleo Cibernético HUD',
    subtitle: 'Visor tático futurista com anéis de mira e dados vetoriais',
    icon: 'Cpu',
    primaryColor: '#06b6d4',
    secondaryColor: '#ffffff',
    glowColor: '#0891b2',
  },
  ETHEREAL_SUPERNOVA: {
    id: 'ETHEREAL_SUPERNOVA',
    name: '8. Supernova Etérea',
    subtitle: 'Ondas gravitacionais de choque com anéis de luz pulsante',
    icon: 'Flame',
    primaryColor: '#ec4899',
    secondaryColor: '#ffffff',
    glowColor: '#be185d',
  },
  CELESTIAL_CHRONO: {
    id: 'CELESTIAL_CHRONO',
    name: '9. Astrolábio Cronos',
    subtitle: 'Relógio celestial dos arcanos com ponteiros multidimensionais',
    icon: 'Clock',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ede9fe',
    glowColor: '#6d28d9',
  },
  DRAGON_SEAL_VORTEX: {
    id: 'DRAGON_SEAL_VORTEX',
    name: '10. Selo do Dragão Astral',
    subtitle: 'Octagrama celestial com garras e glifos do dragão místico',
    icon: 'Compass',
    primaryColor: '#f43f5e',
    secondaryColor: '#ffe4e6',
    glowColor: '#e11d48',
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

  public triggerFilterSwitch(filterName: string) {
    this.rippleAlpha = 1.0;
    this.rippleRadius = 10;
    this.rippleText = filterName;
  }

  // Resolve as cores ativas considerando a paleta configurada pelo usuário
  private resolveColors(info: FilterInfo, settings: AppSettings): FilterInfo {
    if (settings.colorTheme === 'CUSTOM_RGB') {
      return {
        ...info,
        primaryColor: settings.customPrimaryColor || info.primaryColor,
        secondaryColor: settings.customSecondaryColor || info.secondaryColor,
        glowColor: settings.customGlowColor || info.glowColor,
      };
    }

    if (settings.colorTheme && settings.colorTheme !== 'DEFAULT_PURPLE') {
      const palette = COLOR_PALETTES[settings.colorTheme];
      if (palette) {
        return {
          ...info,
          primaryColor: palette.primary,
          secondaryColor: palette.secondary,
          glowColor: palette.glow,
        };
      }
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

    // =========================================================================
    // 0. NOVO MODO: DETECÇÃO PURA DA MÃO (CYBER HUD ANALYTICS & NÓS ESQUELÉTICOS)
    // =========================================================================
    if (settings.renderMode === 'MODO_DETECCAO_PURA') {
      const rawFilterInfo = FILTER_METADATA[activeFilter] || FILTER_METADATA.MYSTIC_MANDALA;
      const themeInfo = this.resolveColors(rawFilterInfo, settings);
      
      hands.forEach((hand, handIndex) => {
        this.renderPureTrackingHUD(ctx, hand, handIndex, themeInfo, settings, this.rotationAngle, width, height);
      });

      // Se houver 2 mãos, desenhar telemetria e vetor de distância entre elas
      if (hands.length >= 2) {
        this.renderDualHandTelemetry(ctx, hands[0], hands[1], themeInfo);
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
      if (settings.showSkeleton) {
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
      if (settings.showSkeleton) {
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
      if (settings.showSkeleton && hand.smoothedLandmarks.length === 21) {
        this.renderMinimalSkeleton(ctx, hand);
      }

      // No modo esferas: NÃO desenhar se a mão estiver fechada em punho
      if (hand.isClosedFist) {
        return;
      }

      // 5. Efeito Mandala na Palma da Mão (Visível quando a mão está aberta e não está mesclando escudo)
      if (!isMerging && !hand.isVSign) {
        // Usa o centro da palma da mão como origem
        const cx = hand.palmCenter.x;
        const cy = hand.palmCenter.y;
        // Raio base da mandala
        const baseRadius = 110 * settings.effectScale;

        // Modo Esferas / Mandalas (10 opções)
        particles.emitOrbitalSparks(cx, cy, baseRadius, filterInfo.primaryColor, filterInfo.secondaryColor, 2);
        this.drawSphereFilter(ctx, cx, cy, baseRadius, activeFilter, filterInfo, this.rotationAngle);
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

  // 3. PLASMA CHAKRAM (REFEITO: Estilo Esfera de Energia Caótica)
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

    // Halo principal da esfera de plasma
    const radGrad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r * 1.5);
    radGrad.addColorStop(0, '#ffffff');
    radGrad.addColorStop(0.2, info.secondaryColor);
    radGrad.addColorStop(0.6, info.primaryColor);
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Raios caóticos internos
    const boltCount = 12;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 10;

    for (let i = 0; i < boltCount; i++) {
      ctx.strokeStyle = i % 3 === 0 ? '#ffffff' : (i % 2 === 0 ? info.primaryColor : info.secondaryColor);
      ctx.beginPath();
      ctx.moveTo(cx, cy);

      const boltAngle = angle * (i % 2 === 0 ? 4 : -4) + (i * Math.PI * 2) / boltCount;
      const segments = 4;
      let currX = cx;
      let currY = cy;

      for (let s = 1; s <= segments; s++) {
        const t = s / segments;
        const radiusAtStep = r * t * (0.8 + Math.random() * 0.4); // Caos no raio
        const angleJitter = (Math.random() - 0.5) * 0.8;
        currX = cx + Math.cos(boltAngle + angleJitter) * radiusAtStep;
        currY = cy + Math.sin(boltAngle + angleJitter) * radiusAtStep;
        ctx.lineTo(currX, currY);
      }
      ctx.stroke();
    }

    // Anéis de contenção instáveis (órbitas)
    for(let o = 0; o < 3; o++) {
      ctx.strokeStyle = o === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = o === 0 ? 2 : 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * (0.3 + o * 0.2), angle * 2 + o * Math.PI/3, 0, Math.PI * 2);
      ctx.stroke();
    }

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

  // 5. ANÉIS SAGRADOS
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

    const petals = 8;
    for (let p = 0; p < petals; p++) {
      const pAngle = (p * Math.PI * 2) / petals + angle;
      const px = cx + Math.cos(pAngle) * (r * 0.5);
      const py = cy + Math.sin(pAngle) * (r * 0.5);

      ctx.strokeStyle = p % 2 === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = 2.0;
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, r * 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.0;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  // 6. LÓTUS RÚNICA SOLAR (NOVA)
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

    // 12 Pétalas em espiral
    const petals = 12;
    for (let layer = 0; layer < 3; layer++) {
      const layerR = r * (0.45 + layer * 0.28);
      const layerAngle = angle * (layer % 2 === 0 ? 1.5 : -1.5) + layer * 0.2;

      for (let p = 0; p < petals; p++) {
        const a = (p * Math.PI * 2) / petals + layerAngle;
        const px = cx + Math.cos(a) * layerR;
        const py = cy + Math.sin(a) * layerR;

        ctx.strokeStyle = layer === 0 ? '#ffffff' : (p % 2 === 0 ? info.primaryColor : info.secondaryColor);
        ctx.lineWidth = 1.8;
        ctx.shadowColor = info.glowColor;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(px, py, layerR * 0.35, layerR * 0.15, a + Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Anel externo com raios solares
    const rays = 24;
    for (let i = 0; i < rays; i++) {
      const ra = (i * Math.PI * 2) / rays - angle * 2;
      const r1 = r * 0.95;
      const r2 = r * (i % 2 === 0 ? 1.18 : 1.08);
      ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ra) * r1, cy + Math.sin(ra) * r1);
      ctx.lineTo(cx + Math.cos(ra) * r2, cy + Math.sin(ra) * r2);
      ctx.stroke();
    }

    // Núcleo
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
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

  // 8. SUPERNOVA ETÉREA (NOVA)
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

    // Ondas de choque pulsantes
    const shockwaves = 6;
    for (let sw = 0; sw < shockwaves; sw++) {
      const swR = ((angle * 120 + sw * (r / shockwaves)) % r) + r * 0.2;
      const alpha = 1.0 - swR / (r * 1.3);
      ctx.strokeStyle = sw % 2 === 0 ? '#ffffff' : info.primaryColor;
      ctx.lineWidth = Math.max(1, 4 * alpha);
      ctx.shadowColor = info.glowColor;
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, swR, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Raios de explosão de plasma
    const rayCount = 16;
    for (let i = 0; i < rayCount; i++) {
      const ra = (i * Math.PI * 2) / rayCount + angle * 3;
      const length = r * (0.8 + Math.sin(angle * 6 + i) * 0.35);
      ctx.strokeStyle = i % 2 === 0 ? '#ffffff' : info.secondaryColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ra) * length, cy + Math.sin(ra) * length);
      ctx.stroke();
    }

    // Núcleo ofuscante
    ctx.fillStyle = '#ffffff';
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.18, 0, Math.PI * 2);
    ctx.fill();

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

  // 10. SELO DO DRAGÃO ASTRAL (NOVA)
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

    // Octagrama Sagrado (2 Quadrados de 8 pontas)
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

    // Garras Astrais do Dragão
    const claws = 8;
    for (let c = 0; c < claws; c++) {
      const ca = (c * Math.PI * 2) / claws - angle * 2.5;
      const c1x = cx + Math.cos(ca) * (r * 0.6);
      const c1y = cy + Math.sin(ca) * (r * 0.6);
      const c2x = cx + Math.cos(ca + 0.3) * (r * 1.15);
      const c2y = cy + Math.sin(ca + 0.3) * (r * 1.15);
      const c3x = cx + Math.cos(ca) * (r * 0.9);
      const c3y = cy + Math.sin(ca) * (r * 0.9);

      ctx.strokeStyle = c % 2 === 0 ? '#ffffff' : info.secondaryColor;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.moveTo(c1x, c1y);
      ctx.quadraticCurveTo(c3x, c3y, c2x, c2y);
      ctx.stroke();
    }

    // Anel Central e Orbe
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
  // MEGA ESCUDO FUNDIDO COM DUAS MÃOS: EQUIVALENTE À ESFERA ATIVA
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
    this.drawSphereFilter(ctx, cx, cy, radius, activeFilter, info, angle);

    // 2. Anéis externos duplos gigantes
    const outerR = radius * 1.32;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.0;
    ctx.shadowColor = info.glowColor;
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = info.primaryColor;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR * 0.94, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Faixa de Runas no Mega Escudo
    const glyphCount = 32;
    const fontSize = Math.max(12, radius * 0.08);
    ctx.font = `bold ${fontSize}px "Hiragino Sans", "Yu Gothic", sans-serif`;
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < glyphCount; i++) {
      const gAngle = -angle * 0.8 + (i * Math.PI * 2) / glyphCount;
      const gx = cx + Math.cos(gAngle) * (outerR * 0.92);
      const gy = cy + Math.sin(gAngle) * (outerR * 0.92);
      const glyph = RUNIC_GLYPHS[i % RUNIC_GLYPHS.length];

      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(gAngle + Math.PI / 2);
      ctx.fillText(glyph, 0, 0);
      ctx.restore();
    }

    particles.emitMegaShieldSparks(cx, cy, outerR, info.primaryColor, info.secondaryColor);

    ctx.restore();
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
