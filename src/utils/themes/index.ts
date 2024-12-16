import { lightThemes } from './lightThemes';
import { darkThemes } from './darkThemes';
import { gradientThemes } from './gradientThemes';
import { ThemePreset } from '@/types/theme';

// Combine all themes
export const themePresets: ThemePreset[] = [
  ...lightThemes,
  ...darkThemes,
  ...gradientThemes
];

export * from './themeUtils';