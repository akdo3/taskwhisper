import { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useTodoStore } from '../store/todoStore';
import { cn } from '@/lib/utils';

const Index = () => {
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>();
  const { tasks, projects, selectedProjectId, addTask, toggleTask, deleteTask, selectProject } = useTodoStore();

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask({
      title: newTask,
      description,
      completed: false,
      dueDate: date,
      projectId: selectedProjectId || projects[0].id,
    });
    setNewTask('');
    setDescription('');
    setDate(undefined);
  };

  const filteredTasks = selectedProjectId
    ? tasks.filter((task) => task.projectId === selectedProjectId)
    : tasks;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Projects</h2>
        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => selectProject(project.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-lg transition-colors",
                selectedProjectId === project.id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              )}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Add Task Form */}
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
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "bg-white rounded-lg shadow-sm p-4 flex items-start gap-4 transition-all",
                  task.completed && "opacity-50"
                )}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-1 text-gray-400 hover:text-primary transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1">
                  <h3 className={cn(
                    "font-medium",
                    task.completed && "line-through"
                  )}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-500 mt-1">{task.description}</p>
                  )}
                  {task.dueDate && (
                    <p className="text-sm text-gray-400 mt-2">
                      Due: {format(new Date(task.dueDate), 'PPP')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;