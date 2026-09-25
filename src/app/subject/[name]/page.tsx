import { notFound } from "next/navigation";
import { getSubject } from "@/lib/openlibrary";
import BookCard from "../../Components/books/BookCard";

export async function generateMetadata(props: PageProps<"/subject/[name]">) {
  const { name } = await props.params;
  const label = decodeURIComponent(name).replace(/_/g, " ");
  return { title: `${label} books` };
}

export default async function SubjectPage(
  props: PageProps<"/subject/[name]">,
) {
  const { name } = await props.params;
  const slug = decodeURIComponent(name).replace(/\s+/g, "_");
  const label = slug.replace(/_/g, " ");

  let subject;
  try {
    subject = await getSubject(slug, 24);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <div className="mb-8">
        <p className="text-sm text-zinc-500">Subject</p>
        <h1 className="text-3xl font-semibold capitalize tracking-tight sm:text-4xl">
          {label}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          {subject.work_count.toLocaleString()} works in this subject
        </p>
      </div>

      {subject.works.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/10 p-10 text-center dark:border-white/15">
          <p className="text-lg font-medium">No works found</p>
          <p className="mt-1 text-sm text-zinc-500">
            The subject “{label}” has no works to display.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {subject.works.map((w) => (
            <BookCard
              key={w.key}
              title={w.title}
              coverId={w.cover_id}
              authors={w.authors?.map((a) => ({ name: a.name }))}
              year={w.first_publish_year}
              workKey={w.key}
            />
          ))}
        </div>
      )}

      <p className="mt-12 text-xs text-zinc-400">
        Raw data:{" "}
        <a
          href={`https://openlibrary.org/subjects/${slug}.json`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          openlibrary.org/subjects/{slug}.json
        </a>
      </p>
    </main>
  );
}
