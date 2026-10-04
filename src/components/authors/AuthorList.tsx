"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

import AuthorCard, { type AuthorType } from "./AuthorCard";
import AuthorSearch from "./AuthorSearch";

interface AuthorSearchResponse {
  numFound: number;
  start: number;
  numFoundExact?: boolean;
  docs: AuthorType[];
}

const LIMIT = 20;

export default function AuthorList() {
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("all");
  const [page, setPage] = useState(1);
  const [totalAuthors, setTotalAuthors] = useState(0);

  // fetchAuthors
  const fetchAuthors = async (searchQuery: string, currentPage: number) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
          searchQuery,
        )}&limit=${LIMIT}&page=${currentPage}`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch authors: ${response.status}`);
      }
      //Create AutherSearchResponse to catch value from Api store it as object
      const data: AuthorSearchResponse = await response.json();
      setAuthors(data.docs ?? []);
      setTotalAuthors(data.numFound ?? 0);
    } catch (error) {
      console.error("Failed to fetch authors:", error);
      setError("Something went wrong while loading authors.");
    } finally {
      setLoading(false);
    }
  };
  //Use useEffect for use fetchAuthors
  useEffect(() => {
    fetchAuthors(query, page);
  }, [query, page]);
  //Create handleSearch to catch value from onSearch
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const totalPages = Math.ceil(totalAuthors / LIMIT);

  const previousPage = () => {
    setPage((currentPage) => Math.max(1, currentPage - 1));
  };

  const nextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <section
      className="
        mx-auto
        w-full
        max-w-7xl
        px-5
        py-10

        sm:px-6
        lg:px-8
      "
    >
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-[#4867D6]
              to-[#7A4FD8]
              text-white
              shadow-[0_8px_24px_rgba(91,78,190,0.22)]

              dark:shadow-[0_8px_28px_rgba(100,82,205,0.28)]
            "
          >
            <Users className="h-5 w-5" />
          </div>

          <div>
            <div
              className="
                mb-1
                h-1
                w-10
                rounded-full
                bg-gradient-to-r
                from-[#4867D6]
                to-[#7A4FD8]
              "
            />

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
                text-[#292C43]

                dark:text-[#F3F4F8]
              "
            >
              Authors
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-[#7B8095]

                dark:text-[#A3A8BA]
              "
            >
              Search and discover authors from Open Library
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        {/* after handleSearch the logic will continue to the onSearch and data will show */}
        <AuthorSearch onSearch={handleSearch} defaultValue="all" />
      </div>

      {/* Loading */}
      {loading && (
        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            gap-4
            rounded-[28px]
            border
            border-[#E3E7F2]
            bg-white/70

            dark:border-[#3C4567]
            dark:bg-[#171B28]/70
          "
        >
          <div
            className="
              h-11
              w-11
              animate-spin
              rounded-full
              border-4
              border-[#E6E9F4]
              border-t-[#675AC8]

              dark:border-[#343B58]
              dark:border-t-[#A58BFF]
            "
          />

          <p
            className="
              text-sm
              font-medium
              text-[#7B8095]

              dark:text-[#A3A8BA]
            "
          >
            Loading authors...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            gap-4
            rounded-[28px]
            border
            border-[#E3E7F2]
            bg-white
            px-6
            text-center

            dark:border-[#3C4567]
            dark:bg-[#181C29]
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#FFF0F3]
              text-[#D7556D]

              dark:bg-[#442330]
              dark:text-[#FF879C]
            "
          >
            <Users className="h-6 w-6" />
          </div>

          <div>
            <h2
              className="
                text-lg
                font-bold
                text-[#292C43]

                dark:text-[#F3F4F8]
              "
            >
              Unable to load authors
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#858A9F]

                dark:text-[#A3A8BA]
              "
            >
              {error}
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchAuthors(query, page)}
            className="
              rounded-xl
              bg-gradient-to-r
              from-[#4867D6]
              to-[#7A4FD8]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-md
              transition-all

              hover:-translate-y-0.5
              hover:shadow-lg
            "
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
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
            <p
              className="
                text-sm
                text-[#7B8095]

                dark:text-[#A3A8BA]
              "
            >
              Showing{" "}
              <span
                className="
                  font-semibold
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                {authors.length}
              </span>{" "}
              authors from{" "}
              <span
                className="
                  font-semibold
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                {totalAuthors.toLocaleString()}
              </span>{" "}
              results for{" "}
              <span
                className="
                  font-semibold
                  text-[#655CC1]

                  dark:text-[#C2BCFF]
                "
              >
                &quot;{query}&quot;
              </span>
            </p>

            <span
              className="
                rounded-full
                border
                border-[#DDE2F2]
                bg-white
                px-3
                py-1.5
                text-xs
                font-semibold
                text-[#6970A6]

                dark:border-[#465078]
                dark:bg-[#1A1E2C]
                dark:text-[#B7B3E7]
              "
            >
              Page {page}
              {totalPages > 0 && ` of ${totalPages}`}
            </span>
          </div>

          {authors.length === 0 ? (
            <div
              className="
                flex
                min-h-[360px]
                flex-col
                items-center
                justify-center
                rounded-[28px]
                border
                border-[#E3E7F2]
                bg-white
                px-6
                text-center

                dark:border-[#3C4567]
                dark:bg-[#181C29]
              "
            >
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#EEF2FF]
                  to-[#F4EEFF]
                  text-[#6658C7]

                  dark:from-[#29365D]
                  dark:to-[#3A294F]
                  dark:text-[#BDB6FF]
                "
              >
                <Users className="h-7 w-7" />
              </div>

              <h2
                className="
                  mt-5
                  text-xl
                  font-bold
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                No authors found
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#858A9F]

                  dark:text-[#A3A8BA]
                "
              >
                Try searching for another author.
              </p>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-6

                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {authors.map((author, index) => (
                <AuthorCard
                  key={`${author.key}-${index}`}
                  author={author}
                  priority={index < 4}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {authors.length > 0 && (
            <div
              className="
                mt-12
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={previousPage}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DDE2F2]
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-[#6970A6]
                  shadow-sm
                  transition-all

                  hover:-translate-y-0.5
                  hover:border-[#C8CEEC]
                  hover:bg-[#F5F1FF]
                  hover:text-[#7653CF]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0

                  dark:border-[#465078]
                  dark:bg-[#1A1E2C]
                  dark:text-[#ADB6E7]

                  dark:hover:border-[#7569D6]
                  dark:hover:bg-[#28203A]
                  dark:hover:text-[#CAC4FF]
                "
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div
                className="
                  flex
                  h-11
                  min-w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-r
                  from-[#4867D6]
                  to-[#7A4FD8]
                  px-4
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_8px_22px_rgba(91,78,190,0.22)]
                "
              >
                {page}
              </div>

              <button
                type="button"
                disabled={totalPages > 0 && page >= totalPages}
                onClick={nextPage}
                className="
                  flex
                  h-11
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DDE2F2]
                  bg-white
                  px-4
                  text-sm
                  font-semibold
                  text-[#6970A6]
                  shadow-sm
                  transition-all

                  hover:-translate-y-0.5
                  hover:border-[#C8CEEC]
                  hover:bg-[#F5F1FF]
                  hover:text-[#7653CF]

                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  disabled:hover:translate-y-0

                  dark:border-[#465078]
                  dark:bg-[#1A1E2C]
                  dark:text-[#ADB6E7]

                  dark:hover:border-[#7569D6]
                  dark:hover:bg-[#28203A]
                  dark:hover:text-[#CAC4FF]
                "
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
