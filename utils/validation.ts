import { CharacterProgress, LifeStage } from '../types';
import { MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH, POOP_CONFIG, LIFE_STAGE_ORDER } from '../constants';

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

  // Validate new Tamagotchi fields if present (they may be missing in old data)
  if (progress.poopCount !== undefined) {
    if (typeof progress.poopCount !== 'number' || progress.poopCount < 0) {
      return { valid: false, error: 'poopCount must be a non-negative number' };
    }
  }

  if (progress.lifeStage !== undefined) {
    if (!LIFE_STAGE_ORDER.includes(progress.lifeStage as LifeStage)) {
      return { valid: false, error: 'Invalid lifeStage value' };
    }
  }

  if (progress.isSick !== undefined && typeof progress.isSick !== 'boolean') {
    return { valid: false, error: 'isSick must be a boolean' };
  }

  if (progress.isDead !== undefined && typeof progress.isDead !== 'boolean') {
    return { valid: false, error: 'isDead must be a boolean' };
  }

  if (progress.lightsOn !== undefined && typeof progress.lightsOn !== 'boolean') {
    return { valid: false, error: 'lightsOn must be a boolean' };
  }

  return { valid: true, data: progress as unknown as CharacterProgress };
}

/**
 * Clamps a stat value to valid bounds
 */
export function clampStat(value: number, max: number): number {
  return Math.max(0, Math.min(max, value));
}

/**
 * Sanitizes character progress data by clamping all values to valid ranges
 * Also adds default values for new Tamagotchi fields if missing
 */
export function sanitizeCharacterProgress(data: CharacterProgress): CharacterProgress {
  const now = Date.now();
  return {
    ...data,
    level: Math.max(1, Math.floor(data.level)),
    experience: Math.max(0, Math.floor(data.experience)),
    hunger: clampStat(data.hunger, MAX_HUNGER),
    happiness: clampStat(data.happiness, MAX_HAPPINESS),
    energy: clampStat(data.energy, MAX_ENERGY),
    health: clampStat(data.health, MAX_HEALTH),
    lastInteraction: Math.max(0, Math.min(now, data.lastInteraction)),
    // Add defaults for new Tamagotchi fields
    createdAt: data.createdAt ?? (data.lastInteraction - 86400000),
    lifeStage: data.lifeStage ?? 'baby',
    poopCount: Math.max(0, Math.min(POOP_CONFIG.maxPoop, data.poopCount ?? 0)),
    lastPoopTime: data.lastPoopTime ?? now,
    isSick: data.isSick ?? false,
    sickSince: data.sickSince,
    isDead: data.isDead ?? false,
    deathTime: data.deathTime,
    lightsOn: data.lightsOn ?? true,
    lastSleepQualityCheck: data.lastSleepQualityCheck ?? now,
  };
}
