"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Bookmark,
  ChevronRight,
  Library,
  RefreshCw,
  Sparkles,
  TrendingUp,
  User,
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

const HERO_LINKS = [
  { icon: BookOpen, label: "Books", href: "/books", active: true },
  { icon: User, label: "Authors", href: "/authors" },
  { icon: TrendingUp, label: "Activity", href: "/recent" },
];

interface HeroIllustrationProps {
  className?: string;
}

// Desk scene for the dashboard hero: books, lamp, plant and a small shelf
function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 520 380"
      preserveAspectRatio="xMaxYMax meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="heroLamp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE7A0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#FFE7A0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Faded shelves in the back */}
      <g fill="#C9D4FF" opacity="0.2">
        <rect x="190" y="60" width="26" height="85" rx="3" />
        <rect x="220" y="75" width="22" height="70" rx="3" />
        <rect x="246" y="68" width="20" height="77" rx="3" />
        <rect x="190" y="170" width="24" height="75" rx="3" />
        <rect x="218" y="182" width="22" height="63" rx="3" />
        <rect x="244" y="176" width="20" height="69" rx="3" />
        <rect x="180" y="148" width="100" height="5" />
        <rect x="180" y="248" width="100" height="5" />
      </g>

      {/* Floor */}
      <path
        d="M40 380 C90 300 200 285 330 290 L520 290 L520 380 Z"
        fill="#4652DC"
        opacity="0.85"
      />

      {/* Shelf with standing books */}
      <rect x="385" y="300" width="135" height="14" fill="#5A5FD8" />
      <rect x="400" y="170" width="34" height="130" rx="3" fill="#2F8BE6" />
      <rect
        x="400"
        y="205"
        width="34"
        height="8"
        fill="#8CC4F5"
        opacity="0.7"
      />
      <rect x="437" y="185" width="36" height="115" rx="3" fill="#F0604D" />
      <rect
        x="437"
        y="215"
        width="36"
        height="8"
        fill="#FFB199"
        opacity="0.7"
      />
      <rect x="476" y="200" width="30" height="100" rx="3" fill="#3A3FC0" />
      <rect
        x="476"
        y="240"
        width="30"
        height="8"
        fill="#C95CA8"
        opacity="0.8"
      />
      <rect x="508" y="215" width="24" height="85" rx="3" fill="#C9468A" />

      {/* Lamp */}
      <path
        d="M330 92 C385 70 408 105 405 165"
        fill="none"
        stroke="#1B2A7A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <polygon points="285,130 325,130 370,205 245,205" fill="url(#heroLamp)" />
      <path
        d="M262 120 C262 82 298 60 332 80 C340 100 334 118 324 130 Z"
        fill="#1C2A80"
      />
      <ellipse cx="294" cy="128" rx="26" ry="9" fill="#FFE9A8" />
      <ellipse cx="290" cy="126" rx="12" ry="4" fill="#FFFFFF" opacity="0.7" />

      {/* Plant */}
      <path
        d="M95 252 C70 226 70 190 100 168 C116 195 112 230 95 252 Z"
        fill="#34C48F"
      />
      <path
        d="M95 252 C110 214 136 190 166 196 C160 226 130 246 95 252 Z"
        fill="#1E9E78"
      />
      <path
        d="M92 254 C60 246 40 226 34 204 C66 210 86 226 92 254 Z"
        fill="#5FD3A0"
      />
      <path d="M68 252 L122 252 L114 300 L76 300 Z" fill="#E4E9FA" />
      <rect x="64" y="246" width="62" height="11" rx="5" fill="#F3F5FF" />

      {/* Book stack: orange (bottom), purple, blue (top) */}
      <rect x="120" y="262" width="232" height="38" rx="7" fill="#F59E2B" />
      <rect x="120" y="292" width="232" height="8" rx="4" fill="#E8741E" />
      <rect x="248" y="269" width="102" height="21" rx="4" fill="#F9E4D8" />
      <path
        d="M256 276 H344 M256 283 H344"
        stroke="#E3C2B2"
        strokeWidth="1.5"
      />

      <rect x="135" y="229" width="217" height="38" rx="7" fill="#7C4DE0" />
      <rect x="135" y="259" width="217" height="8" rx="4" fill="#5B30B8" />
      <rect x="258" y="236" width="92" height="21" rx="4" fill="#F4E3F2" />
      <path
        d="M266 243 H342 M266 250 H342"
        stroke="#D9BFD6"
        strokeWidth="1.5"
      />

      <rect x="150" y="196" width="202" height="38" rx="7" fill="#2F7BEA" />
      <rect x="150" y="226" width="202" height="8" rx="4" fill="#1F5BD0" />
      <rect
        x="150"
        y="196"
        width="202"
        height="6"
        rx="3"
        fill="#7DB4FF"
        opacity="0.8"
      />
      <rect x="268" y="203" width="82" height="21" rx="4" fill="#F4E8E6" />
      <path
        d="M276 210 H342 M276 217 H342"
        stroke="#DDC6C2"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function AdminDashboard() {
  const [savedBooks, setSavedBooks] = useState(0);
  const [recentChanges, setRecentChanges] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const updateSavedCount = useCallback(() => {
    try {
      const saved = localStorage.getItem("savedBooks");

      if (!saved) {
        setSavedBooks(0);
        return;
      }

      const parsed = JSON.parse(saved);
      setSavedBooks(Array.isArray(parsed) ? parsed.length : 0);
    } catch {
      setSavedBooks(0);
    }
  }, []);

  const loadDashboard = useCallback(
    async (refresh = false) => {
      try {
        if (refresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        updateSavedCount();

        const response = await fetch(
          "https://openlibrary.org/recentchanges.json",
        );

        if (response.ok) {
          const data: RecentChange[] = await response.json();
          setRecentChanges(Array.isArray(data) ? data.slice(0, 5) : []);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [updateSavedCount],
  );

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    window.addEventListener("storage", updateSavedCount);
    window.addEventListener("savedBooksUpdated", updateSavedCount);

    return () => {
      window.removeEventListener("storage", updateSavedCount);
      window.removeEventListener("savedBooksUpdated", updateSavedCount);
    };
  }, [updateSavedCount]);

  const formatDate = (timestamp?: string) => {
    if (!timestamp) return "Unknown";

    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return timestamp;

    return date.toLocaleString();
  };

  const getResource = (change: RecentChange) => {
    return change.changes?.[0]?.key ?? "Unknown";
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-[620px] flex-col items-center justify-center gap-5 rounded-[28px] border border-[#E3E7F2] bg-gradient-to-br from-[#FAFBFF] via-white to-[#F8F5FF] dark:border-[#424B7A] dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#E4E8F4] border-t-[#6657C9] dark:border-[#343B58] dark:border-t-[#9F83FF]" />
          <Library className="h-8 w-8 text-[#5968C1] dark:text-[#A8B3FF]" />
        </div>

        <div className="text-center">
          <p className="text-lg font-bold text-[#30344A] dark:text-[#F3F4F8]">
            Loading Dashboard
          </p>

          <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
            Preparing your library overview...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7FAFF] via-[#F8F9FD] to-[#F9F5FF] transition-colors duration-300 dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* Hero */}
        <section className="relative min-h-[340px] overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F2A7A] via-[#1747B8] to-[#5B3FD8] px-7 py-10 text-white shadow-[0_24px_60px_rgba(40,60,170,0.28)] md:px-12 dark:from-[#0A1B5A] dark:via-[#12378F] dark:to-[#432C9C] dark:shadow-[0_20px_65px_rgba(21,24,65,0.45)]">
          {/* Purple glow on the right */}
          <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-[#7A4FE8]/50 via-[#4C5BE8]/20 to-transparent" />

          {/* Illustration */}
          <HeroIllustration className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-[50%] lg:block" />

          {/* Refresh */}
          <button
            type="button"
            disabled={refreshing}
            onClick={() => loadDashboard(true)}
            className="absolute right-6 top-6 z-20 flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/15 px-6 text-base font-semibold backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          {/* Content */}
          <div className="relative z-10 max-w-xl lg:max-w-[52%]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#6D4AE0] shadow-lg shadow-blue-900/30">
                <BookOpen className="h-7 w-7" />
              </div>

              <p className="text-sm font-semibold uppercase tracking-wide text-[#A9B8F0]">
                Library Management
              </p>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              User{" "}
              <span className="bg-gradient-to-r from-[#2BA5FF] to-[#8F6BFF] bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>

            <p className="mt-4 text-base leading-7 text-white/80 md:text-lg">
              Explore books, authors, saved collections and recent Open Library
              activity from one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {HERO_LINKS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex h-14 items-center gap-3 rounded-2xl px-5 text-base font-medium transition-all hover:-translate-y-0.5 ${
                      item.active
                        ? "bg-gradient-to-r from-[#4C6BEF] to-[#7A4FE0] shadow-lg shadow-indigo-900/30"
                        : "border border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                    <ChevronRight className="ml-2 h-4 w-4 opacity-70" />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="mt-7">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="mb-2 h-1 w-12 rounded-full bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />

              <h2 className="text-2xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                Overview
              </h2>

              <p className="mt-1 text-sm text-[#858A9F] dark:text-[#A3A8BA]">
                Quick access to your library sections
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {/* Books */}
            <Link href="/books" className="group">
              <div className="relative h-full overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-6 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C7CEF0] hover:shadow-[0_18px_45px_rgba(80,92,180,0.14)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4867D6] to-[#6377DC]" />

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-[#5368CE] dark:bg-[#29365D] dark:text-[#A8B4FF]">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-[#A1A5B5] transition-transform group-hover:translate-x-1 group-hover:text-[#5368CE] dark:text-[#747B91] dark:group-hover:text-[#BDB7FF]" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Books
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#858A9F] dark:text-[#A3A8BA]">
                  Browse and search the Open Library book collection.
                </p>

                <div className="mt-5 text-xs font-semibold text-[#5368CE] dark:text-[#AAB7FF]">
                  Explore Books →
                </div>
              </div>
            </Link>

            {/* Authors */}
            <Link href="/authors" className="group">
              <div className="relative h-full overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-6 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#CEC6F0] hover:shadow-[0_18px_45px_rgba(105,82,190,0.14)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#665DD1] to-[#7A4FD8]" />

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EEFF] text-[#7653CF] dark:bg-[#38284D] dark:text-[#C298FF]">
                    <Users className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-[#A1A5B5] transition-transform group-hover:translate-x-1 group-hover:text-[#7653CF] dark:text-[#747B91] dark:group-hover:text-[#C6BFFF]" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Authors
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#858A9F] dark:text-[#A3A8BA]">
                  Discover writers and explore their published works.
                </p>

                <div className="mt-5 text-xs font-semibold text-[#7653CF] dark:text-[#C298FF]">
                  Explore Authors →
                </div>
              </div>
            </Link>

            {/* Saved */}
            <Link href="/books/saved" className="group">
              <div className="relative h-full overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-6 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C9CBEF] hover:shadow-[0_18px_45px_rgba(95,83,190,0.14)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#655CC1] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                    <Bookmark className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-bold text-[#5368CE] dark:text-[#AAB7FF]">
                    {savedBooks}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Saved Books
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#858A9F] dark:text-[#A3A8BA]">
                  Books saved locally in this browser.
                </p>

                <div className="mt-5 text-xs font-semibold text-[#655CC1] dark:text-[#BDB6FF]">
                  View Collection →
                </div>
              </div>
            </Link>

            {/* Activity */}
            <Link href="/recent" className="group">
              <div className="relative h-full overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-6 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C7CEF0] hover:shadow-[0_18px_45px_rgba(80,92,180,0.14)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#6170D3] to-[#8961D9]" />

                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2F2FF] text-[#6A63C9] dark:bg-[#302E51] dark:text-[#BCB7FF]">
                    <Activity className="h-5 w-5" />
                  </div>

                  <span className="text-3xl font-bold text-[#7653CF] dark:text-[#C298FF]">
                    {recentChanges.length}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Recent Activity
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#858A9F] dark:text-[#A3A8BA]">
                  Latest updates from Open Library.
                </p>

                <div className="mt-5 text-xs font-semibold text-[#7653CF] dark:text-[#C298FF]">
                  View Activity →
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Book table */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#5368CE] dark:bg-[#29365D] dark:text-[#A8B4FF]">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                Book Explorer
              </h2>

              <p className="text-sm text-[#8A8FA3] dark:text-[#989EAF]">
                Search and inspect books
              </p>
            </div>
          </div>

          <BookDataTable />
        </section>

        {/* Author table */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4EEFF] text-[#7653CF] dark:bg-[#38284D] dark:text-[#C298FF]">
              <Users className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                Author Explorer
              </h2>

              <p className="text-sm text-[#8A8FA3] dark:text-[#989EAF]">
                Search and inspect authors
              </p>
            </div>
          </div>

          <AuthorDataTable />
        </section>

        {/* Recent activity */}
        <section className="mt-10 overflow-hidden rounded-[26px] border border-[#E3E7F2] bg-white shadow-[0_12px_40px_rgba(72,80,130,0.07)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
          <div className="flex items-center justify-between gap-4 border-b border-[#E7EAF3] bg-gradient-to-r from-[#FAFBFF] via-white to-[#FBF8FF] p-6 dark:border-[#343A57] dark:from-[#181E31] dark:via-[#1C2031] dark:to-[#251B32]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                <Activity className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                  Recent Activity
                </h2>

                <p className="text-sm text-[#858A9F] dark:text-[#A3A8BA]">
                  Latest Open Library changes
                </p>
              </div>
            </div>

            <Link
              href="/recent"
              className="group flex items-center gap-1 text-sm font-semibold text-[#5368CE] transition hover:text-[#7653CF] dark:text-[#AAB7FF] dark:hover:text-[#C298FF]"
            >
              View all
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="divide-y divide-[#EDF0F6] px-6 dark:divide-[#343A57]">
            {recentChanges.length === 0 ? (
              <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                  <Activity className="h-7 w-7" />
                </div>

                <h3 className="mt-4 font-semibold text-[#30344A] dark:text-[#F3F4F8]">
                  No recent activity
                </h3>

                <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#989EAF]">
                  Recent Open Library changes will appear here.
                </p>
              </div>
            ) : (
              recentChanges.map((change, index) => {
                const resource = getResource(change);

                const uniqueKey = [
                  change.id ?? "no-id",
                  change.timestamp ?? "no-time",
                  resource,
                  index,
                ].join("-");

                return (
                  <div
                    key={uniqueKey}
                    className="group flex items-start gap-4 py-5 transition"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] transition group-hover:scale-105 dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                      <Activity className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#30344A] dark:text-[#F1F2F7]">
                          {change.kind ?? "Change"}
                        </span>

                        {change.changes?.[0]?.revision !== undefined && (
                          <span className="rounded-full border border-[#DDE2F2] bg-gradient-to-r from-[#F2F5FF] to-[#F7F1FF] px-2.5 py-1 text-[10px] font-semibold text-[#656BA9] dark:border-[#465078] dark:from-[#252F50] dark:to-[#352548] dark:text-[#BBB9ED]">
                            Rev {change.changes[0].revision}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 max-w-3xl truncate text-sm text-[#777D93] dark:text-[#A6ACBD]">
                        {resource}
                      </p>

                      <p className="mt-2 text-xs text-[#A0A4B5] dark:text-[#7F8598]">
                        {formatDate(change.timestamp)}
                      </p>
                    </div>

                    <Sparkles className="mt-2 h-4 w-4 text-[#C1C5D6] opacity-0 transition group-hover:opacity-100 dark:text-[#817AA9]" />
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
