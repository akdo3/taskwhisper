import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskForm } from '@/components/TaskForm';
import { Settings, BarChart2, FolderKanban, Calendar, List, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { ListView } from '@/components/views/ListView';
import { CalendarView } from '@/components/views/CalendarView';
import { KanbanView } from '@/components/views/KanbanView';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WelcomeGuide } from '@/components/WelcomeGuide';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type ViewType = 'list' | 'kanban' | 'calendar';

const Index = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header 
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top"
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{t('welcome')}</h1>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="touch-target"
                  aria-label={t('quickHelp')}
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{t('quickHelp')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('helpText')}
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
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
              </HoverCardTrigger>
              <HoverCardContent side="bottom" className="w-40">
                <p className="text-sm">{t('projects')}</p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
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
              </HoverCardTrigger>
              <HoverCardContent side="bottom" className="w-40">
                <p className="text-sm">{t('analytics')}</p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
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
              </HoverCardTrigger>
              <HoverCardContent side="bottom" className="w-40">
                <p className="text-sm">{t('settings')}</p>
              </HoverCardContent>
            </HoverCard>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-background/50" role="main">
        <div className="container py-6 px-4">
          {showGuide && (
            <WelcomeGuide onDismiss={() => setShowGuide(false)} />
          )}
          
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-3">
                <SmartSuggestions />
                <div className="animate-slide-in [--slide-in-delay:700ms]">
                  <TaskForm />
                </div>
              </div>
              <div className="col-span-1">
                <PomodoroTimer />
              </div>
            </div>

            <Tabs 
              value={currentView} 
              onValueChange={(value) => setCurrentView(value as ViewType)} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  {t('listView')}
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  {t('kanbanView')}
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t('calendarView')}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="animate-slide-in [--slide-in-delay:1000ms] pb-safe-bottom">
              {currentView === 'list' && <ListView />}
              {currentView === 'kanban' && <KanbanView />}
              {currentView === 'calendar' && <CalendarView />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;