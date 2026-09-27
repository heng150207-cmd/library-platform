// hooks/useBooks.ts
"use client";

import { useEffect, useState } from "react";
import { Book, isbnUrl, OpenLibraryEdition, toBook } from "./Books";

interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
  failed: string[]; // ISBNs that could not be loaded
}

export function useBooks(isbns: string[]): State {
  const [state, setState] = useState<State>({
    books: [],
    loading: true,
    error: null,
    failed: [],
  });

  // stable dependency so a new array literal doesn't refetch every render
  const key = isbns.join(",");

  useEffect(() => {
    const controller = new AbortController();
    const list = key ? key.split(",") : [];

    setState((s) => ({ ...s, loading: true, error: null }));

    Promise.allSettled(
      list.map(async (isbn) => {
        const res = await fetch(isbnUrl(isbn), { signal: controller.signal });
        if (!res.ok) throw new Error(`${isbn}: ${res.status}`);
        const data: OpenLibraryEdition = await res.json();
        return toBook(isbn, data);
      }),
    ).then((results) => {
      if (controller.signal.aborted) return;

      const books: Book[] = [];
      const failed: string[] = [];
      results.forEach((r, i) =>
        r.status === "fulfilled" ? books.push(r.value) : failed.push(list[i]),
      );

      setState({
        books,
        failed,
        loading: false,
        error:
          books.length === 0 && failed.length
            ? "Could not load any books."
            : null,
      });
    });

    return () => controller.abort();
  }, [key]);

  return state;
}
