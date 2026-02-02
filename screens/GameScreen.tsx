import React, { useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CharacterIcon } from '../components/CharacterIcon';
import { GameState, Dimensions as ScreenDimensions } from '../types';
import { CHARACTERS, INITIAL_STATE, XP_PER_LEVEL, MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';
import { ANIMATION_CONFIG } from '../constants/animations';
import { scale, moderateScale } from '../utils/responsive';
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
import { StatBar } from '../components/StatBar';
import { ActionButton } from '../components/ActionButton';
import { RenameModal } from '../components/RenameModal';
import { SickIndicator } from '../components/SickIndicator';
import { DeathScreen } from '../components/DeathScreen';
import { LightsToggle } from '../components/LightsToggle';
import { LifeStageIndicator } from '../components/LifeStageIndicator';
import { NightOverlay } from '../components/NightOverlay';
import { SpaceBackground } from '../components/SpaceBackground';
import { useTimeoutManager } from '../utils/timeoutManager';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export interface GameScreenProps {
  dimensions: ScreenDimensions;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function GameScreen({
  dimensions,
  gameState,
  setGameState,
}: GameScreenProps): React.JSX.Element {
  const isWideScreen = dimensions.width >= 768;
  const character = CHARACTERS.find((c) => c.type === gameState.character);

  const [showRenameModal, setShowRenameModal] = useState(false);
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

  const displayName = gameState.customName || (character?.name ?? '');
  const lightsOff = !tamagotchi.sleep.lightsOn;

  // Determine character mood for PNG expression
  const characterMood = lightsOff ? 'sleepy'
    : (tamagotchi.health.isSick || gameState.happiness < 30) ? 'sad'
    : 'normal';

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

  // Validate character exists - prevent runtime errors
  if (!character) {
    setGameState(INITIAL_STATE);
    return <></>;
  }

  // Character display section
  const characterDisplaySection = (
    <View style={[styles.characterDisplay, isWideScreen && styles.tabletCharacterDisplay]}>
      <Animated.View
        style={[
          styles.characterDisplayContainer,
          {
            transform: [
              { scale: Animated.multiply(bounceAnim, characterScale).interpolate({
                inputRange: [0, 10],
                outputRange: [0, 10 * tamagotchi.lifeStage.stageConfig.scale],
              }) },
              { rotate: characterRotate.interpolate({
                inputRange: [-360, 360],
                outputRange: ['-360deg', '360deg'],
              }) }
            ]
          },
        ]}
      >
        <View
          style={[
            styles.characterDisplayEmoji,
            { backgroundColor: character.color + '20' },
            isWideScreen && styles.tabletCharacterDisplayEmoji,
            (character.type === 'lizard' || character.type === 'cat') && styles.lizardDisplayContainer,
            lightsOff && { backgroundColor: character.color + '10' },
          ]}
        >
          <CharacterIcon
            characterType={character.type}
            size={moderateScale(60)}
            containerSize={isWideScreen ? scale(160) : scale(120)}
            lifeStage={tamagotchi.lifeStage.currentStage}
            isSick={tamagotchi.health.isSick}
            isDead={tamagotchi.health.isDead}
            isSleeping={lightsOff}
            mood={characterMood}
          />
          <SnoringAnimation visible={isSnoring} />
          <ActionEmojis visible={showActionEmojis} actionType={currentActionType} />
          <SickIndicator isSick={tamagotchi.health.isSick} sickReason={tamagotchi.health.sickReason} />
          <NightOverlay visible={lightsOff} />
        </View>
        <PoopDisplay poopCount={tamagotchi.poop.poopCount} isTablet={isWideScreen} />
        <Animated.View
          style={[
            styles.levelUpBadge,
            { opacity: levelUpAnim, transform: [{ scale: levelUpAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) }] },
          ]}
        >
          <Text style={styles.levelUpText}>LEVEL UP! ⭐</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );

  // Stats section
  const statsSection = (
    <View
      style={[styles.statsContainer, isWideScreen && styles.tabletStatsContainer]}
      accessibilityRole="summary"
      accessibilityLabel={`Character stats: Level ${gameState.level}, ${gameState.experience % XP_PER_LEVEL} of ${XP_PER_LEVEL} experience points, ${Math.round(gameState.hunger)}% hunger, ${Math.round(gameState.happiness)}% happiness, ${Math.round(gameState.energy)}% energy, ${Math.round(gameState.health)}% health`}
    >
      <View style={[styles.levelContainer, isWideScreen && styles.tabletLevelContainer]}>
        <Text style={[styles.levelText, isWideScreen && styles.tabletLevelText]} accessibilityRole="text">
          Level {gameState.level}
        </Text>
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBar, { width: `${xpProgress * 100}%`, backgroundColor: character.color }]} />
        </View>
        <Text style={styles.xpText}>{gameState.experience % XP_PER_LEVEL} / {XP_PER_LEVEL} XP</Text>
      </View>
      <View style={[styles.statRow, isWideScreen && styles.tabletStatRow]}>
        <StatBar label="Hunger" value={gameState.hunger} maxValue={MAX_HUNGER} barColor="#FF6B6B" />
        <StatBar label="Glädje" value={gameState.happiness} maxValue={MAX_HAPPINESS} barColor="#4FC3F7" />
      </View>
      <View style={[styles.statRow, isWideScreen && styles.tabletStatRow]}>
        <StatBar label="Energi" value={gameState.energy} maxValue={MAX_ENERGY} barColor="#FFD93D" />
        <StatBar label="Hälsa" value={gameState.health} maxValue={MAX_HEALTH} barColor="#69F0AE" />
      </View>
    </View>
  );

  // Actions section
  const actionsSection = (
    <View style={[styles.actionRowContainer, isWideScreen && styles.tabletActionRowContainer]}>
      <View style={styles.actionRow}>
        <ActionButton emoji="🍕" label="Mat" colorStyle={styles.actionButtonEat}
          onPress={handleEatWithAnimation} disabled={gameState.hunger >= MAX_HUNGER}
          accessibilityLabel={`Feed ${displayName}`} accessibilityHint="Increase hunger by 20 points, decrease energy by 5, and gain 10 experience" />
        <ActionButton emoji="🎮" label="Lek" colorStyle={styles.actionButtonPlay}
          onPress={handlePlayWithAnimation} disabled={gameState.happiness >= MAX_HAPPINESS}
          accessibilityLabel={`Play with ${character.name}`} accessibilityHint="Increase happiness by 20 points, decrease energy by 10 and hunger by 5, and gain 15 experience" />
        <ActionButton emoji="😴" label="Sov" colorStyle={styles.actionButtonSleep}
          onPress={handleSleepWithAnimation} disabled={gameState.energy >= MAX_ENERGY}
          accessibilityLabel={`Let ${character.name} sleep`} accessibilityHint="Increase energy by 30 points, decrease hunger by 10, and gain 5 experience" />
      </View>
      <View style={styles.actionRow}>
        <ActionButton emoji="🏃" label="Träna" colorStyle={styles.actionButtonExercise}
          onPress={handleExerciseWithAnimation} disabled={gameState.energy < 20}
          accessibilityLabel={`Exercise with ${character.name}`} accessibilityHint="Increase health by 15 and happiness by 10, decrease energy by 20 and hunger by 15, and gain 20 experience" />
        <ActionButton emoji="❤️" label="Klappa" colorStyle={styles.actionButtonPet}
          onPress={handlePetWithAnimation} disabled={gameState.happiness >= MAX_HAPPINESS}
          accessibilityLabel={`Pet ${character.name}`} accessibilityHint="Increase happiness by 15 and health by 5, and gain 8 experience" />
        <ActionButton emoji="💊" label="Medicin" colorStyle={styles.actionButtonMedicine}
          onPress={handleMedicineWithAnimation} disabled={gameState.health >= MAX_HEALTH}
          accessibilityLabel={`Give ${character.name} medicine`} accessibilityHint="Increase health by 30 points, decrease happiness by 10, and gain 5 experience" />
      </View>
      <View style={styles.actionRowCenter}>
        <ActionButton emoji="🧹" label={`Städa ${gameState.poopCount > 0 ? `(${gameState.poopCount})` : ''}`} colorStyle={styles.actionButtonClean}
          onPress={handleCleanWithAnimation} disabled={gameState.poopCount === 0}
          accessibilityLabel={`Clean up after ${displayName}`} accessibilityHint="Remove all poop and gain 5 experience" />
      </View>
    </View>
  );

  // Header section
  const headerSection = (
    <View style={[styles.gameHeader, isWideScreen && styles.tabletGameHeader]}>
      <View style={[styles.headerRow, { gap: scale(12) }]}>
        <TouchableOpacity
          onPress={() => setShowRenameModal(true)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Rename character"
          accessibilityHint="Tap to give your character a custom name"
        >
          <Text style={styles.gameTitle}>
            {displayName} ✏️🤬
          </Text>
        </TouchableOpacity>
        <LifeStageIndicator
          stage={tamagotchi.lifeStage.currentStage}
          stageConfig={tamagotchi.lifeStage.stageConfig}
          ageDisplay={tamagotchi.lifeStage.ageDisplay}
        />
      </View>
      <View style={[styles.headerRow, { gap: scale(12) }]}>
        <LightsToggle
          lightsOn={tamagotchi.sleep.lightsOn}
          isNightTime={tamagotchi.sleep.isNightTime}
          onToggle={tamagotchi.sleep.toggleLights}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setGameState(INITIAL_STATE)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Change character"
          accessibilityHint="Return to character selection screen to choose a different character"
        >
          <Text style={styles.backButtonText}>Byt karaktär</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        lightsOff ? styles.lightsOffContainer : styles.lightsOnContainer,
      ]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <SpaceBackground />
      {isWideScreen ? (
        // Tablet: two-column layout, no scrolling
        <View style={[styles.gameContent, styles.tabletGameContent, { paddingHorizontal: scale(24), paddingVertical: scale(8) }]}>
          {headerSection}
          <View style={styles.tabletBody}>
            <View style={styles.tabletLeftColumn}>
              {characterDisplaySection}
            </View>
            <View style={styles.tabletRightColumn}>
              {statsSection}
              {actionsSection}
            </View>
          </View>
        </View>
      ) : (
        // Phone: scrollable vertical layout
        <ScrollView
          contentContainerStyle={styles.gameScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.gameContent}>
            {headerSection}
            {characterDisplaySection}
            {statsSection}
            {actionsSection}
          </View>
        </ScrollView>
      )}

      <EventNotification event={currentEvent} onDismiss={dismissEvent} isTablet={isWideScreen} />

      <DeathScreen
        visible={tamagotchi.health.isDead}
        characterName={displayName}
        characterType={gameState.character}
        canRevive={tamagotchi.health.canRevive}
        onRevive={tamagotchi.health.handleRevive}
        onNewPet={() => setGameState(INITIAL_STATE)}
      />

      <RenameModal
        visible={showRenameModal}
        currentName={gameState.customName || ''}
        characterName={character.name}
        onRename={(name: string) => {
          setGameState(prev => ({ ...prev, customName: name }));
          setShowRenameModal(false);
          playHappyAnimation();
        }}
        onClose={() => setShowRenameModal(false)}
        isTablet={isWideScreen}
      />
    </SafeAreaView>
  );
}
