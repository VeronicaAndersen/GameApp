/* eslint-disable no-console */
import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, CharacterType, isCharacterType } from '../types';
import { INITIAL_STATE } from '../constants';
import { getCharacterProgress, updateCharacterProgress } from '../utils/storage';
import { validateCharacterProgress, sanitizeCharacterProgress } from '../utils/validation';
import { PlatformStorage } from '../utils/platformStorage';

const LAST_CHARACTER_KEY = '@game_last_character';

export interface UsePersistentGameStateReturn {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  selectCharacter: (type: CharacterType) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for managing game state with persistence per character
 * @returns Game state, setter, and character selection handler
 */
export function usePersistentGameState(): UsePersistentGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /**
   * Loads progress for a specific character from storage
   */
  const loadCharacterData = useCallback(async (characterType: CharacterType): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const progress = await getCharacterProgress(characterType);

      // Validate loaded data
      const validation = validateCharacterProgress(progress);
      if (!validation.valid) {
        console.warn('Invalid character data loaded, using sanitized version:', validation.error);
        const sanitized = sanitizeCharacterProgress(progress);
        setGameState({ character: characterType, ...sanitized });
      } else {
        setGameState({ character: characterType, ...validation.data });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error loading character';
      console.error('Error loading character data:', err);
      setError(errorMessage);
      setGameState({ ...INITIAL_STATE, character: characterType });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Saves current character progress to storage with error handling
   */
  const saveCurrentProgress = useCallback(async (): Promise<void> => {
    if (!gameState.character) return;

    try {
      const { character, ...progress } = gameState;

      // Validate before saving
      const validation = validateCharacterProgress(progress);
      if (!validation.valid) {
        console.error('Invalid game state, cannot save:', validation.error);
        return;
      }

      await updateCharacterProgress(character, validation.data);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error saving progress';
      console.error('Error saving character progress:', err);
      setError(errorMessage);
      // Don't throw - allow game to continue even if save fails
    }
  }, [gameState]);

  /**
   * Handles character selection and loads their saved progress
   */
  const selectCharacter = useCallback(
    async (type: CharacterType): Promise<void> => {
      await loadCharacterData(type);
      await PlatformStorage.setItem(LAST_CHARACTER_KEY, type);
    },
    [loadCharacterData]
  );

  // On mount, restore the last selected character
  useEffect(() => {
    (async () => {
      try {
        const lastCharacter = await PlatformStorage.getItem(LAST_CHARACTER_KEY);
        if (lastCharacter && isCharacterType(lastCharacter)) {
          await loadCharacterData(lastCharacter);
        }
      } catch (err) {
        console.error('Failed to restore last character:', err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Clear last character when user returns to character selection
  useEffect(() => {
    if (gameState.character === null) {
      PlatformStorage.removeItem(LAST_CHARACTER_KEY).catch(() => {});
    }
  }, [gameState.character]);

  /**
   * Auto-save with debouncing and error handling
   */
  useEffect(() => {
    if (gameState.character === null || isLoading) return;

    // Debounce saves - wait 500ms after last change
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      // Fire and forget with error handling
      saveCurrentProgress().catch(err => {
        console.error('Auto-save failed:', err);
      });
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    gameState.level,
    gameState.experience,
    gameState.hunger,
    gameState.happiness,
    gameState.energy,
    gameState.health,
    gameState.customName,
    gameState.character,
    // Tamagotchi fields
    gameState.lifeStage,
    gameState.poopCount,
    gameState.isSick,
    gameState.isDead,
    gameState.lightsOn,
    isLoading,
    saveCurrentProgress,
  ]);

  return {
    gameState,
    setGameState,
    selectCharacter,
    isLoading,
    error,
  };
}
