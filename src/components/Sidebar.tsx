import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { cn } from '@/lib/utils';
import { Plus, Folder } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const Sidebar = () => {
  const { projects, selectedProjectId, selectProject, addProject } = useTodoStore();
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error("Project name cannot be empty");
      return;
    }

    addProject({
      name: newProjectName,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    });
    setNewProjectName('');
    setIsAddingProject(false);
    toast.success("Project created successfully!");
  };

  return (
    <div className="h-full bg-background p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAddingProject(true)}
          className="h-10 w-10 touch-target"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {isAddingProject && (
        <div className="mb-4 space-y-3">
          <Input
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddProject()}
            className="w-full h-10"
          />
          <div className="flex gap-2">
            <Button
              className="w-full h-10 touch-target"
              onClick={handleAddProject}
            >
              Add
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 touch-target"
              onClick={() => setIsAddingProject(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-1">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => selectProject(project.id)}
            className={cn(
              "w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg transition-colors touch-target min-h-[48px]",
              selectedProjectId === project.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Folder className="h-5 w-5 shrink-0" style={{ color: project.color }} />
            <span className="truncate">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};