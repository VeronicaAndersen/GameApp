export type CharacterType = 'lizard' | 'cat' | 'unicorn';

// Life stage types
export type LifeStage = 'baby' | 'child' | 'teen' | 'adult' | 'senior';

export interface LifeStageConfig {
  name: string;
  minAgeHours: number;
  maxAgeHours: number;
  scale: number;
  decayMultiplier: number;
}

export interface Character {
  type: CharacterType;
  name: string;
  emoji: string;
  color: string;
}

export interface CharacterProgress {
  level: number;
  experience: number;
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
  lastInteraction: number;
  customName?: string;
  // Life stages
  createdAt: number;
  lifeStage: LifeStage;
  // Poop mechanics
  poopCount: number;
  lastPoopTime: number;
  // Sickness & death
  isSick: boolean;
  sickSince?: number;
  isDead: boolean;
  deathTime?: number;
  // Sleep schedule
  lightsOn: boolean;
  lastSleepQualityCheck: number;
}

export interface GameState {
  character: CharacterType | null;
  level: number;
  experience: number;
  hunger: number;
  happiness: number;
  energy: number;
  health: number;
  lastInteraction: number;
  customName?: string;
  // Life stages
  createdAt: number;
  lifeStage: LifeStage;
  // Poop mechanics
  poopCount: number;
  lastPoopTime: number;
  // Sickness & death
  isSick: boolean;
  sickSince?: number;
  isDead: boolean;
  deathTime?: number;
  // Sleep schedule
  lightsOn: boolean;
  lastSleepQualityCheck: number;
}

export type CharacterProgressMap = {
  [K in CharacterType]: CharacterProgress;
};

/**
 * Dimensions type for responsive layouts
 */
export interface Dimensions {
  width: number;
  height: number;
}

/**
 * Type guard to check if a value is a valid CharacterType
 */
export function isCharacterType(value: unknown): value is CharacterType {
  return typeof value === 'string' && ['lizard', 'cat', 'unicorn'].includes(value);
}
