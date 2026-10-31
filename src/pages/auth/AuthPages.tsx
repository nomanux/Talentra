import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AuthHeading,
  AuthLayout,
  CenteredLayout,
  Divider,
  IconBadge,
  IconInput,
  Logo,
  PrimaryButton,
  SocialButtons,
  SwitchPrompt,
} from "./AuthUI";
import mailFill from "../../assets/icons/mail-fill.svg";
import lockCircle from "../../assets/icons/lock-circle-fill.svg";
import userFill from "../../assets/icons/user-fill.svg";
import checkboxChecked from "../../assets/icons/checkbox-checked.svg";
import lockFill from "../../assets/auth/lock-fill.svg";
import keyCircle from "../../assets/auth/key-circle.svg";
import checkmarkCircle from "../../assets/auth/checkmark-circle.svg";
import youtube from "../../assets/auth/youtube.svg";
import facebook from "../../assets/auth/facebook.svg";
import linkedin from "../../assets/auth/linkedin.svg";
import news from "../../assets/auth/news.svg";
import googleG from "../../assets/auth/google-g.svg";
import xing from "../../assets/auth/xing.svg";

function SaveInfo() {
  const [checked, setChecked] = useState(true);
  return (
    <label className="flex cursor-pointer items-center gap-1 font-inter text-[14px] leading-5 font-medium tracking-[-0.14px]">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
      {checked ? (
        <img src={checkboxChecked} alt="" />
      ) : (
        <span className="m-[2px] size-4 rounded border border-stroke-primary" />
      )}
      Save Info
    </label>
  );
}

/** Demo login: no credentials are checked — any submit (or social button) opens the app. */
export function LoginPage() {
  const navigate = useNavigate();
  const enter = () => navigate("/");

  return (
    <AuthLayout>
      <AuthHeading
        title="Welcome to Talentra"
        subtitle="Enter your information for entry"
      />
      <form
        noValidate
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          enter();
        }}
        className="mt-6 flex flex-col gap-4"
      >
        <SocialButtons onContinue={enter} />
        <Divider />
        <IconInput
          label="Email Address"
          icon={mailFill}
          name="email"
          type="email"
          placeholder="Enter email"
        />
        <IconInput
          label="Password"
          icon={lockCircle}
          name="password"
          type="password"
          placeholder="•••••••••••"
          reveal
        />
        <div className="flex items-center justify-between">
          <SaveInfo />
          <Link
            to="/reset-password"
            className="font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] text-primary hover:underline"
          >
            Forgot Password
          </Link>
        </div>
        <PrimaryButton>Log In</PrimaryButton>
        <SwitchPrompt
          text="Don't have an account?"
          action="Sign Up"
          to="/signup"
        />
      </form>
    </AuthLayout>
  );
}

export function SignUpPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <AuthHeading
        title="Sign Up"
        subtitle="Enter your information for entry"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/verify?next=onboarding");
        }}
        className="mt-6 flex flex-col gap-4"
      >
        <SocialButtons />
        <Divider />
        <IconInput
          label="Full Name"
          icon={userFill}
          name="name"
          placeholder="Enter full name"
          required
        />
        <IconInput
          label="Email Address"
          icon={mailFill}
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
        <IconInput
          label="Password"
          icon={lockCircle}
          name="password"
          type="password"
          placeholder="•••••••••••"
          minLength={8}
          reveal
          required
        />
        <SaveInfo />
        <PrimaryButton>Sign Up</PrimaryButton>
        <SwitchPrompt
          text="Already have an account"
          action="Sign In"
          to="/login"
        />
      </form>
    </AuthLayout>
  );
}

export function ResetPasswordPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[45px]">
          <IconBadge icon={lockFill} />
          <AuthHeading
            title="Reset Password"
            subtitle={
              <span className="mx-auto block max-w-[295px]">
                Please enter your email address to reset your password
              </span>
            }
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/verify?next=new-password");
          }}
          className="flex flex-col gap-16"
        >
          <IconInput
            label="Email Address"
            icon={mailFill}
            name="email"
            type="email"
            placeholder="Enter email"
            required
          />
          <PrimaryButton>Send Code</PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
}

export function ConfirmCodePage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((x, j) => (j === i ? d : x)));
    if (d && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[45px]">
          <IconBadge icon={keyCircle} />
          <AuthHeading
            title="Confirmation Code"
            subtitle={
              <span className="mx-auto block max-w-[295px]">
                We have sent you a code to gmail@gmail.com
              </span>
            }
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              params.get("next") === "new-password"
                ? "/new-password"
                : "/onboarding",
            );
          }}
          className="flex flex-col items-center gap-16"
        >
          <div className="flex gap-3 sm:gap-4">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={d}
                inputMode="numeric"
                aria-label={`Digit ${i + 1}`}
                autoFocus={i === 0}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Backspace" &&
                  !d &&
                  i > 0 &&
                  refs.current[i - 1]?.focus()
                }
                className="size-[50px] rounded-xl border border-stroke-primary text-center font-inter text-[16px] leading-6 font-medium tracking-[-0.16px] outline-none focus:border-[#9333ea] focus:shadow-[0_0_0_3px_#f3e8ff,0_1px_2px_0_rgba(10,10,10,0.05)]"
              />
            ))}
          </div>
          <p className="text-h5 text-text-secondary">
            Don’t get the code?{" "}
            <button
              type="button"
              onClick={() => setDigits(["", "", "", ""])}
              className="hover:text-primary"
            >
              Send Again
            </button>
          </p>
          <PrimaryButton disabled={digits.some((d) => !d)}>
            Confirm
          </PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
}

export function NewPasswordPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  return (
    <AuthLayout>
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[45px]">
          <IconBadge icon={keyCircle} />
          <AuthHeading
            title="New Password"
            subtitle="Enter your new password also confirm password"
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            if (f.get("password") !== f.get("confirm"))
              return setError("Passwords do not match");
            navigate("/login");
          }}
          className="flex flex-col gap-16"
        >
          <div className="flex flex-col gap-5">
            <IconInput
              label="New Password"
              icon={lockCircle}
              name="password"
              type="password"
              placeholder="•••••••••••"
              minLength={8}
              reveal
              required
            />
            <IconInput
              label="Confirm Password"
              icon={lockCircle}
              name="confirm"
              type="password"
              placeholder="•••••••••••"
              reveal
              required
              error={error}
              onChange={() => error && setError("")}
            />
          </div>
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
}

const SOURCES = [
  { label: "Youtube", icon: youtube },
  { label: "Facebook", icon: facebook },
  { label: "Linkedin", icon: linkedin },
  { label: "Blog", icon: news },
  { label: "Google search", icon: googleG },
  { label: "twitter/x", icon: xing },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState<string | null>(
    params.get("selected") ?? null,
  );
  return (
    <CenteredLayout>
      <div className="mx-auto flex w-full max-w-[630px] flex-col items-center gap-8 sm:gap-[42px]">
        <div className="flex w-full max-w-[449px] flex-col items-center gap-8">
          <Logo />
          <h1 className="text-center text-[24px] leading-8 font-semibold tracking-[-0.32px] sm:text-[32px] sm:leading-10">
            Welcome Where did you hear about us?
          </h1>
        </div>
        <div
          className="grid w-full grid-cols-2 gap-3 sm:h-[370px] sm:grid-cols-3 sm:grid-rows-2 sm:gap-4"
          role="radiogroup"
        >
          {SOURCES.map((s) => (
            <button
              key={s.label}
              type="button"
              role="radio"
              aria-checked={selected === s.label}
              onClick={() => setSelected(s.label)}
              className={`flex min-h-[140px] flex-col items-center justify-center gap-5 rounded-2xl border bg-card transition-shadow sm:gap-7 ${
                selected === s.label
                  ? "border-primary shadow-[0_8px_74px_0_#dfe5ee]"
                  : "border-stroke-primary hover:shadow-[0_8px_74px_0_#dfe5ee]"
              }`}
            >
              <img src={s.icon} alt="" />
              <span className="text-h5">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex w-full justify-end">
          <button
            type="button"
            disabled={!selected}
            onClick={() => navigate("/welcome")}
            className="w-[108px] rounded-lg bg-primary px-[14px] py-2 text-body1 text-white hover:bg-primary-dark disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </CenteredLayout>
  );
}

export function SuccessPage() {
  return (
    <CenteredLayout>
      <div className="mx-auto flex w-full max-w-[449px] flex-col items-center gap-8">
        <img src={checkmarkCircle} alt="" />
        <h1 className="w-full max-w-[344px] text-center text-[24px] leading-8 sm:text-[32px] sm:leading-10 leading-10 font-semibold tracking-[-0.32px]">
          Successfully your created account
        </h1>
        <Link
          to="/"
          className="w-[160px] rounded-lg bg-primary px-[14px] py-2 text-center text-body1 text-white hover:bg-primary-dark"
        >
          Get Started
        </Link>
      </div>
    </CenteredLayout>
  );
}
