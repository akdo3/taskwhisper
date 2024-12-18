import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
      content: "Your personal task management assistant. Let's explore the key features together.",
      icon: "👋",
      tooltips: ["Click Next to start the tour", "You can dismiss this guide anytime"]
    },
    {
      title: "Create and Organize Tasks",
      content: "Add tasks quickly with the + button. Set priorities, due dates, and add details to stay organized.",
      icon: "✏️",
      tooltips: ["Try creating a task now!", "Use priorities to highlight important tasks"]
    },
    {
      title: "Smart Views",
      content: "Switch between List, Kanban, and Calendar views. Each view offers unique ways to organize your work.",
      icon: "👀",
      tooltips: ["Perfect for different work styles", "Try each view to find your preference"]
    },
    {
      title: "Projects & Categories",
      content: "Group related tasks into projects and categories. Track progress and maintain focus on what matters.",
      icon: "📁",
      tooltips: ["Create projects for major initiatives", "Use categories for better organization"]
    },
    {
      title: "Stay Productive",
      content: "Use the Pomodoro Timer for focused work sessions. Track your progress with detailed analytics.",
      icon: "⏱️",
      tooltips: ["25-minute focus sessions", "5-minute breaks to stay fresh"]
    },
    {
      title: "Personalization",
      content: "Make TaskWhisper yours with custom themes, keyboard shortcuts, and notification preferences.",
      icon: "🎨",
      tooltips: ["Choose from various themes", "Set up notifications"]
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
                  <div className="flex gap-2 mt-2">
                    {steps[currentStep].tooltips.map((tooltip, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  localStorage.setItem('hasSeenGuide', 'true');
                  onDismiss();
                }}
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
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {currentStep < steps.length - 1 ? (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};