import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterType, CharacterProgress, CharacterProgressMap } from '../types';
import { INITIAL_STATE } from '../constants';

const STORAGE_KEY = '@game_character_progress';

/**
 * Gets the default initial progress for a character
 */
function getDefaultProgress(): CharacterProgress {
  return {
    level: INITIAL_STATE.level,
    experience: INITIAL_STATE.experience,
    hunger: INITIAL_STATE.hunger,
    happiness: INITIAL_STATE.happiness,
  };
}

/**
 * Loads all character progress from storage
 * @returns A map of character progress or null if not found
 */
export async function loadCharacterProgress(): Promise<CharacterProgressMap | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading character progress:', error);
    return null;
  }
}

/**
 * Saves all character progress to storage
 * @param progressMap - Map of character progress to save
 */
export async function saveCharacterProgress(
  progressMap: CharacterProgressMap
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(progressMap);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving character progress:', error);
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
  const allProgress = await loadCharacterProgress();
  return allProgress?.[characterType] ?? getDefaultProgress();
}

/**
 * Updates progress for a specific character
 * @param characterType - The character to update
 * @param progress - The new progress data
 */
export async function updateCharacterProgress(
  characterType: CharacterType,
  progress: CharacterProgress
): Promise<void> {
  const allProgress = (await loadCharacterProgress()) ?? ({} as CharacterProgressMap);
  allProgress[characterType] = progress;
  await saveCharacterProgress(allProgress);
}

/**
 * Clears all saved character progress (useful for debugging/reset)
 */
export async function clearAllProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing character progress:', error);
  }
}
