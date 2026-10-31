import moreIcon from "../../assets/icons/more-vertical.svg";

/** 42px kebab button used in card headers (icon is the horizontal dots asset rotated 90°). */
export default function MoreButton({ label = "More options" }: { label?: string }) {
  return (
    <button type="button" aria-label={label} className="flex size-[42px] items-center justify-center rounded-2xl bg-card hover:bg-surface">
      <img src={moreIcon} alt="" className="rotate-90 opacity-50" />
    </button>
  );
}
