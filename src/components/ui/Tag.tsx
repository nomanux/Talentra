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
  return <span className={`inline-flex items-center rounded px-[6px] py-[2px] text-h5 whitespace-nowrap ${TONES[tone]}`}>{children}</span>;
}
