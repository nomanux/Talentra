import hourLine from "../../assets/calendar/hour-line.svg";
import nowLine from "../../assets/calendar/now-line.svg";
import {
  CURRENT_HOUR,
  DAY_EVENTS,
  HOURS,
  MONTH_CELLS,
  WEEKDAYS,
  type DayEvent,
  type DayEventTone,
  type MonthTone,
} from "./data";

const DAY_TONES: Record<DayEventTone, string> = {
  blue: "bg-[rgba(51,92,255,0.2)] border-info",
  green: "bg-[rgba(31,193,107,0.2)] border-[#bbf7d0]",
  orange: "bg-[rgba(255,105,46,0.2)] border-[rgba(255,105,46,0.2)]",
};

const DAY_SIZES = { sm: "px-[6px] py-1", md: "px-3 py-2", lg: "p-3" };

export function DayView({ date, onEventClick }: { date: string; onEventClick: (e: DayEvent) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stroke-primary">
    <div className="relative h-[1027px] min-w-[1082px] overflow-hidden">
      <div className="flex items-center border-b border-stroke-primary bg-surface px-4 py-3 text-body1">
        <span className="text-text-secondary">GMT-07</span>
        <span className="ml-[352px] text-primary">{date}</span>
      </div>

      <div className="absolute top-[58px] left-[15px] flex w-[1090px] flex-col gap-5">
        {HOURS.map((h) => (
          <div key={h} className="flex h-5 items-center gap-3">
            <span className={`text-right text-body1 ${h === CURRENT_HOUR ? "text-text-primary" : "text-text-secondary"}`}>{h}</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <img src={hourLine} alt="" />
            </div>
          </div>
        ))}
      </div>

      <img src={nowLine} alt="" className="pointer-events-none absolute top-[465.8px] left-[52.3px]" />

      {DAY_EVENTS.map((e) => (
        <button
          key={`${e.title}-${e.top}-${e.left}`}
          type="button"
          onClick={() => onEventClick(e)}
          className={`absolute flex items-center gap-2 overflow-hidden rounded border-l text-body1 whitespace-nowrap hover:brightness-95 ${DAY_TONES[e.tone]} ${DAY_SIZES[e.size ?? "lg"]}`}
          style={{ top: e.top, left: e.left }}
        >
          <span>{e.title}</span>
          <span>{e.time}</span>
        </button>
      ))}
    </div>
    </div>
  );
}

const MONTH_TONES: Record<MonthTone, string> = {
  yellow: "bg-[rgba(255,200,76,0.2)] border-[#af882e]",
  blue: "bg-info-alpha-10 border-info",
  orange: "bg-[rgba(255,105,46,0.2)] border-primary",
  pink: "bg-[rgba(255,105,46,0.2)] border-[#db2777]",
  green: "bg-[rgba(31,193,107,0.2)] border-success",
};

export function MonthView({ onEventClick }: { onEventClick: (title: string) => void }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-stroke-primary">
      <div className="min-w-[840px]">
      <div className="grid grid-cols-7 border-b-[0.909px] border-stroke-primary">
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`flex h-10 items-center justify-center text-body1 ${i ? "border-l-[0.909px] border-stroke-primary" : ""}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {MONTH_CELLS.map((cell, i) => (
          <div
            key={i}
            className={`relative h-[162px] overflow-hidden border-stroke-primary bg-card ${i % 7 ? "border-l-[0.909px]" : ""} ${
              i < MONTH_CELLS.length - 7 ? "border-b-[0.909px]" : ""
            }`}
          >
            {cell.today ? (
              <span className="absolute top-px right-[6px] flex h-[22px] min-w-[23px] items-center justify-center rounded-full bg-icon-primary px-[6px] text-body2 text-white">
                {cell.label}
              </span>
            ) : (
              <span className={`absolute top-2 right-[6px] text-body2 ${cell.muted ? "text-text-tertiary" : "text-text-primary"}`}>{cell.label}</span>
            )}
            {cell.events && cell.tone && (
              <>
                <div className="absolute top-[27px] right-[3px] left-[1.4px] flex flex-col gap-[2px]">
                  {cell.events.map((ev, j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => onEventClick(ev)}
                      className={`flex h-[25.5px] items-center overflow-hidden rounded border-l px-3 text-left text-body2 whitespace-nowrap hover:brightness-95 ${MONTH_TONES[cell.tone!]}`}
                    >
                      {ev}
                    </button>
                  ))}
                </div>
                <button type="button" className="absolute top-[114px] left-[3px] text-[11px] leading-3 font-medium tracking-[-0.11px] text-text-secondary hover:underline">
                  3 more...
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
