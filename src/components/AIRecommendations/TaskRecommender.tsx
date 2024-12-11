import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useTodoStore } from '@/store/todoStore';
import { Task } from '@/types/todo';

export const TaskRecommender = () => {
  const { tasks } = useTodoStore();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    generateRecommendations();
  }, [tasks]);

  const generateRecommendations = () => {
    // Simple recommendation logic based on task patterns
    const recommendations: string[] = [];
    
    // Check for overdue tasks
    const overdueTasks = tasks.filter(
      task => task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    );
    if (overdueTasks.length > 0) {
      recommendations.push('You have overdue tasks. Consider prioritizing them.');
    }

    // Check task completion patterns
    const completedToday = tasks.filter(
      task => task.completed && 
      task.dueDate && 
      new Date(task.dueDate).toDateString() === new Date().toDateString()
    );
    if (completedToday.length > 3) {
      recommendations.push('Great progress today! Consider taking a short break.');
    }

    // Check for tasks without due dates
    const tasksWithoutDates = tasks.filter(task => !task.dueDate && !task.completed);
    if (tasksWithoutDates.length > 0) {
      recommendations.push('Some tasks don\'t have due dates. Setting deadlines can help with planning.');
    }

    setRecommendations(recommendations);
  };

  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-sm">{recommendation}</span>
            </li>
          ))}
        </ul>
        <Button 
          onClick={generateRecommendations}
          variant="outline"
          className="mt-4"
        >
          Refresh Recommendations
        </Button>
      </CardContent>
    </Card>
  );
};