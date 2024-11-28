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
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden touch-target">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[80%] sm:w-[350px]">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 shrink-0">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <main className="flex-1 mobile-container py-6">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="space-y-6">
                <ProgressStats />
                <SmartSuggestions />
                <TaskForm />
                <TaskList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;