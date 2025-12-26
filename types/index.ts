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
}

export interface GameState {
  character: CharacterType | null;
  level: number;
  experience: number;
  hunger: number;
  happiness: number;
}

export type CharacterProgressMap = {
  [K in CharacterType]: CharacterProgress;
};
