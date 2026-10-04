"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Heart,
  Languages,
  LibraryBig,
} from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface BookType {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  edition_count?: number;
  language?: string[];
  subject?: string[];
}

interface BookCardProps {
  book: BookType;
  priority?: boolean;
}

const STORAGE_KEY = "savedBooks";

export default function BookCard({ book, priority = false }: BookCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const workId = book.key.split("/").filter(Boolean).pop();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  useEffect(() => {
    if (!workId) return;

    try {
      const savedBooksString = localStorage.getItem(STORAGE_KEY);

      if (!savedBooksString) {
        setIsSaved(false);
        return;
      }

      const savedBooks = JSON.parse(savedBooksString);

      if (!Array.isArray(savedBooks)) {
        setIsSaved(false);
        return;
      }

      setIsSaved(savedBooks.includes(workId));
    } catch {
      setIsSaved(false);
    }
  }, [workId]);

  const handleSaveBook = () => {
    if (!workId) return;

    let savedBooks: string[] = [];

    try {
      const savedBooksString = localStorage.getItem(STORAGE_KEY);

      if (savedBooksString) {
        const parsed = JSON.parse(savedBooksString);

        if (Array.isArray(parsed)) {
          savedBooks = parsed;
        }
      }
    } catch {
      savedBooks = [];
    }

    if (savedBooks.includes(workId)) {
      const updatedBooks = savedBooks.filter((id) => id !== workId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
      setIsSaved(false);
    } else {
      const updatedBooks = [...savedBooks, workId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
      setIsSaved(true);
    }

    window.dispatchEvent(new Event("savedBooksUpdated"));
  };

  const authorText = book.author_name?.length
    ? book.author_name.join(", ")
    : "Unknown Author";

  const subjects = book.subject ? [...new Set(book.subject)].slice(0, 2) : [];
  const languages = book.language?.slice(0, 2) ?? [];

  return (
    <Card className="group/card relative flex h-full w-full flex-col gap-0 overflow-hidden rounded-[24px] border border-[#E3E7F2] bg-white p-0 shadow-[0_10px_35px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C7CEF0] hover:shadow-[0_20px_55px_rgba(91,78,190,0.16)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)] dark:hover:border-[#7569D6] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.30),0_22px_60px_rgba(83,92,200,0.18),0_18px_50px_rgba(122,79,216,0.22)]">
      {/* Top accent */}
      <div className="absolute left-0 right-0 top-0 z-20 h-1 bg-gradient-to-r from-[#4867D6] via-[#6270D8] to-[#7A4FD8]" />

      {/* Cover */}
      <div className="relative h-80 min-h-80 overflow-hidden bg-gradient-to-br from-[#EEF2FF] via-[#F7F8FF] to-[#F4EEFF] dark:from-[#202945] dark:via-[#252743] dark:to-[#33223F]">
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt={book.title}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-contain px-7 py-6 drop-shadow-xl transition-transform duration-500 ease-out group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#858AA0] dark:text-[#A0A6B9]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-[#665CC5] shadow-sm dark:bg-[#1A2032]/80 dark:text-[#BAB5FF]">
              <BookOpen className="h-8 w-8" />
            </div>

            <span className="text-sm font-medium">No Cover</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#26315A]/10 via-transparent to-transparent dark:from-[#080B16]/30" />

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => setIsWishlisted((previous) => !previous)}
          title="Wishlist"
          className={cn(
            "absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95",
            isWishlisted
              ? "border-[#F4B6C5] bg-[#FFF0F4]/95 dark:border-[#C55B78] dark:bg-[#472331]/90"
              : "border-white/60 bg-white/90 hover:bg-white dark:border-[#59617D] dark:bg-[#171B29]/90 dark:hover:border-[#7569D6] dark:hover:bg-[#25203A]",
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition",
              isWishlisted
                ? "fill-[#E75A7C] text-[#E75A7C]"
                : "text-[#747A91] dark:text-[#A7ACBE]",
            )}
          />
        </button>

        {/* Editions */}
        {book.edition_count !== undefined && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#5966B9] shadow-sm backdrop-blur dark:border-[#505A7B] dark:bg-[#181D2D]/90 dark:text-[#B3BEFF]">
            <LibraryBig className="h-3.5 w-3.5" />
            {book.edition_count} editions
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col px-5 pb-4 pt-5">
        <div className="min-h-[72px]">
          <h3
            title={book.title}
            className="line-clamp-2 text-lg font-bold leading-6 text-[#292C43] transition group-hover/card:text-[#5D63C4] dark:text-[#F2F3F8] dark:group-hover/card:text-[#C3BDFF]"
          >
            {book.title}
          </h3>

          <p
            title={authorText}
            className="mt-1 truncate text-sm text-[#7B8095] dark:text-[#A5AABC]"
          >
            {authorText}
          </p>
        </div>

        {/* Published */}
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#E5E8F3] bg-gradient-to-r from-[#F7F9FF] to-[#FAF7FF] px-4 py-3 dark:border-[#3E4768] dark:from-[#20283F] dark:to-[#2A203A]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#5368CE] dark:bg-[#29365E] dark:text-[#9FAEFF]">
              <CalendarDays className="h-4 w-4" />
            </div>

            <span className="text-sm text-[#747A90] dark:text-[#ABB0C1]">
              Published
            </span>
          </div>

          <span className="text-sm font-bold text-[#5368CE] dark:text-[#ABB8FF]">
            {book.first_publish_year ?? "Unknown"}
          </span>
        </div>

        {/* Language */}
        <div className="mt-4 min-h-[36px]">
          {languages.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-[#7B8095] dark:text-[#A5AABC]">
              <Languages className="h-4 w-4 text-[#7653CF] dark:text-[#B58CFF]" />

              <span className="font-medium">
                {languages.map((language) => language.toUpperCase()).join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Subjects */}
        <div className="mt-3 min-h-[70px]">
          {subjects.length > 0 ? (
            <>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#969AAD] dark:text-[#8F95A9]">
                Subjects
              </p>

              <div className="flex flex-wrap gap-2">
                {subjects.map((subject, index) => (
                  <span
                    key={`${subject}-${index}`}
                    className="max-w-full truncate rounded-full border border-[#DDE2F4] bg-gradient-to-r from-[#F2F5FF] to-[#F7F1FF] px-3 py-1.5 text-[11px] font-medium text-[#6268A9] dark:border-[#465078] dark:from-[#252F50] dark:to-[#352548] dark:text-[#BCB9EC]"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="text-xs text-[#A0A4B5] dark:text-[#858B9D]">
              No subjects available
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto gap-3 border-t border-[#E7EAF3] bg-gradient-to-r from-[#FAFBFF] to-[#FCFAFF] px-5 py-5 dark:border-[#343A57] dark:from-[#181E31] dark:to-[#251B32]">
        {/* Save */}
        <button
          type="button"
          onClick={handleSaveBook}
          title={isSaved ? "Remove saved book" : "Save book"}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-105",
            isSaved
              ? "border-transparent bg-gradient-to-br from-[#4867D6] to-[#7A4FD8] text-white shadow-md shadow-indigo-200/50 dark:shadow-[0_8px_24px_rgba(103,82,205,0.25)]"
              : "border-[#DCE1F1] bg-white text-[#6570B5] hover:border-[#C7CEED] hover:bg-[#F2F4FF] hover:text-[#7653CF] dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#AAB5F0] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#C8C2FF]",
          )}
        >
          <BookOpen className="h-5 w-5" />
        </button>

        {/* View book */}
        {workId ? (
          <Link
            href={`/books/${workId}`}
            className="group/button flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-200/50 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.24),0_14px_36px_rgba(108,85,220,0.30)]"
          >
            View Book
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </Link>
        ) : (
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-[#F0F1F6] text-sm font-medium text-[#999EAF] dark:bg-[#292C38] dark:text-[#777D90]">
            Unavailable
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
