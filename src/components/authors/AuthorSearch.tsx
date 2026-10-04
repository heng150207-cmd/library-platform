"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Search, X } from "lucide-react";

interface AuthorSearchProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export default function AuthorSearch({
  onSearch,
  defaultValue = "",
}: AuthorSearchProps) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = value.trim();

    // fall back to the default query when the input is empty
    onSearch(trimmed || defaultValue || "all");
  };

  const handleClear = () => {
    setValue("");
    onSearch(defaultValue || "all");
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="flex w-full flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7B8095] dark:text-[#A3A8BA]" />

        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Search authors..."
          aria-label="Search authors"
          className="h-12 w-full rounded-xl border border-[#DDE2F2] bg-white pl-11 pr-11 text-sm text-[#292C43] shadow-sm outline-none transition-all placeholder:text-[#9AA0B5] focus:border-[#7569D6] focus:ring-4 focus:ring-[#7569D6]/15 dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#F3F4F8] dark:placeholder:text-[#7F86A0] dark:focus:border-[#7569D6]"
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#7B8095] transition hover:bg-[#F1F2FA] hover:text-[#655CC1] dark:text-[#A3A8BA] dark:hover:bg-[#28203A] dark:hover:text-[#C2BCFF]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-6 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <Search className="h-4 w-4" />
        Search
      </button>
    </form>
  );
}
