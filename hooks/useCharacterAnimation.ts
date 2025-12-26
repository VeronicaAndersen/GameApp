import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG } from '../constants/animations';

export interface UseCharacterAnimationReturn {
  characterScale: Animated.Value;
  characterRotate: Animated.Value;
  playJumpAnimation: () => void;
  playShakeAnimation: () => void;
  playSpinAnimation: () => void;
  playHappyAnimation: () => void;
}

/**
 * Custom hook for character animations
 * Provides various animations for character interactions
 */
export function useCharacterAnimation(): UseCharacterAnimationReturn {
  const characterScale = useRef(new Animated.Value(1)).current;
  const characterRotate = useRef(new Animated.Value(0)).current;

  const playJumpAnimation = useCallback((): void => {
    const config = ANIMATION_CONFIG.character.jump;
    Animated.sequence([
      Animated.parallel([
        Animated.timing(characterScale, {
          toValue: config.scaleTo,
          duration: config.duration,
          useNativeDriver: true,
        }),
        Animated.timing(characterRotate, {
          toValue: config.rotateTo,
          duration: config.duration,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(characterScale, {
          toValue: 1,
          friction: config.springFriction,
          tension: config.springTension,
          useNativeDriver: true,
        }),
        Animated.spring(characterRotate, {
          toValue: 0,
          friction: config.springFriction,
          tension: config.springTension,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [characterScale, characterRotate]);

  const playShakeAnimation = useCallback((): void => {
    const config = ANIMATION_CONFIG.character.shake;
    Animated.sequence([
      Animated.timing(characterRotate, {
        toValue: config.rotateAmounts[0],
        duration: config.durations[0],
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: config.rotateAmounts[1],
        duration: config.durations[1],
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: config.rotateAmounts[0],
        duration: config.durations[2],
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: config.rotateAmounts[1],
        duration: config.durations[3],
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 0,
        duration: config.durations[4],
        useNativeDriver: true,
      }),
    ]).start();
  }, [characterRotate]);

  const playSpinAnimation = useCallback((): void => {
    const config = ANIMATION_CONFIG.character.spin;
    Animated.sequence([
      Animated.timing(characterRotate, {
        toValue: config.rotateTo,
        duration: config.duration,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [characterRotate]);

  const playHappyAnimation = useCallback((): void => {
    const config = ANIMATION_CONFIG.character.happy;
    Animated.sequence([
      Animated.parallel([
        Animated.spring(characterScale, {
          toValue: config.scaleTo,
          friction: config.springFriction,
          tension: config.springTension,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(characterRotate, {
            toValue: config.rotateTo[0],
            duration: config.durations[0],
            useNativeDriver: true,
          }),
          Animated.timing(characterRotate, {
            toValue: config.rotateTo[1],
            duration: config.durations[1],
            useNativeDriver: true,
          }),
          Animated.timing(characterRotate, {
            toValue: 0,
            duration: config.durations[2],
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.spring(characterScale, {
        toValue: 1,
        friction: config.springFriction,
        tension: config.springTension,
        useNativeDriver: true,
      }),
    ]).start();
  }, [characterScale, characterRotate]);

  return {
    characterScale,
    characterRotate,
    playJumpAnimation,
    playShakeAnimation,
    playSpinAnimation,
    playHappyAnimation,
  };
}
