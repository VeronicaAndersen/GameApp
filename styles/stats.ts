import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../utils/responsive';

export const statsStyles = StyleSheet.create({
  levelContainer: {
    marginBottom: verticalScale(4),
  },
  levelText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#E0E4FF',
    marginBottom: verticalScale(4),
    textAlign: 'center',
  },
  wideLevelText: {
    fontSize: moderateScale(32),
  },
  xpBarContainer: {
    height: verticalScale(14),
    backgroundColor: '#1E2248',
    borderRadius: moderateScale(7),
    overflow: 'hidden',
    marginBottom: verticalScale(4),
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
    gap: verticalScale(6),
  },
  statItem: {
    flex: 1,
    marginBottom: verticalScale(2),
  },
  statLabel: {
    fontSize: moderateScale(12),
    color: '#8B8FC7',
    marginBottom: verticalScale(2),
    fontWeight: '600',
  },
  statBarContainer: {
    height: verticalScale(10),
    backgroundColor: '#1E2248',
    borderRadius: moderateScale(5),
    overflow: 'hidden',
    marginBottom: verticalScale(1),
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
