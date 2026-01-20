import React, { useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated, TextInput, Modal, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { GameState, Dimensions } from '../types';
import { CHARACTERS, INITIAL_STATE, XP_PER_LEVEL, MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';
import { ANIMATION_CONFIG } from '../constants/animations';
import { scale, moderateScale, verticalScale } from '../utils/responsive';
import { styles } from '../styles';
import { useGameActions } from '../hooks/useGameActions';
import { useLevelUp } from '../hooks/useLevelUp';
import { useStatDecay } from '../hooks/useStatDecay';
import { useRandomEvents } from '../hooks/useRandomEvents';
import { useCharacterAnimation } from '../hooks/useCharacterAnimation';
import { useTamagotchiFeatures } from '../hooks/useTamagotchiFeatures';
import { EventNotification } from '../components/EventNotification';
import { SnoringAnimation } from '../components/SnoringAnimation';
import { ActionEmojis, ActionType } from '../components/ActionEmojis';
import { PoopDisplay } from '../components/PoopDisplay';
import { SickIndicator } from '../components/SickIndicator';
import { DeathScreen } from '../components/DeathScreen';
import { LightsToggle } from '../components/LightsToggle';
import { LifeStageIndicator } from '../components/LifeStageIndicator';
import { useTimeoutManager } from '../utils/timeoutManager';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

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
  const character = CHARACTERS.find((c) => c.type === gameState.character);

  // Validate character exists - prevent runtime errors
  if (!character) {
    console.error('Character not found:', gameState.character);
    setGameState(INITIAL_STATE);
    return <></>;
  }

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSnoring, setIsSnoring] = useState(false);
  const [showActionEmojis, setShowActionEmojis] = useState(false);
  const [currentActionType, setCurrentActionType] = useState<ActionType>('eat');

  // Use timeout manager for automatic cleanup
  const timeoutManager = useTimeoutManager();

  const { bounceAnim, handleEat, handlePlay, handleSleep, handleExercise, handlePet, handleMedicine, handleClean } = useGameActions(setGameState);
  const { levelUpAnim, xpProgress } = useLevelUp(gameState, setGameState);

  // Tamagotchi features
  const tamagotchi = useTamagotchiFeatures(gameState, setGameState);

  // Use decay multiplier from Tamagotchi features
  useStatDecay(gameState, setGameState, tamagotchi.totalDecayMultiplier);

  const { currentEvent, dismissEvent } = useRandomEvents(gameState, setGameState);
  const { characterScale, characterRotate, playJumpAnimation, playShakeAnimation, playSpinAnimation, playHappyAnimation } = useCharacterAnimation();

  const handleRename = useCallback(() => {
    if (newName.trim()) {
      setGameState(prev => ({ ...prev, customName: newName.trim() }));
      setShowRenameModal(false);
      setNewName('');
      playHappyAnimation();
    }
  }, [newName, setGameState, playHappyAnimation]);

  const displayName = gameState.customName || character.name;

  // Wrap action handlers with animations and managed timeouts
  const handleEatWithAnimation = useCallback(() => {
    handleEat();
    playJumpAnimation();
    setCurrentActionType('eat');
    setShowActionEmojis(true);
    timeoutManager.setTimeout(
      () => setShowActionEmojis(false),
      ANIMATION_CONFIG.timeouts.actionEmojisDisplay
    );
  }, [handleEat, playJumpAnimation, timeoutManager]);

  const handlePlayWithAnimation = useCallback(() => {
    handlePlay();
    playHappyAnimation();
    setCurrentActionType('play');
    setShowActionEmojis(true);
    timeoutManager.setTimeout(
      () => setShowActionEmojis(false),
      ANIMATION_CONFIG.timeouts.actionEmojisDisplay
    );
  }, [handlePlay, playHappyAnimation, timeoutManager]);

  const handleSleepWithAnimation = useCallback(() => {
    handleSleep(tamagotchi.sleep.sleepQuality);
    playShakeAnimation();
    setIsSnoring(true);
    timeoutManager.setTimeout(
      () => setIsSnoring(false),
      ANIMATION_CONFIG.timeouts.snoringDisplay
    );
  }, [handleSleep, playShakeAnimation, timeoutManager, tamagotchi.sleep.sleepQuality]);

  const handleExerciseWithAnimation = useCallback(() => {
    handleExercise();
    playSpinAnimation();
  }, [handleExercise, playSpinAnimation]);

  const handlePetWithAnimation = useCallback(() => {
    handlePet();
    playHappyAnimation();
  }, [handlePet, playHappyAnimation]);

  const handleMedicineWithAnimation = useCallback(() => {
    handleMedicine();
    playShakeAnimation();
    setCurrentActionType('medicine');
    setShowActionEmojis(true);
    timeoutManager.setTimeout(
      () => setShowActionEmojis(false),
      ANIMATION_CONFIG.timeouts.actionEmojisDisplay
    );
  }, [handleMedicine, playShakeAnimation, timeoutManager]);

  const handleCleanWithAnimation = useCallback(() => {
    handleClean();
    playHappyAnimation();
  }, [handleClean, playHappyAnimation]);

  const handleOpenRenameModal = useCallback(() => {
    setShowRenameModal(true);
  }, []);

  // Enable keyboard shortcuts for desktop users
  useKeyboardShortcuts({
    onEat: handleEatWithAnimation,
    onPlay: handlePlayWithAnimation,
    onSleep: handleSleepWithAnimation,
    onExercise: handleExerciseWithAnimation,
    onPet: handlePetWithAnimation,
    onMedicine: handleMedicineWithAnimation,
    onRename: handleOpenRenameModal,
    onClean: handleCleanWithAnimation,
  });

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
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(12) }}>
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
              <LifeStageIndicator
                stage={tamagotchi.lifeStage.currentStage}
                stageConfig={tamagotchi.lifeStage.stageConfig}
                ageDisplay={tamagotchi.lifeStage.ageDisplay}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(12) }}>
              <LightsToggle
                lightsOn={tamagotchi.sleep.lightsOn}
                isNightTime={tamagotchi.sleep.isNightTime}
                onToggle={tamagotchi.sleep.toggleLights}
              />
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
          </View>

          {/* Character Display */}
          <View style={styles.characterDisplay}>
            <Animated.View
              style={[
                styles.characterDisplayContainer,
                {
                  transform: [
                    { scale: Animated.multiply(bounceAnim, characterScale).interpolate({
                      inputRange: [0, 10],
                      outputRange: [0, 10 * tamagotchi.lifeStage.stageConfig.scale],
                    }) },
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
                  !tamagotchi.sleep.lightsOn && { backgroundColor: character.color + '10' },
                ]}
              >
                <CharacterIcon
                  characterType={character.type}
                  size={moderateScale(60)}
                  isTablet={isTablet}
                  containerSize={isTablet ? scale(200) : scale(120)}
                  lifeStage={tamagotchi.lifeStage.currentStage}
                  isSick={tamagotchi.health.isSick}
                  isDead={tamagotchi.health.isDead}
                  isSleeping={!tamagotchi.sleep.lightsOn}
                />
                {/* Snoring Animation */}
                <SnoringAnimation visible={isSnoring} />
                {/* Action Emojis */}
                <ActionEmojis visible={showActionEmojis} actionType={currentActionType} />
                {/* Sick Indicator */}
                <SickIndicator
                  isSick={tamagotchi.health.isSick}
                  sickReason={tamagotchi.health.sickReason}
                />
              </View>
              {/* Poop Display */}
              <PoopDisplay poopCount={tamagotchi.poop.poopCount} isTablet={isTablet} />
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
                  gameState.hunger >= MAX_HUNGER && styles.disabledActionButton,
                ]}
                onPress={handleEatWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.hunger >= MAX_HUNGER}
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
                  gameState.happiness >= MAX_HAPPINESS && styles.disabledActionButton,
                ]}
                onPress={handlePlayWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.happiness >= MAX_HAPPINESS}
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
                  gameState.energy >= MAX_ENERGY && styles.disabledActionButton,
                ]}
                onPress={handleSleepWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.energy >= MAX_ENERGY}
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
                  gameState.energy < 20 && styles.disabledActionButton,
                ]}
                onPress={handleExerciseWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.energy < 20}
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
                  gameState.happiness >= MAX_HAPPINESS && styles.disabledActionButton,
                ]}
                onPress={handlePetWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.happiness >= MAX_HAPPINESS}
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
                  gameState.health >= MAX_HEALTH && styles.disabledActionButton,
                ]}
                onPress={handleMedicineWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.health >= MAX_HEALTH}
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

            {/* Third row - Clean button */}
            <View style={{ flexDirection: 'row', gap: scale(12), justifyContent: 'center' }}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: '#8B4513' },
                  isTablet && styles.tabletActionButton,
                  gameState.poopCount === 0 && styles.disabledActionButton,
                ]}
                onPress={handleCleanWithAnimation}
                activeOpacity={0.8}
                disabled={gameState.poopCount === 0}
                accessibilityRole="button"
                accessibilityLabel={`Clean up after ${displayName}`}
                accessibilityHint={`Remove all poop and gain 5 experience`}
                accessibilityState={{ disabled: gameState.poopCount === 0 }}
              >
                <Text style={styles.actionEmoji}>🧹</Text>
                <Text
                  style={[
                    styles.actionButtonText,
                    isTablet && styles.tabletActionButtonText,
                  ]}
                >
                  Städa {gameState.poopCount > 0 ? `(${gameState.poopCount})` : ''}
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

      {/* Death Screen */}
      <DeathScreen
        visible={tamagotchi.health.isDead}
        characterName={displayName}
        characterType={gameState.character}
        canRevive={tamagotchi.health.canRevive}
        onRevive={tamagotchi.health.handleRevive}
        onNewPet={() => setGameState(INITIAL_STATE)}
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
