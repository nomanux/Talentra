import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import arrowDown from "../../assets/icons/arrow-down-fill.svg";

const control =
  "w-full rounded-[10px] border border-stroke-primary bg-card px-[14px] py-[10px] font-inter text-[14px] leading-5 tracking-[-0.14px] text-text-primary shadow-[0_1px_2px_0_rgba(10,10,10,0.05)] outline-none placeholder:text-[#737373] focus:border-primary";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-body1">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={control} {...props} />;
}

export function Select({ children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={`${control} appearance-none pr-10`} {...props}>
        {children}
      </select>
      <img src={arrowDown} alt="" className="pointer-events-none absolute top-1/2 right-[10px] -translate-y-1/2" />
    </div>
  );
}
