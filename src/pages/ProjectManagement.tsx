import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCreator } from '@/components/ProjectCreator';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ProjectManagement() {
  const { projects, categories, updateProject, updateCategory, deleteProject, deleteCategory, addCategory } = useTodoStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'project' | 'category', id: string } | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'project') {
      deleteProject(itemToDelete.id);
      toast.success('Project deleted successfully');
    } else {
      deleteCategory(itemToDelete.id);
      toast.success('Category deleted successfully');
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = (type: 'project' | 'category', id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Please enter a category name');
      return;
    }
    addCategory({
      name: newCategoryName,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      description: ''
    });
    setNewCategoryName('');
    toast.success('Category added successfully');
  };

  return (
    <div className="container max-w-4xl py-6 px-4 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon" className="touch-target">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold">Project & Category Management</h1>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectCreator />
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} 
                    className="flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                    <FolderOpen className="h-5 w-5" style={{ color: project.color }} />
                    <input
                      type="text"
                      defaultValue={project.name}
                      onBlur={(e) => updateProject(project.id, { name: e.target.value, color: project.color })}
                      className="flex-1 bg-transparent border-none focus:outline-none"
                    />
                    <input
                      type="color"
                      defaultValue={project.color}
                      onChange={(e) => updateProject(project.id, { name: project.name, color: e.target.value })}
                      className="w-12 h-8 rounded cursor-pointer"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete('project', project.id)}
                      className="text-destructive hover:text-destructive/90 touch-target"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="New category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddCategory}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <ScrollArea className="h-[300px] mt-4">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} 
                    className="flex items-center gap-4 p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                    <input
                      type="text"
                      defaultValue={category.name}
                      onBlur={(e) => updateCategory(category.id, { name: e.target.value, color: category.color })}
                      className="flex-1 bg-transparent border-none focus:outline-none"
                    />
                    <input
                      type="color"
                      defaultValue={category.color}
                      onChange={(e) => updateCategory(category.id, { name: category.name, color: e.target.value })}
                      className="w-12 h-8 rounded cursor-pointer"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => confirmDelete('category', category.id)}
                      className="text-destructive hover:text-destructive/90 touch-target"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {itemToDelete?.type}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}