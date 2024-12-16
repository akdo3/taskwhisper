export interface ThemePreset {
  name: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent?: string;
  };
  gradient?: string;
}

export const themePresets: ThemePreset[] = [
  {
    name: "Classic Light",
    description: "Clean and minimal light theme",
    colors: {
      background: "0 0% 100%",
      foreground: "222.2 84% 4.9%",
      primary: "262.1 83.3% 57.8%",
      secondary: "210 40% 96.1%"
    }
  },
  {
    name: "Midnight Purple",
    description: "Deep purple dark theme",
    colors: {
      background: "270 50% 11%",
      foreground: "0 0% 100%",
      primary: "267 75% 65%",
      secondary: "270 50% 20%"
    }
  },
  {
    name: "Ocean Breeze",
    description: "Calming blue tones",
    colors: {
      background: "200 20% 98%",
      foreground: "200 50% 10%",
      primary: "200 80% 50%",
      secondary: "200 30% 90%"
    }
  },
  {
    name: "Sunset Gradient",
    description: "Warm sunset colors",
    colors: {
      background: "0 0% 100%",
      foreground: "20 50% 10%",
      primary: "20 90% 60%",
      secondary: "40 90% 70%"
    },
    gradient: "linear-gradient(135deg, hsl(20, 90%, 60%) 0%, hsl(40, 90%, 70%) 100%)"
  },
  // ... Add more presets here following the same pattern
];

// Helper function to apply a theme
export const applyTheme = (theme: ThemePreset) => {
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  if (theme.gradient) {
    root.style.setProperty('--theme-gradient', theme.gradient);
  }
};