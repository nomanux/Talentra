import { useState } from "react";
import Card from "../../components/ui/Card";
import chevronDown from "../../assets/icons/chevron-down.svg";

const GROUPS = [
  { label: "Full-Time Employees", count: "1.382", color: "bg-violet" },
  { label: "Part-Time Employees", count: "194", color: "bg-sky" },
  { label: "Contract employees", count: "283", color: "bg-aqua" },
  { label: "Internship Employees", count: "35", color: "bg-pink" },
];

const FILTERS = ["Employment Type", "Department", "Location"];

export default function TotalEmployeeCard() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [open, setOpen] = useState(false);

  return (
    <Card className="relative flex flex-col gap-4 overflow-hidden rounded-xl pb-10 sm:gap-7 sm:pb-[47px]">
      <div className="flex h-14 items-center justify-between px-4 py-3">
        <h2 className="text-h4">Total Employee</h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-start gap-1 rounded-lg border border-stroke-primary px-[10px] py-[6px] text-body1"
          >
            {filter}
            <img src={chevronDown} alt="" />
          </button>
          {open && (
            <ul className="absolute right-0 z-10 mt-1 w-full rounded-lg border border-stroke-primary bg-card py-1 shadow-sm">
              {FILTERS.map((f) => (
                <li key={f}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilter(f);
                      setOpen(false);
                    }}
                    className="w-full px-[10px] py-[6px] text-left text-body1 hover:bg-surface"
                  >
                    {f}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 sm:gap-5">
        <p className="flex items-center gap-2">
          <span className="text-h2 sm:text-h1">1.894</span>
          <span className="text-h5 text-text-secondary">Employees</span>
        </p>
        <div className="flex gap-1">
          {GROUPS.map((g) => (
            <div key={g.label} className={`h-3 flex-1 rounded-lg sm:h-[22px] ${g.color}`} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 sm:h-[260px] sm:grid-rows-2 sm:gap-x-[10px] sm:gap-y-3">
        {GROUPS.map((g) => (
          <div key={g.label} className="flex min-w-0 flex-col justify-center gap-1 rounded-xl border border-stroke-primary p-3 sm:py-0 sm:pr-0 sm:pl-[13px]">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`h-2 w-[10px] shrink-0 rounded-full sm:w-[14px] ${g.color}`} />
              <span className="truncate text-body2 text-text-secondary sm:text-h5 sm:whitespace-nowrap">{g.label}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-[6px] sm:py-[6px]">
              <span className="text-h4 sm:text-h2">{g.count}</span>
              <span className="text-body2 text-text-secondary sm:text-h5">Employees</span>
            </div>
          </div>
        ))}
      </div>

      <p className="absolute bottom-3 left-4 text-body2 text-text-secondary sm:bottom-4">We’ve been handle 3.162 projects so far!</p>
    </Card>
  );
}
