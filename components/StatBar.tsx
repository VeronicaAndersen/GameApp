import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  barColor: string;
}

export const StatBar = React.memo<StatBarProps>(({ label, value, maxValue, barColor }) => (
  <View style={styles.statItem}>
    <Text style={styles.statLabel}>
      {label}
    </Text>
    <View style={styles.statBarContainer}>
      <View
        style={[
          styles.statBar,
          { backgroundColor: barColor, width: `${(value / maxValue) * 100}%` },
        ]}
      />
    </View>
    <Text style={styles.statValue}>
      {Math.round(value)}%
    </Text>
  </View>
));

StatBar.displayName = 'StatBar';
