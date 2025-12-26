import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { BREAKPOINTS, getDeviceType } from '../utils/responsive';

export interface ResponsiveInfo {
  width: number;
  height: number;
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: 'phone' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
}

/**
 * Custom hook for responsive design information
 * Automatically updates when window size changes
 */
export function useResponsive(): ResponsiveInfo {
  const getResponsiveInfo = (): ResponsiveInfo => {
    const { width, height } = Dimensions.get('window');
    const deviceType = getDeviceType();

    return {
      width,
      height,
      isPhone: width < BREAKPOINTS.tablet,
      isTablet: width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop,
      isDesktop: width >= BREAKPOINTS.desktop,
      deviceType,
      orientation: width > height ? 'landscape' : 'portrait',
    };
  };

  const [responsiveInfo, setResponsiveInfo] = useState<ResponsiveInfo>(getResponsiveInfo());

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setResponsiveInfo(getResponsiveInfo());
    });

    return () => subscription?.remove();
  }, []);

  return responsiveInfo;
}
