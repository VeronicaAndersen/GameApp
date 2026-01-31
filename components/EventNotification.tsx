import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { RandomEvent } from '../hooks/useRandomEvents';
import { moderateScale, scale } from '../utils/responsive';

export interface EventNotificationProps {
  event: RandomEvent | null;
  onDismiss: () => void;
  isDarkMode: boolean;
  isTablet: boolean;
}

export const EventNotification = React.memo<EventNotificationProps>(function EventNotification({
  event,
  onDismiss,
  isDarkMode,
  isTablet,
}: EventNotificationProps): React.JSX.Element {
  // Memoize effect entries to prevent recalculation
  const effectEntries = useMemo(() => {
    if (!event) return [];
    return Object.entries(event.effects).filter(([_, value]) => value !== 0);
  }, [event]);

  const statNames = {
    hunger: 'Hunger',
    happiness: 'Glädje',
    energy: 'Energi',
    health: 'Hälsa',
    experience: 'XP',
  } as const;

  if (!event) return <></>;

  return (
    <Modal
      visible={!!event}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.eventCard,
            isDarkMode && styles.darkEventCard,
            isTablet && styles.tabletEventCard,
          ]}
        >
          <Text style={styles.eventEmoji}>{event.emoji}</Text>
          <Text
            style={[
              styles.eventTitle,
              isDarkMode && styles.darkEventTitle,
              isTablet && styles.tabletEventTitle,
            ]}
          >
            {event.title}
          </Text>
          <Text
            style={[
              styles.eventMessage,
              isDarkMode && styles.darkEventMessage,
              isTablet && styles.tabletEventMessage,
            ]}
          >
            {event.message}
          </Text>

          {/* Effects display */}
          <View style={styles.effectsContainer}>
            {effectEntries.map(([key, value]) => {
              const isPositive = value > 0;
              const statName = statNames[key as keyof typeof statNames];

              return (
                <Text
                  key={key}
                  style={[
                    styles.effectText,
                    isPositive ? styles.positiveEffect : styles.negativeEffect,
                    isDarkMode && styles.darkEffectText,
                    isTablet && styles.tabletEffectText,
                  ]}
                >
                  {isPositive ? '+' : ''}{value} {statName}
                </Text>
              );
            })}
          </View>

          <TouchableOpacity
            style={[
              styles.dismissButton,
              isTablet && styles.tabletDismissButton,
            ]}
            onPress={onDismiss}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Dismiss event notification"
          >
            <Text
              style={[
                styles.dismissButtonText,
                isTablet && styles.tabletDismissButtonText,
              ]}
            >
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  eventCard: {
    backgroundColor: '#141832',
    borderRadius: moderateScale(20),
    padding: scale(24),
    width: '90%',
    maxWidth: scale(400),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2F5A',
    shadowColor: '#7B68EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkEventCard: {
    backgroundColor: '#141832',
  },
  tabletEventCard: {
    padding: scale(32),
    borderRadius: moderateScale(24),
  },
  eventEmoji: {
    fontSize: moderateScale(60),
    marginBottom: scale(12),
  },
  eventTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: '#E0E4FF',
    marginBottom: scale(8),
    textAlign: 'center',
  },
  darkEventTitle: {
    color: '#E0E4FF',
  },
  tabletEventTitle: {
    fontSize: moderateScale(28),
  },
  eventMessage: {
    fontSize: moderateScale(16),
    color: '#8B8FC7',
    marginBottom: scale(16),
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  darkEventMessage: {
    color: '#8B8FC7',
  },
  tabletEventMessage: {
    fontSize: moderateScale(18),
    lineHeight: moderateScale(26),
  },
  effectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: scale(20),
    gap: scale(8),
  },
  effectText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    borderRadius: moderateScale(12),
  },
  darkEffectText: {
    opacity: 0.9,
  },
  tabletEffectText: {
    fontSize: moderateScale(16),
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
  },
  positiveEffect: {
    color: '#69F0AE',
    backgroundColor: 'rgba(105, 240, 174, 0.15)',
  },
  negativeEffect: {
    color: '#FF6B6B',
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
  },
  dismissButton: {
    backgroundColor: '#7B68EE',
    paddingVertical: scale(12),
    paddingHorizontal: scale(40),
    borderRadius: moderateScale(12),
    minWidth: scale(120),
  },
  tabletDismissButton: {
    paddingVertical: scale(14),
    paddingHorizontal: scale(50),
  },
  dismissButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
    textAlign: 'center',
  },
  tabletDismissButtonText: {
    fontSize: moderateScale(18),
  },
});
