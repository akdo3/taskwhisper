import { create } from 'zustand';
import { toast } from 'sonner';
import { createTaskSlice, TaskSlice } from './slices/taskSlice';
import { createProjectSlice, ProjectSlice } from './slices/projectSlice';
import { createTagSlice, TagSlice } from './slices/tagSlice';
import { createCategorySlice, CategorySlice } from './slices/categorySlice';
import { saveTask, deleteTask as deleteTaskFromDB } from '../utils/storage';
import { showNotification } from '../utils/notifications';

type TodoStore = TaskSlice & ProjectSlice & TagSlice & CategorySlice;

export const useTodoStore = create<TodoStore>((set) => ({
  ...createTaskSlice(set),
  ...createProjectSlice(set),
  ...createTagSlice(set),
  ...createCategorySlice(set),
}));

// Check for due tasks every minute
if (typeof window !== 'undefined') {
  setInterval(() => {
    const store = useTodoStore.getState();
    const now = new Date();
    
    store.tasks.forEach(task => {
      if (task.reminder && !task.completed) {
        const reminderTime = new Date(task.reminder);
        if (Math.abs(now.getTime() - reminderTime.getTime()) < 60000) {
          toast(`Reminder: ${task.title}`, {
            description: task.description,
          });
          showNotification('Task Reminder', {
            body: task.title,
            icon: '/favicon.ico'
          });
        }
      }
    });
  }, 60000);
}