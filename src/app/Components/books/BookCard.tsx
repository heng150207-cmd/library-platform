import Image from "next/image";
import Link from "next/link";
import { coverUrl, workIdFromKey } from "@/lib/openlibrary";

interface BookCardProps {
  title: string;
  coverId?: number;
  /** Cover to use when there is no cover_id (falls back to cover edition key). */
  editionKey?: string;
  authors?: { name?: string; key?: string }[];
  year?: number;
  workKey?: string;
}

export default function BookCard({
  title,
  coverId,
  editionKey,
  authors,
  year,
  workKey,
}: BookCardProps) {
  const src =
    coverUrl("id", coverId, "M") ??
    (editionKey
      ? coverUrl("olid", editionKey.replace(/^\/books\//, ""), "M")
      : null);

  const href = workKey ? `/books/${workIdFromKey(workKey)}` : null;

  const inner = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-black/[.08] bg-white transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-zinc-900">
      <div className="relative aspect-[2/3] w-full bg-zinc-100 dark:bg-zinc-800">
        {src ? (
          <Image
            src={src}
            alt={`Cover of ${title}`}
            fill
            sizes="(max-width: 640px) 50vw, 200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center text-xs text-zinc-400">
            No cover available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
          {title}
        </h3>
        {authors && authors.length > 0 && (
          <p className="line-clamp-1 text-xs text-zinc-500">
            {authors
              .map((a) => a.name)
              .filter(Boolean)
              .join(", ")}
          </p>
        )}
        {year && <p className="mt-auto pt-1 text-xs text-zinc-400">{year}</p>}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
