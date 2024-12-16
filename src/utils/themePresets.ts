export interface ThemePreset {
  name: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent?: string;
    border: string;  // Added this property
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
      secondary: "210 40% 96.1%",
      border: "214.3 31.8% 91.4%"  // Added border color
    }
  },
  {
    name: "Midnight Purple",
    description: "Deep purple dark theme",
    colors: {
      background: "270 50% 11%",
      foreground: "0 0% 100%",
      primary: "267 75% 65%",
      secondary: "270 50% 20%",
      border: "270 50% 15%"  // Added border color
    }
  },
  {
    name: "Ocean Breeze",
    description: "Calming blue tones",
    colors: {
      background: "200 20% 98%",
      foreground: "200 50% 10%",
      primary: "200 80% 50%",
      secondary: "200 30% 90%",
      border: "200 30% 85%"  // Added border color
    }
  },
  {
    name: "Sunset Gradient",
    description: "Warm sunset colors",
    colors: {
      background: "0 0% 100%",
      foreground: "20 50% 10%",
      primary: "20 90% 60%",
      secondary: "40 90% 70%",
      border: "30 90% 65%"  // Added border color
    },
    gradient: "linear-gradient(135deg, hsl(20, 90%, 60%) 0%, hsl(40, 90%, 70%) 100%)"
  },
  {
    name: "Minimalist",
    description: "Simple and clean theme",
    colors: {
      background: "0 0% 100%",
      foreground: "0 0% 0%",
      primary: "0 0% 50%",
      secondary: "0 0% 80%",
      border: "0 0% 90%"
    }
  },
  {
    name: "Vibrant",
    description: "Bright and colorful theme",
    colors: {
      background: "0 0% 100%",
      foreground: "0 0% 0%",
      primary: "120 100% 50%",
      secondary: "240 100% 50%",
      border: "60 100% 50%"
    }
  }
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
