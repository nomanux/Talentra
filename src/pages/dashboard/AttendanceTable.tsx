import { useState, type FormEvent } from "react";
import Card from "../../components/ui/Card";
import Tag, { type TagTone } from "../../components/ui/Tag";
import refreshIcon from "../../assets/icons/refresh-sm.svg";
import moreIcon from "../../assets/icons/more-horizontal.svg";
import Button from "../../components/ui/Button";
import { Field, Select, TextInput } from "../../components/ui/Field";
import { RowActions } from "../../components/ui/Table";
import useTableSort from "../../components/ui/useTableSort";

type Row = {
  id: string;
  name: string;
  department: "Marketing" | "Technology" | "Human Resource";
  status: "Attend" | "Day-Off" | "Sick";
  checkIn: string;
  checkOut: string;
};

const ROWS: Row[] = [
  { id: "54253", name: "Dianne Russell", department: "Marketing", status: "Attend", checkIn: "03:44", checkOut: "02:45" },
  { id: "144751", name: "Floyd Miles", department: "Technology", status: "Attend", checkIn: "02:03", checkOut: "00:05" },
  { id: "659827", name: "Annette Black", department: "Human Resource", status: "Attend", checkIn: "01:11", checkOut: "01:17" },
  { id: "863906", name: "Guy Hawkins", department: "Technology", status: "Attend", checkIn: "00:05", checkOut: "05:12" },
  { id: "652735", name: "Cody Fisher", department: "Technology", status: "Day-Off", checkIn: "--:--", checkOut: "--:--" },
  { id: "345248", name: "Wade Warren", department: "Technology", status: "Day-Off", checkIn: "--:--", checkOut: "--:--" },
  { id: "449812", name: "Leslie Alexander", department: "Marketing", status: "Attend", checkIn: "12:04", checkOut: "12:34" },
  { id: "793639", name: "Courtney Henry", department: "Marketing", status: "Attend", checkIn: "02:45", checkOut: "06:47" },
  { id: "858569", name: "Courtney Henry", department: "Marketing", status: "Attend", checkIn: "05:12", checkOut: "08:00" },
  { id: "459204", name: "Cameron Williamson", department: "Technology", status: "Sick", checkIn: "--:--", checkOut: "--:--" },
];

const DEPARTMENT_TONE: Record<Row["department"], TagTone> = {
  Marketing: "neutral",
  Technology: "info",
  "Human Resource": "success",
};

const STATUS_TONE: Record<Row["status"], TagTone> = {
  Attend: "success",
  "Day-Off": "info",
  Sick: "pending",
};

const TABS = ["Attendance", "Projects", "Performance", "Day-Off Request"];
const COLUMNS: { label: string; width: string; key: keyof Row | null }[] = [
  { label: "Employee ID", width: "w-[160px]", key: "id" },
  { label: "Name", width: "w-[190px]", key: "name" },
  { label: "Department", width: "w-[175px]", key: "department" },
  { label: "Status", width: "w-[157px]", key: "status" },
  { label: "Check-In Time", width: "w-[158px]", key: "checkIn" },
  { label: "Check-Out Time", width: "w-[196px]", key: "checkOut" },
  { label: "Action", width: "w-[88px]", key: null },
];

const cell = "border-r border-b border-stroke-secondary px-[10px] text-h5 text-text-secondary whitespace-nowrap";

export default function AttendanceTable() {
  const [tab, setTab] = useState(TABS[0]);
  const [rows, setRows] = useState(ROWS);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const { sort, toggleSort, sortRows } = useTableSort<Row>();
  const sortedRows = sortRows(rows);

  const saveRow = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingRow) return;
    setRows((current) => current.map((row) => row.id === editingRow.id ? editingRow : row));
    setEditingRow(null);
  };

  return (
    <Card className="overflow-hidden rounded-[14px]">
      <div className="flex items-center gap-x-4 border-b border-stroke-secondary px-4 pt-3">
        <div className="-mb-px flex min-w-0 items-center gap-1 overflow-x-auto sm:shrink-0" role="tablist">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`shrink-0 px-[14px] py-2 text-h5 whitespace-nowrap ${
                tab === t ? "border-b-[1.5px] border-text-primary text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="hidden flex-1 items-center justify-end gap-1 text-body1 whitespace-nowrap text-text-secondary sm:flex">
          <img src={refreshIcon} alt="" />
          Updated a second ago
        </div>
        <button type="button" aria-label="More options" className="pb-1">
          <img src={moreIcon} alt="" />
        </button>
      </div>

      <div className="overflow-x-auto p-4">
        <table className="w-full min-w-[1099px] border-collapse">
          <thead>
            <tr>
              {COLUMNS.map((c) => {
                const direction = c.key && sort?.key === c.key ? sort.direction : null;
                return (
                  <th
                    key={c.label}
                    aria-sort={c.key ? direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none" : undefined}
                    className={`${cell} ${c.width} py-[6px] text-left font-medium text-text-tertiary`}
                  >
                    {c.key ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(c.key!)}
                        className="flex w-full items-center justify-between gap-2 text-left transition-colors hover:text-text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        <span>{c.label}</span>
                        <span aria-hidden="true" className={`text-body2 ${direction ? "text-primary" : "text-text-tertiary/60"}`}>
                          {direction === "asc" ? "↑" : direction === "desc" ? "↓" : "↕"}
                        </span>
                      </button>
                    ) : c.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((r, i) => {
              const last = i === sortedRows.length - 1 ? "border-b-0" : "";
              return (
                <tr key={r.id} className="h-10 hover:bg-surface/60">
                  <td className={`${cell} ${last} py-2`}>{r.id}</td>
                  <td className={`${cell} ${last} py-2`}>{r.name}</td>
                  <td className={`${cell} ${last} py-[6px]`}>
                    <Tag tone={DEPARTMENT_TONE[r.department]}>{r.department}</Tag>
                  </td>
                  <td className={`${cell} ${last} py-[6px]`}>
                    <Tag tone={STATUS_TONE[r.status]}>{r.status}</Tag>
                  </td>
                  <td className={`${cell} ${last} py-2`}>{r.checkIn}</td>
                  <td className={`${cell} ${last} py-2`}>{r.checkOut}</td>
                  <td className={`${cell} ${last} py-2`}>
                    <RowActions
                      label={r.name}
                      onEdit={() => setEditingRow({ ...r })}
                      onDelete={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {editingRow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditingRow(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-edit-title"
            className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-xl"
          >
            <div className="mb-5">
              <h2 id="attendance-edit-title" className="text-h4 text-text-primary">Edit attendance</h2>
              <p className="mt-1 text-body2 text-text-tertiary">Update {editingRow.name}’s attendance details.</p>
            </div>
            <form onSubmit={saveRow} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Employee ID"><TextInput value={editingRow.id} readOnly /></Field>
                <Field label="Name"><TextInput value={editingRow.name} readOnly /></Field>
                <Field label="Department">
                  <Select
                    value={editingRow.department}
                    onChange={(event) => setEditingRow({ ...editingRow, department: event.target.value as Row["department"] })}
                  >
                    <option>Marketing</option>
                    <option>Technology</option>
                    <option>Human Resource</option>
                  </Select>
                </Field>
                <Field label="Status">
                  <Select
                    value={editingRow.status}
                    onChange={(event) => setEditingRow({ ...editingRow, status: event.target.value as Row["status"] })}
                  >
                    <option>Attend</option>
                    <option>Day-Off</option>
                    <option>Sick</option>
                  </Select>
                </Field>
                <Field label="Check-in time">
                  <TextInput
                    value={editingRow.checkIn}
                    placeholder="HH:MM or --:--"
                    onChange={(event) => setEditingRow({ ...editingRow, checkIn: event.target.value })}
                  />
                </Field>
                <Field label="Check-out time">
                  <TextInput
                    value={editingRow.checkOut}
                    placeholder="HH:MM or --:--"
                    onChange={(event) => setEditingRow({ ...editingRow, checkOut: event.target.value })}
                  />
                </Field>
              </div>
              <div className="mt-2 flex justify-end gap-2">
                <Button onClick={() => setEditingRow(null)}>Cancel</Button>
                <Button variant="primary" type="submit">Save changes</Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </Card>
  );
}
