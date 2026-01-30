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
    color: '#000000',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
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
    gap: verticalScale(12),
  },
  statItem: {
    marginBottom: verticalScale(4),
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: '#666666',
    marginBottom: verticalScale(4),
    fontWeight: '600',
  },
  statBarContainer: {
    height: verticalScale(12),
    backgroundColor: '#E0E0E0',
    borderRadius: moderateScale(6),
    overflow: 'hidden',
    marginBottom: verticalScale(2),
  },
  darkStatBarContainer: {
    backgroundColor: '#333333',
  },
  statBar: {
    height: '100%',
    borderRadius: moderateScale(6),
  },
  statValue: {
    fontSize: moderateScale(12),
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
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(100),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledActionButton: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  tabletActionButton: {
    paddingVertical: verticalScale(24),
    minWidth: scale(200),
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
  tabletActionButtonText: {
    fontSize: moderateScale(22),
  },
  headerRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
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
  statBarHunger: {
    backgroundColor: '#FF6B6B',
  },
  statBarHappiness: {
    backgroundColor: '#4ECDC4',
  },
  statBarEnergy: {
    backgroundColor: '#FFD93D',
  },
  statBarHealth: {
    backgroundColor: '#6BCF7F',
  },
  actionButtonEat: {
    backgroundColor: '#FF6B6B',
  },
  actionButtonPlay: {
    backgroundColor: '#4ECDC4',
  },
  actionButtonSleep: {
    backgroundColor: '#9370DB',
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
