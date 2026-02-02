import { Animated } from 'react-native';

/**
 * Stops multiple animated values
 */
export function stopAnimatedValues(...values: Animated.Value[]): void {
  values.forEach(value => value.stopAnimation());
}

/**
 * Resets multiple animated values
 */
export function resetAnimatedValues(resetTo = 0, ...values: Animated.Value[]): void {
  values.forEach(value => {
    value.stopAnimation();
    value.setValue(resetTo);
  });
}
