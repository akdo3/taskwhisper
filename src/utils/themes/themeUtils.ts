import { ThemePreset } from '@/types/theme';

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
      border: `${h} ${Math.max(s - 20, 0)}% ${Math.min(l + 20, 100)}%`,
      muted: "240 4.8% 95.9%",
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