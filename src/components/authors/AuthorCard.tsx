import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  LibraryBig,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import AuthorImage from "./AuthorImage";

export interface AuthorType {
  key: string;
  name: string;
  birth_date?: string;
  death_date?: string;
  top_work?: string;
  work_count?: number;
  top_subjects?: string[];
}

interface AuthorCardProps {
  author: AuthorType;
  priority?: boolean;
}

export default function AuthorCard({
  author,
  priority = false,
}: AuthorCardProps) {
  const authorId = author.key
    .split("/")
    .filter(Boolean)
    .pop();

  const subjects = [
    ...new Set(author.top_subjects ?? []),
  ].slice(0, 3);

  return (
    <Card
      className="
        group
        relative
        flex
        h-[680px]
        w-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-[#E3E7F2]
        bg-white
        p-0
        shadow-[0_10px_35px_rgba(72,80,130,0.06)]
        transition-all
        duration-300

        hover:-translate-y-2
        hover:border-[#C7CEF0]
        hover:shadow-[0_20px_55px_rgba(91,78,190,0.16)]

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
      {/* top accent */}
      <div
        className="
          absolute
          left-0
          right-0
          top-0
          z-20
          h-1
          bg-gradient-to-r
          from-[#4867D6]
          via-[#6270D8]
          to-[#7A4FD8]
        "
      />

      {/* author image */}
      <div
        className="
          relative
          h-64
          min-h-64
          overflow-hidden
          bg-gradient-to-br
          from-[#EEF2FF]
          to-[#F4EEFF]

          dark:from-[#202945]
          dark:via-[#252743]
          dark:to-[#33223F]
        "
      >
        {authorId ? (
          <AuthorImage
            authorId={authorId}
            name={author.name}
            priority={priority}
            className="
              transition-all
              duration-700
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-gradient-to-br
              from-[#EEF2FF]
              to-[#F4EEFF]
              text-[#777C94]

              dark:from-[#202945]
              dark:to-[#33223F]
              dark:text-[#A7ABBE]
            "
          >
            No Photo
          </div>
        )}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#20233A]/65
            via-transparent
            to-transparent
            opacity-60

            dark:from-[#070914]/85
          "
        />

        <div
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/40
            bg-white/85
            px-3
            py-1.5
            text-[11px]
            font-semibold
            text-[#5D63B8]
            shadow-sm
            backdrop-blur-md

            dark:border-white/10
            dark:bg-[#1A1D29]/85
            dark:text-[#B7B3FF]
          "
        >
          <Sparkles className="h-3.5 w-3.5" />

          Author
        </div>

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            text-white
          "
        >
          <h2
            title={author.name}
            className="
              line-clamp-1
              text-xl
              font-bold
              tracking-tight
            "
          >
            {author.name}
          </h2>

          {author.birth_date && (
            <div
              className="
                mt-1
                flex
                items-center
                gap-1.5
                text-xs
                text-white/80
              "
            >
              <CalendarDays className="h-3.5 w-3.5" />

              <span>
                Born {author.birth_date}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* content */}
      <CardContent
        className="
          flex
          flex-1
          flex-col
          px-5
          pb-4
          pt-5
        "
      >
        {/* work count */}
        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-[#E5E8F3]
            bg-gradient-to-r
            from-[#F7F9FF]
            to-[#FAF7FF]
            px-4
            py-3

            dark:border-[#394263]
            dark:from-[#20283F]
            dark:to-[#2A203A]
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-[#EEF2FF]
                text-[#5368CE]

                dark:bg-[#29365E]
                dark:text-[#9EB0FF]
              "
            >
              <LibraryBig className="h-4 w-4" />
            </div>

            <span
              className="
                text-sm
                font-medium
                text-[#73798F]

                dark:text-[#ADB2C4]
              "
            >
              Published Works
            </span>
          </div>

          <span
            className="
              text-base
              font-bold
              text-[#5368CE]

              dark:text-[#A9B5FF]
            "
          >
            {(author.work_count ?? 0).toLocaleString()}
          </span>
        </div>

        {/* popular work */}
        <div
          className="
            mt-5
            min-h-[92px]
            rounded-2xl
            border
            border-[#E7E9F3]
            bg-white
            p-4

            dark:border-[#3D3D5F]
            dark:bg-[#1B1E2B]
          "
        >
          <div
            className="
              mb-2
              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-[#F4EEFF]
                text-[#7A4FD8]

                dark:bg-[#38284D]
                dark:text-[#C29AFF]
              "
            >
              <BookOpen className="h-4 w-4" />
            </div>

            <span
              className="
                text-sm
                font-semibold
                text-[#2A2D43]

                dark:text-[#F0F1F6]
              "
            >
              Popular Work
            </span>
          </div>

          <p
            className="
              line-clamp-2
              text-sm
              leading-5
              text-[#7B8095]

              dark:text-[#A5AABC]
            "
          >
            {author.top_work ?? "No popular work available"}
          </p>
        </div>

        {/* subjects */}
        <div className="mt-4 min-h-[82px]">
          <p
            className="
              mb-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#8A8EA2]

              dark:text-[#989DAF]
            "
          >
            Subjects
          </p>

          {subjects.length > 0 ? (
            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="
                    rounded-full
                    border
                    border-[#DDE2F4]
                    bg-gradient-to-r
                    from-[#F2F5FF]
                    to-[#F7F1FF]
                    px-3
                    py-1.5
                    text-[11px]
                    font-medium
                    text-[#6268A9]
                    transition

                    group-hover:border-[#C8CDF0]

                    dark:border-[#465078]
                    dark:from-[#252F50]
                    dark:to-[#352548]
                    dark:text-[#B8B8ED]

                    dark:group-hover:border-[#7169BB]
                  "
                >
                  {subject}
                </span>
              ))}
            </div>
          ) : (
            <span
              className="
                text-sm
                text-[#9A9EB0]

                dark:text-[#858B9D]
              "
            >
              No subjects available
            </span>
          )}
        </div>
      </CardContent>

      {/* footer */}
      <CardFooter
        className="
          mt-auto
          border-t
          border-[#E7EAF3]
          bg-gradient-to-r
          from-[#FAFBFF]
          to-[#FCFAFF]
          px-5
          py-5

          dark:border-[#343A57]
          dark:from-[#181E31]
          dark:to-[#251B32]
        "
      >
        {authorId ? (
          <Link
            href={`/authors/${authorId}`}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-[#4867D6]
              to-[#7A4FD8]
              font-semibold
              text-white
              shadow-md
              shadow-indigo-200/40
              transition-all
              duration-300

              hover:scale-[1.02]
              hover:shadow-lg
              hover:shadow-purple-200/50

              dark:from-[#566EE0]
              dark:to-[#8458D8]
              dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]
              dark:hover:shadow-[0_14px_36px_rgba(108,85,220,0.32)]
            "
          >
            View Author

            <ArrowRight
              className="
                h-4
                w-4
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>
        ) : (
          <div
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              bg-[#F0F1F6]
              text-sm
              font-medium
              text-[#999EAF]

              dark:bg-[#292C38]
              dark:text-[#777D90]
            "
          >
            Unavailable
          </div>
        )}
      </CardFooter>
    </Card>
  );
}