import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";
import pencilIcon from "../../assets/icons/pencil.svg";
import trashIcon from "../../assets/icons/trash.svg";

/** Bordered data table used on Dashboard, Time Off, Employee and Documents screens. */
export function Table({ minWidth = 1099, children }: { minWidth?: number; children: ReactNode }) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse [&_tbody_tr:last-child_td]:border-b-0" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

const cell = "border-r border-b border-stroke-secondary px-[10px] text-h5 whitespace-nowrap";

export function Th({ className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={`${cell} py-[6px] text-left font-medium text-text-tertiary ${className}`} {...props} />;
}

export function Td({ className = "", tight, ...props }: TdHTMLAttributes<HTMLTableCellElement> & { tight?: boolean }) {
  return <td className={`${cell} ${tight ? "py-[6px]" : "py-2"} text-text-secondary ${className}`} {...props} />;
}

export function Tr(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="transition-colors hover:bg-surface" {...props} />;
}

export function RowActions({ label, onEdit, onDelete }: { label: string; onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <button type="button" aria-label={`Edit ${label}`} onClick={onEdit} className="flex size-[14px] items-center justify-center">
        <img src={pencilIcon} alt="" />
      </button>
      <button type="button" aria-label={`Delete ${label}`} onClick={onDelete} className="flex size-[14px] items-center justify-center">
        <img src={trashIcon} alt="" />
      </button>
    </div>
  );
}
