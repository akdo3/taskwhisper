import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTodoStore } from '../store/todoStore';
import { TaskFormBasicInfo } from './TaskFormDialog/TaskFormBasicInfo';
import { TaskFormDates } from './TaskFormDialog/TaskFormDates';
import { TaskFormRecurrence } from './TaskFormDialog/TaskFormRecurrence';
import { TaskAttachments } from './TaskAttachments';
import { toast } from 'sonner';

export const TaskForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState<Date>();
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>();
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [attachments, setAttachments] = useState<Array<{ id: string; type: 'url' | 'image' | 'document'; url: string; title: string }>>([]);

  const { addTask, selectedProjectId, projects } = useTodoStore();

  const handleAddTask = () => {
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }
    
    const recurrence = recurrenceType ? {
      type: recurrenceType,
      interval: recurrenceInterval
    } : undefined;
    
    addTask({
      title,
      description,
      completed: false,
      dueDate: date,
      projectId: selectedProjectId || projects[0].id,
      priority,
      recurrence,
      reminder,
      attachments,
    });
    
    setTitle('');
    setDescription('');
    setDate(undefined);
    setReminder(undefined);
    setRecurrenceType(undefined);
    setRecurrenceInterval(1);
    setPriority('medium');
    setAttachments([]);
    setOpen(false);
    
    toast.success('Task added successfully');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <TaskFormBasicInfo
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
          />
          
          <TaskFormDates
            dueDate={date}
            setDueDate={setDate}
            reminder={reminder}
            setReminder={setReminder}
          />
          
          <TaskFormRecurrence
            recurrenceType={recurrenceType}
            setRecurrenceType={setRecurrenceType}
            recurrenceInterval={recurrenceInterval}
            setRecurrenceInterval={setRecurrenceInterval}
          />
          
          <TaskAttachments
            attachments={attachments}
            onAddAttachment={(attachment) => setAttachments([...attachments, attachment])}
            onRemoveAttachment={(attachmentId) => 
              setAttachments(attachments.filter(a => a.id !== attachmentId))
            }
          />
          
          <div className="flex justify-end">
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};