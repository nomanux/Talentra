import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DatePicker from "../ui/DatePicker";
import { Overlay } from "../ui/Modal";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CommandPalette, LANGUAGES, LanguageMenu } from "./TopBarPopups";
import calendarIcon from "../../assets/icons/calendar-02.svg";
import chevronDown from "../../assets/icons/angle-small-down.svg";
import searchIcon from "../../assets/icons/search-01.svg";
import commandIcon from "../../assets/icons/command.svg";
import notificationIcon from "../../assets/icons/notification-01.svg";
import flagUs from "../../assets/icons/flag-us.svg";
import giftIcon from "../../assets/icons/gift.svg";
import menuIcon from "../../assets/icons/list-view.svg";

type Popup = "date" | "language" | "search" | null;

const formatDate = (d: Date) => `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

/** Dims the page behind an open top-bar popup; the header itself stays above it. */
function Backdrop({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return createPortal(<Overlay onClick={onClose} />, document.body);
}

export default function TopBar({
  title,
  showDate = false,
  initialPopup = null,
  onMenu,
}: {
  title: string;
  showDate?: boolean;
  initialPopup?: Popup;
  onMenu?: () => void;
}) {
  const [popup, setPopup] = useState<Popup>(initialPopup);
  const [date, setDate] = useState(new Date(2005, 2, 23));
  const [language, setLanguage] = useState(3);
  const [query, setQuery] = useState("");
  const [referralOpen, setReferralOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const close = useCallback(() => setPopup(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopup(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPopup("search");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const lang = LANGUAGES[language];
  const inviteLink = `${window.location.origin}/signup?ref=TALENTRA100`;

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setLinkCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      setLinkCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <header className={`flex items-center justify-between gap-2 ${popup ? "relative z-[60]" : ""}`}>
      <Backdrop open={popup !== null} onClose={close} />
      <div className="flex min-w-0 items-center gap-2 sm:gap-4">
        <button type="button" aria-label="Open menu" onClick={onMenu} className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-card lg:hidden">
          <img src={menuIcon} alt="" />
        </button>
        <h1 className="truncate text-h4 whitespace-nowrap">{title}</h1>
        {showDate && (
          <div className="relative hidden md:block">
          <button
            type="button"
            aria-expanded={popup === "date"}
            onClick={() => setPopup("date")}
            className="flex h-[38px] items-center gap-2 rounded-[22px] bg-card px-[14px] py-[10px] text-body1 text-text-secondary"
          >
            <img src={calendarIcon} alt="" />
            {formatDate(date)}
            <img src={chevronDown} alt="" />
          </button>
          {popup === "date" && (
            <div className="absolute top-[45px] left-0 xl:-left-[115px]">
              <DatePicker
                value={date}
                marked={[new Date(date.getFullYear(), date.getMonth(), 16)]}
                onChange={(d) => {
                  setDate(d);
                  close();
                }}
              />
            </div>
          )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-[10px]">
        <button
          type="button"
          aria-label="Search"
          onClick={() => setPopup("search")}
          className="flex size-[38px] items-center justify-center rounded-full bg-card md:hidden"
        >
          <img src={searchIcon} alt="" />
        </button>
        <label className="hidden h-[38px] w-[200px] cursor-text md:flex xl:w-[261px] items-center gap-2 rounded-[22px] bg-card p-[10px]">
          <img src={searchIcon} alt="" />
          <input
            value={query}
            onFocus={() => setPopup("search")}
            onChange={(e) => {
              setQuery(e.target.value);
              setPopup("search");
            }}
            placeholder="Search here..."
            className="min-w-0 flex-1 bg-transparent text-body1 outline-none placeholder:text-text-tertiary"
          />
          <span className="flex h-6 items-center gap-[2px] rounded px-[6px] text-body2 text-text-secondary">
            <img src={commandIcon} alt="" />K
          </span>
        </label>

        <button type="button" aria-label="Notifications" className="relative flex h-[41px] w-[38px] items-center justify-center rounded-full bg-card">
          <span className="relative size-4 shrink-0">
            <img src={notificationIcon} alt="" className="absolute -top-[2px] left-0" />
          </span>
        </button>

        <div className="relative">
        <button
          type="button"
          aria-expanded={popup === "language"}
          onClick={() => setPopup("language")}
          className="flex h-[41px] items-center justify-center gap-[6px] rounded-full bg-card px-3 text-body1 whitespace-nowrap sm:w-[125px] sm:px-[30px] [&>img]:shrink-0"
        >
          {language === 3 ? <img src={flagUs} alt="" /> : <img src={lang.flag} alt="" className="h-[14px] w-[19px] object-cover" />}
          <span className="hidden sm:inline">{lang.label}</span>
          <img src={chevronDown} alt="" className="hidden sm:block" />
        </button>
          {popup === "language" && (
            <div className="absolute top-[45px] right-0 sm:right-auto sm:-left-[65px]">
              <LanguageMenu
                value={language}
                onSelect={(i) => {
                  setLanguage(i);
                  close();
                }}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setReferralOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={referralOpen}
          className="flex h-[41px] items-center justify-center gap-[6px] rounded-full border-[0.777px] border-white/10 bg-orange px-3 sm:w-[125px] sm:px-[30px] font-inter text-[14px] leading-5 font-medium whitespace-nowrap text-white hover:brightness-95"
        >
          <span className="flex size-4 shrink-0 items-center justify-center">
            <img src={giftIcon} alt="" />
          </span>
          <span className="hidden sm:inline">Earn $100</span>
        </button>
      </div>

      <Modal
        open={referralOpen}
        onClose={() => setReferralOpen(false)}
        title="Earn $100"
        width={480}
        footer={
          <Button onClick={() => setReferralOpen(false)}>Done</Button>
        }
      >
        <div className="flex flex-col gap-4 px-6 py-5">
          <div>
            <p className="text-body1 text-text-secondary">Invite someone to try Talentra by sharing this signup link.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-stroke-primary bg-surface p-2">
            <span className="min-w-0 flex-1 truncate px-2 text-body2 text-text-secondary">{inviteLink}</span>
            <Button variant="outlinePrimary" onClick={copyInviteLink}>
              <span>{linkCopied ? "Copied" : "Copy link"}</span>
            </Button>
          </div>
          {copyFailed && <p role="status" className="text-body2 text-error">Couldn’t copy the link. You can send it by email instead.</p>}
          <a
            href={`mailto:?subject=${encodeURIComponent("Join me on Talentra")}&body=${encodeURIComponent(`Get started with Talentra: ${inviteLink}`)}`}
            className="self-start text-body1 text-primary hover:underline"
          >
            Send invite by email
          </a>
        </div>
      </Modal>

      <CommandPalette open={popup === "search"} query={query} onClose={close} />
    </header>
  );
}
