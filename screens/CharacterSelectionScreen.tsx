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
  onSelectCharacter,
}: CharacterSelectionScreenProps): React.JSX.Element {
  return (
    <SafeAreaView
      nativeID="selection-screen"
      style={styles.container}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <SpaceBackground />
      <ScrollView
        nativeID="selection-scroll"
        contentContainerStyle={styles.selectionScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View nativeID="selection-content" style={styles.selectionContent}>
          <Text nativeID="selection-title" style={styles.selectionTitle}>
            Välj din karaktär
          </Text>
          <Text style={styles.selectionSubtitle}>
            Sedan startar ditt äventyr
          </Text>

          <View nativeID="character-list" style={styles.characterList}>
            {CHARACTERS.map((character) => (
              <TouchableOpacity
                key={character.type}
                testID={`character-card-${character.type}`}
                style={styles.characterCard}
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
                    character.type === 'lizard' && styles.lizardEmojiContainer,
                    character.type === 'cat' && styles.catEmojiContainer,
                  ]}
                >
                  <CharacterIcon
                    characterType={character.type}
                    size={moderateScale(50)}
                    containerSize={scale(100)}
                  />
                </View>
                <Text style={styles.characterName}>
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
