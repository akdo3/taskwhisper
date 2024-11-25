import { create } from 'zustand';
import { Task, Project } from '../types/todo';

interface TodoStore {
  tasks: Task[];
  projects: Project[];
  selectedProjectId: string | null;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  selectProject: (projectId: string | null) => void;
}

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
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })),
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
}));