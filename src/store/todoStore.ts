import { create } from 'zustand';
import { Task, Project } from '../types/todo';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';
import { toast } from 'sonner';

interface TodoStore {
  tasks: Task[];
  projects: Project[];
  selectedProjectId: string | null;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  selectProject: (projectId: string | null) => void;
  updateTaskRecurrence: (taskId: string, recurrence?: { type: 'daily' | 'weekly' | 'monthly' | 'yearly'; interval: number }) => void;
  setReminder: (taskId: string, reminderDate?: Date) => void;
}

const createNextDueDate = (currentDate: Date, recurrence: NonNullable<Task['recurrence']>) => {
  switch (recurrence.type) {
    case 'daily':
      return addDays(currentDate, recurrence.interval);
    case 'weekly':
      return addWeeks(currentDate, recurrence.interval);
    case 'monthly':
      return addMonths(currentDate, recurrence.interval);
    case 'yearly':
      return addYears(currentDate, recurrence.interval);
  }
};

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  projects: [
    { id: '1', name: 'Personal', color: '#8B5CF6' },
    { id: '2', name: 'Work', color: '#EC4899' },
  ],
  selectedProjectId: null,
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: Math.random().toString() }],
    })),
  toggleTask: (taskId) =>
    set((state) => {
      const task = state.tasks.find(t => t.id === taskId);
      if (!task) return state;

      const updatedTasks = state.tasks.map((t) => {
        if (t.id === taskId) {
          const completed = !t.completed;
          
          // If task is completed and has recurrence, create next occurrence
          if (completed && t.recurrence && t.dueDate) {
            const nextDueDate = createNextDueDate(t.dueDate, t.recurrence);
            const newTask = {
              ...t,
              id: Math.random().toString(),
              completed: false,
              dueDate: nextDueDate,
              reminder: t.reminder ? createNextDueDate(t.reminder, t.recurrence) : undefined,
            };
            return { ...t, completed };
          }
          
          return { ...t, completed };
        }
        return t;
      });

      // If we created a new recurring task, add it to the list
      if (task.completed === false && task.recurrence && task.dueDate) {
        const nextDueDate = createNextDueDate(task.dueDate, task.recurrence);
        updatedTasks.push({
          ...task,
          id: Math.random().toString(),
          completed: false,
          dueDate: nextDueDate,
          reminder: task.reminder ? createNextDueDate(task.reminder, task.recurrence) : undefined,
        });
      }

      return { tasks: updatedTasks };
    }),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  addProject: (project) =>
    set((state) => ({
      projects: [...state.projects, { ...project, id: Math.random().toString() }],
    })),
  selectProject: (projectId) =>
    set({ selectedProjectId: projectId }),
  updateTaskRecurrence: (taskId, recurrence) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, recurrence } : task
      ),
    })),
  setReminder: (taskId, reminderDate) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, reminder: reminderDate } : task
      ),
    })),
}));

// Check for reminders every minute
if (typeof window !== 'undefined') {
  setInterval(() => {
    const store = useTodoStore.getState();
    const now = new Date();
    
    store.tasks.forEach(task => {
      if (task.reminder && !task.completed) {
        const reminderTime = new Date(task.reminder);
        if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) { // Within the last minute
          toast(`Reminder: ${task.title}`, {
            description: task.description,
          });
        }
      }
    });
  }, 60000);
}