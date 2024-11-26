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
    <div className="w-64 bg-white h-full min-h-screen border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAddingProject(true)}
          className="h-8 w-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {isAddingProject && (
        <div className="mb-4 space-y-2">
          <Input
            placeholder="Project name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddProject()}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="w-full"
              onClick={handleAddProject}
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
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
              "w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg transition-colors",
              selectedProjectId === project.id
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            )}
          >
            <Folder className="h-4 w-4" style={{ color: project.color }} />
            <span className="truncate">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};