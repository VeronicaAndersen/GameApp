import { useMemo } from 'react';
import { GameState } from '../types';
import { SICKNESS_CONFIG } from '../constants';
import { useLifeStages, UseLifeStagesReturn } from './useLifeStages';
import { usePoopMechanics, UsePoopMechanicsReturn } from './usePoopMechanics';
import { useSicknessAndDeath, UseSicknessAndDeathReturn } from './useSicknessAndDeath';
import { useSleepSchedule, UseSleepScheduleReturn } from './useSleepSchedule';

export interface UseTamagotchiFeaturesReturn {
  lifeStage: UseLifeStagesReturn;
  poop: UsePoopMechanicsReturn;
  health: UseSicknessAndDeathReturn;
  sleep: UseSleepScheduleReturn;
  totalDecayMultiplier: number;
}

/**
 * Coordinator hook that combines all Tamagotchi features
 * and manages their interactions
 */
export function useTamagotchiFeatures(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseTamagotchiFeaturesReturn {
  // Initialize all feature hooks
  const lifeStage = useLifeStages(gameState, setGameState);
  const poop = usePoopMechanics(gameState, setGameState);
  const health = useSicknessAndDeath(gameState, setGameState);
  const sleep = useSleepSchedule(gameState, setGameState);

  // Calculate combined decay multiplier based on life stage and sickness
  const totalDecayMultiplier = useMemo(() => {
    let multiplier = lifeStage.stageConfig.decayMultiplier;

    if (health.isSick) {
      multiplier *= SICKNESS_CONFIG.sickDecayMultiplier;
    }

    return multiplier;
  }, [lifeStage.stageConfig.decayMultiplier, health.isSick]);

  return {
    lifeStage,
    poop,
    health,
    sleep,
    totalDecayMultiplier,
  };
}
