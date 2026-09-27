export type Sort = "relevance" | "rating" | "readinglog";
export type Access = "public" | "borrowable" | "none";

export interface Book {
  id: string; // Open Library work id, e.g. OL45804W
  title: string;
  authors: string[];
  year?: number;
  coverId?: number;
  editions: number;
  subjects: string[];
  rating?: number;
  ratings: number;
  wantToRead: number;
  access: Access;
}

export interface BooksResponse {
  books: Book[];
  total: number;
  hasMore: boolean;
}
