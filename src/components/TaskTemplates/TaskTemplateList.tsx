import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, FileText } from 'lucide-react';
import { Task, TaskTemplate } from '@/types/todo';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';

export const TaskTemplateList = () => {
  const [newTemplateName, setNewTemplateName] = useState('');
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);

  const addTemplate = (task: Task) => {
    if (!newTemplateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    const newTemplate: TaskTemplate = {
      id: Math.random().toString(),
      name: newTemplateName,
      template: { ...task }
    };

    setTemplates([...templates, newTemplate]);
    setNewTemplateName('');
    toast.success('Template created successfully');
  };

  const useTemplate = (template: TaskTemplate) => {
    // Implementation for using a template will go here
    toast.success(`Using template: ${template.name}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Template name"
          value={newTemplateName}
          onChange={(e) => setNewTemplateName(e.target.value)}
        />
        <Button onClick={() => addTemplate({
          id: '',
          title: '',
          description: '',
          completed: false,
          projectId: '',
          priority: 'low',
          subtasks: [],
          attachments: [],
          tags: []
        })}>
          <Plus className="h-4 w-4 mr-2" />
          Add Template
        </Button>
      </div>

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
    </div>
  );
};