/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { LizardSvg } from './components/LizardSvg';
import { CatSvg } from './components/CatSvg';
import { UnicornSvg } from './components/UnicornSvg';

// Base dimensions for responsive design (iPhone 12/13/14 dimensions)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

// Character Types
type CharacterType = 'lizard' | 'cat' | 'unicorn';

interface Character {
  type: CharacterType;
  name: string;
  emoji: string;
  color: string;
}

const CHARACTERS: Character[] = [
  {
    type: 'lizard',
    name: 'Lizard with Human Head',
    emoji: '', // SVG will be used instead
    color: '#8B4513',
  },
  {
    type: 'cat',
    name: 'Cute Cat',
    emoji: '', // SVG will be used instead
    color: '#FF69B4',
  },
  {
    type: 'unicorn',
    name: 'Unicorn',
    emoji: '🦄',
    color: '#9370DB',
  },
];

// Helper component to render character icon
function CharacterIcon({
  characterType,
  size,
  isTablet,
  containerSize,
}: {
  characterType: CharacterType;
  size: number;
  isTablet: boolean;
  containerSize?: number;
}) {
  if (characterType === 'lizard') {
    // Use container size if provided, otherwise use the size parameter
    const svgSize = containerSize ? containerSize * 0.9 : (isTablet ? size * 2 : size * 1.8);
    return <LizardSvg width={svgSize} height={svgSize * 0.735} />; // 0.735 is the aspect ratio (339/461)
  }
  if (characterType === 'cat') {
    // Use container size if provided, otherwise use the size parameter
    const svgSize = containerSize ? containerSize * 0.9 : (isTablet ? size * 2 : size * 1.8);
    const aspectRatio = 294.0701 / 246.54726; // height/width
    return <CatSvg width={svgSize} height={svgSize * aspectRatio} />;
  }
  if (characterType === 'unicorn') {
    // Use container size if provided, otherwise use the size parameter
    const svgSize = containerSize ? containerSize * 0.9 : (isTablet ? size * 2 : size * 1.8);
    const aspectRatio = 172 / 211; // height/width from viewBox
    return <UnicornSvg width={svgSize} height={svgSize * aspectRatio} />;
  }
  const character = CHARACTERS.find((c) => c.type === characterType);
  return (
    <Text
      style={{
        fontSize: size,
      }}
    >
      {character?.emoji}
    </Text>
  );
}

interface GameState {
  character: CharacterType | null;
  level: number;
  experience: number;
  hunger: number; // 0-100
  happiness: number; // 0-100
}

const INITIAL_STATE: GameState = {
  character: null,
  level: 1,
  experience: 0,
  hunger: 50,
  happiness: 50,
};

const XP_PER_LEVEL = 100;
const MAX_HUNGER = 100;
const MAX_HAPPINESS = 100;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [dimensions, setDimensions] = useState({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const selectCharacter = (type: CharacterType) => {
    setGameState({ ...INITIAL_STATE, character: type });
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {gameState.character === null ? (
        <CharacterSelectionScreen
          dimensions={dimensions}
          isDarkMode={isDarkMode}
          onSelectCharacter={selectCharacter}
        />
      ) : (
        <GameScreen
          dimensions={dimensions}
          isDarkMode={isDarkMode}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
    </SafeAreaProvider>
  );
}

function CharacterSelectionScreen({
  dimensions,
  isDarkMode,
  onSelectCharacter,
}: {
  dimensions: { width: number; height: number };
  isDarkMode: boolean;
  onSelectCharacter: (type: CharacterType) => void;
}) {
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

function GameScreen({
  dimensions,
  isDarkMode,
  gameState,
  setGameState,
}: {
  dimensions: { width: number; height: number };
  isDarkMode: boolean;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}) {
  const isTablet = dimensions.width >= 768;
  const character = CHARACTERS.find((c) => c.type === gameState.character)!;
  const [bounceAnim] = useState(new Animated.Value(1));
  const [levelUpAnim] = useState(new Animated.Value(0));

  const xpForNextLevel = gameState.level * XP_PER_LEVEL;
  const xpProgress = (gameState.experience % XP_PER_LEVEL) / XP_PER_LEVEL;

  useEffect(() => {
    // Check for level up
    if (gameState.experience >= xpForNextLevel) {
      const newLevel = Math.floor(gameState.experience / XP_PER_LEVEL) + 1;
      if (newLevel > gameState.level) {
        setGameState((prev) => ({ ...prev, level: newLevel }));
        // Level up animation
        Animated.sequence([
          Animated.timing(levelUpAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(levelUpAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [gameState.experience, gameState.level]);

  const handleEat = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setGameState((prev) => ({
      ...prev,
      hunger: Math.min(MAX_HUNGER, prev.hunger + 20),
      experience: prev.experience + 10,
    }));
  };

  const handlePlay = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setGameState((prev) => ({
      ...prev,
      happiness: Math.min(MAX_HAPPINESS, prev.happiness + 20),
      experience: prev.experience + 15,
      hunger: Math.max(0, prev.hunger - 5),
    }));
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={[
          styles.gameScrollContent,
          isTablet && styles.tabletScrollContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gameContent}>
          {/* Header */}
          <View style={styles.gameHeader}>
            <Text
              style={[
                styles.gameTitle,
                isDarkMode && styles.darkTitle,
                isTablet && styles.tabletTitle,
              ]}
            >
              {character.name}
            </Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setGameState(INITIAL_STATE)}
            >
              <Text style={[styles.backButtonText, isDarkMode && styles.darkSubtitle]}>
                Change Character
              </Text>
            </TouchableOpacity>
          </View>

          {/* Character Display */}
          <View style={styles.characterDisplay}>
            <Animated.View
              style={[
                styles.characterDisplayContainer,
                {
                  transform: [{ scale: bounceAnim }],
                },
              ]}
            >
              <View
                style={[
                  styles.characterDisplayEmoji,
                  { backgroundColor: character.color + '20' },
                  isTablet && styles.tabletCharacterDisplayEmoji,
                  (character.type === 'lizard' || character.type === 'cat') && styles.lizardDisplayContainer,
                ]}
              >
                <CharacterIcon
                  characterType={character.type}
                  size={moderateScale(80)}
                  isTablet={isTablet}
                  containerSize={isTablet ? scale(200) : scale(150)}
                />
              </View>
              <Animated.View
                style={[
                  styles.levelUpBadge,
                  {
                    opacity: levelUpAnim,
                    transform: [
                      {
                        scale: levelUpAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1.2],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.levelUpText}>LEVEL UP! ⭐</Text>
              </Animated.View>
            </Animated.View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.levelContainer}>
              <Text
                style={[
                  styles.levelText,
                  isDarkMode && styles.darkTitle,
                  isTablet && styles.tabletLevelText,
                ]}
              >
                Level {gameState.level}
              </Text>
              <View
                style={[
                  styles.xpBarContainer,
                  isDarkMode && styles.darkXpBarContainer,
                ]}
              >
                <View
                  style={[
                    styles.xpBar,
                    { width: `${xpProgress * 100}%`, backgroundColor: character.color },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.xpText,
                  isDarkMode && styles.darkSubtitle,
                ]}
              >
                {gameState.experience % XP_PER_LEVEL} / {XP_PER_LEVEL} XP
              </Text>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  Hunger
                </Text>
                <View
                  style={[
                    styles.statBarContainer,
                    isDarkMode && styles.darkStatBarContainer,
                  ]}
                >
                  <View
                    style={[
                      styles.statBar,
                      {
                        width: `${(gameState.hunger / MAX_HUNGER) * 100}%`,
                        backgroundColor: '#FF6B6B',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.statValue,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  {gameState.hunger}%
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  Happiness
                </Text>
                <View
                  style={[
                    styles.statBarContainer,
                    isDarkMode && styles.darkStatBarContainer,
                  ]}
                >
                  <View
                    style={[
                      styles.statBar,
                      {
                        width: `${(gameState.happiness / MAX_HAPPINESS) * 100}%`,
                        backgroundColor: '#4ECDC4',
                      },
                    ]}
      />
    </View>
                <Text
                  style={[
                    styles.statValue,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  {gameState.happiness}%
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: '#FF6B6B' },
                isTablet && styles.tabletActionButton,
              ]}
              onPress={handleEat}
              activeOpacity={0.8}
            >
              <Text style={styles.actionEmoji}>🍕</Text>
              <Text
                style={[
                  styles.actionButtonText,
                  isTablet && styles.tabletActionButtonText,
                ]}
              >
                Eat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: '#4ECDC4' },
                isTablet && styles.tabletActionButton,
              ]}
              onPress={handlePlay}
              activeOpacity={0.8}
            >
              <Text style={styles.actionEmoji}>🎮</Text>
              <Text
                style={[
                  styles.actionButtonText,
                  isTablet && styles.tabletActionButtonText,
                ]}
              >
                Play
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  // Selection Screen Styles
  selectionScrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  selectionContent: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  selectionTitle: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  darkTitle: {
    color: '#FFFFFF',
  },
  tabletTitle: {
    fontSize: moderateScale(48),
  },
  selectionSubtitle: {
    fontSize: moderateScale(18),
    color: '#666666',
    textAlign: 'center',
    marginBottom: verticalScale(32),
  },
  darkSubtitle: {
    color: '#CCCCCC',
  },
  tabletSubtitle: {
    fontSize: moderateScale(24),
  },
  characterList: {
    gap: verticalScale(20),
  },
  characterCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(16),
    padding: scale(24),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  darkCard: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333333',
  },
  tabletCharacterCard: {
    padding: scale(32),
  },
  characterEmojiContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
    overflow: 'visible',
  },
  tabletCharacterEmojiContainer: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
  },
  lizardEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  catEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  unicornEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  characterEmoji: {
    fontSize: moderateScale(50),
  },
  tabletCharacterEmoji: {
    fontSize: moderateScale(80),
  },
  characterName: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  tabletCharacterName: {
    fontSize: moderateScale(28),
  },
  // Game Screen Styles
  gameScrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  tabletScrollContent: {
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(40),
  },
  gameContent: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  gameHeader: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  backButton: {
    marginTop: verticalScale(8),
  },
  backButtonText: {
    fontSize: moderateScale(14),
    color: '#666666',
    textDecorationLine: 'underline',
  },
  characterDisplay: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  characterDisplayContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  characterDisplayEmoji: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  tabletCharacterDisplayEmoji: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
  },
  characterDisplayText: {
    fontSize: moderateScale(80),
  },
  tabletCharacterDisplayText: {
    fontSize: moderateScale(120),
  },
  lizardDisplayContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
    width: 'auto',
    height: 'auto',
    minWidth: scale(150),
    minHeight: scale(110),
  },
  levelUpBadge: {
    position: 'absolute',
    top: -verticalScale(40),
    backgroundColor: '#FFD700',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },
  levelUpText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  statsContainer: {
    marginBottom: verticalScale(32),
    gap: verticalScale(24),
  },
  levelContainer: {
    marginBottom: verticalScale(16),
  },
  levelText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  tabletLevelText: {
    fontSize: moderateScale(32),
  },
  xpBarContainer: {
    height: verticalScale(20),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(8),
  },
  darkXpBarContainer: {
    backgroundColor: '#333333',
  },
  xpBar: {
    height: '100%',
    borderRadius: moderateScale(10),
  },
  xpText: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'center',
  },
  statRow: {
    gap: verticalScale(16),
  },
  statItem: {
    marginBottom: verticalScale(8),
  },
  statLabel: {
    fontSize: moderateScale(16),
    color: '#666666',
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
  statBarContainer: {
    height: verticalScale(16),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginBottom: verticalScale(4),
  },
  darkStatBarContainer: {
    backgroundColor: '#333333',
  },
  statBar: {
    height: '100%',
    borderRadius: moderateScale(8),
  },
  statValue: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  actionButton: {
    flex: 1,
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(140),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabletActionButton: {
    paddingVertical: verticalScale(24),
    minWidth: scale(200),
  },
  actionEmoji: {
    fontSize: moderateScale(40),
    marginBottom: verticalScale(8),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  tabletActionButtonText: {
    fontSize: moderateScale(22),
  },
});

export default App;
