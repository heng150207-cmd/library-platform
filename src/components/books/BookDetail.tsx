"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CalendarDays,
  ExternalLink,
  LibraryBig,
  Tag,
  User,
} from "lucide-react";

interface BookAuthor {
  author?: {
    key?: string;
  };
}

interface BookLink {
  title?: string;
  url?: string;
}

interface BookWork {
  key: string;
  title: string;

  description?:
    | string
    | {
        type?: string;
        value?: string;
      };

  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;

  authors?: BookAuthor[];
  links?: BookLink[];
}

interface BookDetailProps {
  book: BookWork;
  bookId: string;
}

function getDescription(
  description: BookWork["description"]
): string {
  if (!description) {
    return "No description is available for this book.";
  }

  if (typeof description === "string") {
    return description;
  }

  if (
    typeof description.value === "string"
  ) {
    return description.value;
  }

  return "No description is available for this book.";
}

function getId(key?: string) {
  if (!key) return null;

  return key
    .split("/")
    .filter(Boolean)
    .pop();
}

export default function BookDetail({
  book,
  bookId,
}: BookDetailProps) {
  const [saved, setSaved] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "savedBooks"
        );

      if (!stored) {
        setSaved(false);
        return;
      }

      const parsed =
        JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        setSaved(false);
        return;
      }

      setSaved(
        parsed.includes(bookId)
      );
    } catch {
      setSaved(false);
    }
  }, [bookId]);

  useEffect(() => {
    setImageError(false);
  }, [bookId]);

  function handleSave() {
    try {
      const stored =
        localStorage.getItem(
          "savedBooks"
        );

      let savedBooks: string[] = [];

      if (stored) {
        const parsed =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          savedBooks = parsed;
        }
      }

      if (
        savedBooks.includes(bookId)
      ) {
        const updated =
          savedBooks.filter(
            (id) =>
              id !== bookId
          );

        localStorage.setItem(
          "savedBooks",
          JSON.stringify(updated)
        );

        setSaved(false);
      } else {
        const updated = [
          ...savedBooks,
          bookId,
        ];

        localStorage.setItem(
          "savedBooks",
          JSON.stringify(updated)
        );

        setSaved(true);
      }

      window.dispatchEvent(
        new Event(
          "savedBooksUpdated"
        )
      );
    } catch (error) {
      console.error(
        "Failed to update saved books:",
        error
      );
    }
  }

  const title =
    book?.title || "Unknown Book";

  const description =
    getDescription(
      book?.description
    );

  const subjects =
    Array.isArray(book?.subjects)
      ? [
          ...new Set(
            book.subjects
          ),
        ]
      : [];

  const authors =
    Array.isArray(book?.authors)
      ? book.authors
      : [];

  const links =
    Array.isArray(book?.links)
      ? book.links
      : [];

  const coverId =
    Array.isArray(book?.covers)
      ? book.covers.find(
          (cover) => cover > 0
        )
      : undefined;

  const coverUrl =
    coverId &&
    typeof coverId === "number"
      ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
      : null;

  return (
    <section
      className="
        overflow-hidden
        rounded-[30px]
        border
        border-[#E3E7F2]
        bg-white
        shadow-[0_18px_60px_rgba(72,80,130,0.10)]
        transition-colors

        dark:border-[#475183]
        dark:bg-gradient-to-br
        dark:from-[#181F34]
        dark:via-[#1C2031]
        dark:to-[#251B35]
        dark:shadow-[0_18px_60px_rgba(55,62,130,0.15)]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[360px_1fr]
        "
      >
        {/* LEFT */}

        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#EEF3FF]
            via-[#F5F6FF]
            to-[#F4EEFF]
            p-7
            md:p-8

            dark:from-[#192643]
            dark:via-[#20233B]
            dark:to-[#2A1D3D]
          "
        >
          <div
            className="
              absolute
              -left-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-[#4867D6]/10
              blur-3xl

              dark:bg-[#4867D6]/20
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -right-16
              h-56
              w-56
              rounded-full
              bg-[#7A4FD8]/10
              blur-3xl

              dark:bg-[#7A4FD8]/20
            "
          />

          <div className="relative z-10">
            {/* COVER */}

            <div
              className="
                relative
                mx-auto
                aspect-[2/3]
                w-full
                max-w-[300px]
                overflow-hidden
                rounded-[22px]
                border
                border-white
                bg-white/70
                shadow-[0_18px_45px_rgba(52,62,115,0.18)]

                dark:border-[#59638C]
                dark:bg-[#171B29]
                dark:shadow-[0_20px_55px_rgba(67,76,155,0.24)]
              "
            >
              {coverUrl &&
              !imageError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt={title}
                  loading="eager"
                  fetchPriority="high"
                  onError={() =>
                    setImageError(
                      true
                    )
                  }
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    hover:scale-105
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    bg-gradient-to-br
                    from-[#EEF2FF]
                    to-[#F4EEFF]
                    text-[#6A68B8]

                    dark:from-[#202945]
                    dark:to-[#33223F]
                    dark:text-[#B8B3FF]
                  "
                >
                  <div
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-3xl
                      bg-white/80
                      shadow-sm

                      dark:bg-[#171C2C]/80
                    "
                  >
                    <BookOpen className="h-10 w-10" />
                  </div>

                  <span
                    className="
                      text-sm
                      font-medium
                      text-[#858AA0]

                      dark:text-[#A2A8BA]
                    "
                  >
                    No cover available
                  </span>
                </div>
              )}

              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-0
                  h-1
                  bg-gradient-to-r
                  from-[#4867D6]
                  to-[#7A4FD8]
                "
              />
            </div>

            {/* SAVE */}

            <button
              type="button"
              onClick={handleSave}
              className={`
                mx-auto
                mt-6
                flex
                h-12
                w-full
                max-w-[300px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                text-sm
                font-semibold
                transition-all
                duration-300

                ${
                  saved
                    ? `
                      border-transparent
                      bg-gradient-to-r
                      from-[#4867D6]
                      to-[#7A4FD8]
                      text-white
                      shadow-lg
                      shadow-purple-200/50

                      dark:shadow-[0_12px_34px_rgba(108,85,220,0.28)]
                    `
                    : `
                      border-[#D9DEF0]
                      bg-white
                      text-[#5D67B7]
                      shadow-sm

                      hover:-translate-y-0.5
                      hover:border-[#C4CBEA]
                      hover:bg-[#F3F4FF]
                      hover:text-[#7653CF]

                      dark:border-[#465078]
                      dark:bg-[#1A1E2C]
                      dark:text-[#AAB5F0]

                      dark:hover:border-[#7569D6]
                      dark:hover:bg-[#28203A]
                      dark:hover:text-[#C8C2FF]
                      dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.22),0_12px_30px_rgba(91,78,190,0.18)]
                    `
                }
              `}
            >
              {saved ? (
                <>
                  <BookmarkCheck className="h-5 w-5" />
                  Saved Book
                </>
              ) : (
                <>
                  <Bookmark className="h-5 w-5" />
                  Save Book
                </>
              )}
            </button>

            {/* WORK ID */}

            <div
              className="
                mx-auto
                mt-4
                flex
                max-w-[300px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white
                bg-white/60
                px-3
                py-2.5
                text-xs
                text-[#777D94]
                backdrop-blur

                dark:border-[#465078]
                dark:bg-[#171C2A]/65
                dark:text-[#A0A6B8]
              "
            >
              <BookOpen
                className="
                  h-4
                  w-4
                  text-[#6470C5]

                  dark:text-[#9EACFF]
                "
              />

              {bookId}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
            min-w-0
            p-7
            md:p-9
            lg:p-10
          "
        >
          <div>
            <div
              className="
                mb-4
                h-1
                w-12
                rounded-full
                bg-gradient-to-r
                from-[#4867D6]
                to-[#7A4FD8]
              "
            />

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#6E74B1]

                dark:text-[#9995E8]
              "
            >
              Open Library Work
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-[#24273D]
                md:text-4xl
                lg:text-5xl

                dark:text-[#F4F4F9]
              "
            >
              {title}
            </h1>
          </div>

          {/* META */}

          <div
            className="
              mt-6
              flex
              flex-wrap
              gap-3
            "
          >
            {book.first_publish_date && (
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#DDE2F2]
                  bg-gradient-to-r
                  from-[#F2F5FF]
                  to-[#F7F2FF]
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-[#6169AE]

                  dark:border-[#465078]
                  dark:from-[#252F50]
                  dark:to-[#352548]
                  dark:text-[#B9BEF2]
                "
              >
                <CalendarDays className="h-4 w-4 text-[#5368CE] dark:text-[#9FACFF]" />

                {book.first_publish_date}
              </div>
            )}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#E0DCF1]
                bg-[#F7F3FF]
                px-4
                py-2
                text-xs
                font-semibold
                text-[#7558C3]

                dark:border-[#584B78]
                dark:bg-[#302440]
                dark:text-[#C39DFF]
              "
            >
              <LibraryBig className="h-4 w-4" />
              Book Details
            </div>
          </div>

          {/* AUTHORS */}

          {authors.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-[#EEF2FF]
                    to-[#F4EEFF]
                    text-[#6658C7]

                    dark:from-[#29365D]
                    dark:to-[#3A294F]
                    dark:text-[#BDB6FF]
                  "
                >
                  <User className="h-5 w-5" />
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
                    Authors
                  </h2>

                  <p
                    className="
                      text-xs
                      text-[#8A8FA3]

                      dark:text-[#969CAE]
                    "
                  >
                    Explore the author profile
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {authors.map(
                  (item, index) => {
                    const authorId =
                      getId(
                        item.author
                          ?.key
                      );

                    if (!authorId) {
                      return null;
                    }

                    return (
                      <Link
                        key={`${authorId}-${index}`}
                        href={`/authors/${authorId}`}
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-[#DDE2F2]
                          bg-white
                          px-4
                          py-2.5
                          text-sm
                          font-semibold
                          text-[#5D68B8]
                          transition-all

                          hover:-translate-y-0.5
                          hover:border-[#C8CEED]
                          hover:bg-[#F3F4FF]
                          hover:text-[#7555C8]

                          dark:border-[#465078]
                          dark:bg-[#1A1E2C]
                          dark:text-[#ABB6F1]

                          dark:hover:border-[#7569D6]
                          dark:hover:bg-[#28203A]
                          dark:hover:text-[#CAC4FF]
                          dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.18),0_10px_26px_rgba(91,78,190,0.16)]
                        "
                      >
                        <User className="h-4 w-4" />

                        View Author
                      </Link>
                    );
                  }
                )}
              </div>
            </section>
          )}

          {/* DESCRIPTION */}

          <section
            className="
              mt-8
              rounded-2xl
              border
              border-[#E5E8F2]
              bg-gradient-to-br
              from-[#FBFCFF]
              to-[#FAF8FF]
              p-5
              md:p-6

              dark:border-[#40496D]
              dark:from-[#1A2238]
              dark:to-[#281F38]
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#EEF2FF]
                  text-[#5368CE]

                  dark:bg-[#29365D]
                  dark:text-[#A4B2FF]
                "
              >
                <BookOpen className="h-5 w-5" />
              </div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                About this book
              </h2>
            </div>

            <p
              className="
                mt-5
                whitespace-pre-line
                text-sm
                leading-7
                text-[#73798F]
                md:text-base

                dark:text-[#A9AEBF]
              "
            >
              {description}
            </p>
          </section>

          {/* SUBJECTS */}

          {subjects.length > 0 && (
            <section className="mt-8">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#F4EEFF]
                    text-[#7A4FD8]

                    dark:bg-[#38284D]
                    dark:text-[#C298FF]
                  "
                >
                  <Tag className="h-5 w-5" />
                </div>

                <div>
                  <h2
                    className="
                      text-xl
                      font-bold
                      text-[#292C43]

                      dark:text-[#F3F4F8]
                    "
                  >
                    Subjects
                  </h2>

                  <p
                    className="
                      text-xs
                      text-[#8A8FA3]

                      dark:text-[#969CAE]
                    "
                  >
                    Topics related to this book
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {subjects
                  .slice(0, 15)
                  .map(
                    (
                      subject,
                      index
                    ) => (
                      <span
                        key={`${subject}-${index}`}
                        className="
                          rounded-full
                          border
                          border-[#DDE2F4]
                          bg-gradient-to-r
                          from-[#F2F5FF]
                          to-[#F7F1FF]
                          px-3
                          py-1.5
                          text-xs
                          font-medium
                          text-[#6268A9]
                          transition

                          hover:border-[#C5CCEE]
                          hover:text-[#7555C8]

                          dark:border-[#465078]
                          dark:from-[#252F50]
                          dark:to-[#352548]
                          dark:text-[#BBB9ED]

                          dark:hover:border-[#7569D6]
                          dark:hover:text-[#D0CAFF]
                        "
                      >
                        {subject}
                      </span>
                    )
                  )}
              </div>
            </section>
          )}

          {/* LINKS */}

          {links.length > 0 && (
            <section className="mt-8">
              <h2
                className="
                  text-xl
                  font-bold
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                Related Links
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#8A8FA3]

                  dark:text-[#969CAE]
                "
              >
                External resources about this book
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-3
                "
              >
                {links
                  .slice(0, 5)
                  .map(
                    (
                      link,
                      index
                    ) => {
                      if (!link.url) {
                        return null;
                      }

                      return (
                        <a
                          key={`${link.url}-${index}`}
                          href={
                            link.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-[#DDE2F2]
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-[#5967BE]
                            transition-all

                            hover:-translate-y-0.5
                            hover:border-[#C6CCEB]
                            hover:bg-[#F5F2FF]
                            hover:text-[#7653CF]

                            dark:border-[#465078]
                            dark:bg-[#1A1E2C]
                            dark:text-[#ABB6F1]

                            dark:hover:border-[#7569D6]
                            dark:hover:bg-[#28203A]
                            dark:hover:text-[#CEC7FF]
                            dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.20),0_10px_28px_rgba(91,78,190,0.16)]
                          "
                        >
                          {link.title ||
                            "Open Link"}

                          <ExternalLink className="h-4 w-4" />
                        </a>
                      );
                    }
                  )}
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
}