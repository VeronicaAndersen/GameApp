import { XP_PER_LEVEL } from '../constants';

/**
 * Calculates the current level based on total experience
 * @param experience - Total experience points
 * @returns The current level
 */
export function calculateLevel(experience: number): number {
  return Math.floor(experience / XP_PER_LEVEL) + 1;
}

/**
 * Calculates the experience required for the next level
 * @param currentLevel - Current player level
 * @returns Experience points required for next level
 */
export function calculateXpForNextLevel(currentLevel: number): number {
  return currentLevel * XP_PER_LEVEL;
}

/**
 * Calculates the progress toward the next level as a percentage (0-1)
 * @param experience - Total experience points
 * @returns Progress as a decimal between 0 and 1
 */
export function calculateXpProgress(experience: number): number {
  return (experience % XP_PER_LEVEL) / XP_PER_LEVEL;
}

/**
 * Checks if the player should level up based on current experience and level
 * @param experience - Total experience points
 * @param currentLevel - Current player level
 * @returns True if the player should level up
 */
export function shouldLevelUp(experience: number, currentLevel: number): boolean {
  const calculatedLevel = calculateLevel(experience);
  return calculatedLevel > currentLevel;
}
