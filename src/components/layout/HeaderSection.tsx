import { Settings, BarChart2, FolderKanban, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HeaderSection = () => {
  const { t } = useTranslation();

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top"
      role="banner"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{t('welcome')}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="touch-target"
                  aria-label={t('quickHelp')}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Need help? Click for a quick guide</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/projects">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="touch-target"
                    aria-label={t('projects')}
                  >
                    <FolderKanban className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Manage your projects</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/analytics">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="touch-target"
                    aria-label={t('analytics')}
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View your analytics</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/settings">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="touch-target"
                    aria-label={t('settings')}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize your settings</p>
              </TooltipContent>
            </Tooltip>

            <ThemeToggle />
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};