import { useState } from "react";
import Tag, { type TagTone } from "../../../components/ui/Tag";
import { RowActions, Table, Td, Th, Tr } from "../../../components/ui/Table";
import invoiceIcon from "../../../assets/icons/invoice.svg";
import cartIcon from "../../../assets/icons/shopping-cart.svg";

type Invoice = { id: number; number: string; client: string; project: string; issued: string; due: string; status: string; amount: string };

const RAW: [string, string, string, string, string, string, string][] = [
  ["#696589", "Black, Marvin", "Henry, Arthur", "August 7, 2017", "5/27/15", "Cancelled", "$2,500.00"],
  ["#526587", "Black, Marvin", "Henry, Arthur", "March 6, 2018", "6/19/14", "Unpaid", "$266.00"],
  ["#105986", "Miles, Esther", "Nguyen, Shane", "November 16, 2014", "8/16/13", "Unsaved", "$4,805.00"],
  ["#200257", "Black, Marvin", "Henry, Arthur", "April 28, 2016", "1/15/12", "Partially Paid", "$120,000.00"],
  ["#526534", "Henry, Arthur", "Cooper, Kristin", "August 24, 2013", "7/11/19", "Converted", "$350.00"],
  ["#526525", "Black, Marvin", "Miles, Esther", "May 29, 2017", "10/6/13", "Allocation-Draft", "$3,666.71"],
  ["#526520", "Nguyen, Shane", "Cooper, Kristin", "July 14, 2015", "8/30/14", "Allocation-Submitted", "$102.00"],
  ["#256584", "Cooper, Kristin", "Miles, Esther", "October 24, 2018", "1/28/17", "Deleted", "$800.00"],
  ["#696589", "Black, Marvin", "Flores, Juanita", "September 24, 2017", "2/11/12", "Return", "$15,000,000.00"],
  ["#526587", "Flores, Juanita", "Flores, Juanita", "May 20, 2015", "9/23/16", "Submitted", "$5,600.00"],
  ["#696589", "Black, Marvin", "Black, Marvin", "February 29, 2012", "8/2/19", "Cancelled", "$680.00"],
  ["#200257", "Miles, Esther", "Black, Marvin", "May 9, 2014", "4/4/18", "Allocation-Draft", "$96.00"],
  ["#200257", "Flores, Juanita", "Nguyen, Shane", "February 9, 2015", "5/30/14", "Submitted", "$150.00"],
  ["#526587", "Miles, Esther", "Nguyen, Shane", "August 2, 2013", "11/7/16", "Draft", "$1,878.50"],
  ["#200257", "Henry, Arthur", "Cooper, Kristin", "October 30, 2017", "3/4/16", "Overdue", "$16,500.00"],
  ["#526587", "Cooper, Kristin", "Nguyen, Shane", "November 28, 2015", "7/18/17", "Paid", "$210.00"],
  ["#526589", "Flores, Juanita", "Miles, Esther", "May 12, 2019", "9/4/12", "Draft", "$349.00"],
  ["#256584", "Flores, Juanita", "Nguyen, Shane", "May 6, 2012", "1/31/14", "Declined", "$1,250.00"],
];

/** Tag colours follow the row order used in the Figma table. */
const toneFor = (i: number): TagTone => (i === 0 ? "error" : i === 4 || i === 5 ? "info" : i < 9 ? "success" : "pending");

const INVOICES: Invoice[] = RAW.map(([number, client, project, issued, due, status, amount], id) => ({ id, number, client, project, issued, due, status, amount }));

export default function FinanceTab() {
  const [rows, setRows] = useState(INVOICES);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[
          { title: "Total Invoices", value: "£ 123 456", icon: invoiceIcon, chip: "34 Invoices" },
          { title: "Total Purchase Orders", value: "£ 78 500", icon: cartIcon, chip: "23 Purchase Orders" },
        ].map((c) => (
          <div key={c.title} className="flex min-h-[104px] flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-3">
              <p className="text-body1">{c.title}</p>
              <p className="text-h2 font-semibold">{c.value}</p>
            </div>
            <span className="flex items-center gap-[6px] rounded-md bg-card px-[10px] py-[6px] text-body1">
              <img src={c.icon} alt="" />
              {c.chip}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-card">
        <Table>
          <thead>
            <tr>
              <Th className="w-[158px]">Invoice number</Th>
              <Th className="w-[165px]">Client name</Th>
              <Th className="w-[157px]">Project name</Th>
              <Th className="w-[177px]">Date issued</Th>
              <Th className="w-[97px]">Due Date</Th>
              <Th className="w-[157px]">Status</Th>
              <Th className="w-[128px]">Amount</Th>
              <Th className="w-[63px]">Action</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <Tr key={r.id}>
                <Td>{r.number}</Td>
                <Td>{r.client}</Td>
                <Td>{r.project}</Td>
                <Td>{r.issued}</Td>
                <Td>{r.due}</Td>
                <Td tight className="max-w-[157px] overflow-hidden">
                  <Tag tone={toneFor(i)}>{r.status}</Tag>
                </Td>
                <Td>{r.amount}</Td>
                <Td>
                  <RowActions label={r.number} onDelete={() => setRows((prev) => prev.filter((x) => x.id !== r.id))} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
