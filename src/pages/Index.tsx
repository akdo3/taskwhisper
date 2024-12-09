import { useState } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { Settings, BarChart2, FolderKanban, Calendar, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';
import { ListView } from '@/components/views/ListView';
import { CalendarView } from '@/components/views/CalendarView';
import { KanbanView } from '@/components/views/KanbanView';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ViewType = 'list' | 'kanban' | 'calendar';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('list');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-semibold">TaskWhisper</h1>
          <div className="flex items-center gap-2">
            <Link to="/projects">
              <Button variant="ghost" size="icon" className="touch-target">
                <FolderKanban className="h-4 w-4" />
                <span className="sr-only">Projects</span>
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="ghost" size="icon" className="touch-target">
                <BarChart2 className="h-4 w-4" />
                <span className="sr-only">Analytics</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="icon" className="touch-target">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full bg-background/50">
        <div className="container py-6 px-4">
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-3">
                <div className="animate-slide-in [--slide-in-delay:700ms]">
                  <TaskForm />
                </div>
              </div>
              <div className="col-span-1">
                <PomodoroTimer />
              </div>
            </div>

            <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as ViewType)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  List
                </TabsTrigger>
                <TabsTrigger value="kanban" className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  Kanban
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Calendar
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