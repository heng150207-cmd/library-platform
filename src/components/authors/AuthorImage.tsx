"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface AuthorImageProps {
  authorId: string;
  name: string;
  className?: string;
  priority?: boolean;
}

export default function AuthorImage({
  authorId,
  name,
  className = "",
  priority = false,
}: AuthorImageProps) {
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    setImageError(false);
  }, [authorId]);

  const imageUrl = `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg?default=false`;

  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  if (imageError) {
    return (
      <div
        className={`w-full h-full bg-muted flex items-center justify-center text-muted-foreground ${className}`}
      >
        {initials ? (
          <span className="text-2xl font-bold">{initials}</span>
        ) : (
          <User className="w-8 h-8" />
        )}
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onError={() => setImageError(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
