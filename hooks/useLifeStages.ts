import { useEffect, useMemo } from 'react';
import { GameState, LifeStage, LifeStageConfig } from '../types';
import { LIFE_STAGES, LIFE_STAGE_ORDER } from '../constants';

export interface UseLifeStagesReturn {
  currentStage: LifeStage;
  stageConfig: LifeStageConfig;
  ageInHours: number;
  ageDisplay: string;
}

/**
 * Calculates the current life stage based on age
 */
function calculateLifeStage(ageInHours: number): LifeStage {
  for (const stage of LIFE_STAGE_ORDER) {
    const config = LIFE_STAGES[stage];
    if (ageInHours >= config.minAgeHours && ageInHours < config.maxAgeHours) {
      return stage;
    }
  }
  return 'senior';
}

/**
 * Formats age into a human-readable string
 */
function formatAge(ageInHours: number): string {
  if (ageInHours < 1) {
    const minutes = Math.floor(ageInHours * 60);
    return `${minutes} min`;
  }
  if (ageInHours < 24) {
    const hours = Math.floor(ageInHours);
    return `${hours} tim`;
  }
  const days = Math.floor(ageInHours / 24);
  const remainingHours = Math.floor(ageInHours % 24);
  if (remainingHours === 0) {
    return `${days} dag${days !== 1 ? 'ar' : ''}`;
  }
  return `${days} dag${days !== 1 ? 'ar' : ''}, ${remainingHours} tim`;
}

/**
 * Hook for managing pet life stages based on age
 */
export function useLifeStages(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseLifeStagesReturn {
  const ageInHours = useMemo(() => {
    const ageMs = Date.now() - gameState.createdAt;
    return ageMs / (1000 * 60 * 60);
  }, [gameState.createdAt]);

  const calculatedStage = useMemo(() => calculateLifeStage(ageInHours), [ageInHours]);

  const stageConfig = useMemo(() => LIFE_STAGES[calculatedStage], [calculatedStage]);

  const ageDisplay = useMemo(() => formatAge(ageInHours), [ageInHours]);

  // Update game state if life stage has changed
  useEffect(() => {
    if (calculatedStage !== gameState.lifeStage) {
      setGameState((prev) => ({
        ...prev,
        lifeStage: calculatedStage,
      }));
    }
  }, [calculatedStage, gameState.lifeStage, setGameState]);

  return {
    currentStage: calculatedStage,
    stageConfig,
    ageInHours,
    ageDisplay,
  };
}
