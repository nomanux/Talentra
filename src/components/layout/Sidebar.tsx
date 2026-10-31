import { NavLink } from "react-router-dom";
import logoCircle from "../../assets/icons/logo-circle.svg";
import logo from "../../assets/icons/logo.svg";
import layoutRight from "../../assets/icons/layout-right.svg";
import dashboardIcon from "../../assets/icons/dashboard-square-02.svg";
import calendarIcon from "../../assets/icons/calendar-01.svg";
import timerIcon from "../../assets/icons/timer-01.svg";
import projectsIcon from "../../assets/icons/property-search.svg";
import teamsIcon from "../../assets/icons/user-group.svg";
import integrationsIcon from "../../assets/icons/connect.svg";
import employeeIcon from "../../assets/icons/user-list.svg";
import documentsIcon from "../../assets/icons/document-attachment.svg";
import UpgradePlanCard from "./UpgradePlanCard";
import ProfileMenu from "./ProfileMenu";
import { useTheme } from "../../theme";

export const NAV_ITEMS = [
  { label: "Dashboard", to: "/", icon: dashboardIcon },
  { label: "Calendar", to: "/calendar", icon: calendarIcon },
  { label: "Time Off", to: "/time-off", icon: timerIcon },
  { label: "Projects", to: "/projects", icon: projectsIcon },
  { label: "Teams", to: "/teams", icon: teamsIcon },
  { label: "Integrations", to: "/integrations", icon: integrationsIcon },
  { label: "Employee", to: "/employees", icon: employeeIcon },
  { label: "Documents", to: "/documents", icon: documentsIcon },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-inter text-[14px] font-medium leading-5 tracking-[-0.14px] text-text-tertiary uppercase">
      {children}
    </p>
  );
}

/** Fixed column on desktop; slide-in drawer below `lg` (opened from the top-bar menu button). */
export default function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const { theme, toggle } = useTheme();
  return (
    <>
    {open && <div className="fixed inset-0 z-40 bg-[rgba(14,18,27,0.4)] backdrop-blur-[1.5px] lg:hidden" onClick={onClose} aria-hidden />}
    <aside
      className={`fixed inset-y-2 left-2 z-50 flex w-[270px] shrink-0 flex-col overflow-hidden rounded-[14px] bg-card px-[14px] pt-[14px] pb-4 transition-transform duration-200 lg:sticky lg:top-2 lg:z-auto lg:h-[calc(100vh-16px)] lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-[calc(100%+16px)]"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[11px]">
          <div className="relative size-10">
            <img src={logoCircle} alt="" className="absolute inset-0" />
            <img src={logo} alt="" className="absolute top-[11px] left-[7px]" />
          </div>
          <span className="font-brand text-[20px] leading-6 font-semibold tracking-[-0.2px]">Talentra</span>
        </div>
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Light mode" : "Dark mode"}
          className="flex size-5 items-center justify-center"
        >
          <img src={layoutRight} alt="" />
        </button>
      </div>

      <nav className="mt-[30px] flex flex-col gap-[18px]">
        <div className="flex flex-col gap-3">
          <SectionLabel>Main</SectionLabel>
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  onClick={onClose}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative flex items-center gap-[10px] rounded-[10px] px-3 py-[10px] text-h5 transition-colors ${
                      isActive
                        ? "bg-surface text-text-primary before:absolute before:top-1/2 before:-left-[14px] before:h-[22px] before:w-[3px] before:-translate-y-1/2 before:rounded-r before:bg-orange"
                        : "text-text-secondary hover:bg-surface"
                    }`
                  }
                >
                  <img src={item.icon} alt="" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto flex flex-col gap-3 pt-6">
        {/* Hidden on short windows so the menu always fits without scrolling. */}
        <div className="[@media(max-height:760px)]:hidden">
          <UpgradePlanCard onNavigate={onClose} />
        </div>
        <div className="border-t border-stroke-secondary pt-3">
          <ProfileMenu onNavigate={onClose} />
        </div>
      </div>
    </aside>
    </>
  );
}
