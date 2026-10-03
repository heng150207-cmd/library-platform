"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export interface BookType {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  language?: string[];
  subject?: string[];
}

interface BookCardProps {
  book: BookType;
  priority?: boolean;
}

const STORAGE_KEY = "savedBooks";

export default function BookCard({ book, priority = false }: BookCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const workId = book.key.split("/").filter(Boolean).pop();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  useEffect(() => {
    if (!workId) return;

    try {
      const savedBooksString = localStorage.getItem(STORAGE_KEY);

      if (!savedBooksString) {
        setIsSaved(false);
        return;
      }

      const savedBooks = JSON.parse(savedBooksString);

      if (!Array.isArray(savedBooks)) {
        setIsSaved(false);
        return;
      }

      setIsSaved(savedBooks.includes(workId));
    } catch {
      setIsSaved(false);
    }
  }, [workId]);

  const handleSaveBook = () => {
    if (!workId) return;

    let savedBooks: string[] = [];

    try {
      const savedBooksString = localStorage.getItem(STORAGE_KEY);

      if (savedBooksString) {
        const parsed = JSON.parse(savedBooksString);

        if (Array.isArray(parsed)) {
          savedBooks = parsed;
        }
      }
    } catch {
      savedBooks = [];
    }

    if (savedBooks.includes(workId)) {
      const updatedBooks = savedBooks.filter((id) => id !== workId);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

      setIsSaved(false);
    } else {
      const updatedBooks = [...savedBooks, workId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));

      setIsSaved(true);
    }

    window.dispatchEvent(new Event("savedBooksUpdated"));
  };

  const authorText = book.author_name?.length
    ? book.author_name.join(", ")
    : "Unknown Author";

  const subjects = book.subject ? [...new Set(book.subject)].slice(0, 6) : [];

  const publishedLabel = book.first_publish_year
    ? new Date(book.first_publish_year, 0, 1).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Unknown date";

  return (
    <div className="flex h-full flex-col rounded-2xl bg-[#131722] p-6 font-sans text-slate-300 transition-colors duration-300 hover:bg-[#161b28]">
      {/* Title */}
      <h3
        title={book.title}
        className="line-clamp-2 text-xl font-bold leading-7 text-white"
      >
        {book.title}
      </h3>

      {/* Tags */}
      <div className="mb-6 mt-6 flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 rounded-md bg-[#2a3143] px-3 py-1 text-xs font-medium text-slate-300">
          <svg
            className="h-3.5 w-3.5 text-green-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z" />
          </svg>
          {book.edition_count ? `${book.edition_count} editions` : "Edition"}
        </span>

        {(subjects.length > 0 ? subjects.slice(0, 5) : ["Open Library"]).map(
          (tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="max-w-[130px] truncate rounded-md bg-[#2a3143] px-3 py-1 text-xs font-medium text-slate-300"
            >
              {tag}
            </span>
          ),
        )}
      </div>

      {/* Stats */}
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#7aa2c8]">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Year:{" "}
            <span className="text-slate-300">
              {book.first_publish_year ?? "Unknown"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 016.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"
            />
          </svg>
          <span>
            Editions:{" "}
            <span className="text-slate-300">{book.edition_count ?? "—"}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[#4ade80]">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.005 3 16.182"
            />
          </svg>
          <span className="text-slate-300">
            {book.language?.length
              ? book.language
                  .slice(0, 3)
                  .map((l) => l.toUpperCase())
                  .join(", ")
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Cover - 80% width & height */}
      <div className="mb-5 flex justify-center">
        <div className="relative aspect-[3/4] w-[80%] flex-none overflow-hidden rounded-lg bg-black">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverUrl}
              alt={book.title}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
              No Cover
            </div>
          )}
        </div>
      </div>

      {/* Author */}
      <p title={authorText} className="mb-4 truncate text-sm text-slate-400">
        By <span className="font-medium text-slate-200">{authorText}</span>
      </p>

      {/* Footer */}
      <div className="mt-auto flex flex-col items-center justify-between gap-4 border-t border-[#2a3143] pt-6 sm:flex-row">
        {/* Left buttons */}
        <div className="flex w-full items-center gap-3 sm:w-auto">
          {workId ? (
            <Link
              href={`/books/${workId}`}
              className="flex items-center gap-2 rounded-lg bg-[#2a3143] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3a4153]"
            >
              More
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          ) : (
            <span className="flex items-center gap-2 rounded-lg bg-[#20263a] px-5 py-2.5 text-sm font-semibold text-slate-500">
              Unavailable
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsFavorited((prev) => !prev)}
            title="Favourite"
            className="flex items-center justify-center rounded-lg bg-[#2a3143] p-2.5 text-slate-300 transition-colors hover:bg-[#3a4153]"
          >
            <svg
              className={
                "h-5 w-5 " +
                (isFavorited ? "fill-[#eab308] text-[#eab308]" : "fill-none")
              }
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        </div>

        {/* Right info */}
        <div className="flex w-full items-center gap-4 text-xs text-slate-400 sm:w-auto sm:justify-end">
          <button
            type="button"
            onClick={handleSaveBook}
            title={isSaved ? "Remove from saved" : "Save book"}
            className={
              "flex items-center gap-1.5 transition-colors " +
              (isSaved ? "text-[#4ade80]" : "hover:text-slate-200")
            }
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            {isSaved ? "Saved" : "Save"}
          </button>

          <div className="flex items-center gap-1.5">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{publishedLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
