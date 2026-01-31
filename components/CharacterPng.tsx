import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { LifeStage } from '../types';

// Lizard life stage images - normal
import lizardBaby from '../assets/lizard-baby.png';
import lizardChild from '../assets/lizard-child.png';
import lizardTeen from '../assets/lizard-teen.png';
import lizardAdult from '../assets/lizard-adult.png';

// Cat life stage images - normal
import catBaby from '../assets/cat-baby.png';
import catChild from '../assets/cat-child.png';
import catTeen from '../assets/cat-teen.png';
import catAdult from '../assets/cat-adult.png';

// Lizard life stage images - sad
import lizardSadBaby from '../assets/lizard-sad-baby.png';
import lizardSadChild from '../assets/lizard-sad-child.png';
import lizardSadTeen from '../assets/lizard-sad-teen.png';
import lizardSadAdult from '../assets/lizard-sad-adult.png';

// Cat life stage images - sad
import catSadBaby from '../assets/cat-sad-baby.png';
import catSadChild from '../assets/cat-sad-child.png';
import catSadTeen from '../assets/cat-sad-teen.png';
import catSadAdult from '../assets/cat-sad-adult.png';

// Lizard life stage images - sleepy
import lizardSleepyBaby from '../assets/lizard-sleepy-baby.png';
import lizardSleepyChild from '../assets/lizard-sleepy-child.png';
import lizardSleepyTeen from '../assets/lizard-sleepy-teen.png';
import lizardSleepyAdult from '../assets/lizard-sleepy-adult.png';

// Cat life stage images - sleepy
import catSleepyBaby from '../assets/cat-sleepy-baby.png';
import catSleepyChild from '../assets/cat-sleepy-child.png';
import catSleepyTeen from '../assets/cat-sleepy-teen.png';
import catSleepyAdult from '../assets/cat-sleepy-adult.png';

export type CharacterMood = 'normal' | 'sad' | 'sleepy';

type ImageMap = Record<string, Record<string, Record<string, string>>>;

const CHARACTER_IMAGES: ImageMap = {
  lizard: {
    normal: {
      baby: lizardBaby,
      child: lizardChild,
      teen: lizardTeen,
      adult: lizardAdult,
      senior: lizardAdult,
    },
    sad: {
      baby: lizardSadBaby,
      child: lizardSadChild,
      teen: lizardSadTeen,
      adult: lizardSadAdult,
      senior: lizardSadAdult,
    },
    sleepy: {
      baby: lizardSleepyBaby,
      child: lizardSleepyChild,
      teen: lizardSleepyTeen,
      adult: lizardSleepyAdult,
      senior: lizardSleepyAdult,
    },
  },
  cat: {
    normal: {
      baby: catBaby,
      child: catChild,
      teen: catTeen,
      adult: catAdult,
      senior: catAdult,
    },
    sad: {
      baby: catSadBaby,
      child: catSadChild,
      teen: catSadTeen,
      adult: catSadAdult,
      senior: catSadAdult,
    },
    sleepy: {
      baby: catSleepyBaby,
      child: catSleepyChild,
      teen: catSleepyTeen,
      adult: catSleepyAdult,
      senior: catSleepyAdult,
    },
  },
};

interface CharacterPngProps {
  characterType: 'lizard' | 'cat';
  lifeStage: LifeStage;
  mood?: CharacterMood;
  width: number;
  height: number;
}

export const CharacterPng: React.FC<CharacterPngProps> = ({
  characterType,
  lifeStage,
  mood = 'normal',
  width,
  height,
}) => {
  const imageSource = CHARACTER_IMAGES[characterType]?.[mood]?.[lifeStage]
    ?? CHARACTER_IMAGES[characterType]?.normal?.[lifeStage];

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
