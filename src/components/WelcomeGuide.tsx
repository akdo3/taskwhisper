import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface WelcomeGuideProps {
  onDismiss: () => void;
}

export const WelcomeGuide = ({ onDismiss }: WelcomeGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (hasSeenGuide) {
      setShouldShow(false);
      onDismiss();
    }
  }, [onDismiss]);

  const steps = [
    {
      title: "Welcome to TaskWhisper!",
      content: "Your personal task management assistant. Let's get you started with the basics.",
      icon: "👋"
    },
    {
      title: "Create and Organize Tasks",
      content: "Click the 'Add Task' button to create new tasks. Add details, due dates, and set priorities to stay organized.",
      icon: "✏️"
    },
    {
      title: "Multiple Views",
      content: "Switch between List, Kanban, and Calendar views to organize your tasks in the way that works best for you.",
      icon: "👀"
    },
    {
      title: "Projects and Categories",
      content: "Group related tasks into projects and categories for better organization and tracking.",
      icon: "📁"
    },
    {
      title: "Stay Productive",
      content: "Use the Pomodoro Timer to maintain focus and take regular breaks. Track your progress with analytics.",
      icon: "⏱️"
    },
    {
      title: "Customize Your Experience",
      content: "Change themes, language, and notification preferences in the settings to make TaskWhisper work for you.",
      icon: "🎨"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('hasSeenGuide', 'true');
      onDismiss();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{steps[currentStep].icon}</span>
                <div>
                  <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
                  <p className="text-muted-foreground mt-1">{steps[currentStep].content}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  localStorage.setItem('hasSeenGuide', 'true');
                  onDismiss();
                }} 
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center mt-6">
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
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {currentStep < steps.length - 1 ? "Next" : "Get Started"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};