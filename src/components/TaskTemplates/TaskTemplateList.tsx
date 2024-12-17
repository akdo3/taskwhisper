import { TaskTemplate } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const TaskTemplateList = () => {
  const templates = useTodoStore(state => state.templates);

  const useTemplate = (template: TaskTemplate) => {
    // Implementation for using a template will go here
    toast.success(`Using template: ${template.name}`);
  };

  return (
    <div className="space-y-2">
      {templates.map((template) => (
        <div
          key={template.id}
          className="flex items-center justify-between p-2 border rounded-lg"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{template.name}</span>
          </div>
          <Button onClick={() => useTemplate(template)} variant="ghost">
            Use Template
          </Button>
        </div>
      ))}
    </div>
  );
};