import { useState } from "react";
import more2 from "../../../assets/icons/more-2-fill.svg";
import unreadDot from "../../../assets/mail/unread-dot.svg";
import chevron from "../../../assets/icons/arrow-right-s-line-12.svg";
import senderRing from "../../../assets/mail/sender-ring.svg";
import mailUnread from "../../../assets/icons/mail-unread.svg";
import closeFill from "../../../assets/icons/close-fill.svg";
import emotion from "../../../assets/icons/emotion.svg";
import attach from "../../../assets/icons/attachment-2.svg";
import sent from "../../../assets/icons/sent.svg";
import sender from "../../../assets/mail/sender.png";
import replyAvatar from "../../../assets/mail/reply-avatar.png";

const avatars = import.meta.glob<string>("../../../assets/mail/avatar-*.png", { eager: true, import: "default" });
const AVATARS = Array.from({ length: 10 }, (_, i) => avatars[`../../../assets/mail/avatar-${i + 1}.png`]);

type Mail = { id: number; avatar: string; unread: boolean; archived?: boolean };

const MAILS: Mail[] = AVATARS.map((avatar, i) => ({ id: i, avatar, unread: [0, 3, 4, 6, 8, 9].includes(i), archived: i === 5 }));

const FILTERS = ["All Mails", "Unread", "Archive"] as const;

const REPLY = `Hi Jane,
Thank you for reaching out and for sharing your proposal!

After reviewing the attached document, I'm impressed by the alignment between our companies' strengths, particularly in driving customer retention through innovative solutions.

I'd like to explore this further and discuss how we can tailor the partnership to maximize mutual benefits. Are you available for a call or meeting next week? I'm free on Friday 20 Dec.
Warm regards,
John Smith`;

export default function CommunicationTab() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All Mails");
  const [selected, setSelected] = useState(3);
  const [replyOpen, setReplyOpen] = useState(true);

  const visible = MAILS.filter((m) => (filter === "Unread" ? m.unread : filter === "Archive" ? m.archived : true));

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-card lg:h-[856px] lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-stroke-secondary lg:w-[360px] lg:border-r lg:border-b-0">
        <div className="flex items-center gap-3 px-4 pt-5 pb-3 sm:px-[25px]">
          <div className="flex gap-1 rounded-[10px] bg-surface p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-md p-1 text-center text-body1 ${f === "All Mails" ? "w-[92px]" : "w-[86px]"} ${
                  filter === f ? "bg-card shadow-[0_6px_10px_0_rgba(14,18,27,0.06),0_2px_4px_0_rgba(14,18,27,0.03)]" : "text-text-tertiary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Mail options" className="flex size-9 shrink-0 items-center rounded-lg border border-surface bg-card pl-[7px]">
            <img src={more2} alt="" />
          </button>
        </div>
        <ul className="flex max-h-[320px] flex-col overflow-y-auto px-4 pb-3 lg:max-h-none lg:pb-0">
          {visible.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setSelected(m.id)}
                className={`flex w-full gap-3 rounded-xl px-2 py-[7px] text-left ${selected === m.id ? "bg-surface" : "hover:bg-surface/60"}`}
              >
                <img src={m.avatar} alt="" className="size-[33px] shrink-0 rounded-full" />
                <div className="flex flex-1 flex-col gap-[3px]">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <span className="text-body2 opacity-50">Muhammad hasan</span>
                      <span className="text-body1">Contract Renewal Due</span>
                    </div>
                    <span className="text-[14px] text-text-tertiary">9:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`min-w-0 flex-1 text-body2 ${m.unread ? "text-text-primary" : "text-text-tertiary"}`}>
                      Hi hasan, Thank you for attending the product...
                    </p>
                    {m.unread && <img src={unreadDot} alt="Unread" />}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="relative m-3 flex min-w-0 flex-1 flex-col rounded-lg border border-stroke-primary sm:m-6">
        <header className="flex min-h-[71px] flex-wrap items-center gap-3 border-b border-stroke-primary px-4 py-3">
          <div className="relative size-12 shrink-0">
            <img src={sender} alt="" className="absolute top-[3px] left-[3px] size-[42px] rounded-full" />
            <img src={senderRing} alt="" className="absolute inset-0" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="flex flex-wrap items-center gap-x-4">
              <span className="text-body1 whitespace-nowrap">Muhammad hasan</span>
              <span className="text-body2 text-text-tertiary">muhammad@gamil.com</span>
            </p>
            <p className="flex items-center gap-3 text-[12px]">
              <span className="text-text-tertiary">To:</span>
              <span className="flex items-center">
                Richard Brown
                <img src={chevron} alt="" className="rotate-90" />
              </span>
            </p>
          </div>
          <span className="hidden text-body2 text-text-tertiary sm:inline">10 Jan 2025 9:00</span>
          <button type="button" aria-label="Mark unread" className="ml-auto xl:ml-[106px]">
            <img src={mailUnread} alt="" />
          </button>
          <button type="button" aria-label="More" className="ml-5">
            <img src={more2} alt="" />
          </button>
        </header>

        <article className="flex flex-col gap-5 px-4 pt-6 pb-6 text-body1 sm:px-6 lg:pb-0">
          <p>Proposal for Parnership</p>
          <p>Hi Muhammad Hasan,</p>
          <p>
            hope this message finds you well! I'm reaching out to explore a potential partnership between our companies. At Jane Corp, which could
            complement your offerings at John Organisation Corp.
          </p>
          <p>
            I've attached a proposal detailing how we envision our collaboration, including key benefits, timelines, and implementation strategies. I
            believe this partnership could unlock exciting opportunities for both of us!
            <br />
            Let me know your thoughts or a convenient time to discuss this further. I'm happy to schedule a call or meeting at your earliest
            convenience. Looking forward to hearing from you!
          </p>
          <p>
            Warm regards,
            <br />
            Jane Doe
          </p>
        </article>

        {replyOpen ? (
          <div className="m-[5px] mt-0 flex h-[335px] flex-col lg:absolute lg:right-[5px] lg:bottom-[5px] lg:left-[2px] lg:m-0 rounded-lg border border-stroke-primary bg-surface px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={replyAvatar} alt="" className="size-8 rounded-full" />
                <span className="flex items-center gap-3 text-[12px]">
                  <span className="text-text-tertiary">To:</span>
                  <span className="flex items-center">
                    Rakibul Islam
                    <img src={chevron} alt="" className="rotate-90" />
                  </span>
                </span>
              </div>
              <button type="button" aria-label="Close reply" onClick={() => setReplyOpen(false)}>
                <img src={closeFill} alt="" />
              </button>
            </div>
            <textarea defaultValue={REPLY} className="mt-3 flex-1 resize-none bg-transparent text-body2 outline-none" />
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg bg-primary px-[14px] py-2 text-body1 text-white hover:bg-primary-dark">
                Send Now
              </button>
              {[emotion, attach, sent, more2].map((icon, i) => (
                <button key={i} type="button" className={i === 0 ? "ml-[9px]" : ""}>
                  <img src={icon} alt="" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setReplyOpen(true)}
            className="m-4 self-start rounded-lg bg-primary lg:absolute lg:bottom-5 lg:left-6 lg:m-0 px-[14px] py-2 text-body1 text-white hover:bg-primary-dark"
          >
            Reply
          </button>
        )}
      </section>
    </div>
  );
}
