/**
 * Platform-agnostic storage adapter
 * Uses AsyncStorage on React Native and localStorage on web
 */

import { Platform } from 'react-native';

// Dynamic import for AsyncStorage (only on native platforms)
let AsyncStorage: any;
if (Platform.OS !== 'web') {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

/**
 * Storage interface that works on both web and native platforms
 */
export const PlatformStorage = {
  /**
   * Get an item from storage
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return AsyncStorage.getItem(key);
  },

  /**
   * Set an item in storage
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    return AsyncStorage.setItem(key, value);
  },

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    return AsyncStorage.removeItem(key);
  },

  /**
   * Clear all items from storage
   */
  async clear(): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.clear();
      return;
    }
    return AsyncStorage.clear();
  },
};
