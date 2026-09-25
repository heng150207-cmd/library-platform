// Typed client for the Open Library API.
// Docs: https://openlibrary.org/developers/api
//
// The API is free and keyless. Open Library asks that you send a descriptive
// User-Agent so they can identify traffic.

const BASE = "https://openlibrary.org";
const COVERS = "https://covers.openlibrary.org";

const HEADERS = {
  "User-Agent": "LibraryPlatform/1.0 (contact@example.com)",
};

async function getJSON<T>(url: string, revalidate = 3600): Promise<T> {
  const res = await fetch(url, {
    headers: HEADERS,
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`Open Library request failed (${res.status}): ${url}`);
  }
  return (await res.json()) as T;
}

/* ------------------------------------------------------------------ */
/* Shared types                                                        */
/* ------------------------------------------------------------------ */

export interface SearchDoc {
  key: string; // e.g. "/works/OL45804W"
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;
  cover_edition_key?: string;
  isbn?: string[];
  language?: string[];
  subject?: string[];
  ratings_average?: number;
  ratings_count?: number;
  ebook_access?: string;
  has_fulltext?: boolean;
}

export interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: SearchDoc[];
}

export interface AuthorSearchDoc {
  key: string; // e.g. "OL26320A"
  name: string;
  birth_date?: string;
  death_date?: string;
  top_work?: string;
  work_count?: number;
  top_subjects?: string[];
}

export interface AuthorSearchResponse {
  numFound: number;
  start: number;
  docs: AuthorSearchDoc[];
}

export interface SubjectSearchDoc {
  key: string;
  name: string;
  subject_type?: string;
  work_count?: number;
}

export interface SubjectSearchResponse {
  numFound: number;
  start: number;
  docs: SubjectSearchDoc[];
}

export interface WorkDetail {
  key: string; // "/works/OL45804W"
  title: string;
  description?: string | { type: string; value: string };
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
  subject_times?: string[];
  covers?: number[];
  first_publish_date?: string;
  links?: { title: string; url: string }[];
  authors?: { author: { key: string }; type: { key: string } }[];
}

export interface EditionDetail {
  key: string; // "/books/OL7353617M"
  title: string;
  works?: { key: string }[];
  authors?: { key: string }[];
  covers?: number[];
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  isbn_10?: string[];
  isbn_13?: string[];
  physical_format?: string;
  subjects?: string[];
  description?: string | { type: string; value: string };
}

export interface EditionListResponse {
  size: number;
  entries: EditionDetail[];
}

export interface AuthorDetail {
  key: string; // "/authors/OL26320A"
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { type: string; value: string };
  photos?: number[];
  alternate_names?: string[];
}

export interface AuthorWorksResponse {
  size: number;
  entries: { key: string; title: string; covers?: number[] }[];
}

export interface SubjectResponse {
  key: string;
  name: string;
  work_count: number;
  works: {
    key: string; // "/works/OL45804W"
    title: string;
    authors?: { name: string; key: string }[];
    cover_id?: number;
    first_publish_year?: number;
    subject?: string[];
    availability?: { ebook?: boolean };
  }[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function workIdFromKey(key: string): string {
  // "/works/OL45804W" or "OL45804W" -> "OL45804W"
  return key.split("/").filter(Boolean).pop() ?? key;
}

/** Builds a cover URL, or null when there is no cover to show. */
export function coverUrl(
  kind: "isbn" | "oclc" | "lccn" | "olid" | "id",
  value: string | number | undefined,
  size: "S" | "M" | "L" = "M",
): string | null {
  if (value === undefined || value === null || value === "") return null;
  return `${COVERS}/b/${kind}/${value}-${size}.jpg`;
}

/** Normalizes a description that may be a plain string or a {value} object. */
export function descriptionText(
  d: string | { value: string } | undefined,
): string | null {
  if (!d) return null;
  return typeof d === "string" ? d : d.value;
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export function searchBooks(query: string, limit = 24) {
  return getJSON<BookSearchResponse>(
    `${BASE}/search.json?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

export function searchAuthors(query: string, limit = 24) {
  return getJSON<AuthorSearchResponse>(
    `${BASE}/search/authors.json?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

export function searchSubjects(query: string, limit = 24) {
  return getJSON<SubjectSearchResponse>(
    `${BASE}/search/subjects.json?q=${encodeURIComponent(query)}&limit=${limit}`,
  );
}

/* ------------------------------------------------------------------ */
/* Works                                                               */
/* ------------------------------------------------------------------ */

export function getWork(workId: string) {
  return getJSON<WorkDetail>(`${BASE}/works/${workId}.json`);
}

export function getWorkEditions(workId: string, limit = 50) {
  return getJSON<EditionListResponse>(
    `${BASE}/works/${workId}/editions.json?limit=${limit}`,
  );
}

export function getWorkRatings(workId: string) {
  return getJSON<{ summary: { average: number; count: number } }>(
    `${BASE}/works/${workId}/ratings.json`,
  );
}

/* ------------------------------------------------------------------ */
/* Editions                                                            */
/* ------------------------------------------------------------------ */

export function getEdition(editionId: string) {
  return getJSON<EditionDetail>(`${BASE}/books/${editionId}.json`);
}

export function getEditionByIsbn(isbn: string) {
  return getJSON<EditionDetail>(`${BASE}/isbn/${isbn}.json`);
}

/* ------------------------------------------------------------------ */
/* Authors                                                             */
/* ------------------------------------------------------------------ */

export function getAuthor(authorId: string) {
  return getJSON<AuthorDetail>(`${BASE}/authors/${authorId}.json`);
}

export function getAuthorWorks(authorId: string, limit = 50) {
  return getJSON<AuthorWorksResponse>(
    `${BASE}/authors/${authorId}/works.json?limit=${limit}`,
  );
}

/* ------------------------------------------------------------------ */
/* Subjects                                                            */
/* ------------------------------------------------------------------ */

export function getSubject(subject: string, limit = 24) {
  return getJSON<SubjectResponse>(
    `${BASE}/subjects/${encodeURIComponent(subject)}.json?details=true&ebooks=true&limit=${limit}`,
  );
}
