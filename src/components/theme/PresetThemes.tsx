import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemePreview } from './ThemePreview';
import { motion } from 'framer-motion';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PresetTheme {
  name: string;
  description: string;
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <h3 className="text-lg font-semibold">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                    <ThemePreview colors={theme.colors} />
                    <Button 
                      onClick={() => onApplyTheme(theme.colors)} 
                      className="w-full"
                    >
                      Apply Theme
                    </Button>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>Click to preview and apply the {theme.name} theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      ))}
    </div>
  );
};