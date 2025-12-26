import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG } from '../constants/animations';

export interface UseBounceAnimationReturn {
  bounceAnim: Animated.Value;
  playBounceAnimation: () => void;
}

/**
 * Custom hook for managing bounce animations
 * @returns An object containing the animated value and a function to trigger the animation
 */
export function useBounceAnimation(): UseBounceAnimationReturn {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const playBounceAnimation = useCallback((): void => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: ANIMATION_CONFIG.bounce.scale,
        duration: ANIMATION_CONFIG.bounce.duration,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: ANIMATION_CONFIG.bounce.duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim]);

  return {
    bounceAnim,
    playBounceAnimation,
  };
}
