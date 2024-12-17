import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, Wand2 } from 'lucide-react';
import { ThemePreview } from './ThemePreview';
import { createThemeFromColor } from '@/utils/themePresets';
import { toast } from 'sonner';

interface ImageThemeGeneratorProps {
  onApplyTheme: (colors: any) => void;
}

export const ImageThemeGenerator = ({ onApplyTheme }: ImageThemeGeneratorProps) => {
  const [previewColors, setPreviewColors] = useState({
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    primary: '262.1 83.3% 57.8%',
    secondary: '210 40% 96.1%',
    border: '214.3 31.8% 91.4%',
    muted: '210 40% 96.1%',
    card: '0 0% 100%'
  });

  const extractColorsFromImage = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
          const dominantColor = getDominantColor(imageData);
          const theme = createThemeFromColor(dominantColor);
          setPreviewColors(theme.colors);
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Error processing image');
    }
  };

  const getDominantColor = (imageData: Uint8ClampedArray): string => {
    const colorCounts: { [key: string]: number } = {};
    
    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const rgb = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      colorCounts[rgb] = (colorCounts[rgb] || 0) + 1;
    }

    return Object.entries(colorCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label>Upload Image</Label>
          <div className="flex gap-4 items-end">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) extractColorsFromImage(file);
              }}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={() => onApplyTheme(previewColors)}
              className="flex gap-2"
            >
              <Wand2 className="h-4 w-4" />
              Apply Theme
            </Button>
          </div>
        </div>
        <ThemePreview colors={previewColors} />
      </div>
    </Card>
  );
};