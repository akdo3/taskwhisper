import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTodoStore } from "@/store/todoStore";
import { useState } from "react";

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
  const { projects, updateProject } = useTodoStore();
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: false,
    push: true,
    reminders: true,
    updates: false,
  });

  const handleProjectUpdate = (projectId: string, name: string, color: string) => {
    updateProject(projectId, { name, color });
    toast.success("Project updated successfully");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast.success(`${key} notifications ${newSettings[key] ? 'enabled' : 'disabled'}`);
      return newSettings;
    });
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

      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-4">
              <div className="flex items-center gap-4">
                <Input
                  defaultValue={project.name}
                  onBlur={(e) => handleProjectUpdate(project.id, e.target.value, project.color)}
                />
                <Input
                  type="color"
                  defaultValue={project.color}
                  className="w-20"
                  onBlur={(e) => handleProjectUpdate(project.id, project.name, e.target.value)}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}