import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Menu from "../../components/ui/Menu";
import RangePicker, { type Range } from "../../components/ui/RangePicker";
import Tag, { type TagTone } from "../../components/ui/Tag";
import { RowActions, Table, Td, Th, Tr } from "../../components/ui/Table";
import EmptyState from "../../components/ui/EmptyState";
import addOutline from "../../assets/icons/add-outline.svg";
import pdfIcon from "../../assets/icons/pdf.svg";
import calendar03 from "../../assets/icons/calendar-03.svg";
import timerIcon from "../../assets/icons/timer-01-empty.svg";

type Status = "Under Review" | "Awarded" | "Draft" | "Declined";
type Request = { id: number; created: string; start: string; hours: string; days: number; status: Status; tone: TagTone; overtime: string };

const RAW: [string, string, string, number, Status, string][] = [
  ["April 28, 2016", "February 29, 2012", "8am - 15:30pm", 28, "Under Review", "11m"],
  ["May 6, 2012", "November 28, 2015", "7am - 13:00pm", 24, "Awarded", "3h"],
  ["November 28, 2015", "May 20, 2015", "9am - 18:30pm", 40, "Draft", "12m"],
  ["May 20, 2015", "April 28, 2016", "7am - 14:00pm", 14, "Declined", "Now"],
  ["November 7, 2017", "December 19, 2013", "8am - 16:30pm", 14, "Draft", "1w"],
  ["August 2, 2013", "December 2, 2018", "9:30am - 18:00pm", 6, "Draft", "1h"],
  ["February 28, 2018", "February 28, 2018", "10am -17:00pm", 6, "Declined", "5y"],
  ["August 24, 2013", "May 29, 2017", "8am - 16:30pm", 40, "Under Review", "3w"],
  ["May 12, 2019", "February 9, 2015", "7am - 14:00pm", 24, "Declined", "5y"],
  ["August 7, 2017", "March 13, 2014", "7am - 14:00pm", 16, "Under Review", "2w"],
  ["October 30, 2017", "May 31, 2015", "10am -17:00pm", 24, "Under Review", "1d"],
  ["September 9, 2013", "March 23, 2013", "9am - 18:00pm", 3, "Declined", "36s"],
  ["November 16, 2014", "October 30, 2017", "10am -17:00pm", 14, "Draft", "5s"],
  ["October 31, 2017", "May 9, 2014", "10am - 14:30pm", 20, "Draft", "18h"],
  ["December 29, 2012", "February 11, 2014", "9am - 18:30pm", 16, "Awarded", "1s"],
  ["October 24, 2018", "August 24, 2013", "9am - 18:00pm", 24, "Under Review", "5y"],
  ["October 25, 2019", "May 6, 2012", "9:30am - 14:00pm", 24, "Draft", "36s"],
  ["December 2, 2018", "October 31, 2017", "9:30am - 14:00pm", 16, "Declined", "12h"],
  ["February 11, 2014", "November 16, 2014", "9:30am - 18:00pm", 16, "Awarded", "3w"],
  ["March 13, 2014", "July 14, 2015", "10am - 14:30pm", 14, "Draft", "59m"],
];

/** Tag colour per row as drawn in the Figma table (green, then blue drafts, then pending amber). */
const toneFor = (i: number): TagTone => (i === 4 || i === 5 ? "info" : i < 9 ? "success" : "pending");

const REQUESTS: Request[] = RAW.map(([created, start, hours, days, status, overtime], i) => ({
  id: i,
  created,
  start,
  hours,
  days,
  status,
  overtime,
  tone: toneFor(i),
}));

const RANGES = [
  { label: "Last week" },
  { label: "Last month" },
  { label: "Last 3 month" },
  { label: "Last 6 month" },
  { label: "Last 1 year" },
  { label: "Last 5 year" },
  { label: "Custom", icon: calendar03 },
];

const MARKED_DAYS = [
  ...[14, 18, 24, 29].map((d) => new Date(2026, 3, d)),
  ...[2, 9, 12, 20, 22].map((d) => new Date(2026, 4, d)),
];

const STATUSES = ["All status", "Under Review", "Awarded", "Draft", "Declined"].map((label) => ({ label }));

export default function TimeOffPage() {
  const [params] = useSearchParams();
  const [rows, setRows] = useState<Request[]>(params.get("state") === "empty" ? [] : REQUESTS);
  const [range, setRange] = useState("Last 3 month");
  const [custom, setCustom] = useState<Range>({ start: new Date(2026, 3, 24), end: new Date(2026, 4, 12) });
  const [showPicker, setShowPicker] = useState(params.get("range") === "custom");
  const [status, setStatus] = useState("All status");

  const visible = useMemo(() => (status === "All status" ? rows : rows.filter((r) => r.status === status)), [rows, status]);
  const rangeLabel = range === "Custom" ? "Custom range" : range.replace("month", "months");

  return (
    <div className="flex min-h-[1035px] flex-col rounded-xl bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-5 sm:px-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4">Request Time List</h2>
          <p className="text-body1 text-text-secondary">The request is in the state waiting for approval;</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Menu
            label={rangeLabel}
            items={RANGES}
            value={range}
            onSelect={(r) => {
              setRange(r);
              setShowPicker(r === "Custom");
            }}
          >
            {showPicker && (
              <div className="absolute top-[calc(100%+8px)] -left-2 z-30 w-max sm:-right-24 sm:left-auto">
                <RangePicker
                  initialMonth={new Date(2026, 3, 1)}
                  today={new Date(2026, 4, 20)}
                  value={custom}
                  marked={MARKED_DAYS}
                  onChange={(r) => {
                    setCustom(r);
                    if (r.end) setShowPicker(false);
                  }}
                />
              </div>
            )}
          </Menu>
          <Menu label={status} items={STATUSES} value={status} onSelect={setStatus} />
          <Button className="font-inter" onClick={() => window.print()}>
            <img src={pdfIcon} alt="" />
            <span>Download PDF</span>
          </Button>
          <Button variant="primary">
            <img src={addOutline} alt="" />
            <span>Create Time Off</span>
          </Button>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          icon={timerIcon}
          title="No Time Yet"
          lines={["No timeyet Add your first time and it will appear here.", "You can also use other hire flow functions.", "Create new time"]}
          action={
            <Button variant="primary" onClick={() => setRows(REQUESTS)}>
              <img src={addOutline} alt="" />
              <span>Create Time Off</span>
            </Button>
          }
        />
      ) : (
        <div className="mt-1">
          <Table>
            <thead>
              <tr>
                <Th className="w-[204px]">Created Date</Th>
                <Th className="w-[210px]">Start Date</Th>
                <Th className="w-[194px]">Total Hours</Th>
                <Th className="w-[107px]">Total Day</Th>
                <Th className="w-[157px]">Status</Th>
                <Th className="w-[165px]">Over Time</Th>
                <Th className="w-[63px]">Action</Th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <Tr key={r.id}>
                  <Td className="!py-[10px]">{r.created}</Td>
                  <Td className="!py-[10px]">{r.start}</Td>
                  <Td className="!py-[10px]">{r.hours}</Td>
                  <Td className="!py-[10px]">{r.days}</Td>
                  <Td tight>
                    <Tag tone={r.tone}>{r.status}</Tag>
                  </Td>
                  <Td className="!py-[10px]">{r.overtime}</Td>
                  <Td>
                    <RowActions label={r.created} onDelete={() => setRows((prev) => prev.filter((x) => x.id !== r.id))} />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
