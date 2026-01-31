import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const gameScreenStyles = StyleSheet.create({
  gameScrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  tabletScrollContent: {
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(40),
  },
  gameContent: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  gameHeader: {
    marginBottom: verticalScale(24),
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    color: '#E0E4FF',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  backButton: {
    marginTop: verticalScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    backgroundColor: '#141832',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#2A2F5A',
    minHeight: 44,
    minWidth: scale(160),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  tabletBackButton: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    minWidth: scale(200),
  },
  backButtonText: {
    fontSize: moderateScale(16),
    color: '#8B8FC7',
    fontWeight: '600',
  },
  tabletBackButtonText: {
    fontSize: moderateScale(18),
  },
  characterDisplay: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  characterDisplayContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  characterDisplayEmoji: {
    width: scale(120),
    height: scale(120),
    borderRadius: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  tabletCharacterDisplayEmoji: {
    width: scale(200),
    height: scale(200),
    borderRadius: scale(100),
  },
  lizardDisplayContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
    width: 'auto',
    height: 'auto',
    minWidth: scale(120),
    minHeight: scale(90),
  },
  levelUpBadge: {
    position: 'absolute',
    top: -verticalScale(40),
    backgroundColor: '#FFD700',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(20),
  },
  levelUpText: {
    color: '#0B0D1A',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
});
