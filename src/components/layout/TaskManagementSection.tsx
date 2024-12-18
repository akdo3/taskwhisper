import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskForm } from '@/components/TaskForm';
import { TaskRecommender } from '@/components/AIRecommendations/TaskRecommender';
import { SmartSuggestions } from '@/components/SmartSuggestions';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const TaskManagementSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-3">
        <div className="grid gap-4">
          <div className="bg-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Task Management</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create and manage your tasks here</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <TaskRecommender />
            <SmartSuggestions />
            <div className="animate-slide-in [--slide-in-delay:700ms]">
              <TaskForm />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <PomodoroTimer />
      </div>
    </div>
  );
};