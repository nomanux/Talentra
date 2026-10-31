import { useState } from "react";
import taskDivider from "../../../assets/projects/task-divider.svg";
import statusTodo from "../../../assets/projects/status-planing.svg";
import statusProgress from "../../../assets/projects/status-progress.svg";
import statusReview from "../../../assets/projects/status-review.svg";
import statusDone from "../../../assets/projects/status-completed.svg";
import dotsThree from "../../../assets/icons/dots-three.svg";
import plusIcon from "../../../assets/icons/plus-phosphor.svg";
import moreDots from "../../../assets/icons/more-vertical-dots.svg";
import checkList from "../../../assets/icons/check-list.svg";
import attachment from "../../../assets/icons/attachment.svg";
import listView from "../../../assets/icons/list-view.svg";
import gridView from "../../../assets/icons/grid-view.svg";
import timeSchedule from "../../../assets/icons/time-schedule.svg";

type Priority = "High" | "Medium" | "Low";
type Task = { id: number; title: string; priority: Priority; progress: number; checks: string };
type Column = { id: string; title: string; icon: string; total: number; tasks: Task[] };

const PRIORITY: Record<Priority, string> = {
  High: "bg-orange-alpha-10 text-primary",
  Medium: "bg-[rgba(255,200,76,0.1)] text-[#af882e]",
  Low: "bg-surface text-text-primary",
};

let nextId = 100;
const t = (title: string, priority: Priority, progress: number, checks: string): Task => ({ id: nextId++, title, priority, progress, checks });

const INITIAL: Column[] = [
  {
    id: "todo",
    title: "To Do",
    icon: statusTodo,
    total: 12,
    tasks: [
      t("Bedroom 2 measurements", "High", 50, "4/7"),
      t("Plan showroom visit for 4 June", "Medium", 15, "1/7"),
      t("Create the kitchen floorplan", "High", 7, "4/7"),
      t("Tile Shower Service", "High", 0, "0/7"),
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    icon: statusProgress,
    total: 3,
    tasks: [t("Tile Shower Service", "High", 50, "4/7"), t("Tile Shower Service", "Medium", 50, "4/7"), t("Tile Shower Service", "High", 7, "4/7"), t("Tile Shower Service", "Low", 0, "0/7")],
  },
  { id: "review", title: "In Review", icon: statusReview, total: 6, tasks: [t("Tile Shower Service", "High", 50, "4/7"), t("Tile Shower Service", "Medium", 50, "4/7")] },
  { id: "done", title: "Completed", icon: statusDone, total: 2, tasks: [t("Tile Shower Service", "High", 50, "4/7")] },
];

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="relative h-[118px] w-full shrink-0 rounded bg-card">
      <p className="absolute top-2 left-2 text-body1">{task.title}</p>
      <button type="button" aria-label="Task options" className="absolute top-[3px] right-[9px] flex size-6 items-center justify-center rounded hover:bg-surface">
        <img src={moreDots} alt="" />
      </button>
      <img src={taskDivider} alt="" className="absolute top-[31px] left-2" />
      <p className="absolute top-[39px] left-2 text-body2 text-text-secondary">Design</p>
      <span className={`absolute top-[39px] right-[10px] rounded-md px-1 py-[2px] text-body2 ${PRIORITY[task.priority]}`}>{task.priority}</span>
      <div className="absolute top-[67px] left-2 h-[3px] w-[230px] overflow-hidden rounded-[30px] bg-surface">
        <div className="h-full rounded-[30px] bg-[#53dd27]" style={{ width: `${task.progress}%` }} />
      </div>
      <p className="absolute top-[90px] left-2 text-body2">
        <span className="text-text-secondary">Due date:</span> Dec 23
      </p>
      <div className="absolute top-[85px] right-[10px] flex gap-1">
        {[
          { icon: checkList, label: task.checks },
          { icon: attachment, label: "2" },
        ].map((b) => (
          <span key={b.icon} className="flex items-center gap-1 rounded-md border border-stroke-primary bg-card px-2 py-1 text-body2 text-text-secondary">
            <img src={b.icon} alt="" />
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TasksTab() {
  const [columns, setColumns] = useState(INITIAL);
  const [dragging, setDragging] = useState<{ task: Task; from: string } | null>(null);

  const addTask = (colId: string) =>
    setColumns((cols) => cols.map((c) => (c.id === colId ? { ...c, tasks: [...c.tasks, t("New task", "Low", 0, "0/7")] } : c)));

  const drop = (colId: string) => {
    if (!dragging || dragging.from === colId) return;
    setColumns((cols) =>
      cols.map((c) =>
        c.id === dragging.from
          ? { ...c, tasks: c.tasks.filter((x) => x.id !== dragging.task.id) }
          : c.id === colId
            ? { ...c, tasks: [...c.tasks, dragging.task] }
            : c,
      ),
    );
    setDragging(null);
  };

  return (
    <div className="min-w-0 rounded-xl bg-card px-3 pt-[10px] pb-6 sm:px-4">
      <div className="flex h-10 items-center justify-between">
        <h2 className="text-h4">All Projects</h2>
        <div className="flex items-center gap-2">
          {[listView, gridView, timeSchedule].map((icon, i) => (
            <button
              key={icon}
              type="button"
              className={`flex size-10 items-center justify-center rounded-[10px] border border-stroke-primary ${i === 1 ? "bg-surface" : "bg-card hover:bg-surface"}`}
            >
              <img src={icon} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="grid auto-cols-[minmax(262px,1fr)] grid-flow-col items-start gap-4 overflow-x-auto pt-4 pb-2">
        {columns.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => drop(col.id)}
            className="flex min-h-[752px] flex-col gap-[6px] rounded-lg bg-surface p-[6px]"
          >
            <div className="flex items-center justify-between px-2 py-[6px]">
              <span className="flex items-center gap-[6px]">
                <img src={col.icon} alt="" />
                <span className="text-h5">{col.title}</span>
                <span className="rounded bg-card px-1 text-[12px] leading-5 font-medium text-[#3f5d5a]">{col.total}</span>
              </span>
              <span className="flex items-center gap-[6px]">
                <button type="button" aria-label="Column options">
                  <img src={dotsThree} alt="" />
                </button>
                <button type="button" aria-label={`Add task to ${col.title}`} onClick={() => addTask(col.id)}>
                  <img src={plusIcon} alt="" />
                </button>
              </span>
            </div>
            {col.tasks.map((task) => (
              <div key={task.id} draggable onDragStart={() => setDragging({ task, from: col.id })} className="cursor-grab active:cursor-grabbing">
                <TaskCard task={task} />
              </div>
            ))}
            {col.tasks.length < 4 && (
              <button
                type="button"
                onClick={() => addTask(col.id)}
                className="h-[118px] shrink-0 rounded border border-dashed border-stroke-primary bg-surface text-body2 text-text-tertiary hover:bg-card"
              >
                + Add Task
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
