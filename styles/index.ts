import { sharedStyles } from './shared';
import { characterSelectionStyles } from './characterSelection';
import { gameScreenStyles } from './gameScreen';
import { statsStyles } from './stats';
import { actionStyles } from './actions';

// Merged styles object for backward compatibility
export const styles = {
  ...sharedStyles,
  ...characterSelectionStyles,
  ...gameScreenStyles,
  ...statsStyles,
  ...actionStyles,
} as const;
