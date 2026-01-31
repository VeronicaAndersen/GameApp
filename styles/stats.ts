import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../utils/responsive';

export const statsStyles = StyleSheet.create({
  statsContainer: {
    marginBottom: verticalScale(20),
    gap: verticalScale(16),
  },
  levelContainer: {
    marginBottom: verticalScale(12),
  },
  levelText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#E0E4FF',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  tabletLevelText: {
    fontSize: moderateScale(32),
  },
  xpBarContainer: {
    height: verticalScale(20),
    backgroundColor: '#1E2248',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(8),
  },
  xpBar: {
    height: '100%',
    borderRadius: moderateScale(10),
  },
  xpText: {
    fontSize: moderateScale(14),
    color: '#8B8FC7',
    textAlign: 'center',
  },
  statRow: {
    gap: verticalScale(12),
  },
  statItem: {
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: '#8B8FC7',
    marginBottom: verticalScale(4),
    fontWeight: '600',
  },
  statBarContainer: {
    height: verticalScale(12),
    backgroundColor: '#1E2248',
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    marginBottom: verticalScale(2),
  },
  statBar: {
    height: '100%',
    borderRadius: moderateScale(6),
  },
  statValue: {
    fontSize: moderateScale(12),
    color: '#8B8FC7',
    textAlign: 'right',
  },
});
