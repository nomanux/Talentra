import { useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import searchIcon from "../../assets/icons/search-01.svg";
import addOutline from "../../assets/icons/add-outline.svg";
import zapier from "../../assets/integrations/zapier-tile.svg";
import trello from "../../assets/integrations/trello-tile.svg";
import hubspot from "../../assets/integrations/hubspot-tile.svg";
import slack from "../../assets/integrations/slack.svg";
import stripe from "../../assets/integrations/stripe.svg";
import googleDrive from "../../assets/integrations/google-drive.svg";
import mailchimp from "../../assets/integrations/mailchimp.svg";
import zendesk from "../../assets/integrations/zendesk.svg";
import notion from "../../assets/integrations/notion.svg";
import volkswagen from "../../assets/integrations/volkswagen.svg";
import invision from "../../assets/integrations/invision.svg";
import asana from "../../assets/integrations/asana.svg";

type Integration = { name: string; description: string; logo: string; tile?: boolean; connected: boolean };

const enhance = (n: string) => `Enhance project visibility and collaboration by connecting with ${n}, facilitating task management and project tracking.`;

const INTEGRATIONS: Integration[] = [
  { name: "Zapier", logo: zapier, tile: true, connected: false, description: "Connect with thousands of apps via Zapier to automate your workflows and boost efficiency without any coding." },
  { name: "Slack", logo: slack, connected: false, description: "Promote real-time communication and teamwork by integrating Slack to keep your team connected and informed." },
  { name: "Stripe", logo: stripe, connected: false, description: "Ensure smooth and secure payments by integrating Stripe to handle transactions effortlessly." },
  { name: "Trello", logo: trello, tile: true, connected: true, description: "Boost project transparency and teamwork by linking with Trello for easy task management and tracking." },
  { name: "Hubspot", logo: hubspot, tile: true, connected: false, description: "Boost your marketing by linking Optify Solutions with Hubspot, enabling advanced automation and lead tracking." },
  { name: "Google Drive", logo: googleDrive, connected: true, description: "Get valuable insights by integrating Google Drive to monitor user behavior and measure your digital strategy's impact." },
  { name: "Mailchimp", logo: mailchimp, connected: true, description: "Improve project collaboration and visibility by integrating with Mailchimp to streamline task management and tracking." },
  { name: "Zendesk", logo: zendesk, connected: false, description: "Strengthen project collaboration and oversight by linking with Zendesk to simplify task management and tracking." },
  { name: "Notion", logo: notion, connected: true, description: "Improve project collaboration and visibility by connecting with Notion to facilitate task management and tracking." },
  { name: "Volkswagen", logo: volkswagen, connected: false, description: "Increase project clarity and teamwork by connecting with Volkswagen to support task management and tracking." },
  { name: "Invision", logo: invision, connected: false, description: "Enhance teamwork and project insight by integrating with Invision for efficient task management and tracking." },
  { name: "Asana", logo: asana, connected: true, description: "Elevate project teamwork and transparency by integrating with Asana for better task management and tracking." },
  { name: "Mailchimp", logo: mailchimp, connected: true, description: enhance("Mailchimp") },
  { name: "Zendesk", logo: zendesk, connected: false, description: enhance("Zendesk") },
  { name: "Notion", logo: notion, connected: true, description: enhance("Notion") },
];

export default function IntegrationsPage() {
  const [items, setItems] = useState(INTEGRATIONS);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => items.map((it, i) => ({ ...it, i })).filter((it) => it.name.toLowerCase().includes(query.toLowerCase())), [items, query]);

  const toggle = (i: number) => setItems((prev) => prev.map((it, j) => (j === i ? { ...it, connected: !it.connected } : it)));

  return (
    <div className="flex flex-col gap-[26px] pt-[10px]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-h4">Integration</h2>
          <p className="text-body1 text-text-secondary">Connect all your channels to increase your course</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex w-full items-center sm:w-[282px] gap-[10px] rounded-lg border border-stroke-primary px-[14px] py-2">
            <img src={searchIcon} alt="" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="min-w-0 flex-1 bg-transparent font-inter text-[14px] leading-5 font-medium tracking-[-0.14px] outline-none placeholder:text-text-tertiary"
            />
          </label>
          <Button variant="primary">
            <img src={addOutline} alt="" />
            <span>Add Integration</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((it) => (
          <div key={it.i} className="flex flex-col gap-5 rounded-xl bg-card px-3 py-5">
            <div className="flex items-center justify-between">
              {it.tile ? (
                <img src={it.logo} alt={it.name} />
              ) : (
                <span className="flex size-11 items-center justify-center rounded-md border border-stroke-primary bg-card">
                  <img src={it.logo} alt={it.name} className={it.name === "Slack" ? "size-[19.5px]" : undefined} />
                </span>
              )}
              <button
                type="button"
                onClick={() => toggle(it.i)}
                className={`rounded-md border px-3 py-2 text-body1 ${
                  it.connected ? "border-success text-success hover:bg-success-alpha-10" : "border-stroke-primary text-text-secondary hover:bg-surface"
                }`}
              >
                {it.connected ? "Connected" : "Connect"}
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-h5">{it.name}</p>
              <p className="text-body1 text-text-secondary">{it.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
