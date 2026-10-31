import { useState, type FormEvent } from "react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import { Field, Select, TextInput } from "./ui/Field";
import checkIcon from "../assets/icons/check-teal.svg";

/** "Book a demo" form used from the sidebar upgrade card and the Pricing page. */
export default function BookDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  const close = () => {
    onClose();
    setTimeout(() => setSent(false), 200);
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Book a demo"
      width={520}
      footer={
        sent ? (
          <Button variant="primary" onClick={close}>
            <span>Done</span>
          </Button>
        ) : (
          <>
            <Button onClick={close}>
              <span>Cancel</span>
            </Button>
            <Button variant="primary" type="submit" form="book-demo">
              <span>Request demo</span>
            </Button>
          </>
        )
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <img src={checkIcon} alt="" className="size-6" />
          </span>
          <p className="text-h4">Demo requested</p>
          <p className="max-w-[340px] text-body1 text-text-secondary">
            Thanks! Our team will email you within one business day to confirm a time that works for you.
          </p>
        </div>
      ) : (
        <form id="book-demo" onSubmit={submit} className="flex flex-col gap-5 px-4 py-5 sm:px-6">
          <p className="text-body1 text-text-secondary">See how Talentra fits your HR workflow in a 30-minute walkthrough with our team.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full name">
              <TextInput name="name" placeholder="Jane Cooper" required />
            </Field>
            <Field label="Work email">
              <TextInput name="email" type="email" placeholder="jane@company.com" required />
            </Field>
            <Field label="Company size">
              <Select name="size" defaultValue="11-50">
                {["1-10", "11-50", "51-200", "201-1000", "1000+"].map((s) => (
                  <option key={s}>{s} employees</option>
                ))}
              </Select>
            </Field>
            <Field label="Preferred date">
              <TextInput name="date" type="date" />
            </Field>
          </div>
          <Field label="What would you like to see? (optional)">
            <textarea
              name="notes"
              rows={3}
              placeholder="e.g. time-off approvals, project tracking…"
              className="w-full resize-none rounded-[10px] border border-stroke-primary bg-card px-[14px] py-[10px] font-inter text-[14px] leading-5 outline-none placeholder:text-[#737373] focus:border-primary"
            />
          </Field>
        </form>
      )}
    </Modal>
  );
}
