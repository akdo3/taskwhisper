export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  projectId: string;
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  };
  reminder?: Date;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}