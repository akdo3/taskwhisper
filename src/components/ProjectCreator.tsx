import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';

export const ProjectCreator = () => {
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState('#8B5CF6');
  const { addProject } = useTodoStore();

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Create Project</CardTitle>
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
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};