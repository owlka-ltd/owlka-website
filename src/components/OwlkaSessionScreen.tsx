/**
 * The Owlka iOS app is a tmux-terminal pane (not an iMessage-style chat).
 * Content here is REAL captured output from Tim's live Claude Code
 * session on the Mac Mini, rendered with the actual OwlkaTheme palette
 * (mint background, pink/grey tabs, monospace pane).
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

      {/* Owlka top bar — logo + pink iconChip buttons */}
      <div className="relative shrink-0 px-[4%] pt-[0.5%] pb-[1%] flex items-center justify-between">
        <div className="flex items-center gap-[2%]">
          <OwlkaLogoMark />
          <span className="text-[5.4cqw] font-bold tracking-tight text-[#1A1A1F]">
            Owlka
          </span>
        </div>
        <div className="flex items-center gap-[2.5%]">
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

      {/* tmux pane content — REAL captured Claude session */}
      <div className="relative flex-1 px-[3%] pt-[1%] overflow-hidden">
        <div className="font-mono text-[2.4cqw] leading-[1.55] text-[#1A1A1F]/85 whitespace-pre">
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

        <div className="mt-[2%] font-mono text-[2.4cqw] leading-[1.55] whitespace-pre">
          <span className="text-[#FF6BA0] font-semibold">⏺ Bash</span>
          <span className="text-[#1A1A1F]/85">{`(cd ~/code/tim-claude-
      controlplane && python3.11 -m
      pytest scenarios/test_kill_swit
      ch_alert.py -x -q)
  ⎿  `}</span>
          <span className="text-[#22A150] font-semibold">{`.....   [100%]
     5 passed in 0.39s`}</span>
        </div>

        <div className="mt-[2%] font-mono text-[2.4cqw] leading-[1.55] whitespace-pre">
          <span className="text-[#FF6BA0] font-semibold">⏺</span>
          <span className="text-[#1A1A1F]/85"> All 5 tests pass. Commit + push controlplane:</span>
        </div>

        {/* active todo footer (mimics Claude Code's task spinner) */}
        <div className="mt-[3%] rounded-[2cqw] border border-[#FFB8D4] bg-[#FFF8FA] px-[3%] py-[2%] font-mono text-[2.3cqw] leading-[1.65]">
          <div className="flex items-center gap-[1.5%] text-[#FF6BA0] font-semibold">
            <SpinnerGlyph />
            Fixing kill-switch title + adding 30-min debounce…
          </div>
          <div className="mt-[1%] text-[#1A1A1F]/80">
            ◼  Kill-switch alert title says &quot;tripped&quot;…
          </div>
          <div className="text-[#1A1A1F]/55">
            ◻  Investigate enrich slot exhaustion (T4 ca…
          </div>
          <div className="text-[#1A1A1F]/55">
            ◻  Scope: rename TerminalApp → Owlka everywh…
          </div>
          <div className="text-[#22A150]">
            ✔  Extend response_quality_check.py with dec…
          </div>
          <div className="text-[#22A150]">
            ✔  Add &quot;Decision-ask checklist&quot; section to r…
          </div>
          <div className="text-[#1A1A1F]/55 mt-[0.5%]">
            … +32 completed
          </div>
        </div>
      </div>

      {/* input row — very-pale-pink wash matching OwlkaTheme.inputBg */}
      <div className="relative shrink-0 px-[3%] pb-[1.5%] pt-[1.5%]">
        <div className="flex items-center gap-[2%] h-[5.4%] rounded-[2.4cqw] bg-[#FFF8FA] border border-[#E5EEE8] px-[3%]">
          <span className="text-[#1A1A1F]/45 text-[3.0cqw] flex-1 font-mono">
            esc to interrupt · ctrl+t to hide tasks
          </span>
          <span className="shrink-0 w-[7cqw] h-[7cqw] rounded-[1.8cqw] bg-[#FF6BA0] flex items-center justify-center">
            <ArrowUpGlyph />
          </span>
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
  return (
    <div
      className={`flex-1 min-w-0 rounded-[1.6cqw] px-[2.5%] py-[1.4%] flex items-start gap-[3%] ${
        active ? "bg-[#FFC1D9]" : "bg-[#707A8C]"
      }`}
    >
      <div className="flex flex-col items-center gap-[1cqw] shrink-0">
        <span
          className={`text-[2.6cqw] font-bold ${
            active ? "text-[#3A3A40]" : "text-white"
          }`}
        >
          {number}
        </span>
        <span
          className={`w-[1.5cqw] h-[1.5cqw] rounded-full ${
            status === "working"
              ? "bg-[#3DC8D2]"
              : active
                ? "bg-[#3A3A40]/70"
                : "bg-white/85"
          }`}
        />
      </div>
      <span
        className={`text-[2.4cqw] leading-[1.25] line-clamp-3 ${
          active
            ? "text-[#3A3A40] font-semibold"
            : "text-white font-medium"
        }`}
      >
        {summary}
      </span>
    </div>
  );
}

function OwlkaLogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="w-[10cqw] h-[10cqw]" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#FF6BA0" />
      <circle cx="11.5" cy="14" r="2.4" fill="#FAFAF7" />
      <circle cx="20.5" cy="14" r="2.4" fill="#FAFAF7" />
      <circle cx="11.5" cy="14" r="1.1" fill="#1A1A1F" />
      <circle cx="20.5" cy="14" r="1.1" fill="#1A1A1F" />
      <path
        d="M 11 21 Q 16 24 21 21"
        stroke="#1A1A1F"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChip({ glyph }: { glyph: "search" | "doc" | "menu" }) {
  return (
    <span className="w-[7.2cqw] h-[7.2cqw] rounded-[1.6cqw] bg-[#FFC1D9] flex items-center justify-center text-[#1A1A1F]">
      {glyph === "search" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[3.6cqw] h-[3.6cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="7" cy="7" r="4" />
          <path d="M10 10l3 3" strokeLinecap="round" />
        </svg>
      )}
      {glyph === "doc" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[3.6cqw] h-[3.6cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden
        >
          <path d="M4 2h6l2 2v10H4z" />
          <path d="M6 6h4M6 8.5h4M6 11h3" strokeLinecap="round" />
        </svg>
      )}
      {glyph === "menu" && (
        <svg
          viewBox="0 0 16 16"
          className="w-[3.6cqw] h-[3.6cqw]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M3 5h10M3 8h10M3 11h10" strokeLinecap="round" />
        </svg>
      )}
    </span>
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

function ArrowUpGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-[3.8cqw] h-[3.8cqw]"
      fill="none"
      stroke="#1A1A1F"
      strokeWidth="2.4"
      aria-hidden
    >
      <path
        d="M8 12V4M4 8l4-4 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
