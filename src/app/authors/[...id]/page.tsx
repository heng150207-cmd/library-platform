import {
  notFound,
} from "next/navigation";

import AuthorDetail, {
  type AuthorDetailType,
  type AuthorWorkType,
} from "@/components/authors/AuthorDetail";
//Create AuthorWorksResponse for store value
interface AuthorWorksResponse {
  entries: AuthorWorkType[];
  size?: number;
}
//create getAuther for catch Author value
async function getAuthor(
  id: string
): Promise<AuthorDetailType> {
  const response =
    await fetch(
      `https://openlibrary.org/authors/${encodeURIComponent(
        id
      )}.json`,
      {
        cache: "no-store",
      }
    );

  if (
    response.status === 404
  ) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(
      "Failed to fetch author"
    );
  }

  const data:
    AuthorDetailType =
    await response.json();

  return data;
}
//create getAutherWorks for catch AuthorWorks value
async function getAuthorWorks(
  id: string
): Promise<AuthorWorkType[]> {
  const response =
    await fetch(
      `https://openlibrary.org/authors/${encodeURIComponent(
        id
      )}/works.json?limit=20`,
      {
        cache: "no-store",
      }
    );

  if (!response.ok) {
    return [];
  }

  const data:
    AuthorWorksResponse =
    await response.json();

  return data.entries ?? [];
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{
    id: string[];
  }>;
}) {
  const { id } =
    await params;

  const authorId =
    id?.[0];

  if (!authorId) {
    notFound();
  }

  const [
    author,
    works,
  ] = await Promise.all([
    getAuthor(authorId),
    getAuthorWorks(authorId),
  ]);

  return (
    <AuthorDetail
      author={author}
      works={works}
      authorId={authorId}
    />
  );
}