import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
import { ProgressStats } from '@/components/ProgressStats';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { TaskWidget } from '@/components/TaskWidget';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Enhanced Mobile Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
          <div className="container flex h-16 items-center justify-between mobile-safe-padding">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden touch-target hover:bg-accent">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px] sm:w-[350px]">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <h1 className="text-xl font-semibold hidden sm:block">TaskWhisper</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Enhanced Desktop Sidebar */}
          <div className="hidden md:block w-64 xl:w-72 shrink-0 border-r border-border">
            <div className="sticky top-16 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-hidden">
              <Sidebar />
            </div>
          </div>
          
          {/* Enhanced Main Content */}
          <main className="flex-1 w-full bg-background/50">
            <div className="mobile-container py-6">
              <div className="space-y-8 animate-fade-in">
                {/* Enhanced Stats and Suggestions Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="animate-slide-in [--slide-in-delay:200ms]">
                    <ProgressStats />
                  </div>
                  <div className="animate-slide-in [--slide-in-delay:400ms]">
                    <SmartSuggestions />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2 animate-slide-in [--slide-in-delay:600ms]">
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
    </ThemeProvider>
  );
};

export default Index;