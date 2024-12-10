import { Project } from '../../types/todo';

export interface ProjectSlice {
  projects: Project[];
  selectedProjectId: string | null;
  addProject: (project: Omit<Project, 'id'>) => Project;
  updateProject: (projectId: string, updates: Partial<Omit<Project, 'id'>>) => void;
  deleteProject: (projectId: string) => void;
  selectProject: (projectId: string | null) => void;
}

export const createProjectSlice = (set: any): ProjectSlice => ({
  projects: [
    { id: '1', name: 'Personal', color: '#8B5CF6' },
    { id: '2', name: 'Work', color: '#EC4899' },
  ],
  selectedProjectId: null,
  addProject: (project) => {
    const newProject = { ...project, id: Math.random().toString() };
    set((state: any) => ({
      projects: [...state.projects, newProject],
    }));
    return newProject;
  },
  updateProject: (projectId, updates) =>
    set((state: any) => ({
      projects: state.projects.map((project: Project) =>
        project.id === projectId ? { ...project, ...updates } : project
      ),
    })),
  deleteProject: (projectId) =>
    set((state: any) => ({
      projects: state.projects.filter((project: Project) => project.id !== projectId),
      selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
    })),
  selectProject: (projectId) =>
    set({ selectedProjectId: projectId }),
});