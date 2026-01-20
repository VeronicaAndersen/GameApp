import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/responsive';
import { LifeStage, LifeStageConfig } from '../types';

interface LifeStageIndicatorProps {
  stage: LifeStage;
  stageConfig: LifeStageConfig;
  ageDisplay: string;
}

const STAGE_EMOJIS: Record<LifeStage, string> = {
  baby: '🍼',
  child: '🧒',
  teen: '🧑',
  adult: '👤',
  senior: '👴',
};

const STAGE_COLORS: Record<LifeStage, string> = {
  baby: '#FFB6C1',
  child: '#98FB98',
  teen: '#87CEEB',
  adult: '#DDA0DD',
  senior: '#F0E68C',
};

/**
 * Displays current life stage and age
 */
export const LifeStageIndicator: React.FC<LifeStageIndicatorProps> = ({
  stage,
  stageConfig,
  ageDisplay,
}) => {
  const emoji = STAGE_EMOJIS[stage];
  const color = STAGE_COLORS[stage];

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor: color + '40' }]}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={[styles.stageName, { color }]}>{stageConfig.name}</Text>
      </View>
      <Text style={styles.age}>{ageDisplay}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
    gap: scale(4),
  },
  emoji: {
    fontSize: moderateScale(14),
  },
  stageName: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  age: {
    fontSize: moderateScale(11),
    color: '#888888',
  },
});
