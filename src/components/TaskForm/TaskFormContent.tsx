import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaskFormBasicInfo } from './TaskFormBasicInfo';
import { TaskFormTabs } from './TaskFormTabs';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';
import { NewTask } from '@/types/todo';

interface TaskFormContentProps {
  setOpen: (open: boolean) => void;
}

export const TaskFormContent = ({ setOpen }: TaskFormContentProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState<Date>();
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>();
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [attachments, setAttachments] = useState<Array<{ id: string; type: 'url' | 'image' | 'document'; url: string; title: string }>>([]);
  const [tags, setTags] = useState<Array<{ id: string; name: string; color: string }>>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [projectId, setProjectId] = useState<string>();
  const [subtasks, setSubtasks] = useState<Array<{ id: string; title: string; completed: false }>>([]);

  const { addTask, projects } = useTodoStore();

  const handleAddTask = () => {
    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }
    
    const recurrence = recurrenceType ? {
      type: recurrenceType,
      interval: recurrenceInterval
    } : undefined;
    
    const newTask: NewTask = {
      title,
      description,
      completed: false,
      dueDate: date,
      projectId: projectId || projects[0]?.id,
      categoryId,
      priority,
      recurrence,
      reminder,
      attachments,
      tags,
      subtasks,
    };
    
    addTask(newTask);
    setOpen(false);
    toast.success('Task added successfully');
  };

  return (
    <div className="space-y-4">
      <TaskFormBasicInfo
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        priority={priority}
        setPriority={setPriority}
      />
      <TaskFormTabs
        date={date}
        setDate={setDate}
        reminder={reminder}
        setReminder={setReminder}
        recurrenceType={recurrenceType}
        setRecurrenceType={setRecurrenceType}
        recurrenceInterval={recurrenceInterval}
        setRecurrenceInterval={setRecurrenceInterval}
        attachments={attachments}
        setAttachments={setAttachments}
        tags={tags}
        setTags={setTags}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        projectId={projectId}
        setProjectId={setProjectId}
        subtasks={subtasks}
        setSubtasks={setSubtasks}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
};