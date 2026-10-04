"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BookCard, { BookType } from "./BookCard";
import BookSearch from "./BookSearch";

interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: BookType[];
}

const LIMIT = 20;

export default function BookList() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("programming");
  const [totalBooks, setTotalBooks] = useState(0);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalBooks / LIMIT));

  const fetchBooks = async (query: string, pageNumber: number) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${LIMIT}&page=${pageNumber}`,
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
    fetchBooks(search, page);
  }, [search, page]);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1); // new search starts from the first page
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <BookSearch onSearch={handleSearch} defaultValue="programming" />
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
            onClick={() => fetchBooks(search, page)}
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <BookCard
                    key={`${book.key}-${index}`}
                    book={book}
                    priority={index < 4}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="flex h-12 items-center gap-2 rounded-2xl border border-[#DDE2F2] bg-white px-5 text-sm font-semibold text-[#655CC1] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#F5F2FF] disabled:pointer-events-none disabled:opacity-50 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#C2BCFF] dark:hover:bg-[#272039]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-200/50">
                  {page}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  className="flex h-12 items-center gap-2 rounded-2xl border border-[#DDE2F2] bg-white px-5 text-sm font-semibold text-[#655CC1] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#F5F2FF] disabled:pointer-events-none disabled:opacity-50 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#C2BCFF] dark:hover:bg-[#272039]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
