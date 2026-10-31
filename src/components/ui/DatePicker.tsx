import { useMemo, useState } from "react";
import navLeft from "../../assets/icons/nav-left.svg";
import navRight from "../../assets/icons/nav-right.svg";
import markedDot from "../../assets/icons/marked-dot.svg";

const DOW = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

type DatePickerProps = {
  value: Date;
  onChange: (d: Date) => void;
  /** Dates that get the small dot marker. */
  marked?: Date[];
};

const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** "Date & Range Picker" dialog content: Monday-first month grid with 40px cells. */
export default function DatePicker({ value, onChange, marked = [] }: DatePickerProps) {
  const [month, setMonth] = useState(new Date(value.getFullYear(), value.getMonth(), 1));

  const cells = useMemo(() => {
    const offset = (month.getDay() + 6) % 7;
    const start = new Date(month.getFullYear(), month.getMonth(), 1 - offset);
    const total = Math.ceil((offset + new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()) / 7) * 7;
    return Array.from({ length: total }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }, [month]);

  const shift = (n: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1));

  return (
    <div className="rounded-xl border border-stroke-primary bg-card p-1 shadow-[0_4px_104px_0_rgba(199,199,199,0.55)]">
      <div className="flex w-[368px] max-w-[calc(100vw-40px)] flex-col gap-2 overflow-hidden rounded-[9px] border border-[#efefef] p-5 shadow-[0_16px_32px_-12px_rgba(14,18,27,0.1)]">
        <div className="flex items-center gap-[6px] rounded-lg bg-[#f8f8f8] p-[6px]">
          <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className="rounded-md bg-card p-[2px] shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]">
            <img src={navLeft} alt="" />
          </button>
          <p className="flex-1 text-center font-inter text-[14px] leading-5 font-medium text-text-secondary">
            {month.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </p>
          <button type="button" aria-label="Next month" onClick={() => shift(1)} className="rounded-md bg-card p-[2px] shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]">
            <img src={navRight} alt="" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {DOW.map((d) => (
            <span key={d} className="py-[10px] text-center font-inter text-[14px] leading-5 font-medium text-text-secondary">
              {d}
            </span>
          ))}
          {cells.map((d) => {
            const inMonth = d.getMonth() === month.getMonth();
            const selected = sameDay(d, value);
            const isMarked = marked.some((m) => sameDay(m, d));
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => onChange(d)}
                className={`relative rounded-lg py-[10px] text-center font-inter text-[14px] leading-5 font-medium ${
                  selected
                    ? "bg-primary text-white"
                    : inMonth
                      ? "text-text-secondary hover:bg-[#f8f8f8] hover:text-text-primary"
                      : "text-text-disabled"
                }`}
              >
                {d.getDate()}
                {isMarked && <img src={markedDot} alt="" className="absolute bottom-[6px] left-1/2 -translate-x-1/2" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
