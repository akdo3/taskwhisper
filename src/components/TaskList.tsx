import { Calendar, CheckCircle2, Circle, Trash2, Bell, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { useTodoStore } from '../store/todoStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const TaskList = () => {
  const { tasks, selectedProjectId, toggleTask, deleteTask } = useTodoStore();

  const filteredTasks = selectedProjectId
    ? tasks.filter((task) => task.projectId === selectedProjectId)
    : tasks;

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "bg-white rounded-lg shadow-sm p-4 flex items-start gap-4 transition-all",
            task.completed && "opacity-50"
          )}
        >
          <button
            onClick={() => toggleTask(task.id)}
            className="mt-1 text-gray-400 hover:text-primary transition-colors"
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-medium",
                task.completed && "line-through"
              )}>
                {task.title}
              </h3>
              <Badge className={cn("ml-2", getPriorityColor(task.priority))}>
                {task.priority}
              </Badge>
            </div>
            {task.description && (
              <p className="text-gray-500 mt-1">{task.description}</p>
            )}
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              {task.dueDate && (
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due: {format(new Date(task.dueDate), 'PPP')}
                </span>
              )}
              {task.reminder && (
                <span className="flex items-center">
                  <Bell className="w-4 h-4 mr-1" />
                  Reminder: {format(new Date(task.reminder), 'PPP')}
                </span>
              )}
              {task.recurrence && (
                <span className="flex items-center">
                  <Repeat className="w-4 h-4 mr-1" />
                  Repeats: {task.recurrence.interval} {task.recurrence.type}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};