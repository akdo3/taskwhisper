import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTodoStore } from '@/store/todoStore';
import { toast } from 'sonner';

export const TagCreator = () => {
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#8B5CF6');
  const { addTag } = useTodoStore();

  const handleAddTag = () => {
    if (!newTagName.trim()) {
      toast.error('Please enter a tag name');
      return;
    }
    addTag({ name: newTagName, color: newTagColor });
    setNewTagName('');
    toast.success('Tag added successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Create Tag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Input
            placeholder="Tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="flex-1"
          />
          <Input
            type="color"
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="w-20"
          />
          <Button onClick={handleAddTag}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};