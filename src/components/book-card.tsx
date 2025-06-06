import Image from 'next/image';
import type { OpenLibrarySearchResultDoc } from '@/types/book';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getBookCoverUrl } from '@/lib/openlibrary';
import { BookOpen, CalendarDays, UserCircle } from 'lucide-react';

interface BookCardProps {
  book: OpenLibrarySearchResultDoc;
}

export function BookCard({ book }: BookCardProps) {
  const coverUrl = getBookCoverUrl(book.cover_i, 'M');
  const authors = book.author_name?.join(', ') || 'Unknown Author';
  
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-border">
      <CardHeader className="p-0 relative aspect-[2/3] w-full">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false} // Set to true for above-the-fold images if needed
          />
        ) : (
          <div 
            className="w-full h-full bg-muted flex items-center justify-center"
            data-ai-hint="book cover placeholder"
          >
            <BookOpen className="w-16 h-16 text-muted-foreground opacity-50" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <CardTitle className="font-headline text-lg leading-tight mb-1">
            {book.title}
          </CardTitle>
          <CardDescription className="font-body text-sm text-muted-foreground mb-2 flex items-center">
            <UserCircle className="w-4 h-4 mr-1.5 text-accent" />
            {authors}
          </CardDescription>
        </div>
        {book.first_publish_year && (
          <p className="font-body text-xs text-muted-foreground mt-2 flex items-center">
            <CalendarDays className="w-3.5 h-3.5 mr-1.5 text-accent" />
            First published: {book.first_publish_year}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
