import { useState } from "react";
import arrowLeft from "../../assets/icons/arrow-left-outline.svg";
import arrowRight from "../../assets/icons/arrow-right-outline.svg";
import markMuted from "../../assets/icons/mark-a.svg";
import markTeal from "../../assets/icons/mark-b.svg";
import markWhite from "../../assets/icons/mark-c.svg";

const DOW = ["S", "M", "T", "W", "T", "F", "S"];

export type Range = { start: Date | null; end: Date | null };

const key = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();

function MonthGrid({
  month,
  range,
  hover,
  today,
  marked,
  onPick,
  onHover,
  nav,
}: {
  month: Date;
  range: Range;
  hover: Date | null;
  today: Date;
  marked: number[];
  onPick: (d: Date) => void;
  onHover: (d: Date | null) => void;
  nav: { side: "left" | "right"; onClick: () => void };
}) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const lead = first.getDay();
  const cells = Array.from({ length: Math.ceil((lead + days) / 7) * 7 }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i - lead + 1));

  const lo = range.start ? key(range.start) : null;
  const hiDate = range.end ?? (range.start && hover && key(hover) > key(range.start) ? hover : null);
  const hi = hiDate ? key(hiDate) : null;

  return (
    <div className="flex flex-col gap-1 p-4">
      <div className="flex items-center gap-[10px] rounded-lg p-1">
        {nav.side === "left" && (
          <button type="button" aria-label="Previous month" onClick={nav.onClick} className="rounded-md border border-stroke-primary bg-card p-1 hover:bg-surface">
            <img src={arrowLeft} alt="" />
          </button>
        )}
        <p className="flex-1 text-center font-inter text-[14px] font-semibold tracking-[-0.14px]">
          {month.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </p>
        {nav.side === "right" && (
          <button type="button" aria-label="Next month" onClick={nav.onClick} className="rounded-md border border-stroke-primary bg-card p-1 hover:bg-surface">
            <img src={arrowRight} alt="" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-7">
        {DOW.map((d, i) => (
          <span key={i} className="flex size-10 items-center justify-center font-inter text-[14px] leading-5 font-medium text-text-tertiary">
            {d}
          </span>
        ))}
        {cells.map((d) => {
          const k = key(d);
          const inMonth = d.getMonth() === month.getMonth();
          if (!inMonth) return <span key={k} className="size-10" />;
          const isEdge = k === lo || k === hi;
          const inRange = lo !== null && hi !== null && k > lo && k < hi;
          const isToday = k === key(today);
          const bandLeft = hi !== null && k === hi && lo !== hi;
          const bandRight = lo !== null && hi !== null && k === lo && lo !== hi;
          return (
            <div key={k} className={`relative size-10 ${inRange ? "bg-[#f0fdfa]" : ""}`}>
              {bandLeft && <span className="absolute top-0 left-0 h-10 w-5 bg-[#f0fdfa]" />}
              {bandRight && <span className="absolute top-0 right-0 h-10 w-5 bg-[#f0fdfa]" />}
              <button
                type="button"
                onClick={() => onPick(d)}
                onMouseEnter={() => onHover(d)}
                onMouseLeave={() => onHover(null)}
                className={`relative flex size-10 items-center justify-center rounded-[10px] font-inter text-[14px] font-medium tracking-[-0.14px] ${
                  isEdge
                    ? "bg-primary text-white"
                    : isToday
                      ? "border border-primary bg-card text-primary"
                      : inRange
                        ? "text-primary"
                        : "text-text-primary hover:bg-surface"
                }`}
              >
                {d.getDate()}
                {marked.includes(k) && (
                  <img src={isEdge ? markWhite : inRange ? markTeal : markMuted} alt="" className="absolute top-[29px] left-1/2 -translate-x-1/2" />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Two-month range calendar shown for the "Custom" time-range filter. */
export default function RangePicker({
  initialMonth,
  value,
  onChange,
  today = new Date(),
  marked = [],
}: {
  initialMonth: Date;
  value: Range;
  onChange: (r: Range) => void;
  today?: Date;
  marked?: Date[];
}) {
  const [month, setMonth] = useState(new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1));
  const [hover, setHover] = useState<Date | null>(null);
  const next = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const markedKeys = marked.map(key);

  const pick = (d: Date) => {
    if (!value.start || value.end || key(d) < key(value.start)) onChange({ start: d, end: null });
    else onChange({ start: value.start, end: d });
  };

  const shared = { range: value, hover, today, marked: markedKeys, onPick: pick, onHover: setHover };
  return (
    <div className="flex max-h-[calc(100vh-120px)] flex-col overflow-auto rounded-xl bg-card sm:flex-row shadow-[0_0_0_1px_rgba(10,10,10,0.08),0_1px_1px_0_rgba(10,10,10,0.04),0_4px_4px_-2px_rgba(10,10,10,0.02),0_6px_6px_-3px_rgba(10,10,10,0.02),0_16px_32px_-12px_rgba(14,18,27,0.1)]">
      <div className="border-b border-stroke-primary sm:border-r sm:border-b-0">
        <MonthGrid month={month} nav={{ side: "left", onClick: () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1)) }} {...shared} />
      </div>
      <MonthGrid month={next} nav={{ side: "right", onClick: () => setMonth(next) }} {...shared} />
    </div>
  );
}
