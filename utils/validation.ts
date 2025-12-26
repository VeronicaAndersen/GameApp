import { CharacterProgress } from '../types';
import { MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';

/**
 * Validates that a stat value is within acceptable bounds
 */
export function isValidStatValue(value: number, max: number): boolean {
  return typeof value === 'number' &&
         !isNaN(value) &&
         value >= 0 &&
         value <= max;
}

/**
 * Validates complete character progress data with detailed error reporting
 */
export function validateCharacterProgress(
  data: unknown
): { valid: true; data: CharacterProgress } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Progress data must be an object' };
  }

  const progress = data as Record<string, unknown>;

  // Check all required fields exist and have correct types
  const requiredFields = ['level', 'experience', 'hunger', 'happiness', 'energy', 'health', 'lastInteraction'];
  for (const field of requiredFields) {
    if (typeof progress[field] !== 'number') {
      return { valid: false, error: `Field '${field}' must be a number` };
    }
  }

  // Validate stat bounds
  if (!isValidStatValue(progress.hunger as number, MAX_HUNGER)) {
    return { valid: false, error: `Hunger must be between 0 and ${MAX_HUNGER}` };
  }
  if (!isValidStatValue(progress.happiness as number, MAX_HAPPINESS)) {
    return { valid: false, error: `Happiness must be between 0 and ${MAX_HAPPINESS}` };
  }
  if (!isValidStatValue(progress.energy as number, MAX_ENERGY)) {
    return { valid: false, error: `Energy must be between 0 and ${MAX_ENERGY}` };
  }
  if (!isValidStatValue(progress.health as number, MAX_HEALTH)) {
    return { valid: false, error: `Health must be between 0 and ${MAX_HEALTH}` };
  }

  // Validate level and experience are positive
  if ((progress.level as number) < 1) {
    return { valid: false, error: 'Level must be at least 1' };
  }
  if ((progress.experience as number) < 0) {
    return { valid: false, error: 'Experience cannot be negative' };
  }

  // Validate lastInteraction is a valid timestamp
  if ((progress.lastInteraction as number) < 0 || (progress.lastInteraction as number) > Date.now() + 1000) {
    return { valid: false, error: 'Invalid lastInteraction timestamp' };
  }

  // Validate optional customName
  if (progress.customName !== undefined && typeof progress.customName !== 'string') {
    return { valid: false, error: 'customName must be a string if provided' };
  }

  return { valid: true, data: progress as CharacterProgress };
}

/**
 * Clamps a stat value to valid bounds
 */
export function clampStat(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

/**
 * Sanitizes character progress data by clamping all values to valid ranges
 */
export function sanitizeCharacterProgress(data: CharacterProgress): CharacterProgress {
  return {
    ...data,
    level: Math.max(1, Math.floor(data.level)),
    experience: Math.max(0, Math.floor(data.experience)),
    hunger: clampStat(data.hunger, MAX_HUNGER),
    happiness: clampStat(data.happiness, MAX_HAPPINESS),
    energy: clampStat(data.energy, MAX_ENERGY),
    health: clampStat(data.health, MAX_HEALTH),
    lastInteraction: Math.max(0, Math.min(Date.now(), data.lastInteraction)),
  };
}
