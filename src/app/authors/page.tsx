import AuthorList from "@/components/authors/AuthorList";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors",
};
export default function AuthorsPage() {
  return (
    <main className="min-h-screen">
      <AuthorList/>
    </main>
  );
}