"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-6 dark:bg-[#0F1119]">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl overflow-hidden rounded-[32px] border border-[#E1E5F1] bg-white shadow-[0_25px_80px_rgba(60,67,120,0.12)] dark:border-[#343B58] dark:bg-[#151823] lg:grid-cols-2">
        {/* LEFT */}

        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#171D4C] via-[#241254] to-[#38145D] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -left-28 -top-28 h-[420px] w-[420px] rounded-full bg-[#4867D6]/25 blur-[70px]" />

          <div className="pointer-events-none absolute right-16 top-24 h-28 w-28 rounded-full bg-gradient-to-br from-[#3B5BCF] to-[#7A27A8] opacity-80 shadow-[0_0_80px_rgba(116,79,216,0.45)]" />

          <div className="pointer-events-none absolute -right-28 top-[35%] h-[320px] w-[240px] rotate-[38deg] rounded-[90px] bg-gradient-to-br from-[#3D69D4] via-[#6258C8] to-[#A02AA8] opacity-70" />

          <div className="pointer-events-none absolute -bottom-36 left-20 h-[300px] w-[430px] rounded-[50%] bg-gradient-to-r from-[#8A1D9C] via-[#4934AD] to-[#203F83] opacity-70 blur-[8px]" />

          {/* LOGO */}

          <Link
            href="/"
            className="relative z-10 inline-flex w-fit items-center gap-3"
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/10 backdrop-blur">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/just-read-logo.png"
                alt="JUST READ"
                className="h-full w-full scale-[1.65] object-contain"
              />
            </div>

            <div>
              <h2 className="text-xl font-extrabold">JUST READ</h2>

              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Discover your story
              </p>
            </div>
          </Link>

          {/* CONTENT */}

          <div className="relative z-10 max-w-lg">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
              <BookOpen className="h-6 w-6" />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
              Read. Discover.
              <br />
              Imagine.
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
              Explore thousands of books, discover inspiring authors, save your
              favorites and find your next unforgettable story.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-white/55">
              <Sparkles className="h-4 w-4 text-[#C6A4FF]" />
              Your next story starts here.
            </div>
          </div>

          <div className="relative z-10 border-t border-white/10 pt-6">
            <p className="text-sm italic text-white/60">
              “A reader lives a thousand lives before he dies.”
            </p>

            <p className="mt-2 text-xs font-semibold text-white/80">
              — George R. R. Martin
            </p>
          </div>
        </section>

        {/* LOGIN FORM */}

        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}

            <Link
              href="/"
              className="mb-10 flex items-center justify-center gap-3 lg:hidden"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] dark:from-[#29365D] dark:to-[#3A294F]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/just-read-logo.png"
                  alt="JUST READ"
                  className="h-full w-full scale-[1.65] object-contain"
                />
              </div>

              <div>
                <p className="text-xl font-extrabold text-[#292C43] dark:text-white">
                  JUST READ
                </p>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[#9297AA]">
                  Discover Your Story
                </p>
              </div>
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6D68C7] dark:text-[#A9A2F5]">
              Welcome back
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#292C43] dark:text-[#F3F4F8]">
              Login to JUST READ
            </h1>

            <p className="mt-2 text-sm text-[#858A9F] dark:text-[#969CAE]">
              Continue discovering your next favorite book.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#44495F] dark:text-[#C4C8D6]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9297AA]" />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-[#DDE2F2] bg-white pl-11 pr-4 text-sm text-[#292C43] outline-none transition-all placeholder:text-[#A6AABC] focus:border-[#7569D6] focus:ring-4 focus:ring-[#7569D6]/10 dark:border-[#414866] dark:bg-[#1A1E2C] dark:text-[#F1F2F7] dark:placeholder:text-[#747A8E]"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#44495F] dark:text-[#C4C8D6]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9297AA]" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-[#DDE2F2] bg-white pl-11 pr-12 text-sm text-[#292C43] outline-none transition-all focus:border-[#7569D6] focus:ring-4 focus:ring-[#7569D6]/10 dark:border-[#414866] dark:bg-[#1A1E2C] dark:text-[#F1F2F7]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9297AA]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] text-sm font-bold text-white shadow-[0_10px_28px_rgba(104,82,205,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(104,82,205,0.35)]"
              >
                Login
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-[#81869A] dark:text-[#989EAF]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#685CC7] hover:text-[#7A4FD8] dark:text-[#B5ADF5]"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
