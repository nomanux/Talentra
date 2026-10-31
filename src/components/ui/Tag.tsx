import type { ReactNode } from "react";

export type TagTone = "neutral" | "info" | "success" | "pending" | "error";

const TONES: Record<TagTone, string> = {
  neutral: "bg-surface text-text-secondary",
  info: "bg-info-alpha-10 text-info",
  success: "bg-success-alpha-10 text-success",
  pending: "bg-pending-pale text-pending",
  error: "bg-orange-alpha-10 text-error",
};

export default function Tag({ tone = "neutral", children }: { tone?: TagTone; children: ReactNode }) {
  return <span className={`inline-flex min-h-7 items-center rounded-md px-2 py-1 font-inter text-[14px] leading-5 font-medium whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}
