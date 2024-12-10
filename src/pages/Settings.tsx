import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'pl', name: 'Polski' },
];

export default function Settings() {
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: false,
    push: true,
    reminders: true,
    updates: false,
  });
  const { setTheme } = useTheme();

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast.success(`${key} notifications ${newSettings[key] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
  };

  const handleThemeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string);
        if (validateTheme(themeData)) {
          localStorage.setItem('customTheme', JSON.stringify(themeData));
          document.documentElement.style.setProperty('--background', themeData.background);
          document.documentElement.style.setProperty('--foreground', themeData.foreground);
          document.documentElement.style.setProperty('--primary', themeData.primary);
          document.documentElement.style.setProperty('--secondary', themeData.secondary);
          setTheme('custom');
          toast.success('Custom theme applied successfully');
        }
      } catch (error) {
        toast.error('Invalid theme file format');
      }
    };
    reader.readAsText(file);
  };

  const validateTheme = (theme: any) => {
    const requiredColors = ['background', 'foreground', 'primary', 'secondary'];
    return requiredColors.every(color => typeof theme[color] === 'string');
  };

  return (
    <div className="container max-w-2xl py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <ThemeToggle />
          </div>
          <Link to="/theme">
            <Button variant="outline" className="w-full">
              <Palette className="h-4 w-4 mr-2" />
              Customize Theme
            </Button>
          </Link>
          <div className="space-y-2">
            <Label>Custom Theme</Label>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".json"
                onChange={handleThemeUpload}
                className="flex-1"
              />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a JSON file with your custom theme colors
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange('email')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={notifications.push}
              onCheckedChange={() => handleNotificationChange('push')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="reminder-notifications">Task Reminders</Label>
            <Switch
              id="reminder-notifications"
              checked={notifications.reminders}
              onCheckedChange={() => handleNotificationChange('reminders')}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="update-notifications">Project Updates</Label>
            <Switch
              id="update-notifications"
              checked={notifications.updates}
              onCheckedChange={() => handleNotificationChange('updates')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
