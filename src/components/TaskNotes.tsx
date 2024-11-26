import { useState } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { StickyNote } from 'lucide-react';

interface TaskNotesProps {
  notes?: string;
  onUpdateNotes: (notes: string) => void;
}

export const TaskNotes = ({ notes, onUpdateNotes }: TaskNotesProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || '');

  const handleSave = () => {
    onUpdateNotes(editedNotes);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <Textarea
          value={editedNotes}
          onChange={(e) => setEditedNotes(e.target.value)}
          placeholder="Add notes..."
          className="min-h-[100px]"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave}>Save Notes</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="cursor-pointer p-2 rounded hover:bg-gray-50"
      onClick={() => setIsEditing(true)}
    >
      {notes ? (
        <p className="text-gray-600 whitespace-pre-wrap">{notes}</p>
      ) : (
        <div className="flex items-center gap-2 text-gray-400">
          <StickyNote className="w-4 h-4" />
          <span>Add notes...</span>
        </div>
      )}
    </div>
  );
};