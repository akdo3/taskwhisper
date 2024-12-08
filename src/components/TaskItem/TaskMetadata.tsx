import { Calendar, Bell, Repeat } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../../types/todo';

interface TaskMetadataProps {
  task: Task;
}

export const TaskMetadata = ({ task }: TaskMetadataProps) => {
  return (
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
  );
};