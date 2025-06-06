import type { OpenLibrarySearchResult, OpenLibrarySearchResultDoc } from '@/types/book';

const API_BASE_URL = 'https://openlibrary.org';

export async function searchBooks(query: string): Promise<OpenLibrarySearchResultDoc[]> {
  if (!query.trim()) {
    return [];
  }

  const searchParams = new URLSearchParams({
    q: query,
    fields: 'key,type,title,author_name,first_publish_year,cover_i,isbn,publisher,language,subject,id_goodreads,id_librarything',
    limit: '20', // Limit results for performance
  });

  const url = `${API_BASE_URL}/search.json?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache results for 1 hour
    });

    if (!response.ok) {
      // Log more detailed error information if possible
      const errorBody = await response.text();
      console.error(`API Error ${response.status}: ${response.statusText}. Body: ${errorBody}`);
      throw new Error(`Failed to fetch books. Status: ${response.status}`);
    }

    const data: OpenLibrarySearchResult = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error searching books:', error);
    // Re-throw a more generic error or handle as appropriate
    if (error instanceof Error) {
        throw new Error(`An error occurred while searching for books: ${error.message}`);
    }
    throw new Error('An unknown error occurred while searching for books.');
  }
}

export function getBookCoverUrl(coverId?: number, size: 'S' | 'M' | 'L' = 'M'): string | null {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
  return null;
}
