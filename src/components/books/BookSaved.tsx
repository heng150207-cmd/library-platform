"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookmarkCheck,
  BookOpen,
  CalendarDays,
  RefreshCcw,
  Trash2,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface SavedBook {
  key: string;
  title: string;
  covers?: number[];
  first_publish_date?: string;
  description?: string | { value: string };
}

interface SavedBookCardProps {
  book: SavedBook;
  index: number;
  onRemove: (bookKey: string) => void;
}

const STORAGE_KEY = "savedBooks";

function getDescription(description: SavedBook["description"] | undefined) {
  if (!description) {
    return "No description available for this book.";
  }

  if (typeof description === "string") {
    return description;
  }

  return description.value || "No description available for this book.";
}

function SavedBookCard({ book, index, onRemove }: SavedBookCardProps) {
  const [imageError, setImageError] = useState(false);

  const coverId = book.covers?.find((cover) => cover > 0);

  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : null;

  const workId = book.key.split("/").filter(Boolean).pop();
  const description = getDescription(book.description);

  return (
    <Card className="group/card relative flex h-full w-full flex-col gap-0 overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-0 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C7CEF0] hover:shadow-[0_20px_55px_rgba(91,78,190,0.16)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
      <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-gradient-to-r from-[#4867D6] via-[#6270D8] to-[#7A4FD8]" />

      {/* Cover */}
      <div className="relative h-80 min-h-80 overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#F7F8FF] to-[#F4EEFF] dark:from-[#202945] dark:via-[#252743] dark:to-[#33223F]">
        {coverUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={book.title}
            loading={index < 4 ? "eager" : "lazy"}
            onError={() => setImageError(true)}
            className="h-full w-full object-contain px-7 py-6 drop-shadow-xl transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#858AA0] dark:text-[#A1A7B9]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 text-[#665CC5] shadow-sm dark:bg-[#171C2C]/80 dark:text-[#BAB5FF]">
              <BookOpen className="h-8 w-8" />
            </div>

            <span className="text-sm font-medium">No Cover</span>
          </div>
        )}

        {/* Saved badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#655CC1] shadow-sm backdrop-blur dark:border-[#505A7B] dark:bg-[#181D2D]/90 dark:text-[#BEB7FF]">
          <BookmarkCheck className="h-3.5 w-3.5" />
          Saved
        </div>

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(book.key)}
          title="Remove saved book"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#7D8297] shadow-md backdrop-blur transition-all duration-200 hover:scale-110 hover:border-[#F3B8C3] hover:bg-[#FFF1F4] hover:text-[#DC4D68] active:scale-95 dark:border-[#535C78] dark:bg-[#171B29]/90 dark:text-[#A7ACBE] dark:hover:border-[#D66B82] dark:hover:bg-[#42222E] dark:hover:text-[#FF91A5] dark:hover:shadow-[0_0_0_1px_rgba(214,107,130,0.20),0_10px_28px_rgba(164,65,91,0.18)]"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col px-5 pb-4 pt-5">
        <div className="min-h-[72px]">
          <h3
            title={book.title}
            className="line-clamp-2 text-lg font-bold leading-6 text-[#292C43] transition group-hover/card:text-[#5D63C4] dark:text-[#F2F3F8] dark:group-hover/card:text-[#C3BDFF]"
          >
            {book.title}
          </h3>
        </div>

        {/* Published */}
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-[#E5E8F3] bg-gradient-to-r from-[#F7F9FF] to-[#FAF7FF] px-4 py-3 dark:border-[#3E4768] dark:from-[#20283F] dark:to-[#2A203A]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#5368CE] dark:bg-[#29365E] dark:text-[#9FAEFF]">
              <CalendarDays className="h-4 w-4" />
            </div>

            <span className="text-sm text-[#747A90] dark:text-[#ABB0C1]">
              Published
            </span>
          </div>

          <span className="max-w-[110px] truncate text-sm font-bold text-[#5368CE] dark:text-[#ABB8FF]">
            {book.first_publish_date ?? "Unknown"}
          </span>
        </div>

        {/* Description */}
        <div className="mt-4 min-h-[72px]">
          <p className="line-clamp-3 text-sm leading-6 text-[#7B8095] dark:text-[#A5AABC]">
            {description}
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto border-t border-[#E7EAF3] bg-gradient-to-r from-[#FAFBFF] to-[#FCFAFF] px-5 py-5 dark:border-[#343A57] dark:from-[#181E31] dark:to-[#251B32]">
        {workId ? (
          <Link
            href={`/books/${workId}`}
            className="group/button flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-200/50 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.24),0_14px_36px_rgba(108,85,220,0.30)]"
          >
            View Book
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        ) : (
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#F0F1F6] text-sm font-medium text-[#999EAF] dark:bg-[#292C38] dark:text-[#777D90]">
            Unavailable
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default function BookSaved() {
  const [books, setBooks] = useState<SavedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSavedBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const savedBooksString = localStorage.getItem(STORAGE_KEY);

      if (!savedBooksString) {
        setBooks([]);
        return;
      }

      let savedIds: string[] = [];

      try {
        const parsed = JSON.parse(savedBooksString);

        if (Array.isArray(parsed)) {
          savedIds = parsed;
        }
      } catch {
        savedIds = [];
      }

      if (savedIds.length === 0) {
        setBooks([]);
        return;
      }

      const requests = savedIds.map(async (id) => {
        try {
          const response = await fetch(
            `https://openlibrary.org/works/${encodeURIComponent(id)}.json`,
          );

          if (!response.ok) {
            return null;
          }

          const data: SavedBook = await response.json();
          return data;
        } catch {
          return null;
        }
      });

      const results = await Promise.all(requests);

      const validBooks = results.filter(
        (book): book is SavedBook => book !== null,
      );

      setBooks(validBooks);
    } catch (error) {
      console.error("Failed to load saved books:", error);
      setError("Failed to load your saved books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedBooks();
  }, []);

  const removeBook = (bookKey: string) => {
    const workId = bookKey.split("/").filter(Boolean).pop();

    if (!workId) return;

    const savedBooksString = localStorage.getItem(STORAGE_KEY);

    if (!savedBooksString) {
      return;
    }

    try {
      const parsed = JSON.parse(savedBooksString);
      const savedIds: string[] = Array.isArray(parsed) ? parsed : [];
      const updatedIds = savedIds.filter((id) => id !== workId);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book.key !== bookKey),
      );

      window.dispatchEvent(new Event("savedBooksUpdated"));
    } catch (error) {
      console.error("Failed to remove book:", error);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-5 rounded-[26px] border border-[#E3E7F2] bg-gradient-to-br from-[#FAFBFF] to-[#F8F5FF] dark:border-[#424B7A] dark:from-[#181F34] dark:to-[#251B35]">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#E3E7F6] border-t-[#6956CF] dark:border-[#343B58] dark:border-t-[#9F83FF]" />
          <BookOpen className="h-6 w-6 text-[#5C68C2] dark:text-[#A8B3FF]" />
        </div>

        <div className="text-center">
          <p className="font-semibold text-[#30344A] dark:text-[#F2F3F8]">
            Loading saved books
          </p>

          <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
            Getting your personal collection...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[26px] border border-[#E3E7F2] bg-white px-6 text-center dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:to-[#251B35]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#D7556D] dark:bg-[#43232F] dark:text-[#FF8298]">
          <BookOpen className="h-7 w-7" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#30344A] dark:text-[#F3F4F8]">
          Unable to load books
        </h2>

        <p className="mt-2 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
          {error}
        </p>

        <button
          type="button"
          onClick={loadSavedBooks}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg dark:from-[#566EE0] dark:to-[#8458D8]"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D73AF] dark:text-[#9995E8]">
            Personal Collection
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#24273D] dark:text-[#F3F4F8]">
            Saved Books
          </h1>

          <p className="mt-2 text-sm text-[#7B8095] dark:text-[#A5AABC]">
            Books you have saved for later.
          </p>
        </div>

        {books.length > 0 && (
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#EEF2FF] to-[#F4EEFF] px-4 py-2 text-sm font-semibold text-[#655CC1] dark:from-[#273253] dark:to-[#352548] dark:text-[#C2BCFF]">
            <BookmarkCheck className="h-4 w-4" />
            {books.length} {books.length === 1 ? "book" : "books"}
          </div>
        )}
      </div>

      {/* Empty */}
      {books.length === 0 ? (
        <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[#E3E7F2] bg-gradient-to-br from-[#FAFBFF] via-white to-[#F9F5FF] px-6 text-center dark:border-[#424B7A] dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#4867D6]/5 blur-3xl dark:bg-[#4867D6]/15" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#7A4FD8]/5 blur-3xl dark:bg-[#7A4FD8]/15" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] shadow-sm dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
            <BookOpen className="h-9 w-9" />
          </div>

          <h2 className="relative mt-5 text-2xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
            No saved books yet
          </h2>

          <p className="relative mt-2 max-w-md text-sm leading-6 text-[#81869B] dark:text-[#A2A8BA]">
            When you find a book you like, save it and it will appear in your
            personal collection here.
          </p>

          <Link
            href="/books"
            className="relative mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-6 text-sm font-semibold text-white shadow-lg shadow-purple-200/40 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]"
          >
            Browse Books
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book, index) => (
            <SavedBookCard
              key={book.key}
              book={book}
              index={index}
              onRemove={removeBook}
            />
          ))}
        </div>
      )}
    </section>
  );
}
