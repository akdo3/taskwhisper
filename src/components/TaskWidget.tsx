import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import { format } from 'date-fns';

export const TaskWidget = () => {
  const { tasks } = useTodoStore();
  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 3);

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Quick Tasks</CardTitle>
        <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-2 text-sm"
            >
              {task.completed ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="flex-1 truncate">{task.title}</span>
              {task.dueDate && (
                <span className="text-xs text-muted-foreground">
                  {format(new Date(task.dueDate), 'MMM d')}
                </span>
              )}
            </div>
          ))}
          {upcomingTasks.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No upcoming tasks
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};