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
    name: "Neon Nights",
    description: "Vibrant neon colors",
    colors: {
      background: "260 20% 10%",
      foreground: "0 0% 100%",
      primary: "320 100% 60%",
      secondary: "280 100% 60%",
      border: "300 100% 50%",
      muted: "270 50% 25%",
      card: "260 20% 12%"
    }
  },
  {
    name: "Deep Ocean",
    description: "Dark blue oceanic theme",
    colors: {
      background: "220 40% 13%",
      foreground: "0 0% 100%",
      primary: "199 95% 74%",
      secondary: "200 50% 20%",
      border: "200 50% 15%",
      muted: "200 40% 25%",
      card: "220 40% 15%"
    }
  }
];