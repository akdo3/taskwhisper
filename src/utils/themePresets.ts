export interface ThemePreset {
  name: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent?: string;
    border: string;
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
      border: "214.3 31.8% 91.4%",
      muted: "210 40% 96.1%",
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
      border: "270 50% 15%",
      muted: "270 50% 25%",
      card: "270 50% 13%"
    }
  },
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
  {
    name: "Forest Dream",
    description: "Natural green tones",
    colors: {
      background: "120 20% 98%",
      foreground: "120 50% 10%",
      primary: "120 80% 40%",
      secondary: "120 30% 90%",
      border: "120 30% 85%",
      muted: "120 20% 90%",
      card: "120 20% 99%"
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
    name: "Desert Sand",
    description: "Warm earthy tones",
    colors: {
      background: "35 30% 95%",
      foreground: "35 80% 20%",
      primary: "35 80% 50%",
      secondary: "35 40% 90%",
      border: "35 30% 85%",
      muted: "35 20% 90%",
      card: "35 30% 97%"
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
  },
  {
    name: "Cyber Punk",
    description: "High contrast neon theme",
    colors: {
      background: "280 80% 5%",
      foreground: "0 0% 100%",
      primary: "320 100% 55%",
      secondary: "180 100% 50%",
      border: "300 100% 40%",
      muted: "280 50% 20%",
      card: "280 80% 7%"
    },
    gradient: "linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)"
  },
  {
    name: "Autumn Leaves",
    description: "Warm fall colors",
    colors: {
      background: "30 20% 95%",
      foreground: "30 80% 15%",
      primary: "25 80% 50%",
      secondary: "35 60% 85%",
      border: "30 30% 80%",
      muted: "30 20% 85%",
      card: "30 20% 97%"
    }
  }
];

export const applyTheme = (theme: ThemePreset) => {
  const root = document.documentElement;
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  if (theme.gradient) {
    root.style.setProperty('--theme-gradient', theme.gradient);
  } else {
    root.style.setProperty('--theme-gradient', 'none');
  }

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

export const createThemeFromColor = (hex: string): ThemePreset => {
  const hslPrimary = convertHexToHSL(hex);
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

export const convertHexToHSL = (hex: string): string => {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

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

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};