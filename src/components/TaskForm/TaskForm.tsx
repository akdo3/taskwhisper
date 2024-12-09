import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTodoStore } from '../../store/todoStore';
import { TaskFormBasicInfo } from './TaskFormBasicInfo';
import { TaskFormDates } from '../TaskFormDialog/TaskFormDates';
import { TaskFormRecurrence } from '../TaskFormDialog/TaskFormRecurrence';
import { TaskAttachments } from '../TaskAttachments';
import { TagsManager } from '../TagsManager';
import { ProjectSelector } from './ProjectSelector';
import { CategorySelector } from './CategorySelector';
import { SubtaskManager } from './SubtaskManager';
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

  const { addTask, projects, addProject } = useTodoStore();

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <TaskFormBasicInfo
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
          />

          <div className="flex gap-2">
            <ProjectSelector
              projects={projects}
              projectId={projectId}
              setProjectId={setProjectId}
              addProject={addProject}
            />
            <CategorySelector
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </div>

          <Tabs defaultValue="dates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dates">Dates</TabsTrigger>
              <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="more">More</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dates" className="mt-4">
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
            </TabsContent>
            
            <TabsContent value="subtasks" className="mt-4">
              <SubtaskManager
                subtasks={subtasks}
                setSubtasks={setSubtasks}
              />
            </TabsContent>
            
            <TabsContent value="tags" className="mt-4">
              <TagsManager
                selectedTags={tags}
                onTagsChange={setTags}
                availableTags={[]}
              />
            </TabsContent>
            
            <TabsContent value="more" className="mt-4">
              <TaskAttachments
                attachments={attachments}
                onAddAttachment={(attachment) => setAttachments([...attachments, attachment])}
                onRemoveAttachment={(attachmentId) => 
                  setAttachments(attachments.filter(a => a.id !== attachmentId))
                }
              />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};