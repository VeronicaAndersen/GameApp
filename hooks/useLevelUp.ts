import { useEffect } from 'react';
import { Animated } from 'react-native';
import { GameState } from '../types';
import { useLevelUpAnimation } from './useLevelUpAnimation';
import {
  calculateLevel,
  calculateXpProgress,
  shouldLevelUp,
} from '../utils/levelCalculations';

export interface UseLevelUpReturn {
  levelUpAnim: Animated.Value;
  xpProgress: number;
}

/**
 * Custom hook for managing level-up logic and animations
 * @param gameState - Current game state
 * @param setGameState - State setter function for the game state
 * @returns An object containing the level-up animation value and XP progress
 */
export function useLevelUp(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseLevelUpReturn {
  const { levelUpAnim, playLevelUpAnimation } = useLevelUpAnimation();
  const xpProgress = calculateXpProgress(gameState.experience);

  useEffect(() => {
    if (shouldLevelUp(gameState.experience, gameState.level)) {
      const newLevel = calculateLevel(gameState.experience);
      setGameState((prev) => ({ ...prev, level: newLevel }));
      playLevelUpAnimation();
    }
  }, [gameState.experience, gameState.level, playLevelUpAnimation, setGameState]);

  return {
    levelUpAnim,
    xpProgress,
  };
}
