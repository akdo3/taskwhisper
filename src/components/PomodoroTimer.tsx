import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast.success(isBreak ? 'Break finished!' : 'Pomodoro completed!');
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="text-4xl font-bold">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <div className="flex gap-2">
          <Button onClick={toggleTimer} variant="outline">
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={resetTimer} variant="outline">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};