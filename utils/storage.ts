import { CharacterType, CharacterProgress, CharacterProgressMap, isCharacterType, LifeStage } from '../types';
import { INITIAL_STATE } from '../constants';
import { validateCharacterProgress, sanitizeCharacterProgress } from './validation';
import { PlatformStorage } from './platformStorage';

const STORAGE_KEY = '@game_character_progress';
const STORAGE_VERSION_KEY = '@game_storage_version';
const CURRENT_STORAGE_VERSION = 2;

/**
 * Custom error class for storage operations
 */
export class StorageError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Validates that progress data has the correct structure
 */
function isValidProgress(data: unknown): data is CharacterProgress {
  if (!data || typeof data !== 'object') return false;
  const progress = data as Record<string, unknown>;
  return (
    typeof progress.level === 'number' &&
    typeof progress.experience === 'number' &&
    typeof progress.hunger === 'number' &&
    typeof progress.happiness === 'number' &&
    typeof progress.energy === 'number' &&
    typeof progress.health === 'number' &&
    typeof progress.lastInteraction === 'number' &&
    (progress.customName === undefined || typeof progress.customName === 'string')
  );
}

/**
 * Validates that progress map has the correct structure
 */
function isValidProgressMap(data: unknown): data is CharacterProgressMap {
  if (!data || typeof data !== 'object') return false;
  const map = data as Record<string, unknown>;
  return Object.entries(map).every(
    ([key, value]) => isCharacterType(key) && isValidProgress(value)
  );
}

/**
 * Gets the default initial progress for a character
 */
function getDefaultProgress(): CharacterProgress {
  const now = Date.now();
  return {
    level: INITIAL_STATE.level,
    experience: INITIAL_STATE.experience,
    hunger: INITIAL_STATE.hunger,
    happiness: INITIAL_STATE.happiness,
    energy: INITIAL_STATE.energy,
    health: INITIAL_STATE.health,
    lastInteraction: now,
    // New Tamagotchi fields
    createdAt: now,
    lifeStage: 'baby',
    poopCount: 0,
    lastPoopTime: now,
    isSick: false,
    isDead: false,
    lightsOn: true,
    lastSleepQualityCheck: now,
  };
}

/**
 * Calculate initial life stage based on existing level (for migration)
 */
function calculateInitialStage(level: number): LifeStage {
  if (level <= 2) return 'baby';
  if (level <= 5) return 'child';
  if (level <= 10) return 'teen';
  if (level <= 20) return 'adult';
  return 'senior';
}

/**
 * Migrate v1 data (original format) to v2 (with Tamagotchi features)
 */
function migrateV1ToV2(data: Record<string, unknown>): CharacterProgressMap | null {
  const migrated: Partial<CharacterProgressMap> = {};
  const now = Date.now();

  for (const [key, value] of Object.entries(data)) {
    if (isCharacterType(key) && value && typeof value === 'object') {
      const oldProgress = value as Record<string, unknown>;
      const level = typeof oldProgress.level === 'number' ? oldProgress.level : 1;
      const lastInteraction = typeof oldProgress.lastInteraction === 'number'
        ? oldProgress.lastInteraction
        : now;

      // Create migrated progress with new fields
      const migratedProgress: CharacterProgress = {
        level,
        experience: typeof oldProgress.experience === 'number' ? oldProgress.experience : 0,
        hunger: typeof oldProgress.hunger === 'number' ? oldProgress.hunger : 50,
        happiness: typeof oldProgress.happiness === 'number' ? oldProgress.happiness : 50,
        energy: typeof oldProgress.energy === 'number' ? oldProgress.energy : 50,
        health: typeof oldProgress.health === 'number' ? oldProgress.health : 100,
        lastInteraction,
        customName: typeof oldProgress.customName === 'string' ? oldProgress.customName : undefined,
        // New fields with sensible defaults
        createdAt: lastInteraction - (24 * 60 * 60 * 1000), // Assume 1 day old
        lifeStage: calculateInitialStage(level),
        poopCount: 0,
        lastPoopTime: now,
        isSick: typeof oldProgress.health === 'number' && oldProgress.health < 20,
        sickSince: typeof oldProgress.health === 'number' && oldProgress.health < 20 ? now : undefined,
        isDead: false,
        deathTime: undefined,
        lightsOn: true,
        lastSleepQualityCheck: now,
      };

      migrated[key as CharacterType] = sanitizeCharacterProgress(migratedProgress);
    }
  }

  return Object.keys(migrated).length > 0 ? migrated as CharacterProgressMap : null;
}

/**
 * Loads all character progress from storage
 * @returns A map of character progress or null if not found
 * @throws {StorageError} If storage operation fails or data is corrupted
 */
export async function loadCharacterProgress(): Promise<CharacterProgressMap | null> {
  try {
    // Check storage version
    const versionStr = await PlatformStorage.getItem(STORAGE_VERSION_KEY);
    const version = versionStr ? parseInt(versionStr, 10) : 1;

    const jsonValue = await PlatformStorage.getItem(STORAGE_KEY);
    if (jsonValue === null) return null;

    const parsed = JSON.parse(jsonValue);

    // Migrate if necessary
    if (version < CURRENT_STORAGE_VERSION) {
      console.log(`Migrating storage from v${version} to v${CURRENT_STORAGE_VERSION}`);
      const migrated = migrateV1ToV2(parsed as Record<string, unknown>);

      if (migrated) {
        // Save migrated data and update version
        await saveCharacterProgress(migrated);
        await PlatformStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION.toString());
        return migrated;
      }
    }

    if (!isValidProgressMap(parsed)) {
      console.warn('Invalid progress data in storage, attempting to salvage');
      // Try to salvage what we can
      const salvaged: Partial<CharacterProgressMap> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (isCharacterType(key)) {
          const validation = validateCharacterProgress(value);
          if (validation.valid) {
            // Apply sanitization to add any missing new fields
            salvaged[key as CharacterType] = sanitizeCharacterProgress(validation.data);
          } else {
            console.warn(`Skipping invalid progress for ${key}:`, validation.error);
          }
        }
      }
      return Object.keys(salvaged).length > 0 ? salvaged as CharacterProgressMap : null;
    }

    // Ensure all entries have new fields via sanitization
    const sanitized: CharacterProgressMap = {} as CharacterProgressMap;
    for (const [key, value] of Object.entries(parsed)) {
      if (isCharacterType(key)) {
        sanitized[key as CharacterType] = sanitizeCharacterProgress(value as CharacterProgress);
      }
    }
    return sanitized;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new StorageError('Failed to parse stored progress data', error);
    }
    console.error('Error loading character progress:', error);
    throw new StorageError('Failed to load character progress', error);
  }
}

/**
 * Saves all character progress to storage
 * @param progressMap - Map of character progress to save
 * @throws {StorageError} If storage operation fails
 */
export async function saveCharacterProgress(
  progressMap: CharacterProgressMap
): Promise<void> {
  try {
    if (!isValidProgressMap(progressMap)) {
      throw new StorageError('Invalid progress map structure');
    }
    const jsonValue = JSON.stringify(progressMap);
    await PlatformStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving character progress:', error);
    throw new StorageError('Failed to save character progress', error);
  }
}

/**
 * Gets progress for a specific character
 * @param characterType - The character to get progress for
 * @returns The character's progress or default if not found
 */
export async function getCharacterProgress(
  characterType: CharacterType
): Promise<CharacterProgress> {
  try {
    const allProgress = await loadCharacterProgress();
    return allProgress?.[characterType] ?? getDefaultProgress();
  } catch (error) {
    console.error(`Error getting progress for ${characterType}:`, error);
    return getDefaultProgress();
  }
}

/**
 * Updates progress for a specific character
 * @param characterType - The character to update
 * @param progress - The new progress data
 * @throws {StorageError} If storage operation fails
 */
export async function updateCharacterProgress(
  characterType: CharacterType,
  progress: CharacterProgress
): Promise<void> {
  const validation = validateCharacterProgress(progress);
  if (!validation.valid) {
    throw new StorageError(`Invalid progress data: ${validation.error}`);
  }

  try {
    const allProgress = (await loadCharacterProgress()) ?? ({} as CharacterProgressMap);
    allProgress[characterType] = validation.data;
    await saveCharacterProgress(allProgress);
  } catch (error) {
    console.error(`Error updating progress for ${characterType}:`, error);
    throw error instanceof StorageError ? error : new StorageError('Failed to update character progress', error);
  }
}

/**
 * Clears all saved character progress (useful for debugging/reset)
 * @throws {StorageError} If storage operation fails
 */
export async function clearAllProgress(): Promise<void> {
  try {
    await PlatformStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing character progress:', error);
    throw new StorageError('Failed to clear character progress', error);
  }
}
