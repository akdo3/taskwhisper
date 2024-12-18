import { useState } from 'react';
import { ProjectCreator } from '@/components/ProjectCreator';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTodoStore } from '@/store/todoStore';
import { Project } from '@/types/todo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ProjectManagement = () => {
  const projects = useTodoStore(state => state.projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="container py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          <ScrollArea className="h-[500px]">
            <Accordion type="single" collapsible>
              {projects.map((project) => (
                <AccordionItem key={project.id} value={project.id}>
                  <AccordionTrigger className="hover:bg-accent/50 px-4 rounded-lg">
                    {project.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="mt-2 flex gap-2">
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="text-sm text-primary hover:underline"
                      >
                        View Details
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
          <ProjectCreator />
        </Card>
      </div>
    </div>
  );
};