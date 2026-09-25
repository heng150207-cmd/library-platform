import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shelf — Open Library Explorer",
    template: "%s · Shelf",
  },
  description:
    "Search millions of books, authors and subjects from the Open Library API.",
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/70">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            📚
          </span>
          <span className="text-lg tracking-tight">Shelf</span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium sm:gap-2">
          <Link
            href="/search?q=fantasy"
            className="rounded-full px-3 py-2 text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/[.08]"
          >
            Search
          </Link>
          <Link
            href="/subject/fantasy"
            className="rounded-full px-3 py-2 text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/[.08]"
          >
            Subjects
          </Link>
          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/[.08]"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-8 dark:border-white/10">
      <div className="mx-auto w-full max-w-6xl px-4 text-sm text-zinc-500 sm:px-6">
        Data from the{" "}
        <a
          href="https://openlibrary.org/developers/api"
          className="underline hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Library API
        </a>
        . A project of the Internet Archive.
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
