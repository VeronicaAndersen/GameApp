import { useCallback } from 'react';
import { Animated } from 'react-native';
import { GameState } from '../types';
import { MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';
import { GAME_ACTIONS } from '../constants/gameActions';
import { useBounceAnimation } from './useBounceAnimation';

export interface UseGameActionsReturn {
  bounceAnim: Animated.Value;
  handleEat: () => void;
  handlePlay: () => void;
  handleSleep: () => void;
  handleExercise: () => void;
  handlePet: () => void;
  handleMedicine: () => void;
}

/**
 * Custom hook for managing game actions
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
      energy: Math.max(0, prev.energy - (GAME_ACTIONS.eat.energyDecrease || 0)),
      experience: prev.experience + GAME_ACTIONS.eat.experienceGain,
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  const handlePlay = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      happiness: Math.min(MAX_HAPPINESS, prev.happiness + GAME_ACTIONS.play.happinessIncrease),
      energy: Math.max(0, prev.energy - (GAME_ACTIONS.play.energyDecrease || 0)),
      experience: prev.experience + GAME_ACTIONS.play.experienceGain,
      hunger: Math.max(0, prev.hunger - GAME_ACTIONS.play.hungerDecrease),
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  const handleSleep = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      energy: Math.min(MAX_ENERGY, prev.energy + GAME_ACTIONS.sleep.energyIncrease),
      hunger: Math.max(0, prev.hunger - GAME_ACTIONS.sleep.hungerDecrease),
      experience: prev.experience + GAME_ACTIONS.sleep.experienceGain,
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  const handleExercise = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      health: Math.min(MAX_HEALTH, prev.health + GAME_ACTIONS.exercise.healthIncrease),
      happiness: Math.min(MAX_HAPPINESS, prev.happiness + (GAME_ACTIONS.exercise.happinessIncrease || 0)),
      energy: Math.max(0, prev.energy - GAME_ACTIONS.exercise.energyDecrease),
      hunger: Math.max(0, prev.hunger - GAME_ACTIONS.exercise.hungerDecrease),
      experience: prev.experience + GAME_ACTIONS.exercise.experienceGain,
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  const handlePet = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      happiness: Math.min(MAX_HAPPINESS, prev.happiness + GAME_ACTIONS.pet.happinessIncrease),
      health: Math.min(MAX_HEALTH, prev.health + GAME_ACTIONS.pet.healthIncrease),
      experience: prev.experience + GAME_ACTIONS.pet.experienceGain,
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  const handleMedicine = useCallback((): void => {
    playBounceAnimation();
    setGameState((prev) => ({
      ...prev,
      health: Math.min(MAX_HEALTH, prev.health + GAME_ACTIONS.medicine.healthIncrease),
      happiness: Math.max(0, prev.happiness - (GAME_ACTIONS.medicine.happinessDecrease || 0)),
      experience: prev.experience + GAME_ACTIONS.medicine.experienceGain,
      lastInteraction: Date.now(),
    }));
  }, [playBounceAnimation, setGameState]);

  return {
    bounceAnim,
    handleEat,
    handlePlay,
    handleSleep,
    handleExercise,
    handlePet,
    handleMedicine,
  };
}
