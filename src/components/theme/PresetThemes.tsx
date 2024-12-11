import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemePreview } from './ThemePreview';
import { motion } from 'framer-motion';

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
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
      {presets.map((theme, index) => (
        <motion.div
          key={theme.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="overflow-hidden h-full">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <h3 className="text-lg font-semibold">{theme.name}</h3>
              <ThemePreview colors={theme.colors} />
              <Button 
                onClick={() => onApplyTheme(theme.colors)} 
                className="w-full"
              >
                Apply Theme
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};