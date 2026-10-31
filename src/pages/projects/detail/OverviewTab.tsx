import ring25 from "../../../assets/projects/progress-ring-25.svg";
import ring0 from "../../../assets/projects/progress-ring-0.svg";
import budgetTrack from "../../../assets/projects/donut-budget-track.svg";
import budgetFill from "../../../assets/projects/donut-budget-fill.svg";
import usersTop from "../../../assets/projects/donut-users-top.svg";
import usersBottom from "../../../assets/projects/donut-users-bottom.svg";
import mailLine from "../../../assets/icons/mail-line.svg";
import sparkling from "../../../assets/icons/sparkling.svg";
import donutChart from "../../../assets/icons/donut-chart-fill.svg";
import pieChart from "../../../assets/icons/pie-chart-fill.svg";
import barChart from "../../../assets/icons/bar-chart-fill.svg";

const widget = "rounded-xl bg-card shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]";

const MILESTONES = [
  { title: "Pre Project Planning", status: "In Progress", badge: "bg-[#fff0c5] text-[#a67a00]", ring: ring25, label: null },
  { title: "Design Research", status: "Upcoming", badge: "bg-[#ffedee] text-[#f13b40]", ring: ring0, label: "0%" },
  { title: "Design Implementation", status: "Upcoming", badge: "bg-[#ffedee] text-[#f13b40]", ring: ring0, label: "0%" },
];

const TASKS = [
  { label: "Total Tasks", value: 34, color: "text-text-primary" },
  { label: "Completed Tasks", value: 24, color: "text-success" },
  { label: "Overdue Tasks", value: 12, color: "text-primary" },
  { label: "Pending Tasks", value: 12, color: "text-[#af882e]" },
];

const TIMELINE = [
  { title: "Status Update - 23 Nov", who: "Roxi Zeeman", dot: "bg-[#f0c126]" },
  { title: "Status Update - 23 Nov", who: "Sophie Williams", dot: "bg-[#f13b40]" },
];

const INSIGHTS = [
  {
    icon: donutChart,
    title: "Assigned Users",
    color: "text-[#9a3412]",
    body: "Monthly profit dropped from $65,000 to 57,500 (12% decrease). Major factor increased software subscriptions and travel expenses.",
  },
  {
    icon: pieChart,
    title: "Budget Utlization insight",
    color: "text-[#1e40af]",
    body: "Software expenses reached $23,537 this month, a 25% Increase. Consider reviewing subscriptions and consolidating tools.",
  },
  {
    icon: barChart,
    title: "Task Summary",
    color: "text-[#166534]",
    body: "Software expenses reached $23,537 this month, a 25% Increase. Consider reviewing subscriptions and consolidating tools.",
  },
];

function DonutWidget({ title, value, amount, children }: { title: string; value: string; amount: string; children: React.ReactNode }) {
  return (
    <div className={`relative h-[350px] ${widget}`}>
      <h3 className="absolute top-5 left-4 text-h4">{title}</h3>
      <div className="absolute top-[89px] left-1/2 size-[144px] -translate-x-1/2">
        {children}
        <span className="absolute inset-0 flex items-center justify-center text-h2 font-semibold">{value}</span>
      </div>
      <div className="absolute top-[254px] left-1/2 flex w-[151px] -translate-x-1/2 flex-col gap-3 text-center">
        <p className="text-h2">{amount}</p>
        <p className="text-body2 text-text-secondary">+23.0% from last month</p>
      </div>
    </div>
  );
}

export default function OverviewTab() {
  return (
    <div className="flex flex-col gap-[14px]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        <div className={`h-[350px] p-4 ${widget}`}>
          <h3 className="py-1 text-h4">Milestone &amp; Phases</h3>
          <div className="mt-3 flex flex-col gap-2">
            {MILESTONES.map((m) => (
              <div key={m.title} className="flex h-[84px] items-center gap-3 rounded-xl border border-stroke-primary px-4">
                <div className="flex flex-1 flex-col items-start gap-2">
                  <p className="text-body1">{m.title}</p>
                  <span className={`rounded-md px-1 py-[2px] font-inter text-[12px] font-medium ${m.badge}`}>{m.status}</span>
                </div>
                <div className="relative size-[60px]">
                  <img src={m.ring} alt="" />
                  {m.label && (
                    <span className="absolute inset-0 flex items-center justify-center font-inter text-[14px] font-semibold tracking-[0.28px] text-[#0a0a0a]">
                      {m.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <DonutWidget title="Budget Utilization" value="65%" amount="$45,908.098">
          <img src={budgetTrack} alt="" className="absolute top-0 left-0" />
          <img src={budgetFill} alt="" className="absolute top-[98.1px] left-[12.4px]" />
        </DonutWidget>
        <DonutWidget title="Assigned Users" value="50%" amount="$2,908.00">
          <img src={usersTop} alt="" className="absolute top-0 left-0" />
          <img src={usersBottom} alt="" className="absolute top-[72px] left-0" />
        </DonutWidget>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className={`flex flex-col gap-4 p-4 ${widget}`}>
          <h3 className="py-1 text-h4">Task Summary</h3>
          {TASKS.map((t) => (
            <div key={t.label} className="flex items-center justify-between">
              <span className={`text-h4 ${t.color}`}>{t.label}</span>
              <span className="text-h5 font-semibold">{t.value}</span>
            </div>
          ))}
        </div>
        <div className={`flex flex-col gap-[15px] px-4 py-[15px] ${widget}`}>
          <h3 className="flex h-8 items-center text-h4">Project Timeline</h3>
          <div className="flex flex-col gap-2">
            {TIMELINE.map((e) => (
              <div key={e.who} className="flex gap-[10px] rounded-xl border border-stroke-primary px-4 py-[14px]">
                <span className={`mt-[6px] size-[9px] shrink-0 rounded-full ${e.dot}`} />
                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-h4">{e.title}</p>
                    <p className="font-inter text-[14px] leading-5 tracking-[-0.084px] text-text-secondary">{e.who}</p>
                  </div>
                  <p className="flex items-center gap-1 font-inter text-[12px] leading-4 text-[#99a0ae]">
                    <img src={mailLine} alt="" />
                    10 minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="flex items-center gap-2 py-1 text-h4">
          <img src={sparkling} alt="" />
          AI Smart Insights
        </h3>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {INSIGHTS.map((i) => (
            <div key={i.title} className="flex flex-col gap-4 rounded-xl bg-card p-5">
              <p className={`flex items-center gap-[10px] text-body1 ${i.color}`}>
                <img src={i.icon} alt="" />
                {i.title}
              </p>
              <p className={`font-inter text-[14px] leading-5 tracking-[-0.14px] ${i.color}`}>{i.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
