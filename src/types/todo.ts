export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  projectId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  };
  reminder?: Date;
  subtasks: SubTask[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
}