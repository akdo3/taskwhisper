import { useState } from 'react';
import { Search, Filter, Calendar, Tag, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { useTodoStore } from '@/store/todoStore';

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
  const [dateFilter, setDateFilter] = useState<Date>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { tags } = useTodoStore();

  const activeFilters = [
    priorityFilter && `Priority: ${priorityFilter}`,
    dateFilter && `Due: ${dateFilter.toLocaleDateString()}`,
    ...selectedTags.map(tag => `Tag: ${tag}`)
  ].filter(Boolean);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <DatePicker
                  date={dateFilter}
                  setDate={setDateFilter}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Select
                  value={selectedTags[selectedTags.length - 1] || ""}
                  onValueChange={(value) => {
                    if (value && !selectedTags.includes(value)) {
                      setSelectedTags([...selectedTags, value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add tags" />
                  </SelectTrigger>
                  <SelectContent>
                    {tags.map((tag) => (
                      <SelectItem key={tag.id} value={tag.name}>
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="gap-2"
            >
              {filter}
              <button
                onClick={() => {
                  if (filter.startsWith('Priority:')) onPriorityFilterChange('');
                  if (filter.startsWith('Due:')) setDateFilter(undefined);
                  if (filter.startsWith('Tag:')) {
                    const tagName = filter.replace('Tag: ', '');
                    setSelectedTags(selectedTags.filter(t => t !== tagName));
                  }
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onPriorityFilterChange('');
              setDateFilter(undefined);
              setSelectedTags([]);
            }}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};