import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FolderPlus, Tag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';

export default function ProjectManagement() {
  const { projects, addProject, updateProject } = useTodoStore();
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('#8B5CF6');

  const handleAddProject = () => {
    if (!newProjectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    addProject({ name: newProjectName, color: newProjectColor });
    setNewProjectName('');
    toast.success('Project added successfully');
  };

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Project Management</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            Add New Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="color"
              value={newProjectColor}
              onChange={(e) => setNewProjectColor(e.target.value)}
              className="w-20"
            />
            <Button onClick={handleAddProject}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Existing Projects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center gap-4">
              <Input
                defaultValue={project.name}
                onBlur={(e) => updateProject(project.id, { name: e.target.value, color: project.color })}
              />
              <Input
                type="color"
                defaultValue={project.color}
                className="w-20"
                onBlur={(e) => updateProject(project.id, { name: project.name, color: e.target.value })}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}