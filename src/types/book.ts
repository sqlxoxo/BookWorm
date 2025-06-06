export interface OpenLibrarySearchResultDoc {
  key: string;
  type: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number; // Cover ID
  isbn?: string[];
  publisher?: string[];
  language?: string[];
  subject?: string[];
  id_goodreads?: string[];
  id_librarything?: string[];
}

export interface OpenLibrarySearchResult {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: OpenLibrarySearchResultDoc[];
  q: string;
  offset: number | null;
}
