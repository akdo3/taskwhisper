import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '../../types/todo';
import { toast } from 'sonner';

interface ProjectSelectorProps {
  projects: Project[];
  projectId?: string;
  setProjectId: (id: string) => void;
  addProject: (project: { name: string; color: string }) => Project;
}

export const ProjectSelector = ({
  projects,
  projectId,
  setProjectId,
  addProject,
}: ProjectSelectorProps) => {
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    const newProject = addProject({ name: newProjectName, color: '#8B5CF6' });
    setProjectId(newProject.id);
    setNewProjectName('');
    setIsCreatingProject(false);
    toast.success('Project created successfully');
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Project</label>
      {isCreatingProject ? (
        <div className="space-y-2">
          <Input
            placeholder="New project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={handleAddProject} className="flex-1">Create Project</Button>
            <Button variant="outline" onClick={() => setIsCreatingProject(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <Select value={projectId} onValueChange={setProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setIsCreatingProject(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
          </Button>
        </div>
      )}
    </div>
  );
};