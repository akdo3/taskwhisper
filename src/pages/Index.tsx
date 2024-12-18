import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TaskForm } from '@/components/TaskForm';
import { Settings, BarChart2, FolderKanban, Calendar, List, HelpCircle, Info } from 'lucide-react';
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
import { TaskRecommender } from '@/components/AIRecommendations/TaskRecommender';
import { HeaderSection } from '@/components/layout/HeaderSection';
import { TaskManagementSection } from '@/components/layout/TaskManagementSection';
import { ViewSelector } from '@/components/layout/ViewSelector';

const Index = () => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [showGuide, setShowGuide] = useState(() => {
    return localStorage.getItem('hasVisitedBefore') !== 'true';
  });

  useEffect(() => {
    if (showGuide) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, [showGuide]);

  // Load saved view preference
  useEffect(() => {
    const savedView = localStorage.getItem('preferred-view');
    if (savedView) {
      setCurrentView(savedView as 'list' | 'kanban' | 'calendar');
    }
  }, []);

  // Save view preference
  const handleViewChange = (view: string) => {
    setCurrentView(view as 'list' | 'kanban' | 'calendar');
    localStorage.setItem('preferred-view', view);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <HeaderSection />
      
      <main className="flex-1 w-full bg-background/50" role="main">
        <div className="container py-6 px-4">
          {showGuide && (
            <WelcomeGuide onDismiss={() => setShowGuide(false)} />
          )}
          
          <div className="space-y-6 animate-fade-in">
            <TaskManagementSection />
            <ViewSelector currentView={currentView} onViewChange={handleViewChange} />

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