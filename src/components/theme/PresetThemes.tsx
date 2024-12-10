import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemePreview } from './ThemePreview';

interface PresetTheme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
}

interface PresetThemesProps {
  presets: PresetTheme[];
  onApplyTheme: (colors: PresetTheme['colors']) => void;
}

export const PresetThemes = ({ presets, onApplyTheme }: PresetThemesProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {presets.map((theme) => (
        <Card key={theme.name} className="overflow-hidden">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{theme.name}</h3>
            <ThemePreview colors={theme.colors} />
            <Button 
              onClick={() => onApplyTheme(theme.colors)} 
              className="w-full mt-4"
            >
              Apply Theme
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};