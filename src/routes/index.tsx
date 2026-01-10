import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: () => (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter company ticker"
            className="flex-1"
          />
          <Button type="button">Search</Button>
        </div>
      </div>
    </div>
  ),
});
