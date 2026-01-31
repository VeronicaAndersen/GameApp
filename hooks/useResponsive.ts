import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export interface ResponsiveInfo {
  width: number;
  height: number;
  isPhone: boolean;
  isDesktop: boolean;
  deviceType: 'phone' | 'desktop';
  orientation: 'portrait' | 'landscape';
}

/**
 * Custom hook for responsive design information
 * Automatically updates when window size changes
 */
export function useResponsive(): ResponsiveInfo {
  const getResponsiveInfo = (): ResponsiveInfo => {
    const { width, height } = Dimensions.get('window');

    return {
      width,
      height,
      isPhone: false,
      isDesktop: true,
      deviceType: 'desktop',
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
