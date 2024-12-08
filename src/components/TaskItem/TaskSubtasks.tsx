import { Plus, Circle, CheckCircle2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Task } from '../../types/todo';

interface TaskSubtasksProps {
  task: Task;
  newSubtaskTitle: string;
  setNewSubtaskTitle: (value: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskSubtasks = ({
  task,
  newSubtaskTitle,
  setNewSubtaskTitle,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}: TaskSubtasksProps) => {
  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(task.id, newSubtaskTitle);
      setNewSubtaskTitle('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
          className="flex-1"
        />
        <Button onClick={handleAddSubtask} variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      {task.subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className="flex items-center gap-2 bg-gray-50 p-2 rounded"
        >
          <button
            onClick={() => onToggleSubtask(task.id, subtask.id)}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            {subtask.completed ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Circle className="w-4 h-4" />
            )}
          </button>
          <span className={cn(
            "flex-1",
            subtask.completed && "line-through"
          )}>
            {subtask.title}
          </span>
          <button
            onClick={() => onDeleteSubtask(task.id, subtask.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};