import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    const newProject = addProject({ name: newProjectName, color: '#8B5CF6' });
    setProjectId(newProject.id);
    setNewProjectName('');
    toast.success('Project created successfully');
  };

  return (
    <div className="flex-1 flex gap-2">
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

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <div className="space-y-2">
            <Input
              placeholder="New project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
            <Button onClick={handleAddProject} className="w-full">
              Create Project
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};