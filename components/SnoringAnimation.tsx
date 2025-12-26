import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../utils/responsive';
import { ANIMATION_CONFIG } from '../constants/animations';
import { stopAnimatedValues, resetAnimatedValues } from '../utils/animationHelpers';

export interface SnoringAnimationProps {
  visible: boolean;
}

export const SnoringAnimation: React.FC<SnoringAnimationProps> = ({ visible }) => {
  // Store refs to animated values - these don't need to be in dependencies
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;
  const translateY1 = useRef(new Animated.Value(0)).current;
  const translateY2 = useRef(new Animated.Value(0)).current;
  const translateY3 = useRef(new Animated.Value(0)).current;

  // Store active animations for cleanup
  const activeAnimationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    if (visible) {
      const animConfig = ANIMATION_CONFIG.snoring;

      // Staggered snoring animation factory
      const createSnoringAnimation = (
        opacity: Animated.Value,
        translateY: Animated.Value,
        delay: number
      ) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.parallel([
              Animated.timing(opacity, {
                toValue: 1,
                duration: animConfig.fadeInDuration,
                useNativeDriver: true,
              }),
              Animated.timing(translateY, {
                toValue: animConfig.translateYDistance,
                duration: animConfig.translateDuration,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(opacity, {
                toValue: 0,
                duration: animConfig.fadeOutDuration,
                useNativeDriver: true,
              }),
              Animated.timing(translateY, {
                toValue: animConfig.translateYFarDistance,
                duration: animConfig.fadeOutDuration,
                useNativeDriver: true,
              }),
            ]),
            Animated.timing(translateY, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const animation1 = createSnoringAnimation(opacity1, translateY1, animConfig.firstDelay);
      const animation2 = createSnoringAnimation(opacity2, translateY2, animConfig.secondDelay);
      const animation3 = createSnoringAnimation(opacity3, translateY3, animConfig.thirdDelay);

      activeAnimationsRef.current = [animation1, animation2, animation3];

      animation1.start();
      animation2.start();
      animation3.start();

      return () => {
        // Stop all active looping animations
        activeAnimationsRef.current.forEach(anim => anim.stop());
        activeAnimationsRef.current = [];

        // Stop and reset all animated values
        stopAnimatedValues(opacity1, opacity2, opacity3, translateY1, translateY2, translateY3);
        resetAnimatedValues(0, opacity1, opacity2, opacity3, translateY1, translateY2, translateY3);
      };
    } else {
      // Reset when not visible
      resetAnimatedValues(0, opacity1, opacity2, opacity3, translateY1, translateY2, translateY3);
    }
    // Only depend on 'visible' - animated values are stable refs
  }, [visible, opacity1, opacity2, opacity3, translateY1, translateY2, translateY3]);

  if (!visible) return null;

  return (
    <>
      <Animated.View
        style={[
          styles.snoringEmoji,
          {
            opacity: opacity1,
            transform: [{ translateY: translateY1 }],
            left: ANIMATION_CONFIG.snoring.leftPositions[0],
          },
        ]}
      >
        <Text style={styles.emoji}>💤</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.snoringEmoji,
          {
            opacity: opacity2,
            transform: [{ translateY: translateY2 }],
            left: ANIMATION_CONFIG.snoring.leftPositions[1],
          },
        ]}
      >
        <Text style={styles.emoji}>💤</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.snoringEmoji,
          {
            opacity: opacity3,
            transform: [{ translateY: translateY3 }],
            left: ANIMATION_CONFIG.snoring.leftPositions[2],
          },
        ]}
      >
        <Text style={styles.emoji}>💤</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  snoringEmoji: {
    position: 'absolute',
    top: 0,
  },
  emoji: {
    fontSize: moderateScale(24),
  },
});
