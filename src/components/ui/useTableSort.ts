import { useState } from "react";

type SortState = { key: string; direction: "asc" | "desc" } | null;

function compareValues(left: unknown, right: unknown) {
  if (typeof left === "number" && typeof right === "number") return left - right;

  const a = String(left ?? "").trim();
  const b = String(right ?? "").trim();
  const datePattern = /\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}|\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i;
  if (datePattern.test(a) && datePattern.test(b)) {
    const dateA = Date.parse(a);
    const dateB = Date.parse(b);
    if (Number.isFinite(dateA) && Number.isFinite(dateB)) return dateA - dateB;
  }

  const numeric = (value: string) => {
    const normalized = value.replace(/[,$£€\s]/g, "");
    return normalized !== "" && /^-?\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : null;
  };
  const numberA = numeric(a);
  const numberB = numeric(b);
  if (numberA !== null && numberB !== null) return numberA - numberB;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export default function useTableSort<T>() {
  const [sort, setSort] = useState<SortState>(null);

  const toggleSort = (key: string) => {
    setSort((current) => current?.key === key
      ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
      : { key, direction: "asc" });
  };

  const sortRows = (rows: T[]) => {
    if (!sort) return rows;
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort((left, right) => direction * compareValues(
      (left as unknown as Record<string, unknown>)[sort.key],
      (right as unknown as Record<string, unknown>)[sort.key],
    ));
  };

  return { sort, toggleSort, sortRows };
}
