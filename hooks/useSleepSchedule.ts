import { useEffect, useCallback, useMemo } from 'react';
import { GameState } from '../types';
import { SLEEP_CONFIG } from '../constants';

export type SleepQuality = 'good' | 'poor';

export interface UseSleepScheduleReturn {
  isNightTime: boolean;
  lightsOn: boolean;
  toggleLights: () => void;
  sleepQuality: SleepQuality;
  currentHour: number;
}

/**
 * Determines if the given hour is during night time
 */
function isNight(hour: number): boolean {
  // Night spans from nightStartHour to nightEndHour (wrapping around midnight)
  if (SLEEP_CONFIG.nightStartHour > SLEEP_CONFIG.nightEndHour) {
    // Night crosses midnight (e.g., 22:00 to 6:00)
    return hour >= SLEEP_CONFIG.nightStartHour || hour < SLEEP_CONFIG.nightEndHour;
  }
  // Night doesn't cross midnight
  return hour >= SLEEP_CONFIG.nightStartHour && hour < SLEEP_CONFIG.nightEndHour;
}

/**
 * Hook for managing sleep schedule and lights toggle
 */
export function useSleepSchedule(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseSleepScheduleReturn {
  const currentHour = useMemo(() => new Date().getHours(), []);

  const isNightTime = useMemo(() => isNight(currentHour), [currentHour]);

  // Sleep quality is good if it's night and lights are off, or if it's day
  const sleepQuality = useMemo((): SleepQuality => {
    if (!isNightTime) return 'good'; // Day time - always good
    return gameState.lightsOn ? 'poor' : 'good';
  }, [isNightTime, gameState.lightsOn]);

  // Toggle lights on/off
  const toggleLights = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      lightsOn: !prev.lightsOn,
      lastInteraction: Date.now(),
    }));
  }, [setGameState]);

  // Apply happiness penalty if lights are on during night
  useEffect(() => {
    if (gameState.isDead || !isNightTime || !gameState.lightsOn) return;

    const applyNightPenalty = () => {
      setGameState((prev) => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - SLEEP_CONFIG.lightsOnNightHappinessDecrease / 60),
        lastSleepQualityCheck: Date.now(),
      }));
    };

    // Apply penalty every minute (scaled from hourly rate)
    const interval = setInterval(applyNightPenalty, 60 * 1000);
    return () => clearInterval(interval);
  }, [gameState.isDead, isNightTime, gameState.lightsOn, setGameState]);

  return {
    isNightTime,
    lightsOn: gameState.lightsOn,
    toggleLights,
    sleepQuality,
    currentHour,
  };
}
