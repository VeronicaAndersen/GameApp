import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { LizardSvg } from './LizardSvg';
import { CatSvg } from './CatSvg';
import { UnicornSvg } from './UnicornSvg';
import { CharacterType } from '../types';
import { CHARACTERS } from '../constants';
import { SVG_ASPECT_RATIOS, SVG_SIZE_MULTIPLIERS } from '../constants/svgAspectRatios';

interface CharacterIconProps {
  characterType: CharacterType;
  size: number;
  isTablet: boolean;
  containerSize?: number;
}

/**
 * Optimized character icon component with memoization
 * Renders SVG graphics for characters
 */
export const CharacterIcon = React.memo<CharacterIconProps>(({
  characterType,
  size,
  isTablet,
  containerSize,
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

  return renderCharacter();
});

CharacterIcon.displayName = 'CharacterIcon';

const styles = StyleSheet.create({
  emojiText: {
    textAlign: 'center',
  },
});
