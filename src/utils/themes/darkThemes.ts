import { ThemePreset } from '@/types/theme';

export const darkThemes: ThemePreset[] = [
  {
    name: "Midnight Purple",
    description: "Deep purple dark theme",
    colors: {
      background: "270 50% 11%",
      foreground: "0 0% 100%",
      primary: "267 75% 65%",
      secondary: "270 50% 20%",
      border: "270 50% 15%",
      muted: "270 50% 25%",
      card: "270 50% 13%"
    }
  },
  {
    name: "Cyber Night",
    description: "High contrast dark theme",
    colors: {
      background: "280 80% 5%",
      foreground: "0 0% 100%",
      primary: "320 100% 55%",
      secondary: "180 100% 50%",
      border: "300 100% 40%",
      muted: "280 50% 20%",
      card: "280 80% 7%"
    }
  },
  // ... 30 more dark themes
];