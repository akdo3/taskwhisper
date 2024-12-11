import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, BarChart3, FolderKanban, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: FolderKanban, label: 'Projects', path: '/projects' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Palette, label: 'Theme', path: '/theme' },
];

export function NavigationMenu() {
  const location = useLocation();

  return (
    <nav className="space-y-2 py-4">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}