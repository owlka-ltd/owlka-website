import { OwlkaMark } from "./OwlkaMark";

/**
 * Renders the real Owlka iOS app structure as captured from Tim's phone
 * on 2026-05-17. Chrome: mint top bar + tab pills, white pane below.
 * Pane: monospace dim for command/code output, sans-serif body for
 * Claude prose responses with an owl avatar prepended. Input row mirrors
 * SplitTerminalView.swift (attach + ctrl + esc + tall TextEditor + pink
 * circular paper-plane send).
 *
 * Content is the actual conversation that produced this very website —
 * Claude shipping the OwlkaSessionScreen fixes.
 */
export function OwlkaSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#F5FBF7] flex flex-col text-[#1A1A1F]">
      {/* iOS status bar */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <span className="flex items-center gap-[3px] text-[#1A1A1F]">
          <SignalGlyph />
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* Owlka top bar — real OKa mark + SF-Symbol iconChips */}
      <div className="relative shrink-0 px-[4%] pt-[1%] pb-[1.5%] flex items-center justify-between">
        <div className="flex items-center gap-[1.5cqw]">
          <OwlkaMark transparent className="w-[11cqw] h-[11cqw]" />
          <span className="text-[5.4cqw] font-bold tracking-tight text-[#1A1A1F]">
            Owlka
          </span>
        </div>
        <div className="flex items-center gap-[2cqw]">
          <IconChip glyph="search" />
          <IconChip glyph="doc" />
          <IconChip glyph="menu" />
        </div>
      </div>

      {/* tmux tab bar — 2 tabs + add button, real names from Tim's phone */}
      <div className="relative shrink-0 px-[3%] pt-[1.5%] pb-[2%] flex items-stretch gap-[1.5cqw] overflow-hidden">
        <TmuxTab
          number={1}
          active={false}
          status="working"
          summary="owlka app development"
        />
        <TmuxTab
          number={2}
          active
          status="done"
          summary="Owlka website development"
        />
        <AddTabButton />
      </div>

      {/* pane content — WHITE background, real conversation rendering */}
      <div className="relative flex-1 overflow-hidden bg-white">
        <div className="px-[4%] pt-[2.5%] pb-[2%]">
          {/* dim monospace command output */}
          <div className="font-mono text-[2.5cqw] leading-[1.5] text-[#1A1A1F]/55 whitespace-pre">
{` 1 file changed, 142 insertions(+), 95 deletion
… +4 lines (ctrl+o to expand)`}
          </div>

          {/* Claude turn — owl avatar + sans-serif prose */}
          <div className="mt-[3.5%] flex gap-[2.5cqw]">
            <OwlAvatar />
            <div className="flex-1 text-[2.9cqw] leading-[1.45] text-[#1A1A1F]/80">
              Shipped as 38f8066. Vercel will rebuild.
            </div>
          </div>

          {/* second Claude turn — the meta-recursive headline */}
          <div className="mt-[3.5%] flex gap-[2.5cqw]">
            <OwlAvatar />
            <div className="flex-1 text-[2.9cqw] leading-[1.5] text-[#1A1A1F]/85">
              <span className="font-semibold">Headline:</span> all 5
              inaccuracies fixed in one commit, hero now diff-matches the
              real SwiftUI sources for logo, input row, todo footer
              rendering, tab status dots, and icon glyphs.
            </div>
          </div>
        </div>
      </div>

      {/* input row — VStack[attach, ctrl, esc] + editor + send (compact
          single-line height so the iOS keyboard fits below)
          SplitTerminalView.swift inputSection L2541-2663 */}
      <div className="relative shrink-0 bg-white px-[3%] pt-[1.5%] pb-[1.5%]">
        <div className="flex items-end gap-[1.6cqw]">
          <div className="flex flex-col gap-[1cqw] shrink-0">
            <ChipButton variant="attach" />
            <ChipButton variant="pill" label="ctrl" />
            <ChipButton variant="pill" label="esc" />
          </div>
          <div className="flex-1 min-w-0 h-[24cqw] rounded-[2.4cqw] bg-[#FFF8FA] border border-[#FF6BA0]/35 px-[2cqw] pt-[1.6cqw] text-[2.6cqw] text-[#1A1A1F]/55 leading-tight">
            run the keyboard build and screenshot the hero|
          </div>
          <button
            type="button"
            className="shrink-0 self-end w-[8.4cqw] h-[8.4cqw] rounded-full bg-[#FF6BA0] flex items-center justify-center"
            aria-label="Send"
          >
            <PaperPlaneGlyph />
          </button>
        </div>
      </div>

      {/* iOS keyboard — stylized QWERTY band so the hero reads as
          "actively being typed in" (real screenshot shows keyboard up) */}
      <IosKeyboard />
    </div>
  );
}

function IosKeyboard() {
  return (
    <div className="relative shrink-0 bg-[#D1D5DB] pt-[1.8cqw] pb-[1cqw] px-[1.2cqw] flex flex-col gap-[1.4cqw]">
      <KeyRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
      <KeyRow
        keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]}
        sidePad
      />
      <div className="flex items-stretch gap-[1.2cqw]">
        <WideKey glyph="shift" />
        <div className="flex-1 flex items-stretch gap-[1.2cqw]">
          {["z", "x", "c", "v", "b", "n", "m"].map((k) => (
            <KeyCap key={k} label={k} />
          ))}
        </div>
        <WideKey glyph="backspace" />
      </div>
      <div className="flex items-stretch gap-[1.2cqw]">
        <BottomKey label="123" />
        <BottomKey glyph="globe" />
        <BottomKey grow label="space" />
        <BottomKey wide label="return" accent />
      </div>
      <div className="mt-[0.4cqw] flex justify-center">
        <div className="w-[28%] h-[0.6cqw] rounded-full bg-black/60" />
      </div>
    </div>
  );
}

function KeyRow({ keys, sidePad }: { keys: string[]; sidePad?: boolean }) {
  return (
    <div
      className={`flex items-stretch gap-[1.2cqw] ${
        sidePad ? "px-[4.8cqw]" : ""
      }`}
    >
      {keys.map((k) => (
        <KeyCap key={k} label={k} />
      ))}
    </div>
  );
}

function KeyCap({ label }: { label: string }) {
  return (
    <span className="flex-1 min-w-0 h-[8.4cqw] rounded-[1.2cqw] bg-white shadow-[0_1px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-[3.4cqw] font-normal text-[#1A1A1F]">
      {label}
    </span>
  );
}

function WideKey({ glyph }: { glyph: "shift" | "backspace" }) {
  return (
    <span className="w-[10.4cqw] h-[8.4cqw] rounded-[1.2cqw] bg-[#ADB1BA] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-[#1A1A1F]">
      {glyph === "shift" ? <ShiftGlyph /> : <BackspaceGlyph />}
    </span>
  );
}

function BottomKey({
  label,
  glyph,
  wide,
  grow,
  accent,
}: {
  label?: string;
  glyph?: "globe";
  wide?: boolean;
  grow?: boolean;
  accent?: boolean;
}) {
  const cls = grow
    ? "flex-1"
    : wide
      ? "w-[16cqw]"
      : "w-[10cqw]";
  const bg = grow
    ? "bg-white"
    : accent
      ? "bg-[#FF6BA0] text-white"
      : "bg-[#ADB1BA]";
  return (
    <span
      className={`${cls} ${bg} h-[8.4cqw] rounded-[1.2cqw] shadow-[0_1px_0_rgba(0,0,0,0.25)] flex items-center justify-center text-[2.8cqw] font-medium ${
        accent ? "" : "text-[#1A1A1F]"
      }`}
    >
      {glyph === "globe" ? <GlobeGlyph /> : label}
    </span>
  );
}

function ShiftGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.6cqw] h-[3.6cqw]" fill="currentColor" aria-hidden>
      <path d="M8 2 L14 8 H11 V13 H5 V8 H2 Z" />
    </svg>
  );
}

function BackspaceGlyph() {
  return (
    <svg viewBox="0 0 18 14" className="w-[4.4cqw] h-[3.4cqw]" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M5 1 L1 7 L5 13 H16 V1 Z" />
      <path d="M8 5 L13 9 M13 5 L8 9" strokeLinecap="round" />
    </svg>
  );
}

function GlobeGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.6cqw] h-[3.6cqw]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="8" cy="8" r="6" />
      <ellipse cx="8" cy="8" rx="3" ry="6" />
      <path d="M2 8h12" />
    </svg>
  );
}

function TmuxTab({
  number,
  active,
  status,
  summary,
}: {
  number: number;
  active: boolean;
  status: "working" | "done";
  summary: string;
}) {
  const fg = active ? "#3A3A40" : "#FFFFFF";
  return (
    <div
      className={`flex-1 min-w-0 rounded-[2cqw] px-[2.5cqw] py-[2cqw] flex items-start gap-[2cqw] ${
        active ? "bg-[#FFC1D9]" : "bg-[#707A8C]"
      }`}
    >
      <div className="flex flex-col items-center gap-[1cqw] shrink-0">
        <span
          className="text-[3.2cqw] font-bold leading-none"
          style={{ color: fg }}
        >
          {number}
        </span>
        {status === "working" ? (
          <span
            className="w-[1.8cqw] h-[1.8cqw] rounded-full bg-[#3DC8D2]"
            aria-label="working"
          />
        ) : (
          <CheckmarkCircleGlyph color={fg} />
        )}
      </div>
      <span
        className={`text-[2.9cqw] leading-[1.2] line-clamp-2 ${
          active ? "font-semibold" : "font-medium"
        }`}
        style={{ color: fg }}
      >
        {summary}
      </span>
    </div>
  );
}

function AddTabButton() {
  return (
    <div className="shrink-0 w-[10cqw] rounded-[2cqw] bg-[#707A8C] flex items-center justify-center">
      <svg
        viewBox="0 0 16 16"
        className="w-[4.4cqw] h-[4.4cqw]"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M8 3 V13 M3 8 H13" />
      </svg>
    </div>
  );
}

function OwlAvatar() {
  return (
    <span className="shrink-0 w-[5.4cqw] h-[5.4cqw] rounded-full bg-[#FFE0EC] flex items-center justify-center">
      <OwlkaMark transparent className="w-[4.2cqw] h-[4.2cqw]" />
    </span>
  );
}

function IconChip({ glyph }: { glyph: "search" | "doc" | "menu" }) {
  return (
    <span className="w-[8.4cqw] h-[8.4cqw] rounded-[2cqw] bg-[#FFC1D9] flex items-center justify-center text-[#1A1A1F]">
      {glyph === "search" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[4.4cqw] h-[4.4cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="6.8" cy="6.8" r="4.2" />
          <path d="M10.2 10.2 L13.5 13.5" />
        </svg>
      )}
      {glyph === "doc" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[4.4cqw] h-[4.4cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3.6 2.2 H9.4 L12.4 5.2 V13.8 H3.6 Z" />
          <path d="M9.4 2.2 V5.2 H12.4" />
          <path d="M5.6 8.2 H10.4 M5.6 10.2 H10.4 M5.6 12.2 H8.4" />
        </svg>
      )}
      {glyph === "menu" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[4.4cqw] h-[4.4cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M3 4.5 H13 M3 8 H13 M3 11.5 H13" />
        </svg>
      )}
    </span>
  );
}

function ChipButton({
  variant,
  label,
}: {
  variant: "attach" | "pill";
  label?: string;
}) {
  if (variant === "attach") {
    return (
      <span className="w-[7.6cqw] h-[7.6cqw] rounded-[1.6cqw] bg-[#FFC1D9] flex items-center justify-center text-[#1A1A1F]">
        <svg
          viewBox="0 0 16 16"
          className="w-[4.4cqw] h-[4.4cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="2" y="2.5" width="11" height="11" rx="1.8" />
          <path d="M4.6 9.6 L7.2 7.2 L9.6 9.6 L13 6.2" />
          <circle cx="5.4" cy="5.4" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </span>
    );
  }
  return (
    <span className="w-[7.6cqw] h-[7.6cqw] rounded-[1.6cqw] bg-[#FFC1D9] flex items-center justify-center text-[#3A3A40] font-medium text-[2.6cqw] tracking-tight">
      {label}
    </span>
  );
}

function CheckmarkCircleGlyph({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[2.4cqw] h-[2.4cqw]"
      fill={color}
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" />
      <path
        d="M4.8 8.2 L7 10.4 L11.4 6"
        fill="none"
        stroke="#FFC1D9"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaperPlaneGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[5cqw] h-[5cqw]"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2 L2 7.4 L6.6 9.4 L8.6 14 Z" />
      <path d="M14 2 L6.6 9.4" />
    </svg>
  );
}

function SignalGlyph() {
  return (
    <svg
      viewBox="0 0 16 10"
      className="w-[4cqw] h-[2.5cqw]"
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="6" width="2.4" height="4" rx="0.5" />
      <rect x="3.6" y="4" width="2.4" height="6" rx="0.5" />
      <rect x="7.2" y="2" width="2.4" height="8" rx="0.5" />
      <rect x="10.8" y="0" width="2.4" height="10" rx="0.5" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg
      viewBox="0 0 16 12"
      className="w-[4cqw] h-[3cqw]"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 6.5c1.3-1.3 3.1-2 5-2s3.7.7 5 2l-1.2 1.2A5.4 5.4 0 0 0 8 6.2 5.4 5.4 0 0 0 4.2 7.7zM0 3.5C2.1 1.4 5 0.2 8 0.2s5.9 1.2 8 3.3L14.8 4.7A9.6 9.6 0 0 0 8 2 9.6 9.6 0 0 0 1.2 4.7z" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg viewBox="0 0 24 12" className="w-[6.5cqw] h-[3cqw]" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
      <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.6" fill="currentColor" />
    </svg>
  );
}
