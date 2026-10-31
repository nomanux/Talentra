import { Link } from "react-router-dom";
import arrowRight from "../../assets/icons/arrow-right-s-line.svg";
import charlotte from "../../assets/employees/charlotte.png";
import avina from "../../assets/employees/avina.png";
import actionCircle from "../../assets/employees/action-circle.svg";
import messageIcon from "../../assets/icons/message-light.svg";
import calendarIcon from "../../assets/icons/calendar-light.svg";
import callIcon from "../../assets/icons/call.svg";
import chevronRight from "../../assets/icons/chevron-right.svg";
import contactEmail from "../../assets/employees/contact-email.svg";
import contactCircle from "../../assets/employees/contact-circle.svg";
import contactAddress from "../../assets/employees/contact-address.svg";

type Rows = [string, string][];

const GENERAL: [Rows, Rows] = [
  [
    ["First Name", "Janson Sanga"],
    ["Address", "New York City"],
    ["Email Address", "jansonsanga@gmail.com"],
    ["Date of Birth", "01 Far, 1981"],
    ["Phone", "+5367 657 9408"],
  ],
  [
    ["Joining date", "03 Mar, 2024"],
    ["Access role", "Admin"],
    ["Department", "Product"],
    ["Employment type", "Remote"],
    ["Manager", "Herry Kane"],
  ],
];

const EMPLOYMENT: [Rows, Rows] = [
  [
    ["Job Title", "Team Manager"],
    ["Department", "Designer"],
    ["Start Date", "24 Jan, 2024"],
    ["End Date", "03 Oct, 2024"],
    ["Employment Status", "Active"],
  ],
  [],
];

const CONTRACT: [Rows, Rows] = [
  [
    ["Contract type", "Fixed term"],
    ["Period", "10 Years"],
    ["City/State", "Leeds,East London"],
    ["Country", "England"],
  ],
  [
    ["Postcode", "45356"],
    ["State/Province", "East City"],
    ["Gender", "Female"],
    ["Nationality", "England"],
  ],
];

function InfoCard({ title, columns, rightLabelWidth = "md:w-[150px]" }: { title: string; columns: [Rows, Rows]; rightLabelWidth?: string }) {
  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-xl bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-h4">{title}</h3>
        <button type="button" className="rounded bg-stroke-primary px-[10px] py-1 text-body1 hover:bg-stroke-secondary">
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-4 text-[16px] leading-6 tracking-[-0.16px] md:flex-row md:gap-[70px]">
        {columns.map(
          (rows, i) =>
            rows.length > 0 && (
              <dl key={i} className="flex flex-col gap-4">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex gap-5">
                    <dt className={`w-[130px] shrink-0 font-medium text-text-secondary sm:w-[150px] ${i === 0 ? "" : rightLabelWidth}`}>{k}</dt>
                    <dd className="min-w-0 font-semibold break-words">{v}</dd>
                  </div>
                ))}
              </dl>
            ),
        )}
      </div>
    </section>
  );
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button type="button" aria-label={label} className="relative size-11 hover:opacity-80">
      <img src={actionCircle} alt="" className="absolute inset-0" />
      <span className="absolute inset-0 flex items-center justify-center">
        <img src={icon} alt="" />
      </span>
    </button>
  );
}

function InfoLink({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" className="flex w-full items-center gap-[10px] text-left">
      <span className="flex flex-1 flex-col gap-1">
        <span className="text-body1 text-text-secondary">{label}</span>
        {children}
      </span>
      <img src={chevronRight} alt="" />
    </button>
  );
}

export default function EmployeeDetailPage() {
  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-body2">
        <Link to="/employees" className="text-text-secondary hover:text-text-primary">
          Employee
        </Link>
        <img src={arrowRight} alt="" />
        <span>Details</span>
      </nav>
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[309px_1fr]">
        <aside className="flex flex-col items-center gap-6 rounded-xl bg-card p-5 sm:p-[30px] lg:min-h-[939px]">
          <img src={charlotte} alt="Charlotte Avana" className="size-[100px] rounded-full object-cover" />
          <div className="flex flex-col items-center gap-[10px] text-center">
            <p className="text-h3 font-semibold">Charlotte Avana</p>
            <p className="text-body1 text-text-secondary">UI Designer</p>
          </div>
          <div className="flex gap-[10px]">
            <ActionButton icon={messageIcon} label="Message" />
            <ActionButton icon={calendarIcon} label="Schedule" />
            <ActionButton icon={callIcon} label="Call" />
          </div>
          <hr className="w-full max-w-[252px] border-stroke-primary" />
          <div className="flex w-full max-w-[252px] flex-col gap-4">
            <InfoLink label="Departement">
              <span className="text-h5 font-semibold">Designer</span>
            </InfoLink>
            <InfoLink label="Office">
              <span className="text-h5 font-semibold">UI Lab Studio</span>
            </InfoLink>
            <InfoLink label="Line Manager">
              <span className="flex items-center gap-3">
                <img src={avina} alt="" className="size-8 rounded-full object-cover" />
                <span className="text-h5 leading-[41px] font-semibold">Avina Evan</span>
              </span>
            </InfoLink>
          </div>
          <hr className="w-full max-w-[252px] border-stroke-primary" />
          <div className="flex w-full max-w-[252px] flex-col gap-3">
            <p className="font-inter text-[18px] leading-[1.6] font-medium">Contact Details</p>
            {[
              { icon: <img src={contactEmail} alt="" />, label: "Email", value: "charlotteavana@gmail.com" },
              {
                icon: (
                  <span className="relative size-10">
                    <img src={contactCircle} alt="" className="absolute inset-0" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <img src={callIcon} alt="" />
                    </span>
                  </span>
                ),
                label: "Phone",
                value: "+1(340) 264-5644",
              },
              { icon: <img src={contactAddress} alt="" />, label: "Address", value: "435 Cherry Street,New York" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-3">
                {c.icon}
                <div className="flex flex-col gap-[2px]">
                  <span className="text-h5 font-semibold">{c.label}</span>
                  <span className="text-body1 text-text-secondary">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
        <div className="flex flex-col gap-3">
          <InfoCard title="General Information" columns={GENERAL} rightLabelWidth="md:w-[178px]" />
          <InfoCard title="Employment details" columns={EMPLOYMENT} />
          <InfoCard title="Contract Information" columns={CONTRACT} rightLabelWidth="md:w-[199px]" />
        </div>
      </div>
    </div>
  );
}
