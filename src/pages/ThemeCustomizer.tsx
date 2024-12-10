import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { CustomThemeForm } from '@/components/theme/CustomThemeForm';
import { PresetThemes } from '@/components/theme/PresetThemes';

const presetThemes = [
  {
    name: 'Purple Dream',
    colors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      primary: '262.1 83.3% 57.8%',
      secondary: '217.2 32.6% 17.5%'
    }
  },
  {
    name: 'Ocean Breeze',
    colors: {
      background: '200 98% 39%',
      foreground: '0 0% 100%',
      primary: '199 89% 48%',
      secondary: '200 98% 39%'
    }
  },
  {
    name: 'Sunset Glow',
    colors: {
      background: '0 0% 100%',
      foreground: '20 14.3% 4.1%',
      primary: '24.6 95% 53.1%',
      secondary: '60 4.8% 95.9%'
    }
  }
];

export default function ThemeCustomizer() {
  const { setTheme } = useTheme();
  const [customColors, setCustomColors] = useState({
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    primary: '262.1 83.3% 57.8%',
    secondary: '210 40% 96.1%'
  });

  const handleColorChange = (key: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyTheme = (colors: typeof customColors) => {
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    setTheme('custom');
    toast.success('Theme applied successfully');
  };

  const exportTheme = () => {
    const theme = {
      name: 'Custom Theme',
      colors: customColors
    };
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-theme.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Theme exported successfully');
  };

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Theme Customizer</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportTheme} variant="outline">
            <Copy className="h-4 w-4 mr-2" />
            Export Theme
          </Button>
        </div>
      </div>

      <Tabs defaultValue="custom">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="custom">Custom Theme</TabsTrigger>
          <TabsTrigger value="presets">Preset Themes</TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <CustomThemeForm
                colors={customColors}
                onColorChange={handleColorChange}
                onApplyTheme={() => applyTheme(customColors)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <PresetThemes
            presets={presetThemes}
            onApplyTheme={applyTheme}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}