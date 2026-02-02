import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utils/responsive';

export const characterSelectionStyles = StyleSheet.create({
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
    color: '#E0E4FF',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  wideTitle: {
    fontSize: moderateScale(48),
  },
  selectionSubtitle: {
    fontSize: moderateScale(18),
    color: '#8B8FC7',
    textAlign: 'center',
    marginBottom: verticalScale(32),
  },
  wideSubtitle: {
    fontSize: moderateScale(24),
  },
  selectionContentFullscreen: {
    flex: 1,
    width: '100%',
    alignSelf: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  characterList: {
    gap: verticalScale(20),
  },
  characterListRow: {
    flexDirection: 'row' as const,
    gap: scale(24),
    justifyContent: 'center' as const,
  },
  characterCard: {
    backgroundColor: '#141832',
    borderRadius: moderateScale(16),
    padding: scale(24),
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: '#2A2F5A',
  },
  characterCardWide: {
    flex: 1,
    maxWidth: 400,
  },
  wideCharacterCard: {
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
  wideCharacterEmojiContainer: {
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
  characterName: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: '#E0E4FF',
    textAlign: 'center',
  },
  wideCharacterName: {
    fontSize: moderateScale(28),
  },
});
