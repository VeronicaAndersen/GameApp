import { useState, useEffect, useCallback } from 'react';
import { GameState, CharacterType } from '../types';
import { INITIAL_STATE } from '../constants';
import { getCharacterProgress, updateCharacterProgress } from '../utils/storage';

export interface UsePersistentGameStateReturn {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  selectCharacter: (type: CharacterType) => Promise<void>;
  isLoading: boolean;
}

/**
 * Custom hook for managing game state with persistence per character
 * @returns Game state, setter, and character selection handler
 */
export function usePersistentGameState(): UsePersistentGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Loads progress for a specific character from storage
   */
  const loadCharacterData = useCallback(async (characterType: CharacterType): Promise<void> => {
    setIsLoading(true);
    try {
      const progress = await getCharacterProgress(characterType);
      setGameState({
        character: characterType,
        ...progress,
      });
    } catch (error) {
      console.error('Error loading character data:', error);
      setGameState({ ...INITIAL_STATE, character: characterType });
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Saves current character progress to storage
   */
  const saveCurrentProgress = useCallback(async (): Promise<void> => {
    if (gameState.character) {
      const { character, ...progress } = gameState;
      await updateCharacterProgress(character, progress);
    }
  }, [gameState]);

  /**
   * Handles character selection and loads their saved progress
   */
  const selectCharacter = useCallback(
    async (type: CharacterType): Promise<void> => {
      await loadCharacterData(type);
    },
    [loadCharacterData]
  );

  /**
   * Auto-save whenever game state changes
   */
  useEffect(() => {
    if (gameState.character !== null && !isLoading) {
      saveCurrentProgress();
    }
    // Intentionally not including saveCurrentProgress to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.level, gameState.experience, gameState.hunger, gameState.happiness, gameState.energy, gameState.health, gameState.customName, gameState.character, isLoading]);

  return {
    gameState,
    setGameState,
    selectCharacter,
    isLoading,
  };
}
