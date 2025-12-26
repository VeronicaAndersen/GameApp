import { useCallback } from 'react';
import { Animated } from 'react-native';
import { GameState } from '../types';
import { MAX_HUNGER, MAX_HAPPINESS } from '../constants';
import { GAME_ACTIONS } from '../constants/gameActions';
import { useBounceAnimation } from './useBounceAnimation';

export interface UseGameActionsReturn {
  bounceAnim: Animated.Value;
  handleEat: () => void;
  handlePlay: () => void;
}

/**
 * Custom hook for managing game actions (eat, play)
 * @param setGameState - State setter function for the game state
 * @returns An object containing the bounce animation value and action handlers
 */
export function useGameActions(
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseGameActionsReturn {
  const { bounceAnim, playBounceAnimation } = useBounceAnimation();

  const handleEat = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      hunger: Math.min(MAX_HUNGER, prev.hunger + GAME_ACTIONS.eat.hungerIncrease),
      experience: prev.experience + GAME_ACTIONS.eat.experienceGain,
    }));
  }, [playBounceAnimation, setGameState]);

  const handlePlay = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      happiness: Math.min(MAX_HAPPINESS, prev.happiness + GAME_ACTIONS.play.happinessIncrease),
      experience: prev.experience + GAME_ACTIONS.play.experienceGain,
      hunger: Math.max(0, prev.hunger - GAME_ACTIONS.play.hungerDecrease),
    }));
  }, [playBounceAnimation, setGameState]);

  return {
    bounceAnim,
    handleEat,
    handlePlay,
  };
}
