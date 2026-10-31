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

type SortDirection = "asc" | "desc";

export function Th({ className = "", sortDirection, onSort, children, ...props }: Omit<ThHTMLAttributes<HTMLTableCellElement>, "onSort"> & {
  sortDirection?: SortDirection | null;
  onSort?: () => void;
}) {
  const classes = `${cell} py-[6px] text-left font-medium text-text-tertiary ${className}`;
  if (!onSort) return <th className={classes} {...props}>{children}</th>;
  return (
    <th className={classes} aria-sort={sortDirection === "asc" ? "ascending" : sortDirection === "desc" ? "descending" : "none"} {...props}>
      <button
        type="button"
        onClick={onSort}
        className="flex w-full items-center justify-between gap-2 text-left transition-colors hover:text-text-primary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <span>{children}</span>
        <span aria-hidden="true" className={`text-body2 ${sortDirection ? "text-primary" : "text-text-tertiary/60"}`}>
          {sortDirection === "asc" ? "↑" : sortDirection === "desc" ? "↓" : "↕"}
        </span>
      </button>
    </th>
  );
}

export function Td({ className = "", tight, ...props }: TdHTMLAttributes<HTMLTableCellElement> & { tight?: boolean }) {
  return <td className={`${cell} ${tight ? "py-[6px]" : "py-2"} text-text-secondary ${className}`} {...props} />;
}

export function Tr(props: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="transition-colors hover:bg-surface" {...props} />;
}

export function RowActions({ label, onEdit, onDelete }: { label: string; onEdit?: () => void; onDelete?: () => void }) {
  const buttonClass = "group flex size-8 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2";
  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        aria-label={`Edit ${label}`}
        title={`Edit ${label}`}
        onClick={onEdit}
        className={`${buttonClass} text-text-secondary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary/50`}
      >
        <img src={pencilIcon} alt="" className="size-4 transition-transform group-hover:scale-110" />
      </button>
      {onDelete && (
        <button
          type="button"
          aria-label={`Delete ${label}`}
          title={`Delete ${label}`}
          onClick={onDelete}
          className={`${buttonClass} hover:bg-error/10 focus-visible:ring-error/40`}
        >
          <img src={trashIcon} alt="" className="size-4 transition-transform group-hover:scale-110" />
        </button>
      )}
    </div>
  );
}
