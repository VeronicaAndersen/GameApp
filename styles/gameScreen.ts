import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const gameScreenStyles = StyleSheet.create({
  gameScrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  gameContent: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    padding: 64
  },
  phoneGameContent: {
    maxWidth: 600,
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
  backButtonText: {
    fontSize: moderateScale(16),
    color: '#8B8FC7',
    fontWeight: '600',
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
  wideCharacterDisplayEmoji: {
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
  // Wide screen two-column layout
  wideBody: {
    flexDirection: 'row' as const,
    gap: scale(24),
    flex: 1,
  },
  wideLeftColumn: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  wideRightColumn: {
    flex: 2,
    justifyContent: 'center' as const,
  },
  wideGameHeader: {
    marginBottom: verticalScale(8),
  },
  wideCharacterDisplay: {
    marginBottom: verticalScale(8),
  },
  wideStatsContainer: {
    marginBottom: verticalScale(12),
    gap: verticalScale(8),
  },
  wideLevelContainer: {
    marginBottom: verticalScale(6),
  },
  wideStatRow: {
    flexDirection: 'row' as const,
    gap: scale(12),
  },
  wideStatItem: {
    flex: 1,
    marginBottom: 0,
  },
  wideActionRowContainer: {
    gap: scale(8),
  },
});
