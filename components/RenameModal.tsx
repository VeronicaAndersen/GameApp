import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { scale, moderateScale, verticalScale } from '../utils/responsive';

interface RenameModalProps {
  visible: boolean;
  currentName: string;
  characterName: string;
  onRename: (name: string) => void;
  onClose: () => void;
  isTablet: boolean;
}

export const RenameModal = React.memo<RenameModalProps>(({
  visible,
  currentName,
  characterName,
  onRename,
  onClose,
  isTablet,
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
      <View style={modalStyles.overlay}>
        <View style={[modalStyles.modal, isTablet && modalStyles.tabletModal]}>
          <Text style={[modalStyles.title, isTablet && modalStyles.tabletTitle]}>
            Ge {characterName} ett nytt namn
          </Text>
          <TextInput
            style={[modalStyles.input, isTablet && modalStyles.tabletInput]}
            value={newName}
            onChangeText={setNewName}
            placeholder={currentName || characterName}
            placeholderTextColor="#8B8FC7"
            autoFocus
            maxLength={20}
            accessibilityLabel="Character name input"
            accessibilityHint="Enter a custom name for your character"
          />
          <View style={modalStyles.buttons}>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.cancelButton, isTablet && modalStyles.tabletButton]}
              onPress={handleClose}
              activeOpacity={0.8}
            >
              <Text style={[modalStyles.buttonText, isTablet && modalStyles.tabletButtonText]}>Avbryt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[modalStyles.button, modalStyles.confirmButton, isTablet && modalStyles.tabletButton]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={!newName.trim()}
            >
              <Text style={[modalStyles.buttonText, isTablet && modalStyles.tabletButtonText]}>Spara</Text>
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
  tabletModal: {
    padding: scale(32),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#E0E4FF',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  tabletTitle: {
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
  tabletButtonText: {
    fontSize: moderateScale(18),
  },
});
