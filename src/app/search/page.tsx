import Link from "next/link";
import { searchBooks, searchAuthors, searchSubjects } from "@/lib/openlibrary";
import BookCard from "../Components/books/BookCard";

type Tab = "books" | "authors" | "subjects";

const TABS: { id: Tab; label: string }[] = [
  { id: "books", label: "Books" },
  { id: "authors", label: "Authors" },
  { id: "subjects", label: "Subjects" },
];

export async function generateMetadata(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = typeof q === "string" ? q : "";
  return { title: query ? `Search: ${query}` : "Search" };
}

async function BookResults({ query }: { query: string }) {
  const { numFound, docs } = await searchBooks(query, 24);
  if (docs.length === 0) return <Empty query={query} />;
  return (
    <>
      <p className="mb-6 text-sm text-zinc-500">
        {numFound.toLocaleString()} results
      </p>
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
    </>
  );
}

async function AuthorResults({ query }: { query: string }) {
  const { docs } = await searchAuthors(query, 24);
  if (docs.length === 0) return <Empty query={query} />;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {docs.map((a) => (
        <li key={a.key}>
          <Link
            href={`/author/${a.key}`}
            className="flex items-center gap-4 rounded-xl border border-black/[.08] bg-white p-4 transition-shadow hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg dark:bg-zinc-800">
              {a.name?.[0] ?? "?"}
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium">{a.name}</p>
              <p className="truncate text-xs text-zinc-500">
                {a.birth_date ? `${a.birth_date} · ` : ""}
                {a.work_count ?? 0} works
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

async function SubjectResults({ query }: { query: string }) {
  const { docs } = await searchSubjects(query, 24);
  if (docs.length === 0) return <Empty query={query} />;
  return (
    <div className="flex flex-wrap gap-2">
      {docs.map((s) => (
        <Link
          key={s.key}
          href={`/subject/${s.name}`}
          className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm transition-colors hover:bg-black/[.04] dark:border-white/15 dark:bg-zinc-900 dark:hover:bg-white/[.08]"
        >
          {s.name}
          {typeof s.work_count === "number" && (
            <span className="ml-2 text-xs text-zinc-400">{s.work_count}</span>
          )}
        </Link>
      ))}
    </div>
  );
}

function Empty({ query }: { query: string }) {
  return (
    <div className="rounded-xl border border-dashed border-black/10 p-10 text-center dark:border-white/15">
      <p className="text-lg font-medium">No results found</p>
      <p className="mt-1 text-sm text-zinc-500">
        Nothing matched “{query}”. Try a different spelling or keyword.
      </p>
    </div>
  );
}

export default async function SearchPage(props: PageProps<"/search">) {
  const params = await props.searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const tab: Tab =
    params.type === "authors" || params.type === "subjects"
      ? (params.type as Tab)
      : "books";

  if (!query) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
        <h1 className="text-2xl font-semibold">Search Open Library</h1>
        <form action="/search" method="get" className="mt-6 flex gap-2">
          <input
            type="search"
            name="q"
            placeholder="Search…"
            className="h-12 flex-1 rounded-full border border-black/10 bg-white px-5 outline-none focus:ring-2 focus:ring-foreground dark:border-white/15 dark:bg-zinc-900"
          />
          <button className="h-12 rounded-full bg-foreground px-6 text-sm font-medium text-background">
            Go
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-sm text-zinc-500">Search results for</p>
        <h1 className="text-3xl font-semibold tracking-tight">“{query}”</h1>
      </div>

      <div className="mb-8 flex gap-1 border-b border-black/10 dark:border-white/10">
        {TABS.map((t) => (
          <Link
            key={t.id}
            href={`/search?q=${encodeURIComponent(query)}&type=${t.id}`}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-zinc-500 hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {tab === "books" && <BookResults query={query} />}
      {tab === "authors" && <AuthorResults query={query} />}
      {tab === "subjects" && <SubjectResults query={query} />}
    </main>
  );
}
