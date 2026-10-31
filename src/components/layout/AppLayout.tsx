import { useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Sidebar, { NAV_ITEMS } from "./Sidebar";
import TopBar from "./TopBar";

/** Top-bar titles as written in the Figma frames (singular for some sections). */
const TITLES: Record<string, string> = { "/projects": "Project", "/integrations": "Integration" };

/** Pages outside the main nav (reached from the sidebar profile menu / upgrade card). */
const EXTRA_TITLES: Record<string, string> = { "/pricing": "Plans & Pricing", "/settings": "Settings", "/help": "Help & Support" };

function titleFor(pathname: string) {
  const extra = Object.keys(EXTRA_TITLES).find((p) => pathname.startsWith(p));
  if (extra) return EXTRA_TITLES[extra];
  const match = NAV_ITEMS.filter((item) => item.to !== "/").find((item) => pathname.startsWith(item.to));
  return match ? (TITLES[match.to] ?? match.label) : "Dashboard";
}

export default function AppLayout() {
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const popup = params.get("popup");
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen gap-4 p-1.5 sm:p-2">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex min-w-0 flex-1 flex-col gap-2.5 sm:gap-[14px] px-1 pt-1 pb-2 sm:px-2 lg:pr-[7px] lg:pl-0">
        <TopBar
          onMenu={() => setMenuOpen(true)}
          title={titleFor(pathname)}
          showDate={pathname === "/"}
          initialPopup={popup === "date" || popup === "language" || popup === "search" ? popup : null}
        />
        <Outlet />
      </main>
    </div>
  );
}
