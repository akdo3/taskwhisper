import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
import { ProgressStats } from '@/components/ProgressStats';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Mobile Header with improved spacing and touch targets */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
          <div className="container flex h-16 items-center justify-between mobile-safe-padding">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden touch-target">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px] sm:w-[350px]">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Desktop Sidebar with improved scrolling */}
          <div className="hidden md:block w-64 xl:w-72 shrink-0 border-r border-border">
            <div className="sticky top-16 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hidden">
              <Sidebar />
            </div>
          </div>
          
          {/* Main Content with improved spacing and container width */}
          <main className="flex-1 w-full">
            <div className="mobile-container py-6">
              <div className="space-y-6 animate-fade-in">
                {/* Stats and Suggestions Grid with responsive layout */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="animate-slide-in [--slide-in-delay:200ms]">
                    <ProgressStats />
                  </div>
                  <div className="animate-slide-in [--slide-in-delay:400ms]">
                    <SmartSuggestions />
                  </div>
                </div>
                <div className="animate-slide-in [--slide-in-delay:600ms]">
                  <TaskForm />
                </div>
                <div className="animate-slide-in [--slide-in-delay:800ms]">
                  <TaskList />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;