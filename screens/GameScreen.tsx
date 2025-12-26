import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { GameState } from '../types';
import { CHARACTERS, INITIAL_STATE, XP_PER_LEVEL, MAX_HUNGER, MAX_HAPPINESS } from '../constants';
import { scale, moderateScale } from '../utils/responsive';
import { styles } from '../styles';
import { useGameActions } from '../hooks/useGameActions';
import { useLevelUp } from '../hooks/useLevelUp';

interface GameScreenProps {
  dimensions: { width: number; height: number };
  isDarkMode: boolean;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function GameScreen({
  dimensions,
  isDarkMode,
  gameState,
  setGameState,
}: GameScreenProps) {
  const isTablet = dimensions.width >= 768;
  const character = CHARACTERS.find((c) => c.type === gameState.character)!;

  const { bounceAnim, handleEat, handlePlay } = useGameActions(setGameState);
  const { levelUpAnim, xpProgress } = useLevelUp(gameState, setGameState);

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
                { transform: [{ scale: bounceAnim }] },
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
