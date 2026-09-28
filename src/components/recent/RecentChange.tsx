import { Suspense } from "react";
import Link from "next/link";

import {
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  FileText,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";

interface RecentChangeItem {
  key?: string;
  revision?: number;
}

interface RecentChangeAuthor {
  key?: string;
}

interface RecentChange {
  id?: number | string;
  kind?: string;
  timestamp?: string;
  comment?: string;
  author?: RecentChangeAuthor;
  changes?: RecentChangeItem[];
  [key: string]: unknown;
}

const DISPLAY_LIMIT = 20;

async function getRecentChanges(): Promise<RecentChange[]> {
  const response = await fetch(
    "https://openlibrary.org/recentchanges.json",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recent changes: ${response.status}`
    );
  }

  const data: RecentChange[] = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.slice(0, DISPLAY_LIMIT);
}

function formatDate(timestamp?: string) {
  if (!timestamp) {
    return "Unknown time";
  }

  const date = new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }

  return date.toLocaleString();
}

function getAuthorName(author?: RecentChangeAuthor) {
  if (!author?.key) {
    return "Unknown user";
  }

  return (
    author.key
      .split("/")
      .filter(Boolean)
      .pop() ?? "Unknown user"
  );
}

function getChangeKey(change: RecentChange) {
  return change.changes?.[0]?.key;
}

function getItemLink(key?: string) {
  if (!key) {
    return null;
  }

  const parts = key
    .split("/")
    .filter(Boolean);

  const id = parts[parts.length - 1];

  if (!id) {
    return null;
  }

  if (key.startsWith("/works/")) {
    return {
      href: `/books/${id}`,
      external: false,
    };
  }

  if (key.startsWith("/authors/")) {
    return {
      href: `/authors/${id}`,
      external: false,
    };
  }

  return {
    href: `https://openlibrary.org${key}`,
    external: true,
  };
}

function LoadingState() {
  return (
    <div
      className="
        flex
        min-h-[520px]
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
        transition-colors
        duration-300

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

        <Activity
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
            font-semibold
            text-[#30344A]

            dark:text-[#F3F4F8]
          "
        >
          Loading recent changes
        </p>

        <p
          className="
            mt-1
            text-sm
            text-[#8A8FA3]

            dark:text-[#989EAF]
          "
        >
          Fetching the latest Open Library activity...
        </p>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div
      className="
        flex
        min-h-[500px]
        flex-col
        items-center
        justify-center
        rounded-[28px]
        border
        border-[#E3E7F2]
        bg-white
        px-6
        text-center
        transition-colors

        dark:border-[#424B7A]
        dark:bg-gradient-to-br
        dark:from-[#181F34]
        dark:via-[#1C2031]
        dark:to-[#251B35]
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
          bg-[#FFF0F3]
          text-[#D7556D]

          dark:bg-[#43232F]
          dark:text-[#FF8298]
        "
      >
        <Activity className="h-7 w-7" />
      </div>

      <h2
        className="
          mt-5
          text-xl
          font-bold
          text-[#30344A]

          dark:text-[#F3F4F8]
        "
      >
        Unable to load activity
      </h2>

      <p
        className="
          mt-2
          text-sm
          text-[#8A8FA3]

          dark:text-[#989EAF]
        "
      >
        Failed to load recent changes.
      </p>

      <a
        href="/recent"
        className="
          mt-6
          inline-flex
          h-11
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-[#4867D6]
          to-[#7A4FD8]
          px-5
          text-sm
          font-semibold
          text-white
          shadow-md
          shadow-indigo-200/40
          transition-all

          hover:-translate-y-0.5
          hover:shadow-lg

          dark:from-[#566EE0]
          dark:to-[#8458D8]
          dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]
        "
      >
        <RefreshCw className="h-4 w-4" />

        Try Again
      </a>
    </div>
  );
}

async function RecentChangesContent() {
  let changes: RecentChange[] = [];

  try {
    changes = await getRecentChanges();
  } catch (error) {
    console.error(
      "Recent changes error:",
      error
    );

    return <ErrorState />;
  }

  return (
    <section className="w-full">
      {/* Header */}
      <div
        className="
          relative
          mb-8
          overflow-hidden
          rounded-[28px]
          border
          border-[#E3E7F2]
          bg-gradient-to-r
          from-[#EEF3FF]
          via-[#F5F4FF]
          to-[#F4EEFF]
          p-6
          transition-colors
          duration-300

          md:p-8

          dark:border-[#465078]
          dark:from-[#192643]
          dark:via-[#20233B]
          dark:to-[#2A1D3D]
          dark:shadow-[0_14px_40px_rgba(67,76,155,0.14)]
        "
      >
        <div
          className="
            absolute
            -right-16
            -top-16
            h-52
            w-52
            rounded-full
            bg-[#7A4FD8]/10
            blur-3xl

            dark:bg-[#8D63E8]/20
          "
        />

        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div className="flex items-start gap-4">
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
                shadow-lg
                shadow-purple-200/40

                dark:shadow-[0_10px_30px_rgba(106,83,215,0.28)]
              "
            >
              <Activity className="h-6 w-6" />
            </div>

            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#6D73AF]

                  dark:text-[#9995E8]
                "
              >
                Live Updates
              </p>

              <h1
                className="
                  mt-1
                  text-3xl
                  font-bold
                  tracking-tight
                  text-[#292C43]

                  dark:text-[#F3F4F8]
                "
              >
                Recent Changes
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#7C8297]

                  dark:text-[#A7ACBD]
                "
              >
                Latest activity and updates from Open Library.
              </p>
            </div>
          </div>

          <a
            href="/recent"
            className="
              flex
              h-11
              w-fit
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8DDF0]
              bg-white
              px-5
              text-sm
              font-semibold
              text-[#6168AE]
              shadow-sm
              transition-all

              hover:-translate-y-0.5
              hover:border-[#C4CAED]
              hover:bg-[#F5F2FF]
              hover:text-[#7653CF]

              dark:border-[#465078]
              dark:bg-[#1A1E2C]
              dark:text-[#B6BEF5]

              dark:hover:border-[#7569D6]
              dark:hover:bg-[#28203A]
              dark:hover:text-[#CDC7FF]
              dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.20),0_10px_28px_rgba(91,78,190,0.18)]
            "
          >
            <RefreshCw className="h-4 w-4" />

            Refresh
          </a>
        </div>
      </div>

      {/* Count */}
      <div
        className="
          mb-5
          flex
          items-center
          justify-between
          gap-4
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
              text-[#292C43]

              dark:text-[#F3F4F8]
            "
          >
            Activity Feed
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#858A9F]

              dark:text-[#989EAF]
            "
          >
            Showing the most recent Open Library changes.
          </p>
        </div>

        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-[#EEF2FF]
            to-[#F4EEFF]
            px-4
            py-2
            text-sm
            font-semibold
            text-[#655CC1]

            dark:from-[#273253]
            dark:to-[#352548]
            dark:text-[#C2BCFF]
          "
        >
          <Sparkles className="h-4 w-4" />

          {changes.length} changes
        </div>
      </div>

      {/* Empty */}
      {changes.length === 0 ? (
        <div
          className="
            flex
            min-h-[380px]
            flex-col
            items-center
            justify-center
            rounded-[28px]
            border
            border-[#E3E7F2]
            bg-gradient-to-br
            from-[#FAFBFF]
            via-white
            to-[#F8F5FF]
            px-6
            text-center

            dark:border-[#424B7A]
            dark:from-[#181F34]
            dark:via-[#1C2031]
            dark:to-[#251B35]
          "
        >
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-[24px]
              bg-gradient-to-br
              from-[#EEF2FF]
              to-[#F4EEFF]
              text-[#6658C7]

              dark:from-[#29365D]
              dark:to-[#3A294F]
              dark:text-[#BDB6FF]
            "
          >
            <Activity className="h-9 w-9" />
          </div>

          <h2
            className="
              mt-5
              text-xl
              font-bold
              text-[#30344A]

              dark:text-[#F3F4F8]
            "
          >
            No recent changes
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#8A8FA3]

              dark:text-[#989EAF]
            "
          >
            No activity is available right now.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {changes.map((change, index) => {
            const changeKey =
              getChangeKey(change);

            const itemLink =
              getItemLink(changeKey);

            const uniqueKey = [
              change.id ?? "no-id",
              change.timestamp ?? "no-time",
              changeKey ?? "no-key",
              index,
            ].join("-");

            return (
              <article
                key={uniqueKey}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#E3E7F2]
                  bg-white
                  shadow-[0_8px_28px_rgba(72,80,130,0.05)]
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[#C9CFF0]
                  hover:shadow-[0_16px_42px_rgba(91,78,190,0.12)]

                  dark:border-[#424B7A]
                  dark:bg-gradient-to-br
                  dark:from-[#181F34]
                  dark:via-[#1C2031]
                  dark:to-[#251B35]
                  dark:shadow-[0_12px_35px_rgba(67,76,155,0.12)]

                  dark:hover:border-[#7569D6]
                  dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_18px_48px_rgba(83,92,200,0.17),0_16px_42px_rgba(122,79,216,0.20)]
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-1
                    bg-gradient-to-b
                    from-[#4867D6]
                    to-[#7A4FD8]
                  "
                />

                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    p-5
                    pl-6

                    md:p-6
                    md:pl-7

                    lg:flex-row
                    lg:items-start
                    lg:justify-between
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      gap-4
                    "
                  >
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
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        <h3
                          className="
                            font-bold
                            text-[#30344A]

                            dark:text-[#F1F2F7]
                          "
                        >
                          {change.kind ?? "Change"}
                        </h3>

                        {change.changes?.[0]?.revision !==
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
                              text-[#6268A9]

                              dark:border-[#465078]
                              dark:from-[#252F50]
                              dark:to-[#352548]
                              dark:text-[#BBB9ED]
                            "
                          >
                            Revision{" "}
                            {
                              change.changes[0]
                                .revision
                            }
                          </span>
                        )}
                      </div>

                      {changeKey && (
                        <p
                          className="
                            mt-2
                            max-w-3xl
                            break-all
                            text-sm
                            font-medium
                            text-[#6870A5]

                            dark:text-[#ADB5E0]
                          "
                        >
                          {changeKey}
                        </p>
                      )}

                      {change.comment && (
                        <div
                          className="
                            mt-4
                            rounded-xl
                            border
                            border-[#E7EAF3]
                            bg-gradient-to-r
                            from-[#FAFBFF]
                            to-[#FCFAFF]
                            px-4
                            py-3

                            dark:border-[#3F4664]
                            dark:from-[#1A2136]
                            dark:to-[#272033]
                          "
                        >
                          <p
                            className="
                              text-sm
                              leading-6
                              text-[#6F758B]

                              dark:text-[#A8ADBE]
                            "
                          >
                            {change.comment}
                          </p>
                        </div>
                      )}

                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          gap-4
                          text-xs
                          text-[#8D92A6]

                          dark:text-[#8E94A7]
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <User
                            className="
                              h-3.5
                              w-3.5
                              text-[#5368CE]

                              dark:text-[#9EACFF]
                            "
                          />

                          <span>
                            {getAuthorName(
                              change.author
                            )}
                          </span>
                        </div>

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >
                          <Clock
                            className="
                              h-3.5
                              w-3.5
                              text-[#7653CF]

                              dark:text-[#BD94FF]
                            "
                          />

                          <span>
                            {formatDate(
                              change.timestamp
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {itemLink &&
                    (itemLink.external ? (
                      <a
                        href={itemLink.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          h-10
                          shrink-0
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-[#DDE2F2]
                          bg-white
                          px-4
                          text-sm
                          font-semibold
                          text-[#6269AC]
                          transition-all

                          hover:-translate-y-0.5
                          hover:border-[#C7CDED]
                          hover:bg-[#F4F2FF]
                          hover:text-[#7653CF]

                          dark:border-[#465078]
                          dark:bg-[#1A1E2C]
                          dark:text-[#ADB6E7]

                          dark:hover:border-[#7569D6]
                          dark:hover:bg-[#28203A]
                          dark:hover:text-[#CAC4FF]
                        "
                      >
                        Open

                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={itemLink.href}
                        className="
                          inline-flex
                          h-10
                          shrink-0
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-gradient-to-r
                          from-[#4867D6]
                          to-[#7A4FD8]
                          px-4
                          text-sm
                          font-semibold
                          text-white
                          shadow-md
                          shadow-indigo-200/40
                          transition-all

                          hover:-translate-y-0.5
                          hover:shadow-lg

                          dark:from-[#566EE0]
                          dark:to-[#8458D8]
                          dark:shadow-[0_8px_24px_rgba(100,82,205,0.22)]
                        "
                      >
                        View

                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function RecentChanges() {
  return (
    <Suspense fallback={<LoadingState />}>
      <RecentChangesContent />
    </Suspense>
  );
}