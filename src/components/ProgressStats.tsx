import { useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTodoStore } from '../store/todoStore';
import { startOfWeek, endOfWeek, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export const ProgressStats = () => {
  const { tasks } = useTodoStore();

  const stats = useMemo(() => {
    const now = new Date();
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const weekTasks = tasks.filter(task => 
      task.dueDate && isWithinInterval(new Date(task.dueDate), { start: weekStart, end: weekEnd })
    );
    
    const monthTasks = tasks.filter(task => 
      task.dueDate && isWithinInterval(new Date(task.dueDate), { start: monthStart, end: monthEnd })
    );

    const dailyProgress = (tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100;
    const weeklyProgress = (weekTasks.filter(t => t.completed).length / Math.max(weekTasks.length, 1)) * 100;
    const monthlyProgress = (monthTasks.filter(t => t.completed).length / Math.max(monthTasks.length, 1)) * 100;

    const chartData = [
      { name: 'Daily', progress: dailyProgress },
      { name: 'Weekly', progress: weeklyProgress },
      { name: 'Monthly', progress: monthlyProgress },
    ];

    return {
      daily: dailyProgress,
      weekly: weeklyProgress,
      monthly: monthlyProgress,
      chartData,
    };
  }, [tasks]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
          <span className="text-sm text-muted-foreground">{Math.round(stats.daily)}%</span>
        </CardHeader>
        <CardContent>
          <Progress value={stats.daily} className="h-2" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          <span className="text-sm text-muted-foreground">{Math.round(stats.weekly)}%</span>
        </CardHeader>
        <CardContent>
          <Progress value={stats.weekly} className="h-2" />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
          <span className="text-sm text-muted-foreground">{Math.round(stats.monthly)}%</span>
        </CardHeader>
        <CardContent>
          <Progress value={stats.monthly} className="h-2" />
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="var(--primary)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};