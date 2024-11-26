import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { Sidebar } from '@/components/Sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu */}
      <div className="md:hidden p-4 border-b bg-white">
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
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-3xl mx-auto">
            <TaskForm />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;