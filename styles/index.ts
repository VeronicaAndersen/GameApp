import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  selectionScrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  selectionContent: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  selectionTitle: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  darkTitle: {
    color: '#FFFFFF',
  },
  tabletTitle: {
    fontSize: moderateScale(48),
  },
  selectionSubtitle: {
    fontSize: moderateScale(18),
    color: '#666666',
    textAlign: 'center',
    marginBottom: verticalScale(32),
  },
  darkSubtitle: {
    color: '#CCCCCC',
  },
  tabletSubtitle: {
    fontSize: moderateScale(24),
  },
  characterList: {
    gap: verticalScale(20),
  },
  characterCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(16),
    padding: scale(24),
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  darkCard: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333333',
  },
  tabletCharacterCard: {
    padding: scale(32),
  },
  characterEmojiContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
    overflow: 'visible',
  },
  tabletCharacterEmojiContainer: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
  },
  lizardEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  catEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  unicornEmojiContainer: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  characterName: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  tabletCharacterName: {
    fontSize: moderateScale(28),
  },
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
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  backButton: {
    marginTop: verticalScale(12),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 44, // Touch-friendly minimum
    minWidth: scale(160),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkBackButton: {
    backgroundColor: '#1A1A1A',
    borderColor: '#333333',
  },
  tabletBackButton: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    minWidth: scale(200),
  },
  backButtonText: {
    fontSize: moderateScale(16),
    color: '#666666',
    fontWeight: '600',
  },
  tabletBackButtonText: {
    fontSize: moderateScale(18),
  },
  characterDisplay: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  characterDisplayContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  characterDisplayEmoji: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
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
    minWidth: scale(150),
    minHeight: scale(110),
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
    color: '#000000',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  statsContainer: {
    marginBottom: verticalScale(32),
    gap: verticalScale(24),
  },
  levelContainer: {
    marginBottom: verticalScale(16),
  },
  levelText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  tabletLevelText: {
    fontSize: moderateScale(32),
  },
  xpBarContainer: {
    height: verticalScale(20),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(10),
    overflow: 'hidden',
    marginBottom: verticalScale(8),
  },
  darkXpBarContainer: {
    backgroundColor: '#333333',
  },
  xpBar: {
    height: '100%',
    borderRadius: moderateScale(10),
  },
  xpText: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'center',
  },
  statRow: {
    gap: verticalScale(16),
  },
  statItem: {
    marginBottom: verticalScale(8),
  },
  statLabel: {
    fontSize: moderateScale(16),
    color: '#666666',
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
  statBarContainer: {
    height: verticalScale(16),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(8),
    overflow: 'hidden',
    marginBottom: verticalScale(4),
  },
  darkStatBarContainer: {
    backgroundColor: '#333333',
  },
  statBar: {
    height: '100%',
    borderRadius: moderateScale(8),
  },
  statValue: {
    fontSize: moderateScale(14),
    color: '#666666',
    textAlign: 'right',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: scale(16),
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  actionButton: {
    flex: 1,
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(140),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabletActionButton: {
    paddingVertical: verticalScale(24),
    minWidth: scale(200),
  },
  actionEmoji: {
    fontSize: moderateScale(40),
    marginBottom: verticalScale(8),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  tabletActionButtonText: {
    fontSize: moderateScale(22),
  },
});
