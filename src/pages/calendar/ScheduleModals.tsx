import { useState, type ReactNode } from "react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import DatePicker from "../../components/ui/DatePicker";
import caretLine from "../../assets/calendar/caret-line.svg";
import calendarEvent01 from "../../assets/icons/calendar-event-outline-01.svg";
import taskList from "../../assets/icons/task-list.svg";
import calendarOutline02 from "../../assets/icons/calendar-outline-02.svg";
import calendarEvent02 from "../../assets/icons/calendar-event-outline-02.svg";
import videoOutline from "../../assets/icons/video-outline.svg";
import videoScan from "../../assets/icons/video-scan-fill.svg";
import clockCircle from "../../assets/icons/clock-circle.svg";
import clockPlay from "../../assets/icons/clock-play-fill.svg";
import mailOpen from "../../assets/icons/mail-open.svg";
import mailUnlock from "../../assets/icons/mail-unlock.svg";
import addDark from "../../assets/icons/add-outline-dark.svg";
import internet from "../../assets/icons/internet.svg";
import aiImage from "../../assets/icons/ai-image.svg";
import arrowUp from "../../assets/icons/arrow-up-white.svg";
import userCircle from "../../assets/icons/user-circle.svg";
import plusSign from "../../assets/icons/plus-sign-fill.svg";
import tagOutline from "../../assets/icons/tag-outline.svg";
import flagOutline from "../../assets/icons/flag-outline.svg";
import flagTriangle from "../../assets/icons/flag-triangle.svg";
import clock18 from "../../assets/icons/clock-circle-18.svg";
import calendar16 from "../../assets/icons/calendar-event-16.svg";
import clock16 from "../../assets/icons/clock-circle-16.svg";
import checkSquare from "../../assets/icons/check-square.svg";
import layoutGrid from "../../assets/icons/layout-grid.svg";
import editOutline from "../../assets/icons/edit-outline.svg";
import deleteTrash from "../../assets/icons/delete-trash.svg";
import calendarFill from "../../assets/icons/calendar-fill-03.svg";
import radioOn from "../../assets/icons/radio-on.svg";
import radioOff from "../../assets/icons/radio-off.svg";
import checkboxBlue from "../../assets/icons/checkbox-blue.svg";
import checkboxTeal from "../../assets/icons/checkbox-teal.svg";
import googleDrive from "../../assets/icons/google-drive.svg";
import avatar1 from "../../assets/avatars/avatar-1.png";
import avatar2 from "../../assets/avatars/avatar-2.png";
import avatar3 from "../../assets/avatars/avatar-3.png";
import avatar4 from "../../assets/avatars/avatar-4.png";

type Tab = "event" | "task" | "appointment";

const TABS: { id: Tab; label: string; icon: string; count: number }[] = [
  { id: "event", label: "Event", icon: calendarEvent01, count: 3 },
  { id: "task", label: "Task", icon: taskList, count: 4 },
  { id: "appointment", label: "Appointment Schedule", icon: calendarOutline02, count: 1 },
];

function Row({ icon, label, labelFont = "font-sans", children }: { icon: string; label: string; labelFont?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:gap-0">
      <span className={`flex w-[150px] shrink-0 items-center gap-[6px] pt-[2px] text-[14px] leading-5 font-medium tracking-[-0.14px] text-text-secondary ${labelFont}`}>
        <img src={icon} alt="" />
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2 text-body1">{children}</div>
    </div>
  );
}

function Pill({ icon, className, children }: { icon?: string; className: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-[2px] rounded-full px-1 py-[2px] text-body1 ${className}`}>
      {icon && <img src={icon} alt="" />}
      <span className="px-[2px]">{children}</span>
    </span>
  );
}

function Chip({ icon, avatar, children, onClick, inter }: { icon?: string; avatar?: string; children: ReactNode; onClick?: () => void; inter?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-[2px] rounded-md border border-stroke-primary bg-card px-[6px] py-1 hover:bg-surface ${
        inter ? "font-inter text-[12px] leading-4 font-medium tracking-[-0.12px]" : "text-body1"
      }`}
    >
      {icon && <img src={icon} alt="" />}
      {avatar && <img src={avatar} alt="" className="size-4 rounded-full object-cover" />}
      <span className="px-1">{children}</span>
    </button>
  );
}

function TitleInput({ placeholder, large }: { placeholder: string; large?: boolean }) {
  return (
    <label className="flex items-center gap-1 border-b-[1.5px] border-primary px-3 py-3">
      <img src={caretLine} alt="" className="rotate-90" />
      <input
        placeholder={placeholder}
        className={`min-w-0 flex-1 bg-transparent outline-none ${
          large
            ? "text-[24px] leading-8 font-normal tracking-[0.24px] placeholder:text-[#d4d4d4]"
            : "text-[20px] leading-7 font-medium placeholder:text-text-disabled"
        }`}
      />
    </label>
  );
}

function DescriptionInput() {
  return (
    <div className="flex h-[188px] flex-col gap-2">
      <span className="text-body1">Add Description</span>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-stroke-primary">
        <textarea
          className="flex-1 resize-none p-3 text-body1 outline-none"
          defaultValue="Complete website redesign for Acme Corporation, including new branding elements, responsive layouts, and improved user experience across all pages."
        />
        <div className="flex items-end gap-2 px-2 pb-2">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <button type="button" aria-label="Add" className="rounded-md bg-surface p-1">
              <img src={addDark} alt="" />
            </button>
            <button type="button" className="flex items-center rounded-md bg-surface px-[6px] py-1 text-body1">
              <img src={internet} alt="" />
              <span className="px-1">Search</span>
            </button>
            <button type="button" className="flex items-center rounded-md bg-surface px-[6px] py-1 text-body1">
              <img src={aiImage} alt="" />
              <span className="px-1">Create Image</span>
            </button>
          </div>
          <button type="button" aria-label="Send" className="rounded-md bg-info p-1">
            <img src={arrowUp} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EventForm() {
  return (
    <>
      <TitleInput placeholder="Add Title" large />
      <div className="flex flex-col gap-5">
        <Row icon={calendarEvent02} label="Event type:">
          <span className="text-text-primary">Design Meet</span>
        </Row>
        <Row icon={videoScan} label="Video type:">
          <Pill icon={videoOutline} className="bg-orange-alpha-10 text-primary">Video Conferencing</Pill>
        </Row>
        <Row icon={clockPlay} label="Duration:">
          <Pill icon={clockCircle} className="bg-info-alpha-10 text-[#1d4ed8]">30 minutes</Pill>
        </Row>
        <Row icon={mailUnlock} label="Email:">
          <Pill icon={mailOpen} className="bg-[rgba(255,200,76,0.1)] text-[#a16207]">gmail@columnui.com</Pill>
        </Row>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-body1">Add Guests</span>
        <input
          placeholder="Alexsmiht"
          className="rounded-[10px] border border-stroke-primary px-[14px] py-[10px] font-inter text-[14px] leading-5 tracking-[-0.14px] shadow-[0_1px_2px_0_rgba(10,10,10,0.05)] outline-none placeholder:text-[#737373] focus:border-primary"
        />
      </label>
      <DescriptionInput />
    </>
  );
}

function TaskForm() {
  return (
    <>
      <TitleInput placeholder="Task Name" />
      <div className="flex flex-col gap-5">
        <Row icon={userCircle} label="Assignees:">
          <Chip avatar={avatar3}>Indonira Ship</Chip>
          <Chip avatar={avatar4}>Malko smith</Chip>
          <button type="button" aria-label="Add assignee" className="rounded-full border border-dashed border-primary bg-[#f3e8ff] p-[2px]">
            <img src={addDark} alt="" />
          </button>
        </Row>
        <Row icon={calendarEvent02} label="Deadline:">
          <span className="text-text-primary">23 Jan 2023</span>
        </Row>
        <Row icon={tagOutline} label="Tags:">
          <span className="rounded-md bg-orange-alpha-10 px-2 py-1 text-[#b91c1c]">UX/UI</span>
          <span className="rounded-md bg-[rgba(224,242,254,0.1)] px-2 py-1 text-info">Website Design</span>
          <button type="button" className="flex items-center gap-[2px] rounded-md px-[6px] py-1 text-text-tertiary hover:bg-surface">
            <img src={plusSign} alt="" />
            <span className="px-[2px]">Add More</span>
          </button>
        </Row>
        <Row icon={flagTriangle} label="Priority:">
          <Pill icon={flagOutline} className="bg-[rgba(254,249,195,0.1)] text-[#ffc84c]">Badge</Pill>
        </Row>
      </div>
      <DescriptionInput />
    </>
  );
}

function AppointmentForm() {
  const [date, setDate] = useState(new Date(2024, 1, 23));
  const [pickerOpen, setPickerOpen] = useState(false);
  const label = `${date.toLocaleDateString("en-US", { weekday: "long" })}, ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "long" })}`;

  return (
    <div className="flex flex-col gap-6">
      <Row icon={clock18} label="Deadline" labelFont="font-inter">
        <div className="relative flex flex-wrap gap-2 sm:gap-4">
          <Chip icon={calendar16} inter onClick={() => setPickerOpen((o) => !o)}>
            {label}
          </Chip>
          <div className="flex gap-2">
            <Chip icon={clock16} inter>12:00 am</Chip>
            <Chip icon={clock16} inter>1:00 pm</Chip>
          </div>
          {pickerOpen && (
            <div className="absolute top-9 left-0 z-10 sm:-left-[63px]">
              <DatePicker
                value={date}
                marked={[new Date(2024, 0, 16)]}
                onChange={(d) => {
                  setDate(d);
                  setPickerOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </Row>
      <Row icon={checkSquare} label="Availability" labelFont="font-inter">
        <div className="flex flex-col gap-[10px]">
          <span className="font-inter text-[14px] leading-5 font-medium tracking-[-0.14px]">Add availability to an existing schedule</span>
          <div className="flex flex-wrap items-center gap-2">
            <Chip icon={layoutGrid} inter>Appointment times smith</Chip>
            <button type="button" aria-label="Edit" className="rounded-full border border-stroke-primary bg-card p-1 hover:bg-surface">
              <img src={editOutline} alt="" />
            </button>
            <button type="button" aria-label="Delete" className="rounded-full border border-stroke-primary bg-card p-1 hover:bg-surface">
              <img src={deleteTrash} alt="" />
            </button>
          </div>
        </div>
      </Row>
    </div>
  );
}

export function AddScheduleModal({ open, onClose, initialTab }: { open: boolean; onClose: () => void; initialTab?: string | null }) {
  const [tab, setTab] = useState<Tab>(TABS.find((t) => t.id === initialTab)?.id ?? "event");
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Schedule"
      footer={
        <>
          <Button onClick={onClose}>
            <span>Cancel</span>
          </Button>
          <Button variant="primary" onClick={onClose}>
            <span>Save</span>
          </Button>
        </>
      }
    >
      <div className="mt-5 flex overflow-x-auto border-b border-stroke-primary px-3 sm:px-6" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`-mb-px flex shrink-0 items-center gap-[2px] px-3 pt-2 pb-4 text-body1 whitespace-nowrap ${
              tab === t.id ? "border-b-2 border-primary text-primary" : "text-text-secondary"
            }`}
          >
            <span className="p-[2px]">
              <img src={t.icon} alt="" />
            </span>
            <span className="px-1">{t.label}</span>
            <span className="rounded-full bg-orange-alpha-10 px-[6px] py-[2px] font-inter text-[12px] leading-4 font-medium text-primary">{t.count}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-5 px-4 py-5 sm:px-6">
        {tab === "event" && <EventForm />}
        {tab === "task" && <TaskForm />}
        {tab === "appointment" && <AppointmentForm />}
      </div>
    </Modal>
  );
}

const ACCOUNTS = [
  { email: "exampleemail@gmail.com", avatar: avatar1 },
  { email: "exampleemail2@gmail.com", avatar: avatar2 },
];

const CALENDARS = [
  { label: "Event", icon: checkboxBlue },
  { label: "Task New", icon: checkboxTeal },
  { label: "Job", icon: checkboxTeal },
];

export function EventDetailsModal({ title, onClose }: { title: string | null; onClose: () => void }) {
  const [account, setAccount] = useState(0);
  const [checked, setChecked] = useState([true, true, true]);
  return (
    <Modal open={title !== null} onClose={onClose} title={title ?? ""} width={414}>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          <span className="font-inter text-[14px] leading-5 tracking-[-0.14px]">ColumnUI Calendar</span>
          <div className="flex items-center rounded-2xl border border-[rgba(27,97,54,0.15)] bg-card p-2 drop-shadow-[0_16px_26px_rgba(191,241,194,0.08)]">
            <span className="rounded-full bg-[#bbf7d0] p-2">
              <img src={calendarFill} alt="" />
            </span>
            <p className="flex-1 p-2 font-inter text-[12px] leading-4 tracking-[-0.24px] text-text-secondary">
              Select the calendars you want to export to the Google Calendar. Follow also imports all your calendars Google
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-body1">Connected Account</span>
          {ACCOUNTS.map((a, i) => (
            <button
              key={a.email}
              type="button"
              role="radio"
              aria-checked={account === i}
              onClick={() => setAccount(i)}
              className="flex items-center justify-between rounded-lg border border-stroke-primary bg-card px-[10px] py-3"
            >
              <span className="flex items-center gap-2 text-body2">
                <img src={a.avatar} alt="" className="size-4 rounded-full" />
                {a.email}
              </span>
              <img src={account === i ? radioOn : radioOff} alt="" />
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {CALENDARS.map((c, i) => (
            <label key={c.label} className="flex cursor-pointer items-center gap-2 text-body2">
              <input
                type="checkbox"
                className="sr-only"
                checked={checked[i]}
                onChange={() => setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))}
              />
              {checked[i] ? <img src={c.icon} alt="" /> : <span className="size-4 rounded border border-stroke-primary" />}
              {c.label}
            </label>
          ))}
        </div>
        <button type="button" className="flex items-center justify-center gap-[2px] rounded-[10px] border border-stroke-primary bg-card px-3 py-[10px] text-body1 hover:bg-surface">
          <img src={googleDrive} alt="" />
          <span className="px-1">Add Account</span>
        </button>
      </div>
    </Modal>
  );
}
