import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskFormDates } from '../TaskFormDialog/TaskFormDates';
import { TaskFormRecurrence } from '../TaskFormDialog/TaskFormRecurrence';
import { TaskAttachments } from '../TaskAttachments';
import { TagsManager } from '../TagsManager';
import { ProjectSelector } from './ProjectSelector';
import { CategorySelector } from './CategorySelector';
import { SubtaskManager } from './SubtaskManager';

interface TaskFormTabsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  reminder: Date | undefined;
  setReminder: (date: Date | undefined) => void;
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined;
  setRecurrenceType: (type: 'daily' | 'weekly' | 'monthly' | 'yearly' | undefined) => void;
  recurrenceInterval: number;
  setRecurrenceInterval: (interval: number) => void;
  attachments: Array<{ id: string; type: 'url' | 'image' | 'document'; url: string; title: string }>;
  setAttachments: (attachments: Array<{ id: string; type: 'url' | 'image' | 'document'; url: string; title: string }>) => void;
  tags: Array<{ id: string; name: string; color: string }>;
  setTags: (tags: Array<{ id: string; name: string; color: string }>) => void;
  categoryId: string | undefined;
  setCategoryId: (id: string | undefined) => void;
  projectId: string | undefined;
  setProjectId: (id: string | undefined) => void;
  subtasks: Array<{ id: string; title: string; completed: false }>;
  setSubtasks: (subtasks: Array<{ id: string; title: string; completed: false }>) => void;
}

export const TaskFormTabs = ({
  date,
  setDate,
  reminder,
  setReminder,
  recurrenceType,
  setRecurrenceType,
  recurrenceInterval,
  setRecurrenceInterval,
  attachments,
  setAttachments,
  tags,
  setTags,
  categoryId,
  setCategoryId,
  projectId,
  setProjectId,
  subtasks,
  setSubtasks,
}: TaskFormTabsProps) => {
  return (
    <Tabs defaultValue="dates" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="dates">Dates</TabsTrigger>
        <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
        <TabsTrigger value="more">More</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dates" className="mt-4">
        <TaskFormDates
          dueDate={date}
          setDueDate={setDate}
          reminder={reminder}
          setReminder={setReminder}
        />
        <TaskFormRecurrence
          recurrenceType={recurrenceType}
          setRecurrenceType={setRecurrenceType}
          recurrenceInterval={recurrenceInterval}
          setRecurrenceInterval={setRecurrenceInterval}
        />
      </TabsContent>
      
      <TabsContent value="subtasks" className="mt-4">
        <SubtaskManager
          subtasks={subtasks}
          setSubtasks={setSubtasks}
        />
      </TabsContent>
      
      <TabsContent value="tags" className="mt-4">
        <TagsManager
          selectedTags={tags}
          onTagsChange={setTags}
          availableTags={[]}
        />
      </TabsContent>
      
      <TabsContent value="more" className="mt-4">
        <TaskAttachments
          attachments={attachments}
          onAddAttachment={(attachment) => setAttachments([...attachments, attachment])}
          onRemoveAttachment={(attachmentId) => 
            setAttachments(attachments.filter(a => a.id !== attachmentId))
          }
        />
      </TabsContent>
    </Tabs>
  );
};