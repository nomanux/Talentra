import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import closeIcon from "../../assets/icons/close.svg";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  children: ReactNode;
  footer?: ReactNode;
};

/** Centered dialog over the blurred gradient overlay used throughout the Figma file. */
export function Overlay({ onClick, children }: { onClick?: () => void; children?: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-gradient-to-b from-[rgba(14,18,27,0.4)] to-[rgba(14,18,27,0.04)] backdrop-blur-[1.5px]"
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default function Modal({ open, onClose, title, width = 630, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <Overlay onClick={onClose}>
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => e.stopPropagation()}
          className="flex max-h-[calc(100vh-48px)] w-full flex-col overflow-hidden rounded-[20px] bg-card"
          style={{ maxWidth: width }}
        >
          {title && (
            <div className="flex items-center gap-3 border-b border-stroke-primary px-4 py-4 sm:px-6">
              <h2 className="flex-1 truncate text-h3">{title}</h2>
              <button type="button" aria-label="Close" onClick={onClose} className="rounded-md p-[6px] hover:bg-surface">
                <img src={closeIcon} alt="" />
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
          {footer && <div className="flex items-center justify-end gap-4 border-t border-stroke-primary p-4 sm:p-6">{footer}</div>}
        </div>
      </div>
    </Overlay>,
    document.body,
  );
}
