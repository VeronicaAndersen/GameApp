import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const actionStyles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  actionButton: {
    flex: 1,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(100),
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledActionButton: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  actionEmoji: {
    fontSize: moderateScale(32),
    marginBottom: verticalScale(4),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  actionRowContainer: {
    gap: scale(12),
  },
  actionRow: {
    flexDirection: 'row' as const,
    gap: scale(12),
  },
  actionRowCenter: {
    flexDirection: 'row' as const,
    gap: scale(12),
    justifyContent: 'center' as const,
  },
  actionButtonEat: {
    backgroundColor: '#FF6B6B',
  },
  actionButtonPlay: {
    backgroundColor: '#4FC3F7',
  },
  actionButtonSleep: {
    backgroundColor: '#7B68EE',
  },
  actionButtonExercise: {
    backgroundColor: '#FF8C42',
  },
  actionButtonPet: {
    backgroundColor: '#FF69B4',
  },
  actionButtonMedicine: {
    backgroundColor: '#87CEEB',
  },
  actionButtonClean: {
    backgroundColor: '#8B4513',
  },
});
