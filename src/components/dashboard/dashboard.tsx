"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Activity,
  ArrowRight,
  BookOpen,
  Bookmark,
  Library,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";

import BookDataTable from "./BookDataTable";
import AuthorDataTable from "./AuthorDataTable";

interface RecentChangeItem {
  key?: string;
  revision?: number;
}

interface RecentChangeAuthor {
  key?: string;
}

interface RecentChange {
  id?: string | number;
  kind?: string;
  timestamp?: string;
  author?: RecentChangeAuthor;
  changes?: RecentChangeItem[];
}

export default function AdminDashboard() {
  const [
    savedBooks,
    setSavedBooks,
  ] = useState(0);

  const [
    recentChanges,
    setRecentChanges,
  ] = useState<
    RecentChange[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const updateSavedCount =
    useCallback(() => {
      try {
        const saved =
          localStorage.getItem(
            "savedBooks"
          );

        if (!saved) {
          setSavedBooks(0);
          return;
        }

        const parsed =
          JSON.parse(saved);

        setSavedBooks(
          Array.isArray(parsed)
            ? parsed.length
            : 0
        );
      } catch {
        setSavedBooks(0);
      }
    }, []);

  const loadDashboard =
    useCallback(
      async (
        refresh = false
      ) => {
        try {
          if (refresh) {
            setRefreshing(true);
          } else {
            setLoading(true);
          }

          updateSavedCount();

          const response =
            await fetch(
              "https://openlibrary.org/recentchanges.json"
            );

          if (response.ok) {
            const data:
              RecentChange[] =
              await response.json();

            setRecentChanges(
              Array.isArray(
                data
              )
                ? data.slice(
                    0,
                    5
                  )
                : []
            );
          }
        } catch (error) {
          console.error(
            "Dashboard error:",
            error
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      [updateSavedCount]
    );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    window.addEventListener(
      "storage",
      updateSavedCount
    );

    window.addEventListener(
      "savedBooksUpdated",
      updateSavedCount
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateSavedCount
      );

      window.removeEventListener(
        "savedBooksUpdated",
        updateSavedCount
      );
    };
  }, [updateSavedCount]);

  const formatDate = (
    timestamp?: string
  ) => {
    if (!timestamp) {
      return "Unknown";
    }

    const date =
      new Date(timestamp);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return timestamp;
    }

    return date.toLocaleString();
  };

  const getResource = (
    change: RecentChange
  ) => {
    return (
      change.changes?.[0]
        ?.key ?? "Unknown"
    );
  };

  /* LOADING */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[620px]
          flex-col
          items-center
          justify-center
          gap-5
          rounded-[28px]
          border
          border-[#E3E7F2]
          bg-gradient-to-br
          from-[#FAFBFF]
          via-white
          to-[#F8F5FF]

          dark:border-[#424B7A]
          dark:from-[#181F34]
          dark:via-[#1C2031]
          dark:to-[#251B35]
          dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]
        "
      >
        <div
          className="
            relative
            flex
            h-20
            w-20
            items-center
            justify-center
          "
        >
          <div
            className="
              absolute
              inset-0
              animate-spin
              rounded-full
              border-4
              border-[#E4E8F4]
              border-t-[#6657C9]

              dark:border-[#343B58]
              dark:border-t-[#9F83FF]
            "
          />

          <Library
            className="
              h-8
              w-8
              text-[#5968C1]

              dark:text-[#A8B3FF]
            "
          />
        </div>

        <div className="text-center">
          <p
            className="
              text-lg
              font-bold
              text-[#30344A]

              dark:text-[#F3F4F8]
            "
          >
            Loading Dashboard
          </p>

          <p
            className="
              mt-1
              text-sm
              text-[#8A8FA3]

              dark:text-[#989EAF]
            "
          >
            Preparing your library overview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#F7FAFF]
        via-[#F8F9FD]
        to-[#F9F5FF]
        transition-colors
        duration-300

        dark:from-[#10121B]
        dark:via-[#12141E]
        dark:to-[#171320]
      "
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-10
          lg:px-8
        "
      >
        {/* HERO */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-r
            from-[#293A86]
            via-[#4861C7]
            to-[#7650D3]
            px-7
            py-9
            text-white
            shadow-[0_20px_60px_rgba(73,78,170,0.22)]
            md:px-10

            dark:from-[#1B285F]
            dark:via-[#33499D]
            dark:to-[#593797]
            dark:shadow-[0_20px_65px_rgba(21,24,65,0.45)]
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-20
              h-72
              w-72
              rounded-full
              bg-[#B89BFF]/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24
              left-[30%]
              h-64
              w-64
              rounded-full
              bg-[#7398FF]/15
              blur-3xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-7
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/20
                  bg-white/15
                  backdrop-blur-md
                "
              >
                <Library className="h-6 w-6" />
              </div>

              <p
                className="
                  mt-5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-white/60
                "
              >
                Library Management
              </p>

              <h1
                className="
                  mt-2
                  text-3xl
                  font-bold
                  tracking-tight
                  md:text-4xl
                "
              >
                Admin Dashboard
              </h1>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-white/70
                "
              >
                Explore books, authors,
                saved collections and
                recent Open Library
                activity from one place.
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {[
                  {
                    icon:
                      BookOpen,
                    label:
                      "Books",
                  },
                  {
                    icon:
                      Users,
                    label:
                      "Authors",
                  },
                  {
                    icon:
                      Activity,
                    label:
                      "Activity",
                  },
                ].map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <span
                        key={
                          item.label
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/15
                          bg-white/10
                          px-3
                          py-1.5
                          text-xs
                          text-white/80
                          backdrop-blur
                        "
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {
                          item.label
                        }
                      </span>
                    );
                  }
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={
                refreshing
              }
              onClick={() =>
                loadDashboard(
                  true
                )
              }
              className="
                flex
                h-11
                w-fit
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/20
                bg-white/15
                px-5
                text-sm
                font-semibold
                text-white
                backdrop-blur-md
                transition-all

                hover:-translate-y-0.5
                hover:bg-white/20

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <RefreshCw
                className={`
                  h-4
                  w-4

                  ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                `}
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>
        </section>

        {/* OVERVIEW */}

        <section className="mt-7">
          <div
            className="
              mb-5
              flex
              items-end
              justify-between
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
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                Overview
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#858A9F]

                  dark:text-[#A3A8BA]
                "
              >
                Quick access to your library sections
              </p>
            </div>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {/* BOOKS */}

            <Link
              href="/books"
              className="group"
            >
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(72,80,130,0.06)]
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#C7CEF0]
                  hover:shadow-[0_18px_45px_rgba(80,92,180,0.14)]

                  dark:border-[#424B7A]
                  dark:bg-gradient-to-br
                  dark:from-[#181F34]
                  dark:via-[#1C2031]
                  dark:to-[#251B35]
                  dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]

                  dark:hover:border-[#7569D6]
                  dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    from-[#4867D6]
                    to-[#6377DC]
                  "
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EEF2FF]
                      text-[#5368CE]

                      dark:bg-[#29365D]
                      dark:text-[#A8B4FF]
                    "
                  >
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      text-[#A1A5B5]
                      transition-transform

                      group-hover:translate-x-1
                      group-hover:text-[#5368CE]

                      dark:text-[#747B91]
                      dark:group-hover:text-[#BDB7FF]
                    "
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#292C43]

                    dark:text-[#F3F4F8]
                  "
                >
                  Books
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#858A9F]

                    dark:text-[#A3A8BA]
                  "
                >
                  Browse and search the Open Library book collection.
                </p>

                <div
                  className="
                    mt-5
                    text-xs
                    font-semibold
                    text-[#5368CE]

                    dark:text-[#AAB7FF]
                  "
                >
                  Explore Books →
                </div>
              </div>
            </Link>

            {/* AUTHORS */}

            <Link
              href="/authors"
              className="group"
            >
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(72,80,130,0.06)]
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#CEC6F0]
                  hover:shadow-[0_18px_45px_rgba(105,82,190,0.14)]

                  dark:border-[#424B7A]
                  dark:bg-gradient-to-br
                  dark:from-[#181F34]
                  dark:via-[#1C2031]
                  dark:to-[#251B35]
                  dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]

                  dark:hover:border-[#7569D6]
                  dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    from-[#665DD1]
                    to-[#7A4FD8]
                  "
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#F4EEFF]
                      text-[#7653CF]

                      dark:bg-[#38284D]
                      dark:text-[#C298FF]
                    "
                  >
                    <Users className="h-5 w-5" />
                  </div>

                  <ArrowRight
                    className="
                      h-5
                      w-5
                      text-[#A1A5B5]
                      transition-transform

                      group-hover:translate-x-1
                      group-hover:text-[#7653CF]

                      dark:text-[#747B91]
                      dark:group-hover:text-[#C6BFFF]
                    "
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#292C43]

                    dark:text-[#F3F4F8]
                  "
                >
                  Authors
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#858A9F]

                    dark:text-[#A3A8BA]
                  "
                >
                  Discover writers and explore their published works.
                </p>

                <div
                  className="
                    mt-5
                    text-xs
                    font-semibold
                    text-[#7653CF]

                    dark:text-[#C298FF]
                  "
                >
                  Explore Authors →
                </div>
              </div>
            </Link>

            {/* SAVED */}

            <Link
              href="/books/saved"
              className="group"
            >
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(72,80,130,0.06)]
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#C9CBEF]
                  hover:shadow-[0_18px_45px_rgba(95,83,190,0.14)]

                  dark:border-[#424B7A]
                  dark:bg-gradient-to-br
                  dark:from-[#181F34]
                  dark:via-[#1C2031]
                  dark:to-[#251B35]
                  dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]

                  dark:hover:border-[#7569D6]
                  dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]
                "
              >
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

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#EEF2FF]
                      to-[#F4EEFF]
                      text-[#655CC1]

                      dark:from-[#29365D]
                      dark:to-[#3A294F]
                      dark:text-[#BDB6FF]
                    "
                  >
                    <Bookmark className="h-5 w-5" />
                  </div>

                  <span
                    className="
                      text-3xl
                      font-bold
                      text-[#5368CE]

                      dark:text-[#AAB7FF]
                    "
                  >
                    {savedBooks}
                  </span>
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#292C43]

                    dark:text-[#F3F4F8]
                  "
                >
                  Saved Books
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#858A9F]

                    dark:text-[#A3A8BA]
                  "
                >
                  Books saved locally in this browser.
                </p>

                <div
                  className="
                    mt-5
                    text-xs
                    font-semibold
                    text-[#655CC1]

                    dark:text-[#BDB6FF]
                  "
                >
                  View Collection →
                </div>
              </div>
            </Link>

            {/* ACTIVITY */}

            <Link
              href="/recent"
              className="group"
            >
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(72,80,130,0.06)]
                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[#C7CEF0]
                  hover:shadow-[0_18px_45px_rgba(80,92,180,0.14)]

                  dark:border-[#424B7A]
                  dark:bg-gradient-to-br
                  dark:from-[#181F34]
                  dark:via-[#1C2031]
                  dark:to-[#251B35]
                  dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]

                  dark:hover:border-[#7569D6]
                  dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-0
                    h-1
                    bg-gradient-to-r
                    from-[#6170D3]
                    to-[#8961D9]
                  "
                />

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#F2F2FF]
                      text-[#6A63C9]

                      dark:bg-[#302E51]
                      dark:text-[#BCB7FF]
                    "
                  >
                    <Activity className="h-5 w-5" />
                  </div>

                  <span
                    className="
                      text-3xl
                      font-bold
                      text-[#7653CF]

                      dark:text-[#C298FF]
                    "
                  >
                    {
                      recentChanges.length
                    }
                  </span>
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-[#292C43]

                    dark:text-[#F3F4F8]
                  "
                >
                  Recent Activity
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-6
                    text-[#858A9F]

                    dark:text-[#A3A8BA]
                  "
                >
                  Latest updates from Open Library.
                </p>

                <div
                  className="
                    mt-5
                    text-xs
                    font-semibold
                    text-[#7653CF]

                    dark:text-[#C298FF]
                  "
                >
                  View Activity →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* BOOK TABLE */}

        <section className="mt-10">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
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
                dark:text-[#A8B4FF]
              "
            >
              <BookOpen className="h-5 w-5" />
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
                Book Explorer
              </h2>

              <p
                className="
                  text-sm
                  text-[#8A8FA3]

                  dark:text-[#989EAF]
                "
              >
                Search and inspect books
              </p>
            </div>
          </div>

          <BookDataTable />
        </section>

        {/* AUTHOR TABLE */}

        <section className="mt-10">
          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#F4EEFF]
                text-[#7653CF]

                dark:bg-[#38284D]
                dark:text-[#C298FF]
              "
            >
              <Users className="h-5 w-5" />
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
                Author Explorer
              </h2>

              <p
                className="
                  text-sm
                  text-[#8A8FA3]

                  dark:text-[#989EAF]
                "
              >
                Search and inspect authors
              </p>
            </div>
          </div>

          <AuthorDataTable />
        </section>

        {/* RECENT ACTIVITY */}

        <section
          className="
            mt-10
            overflow-hidden
            rounded-[26px]
            border
            border-[#E3E7F2]
            bg-white
            shadow-[0_12px_40px_rgba(72,80,130,0.07)]

            dark:border-[#424B7A]
            dark:bg-gradient-to-br
            dark:from-[#181F34]
            dark:via-[#1C2031]
            dark:to-[#251B35]
            dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b
              border-[#E7EAF3]
              bg-gradient-to-r
              from-[#FAFBFF]
              via-white
              to-[#FBF8FF]
              p-6

              dark:border-[#343A57]
              dark:from-[#181E31]
              dark:via-[#1C2031]
              dark:to-[#251B32]
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
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
                <Activity className="h-5 w-5" />
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
                  Recent Activity
                </h2>

                <p
                  className="
                    text-sm
                    text-[#858A9F]

                    dark:text-[#A3A8BA]
                  "
                >
                  Latest Open Library changes
                </p>
              </div>
            </div>

            <Link
              href="/recent"
              className="
                group
                flex
                items-center
                gap-1
                text-sm
                font-semibold
                text-[#5368CE]
                transition

                hover:text-[#7653CF]

                dark:text-[#AAB7FF]
                dark:hover:text-[#C298FF]
              "
            >
              View all

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>

          {/* CONTENT */}

          <div
            className="
              divide-y
              divide-[#EDF0F6]
              px-6

              dark:divide-[#343A57]
            "
          >
            {recentChanges.length ===
            0 ? (
              <div
                className="
                  flex
                  min-h-[240px]
                  flex-col
                  items-center
                  justify-center
                  text-center
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
                  <Activity className="h-7 w-7" />
                </div>

                <h3
                  className="
                    mt-4
                    font-semibold
                    text-[#30344A]

                    dark:text-[#F3F4F8]
                  "
                >
                  No recent activity
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#8A8FA3]

                    dark:text-[#989EAF]
                  "
                >
                  Recent Open Library changes will appear here.
                </p>
              </div>
            ) : (
              recentChanges.map(
                (
                  change,
                  index
                ) => {
                  const resource =
                    getResource(
                      change
                    );

                  const uniqueKey =
                    [
                      change.id ??
                        "no-id",
                      change.timestamp ??
                        "no-time",
                      resource,
                      index,
                    ].join("-");

                  return (
                    <div
                      key={
                        uniqueKey
                      }
                      className="
                        group
                        flex
                        items-start
                        gap-4
                        py-5
                        transition
                      "
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-[#EEF2FF]
                          to-[#F4EEFF]
                          text-[#6658C7]
                          transition

                          group-hover:scale-105

                          dark:from-[#29365D]
                          dark:to-[#3A294F]
                          dark:text-[#BDB6FF]
                        "
                      >
                        <Activity className="h-4 w-4" />
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <div
                          className="
                            flex
                            flex-wrap
                            items-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              font-semibold
                              text-[#30344A]

                              dark:text-[#F1F2F7]
                            "
                          >
                            {change.kind ??
                              "Change"}
                          </span>

                          {change
                            .changes?.[0]
                            ?.revision !==
                            undefined && (
                            <span
                              className="
                                rounded-full
                                border
                                border-[#DDE2F2]
                                bg-gradient-to-r
                                from-[#F2F5FF]
                                to-[#F7F1FF]
                                px-2.5
                                py-1
                                text-[10px]
                                font-semibold
                                text-[#656BA9]

                                dark:border-[#465078]
                                dark:from-[#252F50]
                                dark:to-[#352548]
                                dark:text-[#BBB9ED]
                              "
                            >
                              Rev{" "}
                              {
                                change
                                  .changes[0]
                                  .revision
                              }
                            </span>
                          )}
                        </div>

                        <p
                          className="
                            mt-1
                            max-w-3xl
                            truncate
                            text-sm
                            text-[#777D93]

                            dark:text-[#A6ACBD]
                          "
                        >
                          {resource}
                        </p>

                        <p
                          className="
                            mt-2
                            text-xs
                            text-[#A0A4B5]

                            dark:text-[#7F8598]
                          "
                        >
                          {formatDate(
                            change.timestamp
                          )}
                        </p>
                      </div>

                      <Sparkles
                        className="
                          mt-2
                          h-4
                          w-4
                          text-[#C1C5D6]
                          opacity-0
                          transition

                          group-hover:opacity-100

                          dark:text-[#817AA9]
                        "
                      />
                    </div>
                  );
                }
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}