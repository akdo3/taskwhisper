import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Repeat } from 'lucide-react';

interface TaskFormRecurrenceProps {
  recurrenceType?: string;
  setRecurrenceType: (value: any) => void;
  recurrenceInterval: number;
  setRecurrenceInterval: (value: number) => void;
}

export const TaskFormRecurrence = ({
  recurrenceType,
  setRecurrenceType,
  recurrenceInterval,
  setRecurrenceInterval,
}: TaskFormRecurrenceProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Select
        value={recurrenceType}
        onValueChange={setRecurrenceType}
      >
        <SelectTrigger className="w-[180px]">
          <Repeat className="w-4 h-4 mr-2" />
          <SelectValue placeholder="Recurrence" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="yearly">Yearly</SelectItem>
        </SelectContent>
      </Select>
      
      {recurrenceType && (
        <Input
          type="number"
          min="1"
          value={recurrenceInterval}
          onChange={(e) => setRecurrenceInterval(parseInt(e.target.value) || 1)}
          className="w-24"
          placeholder="Interval"
        />
      )}
    </div>
  );
};