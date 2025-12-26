import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { CharacterType } from '../types';
import { CHARACTERS } from '../constants';
import { scale, moderateScale } from '../utils/responsive';
import { styles } from '../styles';

interface CharacterSelectionScreenProps {
  dimensions: { width: number; height: number };
  isDarkMode: boolean;
  onSelectCharacter: (type: CharacterType) => void | Promise<void>;
}

export function CharacterSelectionScreen({
  dimensions,
  isDarkMode,
  onSelectCharacter,
}: CharacterSelectionScreenProps) {
  const isTablet = dimensions.width >= 768;

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={[
          styles.selectionScrollContent,
          isTablet && styles.tabletScrollContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.selectionContent}>
          <Text
            style={[
              styles.selectionTitle,
              isDarkMode && styles.darkTitle,
              isTablet && styles.tabletTitle,
            ]}
          >
            Choose Your Character!
          </Text>
          <Text
            style={[
              styles.selectionSubtitle,
              isDarkMode && styles.darkSubtitle,
              isTablet && styles.tabletSubtitle,
            ]}
          >
            Pick a character to start your adventure
          </Text>

          <View style={styles.characterList}>
            {CHARACTERS.map((character) => (
              <TouchableOpacity
                key={character.type}
                style={[
                  styles.characterCard,
                  isDarkMode && styles.darkCard,
                  isTablet && styles.tabletCharacterCard,
                ]}
                onPress={() => onSelectCharacter(character.type)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.characterEmojiContainer,
                    { backgroundColor: character.color + '20' },
                    isTablet && styles.tabletCharacterEmojiContainer,
                    character.type === 'lizard' && styles.lizardEmojiContainer,
                    character.type === 'cat' && styles.catEmojiContainer,
                    character.type === 'unicorn' && styles.unicornEmojiContainer,
                  ]}
                >
                  <CharacterIcon
                    characterType={character.type}
                    size={moderateScale(50)}
                    isTablet={isTablet}
                    containerSize={isTablet ? scale(150) : scale(100)}
                  />
                </View>
                <Text
                  style={[
                    styles.characterName,
                    isDarkMode && styles.darkTitle,
                    isTablet && styles.tabletCharacterName,
                  ]}
                >
                  {character.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
