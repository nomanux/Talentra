type StatCardProps = {
  value: string;
  label: string;
  delta: number;
  icon: string;
  /** Tailwind gradient classes for the icon tile. */
  iconBg: string;
  gridBg: string;
  spark: { src: string; top: number; right: number };
  contentTop?: number;
};

export default function StatCard({ value, label, delta, icon, iconBg, gridBg, spark, contentTop = 78 }: StatCardProps) {
  const positive = delta >= 0;
  // Phones: compact flow layout (2 per row). From `sm` up: the absolute Figma layout, driven by CSS vars.
  const vars = { "--spark-top": `${spark.top}px`, "--spark-right": `${spark.right}px`, "--content-top": `${contentTop}px` } as React.CSSProperties;
  return (
    <div style={vars} className="relative overflow-hidden rounded-xl bg-card p-3 sm:h-[154px] sm:p-0">
      <img src={gridBg} alt="" className="pointer-events-none absolute -top-2 -right-[25px] hidden sm:block" />
      <div className="flex items-start justify-between gap-2 sm:contents">
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b sm:absolute sm:top-5 sm:left-5 sm:size-10 sm:rounded-[10px] [&>img]:scale-75 sm:[&>img]:scale-100 ${iconBg}`}
        >
          <img src={icon} alt="" />
        </div>
        <img
          src={spark.src}
          alt=""
          className="pointer-events-none h-7 w-auto min-w-0 sm:absolute sm:top-[var(--spark-top)] sm:right-[var(--spark-right)] sm:h-auto"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1 sm:absolute sm:top-[var(--content-top)] sm:left-5 sm:mt-0 sm:gap-2 sm:whitespace-nowrap">
        <p className="flex flex-wrap items-baseline gap-x-1">
          <span className="text-h4 sm:text-h2">{value}</span>
          <span className="text-body2 sm:text-body1">{label}</span>
        </p>
        <p className="text-body2 text-text-secondary sm:text-body1">
          <span className={positive ? "text-up" : "text-down"}>
            {positive ? "+" : ""}
            {delta}
          </span>{" "}
          from last week
        </p>
      </div>
    </div>
  );
}
