export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  projectId: string;
}

export interface Project {
  id: string;
  name: string;
  color: string;
}