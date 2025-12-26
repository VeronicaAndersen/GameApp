import { useEffect } from 'react';
import { GameState } from '../types';
import { DECAY_RATES, MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY } from '../constants';

export interface UseStatDecayReturn {
  applyDecay: () => void;
}

/**
 * Custom hook for applying stat decay over time
 * @param gameState - Current game state
 * @param setGameState - State setter function
 * @returns Functions to manage stat decay
 */
export function useStatDecay(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseStatDecayReturn {
  const applyDecay = (): void => {
    if (!gameState.character) return;

    const now = Date.now();
    const timeSinceLastInteraction = now - gameState.lastInteraction;
    const hoursPassed = timeSinceLastInteraction / (1000 * 60 * 60);

    if (hoursPassed < 0.1) return; // Only decay if at least 6 minutes passed

    setGameState((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - DECAY_RATES.hunger * hoursPassed),
      happiness: Math.max(0, prev.happiness - DECAY_RATES.happiness * hoursPassed),
      energy: Math.max(0, prev.energy - DECAY_RATES.energy * hoursPassed),
      lastInteraction: now,
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      applyDecay();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [gameState.character, gameState.lastInteraction]);

  return { applyDecay };
}
