import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useTodoStore } from '../../store/todoStore';
import { TaskItem } from '../TaskItem';

export const KanbanView = () => {
  const { tasks, updateTask } = useTodoStore();

  const columns = [
    { id: 'todo', title: 'To Do', tasks: tasks.filter(t => !t.completed) },
    { id: 'done', title: 'Done', tasks: tasks.filter(t => t.completed) },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id === 'done';
    
    updateTask(taskId, { completed: newStatus });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {columns.map(column => (
          <div
            key={column.id}
            id={column.id}
            className="bg-muted p-4 rounded-lg"
          >
            <h3 className="font-semibold mb-4">{column.title}</h3>
            <div className="space-y-4">
              {column.tasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
};