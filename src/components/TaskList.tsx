import { Calendar, CheckCircle2, Circle, Trash2, Bell, Repeat, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useTodoStore } from '../store/todoStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Task } from '../types/todo';

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const TaskList = () => {
  const { tasks, selectedProjectId, toggleTask, deleteTask, toggleSubtask, deleteSubtask, addSubtask, updateTask } = useTodoStore();
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<Record<string, string>>({});

  const filteredTasks = selectedProjectId
    ? tasks.filter((task) => task.projectId === selectedProjectId)
    : tasks;

  const toggleExpanded = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditedTitle(task.title);
  };

  const handleSaveEdit = (taskId: string) => {
    if (editedTitle.trim()) {
      updateTask(taskId, { title: editedTitle });
    }
    setEditingTask(null);
  };

  const handleAddSubtask = (taskId: string) => {
    if (newSubtaskTitle[taskId]?.trim()) {
      addSubtask(taskId, newSubtaskTitle[taskId]);
      setNewSubtaskTitle(prev => ({ ...prev, [taskId]: '' }));
    }
  };

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "bg-white rounded-lg shadow-sm p-4 transition-all",
            task.completed && "opacity-50"
          )}
        >
          <div className="flex items-start gap-4">
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
              <div className="flex items-center gap-2">
                {editingTask === task.id ? (
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => handleSaveEdit(task.id)} size="sm">
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() => toggleExpanded(task.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedTasks[task.id] ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <h3
                      className={cn(
                        "font-medium cursor-pointer",
                        task.completed && "line-through"
                      )}
                      onClick={() => handleEditTask(task)}
                    >
                      {task.title}
                    </h3>
                  </div>
                )}
                <Badge className={cn("ml-2", getPriorityColor(task.priority))}>
                  {task.priority}
                </Badge>
              </div>
              
              {task.description && (
                <p className="text-gray-500 mt-1">{task.description}</p>
              )}
              
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                {task.dueDate && (
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Due: {format(new Date(task.dueDate), 'PPP')}
                  </span>
                )}
                {task.reminder && (
                  <span className="flex items-center">
                    <Bell className="w-4 h-4 mr-1" />
                    Reminder: {format(new Date(task.reminder), 'PPP')}
                  </span>
                )}
                {task.recurrence && (
                  <span className="flex items-center">
                    <Repeat className="w-4 h-4 mr-1" />
                    Repeats: {task.recurrence.interval} {task.recurrence.type}
                  </span>
                )}
              </div>
            </div>
            
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {expandedTasks[task.id] && (
            <div className="ml-9 mt-4 space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a subtask..."
                  value={newSubtaskTitle[task.id] || ''}
                  onChange={(e) =>
                    setNewSubtaskTitle(prev => ({
                      ...prev,
                      [task.id]: e.target.value
                    }))
                  }
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask(task.id)}
                  className="flex-1"
                />
                <Button onClick={() => handleAddSubtask(task.id)} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {task.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                >
                  <button
                    onClick={() => toggleSubtask(task.id, subtask.id)}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {subtask.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                  <span className={cn(
                    "flex-1",
                    subtask.completed && "line-through"
                  )}>
                    {subtask.title}
                  </span>
                  <button
                    onClick={() => deleteSubtask(task.id, subtask.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
