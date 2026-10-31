import { useMemo, useState, type FormEvent } from "react";
import Button from "../../components/ui/Button";
import BookDemoModal from "../../components/BookDemoModal";
import { Field, Select, TextInput } from "../../components/ui/Field";
import { CURRENT_USER } from "../../data/user";
import searchIcon from "../../assets/icons/search-01.svg";
import mailIcon from "../../assets/icons/mail-line.svg";
import supportIcon from "../../assets/icons/customer-support.svg";
import docIcon from "../../assets/icons/document-attachment.svg";
import checkIcon from "../../assets/icons/check-teal.svg";

const FAQ = [
  { topic: "Time Off", q: "How do I approve a time-off request?", a: "Open Time Off, find the request in the list and use the edit action to approve or decline it. The employee is notified automatically." },
  { topic: "Time Off", q: "Can I set different leave policies per team?", a: "Yes. Policies are configured per team; each team can have its own allowance, carry-over and approval rules." },
  { topic: "Projects", q: "How do I move a task between columns?", a: "In a project’s My Tasks tab, drag a card onto another column. You can also add tasks with the + button on each column." },
  { topic: "Employees", q: "How do I add a new employee?", a: "Go to Employee and click “Add New”, or add someone to a team from Teams → Add Member." },
  { topic: "Account", q: "How do I switch to dark mode?", a: "Click the icon next to the Talentra logo in the sidebar, or choose a theme in Settings → Appearance." },
  { topic: "Account", q: "What happens when my trial ends?", a: "Your workspace moves to the Starter plan and keeps all data. Upgrade any time from the Pricing page." },
];

export default function HelpPage() {
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? FAQ.filter((f) => `${f.q} ${f.a} ${f.topic}`.toLowerCase().includes(q)) : FAQ;
  }, [query]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  const CHANNELS = [
    { icon: mailIcon, title: "Email us", body: "support@talentra.app · replies within 24h", action: <a href="mailto:support@talentra.app" className="text-body1 text-primary hover:underline">Send email</a> },
    { icon: supportIcon, title: "Talk to our team", body: "Book a 30-minute walkthrough of Talentra", action: <button type="button" onClick={() => setDemoOpen(true)} className="self-start text-body1 text-primary hover:underline">Book a demo</button> },
    { icon: docIcon, title: "Documentation", body: "Guides for every feature, step by step", action: <a href="#faq" className="text-body1 text-primary hover:underline">Browse guides</a> },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col items-center gap-4 rounded-xl bg-card px-4 py-10 text-center">
        <h2 className="text-h1">How can we help?</h2>
        <p className="text-h5 text-text-secondary">Search the help centre or get in touch with our team.</p>
        <label className="flex w-full max-w-[520px] items-center gap-[10px] rounded-[10px] border border-stroke-primary px-4 py-3 focus-within:border-primary">
          <img src={searchIcon} alt="" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, e.g. “time off”"
            className="min-w-0 flex-1 bg-transparent text-body1 outline-none placeholder:text-text-tertiary"
          />
        </label>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {CHANNELS.map((c) => (
          <div key={c.title} className="flex flex-col gap-3 rounded-xl bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-[10px] bg-surface">
              <img src={c.icon} alt="" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-h5">{c.title}</p>
              <p className="text-body1 text-text-secondary">{c.body}</p>
            </div>
            {c.action}
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1fr_420px]">
        <section id="faq" className="flex flex-col gap-3 rounded-xl bg-card p-4 sm:p-6">
          <h3 className="text-h4">Frequently asked questions</h3>
          {results.length === 0 && <p className="py-6 text-center text-body1 text-text-tertiary">No answers match “{query}”. Send us a message instead.</p>}
          {results.map((f) => (
            <details key={f.q} className="group rounded-xl border border-stroke-primary px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-h5">
                <span className="flex flex-col gap-1">
                  <span className="text-body2 text-text-tertiary">{f.topic}</span>
                  {f.q}
                </span>
                <span className="text-text-tertiary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="pt-2 text-body1 text-text-secondary">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="flex flex-col gap-4 rounded-xl bg-card p-4 sm:p-6">
          <h3 className="text-h4">Contact support</h3>
          {sent ? (
            <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <img src={checkIcon} alt="" className="size-6" />
              </span>
              <p className="text-h5">Message sent</p>
              <p className="text-body1 text-text-secondary">We’ll reply to {CURRENT_USER.email} within 24 hours.</p>
              <Button onClick={() => setSent(false)}>
                <span>Send another</span>
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <Field label="Topic">
                <Select name="topic" defaultValue="Question">
                  {["Question", "Bug report", "Billing", "Feature request"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Subject">
                <TextInput name="subject" placeholder="Briefly describe your issue" required />
              </Field>
              <Field label="Message">
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us what happened and what you expected…"
                  className="w-full resize-none rounded-[10px] border border-stroke-primary bg-card px-[14px] py-[10px] font-inter text-[14px] leading-5 outline-none placeholder:text-[#737373] focus:border-primary"
                />
              </Field>
              <Button variant="primary" type="submit" className="w-full">
                <span>Send message</span>
              </Button>
            </form>
          )}
        </section>
      </div>

      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
