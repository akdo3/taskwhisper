export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'url';
  url: string;
  title: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  projectId: string;
  categoryId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  recurrence?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
  };
  reminder?: Date;
  subtasks: SubTask[];
  notes?: string;
  attachments: Attachment[];
  tags: Tag[];
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export type NewTask = Omit<Task, 'id'>;

export interface TaskTemplate {
  id: string;
  name: string;
  template: Omit<Task, 'id'>;
}

export interface AIRecommendation {
  id: string;
  text: string;
  type: 'warning' | 'suggestion' | 'achievement';
  createdAt: Date;
}
