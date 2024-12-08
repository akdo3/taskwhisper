import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useTodoStore } from '../store/todoStore';
import { TaskFormBasicInfo } from './TaskFormDialog/TaskFormBasicInfo';
import { TaskFormDates } from './TaskFormDialog/TaskFormDates';
import { TaskFormRecurrence } from './TaskFormDialog/TaskFormRecurrence';
import { TaskAttachments } from './TaskAttachments';
import { TagsManager } from './TagsManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
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
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
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
    setIsCreatingProject(false);
    toast.success('Project created successfully');
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { id: Math.random().toString(), title: newSubtask, completed: false }]);
    setNewSubtask('');
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Project</label>
              {isCreatingProject ? (
                <div className="space-y-2">
                  <Input
                    placeholder="New project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddProject} className="flex-1">Create Project</Button>
                    <Button variant="outline" onClick={() => setIsCreatingProject(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
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
                  <Button variant="outline" onClick={() => setIsCreatingProject(true)} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Project
                  </Button>
                </div>
              )}
            </div>

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

          <Card className="p-4">
            <h3 className="text-sm font-medium mb-2">Subtasks</h3>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                />
                <Button onClick={handleAddSubtask} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <span className="flex-1">{subtask.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSubtask(subtask.id)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
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
