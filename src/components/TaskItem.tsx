import { Calendar, CheckCircle2, Circle, Trash2, Bell, Repeat, ChevronDown, ChevronRight, Plus, Link, Image, Paperclip } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Task } from '../types/todo';
import { useState } from 'react';
import { TaskNotes } from './TaskNotes';
import { TaskAttachments } from './TaskAttachments';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

export const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask,
}: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      onEdit(task.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(task.id, newSubtaskTitle);
      setNewSubtaskTitle('');
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-4 transition-all",
      task.completed && "opacity-50"
    )}>
      <div className="flex items-start gap-4">
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
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
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
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {isExpanded && (
        <div className="ml-9 mt-4 space-y-4">
          <TaskNotes
            notes={task.notes}
            onUpdateNotes={(notes) => onEdit(task.id, { notes })}
          />
          
          <TaskAttachments
            attachments={task.attachments}
            onAddAttachment={(attachment) => 
              onEdit(task.id, { 
                attachments: [...task.attachments, attachment]
              })
            }
            onRemoveAttachment={(attachmentId) => 
              onEdit(task.id, {
                attachments: task.attachments.filter(a => a.id !== attachmentId)
              })
            }
          />

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
        </div>
      )}
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