import Link from "next/link";

import {
  ArrowLeft,
  Home,
  Search,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="
        relative
        flex
        min-h-[calc(100vh-76px)]
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-[#F8FAFF]
        via-[#F7F8FC]
        to-[#F8F4FF]
        px-5
        py-16
        text-[#20233A]
        transition-colors
        duration-300

        dark:from-[#10121B]
        dark:via-[#12141E]
        dark:to-[#171320]
        dark:text-[#F3F4F8]
      "
    >
      {/* ==========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#4867D6]/10
          blur-[100px]

          dark:bg-[#4867D6]/15
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#7A4FD8]/10
          blur-[110px]

          dark:bg-[#7A4FD8]/15
        "
      />

      {/* LEFT DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          left-[10%]
          top-[20%]
          hidden
          h-16
          w-16
          rotate-12
          rounded-2xl
          border
          border-[#DCE2F5]
          bg-white/60
          shadow-sm
          backdrop-blur

          dark:border-[#38415F]
          dark:bg-[#1B2030]/50

          md:block
        "
      />

      {/* RIGHT DECORATION */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-[20%]
          right-[12%]
          hidden
          h-12
          w-12
          -rotate-12
          rounded-full
          bg-gradient-to-br
          from-[#4867D6]/20
          to-[#7A4FD8]/20

          md:block
        "
      />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-3xl
          text-center
        "
      >
        {/* ==========================================
            LOGO
        ========================================== */}

        <Link
          href="/"
          className="
            mx-auto
            inline-flex
            items-center
            justify-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-gradient-to-br
              from-[#EEF2FF]
              to-[#F4EEFF]
              shadow-[0_10px_30px_rgba(91,78,190,0.16)]

              dark:from-[#29365D]
              dark:to-[#3A294F]
              dark:shadow-[0_10px_30px_rgba(91,78,190,0.22)]
            "
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/just-read-logo.png"
              alt="JUST READ"
              className="
                h-full
                w-full
                scale-[1.65]
                object-contain
              "
            />
          </div>

          <div className="text-left">
            <p
              className="
                text-xl
                font-extrabold
                tracking-tight
                text-[#292C43]

                dark:text-white
              "
            >
              JUST READ
            </p>

            <p
              className="
                mt-1
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#9297AA]

                dark:text-[#858B9D]
              "
            >
              Discover Your Story
            </p>
          </div>
        </Link>

        {/* ==========================================
            404 NUMBER
        ========================================== */}

        <div
          className="
            relative
            mt-12
            flex
            items-center
            justify-center
          "
        >
          <h1
            className="
              select-none
              bg-gradient-to-r
              from-[#4867D6]
              via-[#6964D6]
              to-[#7A4FD8]
              bg-clip-text
              text-[120px]
              font-black
              leading-none
              tracking-[-0.08em]
              text-transparent

              sm:text-[160px]
              md:text-[190px]
            "
          >
            404
          </h1>
        </div>

        {/* ==========================================
            BADGE
        ========================================== */}

        <div
          className="
            mx-auto
            mt-4
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#DDE2F2]
            bg-white/75
            px-4
            py-2
            text-xs
            font-semibold
            text-[#655CC1]
            shadow-sm
            backdrop-blur

            dark:border-[#414B70]
            dark:bg-[#1A1E2C]/80
            dark:text-[#C2BCFF]
          "
        >
          <Sparkles className="h-3.5 w-3.5" />

          Page Not Found
        </div>

        {/* ==========================================
            TITLE
        ========================================== */}

        <h2
          className="
            mt-6
            text-3xl
            font-extrabold
            tracking-tight
            text-[#292C43]

            sm:text-4xl

            dark:text-[#F3F4F8]
          "
        >
          Looks like this page got lost
          between the pages.
        </h2>

        {/* ==========================================
            DESCRIPTION
        ========================================== */}

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-7
            text-[#7B8095]

            sm:text-base

            dark:text-[#A3A8BA]
          "
        >
          The page you&apos;re looking for
          doesn&apos;t exist, may have been
          moved, or the address might be
          incorrect. You can return home or
          continue exploring books.
        </p>

        {/* ==========================================
            ACTION BUTTONS
        ========================================== */}

        <div
          className="
            mt-8
            flex
            flex-col
            items-center
            justify-center
            gap-3

            sm:flex-row
          "
        >
          {/* HOME */}

          <Link
            href="/"
            className="
              group
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
              px-6
              text-sm
              font-bold
              text-white
              shadow-[0_10px_28px_rgba(104,82,205,0.25)]
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:shadow-[0_15px_35px_rgba(104,82,205,0.35)]

              sm:w-auto
            "
          >
            <Home className="h-4 w-4" />

            Back to Home

            <ArrowLeft
              className="
                h-4
                w-4
                rotate-180
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>

          {/* BROWSE BOOKS */}

          <Link
            href="/books"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#DDE2F2]
              bg-white
              px-6
              text-sm
              font-semibold
              text-[#6970A6]
              shadow-sm
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:border-[#C8CEEC]
              hover:bg-[#F5F1FF]
              hover:text-[#7653CF]

              dark:border-[#414B70]
              dark:bg-[#1A1E2C]
              dark:text-[#ADB6E7]

              dark:hover:border-[#7569D6]
              dark:hover:bg-[#28203A]
              dark:hover:text-[#CAC4FF]
              dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.18),0_10px_28px_rgba(91,78,190,0.17)]

              sm:w-auto
            "
          >
            <Search className="h-4 w-4" />

            Browse Books
          </Link>
        </div>

        {/* ==========================================
            QUICK LINKS
        ========================================== */}

        <div
          className="
            mx-auto
            mt-12
            max-w-xl
            border-t
            border-[#E4E7F1]
            pt-7

            dark:border-[#30374F]
          "
        >
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.15em]
              text-[#999DAF]

              dark:text-[#797F92]
            "
          >
            You might be looking for
          </p>

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-3
            "
          >
            <Link
              href="/books"
              className="
                text-sm
                font-semibold
                text-[#6970A6]
                transition

                hover:text-[#7653CF]

                dark:text-[#AAB2DF]
                dark:hover:text-[#C8C2FF]
              "
            >
              Books
            </Link>

            <Link
              href="/authors"
              className="
                text-sm
                font-semibold
                text-[#6970A6]
                transition

                hover:text-[#7653CF]

                dark:text-[#AAB2DF]
                dark:hover:text-[#C8C2FF]
              "
            >
              Authors
            </Link>

            <Link
              href="/books/saved"
              className="
                text-sm
                font-semibold
                text-[#6970A6]
                transition

                hover:text-[#7653CF]

                dark:text-[#AAB2DF]
                dark:hover:text-[#C8C2FF]
              "
            >
              Saved Books
            </Link>

            <Link
              href="/about"
              className="
                text-sm
                font-semibold
                text-[#6970A6]
                transition

                hover:text-[#7653CF]

                dark:text-[#AAB2DF]
                dark:hover:text-[#C8C2FF]
              "
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}