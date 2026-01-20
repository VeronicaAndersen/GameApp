import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LifeStage } from '../types';

interface LifeStageOverlayProps {
  lifeStage: LifeStage;
  characterSize: number;
}

/**
 * Adds visual accessories based on life stage
 * - Baby: Pacifier/bib
 * - Child: Playful elements
 * - Teen: Cool accessories
 * - Adult: Nothing extra (mature look)
 * - Senior: Reading glasses, slight gray tint
 */
export const LifeStageOverlay: React.FC<LifeStageOverlayProps> = ({
  lifeStage,
  characterSize,
}) => {
  const scale = characterSize / 150; // Base scale factor

  switch (lifeStage) {
    case 'baby':
      return (
        <View style={styles.overlayContainer}>
          {/* Pacifier */}
          <View style={[styles.pacifier, { bottom: 20 * scale, transform: [{ scale }] }]}>
            <Text style={styles.pacifierEmoji}>🍼</Text>
          </View>
          {/* Diaper/bib indicator */}
          <View style={[styles.babyBow, { top: -10 * scale, transform: [{ scale }] }]}>
            <Text style={styles.bowEmoji}>🎀</Text>
          </View>
        </View>
      );

    case 'child':
      return (
        <View style={styles.overlayContainer}>
          {/* Playful sparkles */}
          <View style={[styles.sparkle, { top: -15 * scale, right: -10 * scale }]}>
            <Text style={[styles.sparkleEmoji, { fontSize: 14 * scale }]}>✨</Text>
          </View>
          <View style={[styles.sparkle, { top: 5 * scale, left: -15 * scale }]}>
            <Text style={[styles.sparkleEmoji, { fontSize: 12 * scale }]}>✨</Text>
          </View>
        </View>
      );

    case 'teen':
      return (
        <View style={styles.overlayContainer}>
          {/* Cool sunglasses effect */}
          <View style={[styles.coolIndicator, { top: -20 * scale }]}>
            <Text style={[styles.coolEmoji, { fontSize: 18 * scale }]}>😎</Text>
          </View>
        </View>
      );

    case 'adult':
      // Adults get no accessories - they're mature
      return null;

    case 'senior':
      return (
        <View style={styles.overlayContainer}>
          {/* Reading glasses */}
          <View style={[styles.seniorAccessory, { top: -15 * scale }]}>
            <Text style={[styles.seniorEmoji, { fontSize: 16 * scale }]}>👓</Text>
          </View>
          {/* Gray hair/wisdom indicator */}
          <View style={[styles.wisdomStar, { top: -25 * scale, right: 5 * scale }]}>
            <Text style={[styles.starEmoji, { fontSize: 12 * scale }]}>⭐</Text>
          </View>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  // Baby styles
  pacifier: {
    position: 'absolute',
    left: '50%',
    marginLeft: -12,
  },
  pacifierEmoji: {
    fontSize: 24,
  },
  babyBow: {
    position: 'absolute',
    left: '50%',
    marginLeft: -8,
  },
  bowEmoji: {
    fontSize: 16,
  },
  // Child styles
  sparkle: {
    position: 'absolute',
  },
  sparkleEmoji: {
    fontSize: 14,
  },
  // Teen styles
  coolIndicator: {
    position: 'absolute',
    left: '50%',
    marginLeft: -9,
    opacity: 0.7,
  },
  coolEmoji: {
    fontSize: 18,
  },
  // Senior styles
  seniorAccessory: {
    position: 'absolute',
    left: '50%',
    marginLeft: -8,
  },
  seniorEmoji: {
    fontSize: 16,
  },
  wisdomStar: {
    position: 'absolute',
  },
  starEmoji: {
    fontSize: 12,
  },
});
