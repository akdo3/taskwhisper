import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTodoStore } from '../../store/todoStore';
import { TaskFormBasicInfo } from './TaskFormBasicInfo';
import { TaskFormDates } from '../TaskFormDialog/TaskFormDates';
import { TaskFormRecurrence } from '../TaskFormDialog/TaskFormRecurrence';
import { TaskAttachments } from '../TaskAttachments';
import { TagsManager } from '../TagsManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectSelector } from './ProjectSelector';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { NewTask } from '@/types/todo';

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
  const [tags, setTags] = useState<Array<{ id: string; name: string; color: string }>>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [projectId, setProjectId] = useState<string>();
  const [subtasks, setSubtasks] = useState<Array<{ id: string; title: string; completed: false }>>([]);

  const { addTask, projects, categories, tags: availableTags, addProject } = useTodoStore();

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
    
    // Reset form
    setTitle('');
    setDescription('');
    setDate(undefined);
    setReminder(undefined);
    setRecurrenceType(undefined);
    setRecurrenceInterval(1);
    setPriority('medium');
    setAttachments([]);
    setTags([]);
    setCategoryId(undefined);
    setProjectId(undefined);
    setSubtasks([]);
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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
          
          <div className="space-y-4">
            <ProjectSelector
              projects={projects}
              projectId={projectId}
              setProjectId={setProjectId}
              addProject={addProject}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
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
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Tags</h3>
            <TagsManager
              selectedTags={tags}
              onTagsChange={setTags}
              availableTags={availableTags}
            />
          </div>
          
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