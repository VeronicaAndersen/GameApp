import { useEffect, useCallback, useMemo } from 'react';
import { GameState } from '../types';
import { POOP_CONFIG } from '../constants';

export interface UsePoopMechanicsReturn {
  poopCount: number;
  handleClean: () => void;
  isPoopCritical: boolean;
}

const MS_PER_HOUR = 1000 * 60 * 60;
const CHECK_INTERVAL_MS = 60 * 1000; // Check every minute

/**
 * Hook for managing poop accumulation and cleaning
 */
export function usePoopMechanics(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UsePoopMechanicsReturn {
  const isPoopCritical = useMemo(
    () => gameState.poopCount > POOP_CONFIG.healthyPoopThreshold,
    [gameState.poopCount]
  );

  // Handle cleaning action
  const handleClean = useCallback(() => {
    if (gameState.poopCount === 0) return;

    setGameState((prev) => ({
      ...prev,
      poopCount: 0,
      experience: prev.experience + POOP_CONFIG.cleanXpGain,
      lastInteraction: Date.now(),
    }));
  }, [gameState.poopCount, setGameState]);

  // Accumulate poop over time
  useEffect(() => {
    if (gameState.isDead) return;

    const checkPoop = () => {
      const now = Date.now();
      const hoursSinceLastPoop = (now - gameState.lastPoopTime) / MS_PER_HOUR;
      const poopsToAdd = Math.floor(hoursSinceLastPoop / POOP_CONFIG.poopIntervalHours);

      if (poopsToAdd > 0) {
        setGameState((prev) => ({
          ...prev,
          poopCount: Math.min(prev.poopCount + poopsToAdd, POOP_CONFIG.maxPoop),
          lastPoopTime: now,
        }));
      }
    };

    // Check immediately
    checkPoop();

    // Set up interval for ongoing checks
    const interval = setInterval(checkPoop, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [gameState.isDead, gameState.lastPoopTime, setGameState]);

  // Apply health penalty for excessive poop
  useEffect(() => {
    if (gameState.isDead || !isPoopCritical) return;

    // Apply penalty every hour (check every minute, apply proportionally)
    const interval = setInterval(() => {
      const hourlyPenalty = (gameState.poopCount - POOP_CONFIG.healthyPoopThreshold) * POOP_CONFIG.healthDecreasePerPoop;
      const minutePenalty = hourlyPenalty / 60;

      setGameState((prev) => ({
        ...prev,
        health: Math.max(0, prev.health - minutePenalty),
      }));
    }, CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [gameState.isDead, gameState.poopCount, isPoopCritical, setGameState]);

  return {
    poopCount: gameState.poopCount,
    handleClean,
    isPoopCritical,
  };
}
