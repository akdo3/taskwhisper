import { ThemePreset } from '@/types/theme';

export const gradientThemes: ThemePreset[] = [
  {
    name: "Ocean Breeze",
    description: "Calming blue gradient theme",
    colors: {
      background: "200 20% 98%",
      foreground: "200 50% 10%",
      primary: "200 80% 50%",
      secondary: "200 30% 90%",
      border: "200 30% 85%",
      muted: "200 20% 90%",
      card: "200 20% 99%"
    },
    gradient: "linear-gradient(to right, #243949 0%, #517fa4 100%)"
  },
  {
    name: "Sunset Vibes",
    description: "Warm sunset gradient",
    colors: {
      background: "0 0% 100%",
      foreground: "20 50% 10%",
      primary: "20 90% 60%",
      secondary: "40 90% 70%",
      border: "30 90% 65%",
      muted: "20 50% 80%",
      card: "0 0% 100%"
    },
    gradient: "linear-gradient(90deg, hsla(16, 100%, 76%, 1) 0%, hsla(49, 100%, 81%, 1) 100%)"
  },
  // ... 40 more gradient themes
];