import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { moderateScale } from '../utils/responsive';

export interface KeyboardShortcutsHelpProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  visible,
  onClose,
  isDarkMode,
}) => {
  // Only show on web platform
  if (Platform.OS !== 'web') {
    return null;
  }

  const shortcuts = [
    { key: 'F or 1', action: 'Feed character' },
    { key: 'P or 2', action: 'Play with character' },
    { key: 'S or 3', action: 'Put to sleep' },
    { key: 'E or 4', action: 'Exercise' },
    { key: 'T or 5', action: 'Pet character' },
    { key: 'M or 6', action: 'Give medicine' },
    { key: 'R', action: 'Rename character' },
    { key: '?', action: 'Show this help (in console)' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.container, isDarkMode && styles.containerDark]}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.content}>
              <Text style={[styles.title, isDarkMode && styles.textDark]}>
                ⌨️ Keyboard Shortcuts
              </Text>

              <View style={styles.shortcutsList}>
                {shortcuts.map((shortcut, index) => (
                  <View key={index} style={styles.shortcutRow}>
                    <View style={[styles.keyBadge, isDarkMode && styles.keyBadgeDark]}>
                      <Text style={[styles.keyText, isDarkMode && styles.keyTextDark]}>
                        {shortcut.key}
                      </Text>
                    </View>
                    <Text style={[styles.actionText, isDarkMode && styles.textDark]}>
                      {shortcut.action}
                    </Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Got it!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  container: {
    backgroundColor: '#141832',
    borderRadius: moderateScale(16),
    maxWidth: 500,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2A2F5A',
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  containerDark: {
    backgroundColor: '#141832',
  },
  content: {
    padding: moderateScale(24),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#E0E4FF',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  textDark: {
    color: '#E0E4FF',
  },
  shortcutsList: {
    gap: moderateScale(12),
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  keyBadge: {
    backgroundColor: '#1E2248',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
    minWidth: moderateScale(80),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2F5A',
  },
  keyBadgeDark: {
    backgroundColor: '#1E2248',
    borderColor: '#2A2F5A',
  },
  keyText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#E0E4FF',
    fontFamily: 'monospace',
  },
  keyTextDark: {
    color: '#E0E4FF',
  },
  actionText: {
    fontSize: moderateScale(16),
    color: '#8B8FC7',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(24),
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});
