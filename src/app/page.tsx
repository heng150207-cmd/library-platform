import Link from "next/link";

import {
  ArrowRight,
  BookHeart,
  Brain,
  Building2,
  Heart,
  Library,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import AuthorImage from "@/components/authors/AuthorImage";
import HomeSavedPreview from "@/components/home/HomeSavedPreview";
import HeroAuthors from "@/components/home/HeroAuthor";

/* =====================================================
   TYPES
===================================================== */

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

interface BookResponse {
  docs: Book[];
}

interface Author {
  key: string;
  name: string;
  top_work?: string;
  work_count?: number;
}

interface AuthorResponse {
  docs: Author[];
}

/* =====================================================
   GET ID
===================================================== */

function getId(
  key: string
) {
  return key
    .split("/")
    .filter(Boolean)
    .pop();
}

/* =====================================================
   BOOKS WITH COVERS
===================================================== */

async function getBooks(
  query: string,
  limit = 6
): Promise<Book[]> {
  try {
    const fetchLimit =
      Math.max(
        limit * 6,
        30
      );

    const response =
      await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          query
        )}&limit=${fetchLimit}`,
        {
          next: {
            revalidate:
              3600,
          },
        }
      );

    if (!response.ok) {
      return [];
    }

    const data:
      BookResponse =
      await response.json();

    const withCovers =
      (data.docs ?? [])
        .filter(
          (book) =>
            typeof book.cover_i ===
              "number" &&
            book.cover_i > 0
        );

    const unique =
      Array.from(
        new Map(
          withCovers.map(
            (book) => [
              book.key,
              book,
            ]
          )
        ).values()
      );

    return unique.slice(
      0,
      limit
    );
  } catch (error) {
    console.error(
      "Book fetch error:",
      error
    );

    return [];
  }
}

/* =====================================================
   AUTHOR PHOTO CHECK
===================================================== */

async function authorHasPhoto(
  authorId: string
) {
  try {
    const response =
      await fetch(
        `https://covers.openlibrary.org/a/olid/${authorId}-M.jpg?default=false`,
        {
          next: {
            revalidate:
              3600,
          },
        }
      );

    return response.ok;
  } catch {
    return false;
  }
}

/* =====================================================
   FIND AUTHOR WITH PHOTO
===================================================== */

async function searchAuthorWithPhoto(
  name: string
): Promise<Author | null> {
  try {
    const response =
      await fetch(
        `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
          name
        )}&limit=5`,
        {
          next: {
            revalidate:
              3600,
          },
        }
      );

    if (!response.ok) {
      return null;
    }

    const data:
      AuthorResponse =
      await response.json();

    for (
      const author of
      data.docs ?? []
    ) {
      const authorId =
        getId(
          author.key
        );

      if (!authorId) {
        continue;
      }

      const exists =
        await authorHasPhoto(
          authorId
        );

      if (exists) {
        return author;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* =====================================================
   AUTHORS
===================================================== */

async function getAuthorsWithPhotos() {
  const names = [
    "George Orwell",
    "William Shakespeare",
    "Mark Twain",
    "Virginia Woolf",
    "Ernest Hemingway",
    "Charles Dickens",
    "Oscar Wilde",
    "Agatha Christie",
  ];

  const results =
    await Promise.all(
      names.map(
        (name) =>
          searchAuthorWithPhoto(
            name
          )
      )
    );

  const valid =
    results.filter(
      (
        author
      ): author is Author =>
        author !== null
    );

  const unique =
    Array.from(
      new Map(
        valid.map(
          (author) => [
            author.key,
            author,
          ]
        )
      ).values()
    );

  return unique.slice(
    0,
    4
  );
}

/* =====================================================
   HOME
===================================================== */

export default async function HomePage() {
  const [
    popularBooks,
    featuredBooks,
    authors,
  ] = await Promise.all([
    getBooks(
      "classic literature",
      6
    ),

    getBooks(
      "the master and margarita",
      1
    ),

    getAuthorsWithPhotos(),
  ]);

  const featuredBook =
    featuredBooks[0] ??
    popularBooks[0];

  const shelves = [
    {
      title:
        "Favorites",
      description:
        "Your favorite books",
      icon: Heart,
      href:
        "/books/saved",
      color:
        "from-[#EEF2FF] to-[#F4EEFF]",
      iconColor:
        "text-[#7653CF]",
    },
    {
      title:
        "Classics",
      description:
        "Classic literature",
      icon:
        Building2,
      href:
        "/books",
      color:
        "from-[#EDF5FF] to-[#F3F1FF]",
      iconColor:
        "text-[#4D69D5]",
    },
    {
      title:
        "Fiction",
      description:
        "Fiction collection",
      icon:
        Sparkles,
      href:
        "/books",
      color:
        "from-[#F5EFFF] to-[#F8F2FF]",
      iconColor:
        "text-[#8652D2]",
    },
    {
      title:
        "Psychology",
      description:
        "Mind & behavior",
      icon:
        Brain,
      href:
        "/books",
      color:
        "from-[#EDF3FF] to-[#F1EFFF]",
      iconColor:
        "text-[#596DD0]",
    },
  ];

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#F8FAFF]
        via-[#F7F8FC]
        to-[#F8F4FF]
        text-[#20233A]
        transition-colors
        duration-300

        dark:from-[#10121B]
        dark:via-[#12141E]
        dark:to-[#171320]
        dark:text-[#F3F4F8]
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-8
          lg:px-8
        "
      >
        {/* HERO */}

        <HeroAuthors />

        {/* MAIN PANEL */}

        <div
          className="
            mt-8
            rounded-[28px]
            border
            border-[#E3E7F2]
            bg-white
            p-6
            shadow-[0_15px_50px_rgba(68,74,120,0.06)]
            transition-colors
            duration-300
            md:p-8

            dark:border-[#424B7A]
            dark:bg-gradient-to-br
            dark:from-[#181F34]
            dark:via-[#1C2031]
            dark:to-[#251B35]
            dark:shadow-[0_18px_55px_rgba(54,61,128,0.16)]
          "
        >
          {/* POPULAR BOOKS */}

          <section>
            <div
              className="
                mb-6
                flex
                items-end
                justify-between
                gap-4
              "
            >
              <div>
                <div
                  className="
                    mb-2
                    h-1
                    w-12
                    rounded-full
                    bg-gradient-to-r
                    from-[#4867D6]
                    to-[#7A4FD8]
                  "
                />

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-[#20233A]

                    dark:text-[#F3F4F8]
                  "
                >
                  Popular Books
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#777C92]

                    dark:text-[#A3A8BA]
                  "
                >
                  Timeless books worth discovering
                </p>
              </div>

              <Link
                href="/books"
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-semibold
                  text-[#5368CE]
                  transition

                  hover:text-[#7A4FD8]

                  dark:text-[#AAB7FF]
                  dark:hover:text-[#C298FF]
                "
              >
                View All

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {popularBooks.length >
            0 ? (
              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                  sm:grid-cols-3
                  lg:grid-cols-6
                "
              >
                {popularBooks.map(
                  (
                    book,
                    index
                  ) => {
                    const id =
                      getId(
                        book.key
                      );

                    const coverUrl =
                      `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

                    return (
                      <Link
                        key={`${book.key}-${index}`}
                        href={
                          id
                            ? `/books/${id}`
                            : "/books"
                        }
                        className="
                          group
                          min-w-0
                        "
                      >
                        <div
                          className="
                            relative
                            aspect-[2/3]
                            overflow-hidden
                            rounded-2xl
                            border
                            border-[#E4E7F2]
                            bg-[#F1F3F9]
                            shadow-sm
                            transition-all
                            duration-300

                            group-hover:-translate-y-2
                            group-hover:border-[#C9CFF0]
                            group-hover:shadow-xl
                            group-hover:shadow-indigo-100/60

                            dark:border-[#424B7A]
                            dark:bg-[#20263A]
                            dark:shadow-[0_10px_28px_rgba(35,42,90,0.22)]

                            dark:group-hover:border-[#7569D6]
                            dark:group-hover:shadow-[0_0_0_1px_rgba(116,103,216,0.25),0_18px_42px_rgba(83,92,200,0.18),0_16px_38px_rgba(122,79,216,0.20)]
                          "
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              coverUrl
                            }
                            alt={
                              book.title
                            }
                            loading={
                              index <
                              6
                                ? "eager"
                                : "lazy"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-500
                              group-hover:scale-105
                            "
                          />

                          <div
                            className="
                              pointer-events-none
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-[#5368CE]/10
                              to-transparent
                              opacity-0
                              transition
                              group-hover:opacity-100

                              dark:from-[#6C58D6]/20
                            "
                          />
                        </div>

                        <h3
                          className="
                            mt-3
                            line-clamp-2
                            text-sm
                            font-semibold
                            leading-5
                            text-[#25283D]
                            transition

                            group-hover:text-[#5368CE]

                            dark:text-[#F1F2F7]
                            dark:group-hover:text-[#C2BCFF]
                          "
                        >
                          {
                            book.title
                          }
                        </h3>

                        <p
                          className="
                            mt-1
                            truncate
                            text-xs
                            text-[#7B8095]

                            dark:text-[#A0A6B8]
                          "
                        >
                          {book
                            .author_name?.[0] ??
                            "Unknown Author"}
                        </p>

                        {book.first_publish_year && (
                          <p
                            className="
                              mt-1
                              text-xs
                              font-medium
                              text-[#7755CD]

                              dark:text-[#BC94FF]
                            "
                          >
                            {
                              book.first_publish_year
                            }
                          </p>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            ) : (
              <div
                className="
                  flex
                  min-h-[280px]
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#F6F7FC]
                  text-[#777C92]

                  dark:bg-[#1A1F2E]
                  dark:text-[#989EAF]
                "
              >
                No books available
              </div>
            )}
          </section>

          {/* AUTHORS + SHELVES */}

          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-10
              lg:grid-cols-[1fr_1.45fr]
            "
          >
            {/* AUTHORS */}

            <section>
              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      mb-2
                      h-1
                      w-10
                      rounded-full
                      bg-gradient-to-r
                      from-[#4867D6]
                      to-[#7A4FD8]
                    "
                  />

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#20233A]

                      dark:text-[#F3F4F8]
                    "
                  >
                    Authors
                  </h2>
                </div>

                <Link
                  href="/authors"
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    text-[#5368CE]
                    transition

                    hover:text-[#7A4FD8]

                    dark:text-[#AAB7FF]
                    dark:hover:text-[#C298FF]
                  "
                >
                  View All

                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {authors.length >
              0 ? (
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-6
                    sm:grid-cols-4
                  "
                >
                  {authors.map(
                    (
                      author,
                      index
                    ) => {
                      const id =
                        getId(
                          author.key
                        );

                      if (!id) {
                        return null;
                      }

                      return (
                        <Link
                          key={`${author.key}-${index}`}
                          href={`/authors/${id}`}
                          className="
                            group
                            text-center
                          "
                        >
                          <div
                            className="
                              mx-auto
                              h-24
                              w-24
                              rounded-full
                              bg-gradient-to-br
                              from-[#4867D6]
                              to-[#7A4FD8]
                              p-[3px]
                              shadow-md
                              shadow-purple-100
                              transition
                              duration-300

                              group-hover:scale-105
                              group-hover:shadow-lg

                              dark:shadow-[0_8px_26px_rgba(104,82,205,0.20)]
                            "
                          >
                            <div
                              className="
                                h-full
                                w-full
                                overflow-hidden
                                rounded-full
                                bg-white

                                dark:bg-[#171B29]
                              "
                            >
                              <AuthorImage
                                authorId={
                                  id
                                }
                                name={
                                  author.name
                                }
                                priority={
                                  index <
                                  4
                                }
                              />
                            </div>
                          </div>

                          <p
                            className="
                              mt-3
                              line-clamp-2
                              text-sm
                              font-semibold
                              text-[#292C43]
                              transition

                              group-hover:text-[#6655CC]

                              dark:text-[#F1F2F7]
                              dark:group-hover:text-[#C2BCFF]
                            "
                          >
                            {
                              author.name
                            }
                          </p>

                          {author.work_count !==
                            undefined && (
                            <p
                              className="
                                mt-1
                                text-xs
                                text-[#858A9E]

                                dark:text-[#9298AA]
                              "
                            >
                              {author.work_count.toLocaleString()}{" "}
                              works
                            </p>
                          )}
                        </Link>
                      );
                    }
                  )}
                </div>
              ) : (
                <div
                  className="
                    flex
                    min-h-[160px]
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#F7F8FC]
                    text-sm
                    text-[#7B8095]

                    dark:bg-[#1A1F2E]
                    dark:text-[#989EAF]
                  "
                >
                  No authors available
                </div>
              )}
            </section>

            {/* MY SHELVES */}

            <section>
              <div
                className="
                  mb-5
                  flex
                  items-center
                  justify-between
                "
              >
                <div>
                  <div
                    className="
                      mb-2
                      h-1
                      w-10
                      rounded-full
                      bg-gradient-to-r
                      from-[#4867D6]
                      to-[#7A4FD8]
                    "
                  />

                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#20233A]

                      dark:text-[#F3F4F8]
                    "
                  >
                    My Shelves
                  </h2>
                </div>

                <Link
                  href="/books/saved"
                  className="
                    flex
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    text-[#5368CE]
                    transition

                    hover:text-[#7A4FD8]

                    dark:text-[#AAB7FF]
                    dark:hover:text-[#C298FF]
                  "
                >
                  View Saved

                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-5
                "
              >
                {shelves.map(
                  (
                    shelf
                  ) => {
                    const Icon =
                      shelf.icon;

                    return (
                      <Link
                        key={
                          shelf.title
                        }
                        href={
                          shelf.href
                        }
                        className={`
                          group
                          rounded-2xl
                          border
                          border-[#E2E6F2]
                          bg-gradient-to-br
                          ${shelf.color}
                          px-3
                          py-5
                          text-center
                          transition-all
                          duration-300

                          hover:-translate-y-1
                          hover:border-[#C6CDF0]
                          hover:shadow-lg
                          hover:shadow-indigo-100/50

                          dark:border-[#424B7A]
                          dark:from-[#202945]
                          dark:to-[#33223F]
                          dark:shadow-[0_8px_26px_rgba(45,52,112,0.14)]

                          dark:hover:border-[#7569D6]
                          dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.20),0_14px_32px_rgba(91,78,190,0.18)]
                        `}
                      >
                        <div
                          className="
                            mx-auto
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/80
                            shadow-sm

                            dark:bg-[#171C2C]/80
                          "
                        >
                          <Icon
                            className={`
                              h-6
                              w-6
                              ${shelf.iconColor}
                            `}
                          />
                        </div>

                        <p
                          className="
                            mt-3
                            text-sm
                            font-semibold
                            text-[#2B2E44]

                            dark:text-[#F0F1F6]
                          "
                        >
                          {
                            shelf.title
                          }
                        </p>

                        <p
                          className="
                            mt-1
                            text-[11px]
                            text-[#7D8297]

                            dark:text-[#9A9FB0]
                          "
                        >
                          {
                            shelf.description
                          }
                        </p>
                      </Link>
                    );
                  }
                )}

                <Link
                  href="/books"
                  className="
                    flex
                    min-h-[130px]
                    flex-col
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-dashed
                    border-[#C9CFEC]
                    bg-[#FAFBFF]
                    text-[#6D72A3]
                    transition-all

                    hover:border-[#8060D3]
                    hover:bg-[#F5F1FF]
                    hover:text-[#7653CF]

                    dark:border-[#515B83]
                    dark:bg-[#191E2D]
                    dark:text-[#AEB5E1]

                    dark:hover:border-[#7569D6]
                    dark:hover:bg-[#28203A]
                    dark:hover:text-[#CAC4FF]
                  "
                >
                  <Plus className="h-6 w-6" />

                  <span
                    className="
                      mt-2
                      text-xs
                      font-medium
                    "
                  >
                    New Shelf
                  </span>
                </Link>
              </div>
            </section>
          </div>

          {/* LOWER */}

          <div
            className="
              mt-12
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-[0.9fr_1fr_1.45fr]
            "
          >
            {/* SEARCH */}

            <section
              className="
                rounded-2xl
                border
                border-[#E2E6F2]
                bg-gradient-to-br
                from-[#FAFBFF]
                to-[#F7F5FF]
                p-5

                dark:border-[#424B7A]
                dark:from-[#181F34]
                dark:to-[#251B35]
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#EEF2FF]
                    text-[#5368CE]

                    dark:bg-[#29365D]
                    dark:text-[#A8B4FF]
                  "
                >
                  <Search className="h-4 w-4" />
                </div>

                <h2
                  className="
                    text-lg
                    font-bold
                    text-[#25283D]

                    dark:text-[#F3F4F8]
                  "
                >
                  Search
                </h2>
              </div>

              <Link
                href="/books"
                className="
                  mt-5
                  flex
                  h-11
                  items-center
                  rounded-xl
                  border
                  border-[#DDE2F2]
                  bg-white
                  px-3
                  text-sm
                  text-[#858A9F]
                  shadow-sm
                  transition

                  hover:border-[#AEB9E8]
                  hover:ring-2
                  hover:ring-[#EEF1FF]

                  dark:border-[#414B70]
                  dark:bg-[#171B29]
                  dark:text-[#969CAE]

                  dark:hover:border-[#7569D6]
                  dark:hover:ring-[#6763C9]/15
                "
              >
                Search books...

                <Search
                  className="
                    ml-auto
                    h-4
                    w-4
                    text-[#6571BE]

                    dark:text-[#9EACFF]
                  "
                />
              </Link>

              <p
                className="
                  mt-6
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-[#858AA0]

                  dark:text-[#9298AA]
                "
              >
                Popular searches
              </p>

              <div
                className="
                  mt-3
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {[
                  "fiction",
                  "programming",
                  "history",
                  "poetry",
                  "psychology",
                  "science",
                ].map(
                  (
                    term
                  ) => (
                    <Link
                      key={
                        term
                      }
                      href="/books"
                      className="
                        rounded-full
                        border
                        border-[#E0E4F2]
                        bg-white
                        px-3
                        py-1.5
                        text-xs
                        text-[#66708D]
                        transition

                        hover:border-[#C4CBEF]
                        hover:bg-[#EEF2FF]
                        hover:text-[#5368CE]

                        dark:border-[#424C72]
                        dark:bg-[#1A1E2C]
                        dark:text-[#AAB2DF]

                        dark:hover:border-[#7467D8]
                        dark:hover:bg-[#28203A]
                        dark:hover:text-[#C8C2FF]
                      "
                    >
                      {term}
                    </Link>
                  )
                )}
              </div>
            </section>

            {/* SAVED */}

            <HomeSavedPreview />

            {/* FEATURED */}

            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#E2E6F2]
                bg-gradient-to-br
                from-white
                to-[#F8F6FF]
                p-5

                dark:border-[#424B7A]
                dark:from-[#181F34]
                dark:to-[#251B35]
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <h2
                  className="
                    text-lg
                    font-bold
                    text-[#25283D]

                    dark:text-[#F3F4F8]
                  "
                >
                  Continue Reading
                </h2>

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#EEF2FF]
                    to-[#F3ECFF]
                    text-[#7154CF]

                    dark:from-[#29365D]
                    dark:to-[#3A294F]
                    dark:text-[#C298FF]
                  "
                >
                  <BookHeart className="h-5 w-5" />
                </div>
              </div>

              {featuredBook ? (
                <div
                  className="
                    mt-5
                    flex
                    gap-5
                  "
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://covers.openlibrary.org/b/id/${featuredBook.cover_i}-M.jpg`}
                    alt={
                      featuredBook.title
                    }
                    loading="lazy"
                    className="
                      h-40
                      w-28
                      shrink-0
                      rounded-xl
                      object-cover
                      shadow-lg
                      shadow-indigo-100

                      dark:shadow-[0_12px_30px_rgba(62,70,145,0.28)]
                    "
                  />

                  <div className="min-w-0">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-[#EEEFFF]
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#655CC1]

                        dark:bg-[#2D3152]
                        dark:text-[#C2BCFF]
                      "
                    >
                      Featured
                    </span>

                    <h3
                      className="
                        mt-2
                        line-clamp-2
                        text-xl
                        font-bold
                        text-[#292C43]

                        dark:text-[#F3F4F8]
                      "
                    >
                      {
                        featuredBook.title
                      }
                    </h3>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-[#7B8095]

                        dark:text-[#A0A6B8]
                      "
                    >
                      {featuredBook
                        .author_name?.[0] ??
                        "Unknown Author"}
                    </p>

                    <p
                      className="
                        mt-4
                        line-clamp-2
                        text-sm
                        leading-6
                        text-[#858A9F]

                        dark:text-[#9DA3B5]
                      "
                    >
                      Continue exploring
                      this book and
                      discover more about
                      its story.
                    </p>

                    <Link
                      href={
                        getId(
                          featuredBook.key
                        )
                          ? `/books/${getId(
                              featuredBook.key
                            )}`
                          : "/books"
                      }
                      className="
                        mt-4
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#4867D6]
                        to-[#7A4FD8]
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        shadow-md
                        shadow-purple-200/40
                        transition

                        hover:brightness-105
                        hover:shadow-lg

                        dark:from-[#566EE0]
                        dark:to-[#8458D8]
                        dark:shadow-[0_8px_24px_rgba(100,82,205,0.22)]
                      "
                    >
                      Continue

                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <p
                  className="
                    mt-6
                    text-sm
                    text-[#858A9F]

                    dark:text-[#989EAF]
                  "
                >
                  No featured book available.
                </p>
              )}
            </section>
          </div>
        </div>

        {/* FOOTER */}

        <footer
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-3
            py-8
            text-sm
            text-[#80859B]
            sm:flex-row

            dark:text-[#8F95A7]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              font-medium
            "
          >
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-[#4867D6]
                to-[#7A4FD8]
                text-white
              "
            >
              <Library className="h-4 w-4" />
            </div>

            BookLibrary
          </div>

          <span>
            Powered by Open Library
          </span>
        </footer>
      </div>
    </main>
  );
}