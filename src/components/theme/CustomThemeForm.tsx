import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { ThemePreview } from './ThemePreview';

interface CustomThemeFormProps {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
  onColorChange: (key: string, value: string) => void;
  onApplyTheme: () => void;
}

export const CustomThemeForm = ({ colors, onColorChange, onApplyTheme }: CustomThemeFormProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div>
          <Label>Background</Label>
          <Input
            type="text"
            value={colors.background}
            onChange={(e) => onColorChange('background', e.target.value)}
            placeholder="H S L values"
          />
        </div>
        <div>
          <Label>Foreground</Label>
          <Input
            type="text"
            value={colors.foreground}
            onChange={(e) => onColorChange('foreground', e.target.value)}
            placeholder="H S L values"
          />
        </div>
        <div>
          <Label>Primary</Label>
          <Input
            type="text"
            value={colors.primary}
            onChange={(e) => onColorChange('primary', e.target.value)}
            placeholder="H S L values"
          />
        </div>
        <div>
          <Label>Secondary</Label>
          <Input
            type="text"
            value={colors.secondary}
            onChange={(e) => onColorChange('secondary', e.target.value)}
            placeholder="H S L values"
          />
        </div>
        <Button onClick={onApplyTheme} className="w-full">
          <Palette className="h-4 w-4 mr-2" />
          Apply Theme
        </Button>
      </div>
      <div>
        <Label>Preview</Label>
        <div className="mt-2 border rounded-lg overflow-hidden">
          <ThemePreview colors={colors} />
        </div>
      </div>
    </div>
  );
};