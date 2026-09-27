// src/components/books/BooksBrowser.tsx
"use client";

import { useMemo, useState } from "react";
import { Flame, LayoutGrid, Search, Star, TrendingUp } from "lucide-react";
import BookCard from "./BookCard";
import { DEFAULT_ISBNS } from "@/lib/books/Books";
import { useBooks } from "@/lib/books/useBooks";

type Tab = "all" | "board" | "trending" | "top";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Books", icon: Flame },
  { id: "board", label: "Board View", icon: LayoutGrid },
  { id: "trending", label: "Newest", icon: TrendingUp },
  { id: "top", label: "Starred", icon: Star },
];

const year = (d?: string) => Number(d?.match(/\d{4}/)?.[0] ?? 0);

function Skeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="h-14 bg-slate-100" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-1/3 rounded bg-slate-100" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
        <div className="mx-auto h-64 w-64 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}

export default function BooksBrowser({
  isbns = DEFAULT_ISBNS,
}: {
  isbns?: string[];
}) {
  const { books, loading, error, failed } = useBooks(isbns);
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [starred, setStarred] = useState<Set<string>>(new Set());

  const categories = useMemo(
    () => Array.from(new Set(books.map((b) => b.category))).sort(),
    [books],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = books.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (!q ||
          b.title.toLowerCase().includes(q) ||
          b.tags.some((t) => t.includes(q)) ||
          b.publisher?.toLowerCase().includes(q)),
    );
    if (tab === "trending")
      list = [...list].sort(
        (a, b) => year(b.publishDate) - year(a.publishDate),
      );
    if (tab === "top") list = list.filter((b) => starred.has(b.isbn));
    return list;
  }, [books, query, category, tab, starred]);

  const toggleStar = (isbn: string) =>
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(isbn)) next.delete(isbn);
      else next.add(isbn);
      return next;
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toolbar */}
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <nav className="flex flex-wrap items-center gap-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  tab === id
                    ? "border-2 border-slate-900 bg-blue-50 text-blue-700"
                    : "border-2 border-transparent text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter books..."
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="max-w-[12rem] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </p>
        )}

        {!error && failed.length > 0 && !loading && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            {failed.length} ISBN(s) could not be found: {failed.join(", ")}
          </p>
        )}

        <div
          className={
            tab === "board"
              ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              : "space-y-6"
          }
        >
          {loading &&
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} />)}

          {!loading &&
            visible.map((b) => (
              <BookCard
                key={b.isbn}
                book={b}
                compact={tab === "board"}
                starred={starred.has(b.isbn)}
                onStar={() => toggleStar(b.isbn)}
              />
            ))}
        </div>

        {!loading && !error && visible.length === 0 && (
          <p className="py-16 text-center text-slate-500">No books found.</p>
        )}
      </main>
    </div>
  );
}
