import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { SpaceBackground } from '../components/SpaceBackground';
import { CharacterType, Dimensions } from '../types';
import { CHARACTERS } from '../constants';
import { scale, moderateScale } from '../utils/responsive';
import { styles } from '../styles';

export interface CharacterSelectionScreenProps {
  dimensions: Dimensions;
  onSelectCharacter: (type: CharacterType) => Promise<void>;
}

export function CharacterSelectionScreen({
  dimensions,
  onSelectCharacter,
}: CharacterSelectionScreenProps): React.JSX.Element {
  const isTablet = dimensions.width >= 768;

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <SpaceBackground />
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
              isTablet && styles.tabletTitle,
            ]}
          >
            Välj din karaktär
          </Text>
          <Text
            style={[
              styles.selectionSubtitle,
              isTablet && styles.tabletSubtitle,
            ]}
          >
            Sedan startar ditt äventyr
          </Text>

          <View style={styles.characterList}>
            {CHARACTERS.map((character) => (
              <TouchableOpacity
                key={character.type}
                style={[
                  styles.characterCard,
                  isTablet && styles.tabletCharacterCard,
                ]}
                onPress={() => onSelectCharacter(character.type)}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={`Select ${character.name}`}
                accessibilityHint={`Choose ${character.name} as your character to begin the adventure`}
              >
                <View
                  style={[
                    styles.characterEmojiContainer,
                    { backgroundColor: character.color + '20' },
                    isTablet && styles.tabletCharacterEmojiContainer,
                    character.type === 'lizard' && styles.lizardEmojiContainer,
                    character.type === 'cat' && styles.catEmojiContainer,
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
