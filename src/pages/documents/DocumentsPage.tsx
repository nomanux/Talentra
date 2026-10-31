import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import Menu from "../../components/ui/Menu";
import FileIcon from "../../components/ui/FileIcon";
import Tag from "../../components/ui/Tag";
import { RowActions, Table, Td, Th, Tr } from "../../components/ui/Table";
import EditRecordModal, { type EditField } from "../../components/ui/EditRecordModal";
import { formatDisplayDate, toDateInputValue } from "../../utils/dateFormat";
import useTableSort from "../../components/ui/useTableSort";
import searchIcon from "../../assets/icons/search-01.svg";
import pdfIcon from "../../assets/icons/pdf.svg";
import addOutline from "../../assets/icons/add-outline.svg";

type Status = "Active" | "Suspended" | "Pending" | "Draft";
type Doc = { id: number; name: string; revision: string; date: string; size: string; day: string; status: Status };

const NAMES = [
  "Company Profile.pdf", "RekamanProspek.mp3", "Company Profile.pdf", "Brosur Nusawork.jpeg", "RekamanProspek.mp3",
  "KartuNama.jpeg", "KartuNama.jpeg", "Audio Rekaman.mp4", "RekamanProspek.mp3", "Company Profile.pdf",
  "Audio Rekaman.mp4", "Company Profile.pdf", "Company Profile.pdf", "Brosur Nusawork.jpeg", "Brosur Nusawork.jpeg",
  "Company Profile.pdf", "RekamanProspek.mp3", "KartuNama.jpeg", "Audio Rekaman.mp4", "Company Profile.pdf",
];
const REVISIONS = [
  "Binford Ltd.", "Big Kahuna Burger Ltd.", "Big Kahuna Burger Ltd.", "Acme Co.", "Binford Ltd.", "Abstergo Ltd.", "Big Kahuna Burger Ltd.",
  "Binford Ltd.", "Barone LLC.", "Barone LLC.", "Big Kahuna Burger Ltd.", "Abstergo Ltd.", "Acme Co.", "Barone LLC.", "Big Kahuna Burger Ltd.",
  "Acme Co.", "Barone LLC.", "Big Kahuna Burger Ltd.", "Binford Ltd.", "Acme Co.",
];
const DATES = ["7/11/19", "5/30/14", "6/19/14", "6/21/19", "10/28/12", "3/4/16", "8/21/15", "1/31/14", "7/18/17", "1/15/12", "12/10/13", "9/18/16", "1/28/17", "9/23/16", "4/21/12", "10/6/13", "4/4/18", "5/27/15", "2/11/12", "9/4/12"];
const SIZES = ["3w", "6d", "12m", "5y", "36s", "1m", "5y", "1d", "1s", "12y", "3w", "21h", "1w", "1y", "5s", "59m", "18h", "5m", "3h", "Now"];
const DAYS = [
  "December 2, 2018", "May 6, 2012", "November 28, 2015", "October 25, 2019", "May 20, 2015", "December 19, 2013", "October 24, 2018",
  "July 14, 2015", "November 16, 2014", "May 31, 2015", "August 2, 2013", "September 9, 2013", "March 23, 2013", "August 7, 2017",
  "February 28, 2018", "February 9, 2015", "May 9, 2014", "April 28, 2016", "March 13, 2014", "February 11, 2014",
];
const statusFor = (i: number): Status => (i === 4 || i === 5 ? "Suspended" : i < 9 ? "Active" : i === 19 ? "Draft" : "Pending");

const DOCS: Doc[] = NAMES.map((name, i) => ({ id: i, name, revision: REVISIONS[i], date: formatDisplayDate(DATES[i]), size: SIZES[i], day: formatDisplayDate(DAYS[i]), status: statusFor(i) }));
const TONE = { Active: "success", Suspended: "info", Pending: "pending", Draft: "neutral" } as const;
const STATUSES = ["All status", "Active", "Suspended", "Pending", "Draft"].map((label) => ({ label }));
const DOCUMENT_EDIT_FIELDS: EditField[] = [
  { key: "name", label: "File name" },
  { key: "revision", label: "Revision" },
  { key: "date", label: "Date", type: "date" },
  { key: "size", label: "Size" },
  { key: "day", label: "Day", type: "date" },
  { key: "status", label: "Status", options: ["Active", "Suspended", "Pending", "Draft"] },
];

export default function DocumentsPage() {
  const [docs, setDocs] = useState(DOCS);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const [editing, setEditing] = useState<Doc | null>(null);
  const { sort, toggleSort, sortRows } = useTableSort<Doc>();
  const visible = useMemo(
    () => docs.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) && (status === "All status" || d.status === status)),
    [docs, query, status],
  );
  const sortedDocs = sortRows(visible);

  return (
    <div className="flex min-h-[950px] flex-col rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-5 sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4">Documents</h2>
          <p className="text-body1 text-text-secondary">Manage your documents</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex w-full items-center sm:w-[282px] gap-[10px] rounded-lg border border-stroke-primary px-[14px] py-2">
            <img src={searchIcon} alt="" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="min-w-0 flex-1 font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] outline-none placeholder:text-text-secondary"
            />
          </label>
          <Menu label={status} items={STATUSES} value={status} onSelect={setStatus} />
          <Button className="font-inter">
            <img src={pdfIcon} alt="" />
            <span>Export</span>
          </Button>
          <label className="inline-flex cursor-pointer items-center gap-[2px] rounded-lg bg-primary px-[10px] py-2 text-body1 text-white hover:bg-primary-dark">
            <img src={addOutline} alt="" />
            <span className="px-1">Create new file</span>
            <input
              type="file"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setDocs((prev) => [
                  { id: Date.now(), name: file.name, revision: "You", date: formatDisplayDate(new Date()), size: "Now", day: formatDisplayDate(new Date()), status: "Draft" },
                  ...prev,
                ]);
              }}
            />
          </label>
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <Th className="w-[246px]" onSort={() => toggleSort("name")} sortDirection={sort?.key === "name" ? sort.direction : null}>File Name</Th>
            <Th className="w-[211px]" onSort={() => toggleSort("revision")} sortDirection={sort?.key === "revision" ? sort.direction : null}>Revision</Th>
            <Th className="w-[118px]" onSort={() => toggleSort("date")} sortDirection={sort?.key === "date" ? sort.direction : null}>Date</Th>
            <Th className="w-[107px]" onSort={() => toggleSort("size")} sortDirection={sort?.key === "size" ? sort.direction : null}>size</Th>
            <Th className="w-[194px]" onSort={() => toggleSort("day")} sortDirection={sort?.key === "day" ? sort.direction : null}>Day</Th>
            <Th className="w-[157px]" onSort={() => toggleSort("status")} sortDirection={sort?.key === "status" ? sort.direction : null}>Status</Th>
            <Th className="w-[88px]">Action</Th>
          </tr>
        </thead>
        <tbody>
          {sortedDocs.map((d) => (
            <Tr key={d.id}>
              <Td className="!py-1">
                <span className="flex items-center gap-[10px]">
                  <FileIcon />
                  {d.name}
                </span>
              </Td>
              <Td>{d.revision}</Td>
              <Td>{d.date}</Td>
              <Td>{d.size}</Td>
              <Td>{d.day}</Td>
              <Td tight>
                <Tag tone={TONE[d.status]}>{d.status}</Tag>
              </Td>
              <Td>
                <RowActions
                  label={d.name}
                  onEdit={() => setEditing(d)}
                  onDelete={() => setDocs((prev) => prev.filter((x) => x.id !== d.id))}
                />
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <EditRecordModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={`Edit ${editing?.name ?? "document"}`}
        fields={DOCUMENT_EDIT_FIELDS}
        values={editing ? {
          name: editing.name, revision: editing.revision, date: toDateInputValue(editing.date),
          size: editing.size, day: toDateInputValue(editing.day), status: editing.status,
        } : {}}
        onSave={(values) => {
          if (!editing) return;
          setDocs((prev) => prev.map((doc) => doc.id === editing.id
            ? { ...doc, ...values, date: formatDisplayDate(values.date), day: formatDisplayDate(values.day), status: values.status as Status }
            : doc));
          setEditing(null);
        }}
      />
    </div>
  );
}
