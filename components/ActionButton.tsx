import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import { styles } from '../styles';

interface ActionButtonProps {
  emoji: string;
  label: string;
  colorStyle: ViewStyle;
  onPress: () => void;
  disabled: boolean;
  isTablet: boolean;
  accessibilityLabel: string;
  accessibilityHint: string;
}

export const ActionButton = React.memo<ActionButtonProps>(({
  emoji,
  label,
  colorStyle,
  onPress,
  disabled,
  isTablet,
  accessibilityLabel,
  accessibilityHint,
}) => (
  <TouchableOpacity
    style={[
      styles.actionButton,
      colorStyle,
      isTablet && styles.tabletActionButton,
      disabled && styles.disabledActionButton,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityHint={accessibilityHint}
    accessibilityState={{ disabled }}
  >
    <Text style={styles.actionEmoji}>{emoji}</Text>
    <Text
      style={[
        styles.actionButtonText,
        isTablet && styles.tabletActionButtonText,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
));

ActionButton.displayName = 'ActionButton';
