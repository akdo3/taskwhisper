import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
import { ProgressStats } from '@/components/ProgressStats';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { TaskWidget } from '@/components/TaskWidget';
import { Menu, Settings, FolderPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden touch-target hover:bg-accent">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-full sm:w-[350px]">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">TaskWhisper</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/projects">
              <Button variant="ghost" size="icon" className="touch-target">
                <FolderPlus className="h-4 w-4" />
                <span className="sr-only">Projects</span>
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

      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden md:block w-64 xl:w-72 shrink-0 border-r border-border">
          <div className="sticky top-16 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hidden">
            <Sidebar />
          </div>
        </div>
        
        <main className="flex-1 w-full bg-background/50">
          <div className="container py-6 px-4">
            <div className="space-y-6 animate-fade-in">
              <div className="grid gap-4 sm:gap-6">
                <div className="animate-slide-in [--slide-in-delay:200ms]">
                  <ProgressStats />
                </div>
                <div className="animate-slide-in [--slide-in-delay:400ms]">
                  <SmartSuggestions />
                </div>
              </div>
              <div className="grid gap-4 sm:gap-6">
                <div className="animate-slide-in [--slide-in-delay:600ms]">
                  <TaskForm />
                </div>
                <div className="animate-slide-in [--slide-in-delay:800ms]">
                  <TaskWidget />
                </div>
              </div>
              <div className="animate-slide-in [--slide-in-delay:1000ms] pb-safe-bottom">
                <TaskList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;