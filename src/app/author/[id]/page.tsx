import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAuthor,
  getAuthorWorks,
  descriptionText,
} from "@/lib/openlibrary";

export async function generateMetadata(props: PageProps<"/author/[id]">) {
  const { id } = await props.params;
  try {
    const author = await getAuthor(id);
    return { title: author.name };
  } catch {
    return { title: "Author" };
  }
}

export default async function AuthorPage(props: PageProps<"/author/[id]">) {
  const { id } = await props.params;

  let author;
  try {
    author = await getAuthor(id);
  } catch {
    notFound();
  }

  const worksRes = await getAuthorWorks(id, 60).catch(() => null);
  const works = worksRes?.entries ?? [];
  const bio = descriptionText(author.bio);
  const lifespan = [author.birth_date, author.death_date]
    .filter(Boolean)
    .join(" – ");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-4xl dark:bg-zinc-800">
          {author.name?.[0] ?? "?"}
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {author.name}
          </h1>
          {author.alternate_names && author.alternate_names.length > 0 && (
            <p className="mt-1 text-sm text-zinc-500">
              Also known as {author.alternate_names.join(", ")}
            </p>
          )}
          {lifespan && (
            <p className="mt-1 text-sm text-zinc-500">{lifespan}</p>
          )}
        </div>
      </div>

      {bio && (
        <section className="mt-8 max-w-3xl">
          <h2 className="mb-2 text-lg font-semibold">Biography</h2>
          <p className="whitespace-pre-line text-zinc-600 dark:text-zinc-400">
            {bio}
          </p>
        </section>
      )}

      {works.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">
            Works{" "}
            <span className="text-base font-normal text-zinc-400">
              ({works.length})
            </span>
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => {
              const workId = w.key.split("/").pop();
              return (
                <li key={w.key}>
                  <Link
                    href={`/books/${workId}`}
                    className="block rounded-lg border border-black/[.08] bg-white px-4 py-3 text-sm transition-colors hover:bg-black/[.03] dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-white/[.06]"
                  >
                    {w.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <p className="mt-12 text-xs text-zinc-400">
        Raw data:{" "}
        <a
          href={`https://openlibrary.org/authors/${id}.json`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          openlibrary.org/authors/{id}.json
        </a>
      </p>
    </main>
  );
}
