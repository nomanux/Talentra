import { useEffect, useRef, useState, type ReactNode } from "react";
import arrowDown from "../../assets/icons/arrow-down-fill.svg";

export type MenuItem = { label: string; icon?: string };

/** Outline dropdown button + floating "CARD 5" option list. */
export default function Menu({
  label,
  items,
  value,
  onSelect,
  children,
}: {
  label: string;
  items: MenuItem[];
  value?: string;
  onSelect: (label: string) => void;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-[2px] rounded-lg border border-stroke-primary px-[10px] py-2 whitespace-nowrap font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] hover:bg-surface"
      >
        <span className="px-1">{label}</span>
        <img src={arrowDown} alt="" />
      </button>
      {open && (
        <ul className="absolute top-full left-1/2 z-20 mt-1 flex w-[190px] -translate-x-1/2 flex-col rounded-xl bg-card p-1 shadow-[0_4px_20.4px_0_rgba(152,161,173,0.25),0_4px_140.5px_8px_rgba(178,181,194,0.25)]">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => {
                  onSelect(item.label);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-[6px] text-left text-body1 hover:bg-surface ${
                  value === item.label ? "bg-surface" : ""
                }`}
              >
                {item.icon && <img src={item.icon} alt="" />}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
