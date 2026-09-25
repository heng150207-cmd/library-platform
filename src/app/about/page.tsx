const ENDPOINTS = [
  { name: "Search Books", path: "GET /search.json?q=…" },
  { name: "Search Authors", path: "GET /search/authors.json?q=…" },
  { name: "Search Subjects", path: "GET /search/subjects.json?q=…" },
  { name: "Full-text Search", path: "GET /search/inside.json?q=…" },
  { name: "Book by ISBN", path: "GET /isbn/{isbn}.json" },
  { name: "Work Details", path: "GET /works/{olid}.json" },
  { name: "Work Editions", path: "GET /works/{olid}/editions.json" },
  { name: "Work Ratings", path: "GET /works/{olid}/ratings.json" },
  { name: "Edition Details", path: "GET /books/{olid}.json" },
  { name: "Author Details", path: "GET /authors/{olid}.json" },
  { name: "Author Works", path: "GET /authors/{olid}/works.json" },
  { name: "Works by Subject", path: "GET /subjects/{subject}.json" },
  { name: "Cover Images", path: "GET covers.openlibrary.org/b/{key}/{value}-L.jpg" },
];

export const metadata = {
  title: "About",
  description: "About this app and the Open Library API it is built on.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        About Shelf
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Shelf is a small, fast explorer for the{" "}
        <a
          href="https://openlibrary.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Open Library
        </a>
        , an open, editable library catalog from the Internet Archive. It gives
        you access to millions of book records without any API key.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">What you can do</h2>
        <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          <li>🔍 Search books, authors and subjects</li>
          <li>📖 View work details, editions and ratings</li>
          <li>✍️ Browse an author&apos;s catalog of works</li>
          <li>🗂️ Discover works by subject</li>
          <li>🖼️ See cover art from the Open Library covers service</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">API endpoints used</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-black/[.08] dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/[.03] text-xs uppercase text-zinc-500 dark:bg-white/[.05]">
              <tr>
                <th className="px-4 py-3 font-medium">Feature</th>
                <th className="px-4 py-3 font-medium">Endpoint</th>
              </tr>
            </thead>
            <tbody>
              {ENDPOINTS.map((e) => (
                <tr
                  key={e.name}
                  className="border-t border-black/[.06] dark:border-white/10"
                >
                  <td className="px-4 py-3">{e.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                    {e.path}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Notes</h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          This is an independent, non-commercial demo. Data is fetched live from
          the Open Library API with a descriptive User-Agent, as requested by
          their usage policy. Records can be incomplete — Open Library is built
          collaboratively and improves over time.
        </p>
      </section>
    </main>
  );
}