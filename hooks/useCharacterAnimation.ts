import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

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
    Animated.sequence([
      Animated.parallel([
        Animated.timing(characterScale, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(characterRotate, {
          toValue: -5,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.spring(characterScale, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(characterRotate, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [characterScale, characterRotate]);

  const playShakeAnimation = useCallback((): void => {
    Animated.sequence([
      Animated.timing(characterRotate, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(characterRotate, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [characterRotate]);

  const playSpinAnimation = useCallback((): void => {
    Animated.sequence([
      Animated.timing(characterRotate, {
        toValue: 360,
        duration: 600,
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
    Animated.sequence([
      Animated.parallel([
        Animated.spring(characterScale, {
          toValue: 1.15,
          friction: 2,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(characterRotate, {
            toValue: -8,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(characterRotate, {
            toValue: 8,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(characterRotate, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]),
      Animated.spring(characterScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
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
