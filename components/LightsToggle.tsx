import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

interface LightsToggleProps {
  lightsOn: boolean;
  isNightTime: boolean;
  onToggle: () => void;
}

/**
 * Toggle button for lights on/off with day/night indicator
 */
export const LightsToggle: React.FC<LightsToggleProps> = ({
  lightsOn,
  isNightTime,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      {isNightTime && (
        <View style={styles.nightIndicator}>
          <Text style={styles.nightText}>🌙 Natt</Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          lightsOn ? styles.buttonOn : styles.buttonOff,
          isNightTime && lightsOn && styles.buttonWarning,
        ]}
        onPress={onToggle}
        activeOpacity={0.7}
        accessibilityRole="switch"
        accessibilityLabel={lightsOn ? 'Släck lampan' : 'Tänd lampan'}
        accessibilityState={{ checked: lightsOn }}
      >
        <Text style={styles.emoji}>{lightsOn ? '💡' : '🌙'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  nightIndicator: {
    backgroundColor: 'rgba(75, 0, 130, 0.3)',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(8),
  },
  nightText: {
    fontSize: moderateScale(12),
    color: '#9370DB',
    fontWeight: '500',
  },
  button: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  buttonOn: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  buttonOff: {
    backgroundColor: 'rgba(75, 0, 130, 0.2)',
    borderColor: '#4B0082',
  },
  buttonWarning: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
  },
  emoji: {
    fontSize: moderateScale(22),
  },
});
