export interface ThemePreset {
  name: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    border: string;
    muted: string;
    card: string;
  };
  gradient?: string;
}