import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
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
        {/* Mobile Menu */}
        <div className="md:hidden p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden md:block animate-slide-in">
            <Sidebar />
          </div>
          
          <div className="flex-1 p-4 md:p-8 animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <div className="hidden md:flex justify-end mb-4">
                <ThemeToggle />
              </div>
              <TaskForm />
              <TaskList />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;