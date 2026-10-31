import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import logoCircle from "../../assets/icons/logo-circle.svg";
import logoMark from "../../assets/auth/logo-mark.svg";
import preview from "../../assets/auth/dashboard-preview.png";
import google from "../../assets/auth/google.svg";
import github from "../../assets/auth/github.svg";
import githubMask from "../../assets/auth/github-mask.png";
import dividerLine from "../../assets/auth/divider-line.svg";
import eyeClosed from "../../assets/icons/eye-closed.svg";
import alertCircle from "../../assets/icons/alert-circle-fill.svg";
import bgShape from "../../assets/auth/bg-shape.svg";

export function Logo() {
  return (
    <Link to="/" aria-label="Talentra home" className="relative block size-10">
      <img src={logoCircle} alt="" className="absolute inset-0" />
      <img src={logoMark} alt="" className="absolute top-[11px] left-[7px]" />
    </Link>
  );
}

/** Split auth layout: form on the left, framed dashboard preview on the right. */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-card">
      <div className="relative flex min-h-screen w-full flex-col px-4 py-5 sm:px-5 lg:w-1/2">
        <Logo />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-[403px]">{children}</div>
        </div>
        <p className="max-w-[388px] text-body1 text-text-secondary sm:text-h5">
          By using Talentra you agree to our terms of services, privacy and
          security policies and practices
        </p>
      </div>
      <div className="relative hidden w-1/2 overflow-hidden bg-surface lg:block">
        <img
          src={preview}
          alt="Talentra dashboard preview"
          className="absolute top-1/2 left-[89px] h-[min(760px,calc(100vh-200px))] w-auto max-w-none -translate-y-1/2"
        />
      </div>
    </div>
  );
}

/** Centered layout on the soft grey background with decorative blobs (onboarding, success). */
export function CenteredLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface">
      <img
        src={bgShape}
        alt=""
        className="pointer-events-none absolute hidden sm:block top-[7.91%] right-[-2.29%] h-[26.76%] w-[27.43%]"
      />
      <img
        src={bgShape}
        alt=""
        className="pointer-events-none absolute hidden sm:block top-[16.31%] left-[0.69%] h-[26.76%] w-[27.43%]"
      />
      <img
        src={bgShape}
        alt=""
        className="pointer-events-none absolute hidden sm:block right-[3.54%] bottom-0 h-[26.76%] w-[27.43%]"
      />
      <div className="relative w-full px-4 py-10">{children}</div>
    </div>
  );
}

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[370px] flex-col gap-2 text-center">
      <h1 className="text-h2">{title}</h1>
      <p className="text-h5 text-text-secondary">{subtitle}</p>
    </div>
  );
}

/** Teal 42px icon tile used above the reset / code / new-password headings. */
export function IconBadge({ icon }: { icon: string }) {
  return (
    <span className="relative mx-auto flex size-[42px] items-center justify-center rounded-xl border border-primary bg-primary shadow-[inset_0_3px_18px_0_rgba(255,255,255,0.25)]">
      <img src={icon} alt="" />
    </span>
  );
}

export function SocialButtons({ onContinue }: { onContinue?: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onContinue}
        className="flex items-center justify-center gap-2 rounded-lg border border-stroke-primary px-4 py-[10px] text-[14px] leading-5 tracking-[-0.14px] hover:bg-surface"
      >
        <span className="flex size-5 items-center justify-center">
          <img src={google} alt="" />
        </span>
        Continue with Google
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="flex items-center justify-center gap-2 rounded-lg bg-text-secondary px-4 py-[10px] text-[14px] leading-5 tracking-[-0.14px] text-white hover:bg-text-primary"
      >
        <span
          className="relative -mt-px -ml-[2px] size-6"
          style={{
            maskImage: `url(${githubMask})`,
            maskPosition: "2px 1px",
            maskSize: "20px 20px",
            maskRepeat: "no-repeat",
          }}
        >
          <img src={github} alt="" className="absolute inset-0" />
        </span>
        Continue with GitHub
      </button>
    </div>
  );
}

export function Divider({ label = "Or" }: { label?: string }) {
  return (
    <div className="flex items-center">
      <div className="min-w-0 flex-1 overflow-hidden">
        <img src={dividerLine} alt="" />
      </div>
      <span className="px-[6px] text-body2 text-text-secondary">{label}</span>
      <div className="min-w-0 flex-1 overflow-hidden">
        <img src={dividerLine} alt="" />
      </div>
    </div>
  );
}

type IconInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: string;
  error?: string;
  reveal?: boolean;
};

/** Labelled input with leading icon, optional password reveal toggle and error hint. */
export function IconInput({
  label,
  icon,
  error,
  reveal,
  type,
  ...props
}: IconInputProps) {
  const [shown, setShown] = useState(false);
  return (
    <label className="flex flex-col gap-2">
      <span className="text-body1">{label}</span>
      <span
        className={`flex items-center gap-[2px] rounded-[10px] border p-[10px] shadow-[0_1px_2px_0_rgba(10,10,10,0.05)] focus-within:border-primary ${
          error
            ? "border-error shadow-[0_0_0_3px_#fee2e2,0_1px_2px_0_rgba(10,10,10,0.05)]"
            : "border-stroke-primary"
        }`}
      >
        <span className="px-[2px]">
          <img src={icon} alt="" />
        </span>
        <input
          type={reveal && shown ? "text" : type}
          className="min-w-0 flex-1 bg-transparent px-1 text-body1 outline-none placeholder:text-text-secondary"
          {...props}
        />
        {reveal && (
          <button
            type="button"
            aria-label={shown ? "Hide password" : "Show password"}
            onClick={() => setShown((s) => !s)}
            className="px-[2px]"
          >
            <img src={eyeClosed} alt="" className={shown ? "opacity-50" : ""} />
          </button>
        )}
      </span>
      {error && (
        <span className="flex items-center gap-1 text-body2 text-error">
          <img src={alertCircle} alt="" />
          {error}
        </span>
      )}
    </label>
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-primary px-[14px] py-2 text-body1 text-white hover:bg-primary-dark disabled:opacity-60"
      {...props}
    >
      {children}
    </button>
  );
}

export function SwitchPrompt({
  text,
  action,
  to,
}: {
  text: string;
  action: string;
  to: string;
}) {
  return (
    <p className="flex items-center justify-center gap-3 text-h5">
      {text}
      <Link
        to={to}
        className="w-[86px] rounded-md border border-stroke-primary bg-card px-3 py-[6px] text-center font-inter text-[14px] leading-5 font-medium hover:bg-surface"
      >
        {action}
      </Link>
    </p>
  );
}
