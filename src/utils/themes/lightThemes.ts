import { ThemePreset } from '@/types/theme';

export const lightThemes: ThemePreset[] = [
  {
    name: "Classic Light",
    description: "Clean and minimal light theme",
    colors: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      primary: "262.1 83.3% 57.8%",
      secondary: "210 40% 96.1%",
      border: "214.3 31.8% 91.4%",
      muted: "210 40% 96.1%",
      card: "0 0% 100%"
    }
  },
  {
    name: "Soft Peach",
    description: "Warm and inviting light theme",
    colors: {
      background: "30 20% 98%",
      foreground: "30 80% 15%",
      primary: "25 80% 50%",
      secondary: "35 60% 85%",
      border: "30 30% 80%",
      muted: "30 20% 85%",
      card: "30 20% 97%"
    }
  },
  {
    name: "Arctic Frost",
    description: "Cool blue-white theme",
    colors: {
      background: "200 30% 98%",
      foreground: "200 80% 10%",
      primary: "200 80% 45%",
      secondary: "200 40% 92%",
      border: "200 30% 87%",
      muted: "200 20% 92%",
      card: "200 30% 99%"
    }
  }
];