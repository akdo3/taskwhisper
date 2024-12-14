import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priorityFilter: string;
  onPriorityFilterChange: (value: string) => void;
}

export const TaskSearch = ({
  searchTerm,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
}: TaskSearchProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg shadow-sm">
      <TooltipProvider>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
                aria-label={t('searchPlaceholder')}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Search for tasks by title or description</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t('filterByPriority')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter tasks by priority level</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};