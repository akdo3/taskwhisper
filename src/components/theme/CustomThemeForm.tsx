import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { ThemePreview } from './ThemePreview';
import { Card } from '@/components/ui/card';

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
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <Label className="text-sm">Background Color (HSL)</Label>
              <Input
                type="text"
                value={colors.background}
                onChange={(e) => onColorChange('background', e.target.value)}
                placeholder="Example: 0 0% 100%"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm">Foreground Color (HSL)</Label>
              <Input
                type="text"
                value={colors.foreground}
                onChange={(e) => onColorChange('foreground', e.target.value)}
                placeholder="Example: 222.2 84% 4.9%"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm">Primary Color (HSL)</Label>
              <Input
                type="text"
                value={colors.primary}
                onChange={(e) => onColorChange('primary', e.target.value)}
                placeholder="Example: 262.1 83.3% 57.8%"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-sm">Secondary Color (HSL)</Label>
              <Input
                type="text"
                value={colors.secondary}
                onChange={(e) => onColorChange('secondary', e.target.value)}
                placeholder="Example: 210 40% 96.1%"
                className="mt-1.5"
              />
            </div>
          </div>
        </Card>
        <Button onClick={onApplyTheme} className="w-full">
          <Palette className="h-4 w-4 mr-2" />
          Apply Custom Theme
        </Button>
      </div>
      <div className="space-y-2">
        <Label className="text-sm">Live Preview</Label>
        <Card className="overflow-hidden">
          <ThemePreview colors={colors} />
        </Card>
      </div>
    </div>
  );
};