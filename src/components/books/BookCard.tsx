// src/components/books/BookCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  FileText,
  Search,
  Star,
} from "lucide-react";
import { Book, coverUrl } from "@/lib/books/Books";

function Cover({ book, className = "" }: { book: Book; className?: string }) {
  const [broken, setBroken] = useState(false);
  const src = book.coverId
    ? coverUrl("id", book.coverId, "L")
    : coverUrl("isbn", book.isbn, "L");

  if (broken)
    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 ${className}`}
      >
        <BookOpen className="h-10 w-10" />
      </div>
    );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`Cover of ${book.title}`}
      loading="lazy"
      onError={() => setBroken(true)}
      className={`rounded-xl object-cover shadow-md ${className}`}
    />
  );
}

interface BookCardProps {
  book: Book;
  starred: boolean;
  onStar: () => void;
  compact?: boolean;
}

export default function BookCard({
  book,
  starred,
  onStar,
  compact = false,
}: BookCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <header className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h2 className="text-lg font-bold text-slate-900">{book.title}</h2>
      </header>

      <div className="space-y-3 px-6 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            <BookOpen className="h-3 w-3" />
            {book.format}
          </span>
          {book.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-blue-500" />
            Pages: {book.pages ?? "—"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5 text-blue-500" />
            Publisher: {book.publisher ?? "—"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5 text-blue-500" />
            ISBN: {book.isbn}
          </span>
        </div>

        <div className="flex justify-center py-2">
          <Cover book={book} className={compact ? "h-56 w-40" : "h-72 w-72"} />
        </div>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-2">
          {/* goes to src/app/books/[...id]/page.tsx */}
          <Link
            href={`/books/${book.isbn}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            More <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={onStar}
            aria-pressed={starred}
            aria-label="Star book"
            className="rounded-lg border border-slate-200 bg-white p-2 transition hover:bg-slate-100"
          >
            <Star
              className={`h-4 w-4 ${
                starred ? "fill-amber-400 text-amber-500" : "text-slate-700"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {book.publishDate ?? "Unknown date"}
          </span>
          <span className="font-semibold text-blue-600">
            Category: {book.category}
          </span>
        </div>
      </footer>
    </article>
  );
}
