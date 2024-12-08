import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Task } from '../../types/todo';
import { TaskHeader } from './TaskHeader';
import { TaskMetadata } from './TaskMetadata';
import { TaskSubtasks } from './TaskSubtasks';
import { TaskNotes } from '../TaskNotes';
import { TaskAttachments } from '../TaskAttachments';

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

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-4 transition-all",
      task.completed && "opacity-50"
    )}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <TaskHeader
            task={task}
            isEditing={isEditing}
            editedTitle={editedTitle}
            isExpanded={isExpanded}
            onToggle={onToggle}
            setIsExpanded={setIsExpanded}
            setIsEditing={setIsEditing}
            setEditedTitle={setEditedTitle}
            handleSaveEdit={handleSaveEdit}
          />
          
          {task.description && (
            <p className="text-gray-500 mt-1">{task.description}</p>
          )}
          
          <TaskMetadata task={task} />
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

          <TaskSubtasks
            task={task}
            newSubtaskTitle={newSubtaskTitle}
            setNewSubtaskTitle={setNewSubtaskTitle}
            onAddSubtask={onAddSubtask}
            onToggleSubtask={onToggleSubtask}
            onDeleteSubtask={onDeleteSubtask}
          />
        </div>
      )}
    </div>
  );
};