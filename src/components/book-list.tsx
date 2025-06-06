import type { OpenLibrarySearchResultDoc } from '@/types/book';
import { BookCard } from './book-card';

interface BookListProps {
  books: OpenLibrarySearchResultDoc[];
}

export function BookList({ books }: BookListProps) {
  if (!books || books.length === 0) {
    return <p className="text-center text-muted-foreground font-body">No books to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}
