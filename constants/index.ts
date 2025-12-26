import { Character, GameState } from '../types';

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
