import { List, FolderKanban, Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

interface ViewSelectorProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const ViewSelector = ({ currentView, onViewChange }: ViewSelectorProps) => {
  const { t } = useTranslation();

  return (
    <Tabs 
      value={currentView} 
      onValueChange={onViewChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="list" className="flex items-center gap-2">
          <List className="h-4 w-4" />
          {t('listView')}
        </TabsTrigger>
        <TabsTrigger value="kanban" className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4" />
          {t('kanbanView')}
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {t('calendarView')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};