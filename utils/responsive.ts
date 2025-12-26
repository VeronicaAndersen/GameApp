import { Dimensions } from 'react-native';
import { BASE_WIDTH, BASE_HEIGHT } from '../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

export const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;
