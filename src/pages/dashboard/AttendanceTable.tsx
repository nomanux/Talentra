import { useState } from "react";
import Card from "../../components/ui/Card";
import Tag, { type TagTone } from "../../components/ui/Tag";
import refreshIcon from "../../assets/icons/refresh-sm.svg";
import moreIcon from "../../assets/icons/more-horizontal.svg";
import pencilIcon from "../../assets/icons/pencil.svg";
import trashIcon from "../../assets/icons/trash.svg";

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
const COLUMNS = [
  { label: "Employee ID", width: "w-[160px]" },
  { label: "Name", width: "w-[190px]" },
  { label: "Department", width: "w-[175px]" },
  { label: "Status", width: "w-[157px]" },
  { label: "Check-In Time", width: "w-[158px]" },
  { label: "Check-Out Time", width: "w-[196px]" },
  { label: "Action", width: "w-[63px]" },
];

const cell = "border-r border-b border-stroke-secondary px-[10px] text-h5 text-text-secondary whitespace-nowrap";

export default function AttendanceTable() {
  const [tab, setTab] = useState(TABS[0]);
  const [rows, setRows] = useState(ROWS);

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
              {COLUMNS.map((c) => (
                <th key={c.label} className={`${cell} ${c.width} py-[6px] text-left font-medium text-text-tertiary`}>
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const last = i === rows.length - 1 ? "border-b-0" : "";
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
                    <div className="flex items-center justify-center gap-[10px]">
                      <button type="button" aria-label={`Edit ${r.name}`} className="flex size-[14px] items-center justify-center">
                        <img src={pencilIcon} alt="" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${r.name}`}
                        onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                        className="flex size-[14px] items-center justify-center"
                      >
                        <img src={trashIcon} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
