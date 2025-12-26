export type CharacterType = 'lizard' | 'cat' | 'unicorn';

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
