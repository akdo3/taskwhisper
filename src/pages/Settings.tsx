import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      const permission = await Notification.permission;
      setNotificationsEnabled(permission === 'granted');
    };
    
    checkNotificationPermission();
  }, []);

  const handleNotificationChange = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast.success('Notifications enabled');
      } else {
        setNotificationsEnabled(false);
        toast.error('Notifications disabled');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast.error('Failed to update notification settings');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              Enable or disable push notifications
            </p>
          </div>
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            onClick={handleNotificationChange}
          >
            {notificationsEnabled ? 'Disable' : 'Enable'} Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;