import { NavigationMenu } from '@/components/NavigationMenu';
import { TaskList } from '@/components/TaskList';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { TaskWidget } from '@/components/TaskWidget';

const Index = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:block">
        <NavigationMenu />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <TaskWidget />
            <SmartSuggestions />
          </div>
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Index;