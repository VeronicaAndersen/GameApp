import { useEffect } from 'react';
import { Platform } from 'react-native';

export interface KeyboardShortcutHandlers {
  onEat?: () => void;
  onPlay?: () => void;
  onSleep?: () => void;
  onExercise?: () => void;
  onPet?: () => void;
  onMedicine?: () => void;
  onRename?: () => void;
  onClean?: () => void;
}

/**
 * Custom hook for keyboard shortcuts on web/desktop
 * Only active on web platform with keyboard
 */
export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers): void {
  useEffect(() => {
    // Only enable keyboard shortcuts on web
    if (Platform.OS !== 'web') return;

    const handleKeyPress = (event: KeyboardEvent): void => {
      // Don't trigger shortcuts when typing in an input
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // Keyboard shortcuts (case-insensitive)
      const key = event.key.toLowerCase();

      switch (key) {
        case 'f':
        case '1':
          event.preventDefault();
          handlers.onEat?.();
          break;
        case 'p':
        case '2':
          event.preventDefault();
          handlers.onPlay?.();
          break;
        case 's':
        case '3':
          event.preventDefault();
          handlers.onSleep?.();
          break;
        case 'e':
        case '4':
          event.preventDefault();
          handlers.onExercise?.();
          break;
        case 't':
        case '5':
          event.preventDefault();
          handlers.onPet?.();
          break;
        case 'm':
        case '6':
          event.preventDefault();
          handlers.onMedicine?.();
          break;
        case 'r':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            handlers.onRename?.();
          }
          break;
        case 'c':
        case '7':
          event.preventDefault();
          handlers.onClean?.();
          break;
        case '?':
          // Show keyboard shortcuts help (future enhancement)
          event.preventDefault();
          console.log(`
Keyboard Shortcuts:
  F or 1 - Feed
  P or 2 - Play
  S or 3 - Sleep
  E or 4 - Exercise
  T or 5 - Pet
  M or 6 - Medicine
  C or 7 - Clean
  R - Rename
          `);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handlers]);
}
