import Card from "../../components/ui/Card";
import MoreButton from "../../components/ui/MoreButton";
import kpiGraphic from "../../assets/dashboard/kpi-graphic.svg";
import projectsGraphic from "../../assets/dashboard/projects-graphic.svg";
import divider from "../../assets/dashboard/divider.svg";
import refreshIcon from "../../assets/icons/refresh.svg";
import plusIcon from "../../assets/icons/plus-small.svg";

export function AverageKpiCard() {
  return (
    <Card className="flex flex-col gap-[6px] overflow-hidden">
      <div className="flex items-center justify-between px-[8.5px]">
        <h2 className="text-h4">Average KPI</h2>
        <MoreButton />
      </div>
      <div className="flex h-[188px] flex-col gap-4 px-4 py-3">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-baseline gap-1 whitespace-nowrap">
            <p>
              <span className="text-h2">9</span>
              <span className="text-h5 text-text-tertiary">/10</span>
            </p>
            <p className="text-h5 text-text-secondary">Company Employee Standard</p>
          </div>
          <p className="text-body2 text-success">Yeay! it’s an improvement 20% from last month!</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative h-[58px]">
            <img src={kpiGraphic} alt="" className="absolute -top-px left-0" />
          </div>
          <p className="text-[12px] leading-4 font-normal tracking-[-0.24px] text-text-secondary">Based on all employee data</p>
        </div>
      </div>
    </Card>
  );
}

export function UsedDevicesCard({ mobile = 78, checkedIn = 120 }: { mobile?: number; checkedIn?: number }) {
  const mobileEmployees = Math.round((checkedIn * mobile) / 100);
  const desktopEmployees = checkedIn - mobileEmployees;
  return (
    <Card className="pt-[5px] pb-[10px]">
      <div className="flex items-center justify-between pr-[5px] pl-4">
        <h2 className="text-h4">Today Used Devices</h2>
        <div className="flex items-center gap-[2px]">
          <button type="button" aria-label="Refresh" className="flex size-[42px] items-center justify-center rounded-2xl hover:bg-surface">
            <img src={refreshIcon} alt="" className="opacity-40" />
          </button>
          <MoreButton />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-4 py-3">
        <p className="whitespace-nowrap">
          <span className="text-h2">{checkedIn}</span>{" "}
          <span className="font-inter text-[14px] leading-5 text-text-tertiary">Employees</span>
        </p>
        <p className="text-h5 text-text-secondary">Checked In Today</p>
      </div>
      <div className="flex items-center">
        <div className="flex flex-1 flex-col gap-1 px-4">
          <span className="flex items-center gap-[6px]">
            <span className="size-3 rounded-[2px] bg-primary" />
            <span className="font-inter text-[14px] leading-5 text-text-tertiary">Mobile</span>
          </span>
          <p className="text-h3">{mobile}%</p>
          <p className="text-h5 text-text-secondary">{mobileEmployees} Employees</p>
        </div>
        <div className="flex flex-1 flex-col items-end gap-1 px-4">
          <span className="flex items-center gap-[6px]">
            <span className="size-3 rounded-[2px] bg-violet" />
            <span className="text-h5 text-text-secondary">Desktop</span>
          </span>
          <p className="text-h3">{100 - mobile}%</p>
          <p className="text-h5 text-text-secondary">{desktopEmployees} Employees</p>
        </div>
      </div>
      <div className="flex h-9 items-center px-4">
        <div className="h-3 rounded-l-[5px] bg-primary" style={{ width: `${mobile}%` }} />
        <div className="h-3 rounded-r-[5px] bg-violet" style={{ width: `${100 - mobile}%` }} />
      </div>
    </Card>
  );
}

function PercentBadge({ value }: { value: number }) {
  return (
    <span className="rounded-lg bg-success-alpha-20 px-2 py-[2px] font-inter text-[12px] leading-[18px] text-success">{value}%</span>
  );
}

export function EmployeeCard() {
  return (
    <Card className="flex flex-col gap-[17px] overflow-hidden px-4 pt-[5px] pb-[13px]">
      <div className="flex items-center justify-between">
        <h2 className="text-h4">Employee</h2>
        <MoreButton />
      </div>
      <div className="flex flex-col">
        <p className="text-h5 text-text-secondary">Total Employee</p>
        <div className="flex items-center justify-between">
          <p className="text-h2">1.250</p>
          <button type="button" aria-label="Add employee" className="flex size-8 items-center justify-center rounded-lg bg-violet hover:brightness-95">
            <img src={plusIcon} alt="" />
          </button>
        </div>
        <img src={divider} alt="" className="mt-4 ml-1" />
        <div className="mt-4 flex gap-6">
          {[
            { n: 850, pct: 68, label: "Male Employees" },
            { n: 400, pct: 32, label: "Female Employees" },
          ].map((g) => (
            <div key={g.label} className="flex flex-1 flex-col gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-h3">{g.n}</span>
                <PercentBadge value={g.pct} />
              </div>
              <p className="text-h5 whitespace-nowrap text-text-secondary">{g.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function ProjectsCard() {
  const projectCounts = [
    { count: 73, label: "On Progress" },
    { count: 3089, label: "Done" },
  ];
  const totalProjects = projectCounts.reduce((total, project) => total + project.count, 0);
  const formatCount = (count: number) => new Intl.NumberFormat("de-DE").format(count);
  return (
    <Card className="flex flex-col gap-[14px] overflow-hidden px-4 pt-[5px] pb-[15px]">
      <div className="flex items-center justify-between">
        <h2 className="text-h4">Projects</h2>
        <MoreButton />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-[6px]">
          {projectCounts.map((s) => (
            <div key={s.label} className="flex h-[78px] flex-1 flex-col items-center justify-center gap-[6px] rounded-xl border border-stroke-primary">
              <span className="text-h3">{formatCount(s.count)}</span>
              <span className="text-h5 text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="flex h-[100px] flex-col justify-end gap-2">
          <div className="relative h-[58px]">
            <img src={projectsGraphic} alt="" className="absolute -top-[1.5px] -left-[0.43px]" />
          </div>
          <p className="text-body2 text-text-secondary">{formatCount(totalProjects)} projects in total</p>
        </div>
      </div>
    </Card>
  );
}
