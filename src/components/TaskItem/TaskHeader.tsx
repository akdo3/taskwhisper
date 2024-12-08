import { Circle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Task } from '../../types/todo';

interface TaskHeaderProps {
  task: Task;
  isEditing: boolean;
  editedTitle: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  setIsExpanded: (value: boolean) => void;
  setIsEditing: (value: boolean) => void;
  setEditedTitle: (value: string) => void;
  handleSaveEdit: () => void;
}

export const TaskHeader = ({
  task,
  isEditing,
  editedTitle,
  isExpanded,
  onToggle,
  setIsExpanded,
  setIsEditing,
  setEditedTitle,
  handleSaveEdit,
}: TaskHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onToggle(task.id)}
        className="mt-1 text-gray-400 hover:text-primary transition-colors"
      >
        {task.completed ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <Circle className="w-5 h-5" />
        )}
      </button>

      {isEditing ? (
        <div className="flex gap-2 flex-1">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveEdit} size="sm">
            Save
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          <h3
            className={cn(
              "font-medium cursor-pointer",
              task.completed && "line-through"
            )}
            onClick={() => setIsEditing(true)}
          >
            {task.title}
          </h3>
        </div>
      )}
      <Badge className={cn("ml-2", getPriorityColor(task.priority))}>
        {task.priority}
      </Badge>
    </div>
  );
};

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