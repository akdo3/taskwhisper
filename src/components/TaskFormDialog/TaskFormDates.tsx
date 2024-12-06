import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Bell } from 'lucide-react';
import { format } from 'date-fns';

interface TaskFormDatesProps {
  dueDate?: Date;
  setDueDate: (date?: Date) => void;
  reminder?: Date;
  setReminder: (date?: Date) => void;
}

export const TaskFormDates = ({
  dueDate,
  setDueDate,
  reminder,
  setReminder,
}: TaskFormDatesProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {dueDate ? format(dueDate, 'PPP') : 'Set due date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={setDueDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Bell className="w-4 h-4 mr-2" />
            {reminder ? format(reminder, 'PPP') : 'Set reminder'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={reminder}
            onSelect={setReminder}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};