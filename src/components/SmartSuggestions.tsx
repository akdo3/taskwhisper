import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle, RepeatIcon } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import { isAfter, isBefore, addDays } from 'date-fns';
import { toast } from 'sonner';

export const SmartSuggestions = () => {
  const { tasks, addTask } = useTodoStore();

  const suggestions = useMemo(() => {
    const now = new Date();
    const overdueTasks = tasks.filter(task => 
      !task.completed && 
      task.dueDate && 
      isBefore(new Date(task.dueDate), now)
    );

    const recurringPatterns = tasks
      .filter(task => task.completed)
      .reduce((acc, task) => {
        const key = `${task.title}-${task.priority}`;
        if (!acc[key]) acc[key] = 0;
        acc[key]++;
        return acc;
      }, {} as Record<string, number>);

    const suggestedRecurring = Object.entries(recurringPatterns)
      .filter(([_, count]) => count >= 3)
      .map(([key]) => {
        const [title, priority] = key.split('-');
        return { title, priority: priority as 'low' | 'medium' | 'high' | 'urgent' };
      });

    return {
      overdueTasks,
      suggestedRecurring,
    };
  }, [tasks]);

  const handleCreateRecurringTask = (suggestion: { title: string; priority: 'low' | 'medium' | 'high' | 'urgent' }) => {
    addTask({
      title: suggestion.title,
      priority: suggestion.priority,
      dueDate: addDays(new Date(), 1),
      projectId: tasks[0]?.projectId || '1',
      completed: false,
      recurrence: {
        type: 'weekly',
        interval: 1,
      },
      attachments: [],
      tags: [],
      subtasks: [],
    });
    toast.success('Recurring task created!');
  };

  if (suggestions.overdueTasks.length === 0 && suggestions.suggestedRecurring.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Smart Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.overdueTasks.length > 0 && (
          <div className="flex items-start gap-2 text-yellow-600 dark:text-yellow-500">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Overdue Tasks</p>
              <p className="text-sm text-muted-foreground">
                You have {suggestions.overdueTasks.length} overdue {suggestions.overdueTasks.length === 1 ? 'task' : 'tasks'}.
                Consider rescheduling or completing them soon.
              </p>
            </div>
          </div>
        )}

        {suggestions.suggestedRecurring.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-blue-600 dark:text-blue-500">
              <RepeatIcon className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-medium">Suggested Recurring Tasks</p>
                <p className="text-sm text-muted-foreground">
                  Based on your completed tasks, consider making these tasks recurring:
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {suggestions.suggestedRecurring.map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                  <span className="text-sm font-medium">{suggestion.title}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCreateRecurringTask(suggestion)}
                  >
                    Make Recurring
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};