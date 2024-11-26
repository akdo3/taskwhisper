import { useState } from 'react';
import { Plus, Calendar, Bell, Repeat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from 'date-fns';
import { useTodoStore } from '../store/todoStore';

export const TaskForm = () => {
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const [reminder, setReminder] = useState<Date>();
  const [recurrenceType, setRecurrenceType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>();
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [newSubtask, setNewSubtask] = useState('');
  const [subtasks, setSubtasks] = useState<{ title: string }[]>([]);

  const { addTask, selectedProjectId, projects } = useTodoStore();

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { title: newSubtask }]);
    setNewSubtask('');
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const recurrence = recurrenceType ? {
      type: recurrenceType,
      interval: recurrenceInterval
    } : undefined;
    
    addTask({
      title: newTask,
      description,
      completed: false,
      dueDate: date,
      projectId: selectedProjectId || projects[0].id,
      priority,
      recurrence,
      reminder,
    });
    
    setNewTask('');
    setDescription('');
    setDate(undefined);
    setReminder(undefined);
    setRecurrenceType(undefined);
    setRecurrenceInterval(1);
    setPriority('medium');
    setSubtasks([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleAddTask}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
      
      <Textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
      />
      
      <div className="flex gap-4 mb-4">
        <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              {date ? format(date, 'PPP') : 'Pick a due date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Bell className="w-4 h-4 mr-2" />
              {reminder ? format(reminder, 'PPP') : 'Set reminder'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={reminder}
              onSelect={setReminder}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex gap-4 mb-4">
        <Select
          value={recurrenceType}
          onValueChange={(value: any) => setRecurrenceType(value)}
        >
          <SelectTrigger className="w-[180px]">
            <Repeat className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Recurrence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        
        {recurrenceType && (
          <Input
            type="number"
            min="1"
            value={recurrenceInterval}
            onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
            className="w-24"
            placeholder="Interval"
          />
        )}
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-sm font-medium mb-2">Subtasks</h3>
        <div className="flex gap-2 mb-2">
          <Input
            placeholder="Add a subtask..."
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
            className="flex-1"
          />
          <Button onClick={handleAddSubtask} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {subtasks.length > 0 && (
          <ul className="space-y-2">
            {subtasks.map((subtask, index) => (
              <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <span className="flex-1">{subtask.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSubtask(index)}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};