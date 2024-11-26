import { useTodoStore } from '../store/todoStore';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const {
    tasks,
    selectedProjectId,
    toggleTask,
    deleteTask,
    toggleSubtask,
    deleteSubtask,
    addSubtask,
    updateTask
  } = useTodoStore();

  const filteredTasks = selectedProjectId
    ? tasks.filter((task) => task.projectId === selectedProjectId)
    : tasks;

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={updateTask}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onDeleteSubtask={deleteSubtask}
        />
      ))}
    </div>
  );
};