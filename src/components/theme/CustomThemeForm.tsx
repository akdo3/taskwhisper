import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette, EyeOff, Eye, Wand2 } from 'lucide-react';
import { ThemePreview } from './ThemePreview';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createThemeFromColor } from '@/utils/themePresets';
import { HSLSliders } from './HSLSliders';
import { ImageThemeGenerator } from './ImageThemeGenerator';
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
    border: string;
    muted: string;
    card: string;
  };
  onColorChange: (key: string, value: string) => void;
  onApplyTheme: () => void;
}

export const CustomThemeForm = ({ colors, onColorChange, onApplyTheme }: CustomThemeFormProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [primaryHex, setPrimaryHex] = useState('#000000');

  const handleHexColorChange = (hex: string) => {
    setPrimaryHex(hex);
    const theme = createThemeFromColor(hex);
    Object.entries(theme.colors).forEach(([key, value]) => {
      onColorChange(key, value);
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quick">Quick</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="image">From Image</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Choose Primary Color</Label>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input
                      type="color"
                      value={primaryHex}
                      onChange={(e) => handleHexColorChange(e.target.value)}
                      className="h-[50px] w-full"
                    />
                  </div>
                  <Button
                    onClick={() => handleHexColorChange(`#${Math.floor(Math.random()*16777215).toString(16)}`)}
                    variant="outline"
                    className="flex gap-2"
                  >
                    <Wand2 className="h-4 w-4" />
                    Random
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <HSLSliders colors={colors} onColorChange={onColorChange} />
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <ImageThemeGenerator onApplyTheme={(newColors) => {
            Object.entries(newColors).forEach(([key, value]) => {
              onColorChange(key, value as string);
            });
          }} />
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={onApplyTheme} className="flex-1">
          <Palette className="h-4 w-4 mr-2" />
          Apply Custom Theme
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowPreview(!showPreview)}
          className="h-10 w-10"
        >
          {showPreview ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
      </div>

      {showPreview && (
        <Card className="overflow-hidden transition-all">
          <ThemePreview colors={colors} />
        </Card>
      )}
    </div>
  );
};