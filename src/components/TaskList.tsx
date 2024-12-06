import { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { TaskItem } from './TaskItem';
import { TaskSearch } from './TaskSearch';

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

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const filteredTasks = tasks
    .filter((task) => {
      const matchesProject = selectedProjectId ? task.projectId === selectedProjectId : true;
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;
      return matchesProject && matchesSearch && matchesPriority;
    });

  return (
    <div className="space-y-4">
      <TaskSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
      />
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
        {filteredTasks.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
};