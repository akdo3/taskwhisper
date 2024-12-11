import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface WelcomeGuideProps {
  onDismiss: () => void;
}

export const WelcomeGuide = ({ onDismiss }: WelcomeGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to TaskWhisper!",
      content: "Your personal task management assistant. Let's get you started with the basics.",
    },
    {
      title: "Create Tasks",
      content: "Click the 'Add Task' button to create new tasks. You can add details, due dates, and set priorities.",
    },
    {
      title: "Different Views",
      content: "Switch between List, Kanban, and Calendar views to organize your tasks in the way that works best for you.",
    },
    {
      title: "Stay Focused",
      content: "Use the Pomodoro Timer to maintain productivity and take regular breaks.",
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onDismiss();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
              <p className="text-muted-foreground mt-1">{steps[currentStep].content}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onDismiss}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-6 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <Button onClick={handleNext}>
              {currentStep < steps.length - 1 ? "Next" : "Get Started"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};