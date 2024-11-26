import { useTodoStore } from '../store/todoStore';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const { projects, selectedProjectId, selectProject } = useTodoStore();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      <div className="space-y-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => selectProject(project.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition-colors",
              selectedProjectId === project.id
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            )}
          >
            {project.name}
          </button>
        ))}
      </div>
    </div>
  );
};