/**
 * Static, populated Governors-app session rendered in HTML inside the
 * DeviceFrame. Replaces the live-app screenshot which kept showing the
 * "Connection failed" empty state when the backend is offline.
 *
 * Theme mirrors the real app (navy + gold) from TimSharedKit's AppTheme.
 * Content is an inspection-prep Q&A that demonstrates the actual value
 * prop: evidence-grade answers cited against the latest Ofsted framework.
 */
export function GovernorsSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#1A1A2E] flex flex-col text-white">
      {/* iOS status bar */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight text-white">
        <span>9:41</span>
        <span className="flex items-center gap-[3px] text-white">
          <SignalGlyph />
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* nav bar */}
      <div className="relative shrink-0 px-[5%] pt-[1%] pb-[2%] flex items-center justify-between">
        <span className="inline-flex items-center gap-[4%] h-[6cqw] px-[3%] rounded-full bg-[#16213E] text-[#C9A96E] text-[3.0cqw] font-semibold whitespace-nowrap">
          <ChevronLeft />
          New chat
        </span>
        <span className="text-[4.4cqw] font-bold tracking-tight text-white">
          Governors
        </span>
        <span className="inline-flex items-center gap-[6%] h-[6cqw] px-[3%] rounded-full bg-[#16213E] text-[#C9A96E] text-[3.0cqw] font-semibold whitespace-nowrap">
          <GearGlyph />
          <ReloadGlyph />
        </span>
      </div>

      {/* picker bar */}
      <div className="relative shrink-0 bg-[#16213E] px-[5%] py-[1.5%] flex items-center justify-center gap-[6%] text-[3.2cqw] font-semibold text-[#C9A96E]">
        <span className="inline-flex items-center gap-[3%]">
          <BuildingGlyph />
          Victoria
          <ChevronsGlyph />
        </span>
        <span className="w-px h-[3cqw] bg-[#C9A96E]/30" />
        <span className="inline-flex items-center gap-[3%]">
          <CpuGlyph />
          Haiku
          <ChevronsGlyph />
        </span>
      </div>

      {/* chat thread */}
      <div className="relative flex-1 px-[5%] pt-[3%] overflow-hidden">
        <div className="flex flex-col gap-[3%]">
          {/* inspector question bubble */}
          <div className="self-end max-w-[82%]">
            <div className="rounded-[5cqw] rounded-br-[1.5cqw] bg-[#C9A96E] px-[4%] py-[3%] text-[3.4cqw] leading-snug text-[#1A1A2E] font-medium shadow-sm">
              How does Victoria evidence the impact of the new phonics scheme on
              disadvantaged readers in KS1?
            </div>
            <div className="mt-[1%] mr-[1%] text-right text-[2.6cqw] text-[#888]">
              Chair · 9:41
            </div>
          </div>

          {/* agent reply */}
          <div className="self-start max-w-[88%]">
            <div className="rounded-[5cqw] rounded-bl-[1.5cqw] bg-[#16213E] border border-[#C9A96E]/15 px-[4%] py-[3%] text-[3.3cqw] leading-relaxed text-white shadow-sm">
              <div className="flex items-center gap-[2%] mb-[2%]">
                <span className="w-[4cqw] h-[4cqw] rounded-full bg-[#C9A96E] flex items-center justify-center text-[2.4cqw] font-bold text-[#1A1A2E]">
                  G
                </span>
                <span className="text-[2.8cqw] font-semibold text-[#C9A96E] tracking-wide uppercase">
                  Governors agent
                </span>
              </div>
              Phonics screening check pass rate for FSM pupils rose from{" "}
              <span className="font-semibold text-[#C9A96E]">58% to 81%</span>{" "}
              year-on-year (2024 → 2025), closing the gap to non-FSM peers from
              19pts to 4pts. Trend evidenced in the autumn pupil-progress data.
              <div className="mt-[2.5%] pl-[3%] border-l-2 border-[#C9A96E]/40 text-[3.0cqw] text-white/80 italic">
                &ldquo;Where leaders have prioritised reading… disadvantaged
                pupils achieve as well as their peers.&rdquo;
              </div>
              <div className="mt-[1%] text-[2.6cqw] text-[#888]">
                Ofsted School Inspection Handbook, §263 (Sep 2025)
              </div>
            </div>
          </div>

          {/* evidence card */}
          <div className="self-start w-full max-w-[92%]">
            <div className="rounded-[4cqw] bg-[#16213E] border border-[#C9A96E]/20 overflow-hidden shadow-md">
              <div className="px-[3.5%] py-[2%] flex items-center justify-between border-b border-[#C9A96E]/15">
                <span className="inline-flex items-center gap-[2%] text-[2.8cqw] font-semibold text-[#C9A96E] uppercase tracking-wider">
                  <DocGlyph />
                  Evidence pack
                </span>
                <span className="text-[2.6cqw] text-[#888]">3 sources</span>
              </div>
              <div className="px-[3.5%] py-[2.5%] flex flex-col gap-[2%] text-[2.9cqw] text-white/85">
                <EvidenceRow label="PSC results 2024–25.xlsx" tag="Verified" />
                <EvidenceRow label="Pupil-progress autumn report" tag="Cited" />
                <EvidenceRow label="Inspection Handbook Sep 2025" tag="Linked" />
              </div>
            </div>
          </div>

          {/* status pill */}
          <div className="self-start">
            <div className="inline-flex items-center gap-[2%] h-[3.4%] px-[3%] rounded-full bg-[#C9A96E]/15 text-[#C9A96E] text-[3.0cqw] font-semibold">
              <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#C9A96E]" />
              Inspection-ready · saved to evidence file
            </div>
          </div>
        </div>
      </div>

      {/* input bar */}
      <div className="relative shrink-0 px-[5%] pt-[2%] pb-[4%]">
        <div className="flex items-center gap-[2.5%] h-[5.8%] rounded-full bg-[#16213E] border border-[#C9A96E]/20 px-[3.5%] shadow-sm">
          <span className="text-[#888] text-[3.3cqw] flex-1">
            Ask an inspection question…
          </span>
          <span className="shrink-0 w-[6cqw] h-[6cqw] rounded-full bg-[#C9A96E] flex items-center justify-center shadow-md">
            <ArrowUpGlyph />
          </span>
        </div>
        <div className="mt-[2%] flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}

function EvidenceRow({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="flex items-center justify-between gap-[3%]">
      <span className="flex items-center gap-[2%] min-w-0">
        <span className="shrink-0 w-[3.4cqw] h-[3.4cqw] rounded-[1cqw] bg-[#C9A96E]/20 flex items-center justify-center">
          <DocSmallGlyph />
        </span>
        <span className="truncate">{label}</span>
      </span>
      <span className="shrink-0 px-[2.5%] py-[0.4%] rounded-full bg-[#1A1A2E] border border-[#C9A96E]/30 text-[2.4cqw] font-semibold text-[#C9A96E] uppercase tracking-wider">
        {tag}
      </span>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10 3l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronsGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.4cqw] h-[2.4cqw]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 6l3-3 3 3M5 10l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

function ReloadGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M13 4v3h-3M3 12v-3h3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 7a5 5 0 0 0-9-1M3.5 9a5 5 0 0 0 9 1" strokeLinecap="round" />
    </svg>
  );
}

function BuildingGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="2.5" width="10" height="11" rx="0.6" />
      <path d="M5.5 5.5h1M9.5 5.5h1M5.5 8h1M9.5 8h1M5.5 10.5h1M9.5 10.5h1" strokeLinecap="round" />
    </svg>
  );
}

function CpuGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="4" y="4" width="8" height="8" rx="1" />
      <rect x="6.5" y="6.5" width="3" height="3" rx="0.4" />
      <path d="M6 4V2.5M10 4V2.5M6 13.5V12M10 13.5V12M4 6H2.5M4 10H2.5M13.5 6H12M13.5 10H12" strokeLinecap="round" />
    </svg>
  );
}

function DocGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 2h6l2 2v10H4z" />
      <path d="M6 6h4M6 8.5h4M6 11h3" strokeLinecap="round" />
    </svg>
  );
}

function DocSmallGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.2cqw] h-[2.2cqw]" fill="none" stroke="#C9A96E" strokeWidth="1.8" aria-hidden>
      <path d="M4 2h6l2 2v10H4z" />
    </svg>
  );
}

function ArrowUpGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.5cqw] h-[3.5cqw]" fill="none" stroke="#1A1A2E" strokeWidth="2.4" aria-hidden>
      <path d="M8 12V4M4 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignalGlyph() {
  return (
    <svg viewBox="0 0 16 10" className="w-[4cqw] h-[2.5cqw]" fill="currentColor" aria-hidden>
      <rect x="0" y="6" width="2.4" height="4" rx="0.5" />
      <rect x="3.6" y="4" width="2.4" height="6" rx="0.5" />
      <rect x="7.2" y="2" width="2.4" height="8" rx="0.5" />
      <rect x="10.8" y="0" width="2.4" height="10" rx="0.5" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg viewBox="0 0 16 12" className="w-[4cqw] h-[3cqw]" fill="currentColor" aria-hidden>
      <path d="M8 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 6.5c1.3-1.3 3.1-2 5-2s3.7.7 5 2l-1.2 1.2A5.4 5.4 0 0 0 8 6.2 5.4 5.4 0 0 0 4.2 7.7zM0 3.5C2.1 1.4 5 0.2 8 0.2s5.9 1.2 8 3.3L14.8 4.7A9.6 9.6 0 0 0 8 2 9.6 9.6 0 0 0 1.2 4.7z" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg viewBox="0 0 24 12" className="w-[6.5cqw] h-[3cqw]" aria-hidden>
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
      <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.6" fill="currentColor" />
    </svg>
  );
}
