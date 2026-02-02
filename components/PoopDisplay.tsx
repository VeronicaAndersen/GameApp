import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale } from '../utils/responsive';

interface PoopDisplayProps {
  poopCount: number;
  isWideScreen: boolean;
}

/**
 * Displays poop emojis around the character based on poopCount
 */
export const PoopDisplay: React.FC<PoopDisplayProps> = ({ poopCount, isWideScreen }) => {
  // Generate random positions scattered across the screen
  const poopPositions = useMemo(() => {
    const positions: { leftPercent: number; bottomPercent: number }[] = [];

    for (let i = 0; i < poopCount; i++) {
      positions.push({
        leftPercent: 10 + Math.random() * 80, // 10%-90% from left
        bottomPercent: 5 + Math.random() * 50, // 5%-55% from bottom
      });
    }
    return positions;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poopCount]);

  if (poopCount === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {poopPositions.map((pos, index) => (
        <Text
          key={index}
          style={[
            styles.poop,
            isWideScreen && styles.poopWide,
            // eslint-disable-next-line react-native/no-inline-styles
            { left: `${pos.leftPercent}%`, bottom: `${pos.bottomPercent}%` },
          ]}
        >
          💩
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
  },
  poop: {
    position: 'absolute',
    fontSize: moderateScale(24),
  },
  poopWide: {
    fontSize: moderateScale(32),
  },
});
