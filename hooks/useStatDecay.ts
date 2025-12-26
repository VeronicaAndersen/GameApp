import { useEffect, useCallback, useRef } from 'react';
import { GameState } from '../types';
import { DECAY_RATES } from '../constants';

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
  // Store character type to detect character changes
  const characterRef = useRef(gameState.character);

  // Memoize applyDecay to prevent recreating on every render
  const applyDecay = useCallback((): void => {
    setGameState((prev) => {
      if (!prev.character) return prev;

      const now = Date.now();
      const timeSinceLastInteraction = now - prev.lastInteraction;
      const hoursPassed = timeSinceLastInteraction / (1000 * 60 * 60);

      if (hoursPassed < 0.1) return prev; // Only decay if at least 6 minutes passed

      return {
        ...prev,
        hunger: Math.max(0, prev.hunger - DECAY_RATES.hunger * hoursPassed),
        happiness: Math.max(0, prev.happiness - DECAY_RATES.happiness * hoursPassed),
        energy: Math.max(0, prev.energy - DECAY_RATES.energy * hoursPassed),
        lastInteraction: now,
      };
    });
  }, [setGameState]);

  useEffect(() => {
    if (!gameState.character) return;

    // Clear interval if character changed
    if (characterRef.current !== gameState.character) {
      characterRef.current = gameState.character;
    }

    const interval = setInterval(() => {
      applyDecay();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [gameState.character, applyDecay]); // Only recreate if character changes

  return { applyDecay };
}
