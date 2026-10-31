import { useState } from "react";
import addCircle from "../../../assets/icons/add-circle.svg";
import imageIcon from "../../../assets/icons/image-01.svg";
import attachment from "../../../assets/icons/attachment-20.svg";
import linkAttachment from "../../../assets/icons/attachment-20b.svg";
import fileMinus from "../../../assets/icons/file-minus.svg";
import linkDivider from "../../../assets/vision/link-divider.svg";
import alineOttoman from "../../../assets/vision/aline-ottoman.png";
import theodoreBoucle from "../../../assets/vision/theodore-boucle.png";
import garret from "../../../assets/vision/garret-footstool.png";
import theodoreWool from "../../../assets/vision/theodore-wool.png";

type VisionImage = { src: string; caption: string; crop: { top: string; height: string; left?: string; width?: string }; frame?: string };

/** Crops mirror the Figma image fills (each photo is shown through a 324×186 window). */
const IMAGES: VisionImage[] = [
  {
    src: theodoreWool,
    caption: "Theodore Footstool, Textured Wool Boucle",
    crop: { top: "-0.05%", height: "121.47%", left: "18.7%", width: "62.6%" },
    frame: "bg-[linear-gradient(126deg,#dac5b7_22.4%,#e1d1c9_83.3%)]",
  },
  { src: alineOttoman, caption: "Aline Ottoman", crop: { top: "-107.04%", height: "232.26%" } },
  { src: garret, caption: "Garret Footstool MTO", crop: { top: "-108.95%", height: "232.26%" } },
  { src: theodoreBoucle, caption: "Theodore Footstool, Boucle, Natural", crop: { top: "-85.64%", height: "232.26%" } },
];

const NOTES = [
  { text: "Paint colours were sent to clients office", bg: "bg-[rgba(240,46,66,0.1)]" },
  { text: "Contractors need to sign in at security before proceeding to park.", bg: "bg-[rgba(136,114,243,0.1)]" },
  { text: "Paint sample was approved and tested in bedroom 3, added task to follow up with Paul.", bg: "bg-[rgba(71,190,252,0.1)]" },
];

const FILES = ["Project Brief.pdf", "Floorplan.pdf", "Floorplan.pdf"];
const LINKS = ["Pinterest inspiration board", "Houzz project reference"];

const panel = "rounded-2xl border border-stroke-primary bg-card";
const panelTitle = "font-inter text-[16px] leading-6 font-medium tracking-[-0.176px]";

export default function VisionTab() {
  const [notes, setNotes] = useState(NOTES);

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-h3">Vision Board</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { icon: addCircle, label: "Add Note", w: "w-[114px]", onClick: () => setNotes((n) => [...n, { text: "New note", bg: "bg-surface" }]) },
            { icon: imageIcon, label: "Add Image", w: "w-[114px]" },
            { icon: attachment, label: "Add Link", w: "w-[102px]" },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={b.onClick}
              className={`flex items-center justify-center gap-2 rounded-[10px] border border-stroke-primary bg-card py-[10px] text-body1 text-text-secondary shadow-[0_1px_2px_0_rgba(10,13,20,0.03)] hover:bg-surface ${b.w}`}
            >
              <img src={b.icon} alt="" />
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[697fr_385fr]">
        <div className={`${panel} px-[15px] pt-4 pb-4`}>
          <h3 className={panelTitle}>Images</h3>
          <div className="mt-[22px] grid grid-cols-1 gap-x-[11px] gap-y-[11px] sm:grid-cols-2">
            {IMAGES.map((img) => (
              <figure key={img.caption} className="h-[220px] rounded-2xl border border-stroke-primary bg-card p-1 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]">
                <div className={`relative h-[186px] overflow-hidden rounded-xl ${img.frame ?? ""}`}>
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="absolute max-w-none"
                    style={{ top: img.crop.top, height: img.crop.height, left: img.crop.left ?? 0, width: img.crop.width ?? "100%" }}
                  />
                </div>
                <figcaption className="mt-[6px] px-2 font-inter text-[12px] tracking-[-0.132px]">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className={`${panel} min-h-[277px] p-[15px]`}>
            <h3 className={`${panelTitle} py-1`}>Notes</h3>
            <div className="mt-3 flex flex-col gap-[9px]">
              {notes.map((n, i) => (
                <p key={i} className={`rounded-lg p-[10px] pl-[21px] text-body1 ${n.bg}`}>
                  {n.text}
                </p>
              ))}
            </div>
          </div>
          <div className={`${panel} p-4`}>
            <h3 className="py-1 text-h5">Files</h3>
            <div className="mt-1 flex flex-col gap-2">
              {FILES.map((f, i) => (
                <a key={i} href="#" className="flex items-center gap-3 rounded-xl border border-stroke-primary p-[10px] text-body1 hover:bg-surface">
                  <span className="flex size-[34px] items-center justify-center rounded-lg bg-orange-alpha-10">
                    <img src={fileMinus} alt="" />
                  </span>
                  {f}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`${panel} p-4 pb-12`}>
        <h3 className={`${panelTitle} py-1`}>Reference Links</h3>
        <div className="mt-[23px] grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-[27px]">
          {LINKS.map((l) => (
            <a key={l} href="#" className="flex h-[50px] items-center rounded-lg border border-stroke-primary hover:bg-surface">
              <span className="flex w-[50px] justify-center">
                <img src={linkAttachment} alt="" />
              </span>
              <img src={linkDivider} alt="" />
              <span className="pl-4 font-inter text-[14px] font-medium tracking-[-0.154px] text-text-secondary">{l}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
