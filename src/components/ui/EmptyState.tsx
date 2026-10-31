import type { ReactNode } from "react";

/** Centered empty state: icon in a double ring, title, helper copy and a CTA. */
export default function EmptyState({ icon, title, lines, action }: { icon: string; title: string; lines: string[]; action?: ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-[390px] flex-col items-center gap-6">
        <div className="rounded-full bg-orange-alpha-10 p-4">
          <div className="flex items-center justify-center rounded-full bg-card p-4 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]">
            <span className="flex size-[19px] items-center justify-center">
              <img src={icon} alt="" />
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-h2">{title}</p>
            <div className="w-full max-w-[362px] text-body1 text-text-secondary">
              {lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
          </div>
          {action}
        </div>
      </div>
    </div>
  );
}
