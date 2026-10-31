import { useState } from "react";
import checkmark from "../../../assets/icons/checkmark-square.svg";
import moreDots from "../../../assets/icons/more-vertical-dots.svg";
import arrowDown from "../../../assets/icons/circle-arrow-down.svg";
import arrowDownFilled from "../../../assets/icons/circle-arrow-down-filled.svg";
import loungeSofa from "../../../assets/procurement/lounge-sofa.png";
import bedsideTable from "../../../assets/procurement/bedside-table.png";
import chandelier from "../../../assets/procurement/chandelier.png";
import coastal1 from "../../../assets/procurement/coastal-1.png";
import coastal2 from "../../../assets/procurement/coastal-2.png";
import coastal3 from "../../../assets/procurement/coastal-3.png";

type Item = { id: number; name: string; image: string; supplier: string; qty: number; cost: string; approval: "Approved" | "In Progress"; project: string };

const ITEMS: Item[] = [
  { id: 1, name: "Lounge Sofa", image: loungeSofa, supplier: "SohoHome", qty: 2, cost: "£ 765", approval: "Approved", project: "Project Loxton" },
  { id: 2, name: "Bedside Table", image: bedsideTable, supplier: "SohoHome", qty: 1, cost: "£1250", approval: "Approved", project: "Costal Beach..." },
  { id: 3, name: "Chandelier", image: chandelier, supplier: "Pure White Lines", qty: 2, cost: "£895", approval: "In Progress", project: "Project Minx" },
  { id: 4, name: "Coastal Beach House Interior", image: coastal1, supplier: "SohoHome", qty: 2, cost: "£150", approval: "Approved", project: "Costal Beach..." },
  { id: 5, name: "Coastal Beach House Interior", image: coastal2, supplier: "SohoHome", qty: 2, cost: "£150", approval: "Approved", project: "Costal Beach..." },
  { id: 6, name: "Coastal Beach House Interior", image: coastal3, supplier: "SohoHome", qty: 2, cost: "£150", approval: "Approved", project: "Costal Beach..." },
];

const SUMMARY = [
  { title: "Total i tems", value: "12 Items", note: "For all projects" },
  { title: "Total Cost", value: "£150,000", note: "Project procurement" },
  { title: "Pending Approval", value: "50 Items", note: "Awaiting client aproval" },
  { title: "Delivered Items", value: "24 Items", note: "Successfully completed" },
];

const DETAILS: [string, string][] = [
  ["Start date", "12 Nov 2024"],
  ["install date", "5 June 2025"],
  ["room", "Bedroom 1"],
  ["quantity", "1"],
];
const LOGISTICS: [string, string][] = [
  ["sku", "MCM-002"],
  ["delivery", "White Glove Delivery"],
  ["tracking", "GB13765433"],
];

function Field({ label, pad = "px-[27px]", children }: { label: string; pad?: string; children: React.ReactNode }) {
  return (
    <div className={`-ml-px flex h-[57px] w-[130px] flex-col justify-between overflow-hidden border-x border-stroke-primary whitespace-nowrap ${pad}`}>
      <span className="-mt-[3px] text-body2 text-text-secondary uppercase">{label}</span>
      <span className="pb-[5px] text-body1">{children}</span>
    </div>
  );
}

function Badge({ children, tone }: { children: string; tone: "success" | "info" }) {
  return (
    <span className={`rounded-md px-1 py-[2px] font-inter text-[12px] leading-4 font-medium ${tone === "success" ? "bg-success-alpha-10 text-success" : "bg-info-alpha-10 text-info"}`}>
      {children}
    </span>
  );
}

function KeyValues({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[94px_21px_auto] gap-y-1 whitespace-nowrap">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="font-inter text-[12px] leading-5 font-medium text-text-secondary uppercase">{k}</dt>
          <span className="font-inter text-[12px] leading-5 text-text-secondary">:</span>
          <dd className="text-body1">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProcurementTab() {
  const [open, setOpen] = useState<number | null>(2);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">
        {SUMMARY.map((c) => (
          <div key={c.title} className="flex flex-col gap-2 rounded-xl bg-card p-3 sm:gap-3 sm:p-5">
            <p className="text-body2 text-text-secondary sm:text-body1">{c.title}</p>
            <p className="text-h4 font-semibold sm:text-h2">{c.value}</p>
            <p className="text-body2 text-text-secondary sm:text-body1">{c.note}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl bg-card p-3 sm:p-4">
        <div className="flex min-w-[1060px] flex-col gap-[10px]">
        {ITEMS.map((item) => {
          const expanded = open === item.id;
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-xl border ${expanded ? "border-[1.5px] border-primary bg-orange-alpha-10" : "border-stroke-primary bg-card"}`}
            >
              <div className="flex h-[89px] items-center">
                <span className="flex w-10 justify-center">
                  <img src={checkmark} alt="" />
                </span>
                <div className="flex flex-1 items-center gap-3">
                  <img src={item.image} alt="" className="size-11 rounded-md object-cover" />
                  <p className="w-[117px] text-body1">{item.name}</p>
                </div>
                <div className="flex items-center">
                  <Field label="supplier">{item.supplier}</Field>
                  <Field label="status">
                    <Badge tone="success">Delivered</Badge>
                  </Field>
                  <Field label="qty">{item.qty}</Field>
                  <Field label="cost">{item.cost}</Field>
                  <Field label="client approval" pad="px-[9px]">
                    <Badge tone={item.approval === "Approved" ? "success" : "info"}>{item.approval}</Badge>
                  </Field>
                  <Field label="project" pad="px-[13px]">{item.project}</Field>
                  <div className="-ml-px flex h-[57px] w-[130px] items-center justify-between border-l border-stroke-primary px-[21px]">
                    <button type="button" aria-label="More" className="flex size-6 items-center justify-center rounded bg-card">
                      <img src={moreDots} alt="" />
                    </button>
                    <button type="button" aria-label={expanded ? "Collapse" : "Expand"} aria-expanded={expanded} onClick={() => setOpen(expanded ? null : item.id)}>
                      <img src={expanded ? arrowDownFilled : arrowDown} alt="" />
                    </button>
                  </div>
                </div>
              </div>
              {expanded && (
                <div className="grid grid-cols-[470px_1fr_auto] gap-8 border-t border-stroke-primary px-4 pt-6 pb-6">
                  <div className="flex flex-col gap-6">
                    <p className="font-inter text-[16px] leading-5 font-semibold">Details</p>
                    <div className="flex gap-8">
                      <KeyValues rows={DETAILS} />
                      <KeyValues rows={LOGISTICS} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <p className="font-inter text-[16px] leading-5 font-semibold">Related Tasks</p>
                    <p className="text-body1">5 June 2025</p>
                  </div>
                  <div className="flex w-[160px] flex-col gap-6">
                    <p className="font-inter text-[16px] leading-5 font-semibold">Notes</p>
                    <p className="text-body1">Handle with care- premium upholstery</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
