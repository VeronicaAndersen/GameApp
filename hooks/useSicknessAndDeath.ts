import { useEffect, useCallback, useMemo } from 'react';
import { GameState } from '../types';
import { SICKNESS_CONFIG, DEATH_CONFIG } from '../constants';

export type SickReason = 'health' | 'poop' | 'neglect';

export interface UseSicknessAndDeathReturn {
  isSick: boolean;
  isDead: boolean;
  canRevive: boolean;
  handleRevive: () => void;
  sickReason?: SickReason;
}

const MS_PER_HOUR = 1000 * 60 * 60;
const CHECK_INTERVAL_MS = 30 * 1000; // Check every 30 seconds

/**
 * Hook for managing sickness and death mechanics
 */
export function useSicknessAndDeath(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseSicknessAndDeathReturn {
  // Determine why pet is sick (if sick)
  const sickReason = useMemo((): SickReason | undefined => {
    if (!gameState.isSick) return undefined;

    // Check in priority order
    if (gameState.health < SICKNESS_CONFIG.healthThreshold) {
      return 'health';
    }
    if (gameState.poopCount >= SICKNESS_CONFIG.poopSicknessThreshold) {
      return 'poop';
    }
    const hoursSinceInteraction = (Date.now() - gameState.lastInteraction) / MS_PER_HOUR;
    if (hoursSinceInteraction >= SICKNESS_CONFIG.neglectHours) {
      return 'neglect';
    }
    return undefined;
  }, [gameState.isSick, gameState.health, gameState.poopCount, gameState.lastInteraction]);

  // Check if revival is available
  const canRevive = useMemo(() => {
    if (!gameState.isDead) return false;
    if (!gameState.deathTime) return true;
    return Date.now() - gameState.deathTime >= DEATH_CONFIG.revivalCooldownMs;
  }, [gameState.isDead, gameState.deathTime]);

  // Handle revival
  const handleRevive = useCallback(() => {
    if (!gameState.isDead || !canRevive) return;

    setGameState((prev) => ({
      ...prev,
      isDead: false,
      deathTime: undefined,
      isSick: false,
      sickSince: undefined,
      health: DEATH_CONFIG.revivalHealthRestored,
      hunger: DEATH_CONFIG.revivalHungerRestored,
      energy: DEATH_CONFIG.revivalEnergyRestored,
      happiness: DEATH_CONFIG.revivalHappinessRestored,
      poopCount: 0,
      lastInteraction: Date.now(),
    }));
  }, [gameState.isDead, canRevive, setGameState]);

  // Monitor for sickness triggers
  useEffect(() => {
    if (gameState.isDead) return;

    const checkSickness = () => {
      const now = Date.now();
      const hoursSinceInteraction = (now - gameState.lastInteraction) / MS_PER_HOUR;

      // Check sickness triggers
      const shouldBeSick =
        gameState.health < SICKNESS_CONFIG.healthThreshold ||
        gameState.poopCount >= SICKNESS_CONFIG.poopSicknessThreshold ||
        hoursSinceInteraction >= SICKNESS_CONFIG.neglectHours;

      // Check recovery conditions (health must be above threshold)
      const canRecover =
        gameState.health >= SICKNESS_CONFIG.recoveryHealthThreshold &&
        gameState.poopCount < SICKNESS_CONFIG.poopSicknessThreshold &&
        hoursSinceInteraction < SICKNESS_CONFIG.neglectHours;

      if (shouldBeSick && !gameState.isSick) {
        // Become sick
        setGameState((prev) => ({
          ...prev,
          isSick: true,
          sickSince: now,
        }));
      } else if (canRecover && gameState.isSick) {
        // Recover from sickness
        setGameState((prev) => ({
          ...prev,
          isSick: false,
          sickSince: undefined,
        }));
      }
    };

    checkSickness();
    const interval = setInterval(checkSickness, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [
    gameState.isDead,
    gameState.health,
    gameState.poopCount,
    gameState.lastInteraction,
    gameState.isSick,
    setGameState,
  ]);

  // Monitor for death
  useEffect(() => {
    if (gameState.isDead) return;

    if (gameState.health <= SICKNESS_CONFIG.deathHealthThreshold) {
      setGameState((prev) => ({
        ...prev,
        isDead: true,
        deathTime: Date.now(),
      }));
    }
  }, [gameState.isDead, gameState.health, setGameState]);

  return {
    isSick: gameState.isSick,
    isDead: gameState.isDead,
    canRevive,
    handleRevive,
    sickReason,
  };
}
