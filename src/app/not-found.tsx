import Link from "next/link";
import { ArrowLeft, BookOpen, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <style>
        {`
          #site-navbar,
          #site-footer {
            display: none !important;
          }
        `}
      </style>

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFF] via-[#F7F8FC] to-[#F8F4FF] px-5 py-16 text-[#20233A] dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320] dark:text-[#F3F4F8]">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#4867D6]/10 blur-3xl dark:bg-[#4867D6]/15" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#7A4FD8]/10 blur-3xl dark:bg-[#7A4FD8]/15" />

        <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
          <Link href="/" className="mx-auto mb-8 flex w-fit items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-md dark:bg-[#1B1F2D]">
              <img
                src="/images/just-read-logo.png"
                alt="JUST READ"
                className="h-full w-full scale-[1.45] object-contain"
              />
            </div>

            <div className="text-left">
              <h2 className="text-xl font-bold text-[#292C43] dark:text-white">
                JUST READ
              </h2>

              <p className="text-xs text-[#858A9F] dark:text-[#A3A8BA]">
                Discover Your Story
              </p>
            </div>
          </Link>

          <div className="bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] bg-clip-text text-[120px] font-black leading-none tracking-tight text-transparent sm:text-[160px]">
            404
          </div>

          <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full border border-[#DDE2F2] bg-white/80 px-4 py-2 text-xs font-semibold text-[#655CC1] shadow-sm backdrop-blur dark:border-[#465078] dark:bg-[#1A1E2C]/80 dark:text-[#C2BCFF]">
            <Sparkles className="h-4 w-4" />
            Page Not Found
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#292C43] sm:text-4xl dark:text-[#F3F4F8]">
            Looks like this page got lost between the pages.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#7B8095] sm:text-base dark:text-[#A3A8BA]">
            The page you are looking for may have been moved, removed, or the
            address may be incorrect.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-200/40 transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>

            <Link
              href="/books"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#DDE2F2] bg-white px-6 text-sm font-semibold text-[#655CC1] transition-all hover:border-[#C9CEEF] hover:bg-[#F5F2FF] sm:w-auto dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#C2BCFF] dark:hover:border-[#7467D8] dark:hover:bg-[#272039]"
            >
              <BookOpen className="h-4 w-4" />
              Browse Books
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              href="/books"
              className="text-[#7B8095] transition-colors hover:text-[#655CC1] dark:text-[#A3A8BA] dark:hover:text-[#C2BCFF]"
            >
              Books
            </Link>

            <span className="text-[#C7CAD6]">•</span>

            <Link
              href="/authors"
              className="text-[#7B8095] transition-colors hover:text-[#655CC1] dark:text-[#A3A8BA] dark:hover:text-[#C2BCFF]"
            >
              Authors
            </Link>

            <span className="text-[#C7CAD6]">•</span>

            <Link
              href="/books/saved"
              className="text-[#7B8095] transition-colors hover:text-[#655CC1] dark:text-[#A3A8BA] dark:hover:text-[#C2BCFF]"
            >
              Saved Books
            </Link>

            <span className="text-[#C7CAD6]">•</span>

            <Link
              href="/about"
              className="text-[#7B8095] transition-colors hover:text-[#655CC1] dark:text-[#A3A8BA] dark:hover:text-[#C2BCFF]"
            >
              About
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
