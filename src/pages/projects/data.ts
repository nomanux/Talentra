import statusPlaning from "../../assets/projects/status-planing.svg";
import statusProgress from "../../assets/projects/status-progress.svg";
import statusHold from "../../assets/projects/status-hold.svg";
import statusCompleted from "../../assets/projects/status-completed.svg";

export type ProjectStatus = "Planing" | "In Progress" | "On Hold" | "Completed";

export type Project = {
  id: number;
  name: string;
  client: string;
  start: string;
  due: string;
  hours: string;
  progress: number;
  status: ProjectStatus;
};

export const STATUS_META: Record<ProjectStatus, { icon: string; badge: string }> = {
  Planing: { icon: statusPlaning, badge: "bg-[#f3e8ff] text-[#8740ba]" },
  "In Progress": { icon: statusProgress, badge: "bg-[#fff0c5] text-[#a67a00]" },
  "On Hold": { icon: statusHold, badge: "bg-[#ffedee] text-[#f13b40]" },
  Completed: { icon: statusCompleted, badge: "bg-[#e0faec] text-primary" },
};

export const STATUSES: ProjectStatus[] = ["Planing", "In Progress", "On Hold", "Completed"];

/** Column totals shown in the kanban headers (includes projects not rendered as cards). */
export const STATUS_TOTALS: Record<ProjectStatus, number> = { Planing: 12, "In Progress": 3, "On Hold": 6, Completed: 2 };

const base = { name: "Coastal Beach House Interior", client: "Jordan Smith", start: "3/3/2024", due: "9/3/2024", hours: "38/390" };

export const PROJECTS: Project[] = [
  { id: 1, ...base, progress: 35, status: "Planing" },
  { id: 2, ...base, progress: 10, status: "Planing" },
  { id: 3, ...base, progress: 35, status: "Planing" },
  { id: 4, ...base, progress: 35, status: "In Progress" },
  { id: 5, ...base, progress: 35, status: "On Hold" },
  { id: 6, ...base, progress: 10, status: "On Hold" },
  { id: 7, ...base, progress: 35, status: "On Hold" },
  { id: 8, ...base, progress: 35, status: "Completed" },
  { id: 9, ...base, progress: 35, status: "Completed" },
];
