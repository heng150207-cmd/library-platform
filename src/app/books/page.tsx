import BookList from "@/components/books/BookList";
import type { Metadata } from "next";

const description =
  "Search and browse books from Open Library. Find your next read by title, author, or topic.";

export const metadata: Metadata = {
  title: "Books",
  description,
  keywords: ["Books", "Book Search", "Open Library", "Reading", "JUST READ"],
  openGraph: {
    title: "Books | JUST READ",
    description,
    siteName: "JUST READ",
    type: "website",
    url: "/books",
    images: [
      {
        url: "/images/just-read-thumbnail.png",
        width: 1200,
        height: 630,
        alt: "JUST READ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books | JUST READ",
    description,
    images: ["/images/just-read-thumbnail.png"],
  },
};

export default function BooksPage() {
  return (
    <main className="min-h-screen">
      <BookList />
    </main>
  );
}
