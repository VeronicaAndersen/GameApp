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
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(60),
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
    fontSize: moderateScale(24),
    marginBottom: verticalScale(2),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  actionRowContainer: {
    gap: scale(8),
  },
  actionRow: {
    flexDirection: 'row' as const,
    gap: scale(8),
  },
  actionRowCenter: {
    flexDirection: 'row' as const,
    gap: scale(8),
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
    flex: undefined,
    width: '31%',
  },
});
