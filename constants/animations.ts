/**
 * Animation configuration constants
 * Central location for all animation timing and parameter values
 */
export const ANIMATION_CONFIG = {
  // Existing bounce and levelUp animations
  bounce: {
    scale: 1.2,
    duration: 200,
  },
  levelUp: {
    duration: 500,
  },

  // ActionEmojis animation constants
  actionEmojis: {
    delayPerEmoji: 150, // Delay between each emoji starting animation
    randomXSpread: 100, // Maximum horizontal spread for random positioning
    randomRotateRange: 720, // Maximum rotation in degrees (-720 to 720)
    fadeInDuration: 200, // Duration of fade-in animation
    scaleFriction: 4, // Spring friction for scale animation
    scaleTension: 40, // Spring tension for scale animation
    translateYDistance: -80, // How far emojis float upward
    translateXDuration: 800, // Duration of horizontal movement
    translateYDuration: 800, // Duration of vertical movement
    rotateDuration: 800, // Duration of rotation animation
    fadeOutDuration: 600, // Duration of fade-out animation
    fadeOutDelay: 200, // Delay before starting fade-out
  },

  // SnoringAnimation constants
  snoring: {
    firstDelay: 0, // Delay for first emoji
    secondDelay: 400, // Delay for second emoji
    thirdDelay: 800, // Delay for third emoji
    fadeInDuration: 400, // Duration of fade-in
    translateYDistance: -60, // Initial upward float distance
    translateYFarDistance: -80, // Final upward float distance
    translateDuration: 1200, // Duration of main translation
    fadeOutDuration: 300, // Duration of fade-out
    leftPositions: ['30%', '45%', '60%'] as const, // Horizontal positions for the three emojis
  },

  // Character animations
  character: {
    jump: {
      scaleTo: 1.2,
      rotateTo: -5,
      duration: 150,
      springFriction: 3,
      springTension: 40,
    },
    shake: {
      rotateAmounts: [-10, 10] as const,
      durations: [50, 100, 100, 100, 50] as const,
    },
    spin: {
      rotateTo: 360,
      duration: 600,
    },
    happy: {
      scaleTo: 1.15,
      springFriction: 2,
      springTension: 40,
      rotateTo: [-8, 8] as const,
      durations: [100, 200, 100] as const,
    },
  },

  // Timeout durations for emoji displays
  timeouts: {
    actionEmojisDisplay: 2000, // How long action emojis show (2 seconds)
    snoringDisplay: 3000, // How long snoring animation shows (3 seconds)
  },
} as const;
