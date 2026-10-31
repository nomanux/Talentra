import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import flag1 from "../../assets/flags/flag-1.png";
import flag2 from "../../assets/flags/flag-2.png";
import flag3 from "../../assets/flags/flag-3.png";
import flag4 from "../../assets/flags/flag-4.svg";
import flag5 from "../../assets/flags/flag-5.png";
import flag6 from "../../assets/flags/flag-6.png";
import flag7 from "../../assets/flags/flag-7.png";
import flag8 from "../../assets/flags/flag-8.png";
import flag9 from "../../assets/flags/flag-9.png";
import flag10 from "../../assets/flags/flag-10.png";
import bracketCircle from "../../assets/palette/bracket-circle.svg";
import rotate3d from "../../assets/palette/3d-rotate.svg";
import view3d from "../../assets/palette/3d-view.svg";
import acceleration from "../../assets/palette/acceleration.svg";
import activityCircle from "../../assets/palette/activity-circle.svg";
import activity04 from "../../assets/palette/activity-04.svg";
import addressBook from "../../assets/palette/address-book.svg";
import absolute from "../../assets/palette/absolute.svg";
import move3d from "../../assets/palette/3d-move.svg";
import indesign from "../../assets/palette/adobe-indesign.svg";
import aiBeautify from "../../assets/palette/ai-beautify.svg";
import aiBrain from "../../assets/palette/ai-brain.svg";
import userGroup from "../../assets/palette/user-group.svg";
import arrowDown01 from "../../assets/palette/arrow-down-01.svg";
import dot from "../../assets/palette/dot.svg";
import moveDownLeft from "../../assets/palette/arrow-move-down-left.svg";
import upDouble from "../../assets/palette/arrow-up-double.svg";

export const LANGUAGES = [
  { label: "Hindi", flag: flag1 },
  { label: "Portuguese", flag: flag2 },
  { label: "Spanish", flag: flag3 },
  { label: "English", flag: flag4 },
  { label: "Arabic", flag: flag5 },
  { label: "Arabic", flag: flag6 },
  { label: "Chinese", flag: flag7 },
  { label: "Hindi", flag: flag8 },
  { label: "Portuguese", flag: flag9 },
  { label: "Portuguese", flag: flag10 },
];

export const popupShadow = "shadow-[0_4px_20.4px_0_rgba(152,161,173,0.25),0_4px_140.5px_8px_rgba(178,181,194,0.25)]";

/** Closes `onClose` on Escape and on clicks outside `ref`. */
export function useDismiss(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && onClose();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return ref;
}

export function LanguageMenu({ value, onSelect }: { value: number; onSelect: (i: number) => void }) {
  return (
    <ul className={`flex w-[190px] flex-col rounded-xl bg-card p-1 ${popupShadow}`}>
      {LANGUAGES.map((l, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => onSelect(i)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-[6px] text-body1 hover:bg-surface ${value === i ? "bg-surface" : ""}`}
          >
            <img src={l.flag} alt="" className="h-[14px] w-[19px] object-cover" />
            {l.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

type PaletteItem = { icon: string; name: string; hint?: string; muted?: boolean };

const PALETTE: { section: string; items: PaletteItem[] }[] = [
  { section: "Action ", items: [{ icon: bracketCircle, name: "Switch organization" }] },
  {
    section: "Recent",
    items: [
      { icon: rotate3d, name: "Metrics", hint: "observe" },
      { icon: view3d, name: "Monir's", hint: "observe/issues" },
      { icon: acceleration, name: "Integrations", hint: "build" },
    ],
  },
  {
    section: "All pages",
    items: [
      { icon: activityCircle, name: "Composer", hint: "observe" },
      { icon: activity04, name: "Assistants", hint: "observe/issues" },
      { icon: addressBook, name: "Squads", hint: "build" },
      { icon: absolute, name: "Composer - track" },
      { icon: move3d, name: "Assistants - monitor/issues" },
      { icon: indesign, name: "Squads - develop" },
      { icon: aiBeautify, name: "Composer - track" },
      { icon: aiBrain, name: "Assistants - monitor/issues" },
      { icon: userGroup, name: "Squads", hint: "build" },
    ],
  },
];

function Key({ icon, flip }: { icon: string; flip?: boolean }) {
  return (
    <span className="flex items-center justify-center rounded border border-text-disabled bg-card p-1">
      <img src={icon} alt="" className={flip ? "-scale-y-100" : ""} />
    </span>
  );
}

/** ⌘K command palette shown over the dashboard (the "search pop up" frame). */
export function CommandPalette({ open, query, onClose }: { open: boolean; query: string; onClose: () => void }) {
  const [active, setActive] = useState(1);
  const ref = useDismiss(open, onClose);

  const sections = useMemo(
    () =>
      PALETTE.map((s) => ({ ...s, items: s.items.filter((it) => `${it.name} ${it.hint ?? ""}`.toLowerCase().includes(query.toLowerCase())) })).filter(
        (s) => s.items.length > 0,
      ),
    [query],
  );
  const flat = sections.flatMap((s) => s.items);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, flat.length - 1));
      if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
      if (e.key === "Enter") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, flat.length, onClose]);

  if (!open) return null;
  let index = -1;
  return createPortal(
    <div ref={ref} className={`fixed top-[57px] right-2 left-2 z-[61] overflow-hidden md:right-auto md:left-[max(16px,calc(50vw-323px))] md:w-[710px] md:max-w-[calc(100vw-32px)] rounded-xl bg-card ${popupShadow}`}>
        <div className="flex max-h-[min(548px,calc(100vh-140px))] flex-col gap-2 overflow-y-auto p-4">
          {sections.map((s) => (
            <div key={s.section} className="flex flex-col">
              <p className="px-3 py-1 text-body1 text-text-tertiary">{s.section}</p>
              {s.items.map((it) => {
                index += 1;
                const i = index;
                return (
                  <button
                    key={`${s.section}-${i}`}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={onClose}
                    className={`flex items-center gap-[10px] rounded-[10px] px-3 py-1 text-left text-h5 text-text-secondary ${active === i ? "bg-[#f5f7fa]" : ""}`}
                  >
                    <img src={it.icon} alt="" />
                    <span>
                      {it.name}
                      {it.hint && <span className="text-text-tertiary"> - {it.hint}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
          {sections.length === 0 && <p className="px-3 py-6 text-center text-body1 text-text-tertiary">No results for “{query}”</p>}
        </div>
        <div className="hidden h-[50px] w-full max-w-[589px] items-center gap-3 border-t sm:flex border-stroke-primary px-5 text-body1 text-text-secondary">
          <span className="flex items-center gap-2">
            <Key icon={arrowDown01} flip />
            <Key icon={arrowDown01} />
            to navigate
          </span>
          <img src={dot} alt="" />
          <span className="flex items-center gap-2">
            <Key icon={moveDownLeft} />
            to select
          </span>
          <img src={dot} alt="" />
          <span className="flex items-center gap-2">
            <Key icon={upDouble} />
            Switch organization
          </span>
        </div>
    </div>,
    document.body,
  );
}
