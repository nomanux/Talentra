import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";
import Tag, { type TagTone } from "../../components/ui/Tag";
import { Field, Select, TextInput } from "../../components/ui/Field";
import { RowActions, Table, Td, Th, Tr } from "../../components/ui/Table";
import EditRecordModal, { type EditField } from "../../components/ui/EditRecordModal";
import useTableSort from "../../components/ui/useTableSort";
import pdfIcon from "../../assets/icons/pdf.svg";
import addOutline from "../../assets/icons/add-outline.svg";
import searchIcon from "../../assets/icons/search-01.svg";
import filterIcon from "../../assets/icons/filter-lines.svg";
import sortIcon from "../../assets/icons/filter-mail.svg";
import arrowDown from "../../assets/icons/arrow-down-fill.svg";
import timerIcon from "../../assets/icons/timer-01-empty.svg";
import { formatDisplayDate, toDateInputValue } from "../../utils/dateFormat";

const avatarModules = import.meta.glob<string>("../../assets/avatars/team-*.png", { eager: true, import: "default" });
const avatar = (n: number) => avatarModules[`../../assets/avatars/team-${n}.png`];

type Status = "Active" | "Suspended" | "Pending" | "Draft";
type Member = { id: number; name: string; email: string; date: string; time: string; project: string; status: Status; avatar?: string };

const STATUS_TONE: Record<Status, TagTone> = { Active: "success", Suspended: "info", Pending: "pending", Draft: "neutral" };
const MEMBER_EDIT_FIELDS: EditField[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", type: "email" },
  { key: "project", label: "Project name" },
  { key: "date", label: "Date", type: "date" },
  { key: "status", label: "Status", options: ["Active", "Suspended", "Pending", "Draft"] },
];

const RAW: [string, string, string, string, string, Status, number][] = [
  ["Savannah Nguyen", "curtis.weaver@example.com", "7/11/19", "3w", "Tafinlar", "Active", 1],
  ["Albert Flores", "alma.lawson@example.com", "5/30/14", "6d", "Actisite", "Active", 2],
  ["Ronald Richards", "jessica.hanson@example.com", "6/19/14", "12m", "Elitek", "Active", 3],
  ["Jane Cooper", "michelle.rivera@example.com", "6/21/19", "5y", "Calquence", "Active", 4],
  ["Jenny Wilson", "debra.holt@example.com", "10/28/12", "36s", "Recombinate", "Suspended", 5],
  ["Kristin Watson", "bill.sanders@example.com", "3/4/16", "1m", "Coumadin", "Suspended", 6],
  ["Esther Howard", "kenzi.lawson@example.com", "8/21/15", "5y", "Opsumit", "Active", 7],
  ["Eleanor Pena", "nathan.roberts@example.com", "1/31/14", "1d", "Prezista", "Active", 8],
  ["Floyd Miles", "nevaeh.simmons@example.com", "7/18/17", "1s", "Radiogardase", "Active", 9],
  ["Ralph Edwards", "tim.jennings@example.com", "1/15/12", "12y", "Lithostat", "Pending", 10],
  ["Marvin McKinney", "jackson.graham@example.com", "12/10/13", "3w", "Maxaquin", "Pending", 11],
  ["Wade Warren", "willie.jennings@example.com", "9/18/16", "21h", "Anafranil", "Pending", 12],
  ["Annette Black", "felicia.reid@example.com", "1/28/17", "1w", "Helixate FS", "Pending", 13],
  ["Jacob Jones", "georgia.young@example.com", "9/23/16", "1y", "Altace", "Pending", 14],
  ["Leslie Alexander", "debbie.baker@example.com", "4/21/12", "5s", "Mentax", "Pending", 15],
  ["Darlene Robertson", "michael.mitc@example.com", "10/6/13", "59m", "Lipodox", "Pending", 16],
  ["Theresa Webb", "deanna.curtis@example.com", "4/4/18", "18h", "Dolobid", "Pending", 17],
  ["Courtney Henry", "sara.cruz@example.com", "5/27/15", "5m", "Trizivir", "Pending", 18],
  ["Darrell Steward", "tanya.hill@example.com", "2/11/12", "3h", "Anjeso", "Pending", 18],
  ["Bessie Cooper", "dolores.chambers@example.com", "9/4/12", "Now", "Dtic-Dome", "Draft", 18],
];

export const MEMBERS: Member[] = RAW.map(([name, email, date, time, project, status, a], id) => ({ id, name, email, date: formatDisplayDate(date), time, project, status, avatar: avatar(a) }));

const TABS = ["All", "Active", "Absent"] as const;

function Initials({ name }: { name: string }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary-dark">
      {name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)}
    </span>
  );
}

function AddMemberModal({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd: (m: Omit<Member, "id">) => void }) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    onAdd({
      name: String(f.get("name") || "New member"),
      email: String(f.get("email") || ""),
      project: String(f.get("project") || ""),
      status: f.get("status") as Status,
      date: formatDisplayDate(new Date()),
      time: "Now",
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Member"
      footer={
        <>
          <Button onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button variant="primary" type="submit" form="add-member">
            <span>Add</span>
          </Button>
        </>
      }
    >
      <form id="add-member" onSubmit={submit} className="flex flex-col gap-5 px-6 py-5">
        <Field label="Name">
          <TextInput name="name" placeholder="Alexsmiht" required />
        </Field>
        <Field label="Email">
          <TextInput name="email" type="email" placeholder="Alexsmiht" required />
        </Field>
        <Field label="Project name">
          <TextInput name="project" placeholder="Alexsmiht" />
        </Field>
        <Field label="Select status">
          <Select name="status" defaultValue="Active">
            {Object.keys(STATUS_TONE).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </Field>
      </form>
    </Modal>
  );
}

export default function TeamsPage() {
  const [params] = useSearchParams();
  const [members, setMembers] = useState<Member[]>(params.get("state") === "empty" ? [] : MEMBERS);
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const [query, setQuery] = useState("");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);
  const [adding, setAdding] = useState(params.has("add"));
  const [editing, setEditing] = useState<Member | null>(null);
  const { sort, toggleSort, sortRows } = useTableSort<Member>();

  const visible = useMemo(() => {
    let list = members.filter((m) => (tab === "All" ? true : tab === "Active" ? m.status === "Active" : m.status !== "Active"));
    if (query) list = list.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));
    if (sortAsc !== null) list = [...list].sort((a, b) => (sortAsc ? 1 : -1) * a.name.localeCompare(b.name));
    return list;
  }, [members, tab, query, sortAsc]);
  const sortedMembers = sortRows(visible);

  return (
    <div className="flex min-h-[950px] flex-col rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-5 sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4">Team Members</h2>
          <p className="text-body1 text-text-secondary">Manage your team member and their account permissions here</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="font-inter">
            <img src={pdfIcon} alt="" />
            <span>Export</span>
          </Button>
          <Button variant="primary" onClick={() => setAdding(true)}>
            <img src={addOutline} alt="" />
            <span>Add Member</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-5 sm:px-5 sm:pl-6">
        <div className="flex gap-1 rounded-lg bg-surface p-[2px]" role="tablist">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-md px-[14px] py-1 text-body1 ${tab === t ? "bg-card" : "text-text-secondary"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex w-full items-center sm:w-[282px] gap-[10px] rounded-lg border border-stroke-primary px-[14px] py-2">
            <img src={searchIcon} alt="" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="min-w-0 flex-1 font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] outline-none placeholder:text-text-primary"
            />
          </label>
          <Button className="font-inter">
            <img src={filterIcon} alt="" />
            <span>Filter</span>
          </Button>
          <Button className="font-inter" onClick={() => setSortAsc((s) => (s === null ? true : s ? false : null))}>
            <img src={sortIcon} alt="" />
            <span>Sort by{sortAsc === null ? "" : sortAsc ? " A–Z" : " Z–A"}</span>
            <img src={arrowDown} alt="" />
          </Button>
        </div>
      </div>

      {members.length === 0 ? (
        <EmptyState
          icon={timerIcon}
          title="No team member Yet"
          lines={["No team yet Add your first team and it will appear here.", "You can also use other hire flow functions.", "Create new team"]}
          action={
            <Button variant="primary" onClick={() => setAdding(true)}>
              <img src={addOutline} alt="" />
              <span>Add Member</span>
            </Button>
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th className="w-[204px]" onSort={() => toggleSort("name")} sortDirection={sort?.key === "name" ? sort.direction : null}>Member Name</Th>
              <Th className="w-[278px]" onSort={() => toggleSort("email")} sortDirection={sort?.key === "email" ? sort.direction : null}>Email</Th>
              <Th className="w-[118px]" onSort={() => toggleSort("date")} sortDirection={sort?.key === "date" ? sort.direction : null}>Date</Th>
              <Th className="w-[107px]" onSort={() => toggleSort("time")} sortDirection={sort?.key === "time" ? sort.direction : null}>Time</Th>
              <Th className="w-[165px]" onSort={() => toggleSort("project")} sortDirection={sort?.key === "project" ? sort.direction : null}>Project</Th>
              <Th className="w-[157px]" onSort={() => toggleSort("status")} sortDirection={sort?.key === "status" ? sort.direction : null}>Status</Th>
              <Th className="w-[88px]">Action</Th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((m) => (
              <Tr key={m.id}>
                <Td className="!py-[10px]">
                  <span className="flex items-center gap-[10px]">
                    {m.avatar ? <img src={m.avatar} alt="" className="size-6 rounded-full object-cover" /> : <Initials name={m.name} />}
                    {m.name}
                  </span>
                </Td>
                <Td className="!py-[10px]">{m.email}</Td>
                <Td className="!py-[10px]">{m.date}</Td>
                <Td className="!py-[10px]">{m.time}</Td>
                <Td className="!py-[10px]">{m.project}</Td>
                <Td tight>
                  <Tag tone={STATUS_TONE[m.status]}>{m.status}</Tag>
                </Td>
                <Td>
                  <RowActions
                    label={m.name}
                    onEdit={() => setEditing(m)}
                    onDelete={() => setMembers((prev) => prev.filter((x) => x.id !== m.id))}
                  />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}

      <AddMemberModal
        open={adding}
        onClose={() => setAdding(false)}
        onAdd={(m) => setMembers((prev) => [{ ...m, id: Date.now() }, ...prev])}
      />
      <EditRecordModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={`Edit ${editing?.name ?? "member"}`}
        fields={MEMBER_EDIT_FIELDS}
        values={editing ? { name: editing.name, email: editing.email, project: editing.project, date: toDateInputValue(editing.date), status: editing.status } : {}}
        onSave={(values) => {
          if (!editing) return;
          setMembers((prev) => prev.map((member) => member.id === editing.id
            ? { ...member, ...values, date: formatDisplayDate(values.date), status: values.status as Status }
            : member));
          setEditing(null);
        }}
      />
    </div>
  );
}
