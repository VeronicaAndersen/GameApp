import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CharacterPng, CharacterMood } from './CharacterPng';
import { AnimatedCharacter } from './AnimatedCharacter';
import { LifeStageOverlay } from './LifeStageOverlay';
import { CharacterType, LifeStage } from '../types';
import { CHARACTERS } from '../constants';
import { SVG_SIZE_MULTIPLIERS } from '../constants/svgAspectRatios';

const PNG_ASPECT_RATIO = 624 / 416; // Height/Width ratio of cropped PNGs

interface CharacterIconProps {
  characterType: CharacterType;
  size: number;
  isTablet: boolean;
  containerSize?: number;
  lifeStage?: LifeStage;
  isSick?: boolean;
  isDead?: boolean;
  isSleeping?: boolean;
  mood?: CharacterMood;
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
  mood = 'normal',
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
        return <CharacterPng characterType="lizard" lifeStage={lifeStage} mood={mood} width={svgSize} height={svgSize * PNG_ASPECT_RATIO} />;

      case 'cat':
        return <CharacterPng characterType="cat" lifeStage={lifeStage} mood={mood} width={svgSize} height={svgSize * PNG_ASPECT_RATIO} />;

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
