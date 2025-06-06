import { BookSearchForm } from '@/components/book-search-form';
import { BookList } from '@/components/book-list';
import { searchBooks } from '@/lib/openlibrary';
import { Suspense } from 'react';
import { Library } from 'lucide-react';
import { BookListLoadingSkeleton } from '@/components/book-list-loading';

// This component handles fetching and displaying results, or error/empty states.
// It is only rendered when a query is present.
async function FetchAndDisplayResults({ query }: { query: string }) {
  try {
    const books = await searchBooks(query);
    if (books.length === 0) {
      return <p className="text-muted-foreground text-center pt-10 font-body">No books found for "{query}".</p>;
    }
    return <BookList books={books} />;
  } catch (err) {
    // Error is already logged in searchBooks, here we just display a user-friendly message.
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    return <p className="text-destructive text-center pt-10 font-body">Error: {errorMessage}</p>;
  }
}

export default function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 min-h-screen flex flex-col bg-background text-foreground">
      <header className="mb-8 md:mb-12 text-center">
         <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-semibold mb-3 text-primary-foreground bg-primary py-3 px-6 rounded-lg inline-block shadow-xl">
          BookWorm
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground mt-2">
          Your portal to literary adventures.
        </p>
      </header>

      <div className="w-full max-w-2xl mx-auto mb-8 md:mb-12">
        <BookSearchForm initialQuery={query} />
      </div>
      
      <main className="flex-grow">
        {query ? (
          <Suspense fallback={<BookListLoadingSkeleton />}>
            <FetchAndDisplayResults query={query} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground pt-10 opacity-75">
            <Library size={64} className="mb-4" strokeWidth={1.5} />
            <p className="font-body text-xl text-center">
              Enter a book title, author, or keyword to start your search.
            </p>
          </div>
        )}
      </main>

      <footer className="py-8 mt-16 text-center border-t border-border">
        <p className="font-body text-sm text-muted-foreground">
          Powered by Open Library | BookWorm &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
