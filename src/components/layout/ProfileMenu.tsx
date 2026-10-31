import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CURRENT_USER } from "../../data/user";
import settingsIcon from "../../assets/icons/settings-01.svg";
import supportIcon from "../../assets/icons/customer-support.svg";
import logoutIcon from "../../assets/icons/logout.svg";
import chevron from "../../assets/icons/arrow-down-fill.svg";

/** Signed-in user row at the foot of the sidebar; opens Settings / Help / Log out. */
export default function ProfileMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    window.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  const go = () => {
    setOpen(false);
    onNavigate?.();
  };

  const item = "flex w-full items-center gap-[10px] rounded-lg px-3 py-2 text-body1 text-text-secondary hover:bg-surface hover:text-text-primary";

  return (
    <div ref={ref} className="relative">
      {open && (
        <div role="menu" className="absolute right-0 bottom-[calc(100%+8px)] left-0 z-10 flex flex-col rounded-xl border border-stroke-primary bg-card p-1 shadow-[0_4px_20.4px_0_rgba(152,161,173,0.25)]">
          <Link role="menuitem" to="/settings" onClick={go} className={item}>
            <img src={settingsIcon} alt="" />
            Settings
          </Link>
          <Link role="menuitem" to="/help" onClick={go} className={item}>
            <img src={supportIcon} alt="" />
            Help &amp; Support
          </Link>
          <div className="my-1 h-px bg-stroke-secondary" />
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              go();
              navigate("/login");
            }}
            className={item}
          >
            <img src={logoutIcon} alt="" />
            Log out
          </button>
        </div>
      )}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-[10px] rounded-[10px] p-2 text-left hover:bg-surface"
      >
        <img src={CURRENT_USER.avatar} alt="" className="size-9 shrink-0 rounded-full object-cover" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-body1">{CURRENT_USER.name}</span>
          <span className="truncate text-body2 text-text-tertiary">{CURRENT_USER.email}</span>
        </span>
        <img src={chevron} alt="" className={`transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
    </div>
  );
}
