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
        <View style={[styles.statusBadge, lightsOn ? styles.statusBadgeWarning : styles.statusBadgeSleep]}>
          <Text style={[styles.statusText, !lightsOn && styles.statusTextSleep]}>
            {lightsOn ? '⚠️ Lampan på!' : '😴 Sover...'}
          </Text>
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
        <Text style={[styles.label, !lightsOn && styles.labelOff]}>
          {lightsOn ? 'PÅ' : 'AV'}
        </Text>
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
  statusBadge: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(12),
  },
  statusBadgeWarning: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.4)',
  },
  statusBadgeSleep: {
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.4)',
  },
  statusBadgeDark: {
    backgroundColor: 'rgba(123, 104, 238, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(123, 104, 238, 0.3)',
  },
  statusText: {
    fontSize: moderateScale(12),
    color: '#FF6B6B',
    fontWeight: '600',
  },
  statusTextSleep: {
    color: '#7B68EE',
  },
  button: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(26),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  buttonOn: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderColor: '#FFD700',
  },
  buttonOff: {
    backgroundColor: 'rgba(123, 104, 238, 0.2)',
    borderColor: '#7B68EE',
  },
  buttonWarning: {
    borderColor: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
  },
  emoji: {
    fontSize: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(9),
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: -2,
  },
  labelOff: {
    color: '#7B68EE',
  },
});
