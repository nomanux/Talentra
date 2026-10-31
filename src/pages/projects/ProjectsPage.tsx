import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import cardDivider from "../../assets/projects/card-divider.svg";
import moreDots from "../../assets/icons/more-vertical-dots.svg";
import plus18 from "../../assets/icons/plus-18.svg";
import chevron from "../../assets/icons/arrow-down-s-line.svg";
import checkmark from "../../assets/icons/checkmark-square.svg";
import listView from "../../assets/icons/list-view.svg";
import gridView from "../../assets/icons/grid-view.svg";
import timeSchedule from "../../assets/icons/time-schedule.svg";
import selectBoxCircle from "../../assets/icons/select-box-circle.svg";
import timeFill from "../../assets/icons/time-fill.svg";
import hourglass from "../../assets/icons/hourglass-fill.svg";
import timerFlash from "../../assets/icons/timer-flash-fill.svg";
import { PROJECTS, STATUSES, STATUS_META, STATUS_TOTALS, type Project, type ProjectStatus } from "./data";

const SUMMARY = [
  { title: "Total Projects", value: "12", note: "66% Active, 25% Completed, 8% Overdue", icon: selectBoxCircle, bg: "bg-success-alpha-10" },
  { title: "Projects By Phase", value: "10", note: "Planing: 3, Design: 5, Review: 3", icon: timeFill, bg: "bg-[rgba(14,18,27,0.08)]" },
  { title: "Team Workload", value: "50 tasks", note: "40% Completed", icon: hourglass, bg: "bg-orange-alpha-10" },
  { title: "Total Budget", value: "£150,000", note: "Spent £150,000", icon: timerFlash, bg: "bg-info-alpha-10" },
];

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`rounded-md px-1 py-[2px] font-inter text-[12px] font-medium ${STATUS_META[status].badge}`}>{status}</span>;
}

function MoreButton() {
  return (
    <button type="button" aria-label="More" className="flex size-6 items-center justify-center rounded hover:bg-surface">
      <img src={moreDots} alt="" />
    </button>
  );
}

function Progress({ value, width = "w-full" }: { value: number; width?: string }) {
  return (
    <div className={`h-[3px] overflow-hidden rounded-[30px] bg-stroke-secondary ${width}`}>
      <div className="h-full rounded-[30px] bg-primary" style={{ width: `${value}%` }} />
    </div>
  );
}

function SummaryCards() {
  return (
    <section className="grid grid-cols-2 gap-2 sm:gap-[11px] xl:grid-cols-4">
      {SUMMARY.map((c) => (
        <div key={c.title} className="flex flex-col justify-between gap-3 rounded-xl bg-card p-3 sm:h-[154px] sm:p-5">
          <div className="flex flex-col gap-1 sm:gap-3">
            <p className="text-body2 text-text-secondary sm:text-body1">{c.title}</p>
            <p className="text-h4 font-semibold sm:text-h2">{c.value}</p>
          </div>
          <div className={`flex w-full max-w-[218px] items-start gap-[6px] rounded-lg py-[6px] pr-2 pl-2 sm:items-center sm:pr-3 ${c.bg}`}>
            <img src={c.icon} alt="" />
            <p className="flex-1 text-body2">{c.note}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function KanbanCard({ p }: { p: Project }) {
  return (
    <div className="relative h-[180px] w-full rounded-xl bg-card">
      <Link to={`/projects/${p.id}`} className="absolute top-2 left-2 text-body1 hover:text-primary">
        {p.name}
      </Link>
      <div className="absolute top-1 right-2">
        <MoreButton />
      </div>
      <img src={cardDivider} alt="" className="absolute top-[31px] left-2" />
      <div className="absolute top-[45px] right-[10px] left-2 flex flex-col gap-[18px]">
        <div className="grid grid-cols-[147px_1fr] gap-y-[6px] text-body2">
          <span><span className="text-text-secondary">Client:</span> {p.client}</span>
          <span><span className="text-text-secondary">Due:</span> {p.due}</span>
          <span><span className="text-text-secondary">Start:</span> {p.start}</span>
          <span><span className="text-text-secondary">Hours:</span> {p.hours}</span>
        </div>
        <div className="flex flex-col gap-[6px]">
          <Progress value={p.progress} />
          <p className="text-body2">{p.progress}% Complete</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-body2 text-text-secondary">Status:</span>
          <StatusBadge status={p.status} />
        </div>
      </div>
    </div>
  );
}

function KanbanView({ projects }: { projects: Project[] }) {
  return (
    <div className="grid auto-cols-[minmax(262px,1fr)] grid-flow-col items-start gap-4 overflow-x-auto pt-4 pb-2">
      {STATUSES.map((s) => {
        const items = projects.filter((p) => p.status === s);
        return (
          <div key={s} className="flex min-h-[860px] flex-col gap-[6px] rounded-xl bg-surface p-[6px]">
            <div className="flex items-center gap-[6px] px-2 py-[6px]">
              <img src={STATUS_META[s].icon} alt="" />
              <span className="text-body1">{s}</span>
              <span className="rounded px-1 text-[12px] leading-5 font-medium text-text-secondary">{STATUS_TOTALS[s]}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((p) => (
                <KanbanCard key={p.id} p={p} />
              ))}
              <button type="button" className="h-[42px] rounded-xl bg-card text-body1 hover:bg-card/70">
                + Add Project
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const LIST_COLS = "grid grid-cols-[38px_205px_156px_114px_124px_104px_110px_1fr_70px]";
const listCell = "flex items-center border-l border-stroke-secondary px-[10px]";

function ListGroup({ status, projects }: { status: ProjectStatus; projects: Project[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <div className="flex h-11 items-center rounded-lg bg-surface">
        <button
          type="button"
          aria-label={open ? "Collapse" : "Expand"}
          onClick={() => setOpen((o) => !o)}
          className="flex w-10 justify-center border-r border-stroke-secondary"
        >
          <img src={chevron} alt="" className={open ? "-scale-y-100" : ""} />
        </button>
        <div className="flex flex-1 items-center justify-between px-4">
          <span className="flex items-center gap-[6px]">
            <img src={STATUS_META[status].icon} alt="" />
            <span className="text-body1">{status}</span>
            <span className="rounded bg-[#dce3e3] px-1 text-[12px] leading-5 font-medium text-[#3f5d5a]">{projects.length}</span>
          </span>
          <button type="button" aria-label={`Add ${status} project`}>
            <img src={plus18} alt="" />
          </button>
        </div>
      </div>
      {open && (
        <div className="text-body1">
          <div className={`${LIST_COLS} h-12 border-b border-stroke-secondary text-text-tertiary`}>
            <span className="flex items-center justify-center">
              <img src={checkmark} alt="" />
            </span>
            {["Project Name", "Client", "due", "start", "hours", "Status", "progress", "More"].map((h) => (
              <span key={h} className={listCell}>
                {h}
              </span>
            ))}
          </div>
          {projects.map((p) => (
            <div key={p.id} className={`${LIST_COLS} h-12 border-b border-stroke-secondary text-text-secondary hover:bg-surface/60`}>
              <span className="flex items-center justify-center">
                <img src={checkmark} alt="" />
              </span>
              <Link to={`/projects/${p.id}`} className={`${listCell} hover:text-primary`}>
                {p.name}
              </Link>
              <span className={listCell}>{p.client} Khan</span>
              <span className={listCell}>{p.due}</span>
              <span className={listCell}>{p.due}</span>
              <span className={listCell}>{p.due}</span>
              <span className={listCell}>
                <StatusBadge status={p.status} />
              </span>
              <span className={`${listCell} flex-col !items-start justify-center gap-[6px]`}>
                <Progress value={p.progress} width="w-[140px]" />
                <span className="leading-4">{p.progress}% Complete</span>
              </span>
              <span className={`${listCell} justify-center`}>
                <MoreButton />
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ListView({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-[22px] overflow-x-auto rounded-xl border border-stroke-primary p-4 pl-[18px]">
      <div className="flex min-w-[1060px] flex-col gap-3">
      {STATUSES.map((s) => (
        <ListGroup key={s} status={s} projects={projects.filter((p) => p.status === s)} />
      ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [params, setParams] = useSearchParams();
  const view = params.get("view") === "list" ? "list" : "grid";
  const setView = (v: "list" | "grid") => setParams(v === "grid" ? {} : { view: v });

  return (
    <div className="flex flex-col gap-[11px]">
      <SummaryCards />
      <div className="min-w-0 rounded-xl bg-card px-3 pt-[10px] pb-6 sm:px-4">
        <div className="flex h-10 items-center justify-between">
          <h2 className="text-h4">All Projects</h2>
          <div className="flex items-center gap-2">
            {[
              { id: "list" as const, icon: listView, label: "List view" },
              { id: "grid" as const, icon: gridView, label: "Grid view" },
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                aria-label={b.label}
                aria-pressed={view === b.id}
                onClick={() => setView(b.id)}
                className={`flex size-10 items-center justify-center rounded-[10px] border border-stroke-primary ${view === b.id ? "bg-surface" : "bg-card hover:bg-surface"}`}
              >
                <img src={b.icon} alt="" />
              </button>
            ))}
            <button type="button" aria-label="Timeline" className="flex size-10 items-center justify-center rounded-[10px] border border-stroke-primary bg-card hover:bg-surface">
              <img src={timeSchedule} alt="" />
            </button>
          </div>
        </div>
        {view === "grid" ? <KanbanView projects={PROJECTS} /> : <ListView projects={PROJECTS} />}
      </div>
    </div>
  );
}
