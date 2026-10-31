import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "outlinePrimary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline: "border border-stroke-primary bg-card text-text-primary hover:bg-surface",
  outlinePrimary: "border border-primary bg-card text-primary hover:bg-primary/5",
  ghost: "bg-surface text-text-primary hover:bg-stroke-secondary",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; iconOnly?: boolean };

/** "Basic Buttons" from the Figma component set: 8px radius, 14px medium label with 4px inner padding. */
export default function Button({ variant = "outline", iconOnly, className = "", children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex shrink-0 items-center justify-center gap-[2px] overflow-hidden rounded-lg text-body1 whitespace-nowrap transition-colors [&>img]:shrink-0 ${
        iconOnly ? "p-2" : "px-[10px] py-2 [&>span]:px-1"
      } ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
