import type { Access, Book, BooksResponse, Sort } from "./types";

// Runs in the browser now, so this file is client-safe (no server-only APIs).
const BASE = "https://openlibrary.org";
const FIELDS =
  "key,title,author_name,first_publish_year,cover_i,edition_count,subject,ratings_average,ratings_count,want_to_read_count,ebook_access";

// Top Rated ignores books with only one or two votes. Set to 0 to disable.
const TOP_RATED_MIN_RATINGS = 5;

export interface SearchParams {
  q?: string;
  subject?: string;
  sort: Sort;
  page: number;
  limit: number;
}

/** Builds the Open Library /search.json URL. */
export function buildSearchUrl({
  q,
  subject,
  sort,
  page,
  limit,
}: SearchParams): string {
  const text = q?.replace(/[()]/g, " ").trim();
  const parts = [text ? `(${text})` : "first_publish_year:[* TO *]"];
  if (subject) parts.push(`subject:"${subject.replace(/"/g, "")}"`);
  if (sort === "rating" && TOP_RATED_MIN_RATINGS > 0)
    parts.push(`ratings_count:[${TOP_RATED_MIN_RATINGS} TO *]`);

  const qs = new URLSearchParams({
    q: parts.join(" AND "),
    fields: FIELDS,
    limit: String(limit),
    page: String(page),
  });
  if (sort !== "relevance") qs.set("sort", sort);
  return `${BASE}/search.json?${qs}`;
}

/** Maps the raw Open Library response to our BooksResponse. */
export function mapBooks(
  data: any,
  page: number,
  limit: number,
): BooksResponse {
  const books: Book[] = (data.docs ?? []).map(
    (d: any): Book => ({
      id: String(d.key).split("/").pop()!,
      title: d.title ?? "Untitled",
      authors: d.author_name ?? [],
      year: d.first_publish_year,
      coverId: d.cover_i,
      editions: d.edition_count ?? 0,
      subjects: (d.subject ?? []).slice(0, 4),
      rating: d.ratings_average,
      ratings: d.ratings_count ?? 0,
      wantToRead: d.want_to_read_count ?? 0,
      access: (["public", "borrowable"].includes(d.ebook_access)
        ? d.ebook_access
        : "none") as Access,
    }),
  );
  const total = data.numFound ?? 0;
  return { books, total, hasMore: page * limit < total };
}
