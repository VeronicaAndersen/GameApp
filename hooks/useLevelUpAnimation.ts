import { useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG } from '../constants/animations';

/**
 * Custom hook for managing level-up badge animations
 * @returns An object containing the animated value and a function to trigger the animation
 */
export function useLevelUpAnimation() {
  const [levelUpAnim] = useState(new Animated.Value(0));

  const playLevelUpAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(levelUpAnim, {
        toValue: 1,
        duration: ANIMATION_CONFIG.levelUp.duration,
        useNativeDriver: true,
      }),
      Animated.timing(levelUpAnim, {
        toValue: 0,
        duration: ANIMATION_CONFIG.levelUp.duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [levelUpAnim]);

  return {
    levelUpAnim,
    playLevelUpAnimation,
  };
}
