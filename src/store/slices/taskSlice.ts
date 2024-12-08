import { Task, NewTask } from '../../types/todo';
import { addDays, addWeeks, addMonths, addYears } from 'date-fns';

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

export interface TaskSlice {
  tasks: Task[];
  addTask: (task: NewTask) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTaskRecurrence: (taskId: string, recurrence?: { type: 'daily' | 'weekly' | 'monthly' | 'yearly'; interval: number }) => void;
  setReminder: (taskId: string, reminderDate?: Date) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Omit<Task, 'id' | 'subtasks' | 'attachments'>>) => void;
}

export const createTaskSlice = (set: any): TaskSlice => ({
  tasks: [],
  addTask: (task) =>
    set((state: any) => ({
      tasks: [...state.tasks, { ...task, id: Math.random().toString() }],
    })),
  toggleTask: (taskId) =>
    set((state: any) => {
      const task = state.tasks.find((t: Task) => t.id === taskId);
      if (!task) return state;

      const updatedTasks = state.tasks.map((t: Task) => {
        if (t.id === taskId) {
          const completed = !t.completed;
          
          if (completed && t.recurrence && t.dueDate) {
            const nextDueDate = createNextDueDate(t.dueDate, t.recurrence);
            return { ...t, completed };
          }
          
          return { ...t, completed };
        }
        return t;
      });

      if (task.completed === false && task.recurrence && task.dueDate) {
        const nextDueDate = createNextDueDate(task.dueDate, task.recurrence);
        updatedTasks.push({
          ...task,
          id: Math.random().toString(),
          completed: false,
          dueDate: nextDueDate,
          reminder: task.reminder ? createNextDueDate(task.reminder, task.recurrence) : undefined,
          subtasks: task.subtasks.map(st => ({ ...st, completed: false })),
        });
      }

      return { tasks: updatedTasks };
    }),
  deleteTask: (taskId) =>
    set((state: any) => ({
      tasks: state.tasks.filter((task: Task) => task.id !== taskId),
    })),
  updateTaskRecurrence: (taskId, recurrence) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, recurrence } : task
      ),
    })),
  setReminder: (taskId, reminderDate) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, reminder: reminderDate } : task
      ),
    })),
  addSubtask: (taskId, title) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: Math.random().toString(), title, completed: false },
              ],
            }
          : task
      ),
    })),
  toggleSubtask: (taskId, subtaskId) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : task
      ),
    })),
  deleteSubtask: (taskId, subtaskId) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
            }
          : task
      ),
    })),
  updateTask: (taskId, updates) =>
    set((state: any) => ({
      tasks: state.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, ...updates } : task
      ),
    })),
});