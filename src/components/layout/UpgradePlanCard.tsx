import { useState } from "react";
import { Link } from "react-router-dom";
import BookDemoModal from "../BookDemoModal";
import { TRIAL } from "../../data/user";
import starIcon from "../../assets/icons/star-06.svg";

/** Trial status + upgrade CTA at the bottom of the sidebar. */
export default function UpgradePlanCard({ onNavigate }: { onNavigate?: () => void }) {
  const [demoOpen, setDemoOpen] = useState(false);
  const used = TRIAL.totalDays - TRIAL.daysLeft;

  return (
    <div className="flex flex-col gap-4 rounded-[14px] bg-surface p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-body1">{TRIAL.plan}</p>
          <span className="rounded-full bg-orange-alpha-10 px-2 py-[2px] text-body2 text-orange">{TRIAL.daysLeft} days left</span>
        </div>
        <div
          className="flex h-1 w-full overflow-hidden rounded"
          role="progressbar"
          aria-label="Trial used"
          aria-valuenow={used}
          aria-valuemin={0}
          aria-valuemax={TRIAL.totalDays}
        >
          <div className="h-full bg-primary" style={{ width: `${(used / TRIAL.totalDays) * 100}%` }} />
          <div className="h-full flex-1 bg-orange-alpha-10" />
        </div>
        <p className="text-[12px] leading-4 tracking-[-0.24px] text-text-secondary">
          Day {used} of {TRIAL.totalDays}. Upgrade to keep your data and unlock every feature.
        </p>
      </div>
      <div className="flex gap-2">
        <Link
          to="/pricing"
          onClick={onNavigate}
          className="flex flex-1 items-center justify-center gap-[6px] rounded-[10px] bg-primary px-3 py-[9px] text-body1 whitespace-nowrap text-white hover:bg-primary-dark"
        >
          Upgrade
          <img src={starIcon} alt="" className="brightness-0 invert" />
        </Link>
        <button
          type="button"
          onClick={() => setDemoOpen(true)}
          className="flex-1 rounded-[10px] border border-stroke-primary bg-card px-3 py-[9px] text-body1 whitespace-nowrap hover:bg-surface"
        >
          Book a demo
        </button>
      </div>
      <BookDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
