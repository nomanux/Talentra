import { Link, NavLink, useParams } from "react-router-dom";
import arrowRight from "../../../assets/icons/arrow-right-s-line.svg";
import OverviewTab from "./OverviewTab";
import TasksTab from "./TasksTab";
import VisionTab from "./VisionTab";
import ProcurementTab from "./ProcurementTab";
import FinanceTab from "./FinanceTab";
import CommunicationTab from "./CommunicationTab";

const TABS = [
  { slug: "overview", label: "Overview", w: "w-[100px]", element: <OverviewTab /> },
  { slug: "tasks", label: "My Tasks", w: "w-[100px]", element: <TasksTab /> },
  { slug: "vision", label: "Vision", w: "w-[100px]", element: <VisionTab /> },
  { slug: "procurement", label: "Procurement", w: "w-[100px]", element: <ProcurementTab /> },
  { slug: "document", label: "Document", w: "w-[100px]" },
  { slug: "finances", label: "Finances", w: "w-[100px]", element: <FinanceTab /> },
  { slug: "communication", label: "Communication", w: "w-[112px]", element: <CommunicationTab /> },
  { slug: "contractors", label: "Contractors", w: "w-[112px]" },
  { slug: "presentation", label: "Presentation", w: "w-[112px]" },
];

export default function ProjectDetailPage() {
  const { id = "1", tab = "overview" } = useParams();
  const current = TABS.find((t) => t.slug === tab) ?? TABS[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-body2">
          <Link to="/projects" className="text-text-secondary hover:text-text-primary">
            Projects
          </Link>
          <img src={arrowRight} alt="" />
          <span>Lead Project</span>
        </nav>
        <div role="tablist" className="flex w-max max-w-full gap-1 overflow-x-auto rounded-[10px] bg-card p-1">
          {TABS.map((t) => (
            <NavLink
              key={t.slug}
              role="tab"
              to={`/projects/${id}/${t.slug}`}
              className={`shrink-0 rounded-md p-1 text-center text-body1 ${t.w} ${t.slug === current.slug ? "bg-surface text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      </div>
      {current.element ?? (
        <div className="flex h-[400px] items-center justify-center rounded-xl bg-card text-h4 text-text-secondary">{current.label} — not in the design file yet</div>
      )}
    </div>
  );
}
