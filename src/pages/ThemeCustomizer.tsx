import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Sun, Moon, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';

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

const ThemePreview = ({ colors }: { colors: any }) => {
  return (
    <div className="p-4 rounded-lg space-y-4" style={{
      backgroundColor: `hsl(${colors.background})`,
      color: `hsl(${colors.foreground})`
    }}>
      <div className="flex gap-2">
        <Button style={{
          backgroundColor: `hsl(${colors.primary})`,
          color: `hsl(${colors.foreground})`
        }}>
          Primary Button
        </Button>
        <Button variant="secondary" style={{
          backgroundColor: `hsl(${colors.secondary})`,
          color: `hsl(${colors.foreground})`
        }}>
          Secondary Button
        </Button>
      </div>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-2">Sample Card</h3>
          <p>This is how your content will look with this theme.</p>
        </CardContent>
      </Card>
    </div>
  );
};

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
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label>Background</Label>
                    <Input
                      type="text"
                      value={customColors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      placeholder="H S L values"
                    />
                  </div>
                  <div>
                    <Label>Foreground</Label>
                    <Input
                      type="text"
                      value={customColors.foreground}
                      onChange={(e) => handleColorChange('foreground', e.target.value)}
                      placeholder="H S L values"
                    />
                  </div>
                  <div>
                    <Label>Primary</Label>
                    <Input
                      type="text"
                      value={customColors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      placeholder="H S L values"
                    />
                  </div>
                  <div>
                    <Label>Secondary</Label>
                    <Input
                      type="text"
                      value={customColors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      placeholder="H S L values"
                    />
                  </div>
                  <Button onClick={() => applyTheme(customColors)} className="w-full">
                    <Palette className="h-4 w-4 mr-2" />
                    Apply Theme
                  </Button>
                </div>
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <ThemePreview colors={customColors} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {presetThemes.map((theme) => (
              <Card key={theme.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{theme.name}</h3>
                  <ThemePreview colors={theme.colors} />
                  <Button 
                    onClick={() => applyTheme(theme.colors)} 
                    className="w-full mt-4"
                  >
                    Apply Theme
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}