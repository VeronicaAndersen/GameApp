/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CharacterSelectionScreen } from './screens/CharacterSelectionScreen';
import { GameScreen } from './screens/GameScreen';
import { usePersistentGameState } from './hooks/usePersistentGameState';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function App() {
  const [dimensions, setDimensions] = useState({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  });
  const { gameState, setGameState, selectCharacter } = usePersistentGameState();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" />
        {gameState.character === null ? (
          <CharacterSelectionScreen
            dimensions={dimensions}
            onSelectCharacter={selectCharacter}
          />
        ) : (
          <GameScreen
            dimensions={dimensions}
            gameState={gameState}
            setGameState={setGameState}
          />
        )}
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

export default App;
