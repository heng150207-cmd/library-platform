import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getWork,
  getWorkEditions,
  getWorkRatings,
  coverUrl,
  descriptionText,
  workIdFromKey,
} from "@/lib/openlibrary";

export async function generateMetadata(props: PageProps<"/books/[...id]">) {
  const { id } = await props.params;
  const workId = id[id.length - 1];
  try {
    const work = await getWork(workId);
    return { title: work.title };
  } catch {
    return { title: "Book" };
  }
}

export default async function BookPage(props: PageProps<"/books/[...id]">) {
  const { id } = await props.params;
  const workId = id[id.length - 1];

  if (!/^OL\d+W$/i.test(workId)) notFound();

  let work;
  try {
    work = await getWork(workId);
  } catch {
    notFound();
  }

  // Fetch editions and ratings in parallel; both are best-effort.
  const [editionsRes, ratingsRes] = await Promise.allSettled([
    getWorkEditions(workId, 50),
    getWorkRatings(workId),
  ]);

  const editions =
    editionsRes.status === "fulfilled" ? editionsRes.value.entries : [];
  const ratings =
    ratingsRes.status === "fulfilled" ? ratingsRes.value.summary : null;

  const coverId = work.covers?.[0];
  const description = descriptionText(work.description);
  const authorKeys = work.authors ?? [];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="mx-auto w-48 shrink-0 md:mx-0 md:w-56">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-black/10 bg-zinc-100 dark:border-white/10 dark:bg-zinc-800">
            {coverUrl("id", coverId, "L") ? (
              <Image
                src={coverUrl("id", coverId, "L")!}
                alt={`Cover of ${work.title}`}
                fill
                sizes="224px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                No cover
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {work.title}
          </h1>

          {ratings && ratings.count > 0 && (
            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
              <span className="text-amber-500">★</span>
              <span className="font-medium text-foreground">
                {ratings.average.toFixed(1)}
              </span>
              <span>({ratings.count.toLocaleString()} ratings)</span>
            </div>
          )}

          {work.first_publish_date && (
            <p className="mt-3 text-sm text-zinc-500">
              First published {work.first_publish_date}
            </p>
          )}

          {authorKeys.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {authorKeys.map((a) => (
                <Link
                  key={a.author.key}
                  href={`/author/${workIdFromKey(a.author.key)}`}
                  className="rounded-full bg-black/[.05] px-3 py-1 text-sm font-medium transition-colors hover:bg-black/[.1] dark:bg-white/[.08] dark:hover:bg-white/[.15]"
                >
                  {workIdFromKey(a.author.key)}
                </Link>
              ))}
            </div>
          )}

          {description && (
            <p className="mt-6 max-w-2xl whitespace-pre-line text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Subjects */}
      {work.subjects && work.subjects.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Subjects</h2>
          <div className="flex flex-wrap gap-2">
            {work.subjects.slice(0, 24).map((s) => (
              <Link
                key={s}
                href={`/subject/${encodeURIComponent(s.toLowerCase().replace(/\s+/g, "_"))}`}
                className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-600 transition-colors hover:bg-black/[.04] dark:border-white/15 dark:text-zinc-300 dark:hover:bg-white/[.08]"
              >
                {s}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Editions */}
      {editions.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">
            Editions{" "}
            <span className="text-base font-normal text-zinc-400">
              ({editions.length})
            </span>
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {editions.slice(0, 24).map((ed) => (
              <li
                key={ed.key}
                className="rounded-xl border border-black/[.08] bg-white p-4 dark:border-white/10 dark:bg-zinc-900"
              >
                <p className="line-clamp-2 font-medium">{ed.title}</p>
                <p className="mt-1 text-xs text-zinc-500">
                  {[ed.publish_date, ed.publishers?.[0], ed.physical_format]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {ed.number_of_pages && (
                  <p className="mt-1 text-xs text-zinc-400">
                    {ed.number_of_pages} pages
                  </p>
                )}
                {ed.isbn_13?.[0] && (
                  <p className="mt-1 font-mono text-xs text-zinc-400">
                    ISBN {ed.isbn_13[0]}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* JSON API link */}
      <p className="mt-12 text-xs text-zinc-400">
        Raw data:{" "}
        <a
          href={`https://openlibrary.org/works/${workId}.json`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          openlibrary.org/works/{workId}.json
        </a>
      </p>
    </main>
  );
}