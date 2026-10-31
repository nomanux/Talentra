import { useState } from "react";
import BookDemoModal from "../../components/BookDemoModal";
import { TRIAL } from "../../data/user";
import checkIcon from "../../assets/icons/check-teal.svg";
import starIcon from "../../assets/icons/star-06.svg";

type Billing = "monthly" | "yearly";

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  features: string[];
  cta: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For small teams getting organised.",
    monthly: 0,
    cta: "Downgrade to Starter",
    features: ["Up to 10 employees", "Dashboard & employee directory", "Time-off requests", "Basic calendar", "Email support"],
  },
  {
    name: "Pro",
    tagline: "Everything a growing HR team needs.",
    monthly: 12,
    cta: "Upgrade to Pro",
    highlight: true,
    features: [
      "Unlimited employees",
      "Projects, tasks & kanban boards",
      "Advanced time-off rules & approvals",
      "Documents with version history",
      "All integrations (Slack, Google Drive…)",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Security and control at scale.",
    monthly: null,
    cta: "Talk to sales",
    features: ["Everything in Pro", "SSO & SCIM provisioning", "Custom roles & permissions", "Audit log & data residency", "Dedicated success manager"],
  },
];

const FAQ = [
  { q: "What happens when my trial ends?", a: "Your workspace switches to the Starter plan. Nothing is deleted — upgrade any time to unlock Pro features again." },
  { q: "How is pricing calculated?", a: "Pro is billed per active employee per month. Yearly billing saves 20% compared to paying monthly." },
  { q: "Can I change plans later?", a: "Yes. Upgrades apply immediately and downgrades take effect at the end of your current billing period." },
];

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("yearly");
  const [demoOpen, setDemoOpen] = useState(false);
  const [chosen, setChosen] = useState<string | null>(null);

  const price = (p: Plan) => {
    if (p.monthly === null) return "Custom";
    if (p.monthly === 0) return "$0";
    return `$${billing === "yearly" ? (p.monthly * 0.8).toFixed(2).replace(/\.00$/, "") : p.monthly}`;
  };

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-card px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-[560px] flex-col items-center gap-3 text-center">
        <span className="rounded-full bg-orange-alpha-10 px-3 py-1 text-body2 text-orange">
          {TRIAL.plan} · {TRIAL.daysLeft} days left
        </span>
        <h2 className="text-h1">Choose the plan that fits your team</h2>
        <p className="text-h5 text-text-secondary">Start free, upgrade when you're ready. Every plan includes unlimited admins.</p>
        <div className="mt-2 flex rounded-[10px] bg-surface p-1" role="tablist" aria-label="Billing period">
          {(["monthly", "yearly"] as const).map((b) => (
            <button
              key={b}
              type="button"
              role="tab"
              aria-selected={billing === b}
              onClick={() => setBilling(b)}
              className={`rounded-md px-4 py-1 text-body1 capitalize ${billing === b ? "bg-card shadow-sm" : "text-text-secondary"}`}
            >
              {b}
              {b === "yearly" && <span className="ml-1 text-primary">−20%</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col gap-6 rounded-2xl border p-6 ${p.highlight ? "border-primary shadow-[0_8px_40px_0_rgba(20,184,166,0.12)]" : "border-stroke-primary"}`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-6 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-body2 text-white">
                <img src={starIcon} alt="" className="size-3 brightness-0 invert" />
                Most popular
              </span>
            )}
            <div className="flex flex-col gap-2">
              <p className="text-h4">{p.name}</p>
              <p className="text-body1 text-text-secondary">{p.tagline}</p>
            </div>
            <p className="flex items-baseline gap-1">
              <span className="text-h1">{price(p)}</span>
              {p.monthly !== null && p.monthly > 0 && <span className="text-body1 text-text-secondary">/ user / month</span>}
            </p>
            <button
              type="button"
              onClick={() => (p.monthly === null ? setDemoOpen(true) : setChosen(p.name))}
              className={`rounded-lg px-4 py-[10px] text-body1 ${
                p.highlight ? "bg-primary text-white hover:bg-primary-dark" : "border border-stroke-primary hover:bg-surface"
              }`}
            >
              {chosen === p.name ? "Selected ✓" : p.cta}
            </button>
            <ul className="flex flex-col gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-body1 text-text-secondary">
                  <img src={checkIcon} alt="" className="mt-[2px] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {chosen && (
        <p role="status" className="rounded-lg bg-success-alpha-10 px-4 py-3 text-center text-body1 text-success">
          {chosen} plan selected. Billing setup isn’t connected in this demo, so no charge was made.
        </p>
      )}

      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-3 pt-4">
        <h3 className="text-h4">Frequently asked questions</h3>
        {FAQ.map((f) => (
          <details key={f.q} className="group rounded-xl border border-stroke-primary px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-h5">
              {f.q}
              <span className="text-text-tertiary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="pt-2 text-body1 text-text-secondary">{f.a}</p>
          </details>
        ))}
      </div>

      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
