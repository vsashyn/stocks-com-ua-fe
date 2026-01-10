import { useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const trimmedTicker = ticker.trim().toUpperCase();
    if (trimmedTicker) {
      void navigate({
        to: '/ticker/$ticker',
        params: { ticker: trimmedTicker },
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter company ticker"
            className="flex-1"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
    </div>
  );
}
