import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ThemePreviewProps {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    border: string;
    muted: string;
    card: string;
  };
  compact?: boolean;
}

export const ThemePreview = ({ colors, compact = false }: ThemePreviewProps) => {
  const previewStyle = {
    background: `hsl(${colors.background})`,
    color: `hsl(${colors.foreground})`
  };

  if (compact) {
    return (
      <div 
        className="h-24 rounded-md overflow-hidden"
        style={previewStyle}
      >
        <div className="p-2 space-y-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              style={{
                backgroundColor: `hsl(${colors.primary})`,
                color: `hsl(${colors.foreground})`
              }}
            >
              Button
            </Button>
            <Badge
              style={{
                backgroundColor: `hsl(${colors.secondary})`,
                color: `hsl(${colors.foreground})`
              }}
            >
              Badge
            </Badge>
          </div>
          <div
            className="h-2 w-16 rounded"
            style={{
              backgroundColor: `hsl(${colors.muted})`
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-lg space-y-4" style={previewStyle}>
      <div className="flex gap-2 flex-wrap">
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
        <Button variant="outline" style={{
          borderColor: `hsl(${colors.border})`,
          color: `hsl(${colors.foreground})`
        }}>
          Outline Button
        </Button>
      </div>

      <Card style={{
        backgroundColor: `hsl(${colors.card})`,
        borderColor: `hsl(${colors.border})`
      }}>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Sample Card</h3>
          <p className="text-sm" style={{ color: `hsl(${colors.muted})` }}>
            This is how your content will look with muted text.
          </p>
          <Input 
            placeholder="Sample input field" 
            style={{ borderColor: `hsl(${colors.border})` }}
          />
          <div className="flex gap-2">
            <Badge>Primary Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};