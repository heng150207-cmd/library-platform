"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Bookmark,
  LayoutDashboard,
  LogIn,
  Menu,
  Moon,
  Sun,
  UserPlus,
  X,
} from "lucide-react";

const navigation = [
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
    name: "Saved",
    href: "/books/saved",
  },
  {
    name: "Activity",
    href: "/recent",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function NavbarComponent() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateSavedCount = () => {
      try {
        const stored = localStorage.getItem("savedBooks");

        if (!stored) {
          setSavedCount(0);
          return;
        }

        const parsed = JSON.parse(stored);

        setSavedCount(
          Array.isArray(parsed)
            ? parsed.length
            : 0
        );
      } catch {
        setSavedCount(0);
      }
    };

    updateSavedCount();

    window.addEventListener(
      "storage",
      updateSavedCount
    );

    window.addEventListener(
      "savedBooksUpdated",
      updateSavedCount
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateSavedCount
      );

      window.removeEventListener(
        "savedBooksUpdated",
        updateSavedCount
      );
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDark =
    mounted && resolvedTheme === "dark";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/books") {
      return (
        pathname === "/books" ||
        (pathname.startsWith("/books/") &&
          !pathname.startsWith("/books/saved"))
      );
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* NAVBAR */}
      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-[100]
          h-[76px]
          w-full
          border-b
          border-[#E5E8F2]
          bg-white/95
          backdrop-blur-xl
          transition-colors
          duration-300

          dark:border-[#2F354D]
          dark:bg-[#12151F]/95
        "
      >
        <div
          className="
            mx-auto
            flex
            h-full
            max-w-[1450px]
            items-center
            justify-between
            px-4

            sm:px-5
            lg:px-6
            xl:px-8
          "
        >
          {/* BRAND */}
          <Link
            href="/"
            className="
              flex
              min-w-0
              shrink-0
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-[16px]
                bg-gradient-to-br
                from-[#EEF2FF]
                to-[#F4EEFF]
                shadow-[0_5px_18px_rgba(83,92,180,0.16)]

                dark:from-[#29365D]
                dark:to-[#3A294F]
                dark:shadow-[0_6px_22px_rgba(105,82,205,0.20)]
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/just-read-logo.png"
                alt="JUST READ Logo"
                className="
                  h-full
                  w-full
                  scale-[1.55]
                  object-contain
                "
              />
            </div>

            <div className="min-w-0 leading-none">
              <h1
                className="
                  truncate
                  text-[18px]
                  font-extrabold
                  tracking-tight
                  text-[#292C43]

                  sm:text-[20px]

                  dark:text-[#F3F4F8]
                "
              >
                JUST READ
              </h1>

              <p
                className="
                  mt-1.5
                  whitespace-nowrap
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#969BAD]

                  sm:text-[9px]
                  sm:tracking-[0.2em]

                  dark:text-[#858B9D]
                "
              >
                Discover Your Story
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="
              hidden
              items-center
              gap-0.5

              lg:flex
              xl:gap-1
            "
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    relative
                    rounded-xl
                    px-2.5
                    py-2.5
                    text-[13px]
                    font-semibold
                    transition-all
                    duration-200

                    xl:px-3
                    xl:text-sm

                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-[#EEF2FF]
                          to-[#F4EEFF]
                          text-[#655CC1]

                          dark:from-[#273253]
                          dark:to-[#352548]
                          dark:text-[#C2BCFF]
                        `
                        : `
                          text-[#697086]

                          hover:bg-[#F5F6FB]
                          hover:text-[#4F5FB6]

                          dark:text-[#A4AABC]
                          dark:hover:bg-[#1D2230]
                          dark:hover:text-[#C2BCFF]
                        `
                    }
                  `}
                >
                  {item.name}

                  {item.name === "Saved" &&
                    savedCount > 0 && (
                      <span
                        className="
                          ml-1
                          inline-flex
                          min-w-5
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-[#4867D6]
                          to-[#7A4FD8]
                          px-1.5
                          py-0.5
                          text-[9px]
                          font-bold
                          text-white
                        "
                      >
                        {savedCount}
                      </span>
                    )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex shrink-0 items-center gap-2">
            {/* LOGIN */}
            <Link
              href="/login"
              className={`
                hidden
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                border
                px-3
                text-sm
                font-semibold
                transition-all
                duration-200

                xl:flex

                ${
                  pathname === "/login"
                    ? `
                      border-[#C7CEF0]
                      bg-gradient-to-r
                      from-[#EEF2FF]
                      to-[#F4EEFF]
                      text-[#655CC1]

                      dark:border-[#7569D6]
                      dark:from-[#273253]
                      dark:to-[#352548]
                      dark:text-[#C2BCFF]
                    `
                    : `
                      border-[#E1E5F1]
                      bg-white
                      text-[#646B83]

                      hover:-translate-y-0.5
                      hover:border-[#C8CEEC]
                      hover:bg-[#F4F2FF]
                      hover:text-[#7653CF]

                      dark:border-[#39415E]
                      dark:bg-[#1A1E2C]
                      dark:text-[#ADB4C8]

                      dark:hover:border-[#7569D6]
                      dark:hover:bg-[#28203A]
                      dark:hover:text-[#CAC4FF]
                    `
                }
              `}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>

            {/* REGISTER */}
            <Link
              href="/register"
              className="
                hidden
                h-10
                items-center
                justify-center
                gap-1.5
                rounded-xl
                bg-gradient-to-r
                from-[#4867D6]
                to-[#7A4FD8]
                px-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_7px_20px_rgba(100,82,205,0.20)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-[0_10px_26px_rgba(100,82,205,0.30)]

                xl:flex

                dark:from-[#566EE0]
                dark:to-[#8458D8]
              "
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Link>

            {/* DASHBOARD */}
            <Link
              href="/dashboard"
              title="Dashboard"
              className="
                hidden
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[#E1E5F1]
                bg-white
                text-[#646B83]
                transition-all

                hover:-translate-y-0.5
                hover:border-[#C8CEEC]
                hover:bg-[#F4F2FF]
                hover:text-[#7653CF]

                dark:border-[#39415E]
                dark:bg-[#1A1E2C]
                dark:text-[#ADB4C8]

                dark:hover:border-[#7569D6]
                dark:hover:bg-[#28203A]
                dark:hover:text-[#CAC4FF]

                2xl:flex
              "
            >
              <LayoutDashboard className="h-4 w-4" />
            </Link>

            {/* THEME */}
            <button
              type="button"
              aria-label="Toggle theme"
              title={
                mounted
                  ? isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
              onClick={() => {
                if (!mounted) return;

                setTheme(
                  isDark
                    ? "light"
                    : "dark"
                );
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-[#E1E5F1]
                bg-white
                text-[#6770B9]
                shadow-sm
                transition-all
                duration-200

                hover:border-[#C8CEEC]
                hover:bg-[#F4F2FF]
                hover:text-[#7653CF]

                dark:border-[#39415E]
                dark:bg-[#1A1E2C]
                dark:text-[#B9C1F5]

                dark:hover:border-[#7569D6]
                dark:hover:bg-[#28203A]
                dark:hover:text-[#D0CAFF]
              "
            >
              {!mounted ? (
                <span className="h-5 w-5" />
              ) : isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() =>
                setMobileMenuOpen(
                  (current) => !current
                )
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-[#E1E5F1]
                bg-white
                text-[#6770B9]
                shadow-sm
                transition-all

                hover:border-[#C8CEEC]
                hover:bg-[#F4F2FF]
                hover:text-[#7653CF]

                dark:border-[#39415E]
                dark:bg-[#1A1E2C]
                dark:text-[#B9C1F5]

                dark:hover:border-[#7569D6]
                dark:hover:bg-[#28203A]

                lg:hidden
              "
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          className="
            fixed
            left-0
            right-0
            top-[76px]
            z-[90]
            max-h-[calc(100vh-76px)]
            overflow-y-auto
            border-b
            border-[#E3E7F2]
            bg-white
            p-5
            shadow-[0_18px_45px_rgba(50,55,100,0.12)]

            dark:border-[#343B55]
            dark:bg-[#151923]
            dark:shadow-[0_18px_45px_rgba(0,0,0,0.32)]

            lg:hidden
          "
        >
          <nav
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col
              gap-2
            "
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    transition-all

                    ${
                      active
                        ? `
                          bg-gradient-to-r
                          from-[#EEF2FF]
                          to-[#F4EEFF]
                          text-[#655CC1]

                          dark:from-[#273253]
                          dark:to-[#352548]
                          dark:text-[#C2BCFF]
                        `
                        : `
                          text-[#656C83]

                          hover:bg-[#F5F6FB]

                          dark:text-[#A4AABC]
                          dark:hover:bg-[#202432]
                        `
                    }
                  `}
                >
                  <span>{item.name}</span>

                  {item.name === "Saved" &&
                    savedCount > 0 && (
                      <span
                        className="
                          inline-flex
                          min-w-6
                          items-center
                          justify-center
                          rounded-full
                          bg-gradient-to-r
                          from-[#4867D6]
                          to-[#7A4FD8]
                          px-2
                          py-1
                          text-[10px]
                          font-bold
                          text-white
                        "
                      >
                        {savedCount}
                      </span>
                    )}
                </Link>
              );
            })}

            <div
              className="
                my-2
                h-px
                bg-[#E7EAF3]

                dark:bg-[#343A57]
              "
            />

            {/* LOGIN + REGISTER */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[#DDE2F2]
                  bg-white
                  text-sm
                  font-semibold
                  text-[#6770A6]
                  transition-all

                  hover:border-[#C8CEEC]
                  hover:bg-[#F5F1FF]
                  hover:text-[#7653CF]

                  dark:border-[#414B70]
                  dark:bg-[#1A1E2C]
                  dark:text-[#ADB6E7]

                  dark:hover:border-[#7569D6]
                  dark:hover:bg-[#28203A]
                  dark:hover:text-[#CAC4FF]
                "
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link
                href="/register"
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#4867D6]
                  to-[#7A4FD8]
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition-all

                  hover:shadow-lg

                  dark:from-[#566EE0]
                  dark:to-[#8458D8]
                "
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>

            {/* DASHBOARD */}
            <Link
              href="/dashboard"
              className="
                mt-1
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#DDE2F2]
                bg-gradient-to-r
                from-[#FAFBFF]
                to-[#F7F3FF]
                text-sm
                font-semibold
                text-[#655CC1]
                transition-all

                hover:border-[#C8CEEC]
                hover:shadow-sm

                dark:border-[#414B70]
                dark:from-[#20283F]
                dark:to-[#2A203A]
                dark:text-[#C2BCFF]

                dark:hover:border-[#7569D6]
              "
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>

            {/* SAVED */}
            <Link
              href="/books/saved"
              className="
                flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#DDE2F2]
                bg-white
                text-sm
                font-semibold
                text-[#6770A6]
                transition-all

                hover:border-[#C8CEEC]
                hover:bg-[#F5F1FF]
                hover:text-[#7653CF]

                dark:border-[#414B70]
                dark:bg-[#1A1E2C]
                dark:text-[#ADB6E7]

                dark:hover:border-[#7569D6]
                dark:hover:bg-[#28203A]
                dark:hover:text-[#CAC4FF]
              "
            >
              <Bookmark className="h-4 w-4" />

              {savedCount} Saved{" "}
              {savedCount === 1
                ? "Book"
                : "Books"}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}