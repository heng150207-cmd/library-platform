// app/books/page.tsx
import BooksBrowser from "@/components/books/BooksBrowser";

export const metadata = { title: "Browse Books" };

export default function BooksPage() {
  return <BooksBrowser />;
}
