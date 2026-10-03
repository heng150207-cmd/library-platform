import Link from "next/link";

import { Heart, Mail, Sparkles } from "lucide-react";

import { FaFacebookF, FaGithub, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#303856] bg-gradient-to-br from-[#1B1743] via-[#21134A] to-[#291044] text-white dark:border-[#303856] dark:from-[#101522] dark:via-[#171328] dark:to-[#21122F]">
      <div className="pointer-events-none absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full bg-[#4867D6]/15 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-[#7A4FD8]/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-7 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.75fr_0.75fr_1fr_0.9fr] lg:gap-10">
          <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-[#394A98]/70 to-[#503D83]/70 shadow-[0_10px_32px_rgba(100,82,205,0.28)] backdrop-blur-md sm:h-[84px] sm:w-[84px] lg:h-[88px] lg:w-[88px]">
                <img
                  src="/images/just-read-logo.png"
                  alt="JUST READ Logo"
                  className="h-full w-full scale-[1.65] object-contain"
                />
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[26px]">
                  JUST READ
                </h2>

                <p className="mt-1.5 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-[10px]">
                  Discover your story
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-center text-sm leading-7 text-[#C4C8DC] lg:text-left">
              Discover books, explore authors, save your favorites and follow
              the latest activity from Open Library. Your next story is only one
              page away.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#7180E0] hover:bg-[#4867D6] hover:shadow-[0_10px_25px_rgba(72,103,214,0.35)]"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#8E6BE2] hover:bg-[#7A4FD8] hover:shadow-[0_10px_25px_rgba(122,79,216,0.35)]"
              >
                <FaYoutube className="h-4 w-4" />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#867AE0] hover:bg-gradient-to-br hover:from-[#4867D6] hover:to-[#7A4FD8] hover:shadow-[0_10px_25px_rgba(105,82,205,0.35)]"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
              {[
                {
                  name: "Home",
                  href: "/",
                },
                {
                  name: "Books",
                  href: "/books",
                },
                {
                  name: "Authors",
                  href: "/authors",
                },
                {
                  name: "About Us",
                  href: "/about",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-fit text-sm font-medium text-[#BEC3D9] transition-all duration-200 hover:text-white lg:hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              Explore
            </h3>

            <div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
              {[
                {
                  name: "Saved Books",
                  href: "/books/saved",
                },
                {
                  name: "Recent Activity",
                  href: "/recent",
                },
                {
                  name: "Dashboard",
                  href: "/dashboard",
                },
                {
                  name: "Search Books",
                  href: "/books",
                },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-fit text-sm font-medium text-[#BEC3D9] transition-all duration-200 hover:text-white lg:hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-white">
              About Project
            </h3>

            <div className="mt-6 flex w-full max-w-[260px] flex-col items-center gap-5 lg:items-start">
              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#AAB6FF]">
                  <Sparkles className="h-4 w-4" />
                </div>

                <div className="text-left">
                  <p className="text-xs text-white/45">Powered by</p>

                  <a
                    href="https://openlibrary.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-[#D5D8E8] transition hover:text-white"
                  >
                    Open Library
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 lg:justify-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#C39DFF]">
                  <Mail className="h-4 w-4" />
                </div>

                <div className="min-w-0 text-left">
                  <p className="text-xs text-white/45">Contact</p>

                  <a
                    href="mailto:justread@example.com"
                    className="mt-1 inline-block break-all text-sm font-semibold text-[#D5D8E8] transition hover:text-white"
                  >
                    justread@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
            <h3 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.12em] text-white">
              Organized by ISTAD
            </h3>

            <a
              href="https://istad.co"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex h-[135px] w-[135px] items-center justify-center transition-all duration-300 hover:drop-shadow-[0_14px_30px_rgba(122,79,216,0.35)] sm:h-[150px] sm:w-[150px] lg:h-[155px] lg:w-[155px]">
                <img
                  src="/images/istad-logo.png"
                  alt="ISTAD"
                  className="h-full w-full object-contain"
                />
              </div>
            </a>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col items-center justify-center gap-5 text-center text-sm text-[#959BB5] md:flex-row md:justify-between md:text-left">
          <p>© {currentYear} JUST READ. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>

            <Link href="/about" className="transition hover:text-white">
              About
            </Link>

            <Link href="/books" className="transition hover:text-white">
              Books
            </Link>

            <Link href="/authors" className="transition hover:text-white">
              Authors
            </Link>

            <a
              href="https://openlibrary.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              Open Library
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-white/30">
          Built with
          <Heart className="h-3.5 w-3.5 fill-[#8C66DD] text-[#8C66DD]" />
          for book lovers
        </div>
      </div>
    </footer>
  );
}
