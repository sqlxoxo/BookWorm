'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';

interface BookSearchFormProps {
  initialQuery?: string;
}

export function BookSearchForm({ initialQuery = '' }: BookSearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Sync input field if URL query changes externally
    setSearchTerm(searchParams.get('query') || '');
  }, [searchParams]);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      // If search term is cleared, navigate to the base page to show initial state
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by title, author, or keyword..."
        className="font-body flex-grow text-base"
        aria-label="Book search input"
      />
      <Button type="submit" variant="default" size="lg" className="font-body">
        <SearchIcon className="mr-2 h-5 w-5" />
        Search
      </Button>
    </form>
  );
}
