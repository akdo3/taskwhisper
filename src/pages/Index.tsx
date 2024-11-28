import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
import { ProgressStats } from '@/components/ProgressStats';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 md:hidden p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="touch-manipulation">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[80%] sm:w-[350px]">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0 animate-slide-in">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 p-4 md:p-8 w-full animate-fade-in overflow-x-hidden">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="hidden md:flex justify-end">
                <ThemeToggle />
              </div>
              
              {/* Responsive grid for stats on mobile */}
              <div className="px-2 sm:px-0">
                <ProgressStats />
              </div>
              
              {/* Smart suggestions with proper mobile spacing */}
              <div className="px-2 sm:px-0">
                <SmartSuggestions />
              </div>
              
              {/* Task form and list with mobile-optimized spacing */}
              <div className="space-y-4 px-2 sm:px-0">
                <TaskForm />
                <TaskList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;