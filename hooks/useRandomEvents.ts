import { useEffect, useState, useCallback, useRef } from 'react';
import { GameState } from '../types';
import { MAX_HUNGER, MAX_HAPPINESS, MAX_ENERGY, MAX_HEALTH } from '../constants';

export interface RandomEvent {
  id: string;
  title: string;
  message: string;
  emoji: string;
  effects: {
    hunger?: number;
    happiness?: number;
    energy?: number;
    health?: number;
    experience?: number;
  };
}

const RANDOM_EVENTS: Omit<RandomEvent, 'id'>[] = [
  {
    title: 'Hittade godis!',
    message: 'Din karaktär hittade lite godis på marken!',
    emoji: '🍬',
    effects: { hunger: 10, happiness: 15, experience: 5 },
  },
  {
    title: 'Träffade en vän',
    message: 'Din karaktär träffade en gammal vän och hade det jättekul!',
    emoji: '🎉',
    effects: { happiness: 20, experience: 10 },
  },
  {
    title: 'Sov dåligt',
    message: 'Din karaktär sov dåligt inatt och känner sig trött.',
    emoji: '😴',
    effects: { energy: -15, happiness: -5 },
  },
  {
    title: 'Magont',
    message: 'Din karaktär har lite magont efter att ha ätit för mycket.',
    emoji: '🤢',
    effects: { health: -10, hunger: -10, happiness: -10 },
  },
  {
    title: 'Perfekt väder!',
    message: 'Det är perfekt väder ute! Din karaktär känner sig fantastisk!',
    emoji: '☀️',
    effects: { happiness: 15, energy: 10, experience: 5 },
  },
  {
    title: 'Hittade energidryck',
    message: 'Din karaktär hittade en energidryck!',
    emoji: '⚡',
    effects: { energy: 20, experience: 5 },
  },
  {
    title: 'Skrapade sig',
    message: 'Din karaktär skrapade sig lite när den lekte.',
    emoji: '🩹',
    effects: { health: -5, happiness: -5 },
  },
  {
    title: 'Fick presenter!',
    message: 'Din karaktär fick en överraskning-present!',
    emoji: '🎁',
    effects: { happiness: 25, experience: 15 },
  },
  {
    title: 'Tränade lite extra',
    message: 'Din karaktär kände sig motiverad och tränade lite extra!',
    emoji: '💪',
    effects: { health: 10, energy: -10, experience: 15 },
  },
  {
    title: 'Regn och rusk',
    message: 'Det regnar och din karaktär känner sig lite nere.',
    emoji: '🌧️',
    effects: { happiness: -10, energy: -5 },
  },
];

export interface UseRandomEventsReturn {
  currentEvent: RandomEvent | null;
  dismissEvent: () => void;
}

/**
 * Custom hook for managing random events
 * Events occur randomly every 3-7 minutes when character is active
 */
export function useRandomEvents(
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>
): UseRandomEventsReturn {
  const [currentEvent, setCurrentEvent] = useState<RandomEvent | null>(null);
  const characterRef = useRef(gameState.character);

  const dismissEvent = useCallback((): void => {
    setCurrentEvent(null);
  }, []);

  // Memoize the event trigger function
  const triggerRandomEvent = useCallback((): void => {
    // Only trigger if no event is currently showing
    setCurrentEvent(prevEvent => {
      if (prevEvent) return prevEvent;

      const randomIndex = Math.floor(Math.random() * RANDOM_EVENTS.length);
      const eventTemplate = RANDOM_EVENTS[randomIndex];

      const event: RandomEvent = {
        ...eventTemplate,
        id: `event-${Date.now()}`,
      };

      // Apply event effects using functional update
      setGameState((prev) => ({
        ...prev,
        hunger: Math.max(0, Math.min(MAX_HUNGER, prev.hunger + (event.effects.hunger || 0))),
        happiness: Math.max(0, Math.min(MAX_HAPPINESS, prev.happiness + (event.effects.happiness || 0))),
        energy: Math.max(0, Math.min(MAX_ENERGY, prev.energy + (event.effects.energy || 0))),
        health: Math.max(0, Math.min(MAX_HEALTH, prev.health + (event.effects.health || 0))),
        experience: prev.experience + (event.effects.experience || 0),
      }));

      return event;
    });
  }, [setGameState]);

  useEffect(() => {
    if (!gameState.character) return;

    // Reset if character changed
    if (characterRef.current !== gameState.character) {
      characterRef.current = gameState.character;
      setCurrentEvent(null);
    }

    // Don't schedule new event if one is showing
    if (currentEvent) return;

    // Random interval between 3-7 minutes (180000-420000ms)
    const randomDelay = Math.floor(Math.random() * (420000 - 180000 + 1)) + 180000;

    const timeout = setTimeout(() => {
      triggerRandomEvent();
    }, randomDelay);

    return () => clearTimeout(timeout);
  }, [gameState.character, currentEvent, triggerRandomEvent]);

  return {
    currentEvent,
    dismissEvent,
  };
}
