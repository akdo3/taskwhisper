import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useTodoStore } from '../../store/todoStore';

export const CalendarView = () => {
  const { tasks } = useTodoStore();
  
  const events = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    backgroundColor: task.completed ? '#10B981' : getPriorityColor(task.priority),
  }));

  return (
    <div className="h-[600px] bg-background p-4 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="100%"
      />
    </div>
  );
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return '#EF4444';
    case 'high': return '#F97316';
    case 'medium': return '#F59E0B';
    case 'low': return '#10B981';
    default: return '#6B7280';
  }
};