import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, FileTemplate } from 'lucide-react';
import { Task } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';

interface TaskTemplate {
  id: string;
  name: string;
  template: Omit<Task, 'id'>;
}

export const TaskTemplateList = () => {
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [newTemplateName, setNewTemplateName] = useState('');
  const { tasks, addTask } = useTodoStore();

  const saveAsTemplate = (task: Task) => {
    const { id, ...templateData } = task;
    const newTemplate: TaskTemplate = {
      id: Math.random().toString(),
      name: newTemplateName || 'New Template',
      template: templateData,
    };
    setTemplates([...templates, newTemplate]);
    toast.success('Template saved successfully');
  };

  const useTemplate = (template: TaskTemplate) => {
    addTask(template.template);
    toast.success('Task created from template');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Template name"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
        />
        <Button onClick={() => saveAsTemplate(tasks[0])} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>

      <div className="grid gap-2">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <div className="flex items-center gap-2">
              <FileTemplate className="h-4 w-4" />
              <span>{template.name}</span>
            </div>
            <Button onClick={() => useTemplate(template)} variant="ghost">
              Use Template
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};