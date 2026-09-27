import BookList from "@/components/books/BookList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
};
export default function BooksPage() {
  return (
    <main className="min-h-screen">
      <BookList />
    </main>
  );
}