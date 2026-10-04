"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  LibraryBig,
  Search,
} from "lucide-react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;
}

interface BookResponse {
  numFound: number;
  docs: Book[];
}

const LIMIT = 10;

export default function BookDataTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("programming");
  const [query, setQuery] = useState("programming");
  const [page, setPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${LIMIT}&page=${page}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const data: BookResponse = await response.json();

      setBooks(data.docs ?? []);
      setTotalBooks(data.numFound ?? 0);
    } catch (error) {
      console.error(error);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [query, page]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const value = searchInput.trim();
    if (!value) return;

    setPage(1);
    setQuery(value);
  };

  const totalPages = Math.ceil(totalBooks / LIMIT);

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#E3E7F2] bg-white shadow-[0_12px_40px_rgba(72,80,130,0.07)] transition-colors duration-300 dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
      {/* Header */}
      <div className="border-b border-[#E7EAF3] bg-gradient-to-r from-[#FAFBFF] via-white to-[#FBF8FF] p-6 dark:border-[#343A57] dark:from-[#181E31] dark:via-[#1C2031] dark:to-[#251B32]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Books
                </h2>

                <span className="rounded-full bg-gradient-to-r from-[#EEF2FF] to-[#F4EEFF] px-2.5 py-1 text-[10px] font-semibold text-[#655CC1] dark:from-[#273253] dark:to-[#352548] dark:text-[#C2BCFF]">
                  {totalBooks.toLocaleString()}
                </span>
              </div>

              <p className="mt-1 text-sm text-[#858A9F] dark:text-[#A3A8BA]">
                Search, browse and explore books
              </p>
            </div>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex w-full gap-2 lg:max-w-md"
          >
            <div className="group relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9196AA] transition group-focus-within:text-[#5368CE] dark:text-[#868DA4] dark:group-focus-within:text-[#A8B4FF]" />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search books..."
                className="h-11 w-full rounded-xl border border-[#DDE2F2] bg-white pl-10 pr-3 text-sm text-[#292C43] outline-none transition-all placeholder:text-[#A0A4B5] hover:border-[#C8CFEA] focus:border-[#7180D6] focus:ring-4 focus:ring-[#EEF1FF] dark:border-[#414B70] dark:bg-[#171B29] dark:text-[#F0F1F6] dark:placeholder:text-[#777D91] dark:hover:border-[#5B6390] dark:focus:border-[#776DDA] dark:focus:ring-[#6763C9]/15"
              />
            </div>

            <button
              type="submit"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200/50 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]"
            >
              <Search className="h-4 w-4" />
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-[#E7EAF3] bg-gradient-to-r from-[#F7F9FF] to-[#FAF7FF] dark:border-[#343A57] dark:from-[#1B2237] dark:to-[#281F38]">
            <tr className="text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#7C8297] dark:text-[#A6ACBF]">
              <th className="px-6 py-4">Book</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Published</th>
              <th className="px-6 py-4">Editions</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EDF0F6] dark:divide-[#343A57]">
            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan={5} className="px-6 py-20">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative flex h-14 w-14 items-center justify-center">
                      <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#E5E8F4] border-t-[#6657C9] dark:border-[#343B58] dark:border-t-[#9F83FF]" />
                      <BookOpen className="h-5 w-5 text-[#5968C1] dark:text-[#A8B3FF]" />
                    </div>

                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#4C5064] dark:text-[#F0F1F6]">
                        Loading books
                      </p>

                      <p className="mt-1 text-xs text-[#9296A8] dark:text-[#8F95A8]">
                        Getting results from Open Library...
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {/* Error */}
            {!loading && error && (
              <tr>
                <td colSpan={5} className="px-6 py-20">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#D7556D] dark:bg-[#43232F] dark:text-[#FF8298]">
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 font-semibold text-[#30344A] dark:text-[#F3F4F8]">
                      Unable to load books
                    </h3>

                    <p className="mt-1 text-sm text-[#D7556D] dark:text-[#FF8298]">
                      {error}
                    </p>

                    <button
                      type="button"
                      onClick={fetchBooks}
                      className="mt-5 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg dark:from-[#566EE0] dark:to-[#8458D8]"
                    >
                      Try Again
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && !error && books.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                      <Search className="h-7 w-7" />
                    </div>

                    <h3 className="mt-4 font-semibold text-[#30344A] dark:text-[#F3F4F8]">
                      No books found
                    </h3>

                    <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
                      Try searching with another title or keyword.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {/* Rows */}
            {!loading &&
              !error &&
              books.map((book, index) => {
                const workId = book.key.split("/").filter(Boolean).pop();

                const coverUrl = book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                  : null;

                const authors =
                  book.author_name?.slice(0, 2).join(", ") ?? "Unknown";

                return (
                  <tr
                    key={`${book.key}-${index}`}
                    className="group transition-all duration-200 hover:bg-gradient-to-r hover:from-[#F8FAFF] hover:to-[#FBF8FF] dark:hover:from-[#1E2740] dark:hover:to-[#2A203A]"
                  >
                    {/* Book */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative flex h-[72px] w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#E1E5F1] bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] shadow-sm dark:border-[#465078] dark:from-[#202945] dark:to-[#33223F]">
                          {coverUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={coverUrl}
                              alt={book.title}
                              loading={index < 4 ? "eager" : "lazy"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <BookOpen className="h-5 w-5 text-[#7068BE] dark:text-[#B8B3FF]" />
                          )}

                          <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#4867D6] to-[#7A4FD8]" />
                        </div>

                        <div className="min-w-0">
                          <p
                            title={book.title}
                            className="max-w-[270px] truncate font-semibold text-[#30344A] transition group-hover:text-[#5D63C4] dark:text-[#F0F1F6] dark:group-hover:text-[#C4BEFF]"
                          >
                            {book.title}
                          </p>

                          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#9296A8] dark:text-[#8F95A8]">
                            <BookOpen className="h-3 w-3" />
                            <span>{workId ?? "Unknown ID"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="max-w-[230px] px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-[#4867D6] to-[#7A4FD8]" />

                        <p
                          title={authors}
                          className="truncate text-sm font-medium text-[#6F758B] dark:text-[#A7ACBD]"
                        >
                          {authors}
                        </p>
                      </div>
                    </td>

                    {/* Published */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F5FF] px-3 py-1.5 text-xs font-semibold text-[#6270B5] dark:bg-[#252F50] dark:text-[#B7C0F5]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {book.first_publish_year ?? "Unknown"}
                      </span>
                    </td>

                    {/* Editions */}
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 rounded-xl border border-[#E2E6F2] bg-gradient-to-r from-[#FAFBFF] to-[#F8F5FF] px-3 py-2 dark:border-[#414B70] dark:from-[#20283F] dark:to-[#2A203A]">
                        <LibraryBig className="h-4 w-4 text-[#7154CF] dark:text-[#BD94FF]" />

                        <span className="text-sm font-bold text-[#5368CE] dark:text-[#AAB7FF]">
                          {(book.edition_count ?? 0).toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      {workId ? (
                        <Link
                          href={`/books/${workId}`}
                          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-4 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-purple-200/40 dark:from-[#566EE0] dark:to-[#8458D8] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.25),0_10px_26px_rgba(108,85,220,0.25)]"
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="text-xs text-[#A0A4B5] dark:text-[#777E91]">
                          Unavailable
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t border-[#E7EAF3] bg-gradient-to-r from-[#FAFBFF] to-[#FCFAFF] p-5 sm:flex-row sm:items-center sm:justify-between dark:border-[#343A57] dark:from-[#181E31] dark:to-[#251B32]">
        <div>
          <p className="text-sm font-medium text-[#656B82] dark:text-[#B0B5C6]">
            {totalBooks.toLocaleString()} results
          </p>

          {totalPages > 0 && (
            <p className="mt-0.5 text-xs text-[#9296A8] dark:text-[#868C9F]">
              Page {page} of {totalPages.toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="flex h-10 items-center gap-1 rounded-xl border border-[#DDE2F2] bg-white px-4 text-sm font-semibold text-[#6970A6] transition-all hover:border-[#C8CEEC] hover:bg-[#F1F3FF] hover:text-[#5368CE] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#ADB6E7] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CAC4FF]"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-3 text-sm font-bold text-white shadow-md shadow-indigo-200/40 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_8px_24px_rgba(100,82,205,0.22)]">
            {page}
          </span>

          <button
            type="button"
            disabled={totalPages > 0 && page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="flex h-10 items-center gap-1 rounded-xl border border-[#DDE2F2] bg-white px-4 text-sm font-semibold text-[#6970A6] transition-all hover:border-[#C8CEEC] hover:bg-[#F5F1FF] hover:text-[#7653CF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#ADB6E7] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CAC4FF]"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
