import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/responsive';

interface PoopDisplayProps {
  poopCount: number;
  isWideScreen: boolean;
}

/**
 * Displays poop emojis around the character based on poopCount
 */
export const PoopDisplay: React.FC<PoopDisplayProps> = ({ poopCount, isWideScreen }) => {
  // Generate positions for poop emojis
  const poopPositions = useMemo(() => {
    const positions: { left: number; bottom: number }[] = [];
    const baseSpread = isWideScreen ? 200 : 120;

    for (let i = 0; i < poopCount; i++) {
      // Spread poops across the bottom area
      const angle = (i / Math.max(poopCount, 1)) * Math.PI + Math.PI * 0.1;
      const radius = baseSpread * (0.5 + Math.random() * 0.5);
      positions.push({
        left: Math.cos(angle) * radius,
        bottom: Math.sin(angle) * 20 + Math.random() * 10,
      });
    }
    return positions;
  }, [poopCount, isWideScreen]);

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
            { left: '50%', marginLeft: pos.left, bottom: pos.bottom },
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
    height: verticalScale(60),
    alignItems: 'center',
  },
  poop: {
    position: 'absolute',
    fontSize: moderateScale(24),
  },
  poopWide: {
    fontSize: moderateScale(32),
  },
});
