"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Clock,
  ExternalLink,
  FileText,
  RefreshCw,
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

const actionClass =
  "inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#DDE2F2] bg-white px-3.5 text-sm font-semibold text-[#5D68B8] transition hover:border-[#C8CEED] hover:bg-[#F3F4FF] hover:text-[#7555C8] sm:self-center dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#ABB6F1] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CAC4FF]";

const primaryButtonClass =
  "mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition hover:-translate-y-0.5 hover:shadow-lg dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]";

export default function RecentChanges() {
  const [changes, setChanges] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [filter, setFilter] = useState("all");

  const fetchRecentChanges = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        "https://openlibrary.org/recentchanges.json",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch recent changes: ${response.status}`);
      }

      const data: RecentChange[] = await response.json();

      if (!Array.isArray(data)) {
        setChanges([]);
        return;
      }

      setChanges(data.slice(0, DISPLAY_LIMIT));
      setUpdatedAt(new Date());
    } catch (error) {
      console.error("Recent changes error:", error);
      setError("Failed to load recent changes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentChanges();
  }, [fetchRecentChanges]);

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    return date.toLocaleString();
  };

  const formatRelative = (timestamp?: string) => {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    const minutes = Math.round((Date.now() - date.getTime()) / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    return date.toLocaleDateString();
  };

  const formatKind = (kind?: string) =>
    (kind ?? "change").replace(/[-_]/g, " ");

  const getAuthorName = (author?: RecentChangeAuthor) => {
    if (!author?.key) return "Unknown user";

    return author.key.split("/").filter(Boolean).pop() ?? "Unknown user";
  };

  const getChangeKey = (change: RecentChange) => {
    return change.changes?.[0]?.key;
  };

  const getItemLink = (key?: string) => {
    if (!key) return null;

    const parts = key.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (!id) return null;

    if (key.startsWith("/works/")) {
      return { href: `/books/${id}`, external: false };
    }

    if (key.startsWith("/authors/")) {
      return { href: `/authors/${id}`, external: false };
    }

    return { href: `https://openlibrary.org${key}`, external: true };
  };

  const kinds = Array.from(
    new Set(changes.map((change) => change.kind ?? "change")),
  );

  const visibleChanges =
    filter === "all"
      ? changes
      : changes.filter((change) => (change.kind ?? "change") === filter);

  const chipClass = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
      active
        ? "border-transparent bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-white shadow-sm"
        : "border-[#DDE2F2] bg-white text-[#6268A9] hover:border-[#C5CCEE] hover:text-[#7555C8] dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#BBB9ED] dark:hover:border-[#7569D6] dark:hover:text-[#D0CAFF]"
    }`;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="divide-y divide-[#EDF0F6] dark:divide-[#343A57]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse items-center gap-4 px-5 py-4"
            >
              <div className="h-10 w-10 rounded-xl bg-[#EEF1FA] dark:bg-[#252D49]" />

              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-1/4 rounded bg-[#EEF1FA] dark:bg-[#252D49]" />
                <div className="h-3 w-2/3 rounded bg-[#F3F5FB] dark:bg-[#20283F]" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0F3] text-[#D7556D] dark:bg-[#43232F] dark:text-[#FF8298]">
            <Activity className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#30344A] dark:text-[#F3F4F8]">
            Unable to load activity
          </h2>

          <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => fetchRecentChanges()}
            className={primaryButtonClass}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      );
    }

    if (visibleChanges.length === 0) {
      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#6658C7] dark:bg-[#29365D] dark:text-[#BDB6FF]">
            <Activity className="h-6 w-6" />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#30344A] dark:text-[#F3F4F8]">
            {changes.length === 0
              ? "No recent changes"
              : "Nothing matches this filter"}
          </h2>

          <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
            {changes.length === 0
              ? "No activity is available right now."
              : "Try another type or show everything."}
          </p>

          {changes.length > 0 && (
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={primaryButtonClass}
            >
              Show all changes
            </button>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="divide-y divide-[#EDF0F6] dark:divide-[#343A57]">
          {visibleChanges.map((change, index) => {
            const changeKey = getChangeKey(change);
            const itemLink = getItemLink(changeKey);
            const revision = change.changes?.[0]?.revision;

            const uniqueKey = [
              change.id ?? "no-id",
              change.timestamp ?? "no-time",
              changeKey ?? "no-key",
              index,
            ].join("-");

            return (
              <article
                key={uniqueKey}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-[#F8F9FF] sm:flex-row sm:items-center sm:gap-4 dark:hover:bg-white/5"
              >
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#5368CE] dark:bg-[#29365D] dark:text-[#A8B4FF]">
                    <FileText className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold capitalize text-[#30344A] dark:text-[#F1F2F7]">
                        {formatKind(change.kind)}
                      </h3>

                      {revision !== undefined && (
                        <span className="rounded-full bg-[#F2F5FF] px-2 py-0.5 text-[11px] font-medium text-[#6268A9] dark:bg-[#252F50] dark:text-[#BBB9ED]">
                          Rev {revision}
                        </span>
                      )}
                    </div>

                    {changeKey && (
                      <p className="mt-0.5 break-all text-sm text-[#6870A5] dark:text-[#ADB5E0]">
                        {changeKey}
                      </p>
                    )}

                    {change.comment && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-[#7B8095] dark:text-[#A5AABC]">
                        {change.comment}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8D92A6] dark:text-[#8E94A7]">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {getAuthorName(change.author)}
                      </span>

                      <span
                        title={formatDate(change.timestamp)}
                        className="inline-flex items-center gap-1.5"
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {formatRelative(change.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {itemLink &&
                  (itemLink.external ? (
                    <a
                      href={itemLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={actionClass}
                    >
                      Open
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link href={itemLink.href} className={actionClass}>
                      View
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ))}
              </article>
            );
          })}
        </div>

        <div className="border-t border-[#EDF0F6] px-5 py-3 text-xs text-[#8D92A6] dark:border-[#343A57] dark:text-[#8E94A7]">
          Showing {visibleChanges.length} of {changes.length} changes
        </div>
      </>
    );
  };

  return (
    <section className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#24273D] dark:text-[#F3F4F8]">
            Recent Changes
          </h1>

          <p className="mt-2 text-sm text-[#7B8095] dark:text-[#A5AABC]">
            Latest edits and updates across Open Library.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {updatedAt && (
            <span
              aria-live="polite"
              className="text-xs text-[#8D92A6] dark:text-[#8E94A7]"
            >
              Updated {updatedAt.toLocaleTimeString()}
            </span>
          )}

          <button
            type="button"
            disabled={loading || refreshing}
            onClick={() => fetchRecentChanges(true)}
            className="flex h-10 items-center justify-center gap-2 rounded-xl border border-[#D8DDF0] bg-white px-4 text-sm font-semibold text-[#6168AE] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#C4CAED] hover:bg-[#F5F2FF] hover:text-[#7653CF] disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#B6BEF5] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CDC7FF]"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {!loading && !error && kinds.length > 1 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={chipClass(filter === "all")}
          >
            All ({changes.length})
          </button>

          {kinds.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setFilter(kind)}
              className={chipClass(filter === kind)}
            >
              {formatKind(kind)} (
              {
                changes.filter((change) => (change.kind ?? "change") === kind)
                  .length
              }
              )
            </button>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white shadow-[0_10px_35px_rgba(72,80,130,0.06)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
        {renderContent()}
      </div>
    </section>
  );
}
