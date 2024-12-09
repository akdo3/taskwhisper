import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SubtaskManagerProps {
  subtasks: Array<{ id: string; title: string; completed: false }>;
  setSubtasks: (subtasks: Array<{ id: string; title: string; completed: false }>) => void;
}

export const SubtaskManager = ({ subtasks, setSubtasks }: SubtaskManagerProps) => {
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { id: Math.random().toString(), title: newSubtask, completed: false }]);
    setNewSubtask('');
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Add a subtask..."
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
        />
        <Button onClick={handleAddSubtask} variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2 bg-muted p-2 rounded-md">
            <span className="flex-1">{subtask.title}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSubtask(subtask.id)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};