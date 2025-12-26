import React from 'react';
import { Text } from 'react-native';
import { LizardSvg } from './LizardSvg';
import { CatSvg } from './CatSvg';
import { UnicornSvg } from './UnicornSvg';
import { CharacterType } from '../types';
import { CHARACTERS } from '../constants';
import { moderateScale } from '../utils/responsive';

interface CharacterIconProps {
  characterType: CharacterType;
  size: number;
  isTablet: boolean;
  containerSize?: number;
}

export function CharacterIcon({
  characterType,
  size,
  isTablet,
  containerSize,
}: CharacterIconProps) {
  const getSvgSize = () => {
    return containerSize ? containerSize * 0.9 : (isTablet ? size * 2 : size * 1.8);
  };

  switch (characterType) {
    case 'lizard': {
      const svgSize = getSvgSize();
      return <LizardSvg width={svgSize} height={svgSize * 0.735} />;
    }
    case 'cat': {
      const svgSize = getSvgSize();
      const aspectRatio = 294.0701 / 246.54726;
      return <CatSvg width={svgSize} height={svgSize * aspectRatio} />;
    }
    case 'unicorn': {
      const svgSize = getSvgSize();
      const aspectRatio = 172 / 211;
      return <UnicornSvg width={svgSize} height={svgSize * aspectRatio} />;
    }
    default: {
      const character = CHARACTERS.find((c) => c.type === characterType);
      return (
        <Text style={{ fontSize: size }}>
          {character?.emoji}
        </Text>
      );
    }
  }
}
