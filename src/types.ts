export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export type HandGesture = 
  | 'V_SIGN'             // Sinal de V / Paz (muda o filtro)
  | 'THUMB_INDEX_PINCH'  // Indicador + Polegar (conjuração)
  | 'FRAME_GESTURE'      // Enquadramento com duas mãos
  | 'OPEN_PALM'
  | 'FIST'
  | 'NONE';

// 10 Filtros/Mandalas no total para Esferas & Mandalas
export type CircleFilter =
  | 'MYSTIC_MANDALA'       // 1. Mandala Rúnica Estilo Doutor Estranho (Hiper Detalhada)
  | 'COSMIC_VORTEX'        // 2. Vórtice Cósmico Púrpura e Branco
  | 'PLASMA_CHAKRAM'       // 3. Chakram de Plasma Radiante
  | 'DIMENSIONAL_PORTAL'   // 4. Portal Dimensional Circular de Faíscas
  | 'SACRED_RINGS'         // 5. Anéis Sagrados Concéntricos
  | 'SOLAR_RUNIC_LOTUS'    // 6. Lótus Rúnica Solar de 12 Pétalas
  | 'CYBER_TECH_MATRIX'    // 7. Núcleo Cibernético HUD com Glifos Digitais
  | 'ETHEREAL_SUPERNOVA'   // 8. Supernova Etérea de Ondas Gravitacionais
  | 'CELESTIAL_CHRONO'     // 9. Astrolábio Cronos Sagrado dos Magos
  | 'DRAGON_SEAL_VORTEX';  // 10. Selo do Dragão Arcano Astral

// 5 Filtros para o Modo Fenda
export type FendaFilter =
  | 'FENDA_PRISMA'        // Prisma Pop-Art / Térmico como na foto de referência
  | 'FENDA_COSMICA'       // Inversão Violeta Cósmica e Estelar
  | 'FENDA_QUANTICA'      // Visor Matrix Quântico Púrpura com Scanlines
  | 'FENDA_NEGATIVO'      // Eletro-Negativo de Alto Contraste
  | 'FENDA_MANDALA';      // Runas e Geometria Sagrada na Fenda

// Paletas de Cor Customizáveis
export type ColorPaletteTheme = 
  | 'DEFAULT_PURPLE'   // Púrpura Místico & Branco Astral (Padrão)
  | 'CYAN_NEON'        // Ciano Elétrico & Branco Glacial
  | 'SOLAR_GOLD'       // Ouro Solar Arcano & Ambar
  | 'CRIMSON_RUBY'     // Rubi Escarlate & Chamas Místicas
  | 'EMERALD_NATURE'   // Esmeralda Astral & Jade Luminoso
  | 'COSMIC_VIOLET'    // Violeta Noturno Profundo & Prata
  | 'CUSTOM_RGB';      // Cores Personalizadas pelo Usuário

export interface FilterInfo {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
}

export type EffectRenderMode = 
  | 'MODO_FENDA'          // Modo Fenda: Preso diretamente nos 4 dedos ou projetado com 1 mão
  | 'MODO_ESFERAS'        // Modo Esferas e Mandalas (10 mandalas/círculos)
  | 'MODO_CONEXAO'        // Modo Conexão Laser Avançado
  | 'MODO_DETECCAO_PURA'; // Modo que só tem a detecção da mão (HUD cibernético, nós ósseos, ângulos e distâncias)

// Submodos do Laser Avançado
export type LaserSubMode =
  | 'LASER_CROSS_FINGERS' // Laser entre todas as pontas dos dedos (indicador, polegar, médio, anelar, mínimo)
  | 'LASER_ENERGY_BEAM'   // Feixe direcional disparado da ponta do indicador (estilo Homem de Ferro / Raio Mágico)
  | 'LASER_DUAL_CONNECT'  // Feixe entre duas mãos conectando as pontas das mãos
  | 'LASER_ARC_LIGHTNING' // Arcos de alta voltagem que saltam entre os dedos
  | 'LASER_MATRIX_WEB';   // Teia Laser Holográfica em malha triangular

export interface AppSettings {
  renderMode: EffectRenderMode;
  activeFilter: CircleFilter;
  activeFendaFilter: FendaFilter;
  activeLaserSubMode: LaserSubMode;
  isEffectLocked?: boolean;
  
  // Customização de Cores
  colorTheme: ColorPaletteTheme;
  customPrimaryColor: string;
  customSecondaryColor: string;
  customGlowColor: string;

  // Áudio & Sensibilidade
  audioEnabled: boolean;
  audioVolume: number;           // 0.0 a 1.0
  showSkeleton: boolean;
  mirrorCamera: boolean;
  smoothingFactor: number;       // 0.1 a 0.9
  effectScale: number;           // 0.7 a 1.5
  particleDensity: number;       // 0.5 a 1.5
  rotationSpeed: number;         // 0.5 a 2.0
  laserThickness: number;        // 1.0 a 3.0
  laserArcJitter: number;        // 0.5 a 2.0
  pureTrackingStyle: 'NEON_CYBER' | 'MINIMAL_CLEAN' | 'HOLO_GLOW';
}

export interface SmoothedHand {
  id: number;
  rawLandmarks: Landmark[];
  smoothedLandmarks: Landmark[];
  velocity: { vx: number; vy: number; speed: number };
  handedness: 'Left' | 'Right';
  score: number;
  gesture: HandGesture;
  thumbTip: { x: number; y: number };
  indexTip: { x: number; y: number };
  middleTip: { x: number; y: number };
  wrist: { x: number; y: number };
  palmCenter: { x: number; y: number };
  
  // Gesto 1: Indicador e Polegar
  isThumbIndexActive: boolean;
  thumbIndexDistance: number;
  thumbIndexCenter: { x: number; y: number };
  
  // Gesto 2: Sinal de V
  isVSign: boolean;

  // Gesto L
  isLShape: boolean;

  // Mão Fechada (Punho / Fist)
  isClosedFist: boolean;
}

export interface FendaQuad {
  pTL: { x: number; y: number };
  pTR: { x: number; y: number };
  pBR: { x: number; y: number };
  pBL: { x: number; y: number };
  center: { x: number; y: number };
  width: number;
  height: number;
}

export interface DualHandInteraction {
  isDualActive: boolean;
  isFendaActive: boolean;
  fendaQuad: FendaQuad | null;
  isMergingShield: boolean;
  shieldCenter: { x: number; y: number };
  handDistance: number;
}

export interface ARState {
  activeFilter: CircleFilter;
  activeFendaFilter: FendaFilter;
  hands: SmoothedHand[];
  dualHand: DualHandInteraction;
  filterSwitchTriggered: boolean;
  filterSwitchTime: number;
  conjureIntensity: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  life: number;
  maxLife: number;
  type?: 'spark' | 'ring' | 'star' | 'ray';
  angle?: number;
  radius?: number;
  orbitSpeed?: number;
}
