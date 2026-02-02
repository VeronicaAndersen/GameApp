import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../utils/responsive';

interface RenameModalProps {
  visible: boolean;
  currentName: string;
  characterName: string;
  onRename: (name: string) => void;
  onClose: () => void;
  isWideScreen: boolean;
}

export const RenameModal = React.memo<RenameModalProps>(({
  visible,
  currentName,
  characterName,
  onRename,
  onClose,
  isWideScreen,
}) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = useCallback(() => {
    if (newName.trim()) {
      onRename(newName.trim());
      setNewName('');
    }
  }, [newName, onRename]);

  const handleClose = useCallback(() => {
    onClose();
    setNewName('');
  }, [onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View nativeID="rename-modal-overlay" style={modalStyles.overlay}>
        <View nativeID="rename-modal" style={[modalStyles.modal, isWideScreen && modalStyles.wideModal]}>
          <Text style={[modalStyles.title, isWideScreen && modalStyles.wideTitle]}>
            Ge {characterName} ett nytt namn
          </Text>
          <TextInput
            nativeID="rename-input"
            style={[modalStyles.input, isWideScreen && modalStyles.wideInput]}
            value={newName}
            onChangeText={setNewName}
            placeholder={currentName || characterName}
            placeholderTextColor="#8B8FC7"
            autoFocus
            maxLength={20}
            accessibilityLabel="Character name input"
            accessibilityHint="Enter a custom name for your character"
          />
          <View nativeID="rename-modal-buttons" style={modalStyles.buttons}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton, isWideScreen && modalStyles.wideButton]}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={[modalStyles.buttonText, isWideScreen && modalStyles.wideButtonText]}>Avbryt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.confirmButton, isWideScreen && modalStyles.wideButton]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!newName.trim()}
            >
              <Text style={[modalStyles.buttonText, isWideScreen && modalStyles.wideButtonText]}>Spara</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

RenameModal.displayName = 'RenameModal';

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modal: {
    backgroundColor: '#141832',
    borderRadius: moderateScale(20),
    padding: scale(24),
    width: '90%',
    maxWidth: scale(400),
    borderWidth: 1,
    borderColor: '#2A2F5A',
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wideModal: {
    padding: scale(32),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#E0E4FF',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  wideTitle: {
    fontSize: moderateScale(24),
  },
  input: {
    backgroundColor: '#1A1F3A',
    borderRadius: moderateScale(12),
    padding: scale(12),
    fontSize: moderateScale(16),
    color: '#E0E4FF',
    marginBottom: verticalScale(20),
    borderWidth: 2,
    borderColor: '#2A2F5A',
  },
  wideInput: {
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
  wideButton: {
    paddingVertical: verticalScale(14),
  },
  cancelButton: {
    backgroundColor: '#2A2F5A',
  },
  confirmButton: {
    backgroundColor: '#7B68EE',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  wideButtonText: {
    fontSize: moderateScale(18),
  },
});
