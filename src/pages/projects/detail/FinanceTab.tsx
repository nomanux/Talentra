import { useState } from "react";
import Tag, { type TagTone } from "../../../components/ui/Tag";
import { RowActions, Table, Td, Th, Tr } from "../../../components/ui/Table";
import EditRecordModal, { type EditField } from "../../../components/ui/EditRecordModal";
import { formatDisplayDate, toDateInputValue } from "../../../utils/dateFormat";
import useTableSort from "../../../components/ui/useTableSort";
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

const toneFor = (status: string): TagTone => {
  if (/cancelled|declined|overdue|return/i.test(status)) return "error";
  if (/paid|converted|submitted/i.test(status)) return "success";
  if (/draft|unsaved|unpaid/i.test(status)) return "pending";
  return "info";
};

const INVOICES: Invoice[] = RAW.map(([number, client, project, issued, due, status, amount], id) => ({
  id, number, client, project, issued: formatDisplayDate(issued), due: formatDisplayDate(due), status, amount,
}));
const INVOICE_EDIT_FIELDS: EditField[] = [
  { key: "number", label: "Invoice number" },
  { key: "client", label: "Client name" },
  { key: "project", label: "Project name" },
  { key: "issued", label: "Date issued", type: "date" },
  { key: "due", label: "Due date", type: "date" },
  { key: "status", label: "Status", options: [...new Set(RAW.map((row) => row[5]))] },
  { key: "amount", label: "Amount" },
];

export default function FinanceTab() {
  const [rows, setRows] = useState(INVOICES);
  const [editing, setEditing] = useState<Invoice | null>(null);
  const { sort, toggleSort, sortRows } = useTableSort<Invoice>();
  const sortedInvoices = sortRows(rows);

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
              <Th className="w-[158px]" onSort={() => toggleSort("number")} sortDirection={sort?.key === "number" ? sort.direction : null}>Invoice number</Th>
              <Th className="w-[165px]" onSort={() => toggleSort("client")} sortDirection={sort?.key === "client" ? sort.direction : null}>Client name</Th>
              <Th className="w-[157px]" onSort={() => toggleSort("project")} sortDirection={sort?.key === "project" ? sort.direction : null}>Project name</Th>
              <Th className="w-[177px]" onSort={() => toggleSort("issued")} sortDirection={sort?.key === "issued" ? sort.direction : null}>Date issued</Th>
              <Th className="w-[97px]" onSort={() => toggleSort("due")} sortDirection={sort?.key === "due" ? sort.direction : null}>Due Date</Th>
              <Th className="w-[157px]" onSort={() => toggleSort("status")} sortDirection={sort?.key === "status" ? sort.direction : null}>Status</Th>
              <Th className="w-[128px]" onSort={() => toggleSort("amount")} sortDirection={sort?.key === "amount" ? sort.direction : null}>Amount</Th>
              <Th className="w-[88px]">Action</Th>
            </tr>
          </thead>
          <tbody>
            {sortedInvoices.map((r) => (
              <Tr key={r.id}>
                <Td>{r.number}</Td>
                <Td>{r.client}</Td>
                <Td>{r.project}</Td>
                <Td>{r.issued}</Td>
                <Td>{r.due}</Td>
                <Td tight className="max-w-[157px] overflow-hidden">
                  <Tag tone={toneFor(r.status)}>{r.status}</Tag>
                </Td>
                <Td>{r.amount}</Td>
                <Td>
                  <RowActions
                    label={r.number}
                    onEdit={() => setEditing(r)}
                    onDelete={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                  />
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <EditRecordModal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title={`Edit invoice ${editing?.number ?? ""}`}
        fields={INVOICE_EDIT_FIELDS}
        values={editing ? {
          number: editing.number, client: editing.client, project: editing.project,
          issued: toDateInputValue(editing.issued), due: toDateInputValue(editing.due), status: editing.status, amount: editing.amount,
        } : {}}
        onSave={(values) => {
          if (!editing) return;
          setRows((prev) => prev.map((invoice) => invoice.id === editing.id
            ? { ...invoice, ...values, issued: formatDisplayDate(values.issued), due: formatDisplayDate(values.due) }
            : invoice));
          setEditing(null);
        }}
      />
    </div>
  );
}
