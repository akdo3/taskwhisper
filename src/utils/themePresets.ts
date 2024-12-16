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
    muted: string;
    card: string;
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
      border: "214.3 31.8% 91.4%",  // Added border color
      muted: "240 10% 95%",
      card: "0 0% 100%"
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
      border: "270 50% 15%",  // Added border color
      muted: "240 10% 30%",
      card: "0 0% 20%"
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
      border: "200 30% 85%",  // Added border color
      muted: "200 20% 90%",
      card: "0 0% 100%"
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
      border: "30 90% 65%",  // Added border color
      muted: "20 50% 80%",
      card: "0 0% 100%"
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
      border: "0 0% 90%",
      muted: "0 0% 70%",
      card: "0 0% 100%"
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
      border: "60 100% 50%",
      muted: "0 0% 80%",
      card: "0 0% 100%"
    }
  }
];

// Helper function to apply a theme
export const applyTheme = (theme: ThemePreset) => {
  const root = document.documentElement;
  
  // Apply main colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Apply gradient if present
  if (theme.gradient) {
    root.style.setProperty('--theme-gradient', theme.gradient);
  } else {
    root.style.setProperty('--theme-gradient', 'none');
  }

  // Apply derived colors based on main colors
  root.style.setProperty('--card-foreground', theme.colors.foreground);
  root.style.setProperty('--popover', theme.colors.background);
  root.style.setProperty('--popover-foreground', theme.colors.foreground);
  root.style.setProperty('--primary-foreground', '0 0% 100%');
  root.style.setProperty('--secondary-foreground', theme.colors.foreground);
  root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
  root.style.setProperty('--accent-foreground', theme.colors.foreground);
  root.style.setProperty('--destructive', '0 84.2% 60.2%');
  root.style.setProperty('--destructive-foreground', '210 40% 98%');
  root.style.setProperty('--input', theme.colors.border);
  root.style.setProperty('--ring', theme.colors.primary);
};

export const convertHexToHSL = (hex: string): string => {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find max and min values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    
    h /= 6;
  }

  // Convert to degrees and percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};

export const createThemeFromColor = (primaryColor: string): ThemePreset => {
  const hslPrimary = convertHexToHSL(primaryColor);
  const [h, s, l] = hslPrimary.split(' ').map(val => parseInt(val));
  
  return {
    name: "Custom Theme",
    description: "Generated from primary color",
    colors: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      primary: `${h} ${s}% ${l}%`,
      secondary: `${h} ${Math.max(s - 30, 0)}% ${Math.min(l + 30, 100)}%`,
      accent: `${h} ${Math.max(s - 20, 0)}% ${Math.min(l + 20, 100)}%`,
      muted: "240 4.8% 95.9%",
      border: "240 5.9% 90%",
      card: "0 0% 100%"
    }
  };
};
