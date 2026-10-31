import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Switch from "../../components/ui/Switch";
import { Field, Select, TextInput } from "../../components/ui/Field";
import { CURRENT_USER } from "../../data/user";
import { useTheme } from "../../theme";
import checkIcon from "../../assets/icons/check-teal.svg";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "appearance", label: "Appearance" },
] as const;

type Tab = (typeof TABS)[number]["id"];

const NOTIFICATIONS = [
  { id: "timeoff", title: "Time-off requests", body: "When someone on your team requests or cancels time off." },
  { id: "projects", title: "Project updates", body: "Status changes, new tasks and comments on projects you follow." },
  { id: "mentions", title: "Mentions", body: "When someone mentions you in a comment or message." },
  { id: "digest", title: "Weekly digest", body: "A Monday summary of attendance, hiring and project progress." },
];

function SavedNote({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span role="status" className="flex items-center gap-1 text-body1 text-success">
      <img src={checkIcon} alt="" />
      Saved
    </span>
  );
}

function ProfileTab() {
  const [saved, setSaved] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <img src={CURRENT_USER.avatar} alt="" className="size-16 rounded-full object-cover" />
        <div className="flex flex-col gap-1">
          <p className="text-h5">{CURRENT_USER.name}</p>
          <p className="text-body1 text-text-secondary">{CURRENT_USER.role}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label="Full name">
          <TextInput name="name" defaultValue={CURRENT_USER.name} />
        </Field>
        <Field label="Email">
          <TextInput name="email" type="email" defaultValue={CURRENT_USER.email} />
        </Field>
        <Field label="Job title">
          <TextInput name="role" defaultValue={CURRENT_USER.role} />
        </Field>
        <Field label="Time zone">
          <Select name="tz" defaultValue="GMT-07">
            {["GMT-08", "GMT-07", "GMT+00", "GMT+01", "GMT+06"].map((z) => (
              <option key={z}>{z}</option>
            ))}
          </Select>
        </Field>
      </div>
      <div className="flex items-center justify-end gap-4 border-t border-stroke-secondary pt-5">
        <SavedNote show={saved} />
        <Button variant="primary" type="submit">
          <span>Save changes</span>
        </Button>
      </div>
    </form>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState<Record<string, { email: boolean; app: boolean }>>(() =>
    Object.fromEntries(NOTIFICATIONS.map((n, i) => [n.id, { email: i !== 2, app: true }])),
  );
  const set = (id: string, key: "email" | "app", v: boolean) => setPrefs((p) => ({ ...p, [id]: { ...p[id], [key]: v } }));

  return (
    <div className="flex flex-col">
      <div className="hidden grid-cols-[1fr_80px_80px] gap-4 border-b border-stroke-secondary pb-3 text-body1 text-text-tertiary sm:grid">
        <span>Notify me about</span>
        <span className="text-center">Email</span>
        <span className="text-center">In-app</span>
      </div>
      {NOTIFICATIONS.map((n) => (
        <div key={n.id} className="grid grid-cols-1 gap-3 border-b border-stroke-secondary py-4 sm:grid-cols-[1fr_80px_80px] sm:items-center sm:gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-h5">{n.title}</p>
            <p className="text-body1 text-text-secondary">{n.body}</p>
          </div>
          {(["email", "app"] as const).map((k) => (
            <label key={k} className="flex items-center gap-2 text-body1 text-text-secondary sm:justify-center">
              <Switch checked={prefs[n.id][k]} onChange={(v) => set(n.id, k, v)} label={`${n.title} ${k === "email" ? "email" : "in-app"}`} />
              <span className="sm:hidden">{k === "email" ? "Email" : "In-app"}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

function AppearanceTab() {
  const { theme, toggle } = useTheme();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-h5">Theme</p>
        <p className="text-body1 text-text-secondary">Choose how Talentra looks to you. You can also switch from the icon next to the logo.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-[560px]">
        {(["light", "dark"] as const).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => theme !== t && toggle()}
            className={`flex flex-col gap-3 rounded-2xl border p-3 text-left ${theme === t ? "border-primary" : "border-stroke-primary hover:border-text-tertiary"}`}
          >
            <span className={`flex h-24 gap-2 rounded-xl p-2 ${t === "light" ? "bg-[#f5f5f5]" : "bg-[#171717]"}`}>
              <span className={`w-1/4 rounded-lg ${t === "light" ? "bg-white" : "bg-[#0d0d0d]"}`} />
              <span className="flex flex-1 flex-col gap-2">
                <span className={`h-3 w-1/2 rounded ${t === "light" ? "bg-white" : "bg-[#0d0d0d]"}`} />
                <span className={`flex-1 rounded-lg ${t === "light" ? "bg-white" : "bg-[#0d0d0d]"}`} />
              </span>
            </span>
            <span className="flex items-center justify-between text-body1 capitalize">
              {t}
              {theme === t && <img src={checkIcon} alt="Selected" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [params, setParams] = useSearchParams();
  const tab: Tab = TABS.find((t) => t.id === params.get("tab"))?.id ?? "profile";

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-h4">Settings</h2>
        <p className="text-body1 text-text-secondary">Manage your profile, notifications and how the app looks.</p>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b border-stroke-secondary" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setParams(t.id === "profile" ? {} : { tab: t.id })}
            className={`-mb-px shrink-0 px-[14px] py-2 text-h5 ${tab === t.id ? "border-b-[1.5px] border-text-primary" : "text-text-secondary hover:text-text-primary"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-2">
        {tab === "profile" && <ProfileTab />}
        {tab === "notifications" && <NotificationsTab />}
        {tab === "appearance" && <AppearanceTab />}
      </div>
    </div>
  );
}
