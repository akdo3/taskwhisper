import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagsManagerProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
  availableTags: Tag[];
}

export const TagsManager = ({ selectedTags, onTagsChange, availableTags }: TagsManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTag, setNewTag] = useState({ name: '', color: '#8B5CF6' });

  const handleAddTag = () => {
    if (!newTag.name.trim()) {
      toast.error('Please enter a tag name');
      return;
    }

    const tag = {
      id: Math.random().toString(),
      name: newTag.name.trim(),
      color: newTag.color,
    };

    onTagsChange([...selectedTags, tag]);
    setNewTag({ name: '', color: '#8B5CF6' });
    setIsAdding(false);
    toast.success('Tag added successfully');
  };

  const handleRemoveTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            variant="outline"
            style={{ backgroundColor: tag.color + '20', borderColor: tag.color }}
          >
            {tag.name}
            <button
              onClick={() => handleRemoveTag(tag.id)}
              className="ml-2 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      {isAdding ? (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Tag name"
              value={newTag.name}
              onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
              className="flex-1"
            />
            <Input
              type="color"
              value={newTag.color}
              onChange={(e) => setNewTag({ ...newTag, color: e.target.value })}
              className="w-20"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddTag} className="flex-1">
              Add Tag
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAdding(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tag
        </Button>
      )}
    </div>
  );
};