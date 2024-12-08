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
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { NewTask } from '@/types/todo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [newProjectName, setNewProjectName] = useState('');
  const [subtasks, setSubtasks] = useState<Array<{ id: string; title: string; completed: false }>>([]);
  const [newSubtask, setNewSubtask] = useState('');

  const { addTask, projects, categories, tags: availableTags, addProject } = useTodoStore();

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    const newProject = addProject({ name: newProjectName, color: '#8B5CF6' });
    setProjectId(newProject.id);
    setNewProjectName('');
    toast.success('Project created successfully');
  };

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
      <DialogContent className="sm:max-w-[600px]">
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
          
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Select value={projectId} onValueChange={setProjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 items-center">
              <Input
                placeholder="New project"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-32"
              />
              <Button variant="outline" onClick={handleAddProject} className="whitespace-nowrap">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

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

          <Tabs defaultValue="dates" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dates">Dates</TabsTrigger>
              <TabsTrigger value="recurrence">Recurrence</TabsTrigger>
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dates">
              <TaskFormDates
                dueDate={date}
                setDueDate={setDate}
                reminder={reminder}
                setReminder={setReminder}
              />
            </TabsContent>
            
            <TabsContent value="recurrence">
              <TaskFormRecurrence
                recurrenceType={recurrenceType}
                setRecurrenceType={setRecurrenceType}
                recurrenceInterval={recurrenceInterval}
                setRecurrenceInterval={setRecurrenceInterval}
              />
            </TabsContent>
            
            <TabsContent value="tags">
              <TagsManager
                selectedTags={tags}
                onTagsChange={setTags}
                availableTags={availableTags}
              />
            </TabsContent>
            
            <TabsContent value="attachments">
              <TaskAttachments
                attachments={attachments}
                onAddAttachment={(attachment) => setAttachments([...attachments, attachment])}
                onRemoveAttachment={(attachmentId) => 
                  setAttachments(attachments.filter(a => a.id !== attachmentId))
                }
              />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2">
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