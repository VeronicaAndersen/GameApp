import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { moderateScale } from '../utils/responsive';
import { SickReason } from '../hooks/useSicknessAndDeath';

interface SickIndicatorProps {
  isSick: boolean;
  sickReason?: SickReason;
}

const SICK_EMOJIS: Record<SickReason, string> = {
  health: '🤒',
  poop: '🤢',
  neglect: '😢',
};

/**
 * Visual indicator when pet is sick
 */
export const SickIndicator: React.FC<SickIndicatorProps> = ({ isSick, sickReason }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSick) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isSick, pulseAnim]);

  if (!isSick) return null;

  const emoji = sickReason ? SICK_EMOJIS[sickReason] : '🤒';

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.overlay} />
      <Animated.View
        style={[
          styles.emojiContainer,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 180, 0, 0.12)',
    borderRadius: moderateScale(20),
  },
  emojiContainer: {
    position: 'absolute',
    top: moderateScale(-10),
    right: moderateScale(-10),
  },
  emoji: {
    fontSize: moderateScale(32),
  },
});
