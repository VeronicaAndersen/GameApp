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
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(16),
    maxWidth: 500,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  containerDark: {
    backgroundColor: '#1E1E1E',
  },
  content: {
    padding: moderateScale(24),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  textDark: {
    color: '#F9FAFB',
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
    backgroundColor: '#F3F4F6',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
    minWidth: moderateScale(80),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  keyBadgeDark: {
    backgroundColor: '#374151',
    borderColor: '#4B5563',
  },
  keyText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'monospace',
  },
  keyTextDark: {
    color: '#F9FAFB',
  },
  actionText: {
    fontSize: moderateScale(16),
    color: '#4B5563',
    flex: 1,
  },
  closeButton: {
    backgroundColor: '#667eea',
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
