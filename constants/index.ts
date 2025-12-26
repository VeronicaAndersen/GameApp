import { Character, GameState } from '../types';

export const BASE_WIDTH = 390;
export const BASE_HEIGHT = 844;

export const CHARACTERS: Character[] = [
  {
    type: 'lizard',
    name: 'Lizard with Human Head',
    emoji: '',
    color: '#8B4513',
  },
  {
    type: 'cat',
    name: 'Cute Cat',
    emoji: '',
    color: '#FF69B4',
  },
  {
    type: 'unicorn',
    name: 'Unicorn',
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
};

export const XP_PER_LEVEL = 100;
export const MAX_HUNGER = 100;
export const MAX_HAPPINESS = 100;
