import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterType, CharacterProgress, CharacterProgressMap, isCharacterType } from '../types';
import { INITIAL_STATE } from '../constants';
import { validateCharacterProgress } from './validation';

const STORAGE_KEY = '@game_character_progress';

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
  return {
    level: INITIAL_STATE.level,
    experience: INITIAL_STATE.experience,
    hunger: INITIAL_STATE.hunger,
    happiness: INITIAL_STATE.happiness,
    energy: INITIAL_STATE.energy,
    health: INITIAL_STATE.health,
    lastInteraction: Date.now(),
  };
}

/**
 * Loads all character progress from storage
 * @returns A map of character progress or null if not found
 * @throws {StorageError} If storage operation fails or data is corrupted
 */
export async function loadCharacterProgress(): Promise<CharacterProgressMap | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue === null) return null;

    const parsed = JSON.parse(jsonValue);
    if (!isValidProgressMap(parsed)) {
      console.warn('Invalid progress data in storage, attempting to salvage');
      // Try to salvage what we can
      const salvaged: Partial<CharacterProgressMap> = {};
      for (const [key, value] of Object.entries(parsed)) {
        if (isCharacterType(key)) {
          const validation = validateCharacterProgress(value);
          if (validation.valid) {
            salvaged[key as CharacterType] = validation.data;
          } else {
            console.warn(`Skipping invalid progress for ${key}:`, validation.error);
          }
        }
      }
      return Object.keys(salvaged).length > 0 ? salvaged as CharacterProgressMap : null;
    }
    return parsed;
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
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
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
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing character progress:', error);
    throw new StorageError('Failed to clear character progress', error);
  }
}
