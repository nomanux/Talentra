export type DayEventTone = "blue" | "green" | "orange";

export type DayEvent = {
  title: string;
  time: string;
  tone: DayEventTone;
  /** Position inside the time grid, taken from the Figma frame. */
  top: number;
  left: number;
  size?: "sm" | "md" | "lg";
};

export const HOURS = [
  "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm",
  "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am",
];

export const CURRENT_HOUR = "11am";

export const DAY_EVENTS: DayEvent[] = [
  { title: "Vyměnit šablony", time: "01:00-1:10 am", tone: "blue", top: 69, left: 62 },
  { title: "Upravit gramatiku", time: "01:00-1:00 am", tone: "orange", top: 69, left: 307, size: "md" },
  { title: "Zautomatizovat aplikaci", time: "4:00-4:40 am", tone: "green", top: 189, left: 62, size: "sm" },
  { title: "Seskupit databázi", time: "4:00-5:10 am", tone: "blue", top: 189, left: 340 },
  { title: "Vytvořit nový proces", time: "7:00-7:30 am", tone: "blue", top: 309, left: 62, size: "sm" },
  { title: "Vypracovat dokumentaci", time: "9:00-9:00 am", tone: "orange", top: 381, left: 62 },
  { title: "Zefektivnit logistiku", time: "12:00-1:30 pm", tone: "blue", top: 525, left: 62 },
  { title: "Nabrat nové zaměstnance", time: "3:00-4:00 pm", tone: "green", top: 621, left: 62 },
  { title: "Vytvořit databázi", time: "5:30-6:30 pm", tone: "blue", top: 717, left: 62 },
  { title: "Zorganizovat firemní akci", time: "5:30-6:30 pm", tone: "orange", top: 717, left: 309 },
  { title: "Vytvořit nový proces", time: "7:50-8:20 pm", tone: "green", top: 815, left: 62, size: "sm" },
  { title: "Naprogramovat aplikaci", time: "7:30-8:00 pm", tone: "blue", top: 815, left: 319 },
];

export type MonthTone = "yellow" | "blue" | "orange" | "pink" | "green";

export type MonthCell = {
  label: string;
  muted?: boolean;
  today?: boolean;
  tone?: MonthTone;
  events?: string[];
};

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const MONTH_CELLS: MonthCell[] = [
  { label: "29", muted: true },
  { label: "30", muted: true },
  { label: "31", muted: true, tone: "yellow", events: ["DUTY_FLORES", "DutyTime_Bowden_D", "DutyTime_Murray_M"] },
  { label: "1" },
  { label: "2", today: true, tone: "blue", events: ["TOST-1-001", "flat-34-rec", "TOOL_ALLOWANCE003"] },
  { label: "3" },
  { label: "4", tone: "orange", events: ["Union_2", "flat-ca-11-ei", "DUTY_ROMAIN"] },
  { label: "5", tone: "orange", events: ["Job Id : 123456", "DUTY_VERSCHUEREN", "TOST-AM"] },
  { label: "6" },
  { label: "7", tone: "orange", events: ["DutyTime_Haynes_S", "MECHANIC_NURSE", "DUTY_CHLEBOWSKI"] },
  { label: "8" },
  { label: "9" },
  { label: "10" },
  { label: "11", tone: "yellow", events: ["DutyTime_Gerard_B", "DutyTime_McAskin_W", "nix-ca-legacy-od-one"] },
  { label: "12" },
  { label: "13" },
  { label: "14" },
  { label: "15", tone: "pink", events: ["AUTO-BVRW7L-999", "AUTO-BVRW7L-998", "DUTY_ROACH"] },
  { label: "16" },
  { label: "0NE2402", tone: "green", events: ["Job Id : 123456", "Job Id : 123456", "Job Id : 123456"] },
  { label: "18" },
  { label: "19" },
  { label: "20", tone: "green", events: ["TOST-2-002", "DUTY_THAVAM", "DutyTime_Bourne_C"] },
  { label: "21" },
  { label: "22" },
  { label: "23" },
  { label: "24" },
  { label: "25" },
  { label: "26", tone: "blue", events: ["DUTY_MARQUIS", "Mechanic_Bradshaw", "ca-one-flat2"] },
  { label: "27" },
  { label: "28" },
  { label: "29", tone: "orange", events: ["MECHANIC_WARREN", "hourly-od", "DUTY_STRICKLAND"] },
  { label: "30" },
  { label: "31", tone: "orange", events: ["guar-PT", "AUTO-UI-UOHNQWJT", "DUTY_KIRUPAKARAN"] },
  { label: "1", muted: true },
];
