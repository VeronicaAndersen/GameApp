import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LifeStage } from '../types';

// Lizard life stage images
import lizardBaby from '../assets/lizard-baby.png';
import lizardChild from '../assets/lizard-child.png';
import lizardTeen from '../assets/lizard-teen.png';
import lizardAdult from '../assets/lizard-adult.png';

// Cat life stage images
import catBaby from '../assets/cat-baby.png';
import catChild from '../assets/cat-child.png';
import catTeen from '../assets/cat-teen.png';
import catAdult from '../assets/cat-adult.png';

const CHARACTER_IMAGES: Record<string, Record<string, string>> = {
  lizard: {
    baby: lizardBaby,
    child: lizardChild,
    teen: lizardTeen,
    adult: lizardAdult,
    senior: lizardAdult,
  },
  cat: {
    baby: catBaby,
    child: catChild,
    teen: catTeen,
    adult: catAdult,
    senior: catAdult,
  },
};

interface CharacterPngProps {
  characterType: 'lizard' | 'cat';
  lifeStage: LifeStage;
  width: number;
  height: number;
}

export const CharacterPng: React.FC<CharacterPngProps> = ({
  characterType,
  lifeStage,
  width,
  height,
}) => {
  const imageSource = CHARACTER_IMAGES[characterType]?.[lifeStage];

  if (!imageSource) {
    return null;
  }

  return (
    <Image
      source={{ uri: imageSource }}
      style={[styles.image, { width, height }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
  },
});
