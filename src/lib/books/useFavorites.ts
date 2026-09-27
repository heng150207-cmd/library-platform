"use client";
import { useCallback, useEffect, useState } from "react";

const KEY = "books:favorites";

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    } catch {}
  }, []);
  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);
  return { has: (id: string) => ids.includes(id), toggle };
}
