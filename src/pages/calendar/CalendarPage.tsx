import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import calendarTodo from "../../assets/icons/calendar-todo.svg";
import arrowDown from "../../assets/icons/arrow-down-fill.svg";
import linkIcon from "../../assets/icons/link.svg";
import filterIcon from "../../assets/icons/filter.svg";
import addOutline from "../../assets/icons/add-outline.svg";
import { DayView, MonthView } from "./CalendarViews";
import { AddScheduleModal, EventDetailsModal } from "./ScheduleModals";

type View = "day" | "week";

const fmt = (d: Date) =>
  `${d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} (${d.toLocaleDateString("en-US", { weekday: "long" })})`;

export default function CalendarPage() {
  const [params] = useSearchParams();
  const [view, setView] = useState<View>(params.get("view") === "week" ? "week" : "day");
  const [viewMenu, setViewMenu] = useState(false);
  const [date, setDate] = useState(new Date(2025, 0, 2));
  const [addOpen, setAddOpen] = useState(params.has("add"));
  const [detail, setDetail] = useState<string | null>(null);

  const shiftDate = (dir: number) =>
    setDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + dir * (view === "day" ? 1 : 7)));

  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-xl bg-card px-3 pt-4 pb-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <h2 className="text-h3">Calendar</h2>
          <div className="flex items-center gap-2">
            <Button variant="outlinePrimary" onClick={() => setDate(new Date(2025, 0, 2))}>
              <span>{view === "day" ? "Today" : "Weekly"}</span>
            </Button>
            <div className="inline-flex items-center gap-[2px] rounded-lg border border-stroke-primary px-[10px] py-2 text-body1">
              <button type="button" aria-label="Previous" onClick={() => shiftDate(-1)}>
                <img src={arrowLeft} alt="" />
              </button>
              <span className="px-1">{fmt(date)}</span>
              <button type="button" aria-label="Next" onClick={() => shiftDate(1)}>
                <img src={arrowRight} alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button iconOnly aria-label="To-do">
            <img src={calendarTodo} alt="" />
          </Button>
          <div className="relative">
            <Button className="font-inter" onClick={() => setViewMenu((o) => !o)}>
              <span>{view === "day" ? "Day view" : "Week view"}</span>
              <img src={arrowDown} alt="" />
            </Button>
            {viewMenu && (
              <ul className="absolute right-0 z-10 mt-1 w-full rounded-lg border border-stroke-primary bg-card py-1 shadow-sm">
                {(["day", "week"] as const).map((v) => (
                  <li key={v}>
                    <button
                      type="button"
                      onClick={() => {
                        setView(v);
                        setViewMenu(false);
                      }}
                      className="w-full px-3 py-[6px] text-left font-inter text-[14px] font-medium hover:bg-surface"
                    >
                      {v === "day" ? "Day view" : "Week view"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Button iconOnly aria-label="Copy link">
            <img src={linkIcon} alt="" />
          </Button>
          <Button className="font-inter">
            <img src={filterIcon} alt="" />
            <span>Filter</span>
          </Button>
          <Button variant="primary" onClick={() => setAddOpen(true)}>
            <img src={addOutline} alt="" />
            <span>Add Schedule</span>
          </Button>
        </div>
      </div>

      {view === "day" ? <DayView date={fmt(date)} onEventClick={(e) => setDetail(e.title)} /> : <MonthView onEventClick={setDetail} />}

      <AddScheduleModal open={addOpen} initialTab={params.get("add")} onClose={() => setAddOpen(false)} />
      <EventDetailsModal title={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
