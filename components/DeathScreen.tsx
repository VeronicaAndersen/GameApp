import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/responsive';
import { CharacterType } from '../types';

interface DeathScreenProps {
  visible: boolean;
  characterName: string;
  characterType: CharacterType | null;
  canRevive: boolean;
  onRevive: () => void;
  onNewPet: () => void;
}

/**
 * Full screen overlay shown when pet dies
 */
export const DeathScreen: React.FC<DeathScreenProps> = ({
  visible,
  characterName,
  characterType: _characterType,
  canRevive,
  onRevive,
  onNewPet,
}) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.tombstone}>🪦</Text>
          <Text style={styles.title}>Vila i Frid</Text>
          <Text style={styles.name}>{characterName}</Text>
          <Text style={styles.message}>
            Din vän har gått bort...{'\n'}
            Men minnet lever kvar för alltid.
          </Text>

          <View style={styles.buttonContainer}>
            {canRevive && (
              <TouchableOpacity
                style={[styles.button, styles.reviveButton]}
                onPress={onRevive}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonEmoji}>✨</Text>
                <Text style={styles.buttonText}>Återuppliva</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.button, styles.newPetButton]}
              onPress={onNewPet}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonEmoji}>🥚</Text>
              <Text style={styles.buttonText}>Nytt Husdjur</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#141832',
    borderRadius: moderateScale(24),
    padding: scale(32),
    alignItems: 'center',
    maxWidth: scale(320),
    borderWidth: 2,
    borderColor: '#2A2F5A',
  },
  tombstone: {
    fontSize: moderateScale(64),
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#E0E4FF',
    marginBottom: verticalScale(8),
  },
  name: {
    fontSize: moderateScale(22),
    color: '#7B68EE',
    fontWeight: '600',
    marginBottom: verticalScale(16),
  },
  message: {
    fontSize: moderateScale(14),
    color: '#8B8FC7',
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(24),
  },
  buttonContainer: {
    width: '100%',
    gap: verticalScale(12),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(16),
    gap: scale(8),
  },
  reviveButton: {
    backgroundColor: '#7B68EE',
  },
  newPetButton: {
    backgroundColor: '#2A2F5A',
  },
  buttonEmoji: {
    fontSize: moderateScale(20),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
