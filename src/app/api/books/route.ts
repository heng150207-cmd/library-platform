import { NextRequest, NextResponse } from "next/server";

import type { Sort } from "@/lib/books/types";

// The browser calls this route; this route calls Open Library with the
// User-Agent header (browsers can't set it) and caches the result.
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  const sortParam = p.get("sort");
  const sort: Sort = sortParam === "rating" || sortParam === "readinglog" ? sortParam : "relevance";
  const page = Math.max(1, Number(p.get("page")) || 1);
  const limit = Math.min(50, Math.max(1, Number(p.get("limit")) || 20));

  try {
    const data = await searchBooks({ q: p.get("q") ?? "", subject: p.get("subject") ?? "", sort, page, limit });
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json({ error: "Open Library isn't responding. Try again in a moment." }, { status: 502 });
  }
}
function searchBooks(arg0: { q: string; subject: string; sort: Sort; page: number; limit: number; }) {
  throw new Error("Function not implemented.");
}

