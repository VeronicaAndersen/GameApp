import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LizardSvg } from './LizardSvg';
import { CatSvg } from './CatSvg';
import { UnicornSvg } from './UnicornSvg';
import { AnimatedCharacter } from './AnimatedCharacter';
import { LifeStageOverlay } from './LifeStageOverlay';
import { CharacterType, LifeStage } from '../types';
import { CHARACTERS } from '../constants';
import { SVG_ASPECT_RATIOS, SVG_SIZE_MULTIPLIERS } from '../constants/svgAspectRatios';

interface CharacterIconProps {
  characterType: CharacterType;
  size: number;
  isTablet: boolean;
  containerSize?: number;
  lifeStage?: LifeStage;
  isSick?: boolean;
  isDead?: boolean;
  isSleeping?: boolean;
}

/**
 * Optimized character icon component with memoization
 * Renders SVG graphics for characters with life stage animations
 */
export const CharacterIcon = React.memo<CharacterIconProps>(({
  characterType,
  size,
  isTablet,
  containerSize,
  lifeStage = 'adult',
  isSick = false,
  isDead = false,
  isSleeping = false,
}) => {
  const svgSize = useMemo(() => {
    if (containerSize) {
      return containerSize * SVG_SIZE_MULTIPLIERS.containerBased;
    }
    return isTablet ? size * SVG_SIZE_MULTIPLIERS.tablet : size * SVG_SIZE_MULTIPLIERS.phone;
  }, [containerSize, isTablet, size]);

  const renderCharacter = () => {
    switch (characterType) {
      case 'lizard':
        return <LizardSvg width={svgSize} height={svgSize * SVG_ASPECT_RATIOS.lizard} />;

      case 'cat':
        return <CatSvg width={svgSize} height={svgSize * SVG_ASPECT_RATIOS.cat} />;

      case 'unicorn':
        return <UnicornSvg width={svgSize} height={svgSize * SVG_ASPECT_RATIOS.unicorn} />;

      default: {
        const character = CHARACTERS.find((c) => c.type === characterType);
        return (
          <Text style={[styles.emojiText, { fontSize: size }]}>
            {character?.emoji}
          </Text>
        );
      }
    }
  };

  return (
    <AnimatedCharacter
      lifeStage={lifeStage}
      isSick={isSick}
      isDead={isDead}
      isSleeping={isSleeping}
    >
      <View style={styles.characterContainer}>
        {renderCharacter()}
        <LifeStageOverlay lifeStage={lifeStage} characterSize={svgSize} />
      </View>
    </AnimatedCharacter>
  );
});

CharacterIcon.displayName = 'CharacterIcon';

const styles = StyleSheet.create({
  characterContainer: {
    position: 'relative',
  },
  emojiText: {
    textAlign: 'center',
  },
});
