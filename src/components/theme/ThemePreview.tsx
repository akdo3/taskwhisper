import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ThemePreviewProps {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
  };
}

export const ThemePreview = ({ colors }: ThemePreviewProps) => {
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