import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ThemePreview } from './ThemePreview';
import { useState } from 'react';

interface HSLSlidersProps {
  onColorChange: (key: string, value: string) => void;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    border: string;
    muted: string;
    card: string;
  };
}

export const HSLSliders = ({ onColorChange, colors }: HSLSlidersProps) => {
  const parseHSL = (hslString: string) => {
    const [h, s, l] = hslString.split(' ').map(val => parseInt(val));
    return { h: h || 0, s: parseInt(s) || 0, l: parseInt(l) || 0 };
  };

  const updateHSL = (key: string, type: 'h' | 's' | 'l', value: number) => {
    const color = parseHSL(colors[key as keyof typeof colors]);
    const newColor = { ...color, [type]: value };
    onColorChange(key, `${newColor.h} ${newColor.s}% ${newColor.l}%`);
  };

  const colorKeys = ['primary', 'secondary', 'background', 'foreground'];

  return (
    <Card className="p-4">
      <div className="space-y-6">
        {colorKeys.map((key) => {
          const { h, s, l } = parseHSL(colors[key as keyof typeof colors]);
          return (
            <div key={key} className="space-y-4">
              <Label className="capitalize">{key}</Label>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Hue</span>
                    <span>{h}°</span>
                  </div>
                  <Slider
                    value={[h]}
                    max={360}
                    step={1}
                    onValueChange={([value]) => updateHSL(key, 'h', value)}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Saturation</span>
                    <span>{s}%</span>
                  </div>
                  <Slider
                    value={[s]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => updateHSL(key, 's', value)}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Lightness</span>
                    <span>{l}%</span>
                  </div>
                  <Slider
                    value={[l]}
                    max={100}
                    step={1}
                    onValueChange={([value]) => updateHSL(key, 'l', value)}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <ThemePreview colors={colors} />
      </div>
    </Card>
  );
};