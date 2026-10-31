import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Menu from "../../components/ui/Menu";
import EmptyState from "../../components/ui/EmptyState";
import Tag from "../../components/ui/Tag";
import { RowActions, Table, Td, Th, Tr } from "../../components/ui/Table";
import { MEMBERS } from "../teams/TeamsPage";
import searchIcon from "../../assets/icons/search-secondary.svg";
import pdfIcon from "../../assets/icons/pdf-b.svg";
import addOutline from "../../assets/icons/add-outline.svg";
import listView from "../../assets/icons/list-view.svg";
import gridView from "../../assets/icons/grid-view.svg";
import emailIcon from "../../assets/icons/email.svg";
import callIcon from "../../assets/icons/call.svg";
import ring from "../../assets/employees/avatar-ring.svg";
import avatarBg from "../../assets/employees/avatar-bg.svg";
import timerIcon from "../../assets/icons/timer-01-empty.svg";

const photos = import.meta.glob<string>("../../assets/employees/emp-*.png", { eager: true, import: "default" });
const photo = (n: number) => photos[`../../assets/employees/emp-${n}.png`];

type Crop = { h: string; l: string; t: string; w: string };
type Card = { name: string; role: string; dept: string; hired: string; email: string; phone: string; crop: Crop };

const c = (h: string, l: string, t: string, w: string): Crop => ({ h, l, t, w });

/** Cut-out portraits are positioned inside a 50px circle exactly as in the Figma grid. */
export const CARDS: Card[] = [
  { name: "Tim David", role: "Project Management", dept: "Design Team", hired: "04 Feb,2024", email: "timdavid@gmail.com", phone: "+3 (647) 748-764", crop: c("160.18%", "-68.75%", "5.58%", "237.5%") },
  { name: "David Miller", role: "Project Management", dept: "Marketing", hired: "03 Mar,2024", email: "davidmiller@gmail.com", phone: "+1 (324) 547-435", crop: c("175.31%", "-85.16%", "5.94%", "267.19%") },
  { name: "Matt Henry", role: "UI Desiger", dept: "Design Team", hired: "12 Jan,2024", email: "matthenry@gmail.com", phone: "+5 (435) 657-324", crop: c("156.25%", "-67.19%", "0%", "234.38%") },
  { name: "Shane Watson", role: "Digital Marketing", dept: "Product Designer", hired: "07 Jun,2024", email: "shanewatson@gmail.com", phone: "+2 (657) 435-324", crop: c("146.87%", "-61.54%", "6.25%", "219.95%") },
  { name: "Shun March", role: "UI Desiger", dept: "Design Team", hired: "20 Jun,2024", email: "shunmarch@gmail.com", phone: "+9 (147) 648-264", crop: c("140.62%", "-50.78%", "3.12%", "210.94%") },
  { name: "Alex Helas", role: "Digital Marketing", dept: "Design Team", hired: "22 Jul,2024", email: "alexhelas@gmail.com", phone: "+1 (947) 248-464", crop: c("208%", "-102%", "-2%", "312%") },
  { name: "Harder Joss", role: "UI/UX Designer", dept: "Design Team", hired: "23 Oct, 2024", email: "harderjoss@gmail.com", phone: "+7 (147) 048-564", crop: c("167.34%", "-2%", "6.53%", "112%") },
  { name: "Machel March", role: "Project Management", dept: "Design Team", hired: "10 Feb,2024", email: "machelmarch@gmail.com", phone: "+3 (647) 748-764", crop: c("150%", "-62.5%", "0%", "225%") },
  { name: "David Warner", role: "Back End Developer", dept: "Design Team", hired: "23 Apr,2024", email: "davidwarner@gmail.com", phone: "+1 (149) 248-164", crop: c("125.82%", "-43.75%", "11.68%", "187.5%") },
  { name: "David Malan", role: "UI/UX Designer", dept: "Design Team", hired: "10 May,2024", email: "david malan@gmail.com", phone: "+3 (647) 748-764", crop: c("116.28%", "-39.06%", "14.97%", "178.12%") },
  { name: "Azam Khan", role: "Back End Developer", dept: "Design Team", hired: "01 Nov,2024", email: "azamkhan@gmail.com", phone: "+2 (347) 048-764", crop: c("104.27%", "-29.56%", "5.11%", "159.11%") },
  { name: "Shadab Khan", role: "Digital Marketing", dept: "Marketing", hired: "24 Dec,2024", email: "shadabkhan@gmail.com", phone: "+0 (247) 448-064", crop: c("150%", "-62.5%", "0%", "225%") },
];

/** The design repeats the second row of cards at the bottom of the grid. */
const GRID = [...CARDS, ...CARDS.slice(4, 8)].map((card, i) => ({ ...card, id: i, photo: photo((i < 12 ? i : i - 12 + 4) + 1) }));

export function EmployeeAvatar({ src, crop }: { src: string; crop: Crop }) {
  return (
    <div className="relative size-[58px] shrink-0">
      <img src={ring} alt="" className="absolute inset-0" />
      <div className="absolute top-1 left-1 size-[50px] overflow-hidden rounded-full">
        <img src={avatarBg} alt="" className="absolute inset-0" />
        <img src={src} alt="" className="absolute max-w-none" style={{ height: crop.h, left: crop.l, top: crop.t, width: crop.w }} />
      </div>
    </div>
  );
}

const OFFICES = ["All office", "UI Lab Studio", "New York", "London"].map((label) => ({ label }));
const TITLES = ["All job titles", "Project Management", "UI Desiger", "Digital Marketing", "Back End Developer"].map((label) => ({ label }));
const STATUSES = ["All status", "Active", "Suspended", "Pending", "Draft"].map((label) => ({ label }));

export default function EmployeesPage() {
  const [params, setParams] = useSearchParams();
  const view = params.get("view") === "grid" ? "grid" : "list";
  const empty = params.get("state") === "empty";
  const [query, setQuery] = useState("");
  const [office, setOffice] = useState("All office");
  const [title, setTitle] = useState("All job titles");
  const [status, setStatus] = useState("All status");
  const [rows, setRows] = useState(empty ? [] : MEMBERS);

  const visibleRows = useMemo(
    () => rows.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()) && (status === "All status" || m.status === status)),
    [rows, query, status],
  );
  const visibleCards = useMemo(
    () => GRID.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) && (title === "All job titles" || c.role === title)),
    [query, title],
  );

  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex shrink-0 flex-col gap-1 whitespace-nowrap">
        <h2 className="text-h4">Employee</h2>
        <p className="text-body1 text-text-secondary">Manage your employee</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex w-full items-center sm:w-[282px] gap-[10px] rounded-lg border border-stroke-primary px-[14px] py-2">
          <img src={searchIcon} alt="" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className="min-w-0 flex-1 bg-transparent font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] outline-none placeholder:text-text-secondary"
          />
        </label>
        <Menu label={office} items={OFFICES} value={office} onSelect={setOffice} />
        <Menu label={title} items={TITLES} value={title} onSelect={setTitle} />
        <Menu label={status} items={STATUSES} value={status} onSelect={setStatus} />
        <div className="flex overflow-hidden rounded-lg border border-stroke-primary">
          {[
            { v: "list", icon: listView },
            { v: "grid", icon: gridView },
          ].map((b) => (
            <button
              key={b.v}
              type="button"
              aria-label={`${b.v} view`}
              aria-pressed={view === b.v}
              onClick={() => setParams(b.v === "list" ? {} : { view: b.v })}
              className={`flex size-[34px] items-center justify-center ${view === b.v ? "bg-surface" : "bg-card hover:bg-surface"}`}
            >
              <img src={b.icon} alt="" />
            </button>
          ))}
        </div>
        <Button className="font-inter">
          <img src={pdfIcon} alt="" />
          <span>Export</span>
        </Button>
        <Button variant="primary">
          <img src={addOutline} alt="" />
          <span>Add New</span>
        </Button>
      </div>
    </div>
  );

  if (view === "grid") {
    return (
      <div className="flex flex-col gap-4">
        <div className="px-1 pt-5 sm:px-5">{header}</div>
        <div className="grid grid-cols-1 gap-x-[13px] gap-y-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visibleCards.map((card) => (
            <Link key={card.id} to={`/employees/${card.id}`} className="rounded-xl bg-card p-5 transition-shadow hover:shadow-[0_6px_20px_rgba(14,18,27,0.06)]">
              <div className="flex flex-col gap-[18px]">
                <div className="flex items-center gap-[10px]">
                  <EmployeeAvatar src={card.photo} crop={card.crop} />
                  <div className="flex flex-col gap-1">
                    <p className="text-h5">{card.name}</p>
                    <p className="font-inter text-[12px] leading-[18px] tracking-[0.2px] text-text-secondary">{card.role}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[14px] rounded-lg border border-stroke-primary p-[10px]">
                  <div className="flex gap-5 text-body2">
                    <div className="flex w-[107px] flex-col gap-1">
                      <span className="text-text-secondary">Department</span>
                      <span>{card.dept}</span>
                    </div>
                    <div className="flex w-[84px] flex-col gap-1">
                      <span className="text-text-secondary">Hired Date</span>
                      <span>{card.hired}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px] text-body1">
                    <span className="flex items-center gap-[6px]">
                      <img src={emailIcon} alt="" />
                      {card.email}
                    </span>
                    <span className="flex items-center gap-[6px]">
                      <span className="flex size-5 items-center justify-center">
                        <img src={callIcon} alt="" />
                      </span>
                      {card.phone}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[950px] flex-col rounded-xl bg-card">
      <div className="px-4 pt-5 sm:px-5">{header}</div>
      {rows.length === 0 ? (
        <EmptyState
          icon={timerIcon}
          title="No employee Yet"
          lines={["No employee Add your first team and it will appear here.", "You can also use other hire flow functions.", "Create new emplyee"]}
          action={
            <Button variant="primary" onClick={() => setRows(MEMBERS)}>
              <img src={addOutline} alt="" />
              <span>Add New</span>
            </Button>
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th className="w-[204px]">Employee Name</Th>
              <Th className="w-[278px]">Email</Th>
              <Th className="w-[118px]">Date</Th>
              <Th className="w-[107px]">Time</Th>
              <Th className="w-[165px]">Project</Th>
              <Th className="w-[157px]">Status</Th>
              <Th className="w-[63px]">Action</Th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((m) => (
              <Tr key={m.id}>
                <Td className="!py-[10px]">
                  <Link to={`/employees/${m.id}`} className="flex items-center gap-[10px] hover:text-primary">
                    <img src={m.avatar} alt="" className="size-6 rounded-full object-cover" />
                    {m.name}
                  </Link>
                </Td>
                <Td className="!py-[10px]">{m.email}</Td>
                <Td className="!py-[10px]">{m.date}</Td>
                <Td className="!py-[10px]">{m.time}</Td>
                <Td className="!py-[10px]">{m.project}</Td>
                <Td tight>
                  <Tag tone={m.status === "Active" ? "success" : m.status === "Suspended" ? "info" : "pending"}>{m.status}</Tag>
                </Td>
                <Td>
                  <RowActions label={m.name} onDelete={() => setRows((prev) => prev.filter((x) => x.id !== m.id))} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
