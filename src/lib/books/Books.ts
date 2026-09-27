// lib/books.ts
export type CoverSize = "S" | "M" | "L";

export interface OpenLibraryEdition {
  title: string;
  subtitle?: string;
  isbn_10?: string[];
  isbn_13?: string[];
  covers?: number[];
  publishers?: string[];
  publish_date?: string;
  number_of_pages?: number;
  physical_format?: string;
  subjects?: string[];
  key: string; // e.g. "/books/OL7353617M"
}

export interface Book {
  isbn: string;
  title: string;
  subtitle?: string;
  publisher?: string;
  publishDate?: string;
  pages?: number;
  format: string;
  tags: string[];
  category: string;
  coverId?: number;
  href: string;
}

// https://openlibrary.org/isbn/{{isbn}}.json
export const isbnUrl = (isbn: string) =>
  `https://openlibrary.org/isbn/${encodeURIComponent(isbn)}.json`;

// https://covers.openlibrary.org/b/{{cover_key}}/{{cover_value}}-{{cover_size}}.jpg
// cover_key   = "id" | "isbn" | "olid" ...
// cover_value = the id / isbn / olid
export const coverUrl = (
  key: "id" | "isbn" | "olid",
  value: string | number,
  size: CoverSize = "M",
) =>
  `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg?default=false`;

export function toBook(isbn: string, e: OpenLibraryEdition): Book {
  const tags = (e.subjects ?? []).slice(0, 4).map((s) => s.toLowerCase());
  return {
    isbn,
    title: e.subtitle ? `${e.title} – ${e.subtitle}` : e.title,
    subtitle: e.subtitle,
    publisher: e.publishers?.[0],
    publishDate: e.publish_date,
    pages: e.number_of_pages,
    format: e.physical_format ?? "Book",
    tags,
    category: e.subjects?.[0] ?? e.publishers?.[0] ?? "General",
    coverId: e.covers?.find((c) => c > 0),
    href: `https://openlibrary.org${e.key}`,
  };
}

export const DEFAULT_ISBNS = [
  "9780140328721", // Fantastic Mr. Fox
  "9780451524935", // 1984
  "9780261103573", // The Fellowship of the Ring
  "9780747532699", // Harry Potter and the Philosopher's Stone
  "9780061120084", // To Kill a Mockingbird
  "9780743273565", // The Great Gatsby
];
