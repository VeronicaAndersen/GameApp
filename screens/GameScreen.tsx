import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated, TextInput, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { GameState, Dimensions } from '../types';
import { CHARACTERS, INITIAL_STATE, XP_PER_LEVEL, MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';
import { scale, moderateScale, verticalScale } from '../utils/responsive';
import { styles } from '../styles';
import { useGameActions } from '../hooks/useGameActions';
import { useLevelUp } from '../hooks/useLevelUp';
import { useStatDecay } from '../hooks/useStatDecay';
import { useRandomEvents } from '../hooks/useRandomEvents';
import { useCharacterAnimation } from '../hooks/useCharacterAnimation';
import { EventNotification } from '../components/EventNotification';

export interface GameScreenProps {
  dimensions: Dimensions;
  isDarkMode: boolean;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function GameScreen({
  dimensions,
  isDarkMode,
  gameState,
  setGameState,
}: GameScreenProps): React.JSX.Element {
  const isTablet = dimensions.width >= 768;
  const character = CHARACTERS.find((c) => c.type === gameState.character)!;
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newName, setNewName] = useState('');

  const { bounceAnim, handleEat, handlePlay, handleSleep, handleExercise, handlePet, handleMedicine } = useGameActions(setGameState);
  const { levelUpAnim, xpProgress } = useLevelUp(gameState, setGameState);
  useStatDecay(gameState, setGameState);
  const { currentEvent, dismissEvent } = useRandomEvents(gameState, setGameState);
  const { characterScale, characterRotate, playJumpAnimation, playShakeAnimation, playSpinAnimation, playHappyAnimation } = useCharacterAnimation();

  const handleRename = () => {
    if (newName.trim()) {
      setGameState(prev => ({ ...prev, customName: newName.trim() }));
      setShowRenameModal(false);
      setNewName('');
      playHappyAnimation();
    }
  };

  const displayName = gameState.customName || character.name;

  // Wrap action handlers with animations
  const handleEatWithAnimation = () => {
    handleEat();
    playJumpAnimation();
  };

  const handlePlayWithAnimation = () => {
    handlePlay();
    playHappyAnimation();
  };

  const handleSleepWithAnimation = () => {
    handleSleep();
    playShakeAnimation();
  };

  const handleExerciseWithAnimation = () => {
    handleExercise();
    playSpinAnimation();
  };

  const handlePetWithAnimation = () => {
    handlePet();
    playHappyAnimation();
  };

  const handleMedicineWithAnimation = () => {
    handleMedicine();
    playShakeAnimation();
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
            <TouchableOpacity
              onPress={() => setShowRenameModal(true)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Rename character"
              accessibilityHint="Tap to give your character a custom name"
            >
              <Text
                style={[
                  styles.gameTitle,
                  isDarkMode && styles.darkTitle,
                  isTablet && styles.tabletTitle,
                ]}
              >
                {displayName} ✏️
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.backButton,
                isDarkMode && styles.darkBackButton,
                isTablet && styles.tabletBackButton,
              ]}
              onPress={() => setGameState(INITIAL_STATE)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Change character"
              accessibilityHint="Return to character selection screen to choose a different character"
            >
              <Text style={[
                styles.backButtonText,
                isDarkMode && styles.darkSubtitle,
                isTablet && styles.tabletBackButtonText,
              ]}>
                Byt karaktär
              </Text>
            </TouchableOpacity>
          </View>

          {/* Character Display */}
          <View style={styles.characterDisplay}>
            <Animated.View
              style={[
                styles.characterDisplayContainer,
                {
                  transform: [
                    { scale: Animated.multiply(bounceAnim, characterScale) },
                    {
                      rotate: characterRotate.interpolate({
                        inputRange: [-360, 360],
                        outputRange: ['-360deg', '360deg'],
                      })
                    }
                  ]
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
                  size={moderateScale(60)}
                  isTablet={isTablet}
                  containerSize={isTablet ? scale(200) : scale(120)}
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
          <View
            style={styles.statsContainer}
            accessibilityRole="summary"
            accessibilityLabel={`Character stats: Level ${gameState.level}, ${gameState.experience % XP_PER_LEVEL} of ${XP_PER_LEVEL} experience points, ${gameState.hunger}% hunger, ${gameState.happiness}% happiness, ${gameState.energy}% energy, ${gameState.health}% health`}
          >
            <View style={styles.levelContainer}>
              <Text
                style={[
                  styles.levelText,
                  isDarkMode && styles.darkTitle,
                  isTablet && styles.tabletLevelText,
                ]}
                accessibilityRole="text"
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
                  Glädje
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

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  Energi
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
                        width: `${(gameState.energy / MAX_ENERGY) * 100}%`,
                        backgroundColor: '#FFD93D',
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
                  {gameState.energy}%
                </Text>
              </View>

              <View style={styles.statItem}>
                <Text
                  style={[
                    styles.statLabel,
                    isDarkMode && styles.darkSubtitle,
                  ]}
                >
                  Hälsa
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
                        width: `${(gameState.health / MAX_HEALTH) * 100}%`,
                        backgroundColor: '#6BCF7F',
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
                  {gameState.health}%
                </Text>
              </View>
            </View>
          </View>

          {/* Actions */}
          <View style={{ gap: scale(12) }}>
            <View style={{ flexDirection: 'row', gap: scale(12) }}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#FF6B6B' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handleEatWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Feed ${displayName}`}
                accessibilityHint={`Increase hunger by 20 points, decrease energy by 5, and gain 10 experience`}
                accessibilityState={{ disabled: gameState.hunger >= MAX_HUNGER }}
              >
                <Text style={styles.actionEmoji}>🍕</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Mat
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#4ECDC4' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handlePlayWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Play with ${character.name}`}
                accessibilityHint={`Increase happiness by 20 points, decrease energy by 10 and hunger by 5, and gain 15 experience`}
                accessibilityState={{ disabled: gameState.happiness >= MAX_HAPPINESS }}
              >
                <Text style={styles.actionEmoji}>🎮</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Lek
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#9370DB' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handleSleepWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Let ${character.name} sleep`}
                accessibilityHint={`Increase energy by 30 points, decrease hunger by 10, and gain 5 experience`}
                accessibilityState={{ disabled: gameState.energy >= MAX_ENERGY }}
              >
                <Text style={styles.actionEmoji}>😴</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Sov
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', gap: scale(12) }}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#FF8C42' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handleExerciseWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Exercise with ${character.name}`}
                accessibilityHint={`Increase health by 15 and happiness by 10, decrease energy by 20 and hunger by 15, and gain 20 experience`}
                accessibilityState={{ disabled: gameState.energy < 20 }}
              >
                <Text style={styles.actionEmoji}>🏃</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Träna
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#FF69B4' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handlePetWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Pet ${character.name}`}
                accessibilityHint={`Increase happiness by 15 and health by 5, and gain 8 experience`}
                accessibilityState={{ disabled: gameState.happiness >= MAX_HAPPINESS }}
              >
                <Text style={styles.actionEmoji}>❤️</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Klappa
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#87CEEB' },
                  isTablet && styles.tabletActionButton,
                ]}
                onPress={handleMedicineWithAnimation}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Give ${character.name} medicine`}
                accessibilityHint={`Increase health by 30 points, decrease happiness by 10, and gain 5 experience`}
                accessibilityState={{ disabled: gameState.health >= MAX_HEALTH }}
              >
                <Text style={styles.actionEmoji}>💊</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Medicin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Random Event Notification */}
      <EventNotification
        event={currentEvent}
        onDismiss={dismissEvent}
        isDarkMode={isDarkMode}
        isTablet={isTablet}
      />

      {/* Rename Modal */}
      <Modal
        visible={showRenameModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRenameModal(false)}
      >
        <View style={renameModalStyles.overlay}>
          <View style={[renameModalStyles.modal, isDarkMode && renameModalStyles.darkModal, isTablet && renameModalStyles.tabletModal]}>
            <Text style={[renameModalStyles.title, isDarkMode && renameModalStyles.darkTitle, isTablet && renameModalStyles.tabletTitle]}>
              Ge {character.name} ett nytt namn
            </Text>
            <TextInput
              style={[renameModalStyles.input, isDarkMode && renameModalStyles.darkInput, isTablet && renameModalStyles.tabletInput]}
              value={newName}
              onChangeText={setNewName}
              placeholder={gameState.customName || character.name}
              placeholderTextColor={isDarkMode ? '#999' : '#666'}
              autoFocus
              maxLength={20}
              accessibilityLabel="Character name input"
              accessibilityHint="Enter a custom name for your character"
            />
            <View style={renameModalStyles.buttons}>
              <TouchableOpacity
                style={[renameModalStyles.button, renameModalStyles.cancelButton, isTablet && renameModalStyles.tabletButton]}
                onPress={() => {
                  setShowRenameModal(false);
                  setNewName('');
                }}
                activeOpacity={0.8}
              >
                <Text style={[renameModalStyles.buttonText, isTablet && renameModalStyles.tabletButtonText]}>Avbryt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[renameModalStyles.button, renameModalStyles.confirmButton, isTablet && renameModalStyles.tabletButton]}
                onPress={handleRename}
                activeOpacity={0.8}
                disabled={!newName.trim()}
              >
                <Text style={[renameModalStyles.buttonText, isTablet && renameModalStyles.tabletButtonText]}>Spara</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const renameModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    padding: scale(24),
    width: '90%',
    maxWidth: scale(400),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkModal: {
    backgroundColor: '#2C2C2E',
  },
  tabletModal: {
    padding: scale(32),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000000',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  darkTitle: {
    color: '#FFFFFF',
  },
  tabletTitle: {
    fontSize: moderateScale(24),
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(12),
    padding: scale(12),
    fontSize: moderateScale(16),
    color: '#000000',
    marginBottom: verticalScale(20),
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  darkInput: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    borderColor: '#333333',
  },
  tabletInput: {
    padding: scale(16),
    fontSize: moderateScale(18),
  },
  buttons: {
    flexDirection: 'row',
    gap: scale(12),
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  tabletButton: {
    paddingVertical: verticalScale(14),
  },
  cancelButton: {
    backgroundColor: '#999999',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  tabletButtonText: {
    fontSize: moderateScale(18),
  },
});
