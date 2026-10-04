import Link from "next/link";
import { ArrowLeft, RefreshCcw, WifiOff } from "lucide-react";
import BookDetail from "@/components/books/BookDetail";

interface BookWork {
  key: string;
  title: string;
  description?: string | { type?: string; value: string };
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  authors?: { author?: { key?: string } }[];
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getBook(bookId: string): Promise<BookWork | null> {
  const url = `https://openlibrary.org/works/${encodeURIComponent(bookId)}.json`;

  // Open Library can be slow sometimes, so try twice
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetch(url, { next: { revalidate: 3600 } });

      if (response.status === 404) return null;

      if (!response.ok) {
        throw new Error(`Open Library returned ${response.status}`);
      }

      const data: BookWork = await response.json();
      return data;
    } catch (error) {
      console.error(`Book fetch attempt ${attempt} failed:`, error);

      if (attempt < 2) await wait(1000);
    }
  }

  return null;
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string[] }>;
}) {
  const { id } = await params;
  const bookId = id?.[0];

  // no id in the url
  if (!bookId) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#F8FAFF] via-[#F7F8FC] to-[#F8F4FF] px-5 py-12 text-[#20233A] transition-colors duration-300 dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320] dark:text-[#F3F4F8]">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[28px] border border-[#E3E7F2] bg-white p-10 text-center shadow-[0_12px_40px_rgba(72,80,130,0.07)] transition-colors dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
              <WifiOff className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
              Invalid Book
            </h1>

            <p className="mt-2 text-sm text-[#858A9F] dark:text-[#A3A8BA]">
              The book ID is missing.
            </p>

            <Link
              href="/books"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200/50 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Books
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const book = await getBook(bookId);

  // request failed or book doesn't exist
  if (!book) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#F8FAFF] via-[#F7F8FC] to-[#F8F4FF] px-5 py-16 text-[#20233A] transition-colors duration-300 dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320] dark:text-[#F3F4F8]">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/books"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#747A90] transition hover:text-[#5368CE] dark:text-[#A3A8BA] dark:hover:text-[#C2BCFF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>

          <div className="rounded-[28px] border border-[#E3E7F2] bg-white px-6 py-16 text-center shadow-[0_12px_40px_rgba(72,80,130,0.07)] transition-colors md:px-12 dark:border-[#424B7A] dark:bg-gradient-to-br dark:from-[#181F34] dark:via-[#1C2031] dark:to-[#251B35] dark:shadow-[0_14px_40px_rgba(67,76,155,0.13)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EEF2FF] to-[#F4EEFF] text-[#6658C7] dark:from-[#29365D] dark:to-[#3A294F] dark:text-[#BDB6FF]">
              <WifiOff className="h-7 w-7" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-[#292C43] dark:text-[#F3F4F8]">
              Unable to load this book
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#858A9F] dark:text-[#A3A8BA]">
              Open Library is taking too long to respond. This can happen
              temporarily. Please try loading the page again.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={`/books/${bookId}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4867D6] to-[#7A4FD8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200/40 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-200/50 dark:from-[#566EE0] dark:to-[#8458D8] dark:shadow-[0_10px_28px_rgba(100,82,205,0.20)] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.24),0_14px_36px_rgba(108,85,220,0.30)]"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Link>

              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-xl border border-[#DDE2F2] bg-white px-5 py-3 text-sm font-semibold text-[#6970A6] transition-all hover:-translate-y-0.5 hover:border-[#C8CEEC] hover:bg-[#F5F1FF] hover:text-[#7653CF] dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#ADB6E7] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CAC4FF] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.20),0_10px_28px_rgba(91,78,190,0.18)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F8FAFF] via-[#F7F8FC] to-[#F8F4FF] px-5 py-10 text-[#20233A] transition-colors duration-300 dark:from-[#10121B] dark:via-[#12141E] dark:to-[#171320] dark:text-[#F3F4F8]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/books"
          className="mb-7 inline-flex items-center gap-2 rounded-xl border border-[#DDE2F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#6970A6] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8CEEC] hover:bg-[#F5F1FF] hover:text-[#7653CF] dark:border-[#465078] dark:bg-[#1A1E2C] dark:text-[#ADB6E7] dark:hover:border-[#7569D6] dark:hover:bg-[#28203A] dark:hover:text-[#CAC4FF] dark:hover:shadow-[0_0_0_1px_rgba(116,103,216,0.20),0_10px_28px_rgba(91,78,190,0.18)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Link>

        <BookDetail book={book} bookId={bookId} />
      </div>
    </main>
  );
}
