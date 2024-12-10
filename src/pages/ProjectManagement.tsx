import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCreator } from '@/components/ProjectCreator';
import { TagCreator } from '@/components/TagCreator';
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

export default function ProjectManagement() {
  const { projects, tags, updateProject, updateTag, deleteProject, deleteTag } = useTodoStore();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'project' | 'tag', id: string } | null>(null);

  const handleDelete = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'project') {
      deleteProject(itemToDelete.id);
      toast.success('Project deleted successfully');
    } else {
      deleteTag(itemToDelete.id);
      toast.success('Tag deleted successfully');
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const confirmDelete = (type: 'project' | 'tag', id: string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Project & Tag Management</h1>
      </div>

      <div className="grid gap-6">
        <ProjectCreator />
        <TagCreator />

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Existing Projects</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center gap-4 p-4 border rounded-lg">
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
                  className="w-20"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => confirmDelete('project', project.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Existing Tags</h2>
          <div className="grid gap-4">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <input
                  type="text"
                  defaultValue={tag.name}
                  onBlur={(e) => updateTag(tag.id, { name: e.target.value, color: tag.color })}
                  className="flex-1 bg-transparent border-none focus:outline-none"
                />
                <input
                  type="color"
                  defaultValue={tag.color}
                  onChange={(e) => updateTag(tag.id, { name: tag.name, color: e.target.value })}
                  className="w-20"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => confirmDelete('tag', tag.id)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
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