/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ScrollView,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';

// Base dimensions for responsive design (iPhone 12/13/14 dimensions)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// Responsive utility functions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [dimensions, setDimensions] = useState({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent dimensions={dimensions} isDarkMode={isDarkMode} />
    </SafeAreaProvider>
  );
}

function AppContent({
  dimensions,
  isDarkMode,
}: {
  dimensions: { width: number; height: number };
  isDarkMode: boolean;
}) {
  const safeAreaInsets = useSafeAreaInsets();
  const isTablet = dimensions.width >= 768;
  const isLandscape = dimensions.width > dimensions.height;

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode && styles.darkContainer,
      ]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isTablet && styles.tabletScrollContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
            isLandscape && styles.landscapeContent,
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                isDarkMode && styles.darkTitle,
                isTablet && styles.tabletTitle,
              ]}
            >
              Game App
            </Text>
            <Text
              style={[
                styles.subtitle,
                isDarkMode && styles.darkSubtitle,
                isTablet && styles.tabletSubtitle,
              ]}
            >
              Responsive Design
            </Text>
          </View>

          <View
            style={[
              styles.infoContainer,
              isTablet && styles.tabletInfoContainer,
            ]}
          >
            <InfoCard
              title="Screen Width"
              value={`${Math.round(dimensions.width)}px`}
              isDarkMode={isDarkMode}
              isTablet={isTablet}
            />
            <InfoCard
              title="Screen Height"
              value={`${Math.round(dimensions.height)}px`}
              isDarkMode={isDarkMode}
              isTablet={isTablet}
            />
            <InfoCard
              title="Device Type"
              value={isTablet ? 'Tablet' : 'Phone'}
              isDarkMode={isDarkMode}
              isTablet={isTablet}
            />
            <InfoCard
              title="Orientation"
              value={isLandscape ? 'Landscape' : 'Portrait'}
              isDarkMode={isDarkMode}
              isTablet={isTablet}
            />
          </View>

          <View
            style={[
              styles.buttonContainer,
              isTablet && styles.tabletButtonContainer,
            ]}
          >
            <View
              style={[
                styles.button,
                isDarkMode && styles.darkButton,
                isTablet && styles.tabletButton,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isDarkMode && styles.darkButtonText,
                  isTablet && styles.tabletButtonText,
                ]}
              >
                Start Game
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({
  title,
  value,
  isDarkMode,
  isTablet,
}: {
  title: string;
  value: string;
  isDarkMode: boolean;
  isTablet: boolean;
}) {
  return (
    <View
      style={[
        styles.card,
        isDarkMode && styles.darkCard,
        isTablet && styles.tabletCard,
      ]}
    >
      <Text
        style={[
          styles.cardTitle,
          isDarkMode && styles.darkCardTitle,
          isTablet && styles.tabletCardTitle,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.cardValue,
          isDarkMode && styles.darkCardValue,
          isTablet && styles.tabletCardValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
  },
  tabletScrollContent: {
    paddingHorizontal: scale(40),
    paddingVertical: verticalScale(40),
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  tabletContent: {
    maxWidth: 900,
  },
  landscapeContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: verticalScale(32),
    alignItems: 'center',
  },
  title: {
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
  subtitle: {
    fontSize: moderateScale(18),
    color: '#666666',
    textAlign: 'center',
  },
  darkSubtitle: {
    color: '#CCCCCC',
  },
  tabletSubtitle: {
    fontSize: moderateScale(24),
  },
  infoContainer: {
    marginBottom: verticalScale(32),
    gap: verticalScale(16),
  },
  tabletInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(20),
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(12),
    padding: scale(20),
    minWidth: scale(150),
    flex: 1,
  },
  darkCard: {
    backgroundColor: '#1A1A1A',
  },
  tabletCard: {
    flex: 0,
    minWidth: scale(200),
    maxWidth: '48%',
  },
  cardTitle: {
    fontSize: moderateScale(14),
    color: '#666666',
    marginBottom: verticalScale(8),
    fontWeight: '600',
  },
  darkCardTitle: {
    color: '#AAAAAA',
  },
  tabletCardTitle: {
    fontSize: moderateScale(16),
  },
  cardValue: {
    fontSize: moderateScale(24),
    color: '#000000',
    fontWeight: 'bold',
  },
  darkCardValue: {
    color: '#FFFFFF',
  },
  tabletCardValue: {
    fontSize: moderateScale(32),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  tabletButtonContainer: {
    marginTop: verticalScale(20),
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
    minWidth: scale(200),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkButton: {
    backgroundColor: '#0A84FF',
  },
  tabletButton: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(48),
    minWidth: scale(300),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  darkButtonText: {
    color: '#FFFFFF',
  },
  tabletButtonText: {
    fontSize: moderateScale(22),
  },
});

export default App;
