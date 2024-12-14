import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, BarChart3, FolderKanban, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: Home, label: 'Home', path: '/', description: 'Go to dashboard' },
  { icon: Settings, label: 'Settings', path: '/settings', description: 'Customize your preferences' },
  { icon: FolderKanban, label: 'Projects', path: '/projects', description: 'Manage your projects' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics', description: 'View your progress' },
  { icon: Palette, label: 'Theme', path: '/theme', description: 'Customize the appearance' },
];

export function NavigationMenu() {
  const location = useLocation();

  return (
    <nav className="space-y-2 py-4">
      <TooltipProvider>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Tooltip key={item.path}>
              <TooltipTrigger asChild>
                <Link
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
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}