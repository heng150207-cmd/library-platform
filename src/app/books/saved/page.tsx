import BookSaved from "@/components/books/BookSaved";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Saved Books",
};
export default function SavedBooksPage() {
  return (
    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#F8FAFF]
        via-[#F7F8FC]
        to-[#F8F4FF]
        px-5
        py-10
        text-[#20233A]
        transition-colors
        duration-300

        dark:from-[#10121B]
        dark:via-[#12141E]
        dark:to-[#171320]
        dark:text-[#F3F4F8]
      "
    >
      <div className="mx-auto max-w-7xl">
        <BookSaved />
      </div>
    </main>
  );
}