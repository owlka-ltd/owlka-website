import { OwlkaMark } from "./OwlkaMark";

/**
 * The Owlka iOS app is a tmux-terminal pane (not an iMessage-style chat).
 * Content here is REAL captured output from Tim's live Claude Code
 * session on the Mac Mini, rendered with the actual OwlkaTheme palette
 * (mint background, pink/grey tabs, monospace pane).
 *
 * Chrome elements (top bar, tab bar, input row) mirror the real
 * SwiftUI sources in ~/code/TerminalApp/TerminalApp/Views/.
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

      {/* Owlka top bar — real "OKa" brand mark + SF-Symbol iconChips */}
      <div className="relative shrink-0 px-[4%] pt-[0.5%] pb-[1%] flex items-center justify-between">
        <div className="flex items-center gap-[1.5%]">
          <OwlkaMark transparent className="w-[12cqw] h-[12cqw]" />
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

      {/* tmux tab bar — pink active, slate inactive */}
      <div className="relative shrink-0 px-[4%] pt-[1%] pb-[1.5%] flex items-stretch gap-[1.8%] overflow-hidden">
        <TmuxTab
          number={1}
          active
          status="working"
          summary="kill-switch alert correctness"
        />
        <TmuxTab
          number={2}
          active={false}
          status="done"
          summary="owlka-website hero fix"
        />
        <TmuxTab
          number={3}
          active={false}
          status="done"
          summary="memory topic audit"
        />
      </div>

      {/* tmux pane content — REAL captured Claude session.
          The todo footer at the end is part of the pane itself
          (Claude renders it inline), not a separate iOS card. */}
      <div className="relative flex-1 px-[3%] pt-[1%] overflow-hidden font-mono text-[2.4cqw] leading-[1.55]">
        <div className="text-[#1A1A1F]/85 whitespace-pre">
{`⏺ Update(scenarios/test_kill_switch_alert.py)
  ⎿  Added 7 lines, removed 4 lines
    41 +    # Point the kill-switch file constants
    42 +    # at a temp path that doesn't exist so
    43 +    # trip_kill_switch's "already tripped"
    44 +    # early return never fires.
    47    import tempfile
    48    td = Path(tempfile.mkdtemp())
    49    for attr in ("KILL_MASTER", "KILL_TIER3",`}
        </div>

        <div className="mt-[1.5%] whitespace-pre">
          <span className="text-[#FF6BA0] font-semibold">⏺ Bash</span>
          <span className="text-[#1A1A1F]/85">{`(cd ~/code/tim-claude-
      controlplane && python3.11 -m
      pytest scenarios/test_kill_swit
      ch_alert.py -x -q)
  ⎿  `}</span>
          <span className="text-[#22A150] font-semibold">{`.....   [100%]
     5 passed in 0.39s`}</span>
        </div>

        <div className="mt-[1.5%] whitespace-pre">
          <span className="text-[#FF6BA0] font-semibold">⏺</span>
          <span className="text-[#1A1A1F]/85"> All 5 tests pass. Commit + push controlplane:</span>
        </div>

        {/* active todo footer — rendered as inline pane text, NOT a card.
            This matches how Claude Code prints the "✻ ... ⎿ ◼/◻/✔" block
            directly into the tmux pane. */}
        <div className="mt-[2%] whitespace-pre">
          <span className="text-[#FF6BA0] font-semibold inline-flex items-center gap-[1cqw]">
            <SpinnerGlyph />
            <span>✻ Fixing kill-switch title + adding 30-min debounce…</span>
          </span>
        </div>
        <div className="whitespace-pre">
          <span className="text-[#1A1A1F]/85">{`  ⎿ ◼ Kill-switch alert title says "tripped" wh…
    ◻ Investigate enrich slot exhaustion (T4 ca…
    ◻ Scope: rename TerminalApp → Owlka everywh…
`}</span>
          <span className="text-[#22A150]">{`    ✔ Extend response_quality_check.py with dec…
    ✔ Add "Decision-ask checklist" section to r…
`}</span>
          <span className="text-[#1A1A1F]/55">     … +32 completed</span>
        </div>
      </div>

      {/* input row — mirrors SplitTerminalView.swift L2570-2663:
          attach + ctrl + esc + text editor + circular send button */}
      <div className="relative shrink-0 px-[3%] pb-[1.5%] pt-[1.5%]">
        <div className="flex items-stretch gap-[1.8cqw] bg-white/95 rounded-[2cqw] p-[1.8cqw]">
          <ChipButton variant="attach" />
          <ChipButton variant="ctrl" label="ctrl" />
          <ChipButton variant="esc" label="esc" />
          <div className="flex-1 min-w-0 rounded-[1.8cqw] bg-[#FFF8FA] border border-[#FF6BA0]/30 px-[2.5cqw] flex items-center">
            <span className="text-[#1A1A1F]/40 text-[2.6cqw] truncate">
              Ask anything · ⌘K for skills
            </span>
          </div>
          <button
            type="button"
            className="shrink-0 w-[8.4cqw] h-[8.4cqw] rounded-full bg-[#FF6BA0] flex items-center justify-center"
            aria-label="Send"
          >
            <SendGlyph />
          </button>
        </div>
        <div className="mt-[1.5%] flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-black/60" />
        </div>
      </div>
    </div>
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
      className={`flex-1 min-w-0 rounded-[1.6cqw] px-[2.5%] py-[1.4%] flex items-start gap-[3%] ${
        active ? "bg-[#FFC1D9]" : "bg-[#707A8C]"
      }`}
    >
      <div className="flex flex-col items-center gap-[1cqw] shrink-0">
        <span
          className="text-[2.6cqw] font-bold"
          style={{ color: fg }}
        >
          {number}
        </span>
        {status === "working" ? (
          <span
            className="w-[1.6cqw] h-[1.6cqw] rounded-full bg-[#3DC8D2]"
            aria-label="working"
          />
        ) : (
          <CheckmarkCircleGlyph color={fg} />
        )}
      </div>
      <span
        className={`text-[2.4cqw] leading-[1.25] line-clamp-3 ${
          active ? "font-semibold" : "font-medium"
        }`}
        style={{ color: fg }}
      >
        {summary}
      </span>
    </div>
  );
}

function IconChip({ glyph }: { glyph: "search" | "doc" | "menu" }) {
  return (
    <span className="w-[8cqw] h-[8cqw] rounded-[1.8cqw] bg-[#FFC1D9] flex items-center justify-center text-[#1A1A1F]">
      {glyph === "search" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[4.2cqw] h-[4.2cqw]"
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
          className="w-[4.2cqw] h-[4.2cqw]"
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
          className="w-[4.2cqw] h-[4.2cqw]"
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
  variant: "attach" | "ctrl" | "esc";
  label?: string;
}) {
  if (variant === "attach") {
    return (
      <span className="shrink-0 w-[8cqw] h-[8cqw] rounded-[1.6cqw] bg-[#FFC1D9] flex items-center justify-center text-[#1A1A1F]">
        <svg
          viewBox="0 0 16 16"
          className="w-[4.4cqw] h-[4.4cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10.6 3.8 L4.6 9.8 a2.4 2.4 0 1 0 3.4 3.4 L13.4 7.8 a3.6 3.6 0 1 0 -5.1 -5.1 L3.5 7.5" />
        </svg>
      </span>
    );
  }
  return (
    <span className="shrink-0 px-[2.4cqw] h-[8cqw] rounded-[1.6cqw] bg-[#FFC1D9] flex items-center justify-center text-[#3A3A40] font-medium text-[2.6cqw] tracking-tight">
      {label}
    </span>
  );
}

function CheckmarkCircleGlyph({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[2.2cqw] h-[2.2cqw]"
      fill={color}
      aria-hidden
    >
      <circle cx="8" cy="8" r="7" />
      <path
        d="M4.8 8.2 L7 10.4 L11.4 6"
        fill="none"
        stroke="#F5FBF7"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[2.6cqw] h-[2.6cqw] animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 6.5 6.5" strokeLinecap="round" />
    </svg>
  );
}

function SendGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[4.2cqw] h-[4.2cqw]"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 12.5 V3.5 M4 7.5 L8 3.5 L12 7.5" />
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
