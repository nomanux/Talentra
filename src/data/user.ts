import avatar from "../assets/employees/charlotte.png";

/** The signed-in demo user shown in the sidebar profile and on the Settings page. */
export const CURRENT_USER = {
  name: "Charlotte Avana",
  email: "charlotteavana@gmail.com",
  role: "UI Designer",
  avatar,
};

/** Trial state used by the sidebar upgrade card and the Pricing page. */
export const TRIAL = { totalDays: 30, daysLeft: 12, plan: "Pro trial" };
