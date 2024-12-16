import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ThemePreset } from '@/types/theme';

interface ThemePreviewProps {
  theme: ThemePreset;
  compact?: boolean;
}

export const ThemePreview = ({ theme, compact = false }: ThemePreviewProps) => {
  const previewStyle = {
    background: theme.gradient || `hsl(${theme.colors.background})`,
    color: `hsl(${theme.colors.foreground})`
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
                backgroundColor: `hsl(${theme.colors.primary})`,
                color: `hsl(${theme.colors.foreground})`
              }}
            >
              Button
            </Button>
            <Badge
              style={{
                backgroundColor: `hsl(${theme.colors.secondary})`,
                color: `hsl(${theme.colors.foreground})`
              }}
            >
              Badge
            </Badge>
          </div>
          <div
            className="h-2 w-16 rounded"
            style={{
              backgroundColor: `hsl(${theme.colors.muted})`
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
          backgroundColor: `hsl(${theme.colors.primary})`,
          color: `hsl(${theme.colors.foreground})`
        }}>
          Primary Button
        </Button>
        <Button variant="secondary" style={{
          backgroundColor: `hsl(${theme.colors.secondary})`,
          color: `hsl(${theme.colors.foreground})`
        }}>
          Secondary Button
        </Button>
        <Button variant="outline" style={{
          borderColor: `hsl(${theme.colors.border})`,
          color: `hsl(${theme.colors.foreground})`
        }}>
          Outline Button
        </Button>
      </div>

      <Card style={{
        backgroundColor: `hsl(${theme.colors.card})`,
        borderColor: `hsl(${theme.colors.border})`
      }}>
        <CardContent className="p-4 space-y-4">
          <h3 className="text-lg font-semibold">Sample Card</h3>
          <p className="text-sm" style={{ color: `hsl(${theme.colors.muted})` }}>
            This is how your content will look with muted text.
          </p>
          <Input 
            placeholder="Sample input field" 
            style={{ borderColor: `hsl(${theme.colors.border})` }}
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