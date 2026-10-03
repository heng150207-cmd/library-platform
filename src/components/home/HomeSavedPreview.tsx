"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Bookmark, BookOpen } from "lucide-react";

interface SavedBook {
  key: string;
  title: string;
  covers?: number[];
}

export default function HomeSavedPreview() {
  const [books, setBooks] = useState<SavedBook[]>([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadBooks = async () => {
      const saved = localStorage.getItem("savedBooks");

      if (!saved) {
        return;
      }

      try {
        const ids: string[] = JSON.parse(saved);

        setTotal(ids.length);

        const firstThree = ids.slice(0, 3);

        const results = await Promise.all(
          firstThree.map(async (id) => {
            const response = await fetch(
              `https://openlibrary.org/works/${encodeURIComponent(id)}.json`,
            );

            if (!response.ok) {
              return null;
            }

            return response.json();
          }),
        );

        setBooks(results.filter((book): book is SavedBook => book !== null));
      } catch {
        setBooks([]);
        setTotal(0);
      }
    };

    loadBooks();
  }, []);

  return (
    <section className="rounded-2xl border border-[#ebe4da] p-5 dark:border-border">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Saved Books</h2>

          <p className="text-xs text-muted-foreground">{total} saved</p>
        </div>

        <Link
          href="/books/saved"
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          View All
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="flex min-h-[170px] flex-col items-center justify-center text-center">
          <Bookmark className="h-7 w-7 text-muted-foreground" />

          <p className="mt-3 text-sm font-medium">No saved books</p>

          <Link
            href="/books"
            className="mt-2 text-xs text-muted-foreground hover:underline"
          >
            Find a book to save
          </Link>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {books.map((book, index) => {
            const id = book.key.split("/").filter(Boolean).pop();

            const coverId = book.covers?.find((cover) => cover > 0);

            return (
              <Link
                key={`${book.key}-${index}`}
                href={id ? `/books/${id}` : "/books"}
                className="group flex items-center gap-3"
              >
                <div className="flex h-14 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                  {coverId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-4 w-4" />
                  )}
                </div>

                <p className="line-clamp-2 flex-1 text-sm font-medium group-hover:underline">
                  {book.title}
                </p>

                <Bookmark className="h-4 w-4 fill-current text-[#b59861]" />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
