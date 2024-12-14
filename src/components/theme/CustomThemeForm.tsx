import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette, EyeOff, Eye } from 'lucide-react';
import { ThemePreview } from './ThemePreview';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [showPreview, setShowPreview] = useState(true);

  const colorFields = [
    {
      key: 'background',
      label: 'Background Color',
      description: 'The main background color of your application'
    },
    {
      key: 'foreground',
      label: 'Foreground Color',
      description: 'The main text color that contrasts with the background'
    },
    {
      key: 'primary',
      label: 'Primary Color',
      description: 'Used for primary buttons and important UI elements'
    },
    {
      key: 'secondary',
      label: 'Secondary Color',
      description: 'Used for secondary buttons and less prominent elements'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="space-y-4">
            {colorFields.map((field) => (
              <TooltipProvider key={field.key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Label className="text-sm">{field.label} (HSL)</Label>
                      <Input
                        type="text"
                        value={colors[field.key as keyof typeof colors]}
                        onChange={(e) => onColorChange(field.key, e.target.value)}
                        placeholder="Example: 0 0% 100%"
                        className="mt-1.5"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>{field.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: Hue Saturation% Lightness%
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </Card>
        <Button onClick={onApplyTheme} className="w-full">
          <Palette className="h-4 w-4 mr-2" />
          Apply Custom Theme
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm">Live Preview</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="h-8"
          >
            {showPreview ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
        {showPreview && (
          <Card className="overflow-hidden transition-all">
            <ThemePreview colors={colors} />
          </Card>
        )}
      </div>
    </div>
  );
};