import Link from "next/link";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ExternalLink,
  Library,
  UserRound,
} from "lucide-react";

import AuthorImage from "./AuthorImage";

export interface AuthorDetailType {
  key: string;
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;

  bio?:
    | string
    | {
        type?: string;
        value: string;
      };

  alternate_names?: string[];
  wikipedia?: string;

  links?: {
    title?: string;
    url?: string;
  }[];
}

export interface AuthorWorkType {
  key: string;
  title: string;

  description?:
    | string
    | {
        value: string;
      };

  first_publish_date?: string;
  covers?: number[];
}

interface AuthorDetailProps {
  author: AuthorDetailType;
  works: AuthorWorkType[];
  authorId: string;
}

function ProfileDate({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3 text-sm shadow-sm dark:bg-[#1A2033]/75 dark:shadow-none">
      <span className="flex items-center gap-2 text-[#7A7F95] dark:text-[#A7ABBA]">
        <CalendarDays className={`h-4 w-4 ${color}`} />

        {label}
      </span>

      <span className="font-semibold text-[#30344A] dark:text-[#F1F2F7]">
        {value}
      </span>
    </div>
  );
}

export default function AuthorDetail({
  author,
  works,
  authorId,
}: AuthorDetailProps) {
  const biography =
    typeof author.bio === "string"
      ? author.bio
      : (author.bio?.value ?? "No biography available for this author.");

  const alternateNames = [...new Set(author.alternate_names ?? [])];

  const externalLinks = [
    ...(author.wikipedia
      ? [
          {
            title: "Wikipedia",
            url: author.wikipedia,
          },
        ]
      : []),
    ...(author.links ?? []),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FAF8FF] via-[#F8F9FD] to-[#F4F8FF] text-[#20233A] transition-colors duration-300 dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320] dark:text-[#F3F4F8]">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        {/* back */}
        <Link
          href="/authors"
          className="mb-7 inline-flex h-11 items-center gap-2 rounded-xl border border-[#DEDFF0] bg-white px-4 text-sm font-semibold text-[#655CC1] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8C9EA] hover:bg-[#F5F2FF] dark:border-[#424B70] dark:bg-[#1A1D29] dark:text-[#B7B3FF] dark:hover:border-[#7467D8] dark:hover:bg-[#25213A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Authors
        </Link>

        {/* profile */}
        <section className="overflow-hidden rounded-[30px] border border-[#E3E6F2] bg-white shadow-[0_18px_60px_rgba(75,78,130,0.09)] dark:border-[#475183] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_18px_60px_rgba(55,62,130,0.15)]">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr]">
            {/* left profile */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#EEF3FF] via-[#F2F1FF] to-[#F5EEFF] px-8 py-10 dark:from-[#192643] dark:via-[#20233B] dark:to-[#2A1D3D]">
              <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#4867D6]/10 blur-3xl dark:bg-[#4867D6]/20" />

              <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-[#7A4FD8]/10 blur-3xl dark:bg-[#7A4FD8]/20" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* photo */}
                <div className="rounded-full bg-gradient-to-br from-[#4867D6] to-[#7A4FD8] p-[4px] shadow-xl shadow-purple-200/50 dark:shadow-[0_0_35px_rgba(116,87,210,0.25)]">
                  <div className="h-52 w-52 overflow-hidden rounded-full bg-white dark:bg-[#181B28]">
                    <AuthorImage
                      authorId={authorId}
                      name={author.name}
                      priority
                    />
                  </div>
                </div>

                <h1 className="mt-7 text-3xl font-bold tracking-tight text-[#24273D] dark:text-[#F4F4F8]">
                  {author.name}
                </h1>

                {author.personal_name &&
                  author.personal_name !== author.name && (
                    <p className="mt-2 text-sm text-[#7A7F95] dark:text-[#A7ABBA]">
                      {author.personal_name}
                    </p>
                  )}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D9DEF2] bg-white/80 px-4 py-2 text-sm font-semibold text-[#5865B9] shadow-sm dark:border-[#465078] dark:bg-[#1C2236]/80 dark:text-[#B3BDFF]">
                  <Library className="h-4 w-4" />
                  {works.length} works
                </div>

                <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-[#CFD4EA] to-transparent dark:via-[#4D5573]" />

                <div className="w-full space-y-3">
                  {author.birth_date && (
                    <ProfileDate
                      label="Born"
                      value={author.birth_date}
                      color="text-[#5368CE] dark:text-[#8FA2FF]"
                    />
                  )}

                  {author.death_date && (
                    <ProfileDate
                      label="Died"
                      value={author.death_date}
                      color="text-[#7A4FD8] dark:text-[#BD94FF]"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* right content */}
            <div className="p-7 md:p-9 lg:p-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6D73AF] dark:text-[#9995E8]">
                    Author Profile
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EEF2FF] to-[#F4EEFF] px-4 py-2 text-xs font-semibold text-[#655CC1] dark:from-[#273253] dark:to-[#352548] dark:text-[#C2BCFF]">
                  <BookOpen className="h-4 w-4" />
                  {works.length} Works
                </div>
              </div>

              {/* biography */}
              <section className="rounded-2xl border border-[#E6E8F2] bg-gradient-to-br from-[#FBFCFF] to-[#FAF8FF] p-5 md:p-6 dark:border-[#40496D] dark:from-[#1A2238] dark:to-[#281F38]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <h2 className="text-xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
                    Biography
                  </h2>
                </div>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#73798F] md:text-base dark:text-[#A9AEBF]">
                  {biography}
                </p>
              </section>

              {/* alternate names */}
              {alternateNames.length > 0 && (
                <section className="mt-7">
                  <h2 className="text-lg font-bold text-[#292C43] dark:text-[#F3F4F8]">
                    Also Known As
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {alternateNames.slice(0, 12).map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-[#DDE2F2] bg-gradient-to-r from-[#F3F5FF] to-[#F7F2FF] px-3 py-1.5 text-xs font-medium text-[#6268A9] dark:border-[#465078] dark:from-[#252F50] dark:to-[#352548] dark:text-[#BAB9EC]"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* external links */}
              {externalLinks.length > 0 && (
                <section className="mt-7">
                  <h2 className="text-lg font-bold text-[#292C43] dark:text-[#F3F4F8]">
                    External Links
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {externalLinks.slice(0, 5).map((link, index) => {
                      if (!link.url) {
                        return null;
                      }

                      return (
                        <a
                          key={`${link.url}-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-[#DDE2F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#5967BE] transition-all hover:border-[#C6CAEB] hover:bg-[#F4F2FF] hover:text-[#7653CF] dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#AFBAFF] dark:hover:border-[#7467D8] dark:hover:bg-[#272039] dark:hover:text-[#D0C7FF]"
                        >
                          {link.title ?? "Open Link"}

                          <ExternalLink className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        {/* works */}
        <section className="mt-14">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />

              <h2 className="text-3xl font-bold tracking-tight text-[#24273D] dark:text-[#F3F4F8]">
                Books by {author.name}
              </h2>

              <p className="mt-2 text-sm text-[#7B8095] dark:text-[#A5AABC]">
                Explore works by this author.
              </p>
            </div>

            <div className="rounded-full bg-gradient-to-r from-[#EEF2FF] to-[#F4EEFF] px-4 py-2 text-xs font-semibold text-[#655CC1] dark:from-[#273253] dark:to-[#352548] dark:text-[#C2BCFF]">
              {works.length} books
            </div>
          </div>

          {works.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-[#E3E7F2] bg-white text-center shadow-sm dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:to-[#251B35]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
                <BookOpen className="h-8 w-8" />
              </div>

              <h3 className="mt-4 font-semibold text-[#30344A] dark:text-[#F3F4F8]">
                No works found
              </h3>

              <p className="mt-1 text-sm text-[#8A8FA3] dark:text-[#949AAD]">
                No books are currently available.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {works.map((work) => {
                const workId = work.key.split("/").filter(Boolean).pop();

                const coverId = work.covers?.find((cover) => cover > 0);

                const coverUrl = coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                  : null;

                return (
                  <Link
                    key={work.key}
                    href={workId ? `/books/${workId}` : "#"}
                    className="group flex min-h-[460px] flex-col overflow-hidden rounded-[22px] border border-[#E3E7F2] bg-white shadow-[0_8px_30px_rgba(72,80,130,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C6CDF0] hover:shadow-[0_18px_45px_rgba(91,78,190,0.15)] dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:hover:border-[#7569D6]"
                  >
                    <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] dark:from-[#202945] dark:via-[#252743] dark:to-[#33223F]">
                      {coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={coverUrl}
                          alt={work.title}
                          loading="lazy"
                          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/70 text-[#6D64C6] dark:bg-[#1B2031]/80 dark:text-[#B7B3FF]">
                          <BookOpen className="h-8 w-8" />
                        </div>
                      )}

                      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4867D6] to-[#7A4FD8]" />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="line-clamp-2 text-base font-bold leading-6 text-[#292C43] transition group-hover:text-[#625CC8] dark:text-[#F1F2F7] dark:group-hover:text-[#C2BCFF]">
                        {work.title}
                      </h3>

                      <div className="mt-3 min-h-6">
                        {work.first_publish_date && (
                          <div className="flex items-center gap-2 text-xs text-[#7D8297] dark:text-[#A0A6B8]">
                            <CalendarDays className="h-3.5 w-3.5 text-[#6571C7] dark:text-[#98A7FF]" />
                            Published {work.first_publish_date}
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-5">
                        <div className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-sm font-semibold text-white shadow-md shadow-indigo-100 transition group-hover:shadow-lg dark:from-[#566EE0] dark:to-[#8458D8]">
                          View Book
                          <BookOpen className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
