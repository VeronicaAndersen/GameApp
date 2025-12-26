import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { moderateScale } from '../utils/responsive';
import { ANIMATION_CONFIG } from '../constants/animations';
import { stopAnimatedValues, resetAnimatedValues } from '../utils/animationHelpers';

export type ActionType = 'eat' | 'play' | 'medicine';

interface ActionEmojiConfig {
  emojis: string[];
  count: number;
}

const ACTION_CONFIGS: Record<ActionType, ActionEmojiConfig> = {
  eat: {
    emojis: ['🍕', '🍔', '🍎', '🍌', '🍪', '🍰', '🥐', '🥗'],
    count: 5,
  },
  play: {
    emojis: ['⚽', '🏀', '🎾', '⚾', '🏐', '🎱'],
    count: 4,
  },
  medicine: {
    emojis: ['💊'],
    count: 3,
  },
};

export interface ActionEmojisProps {
  visible: boolean;
  actionType: ActionType;
}

interface EmojiAnimation {
  opacity: Animated.Value;
  translateY: Animated.Value;
  translateX: Animated.Value;
  rotate: Animated.Value;
  scale: Animated.Value;
  emoji: string;
}

export const ActionEmojis: React.FC<ActionEmojisProps> = ({ visible, actionType }) => {
  const animationsRef = useRef<EmojiAnimation[]>([]);
  const activeAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Initialize animations based on action type
  // Use useMemo to recreate when actionType changes
  const animations = useMemo(() => {
    const config = ACTION_CONFIGS[actionType];
    const count = config.count;
    const newAnimations: EmojiAnimation[] = [];

    for (let i = 0; i < count; i++) {
      const randomEmoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
      newAnimations.push({
        opacity: new Animated.Value(0),
        translateY: new Animated.Value(0),
        translateX: new Animated.Value(0),
        rotate: new Animated.Value(0),
        scale: new Animated.Value(0),
        emoji: randomEmoji,
      });
    }

    animationsRef.current = newAnimations;
    return newAnimations;
  }, [actionType]);

  useEffect(() => {
    if (visible) {
      const config = ACTION_CONFIGS[actionType];
      const animConfig = ANIMATION_CONFIG.actionEmojis;

      // Update emojis with random selection
      animations.forEach((anim) => {
        anim.emoji = config.emojis[Math.floor(Math.random() * config.emojis.length)];
      });

      // Create animations for each emoji
      const animationSequences = animations.map((anim, index) => {
        const delay = index * animConfig.delayPerEmoji;
        const randomX = (Math.random() - 0.5) * animConfig.randomXSpread;
        const randomRotate = (Math.random() - 0.5) * animConfig.randomRotateRange;

        return Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 1,
              duration: animConfig.fadeInDuration,
              useNativeDriver: true,
            }),
            Animated.spring(anim.scale, {
              toValue: 1,
              friction: animConfig.scaleFriction,
              tension: animConfig.scaleTension,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(anim.translateY, {
              toValue: animConfig.translateYDistance,
              duration: animConfig.translateYDuration,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateX, {
              toValue: randomX,
              duration: animConfig.translateXDuration,
              useNativeDriver: true,
            }),
            Animated.timing(anim.rotate, {
              toValue: randomRotate,
              duration: animConfig.rotateDuration,
              useNativeDriver: true,
            }),
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: animConfig.fadeOutDuration,
              delay: animConfig.fadeOutDelay,
              useNativeDriver: true,
            }),
          ]),
        ]);
      });

      // Start all animations and store reference
      activeAnimationRef.current = Animated.parallel(animationSequences);
      activeAnimationRef.current.start(({ finished }) => {
        if (finished) {
          // Reset all values after completion
          animations.forEach((anim) => {
            anim.opacity.setValue(0);
            anim.translateY.setValue(0);
            anim.translateX.setValue(0);
            anim.rotate.setValue(0);
            anim.scale.setValue(0);
          });
        }
      });

      return () => {
        // Stop active animation
        if (activeAnimationRef.current) {
          activeAnimationRef.current.stop();
          activeAnimationRef.current = null;
        }

        // Stop all individual animated values
        animations.forEach((anim) => {
          stopAnimatedValues(
            anim.opacity,
            anim.translateY,
            anim.translateX,
            anim.rotate,
            anim.scale
          );
          // Reset to initial state
          resetAnimatedValues(0, anim.opacity, anim.translateY, anim.translateX, anim.rotate, anim.scale);
        });
      };
    }
  }, [visible, actionType, animations]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={`${actionType}-${index}`}
          style={[
            styles.emojiContainer,
            {
              opacity: anim.opacity,
              transform: [
                { translateY: anim.translateY },
                { translateX: anim.translateX },
                { scale: anim.scale },
                {
                  rotate: anim.rotate.interpolate({
                    inputRange: [-ANIMATION_CONFIG.actionEmojis.randomRotateRange, ANIMATION_CONFIG.actionEmojis.randomRotateRange],
                    outputRange: [`-${ANIMATION_CONFIG.actionEmojis.randomRotateRange}deg`, `${ANIMATION_CONFIG.actionEmojis.randomRotateRange}deg`],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.emoji}>{anim.emoji}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  emojiContainer: {
    position: 'absolute',
  },
  emoji: {
    fontSize: moderateScale(28),
  },
});
