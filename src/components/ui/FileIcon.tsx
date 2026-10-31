import fileShape from "../../assets/documents/file-shape.svg";
import fileFold from "../../assets/documents/file-fold.svg";

/** "File Format Icons [1.0]": page outline with a coloured format label. */
export default function FileIcon({ format = "PDF", color = "#df1c41" }: { format?: string; color?: string }) {
  return (
    <span className="relative block size-8 shrink-0 overflow-hidden">
      <img src={fileShape} alt="" className="absolute top-[-0.8px] left-[1.4px]" />
      <img src={fileFold} alt="" className="absolute top-px left-[17.4px]" />
      <span
        className="absolute bottom-1 left-0 rounded-[3px] border-x-[0.8px] border-t-[0.8px] border-black/8 px-[3px] py-[2px] font-inter text-[8.8px] leading-[9.6px] font-semibold tracking-[0.176px] text-white uppercase shadow-[inset_0_3.2px_3.2px_0_rgba(255,255,255,0.08)]"
        style={{ backgroundColor: color }}
      >
        {format}
      </span>
    </span>
  );
}
