/**
 * SVG aspect ratios for character icons
 * These constants ensure consistent character rendering
 */
export const SVG_ASPECT_RATIOS = {
  lizard: 0.735, // 339/461
  cat: 294.0701 / 246.54726,
} as const;

/**
 * SVG size multipliers for different device types
 */
export const SVG_SIZE_MULTIPLIERS = {
  phone: 1.8,
  tablet: 2.0,
  containerBased: 0.9,
} as const;
