import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Copy, Menu, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/components/ThemeProvider';
import { toast } from 'sonner';
import { CustomThemeForm } from '@/components/theme/CustomThemeForm';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu } from '@/components/NavigationMenu';
import { ThemeGallery } from '@/components/theme/ThemeGallery';

export default function ThemeCustomizer() {
  const { setTheme } = useTheme();
  const [customColors, setCustomColors] = useState({
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    primary: '262.1 83.3% 57.8%',
    secondary: '210 40% 96.1%',
    border: '214.3 31.8% 91.4%',
    muted: '210 40% 96.1%',
    card: '0 0% 100%'
  });

  const handleColorChange = (key: string, value: string) => {
    setCustomColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyCustomTheme = () => {
    Object.entries(customColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    setTheme('custom');
    toast.success('Custom theme applied successfully');
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
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-4 space-y-6 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/settings" className="sm:hidden">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold">Theme Customizer</h1>
          </div>
          <div className="flex gap-2 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <NavigationMenu />
              </SheetContent>
            </Sheet>
            <Button onClick={exportTheme} variant="outline" className="hidden sm:flex">
              <Copy className="h-4 w-4 mr-2" />
              Export Theme
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-primary/5 border-primary/10">
          <div className="flex items-start gap-4">
            <Eye className="h-5 w-5 mt-1 text-primary" />
            <div>
              <h3 className="font-medium mb-1">Theme Preview</h3>
              <p className="text-sm text-muted-foreground">
                Browse through our collection of themes or create your own custom theme
              </p>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Theme Gallery</TabsTrigger>
            <TabsTrigger value="custom">Custom Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <ThemeGallery />
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <CustomThemeForm
              colors={customColors}
              onColorChange={handleColorChange}
              onApplyTheme={applyCustomTheme}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}