import { Animated } from 'react-native';

/**
 * Stops an animated value's running animations
 */
export function stopAnimatedValue(value: Animated.Value): void {
  value.stopAnimation();
}

/**
 * Stops and resets an animated value
 */
export function resetAnimatedValue(value: Animated.Value, resetTo = 0): void {
  value.stopAnimation();
  value.setValue(resetTo);
}

/**
 * Stops multiple animated values
 */
export function stopAnimatedValues(...values: Animated.Value[]): void {
  values.forEach(value => stopAnimatedValue(value));
}

/**
 * Resets multiple animated values
 */
export function resetAnimatedValues(resetTo = 0, ...values: Animated.Value[]): void {
  values.forEach(value => resetAnimatedValue(value, resetTo));
}

/**
 * Helper to create an animated value that persists across renders
 * Returns a stable reference using useRef pattern
 */
export function createPersistentAnimatedValue(initialValue = 0): Animated.Value {
  return new Animated.Value(initialValue);
}

/**
 * Type for storing multiple animation values
 */
export interface AnimationValues {
  [key: string]: Animated.Value;
}

/**
 * Stops all animations in an AnimationValues object
 */
export function stopAllAnimations(values: AnimationValues): void {
  Object.values(values).forEach(value => stopAnimatedValue(value));
}

/**
 * Resets all animations in an AnimationValues object
 */
export function resetAllAnimations(values: AnimationValues, resetTo = 0): void {
  Object.values(values).forEach(value => resetAnimatedValue(value, resetTo));
}
