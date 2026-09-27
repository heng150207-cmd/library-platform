"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

import AuthorCard, {
  type AuthorType,
} from "./AuthorCard";

import AuthorSearch from "./AuthorSearch";

interface AuthorSearchResponse {
  numFound: number;
  start: number;
  numFoundExact?: boolean;
  docs: AuthorType[];
}

const LIMIT = 20;

export default function AuthorList() {
  const [authors, setAuthors] =
    useState<AuthorType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [query, setQuery] =
    useState("tolkien");

  const [page, setPage] =
    useState(1);

  const [
    totalAuthors,
    setTotalAuthors,
  ] = useState(0);

  // ==============================
  // FETCH AUTHORS
  // ==============================

  const fetchAuthors = async (
    searchQuery: string,
    currentPage: number
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await fetch(
          `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
            searchQuery
          )}&limit=${LIMIT}&page=${currentPage}`
        );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch authors: ${response.status}`
        );
      }

      const data:
        AuthorSearchResponse =
        await response.json();

      setAuthors(
        data.docs ?? []
      );

      setTotalAuthors(
        data.numFound ?? 0
      );
    } catch (error) {
      console.error(
        "Failed to fetch authors:",
        error
      );

      setError(
        "Something went wrong while loading authors."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH WHEN PAGE / QUERY CHANGES
  // ==============================

  useEffect(() => {
    fetchAuthors(
      query,
      page
    );
  }, [query, page]);

  // ==============================
  // SEARCH
  // ==============================

  const handleSearch = (
    searchQuery: string
  ) => {
    setPage(1);
    setQuery(searchQuery);
  };

  const totalPages =
    Math.ceil(
      totalAuthors / LIMIT
    );

  return (
    <section
      className="
        container
        mx-auto
        px-6
        py-10
      "
    >
      {/* HEADER */}

      <div className="mb-8">
        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              h-11
              w-11
              rounded-xl
              bg-primary
              text-primary-foreground
              flex
              items-center
              justify-center
            "
          >
            <Users className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Authors
            </h1>

            <p className="text-muted-foreground">
              Search and discover authors
              from Open Library
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH */}

      <div className="mb-8">
        <AuthorSearch
          onSearch={handleSearch}
          defaultValue="tolkien"
        />
      </div>

      {/* LOADING */}

      {loading && (
        <div
          className="
            min-h-[400px]
            flex
            flex-col
            items-center
            justify-center
            gap-4
          "
        >
          <div
            className="
              w-10
              h-10
              rounded-full
              border-4
              border-muted
              border-t-primary
              animate-spin
            "
          />

          <p className="text-muted-foreground">
            Loading authors...
          </p>
        </div>
      )}

      {/* ERROR */}

      {!loading && error && (
        <div
          className="
            min-h-[400px]
            flex
            flex-col
            items-center
            justify-center
            gap-4
          "
        >
          <p className="text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              fetchAuthors(
                query,
                page
              )
            }
            className="
              px-5
              py-2.5
              rounded-xl
              bg-primary
              text-primary-foreground
            "
          >
            Try Again
          </button>
        </div>
      )}

      {/* RESULTS */}

      {!loading && !error && (
        <>
          {/* RESULT INFORMATION */}

          <div
            className="
              mb-6
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "
          >
            <p className="text-sm text-muted-foreground">
              Showing{" "}

              <span className="font-semibold text-foreground">
                {authors.length}
              </span>

              {" "}authors from{" "}

              <span className="font-semibold text-foreground">
                {totalAuthors.toLocaleString()}
              </span>

              {" "}results for{" "}

              <span className="font-semibold text-foreground">
                &quot;{query}&quot;
              </span>
            </p>

            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>
          </div>

          {/* EMPTY */}

          {authors.length === 0 ? (
            <div className="py-20 text-center">
              <Users
                className="
                  mx-auto
                  w-12
                  h-12
                  text-muted-foreground
                "
              />

              <h2 className="mt-4 text-xl font-semibold">
                No authors found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Try searching another author.
              </p>
            </div>
          ) : (
            /* AUTHORS GRID */

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-6
              "
            >
              {authors.map(
                (
                  author,
                  index
                ) => (
                  <AuthorCard
                    key={`${author.key}-${index}`}
                    author={author}
                  />
                )
              )}
            </div>
          )}

          {/* PAGINATION */}

          {authors.length > 0 && (
            <div
              className="
                mt-12
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <button
                type="button"
                disabled={
                  page <= 1
                }
                onClick={() =>
                  setPage(
                    (previous) =>
                      Math.max(
                        1,
                        previous - 1
                      )
                  )
                }
                className="
                  h-10
                  px-4
                  rounded-lg
                  border
                  flex
                  items-center
                  gap-2
                  hover:bg-muted
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <ChevronLeft className="w-4 h-4" />

                Previous
              </button>

              <div
                className="
                  h-10
                  min-w-10
                  px-3
                  rounded-lg
                  bg-primary
                  text-primary-foreground
                  flex
                  items-center
                  justify-center
                  font-semibold
                "
              >
                {page}
              </div>

              <button
                type="button"
                disabled={
                  totalPages > 0 &&
                  page >= totalPages
                }
                onClick={() =>
                  setPage(
                    (previous) =>
                      previous + 1
                  )
                }
                className="
                  h-10
                  px-4
                  rounded-lg
                  border
                  flex
                  items-center
                  gap-2
                  hover:bg-muted
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Next

                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}