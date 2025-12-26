export const GAME_ACTIONS = {
  eat: {
    hungerIncrease: 20,
    experienceGain: 10,
  },
  play: {
    happinessIncrease: 20,
    experienceGain: 15,
    hungerDecrease: 5,
  },
} as const;
