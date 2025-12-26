import { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG } from '../constants/animations';

/**
 * Custom hook for managing bounce animations
 * @returns An object containing the animated value and a function to trigger the animation
 */
export function useBounceAnimation() {
  const [bounceAnim] = useState(new Animated.Value(1));

  const playBounceAnimation = useCallback(() => {
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
