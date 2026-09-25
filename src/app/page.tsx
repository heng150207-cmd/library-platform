import Link from "next/link";
import { searchBooks } from "@/lib/openlibrary";
import BookCard from "./Components/books/BookCard";

const POPULAR_SUBJECTS = [
  "fantasy",
  "science_fiction",
  "romance",
  "mystery",
  "history",
  "biography",
  "poetry",
  "philosophy",
];

async function TrendingBooks() {
  try {
    const { docs } = await searchBooks("the", 12);
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {docs.map((doc) => (
          <BookCard
            key={doc.key}
            title={doc.title}
            coverId={doc.cover_i}
            editionKey={doc.cover_edition_key}
            authors={doc.author_name?.map((name) => ({ name }))}
            year={doc.first_publish_year}
            workKey={doc.key}
          />
        ))}
      </div>
    );
  } catch {
    return (
      <p className="text-sm text-zinc-500">
        Could not load books right now. Please try again later.
      </p>
    );
  }
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-black/10 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-white/15">
            Powered by the Open Library API
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore millions of books, freely.
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Search titles, authors and subjects across a vast open catalog. No
            sign-up, no API key — just knowledge.
          </p>

          <form
            action="/search"
            method="get"
            className="mx-auto mt-8 flex w-full max-w-xl items-center gap-2"
          >
            <input
              type="search"
              name="q"
              placeholder="Search by title, author or subject…"
              aria-label="Search books"
              className="h-12 flex-1 rounded-full border border-black/10 bg-white px-5 text-base outline-none ring-offset-2 transition focus:ring-2 focus:ring-foreground dark:border-white/15 dark:bg-zinc-900"
            />
            <button
              type="submit"
              className="h-12 shrink-0 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {POPULAR_SUBJECTS.map((s) => (
              <Link
                key={s}
                href={`/subject/${s}`}
                className="rounded-full border border-black/10 px-3 py-1 text-xs capitalize text-zinc-600 transition-colors hover:bg-black/[.04] dark:border-white/15 dark:text-zinc-300 dark:hover:bg-white/[.08]"
              >
                {s.replace("_", " ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Popular right now
          </h2>
          <Link
            href="/search?q=bestsellers"
            className="text-sm font-medium text-zinc-500 hover:text-foreground"
          >
            Browse more →
          </Link>
        </div>
        <TrendingBooks />
      </section>
    </main>
  );
}
