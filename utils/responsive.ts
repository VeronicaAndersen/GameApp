import { Dimensions } from 'react-native';
import { BASE_WIDTH, BASE_HEIGHT } from '../constants';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Breakpoints for different device sizes
export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
};

// Device type detection
export const isPhone = () => SCREEN_WIDTH < BREAKPOINTS.tablet;
export const isTablet = () => SCREEN_WIDTH >= BREAKPOINTS.tablet && SCREEN_WIDTH < BREAKPOINTS.desktop;
export const isDesktop = () => SCREEN_WIDTH >= BREAKPOINTS.desktop;

// Get current device type
export const getDeviceType = (): 'phone' | 'tablet' | 'desktop' => {
  if (SCREEN_WIDTH < BREAKPOINTS.tablet) return 'phone';
  if (SCREEN_WIDTH < BREAKPOINTS.desktop) return 'tablet';
  return 'desktop';
};

// Responsive scaling functions with desktop optimization
export const scale = (size: number) => {
  const baseScale = (SCREEN_WIDTH / BASE_WIDTH) * size;
  // Apply 0.7x scaling for desktop to make everything more compact
  if (SCREEN_WIDTH >= BREAKPOINTS.desktop) {
    return baseScale * 0.7;
  }
  return baseScale;
};

export const verticalScale = (size: number) => {
  const baseScale = (SCREEN_HEIGHT / BASE_HEIGHT) * size;
  // Apply 0.7x scaling for desktop
  if (SCREEN_WIDTH >= BREAKPOINTS.desktop) {
    return baseScale * 0.7;
  }
  return baseScale;
};

export const moderateScale = (size: number, factor: number = 0.5) => {
  const scaled = size + (scale(size) - size) * factor;
  // Additional 0.85x reduction for desktop
  if (SCREEN_WIDTH >= BREAKPOINTS.desktop) {
    return scaled * 0.85;
  }
  return scaled;
};

// Responsive size based on device type
export const responsiveSize = (phone: number) => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'phone':
      return moderateScale(phone);
    default:
      return moderateScale(phone);
  }
};
