"use client";

import { useEffect, useState } from "react";

import BookCard, { BookType } from "./BookCard";

import BookSearch from "./BookSearch";

interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: BookType[];
}

export default function BookList() {
  const [books, setBooks] = useState<BookType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("all");

  const [totalBooks, setTotalBooks] = useState(0);

  const fetchBooks = async (query: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query,
        )}&limit=20`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.status}`);
      }

      const data: OpenLibraryResponse = await response.json();

      setBooks(data.docs ?? []);
      setTotalBooks(data.numFound ?? 0);
    } catch (error) {
      console.error("Failed to fetch books:", error);

      setError("Something went wrong while loading books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(search);
  }, [search]);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <section className="container mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Books</h1>

        <p className="text-muted-foreground mt-1">
          Search books from Open Library
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <BookSearch onSearch={handleSearch} defaultValue="all" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin" />

          <p className="text-muted-foreground">Loading books...</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
          <p className="text-red-500">{error}</p>

          <button
            type="button"
            onClick={() => fetchBooks(search)}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {books.length}
              </span>{" "}
              books from{" "}
              <span className="font-semibold text-foreground">
                {totalBooks.toLocaleString()}
              </span>{" "}
              results for{" "}
              <span className="font-semibold text-foreground">
                &quot;{search}&quot;
              </span>
            </p>
          </div>

          {books.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="text-xl font-semibold">No books found</h2>

              <p className="text-muted-foreground mt-2">Try another keyword.</p>
            </div>
          ) : (
            <div className="mx-auto grid w-[90%] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <BookCard
                  key={`${book.key}-${index}`}
                  book={book}
                  priority={index < 4}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
