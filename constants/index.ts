import { Character, GameState, LifeStage, LifeStageConfig } from '../types';

export const BASE_WIDTH = 390;
export const BASE_HEIGHT = 844;

export const CHARACTERS: Character[] = [
  {
    type: 'lizard',
    name: 'Ödla',
    emoji: '',
    color: '#8B4513',
  },
  {
    type: 'cat',
    name: 'Katt',
    emoji: '',
    color: '#FF69B4',
  },
  {
    type: 'unicorn',
    name: 'Enhörning',
    emoji: '🦄',
    color: '#9370DB',
  },
];

export const INITIAL_STATE: GameState = {
  character: null,
  level: 1,
  experience: 0,
  hunger: 50,
  happiness: 50,
  energy: 50,
  health: 100,
  lastInteraction: Date.now(),
  // Life stages
  createdAt: Date.now(),
  lifeStage: 'baby',
  // Poop mechanics
  poopCount: 0,
  lastPoopTime: Date.now(),
  // Sickness & death
  isSick: false,
  sickSince: undefined,
  isDead: false,
  deathTime: undefined,
  // Sleep schedule
  lightsOn: true,
  lastSleepQualityCheck: Date.now(),
};

export const XP_PER_LEVEL = 100;
export const MAX_HUNGER = 100;
export const MAX_HAPPINESS = 100;
export const MAX_ENERGY = 100;
export const MAX_HEALTH = 100;

// Stat decay rates (per hour)
export const DECAY_RATES = {
  hunger: 10,
  happiness: 8,
  energy: 12,
} as const;

// Life stage definitions (casual difficulty - longer thresholds)
export const LIFE_STAGES: Record<LifeStage, LifeStageConfig> = {
  baby: {
    name: 'Baby',
    minAgeHours: 0,
    maxAgeHours: 48,
    scale: 0.6,
    decayMultiplier: 1.2,
  },
  child: {
    name: 'Barn',
    minAgeHours: 48,
    maxAgeHours: 144,
    scale: 0.75,
    decayMultiplier: 1.1,
  },
  teen: {
    name: 'Tonåring',
    minAgeHours: 144,
    maxAgeHours: 336,
    scale: 0.9,
    decayMultiplier: 1.0,
  },
  adult: {
    name: 'Vuxen',
    minAgeHours: 336,
    maxAgeHours: 672,
    scale: 1.0,
    decayMultiplier: 0.9,
  },
  senior: {
    name: 'Senior',
    minAgeHours: 672,
    maxAgeHours: Infinity,
    scale: 0.95,
    decayMultiplier: 1.15,
  },
};

export const LIFE_STAGE_ORDER: LifeStage[] = ['baby', 'child', 'teen', 'adult', 'senior'];

// Poop mechanics (casual difficulty)
export const POOP_CONFIG = {
  maxPoop: 10,
  poopIntervalHours: 4,
  healthyPoopThreshold: 5,
  healthDecreasePerPoop: 3,
  cleanXpGain: 5,
} as const;

// Sickness mechanics (casual difficulty)
export const SICKNESS_CONFIG = {
  healthThreshold: 15,
  poopSicknessThreshold: 7,
  neglectHours: 48,
  sickDecayMultiplier: 1.5,
  recoveryHealthThreshold: 50,
  deathHealthThreshold: 0,
} as const;

// Death/revival mechanics (casual - immediate revival)
export const DEATH_CONFIG = {
  revivalCooldownMs: 0,
  revivalHealthRestored: 50,
  revivalHungerRestored: 50,
  revivalEnergyRestored: 50,
  revivalHappinessRestored: 50,
} as const;

// Sleep schedule mechanics
export const SLEEP_CONFIG = {
  nightStartHour: 22,
  nightEndHour: 6,
  lightsOnNightHappinessDecrease: 3,
  properSleepEnergyBonus: 1.5,
  improperSleepEnergyPenalty: 0.5,
  sleepQualityCheckIntervalMs: 30 * 60 * 1000,
} as const;
