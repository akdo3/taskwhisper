import { useState } from 'react';
import { Paperclip, Link, Image, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Attachment } from '../types/todo';
import { toast } from 'sonner';

interface TaskAttachmentsProps {
  attachments: Attachment[];
  onAddAttachment: (attachment: Attachment) => void;
  onRemoveAttachment: (attachmentId: string) => void;
}

export const TaskAttachments = ({
  attachments,
  onAddAttachment,
  onRemoveAttachment,
}: TaskAttachmentsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newAttachment, setNewAttachment] = useState({
    type: 'url' as const,
    url: '',
    title: '',
  });

  const handleAddAttachment = () => {
    if (!newAttachment.url.trim() || !newAttachment.title.trim()) {
      toast.error('Please fill in both URL and title');
      return;
    }

    onAddAttachment({
      ...newAttachment,
      id: Math.random().toString(),
    });

    setNewAttachment({ type: 'url', url: '', title: '' });
    setIsAdding(false);
  };

  const getAttachmentIcon = (type: Attachment['type']) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'document':
        return <Paperclip className="w-4 h-4" />;
      case 'url':
        return <Link className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="flex items-center gap-2 bg-gray-50 p-2 rounded"
        >
          {getAttachmentIcon(attachment.type)}
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-blue-500 hover:underline"
          >
            {attachment.title}
          </a>
          <button
            onClick={() => onRemoveAttachment(attachment.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      {isAdding ? (
        <div className="space-y-2">
          <Input
            placeholder="Title"
            value={newAttachment.title}
            onChange={(e) =>
              setNewAttachment((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="URL"
            value={newAttachment.url}
            onChange={(e) =>
              setNewAttachment((prev) => ({ ...prev, url: e.target.value }))
            }
          />
          <div className="flex gap-2">
            <Button onClick={handleAddAttachment}>Add</Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
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
          <Paperclip className="w-4 h-4 mr-2" />
          Add Attachment
        </Button>
      )}
    </div>
  );
};