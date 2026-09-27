"use client";

import { useState, type FormEvent } from "react";
import { Search, Sparkles } from "lucide-react";

interface AuthorSearchProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}
const suggestions = [
  "George Orwell",
  "Agatha Christie",
  "Mark Twain",
];

export default function AuthorSearch({
  onSearch,
  defaultValue = "",
}: AuthorSearchProps) {
  const [searchInput, setSearchInput] = useState(defaultValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchInput.trim();

    if (!query) return;

    onSearch(query);
  };

  const handleSuggestion = (name: string) => {
    setSearchInput(name);
    onSearch(name);
  };

  return (
    <div
      className="
        w-full
        rounded-[22px]
        border
        border-[#E3E6F2]
        bg-gradient-to-r
        from-[#FAFBFF]
        via-white
        to-[#FBF8FF]
        p-4
        shadow-[0_8px_30px_rgba(72,80,130,0.06)]
        transition-all
        duration-300

        md:p-5

        dark:border-[#465078]
        dark:from-[#181F34]
        dark:via-[#1C2031]
        dark:to-[#251B35]
        dark:shadow-[0_14px_40px_rgba(67,76,155,0.14)]
      "
    >
      <div className="mb-4 flex items-center gap-3">
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
            text-[#675AC8]

            dark:from-[#29365D]
            dark:to-[#3A294F]
            dark:text-[#BEB6FF]
          "
        >
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <h2
            className="
              text-base
              font-bold
              text-[#292C43]

              dark:text-[#F3F4F8]
            "
          >
            Find an Author
          </h2>

          <p
            className="
              mt-0.5
              text-xs
              text-[#858A9F]

              dark:text-[#A2A7B8]
            "
          >
            Search by author name
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          flex
          w-full
          flex-col
          gap-3

          sm:flex-row
        "
      >
        <div className="group relative flex-1">
          <Search
            className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-[#8B90A5]
              transition-colors

              group-focus-within:text-[#5368CE]

              dark:text-[#868DA4]
              dark:group-focus-within:text-[#A8B4FF]
            "
          />

          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search author..."
            className="
              h-12
              w-full
              rounded-xl
              border
              border-[#DDE2F2]
              bg-white
              pl-12
              pr-4
              text-sm
              text-[#292C43]
              outline-none
              transition-all
              duration-200

              placeholder:text-[#A1A5B6]

              hover:border-[#C8CFEA]

              focus:border-[#7180D6]
              focus:ring-4
              focus:ring-[#EEF1FF]

              dark:border-[#414B70]
              dark:bg-[#171B29]
              dark:text-[#F0F1F6]
              dark:placeholder:text-[#777D91]

              dark:hover:border-[#5B6390]

              dark:focus:border-[#776DDA]
              dark:focus:ring-[#6763C9]/15
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-4
              right-4
              h-[2px]
              origin-left
              scale-x-0
              rounded-full
              bg-gradient-to-r
              from-[#4867D6]
              to-[#7A4FD8]
              transition-transform
              duration-300

              group-focus-within:scale-x-100
            "
          />
        </div>

        <button
          type="submit"
          className="
            group
            flex
            h-12
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-[#4867D6]
            to-[#7A4FD8]
            px-7
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-indigo-200/40
            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:shadow-lg
            hover:shadow-purple-200/50

            active:translate-y-0

            dark:from-[#566EE0]
            dark:to-[#8458D8]
            dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]

            dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.28),0_14px_36px_rgba(83,92,200,0.18),0_12px_30px_rgba(122,79,216,0.22)]
          "
        >
          <Search
            className="
              h-4
              w-4
              transition-transform
              duration-300

              group-hover:scale-110
            "
          />

          Search
        </button>
      </form>

      <div
        className="
          mt-4
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        <span
          className="
            mr-1
            text-xs
            font-medium
            text-[#9397A9]

            dark:text-[#8E94A8]
          "
        >
          Try:
        </span>

        {suggestions.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => handleSuggestion(name)}
            className="
              rounded-full
              border
              border-[#E0E4F2]
              bg-white
              px-3
              py-1.5
              text-xs
              font-medium
              text-[#6870A5]
              transition-all
              duration-200

              hover:border-[#C9CEEF]
              hover:bg-gradient-to-r
              hover:from-[#EEF2FF]
              hover:to-[#F4EEFF]
              hover:text-[#655CC1]

              dark:border-[#424C72]
              dark:bg-[#1A1E2C]
              dark:text-[#AAB2DF]

              dark:hover:border-[#7467D8]
              dark:hover:from-[#243052]
              dark:hover:to-[#352548]
              dark:hover:text-[#C8C2FF]
              dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.18),0_8px_24px_rgba(91,78,190,0.15)]
            "
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}