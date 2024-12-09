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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [newSubtask, setNewSubtask] = useState('');

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
    setOpen(false);
    toast.success('Task added successfully');
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Math.random().toString(), title: newSubtask.trim(), completed: false }
      ]);
      setNewSubtask('');
    }
  };

  const removeSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter(st => st.id !== subtaskId));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Add Task</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="more">More</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <TaskFormBasicInfo
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              priority={priority}
              setPriority={setPriority}
            />
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
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

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tags</h3>
                <TagsManager
                  selectedTags={tags}
                  onTagsChange={setTags}
                  availableTags={availableTags}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-4">
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

          <TabsContent value="more" className="space-y-4">
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
                  <Button onClick={handleAddSubtask} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                      <span className="flex-1 text-sm">{subtask.title}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubtask(subtask.id)}
                        className="h-6 w-6"
                      >
                        <X className="h-3 w-3" />
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
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>
            Add Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
