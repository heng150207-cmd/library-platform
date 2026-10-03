"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  ExternalLink,
  User,
} from "lucide-react";

interface BookAuthor {
  author?: {
    key?: string;
  };
}

interface BookLink {
  title?: string;
  url?: string;
}

interface BookWork {
  key: string;
  title: string;

  description?:
    | string
    | {
        type?: string;
        value?: string;
      };

  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;

  authors?: BookAuthor[];
  links?: BookLink[];
}

interface BookDetailProps {
  book: BookWork;
  bookId: string;
}

interface AuthorInfo {
  id: string;
  name: string;
}

function getDescription(description: BookWork["description"]): string {
  if (!description) {
    return "No description is available for this book.";
  }

  if (typeof description === "string") {
    return description;
  }

  if (typeof description.value === "string") {
    return description.value;
  }

  return "No description is available for this book.";
}

function getId(key?: string) {
  if (!key) return null;

  return key.split("/").filter(Boolean).pop();
}

export default function BookDetail({ book, bookId }: BookDetailProps) {
  const [saved, setSaved] = useState(false);

  const [imageError, setImageError] = useState(false);

  const [authorInfos, setAuthorInfos] = useState<AuthorInfo[]>([]);

  const [authorsLoading, setAuthorsLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedBooks");

      if (!stored) {
        setSaved(false);
        return;
      }

      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        setSaved(false);
        return;
      }

      setSaved(parsed.includes(bookId));
    } catch {
      setSaved(false);
    }
  }, [bookId]);

  useEffect(() => {
    setImageError(false);
  }, [bookId]);

  /* ============================================
     FETCH AUTHOR NAMES
     Open Library only gives author keys in the
     work object, so fetch each author to get
     their display name.
  ============================================ */
  useEffect(() => {
    const authorKeys = Array.isArray(book?.authors)
      ? book.authors
          .map((item) => item.author?.key)
          .filter((key): key is string => Boolean(key))
      : [];

    const ids = authorKeys
      .map((key) => getId(key))
      .filter((id): id is string => Boolean(id));

    if (ids.length === 0) {
      setAuthorInfos([]);
      return;
    }

    let cancelled = false;

    async function loadAuthors() {
      setAuthorsLoading(true);

      const results = await Promise.all(
        ids.map(async (id): Promise<AuthorInfo> => {
          try {
            const res = await fetch(
              `https://openlibrary.org/authors/${encodeURIComponent(id)}.json`,
            );

            if (!res.ok) {
              return { id, name: id };
            }

            const data = await res.json();

            return {
              id,
              name: typeof data.name === "string" ? data.name : id,
            };
          } catch {
            return { id, name: id };
          }
        }),
      );

      if (!cancelled) {
        setAuthorInfos(results);
        setAuthorsLoading(false);
      }
    }

    loadAuthors();

    return () => {
      cancelled = true;
    };
  }, [book]);

  function handleSave() {
    try {
      const stored = localStorage.getItem("savedBooks");

      let savedBooks: string[] = [];

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          savedBooks = parsed;
        }
      }

      if (savedBooks.includes(bookId)) {
        const updated = savedBooks.filter((id) => id !== bookId);

        localStorage.setItem("savedBooks", JSON.stringify(updated));

        setSaved(false);
      } else {
        const updated = [...savedBooks, bookId];

        localStorage.setItem("savedBooks", JSON.stringify(updated));

        setSaved(true);
      }

      window.dispatchEvent(new Event("savedBooksUpdated"));
    } catch (error) {
      console.error("Failed to update saved books:", error);
    }
  }

  const title = book?.title || "Unknown Book";

  const description = getDescription(book?.description);

  const subjects = Array.isArray(book?.subjects)
    ? [...new Set(book.subjects)]
    : [];

  const links = Array.isArray(book?.links) ? book.links : [];

  const coverId = Array.isArray(book?.covers)
    ? book.covers.find((cover) => cover > 0)
    : undefined;

  const coverUrl =
    coverId && typeof coverId === "number"
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null;

  return (
    <div className="mx-auto w-full max-w-full lg:flex">
      {/* LEFT: COVER */}
      <div className="h-64 w-full flex-none overflow-hidden rounded-t-2xl bg-black lg:h-auto lg:w-64 lg:rounded-l-2xl lg:rounded-tr-none">
        {coverUrl && !imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={title}
            loading="eager"
            fetchPriority="high"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-500">
            <BookOpen className="h-10 w-10" />
            <span className="text-sm">No cover available</span>
          </div>
        )}
      </div>

      {/* RIGHT: CONTENT */}
      <div className="flex flex-1 flex-col justify-between rounded-b-2xl bg-[#131722] p-6 leading-normal lg:rounded-r-2xl lg:rounded-bl-none">
        <div className="mb-8">
          {/* Meta line */}
          <p className="mb-2 flex items-center text-sm text-gray-400">
            <svg
              className="mr-2 h-3 w-3 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            {book.first_publish_date
              ? `Published ${book.first_publish_date}`
              : "Open Library Work"}
          </p>

          {/* Title */}
          <h1 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            {title}
          </h1>

          {/* Description */}
          <p className="whitespace-pre-line text-base leading-7 text-gray-300">
            {description}
          </p>

          {/* Subjects */}
          {subjects.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {subjects.slice(0, 12).map((subject, index) => (
                <span
                  key={`${subject}-${index}`}
                  className="rounded-full border border-[#2a3143] bg-[#1b2030] px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {subject}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {links.slice(0, 5).map((link, index) => {
                if (!link.url) return null;

                return (
                  <a
                    key={`${link.url}-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2a3143] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3a4153]"
                  >
                    {link.title || "Open Link"}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom row: authors + actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {authorInfos.length > 0 ? (
              authorInfos.map((author, index) => (
                <Link
                  key={`${author.id}-${index}`}
                  href={`/author/${author.id}`}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a3143] text-sm font-semibold text-white">
                    {author.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="text-sm">
                    <p className="leading-none text-gray-200">{author.name}</p>
                    <p className="text-gray-500">View author profile</p>
                  </div>
                </Link>
              ))
            ) : authorsLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-full bg-[#2a3143]" />
                <div className="text-sm">
                  <p className="leading-none text-gray-200">
                    Loading author...
                  </p>
                  <p className="text-gray-500">—</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a3143] text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <p className="leading-none text-gray-200">Unknown Author</p>
                  <p className="text-gray-500">—</p>
                </div>
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            type="button"
            onClick={handleSave}
            className={
              "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors " +
              (saved
                ? "bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-white"
                : "bg-[#2a3143] text-white hover:bg-[#3a4153]")
            }
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-5 w-5" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="h-5 w-5" />
                Save Book
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
