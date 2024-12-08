import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgressStats } from '@/components/ProgressStats';

export default function Analytics() {
  return (
    <div className="container max-w-4xl py-6 space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Analytics & Progress</h1>
      </div>

      <ProgressStats />
    </div>
  );
}