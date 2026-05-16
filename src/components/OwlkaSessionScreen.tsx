/**
 * Static, realistic Owlka session UI rendered in HTML for use inside
 * the DeviceFrame. Designed to look like the actual iOS app at the
 * moment a Claude session is mid-flight. No animations, no SVG cartoon
 * — real iOS typography + spacing.
 */
export function OwlkaSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#FAFAF7] flex flex-col text-[#1A1A1F]">
      {/* iOS status bar — 9:41, signal, wifi, battery */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <span className="flex items-center gap-[3px] text-[#1A1A1F]">
          <SignalGlyph />
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* Owlka app header */}
      <div className="relative shrink-0 px-[5%] pt-[1.5%] pb-[2%] flex items-center justify-between">
        <div className="flex items-center gap-[3%]">
          <OwlkaLogoMark />
          <span className="text-[5.8cqw] font-bold tracking-tight">Owlka</span>
        </div>
        <div className="flex items-center gap-[2.5%]">
          <PillIcon glyph="search" />
          <PillIcon glyph="doc" />
          <PillIcon glyph="menu" />
        </div>
      </div>

      {/* session breadcrumb */}
      <div className="relative shrink-0 px-[5%] pb-[2.5%]">
        <div className="inline-flex items-center gap-[2%] h-[3.4%] px-[3%] rounded-full bg-[#FFE0EC] text-[#FF2D7A] text-[3.0cqw] font-semibold tracking-wide">
          <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#FF2D7A] animate-pulse" />
          MAC MINI · CLAUDE · 0:14
        </div>
      </div>

      {/* chat thread */}
      <div className="relative flex-1 px-[5%] overflow-hidden">
        <div className="flex flex-col gap-[3.5%]">
          {/* user voice bubble */}
          <div className="self-end max-w-[78%]">
            <div className="rounded-[6cqw] rounded-br-[1.5cqw] bg-[#FF2D7A] px-[4.5%] py-[3.2%] text-[3.7cqw] leading-snug text-white shadow-sm">
              Build me a Klipper monitor that pings me when the printer pauses.
            </div>
            <div className="mt-[1%] mr-[2%] text-right text-[2.8cqw] text-[#98989D]">
              voice · 9:41
            </div>
          </div>

          {/* owlka reply bubble */}
          <div className="self-start max-w-[82%]">
            <div className="rounded-[6cqw] rounded-bl-[1.5cqw] bg-white border border-[#EFE9E5] px-[4.5%] py-[3.2%] text-[3.7cqw] leading-snug text-[#1A1A1F] shadow-sm">
              <span className="font-semibold text-[#FF2D7A]">Owlka</span>
              <span className="text-[#98989D]"> · plan</span>
              <div className="mt-[2%]">
                Poll Moonraker every 5s. Push when{" "}
                <span className="font-semibold">print_stats.state</span>{" "}
                changes. Reviewer + env-safe gate.
              </div>
            </div>
          </div>

          {/* code diff card */}
          <div className="self-start w-full max-w-[92%]">
            <div className="rounded-[4cqw] bg-[#0d1117] border border-[#1f242c] overflow-hidden shadow-md">
              <div className="px-[3%] py-[1.8%] flex items-center justify-between border-b border-[#1f242c]">
                <div className="flex items-center gap-[1.5%]">
                  <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#ff5f57]" />
                  <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#febc2e]" />
                  <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[2.6cqw] font-mono text-[#8b949e]">
                  klipper_monitor.py
                </span>
                <span className="text-[2.6cqw] font-mono text-[#7ee787]">
                  +14
                </span>
              </div>
              <div className="px-[3%] py-[2.5%] font-mono text-[2.8cqw] leading-[1.55] text-[#e6edf3]">
                <div className="text-[#8b949e]">
                  <span className="text-[#ff7b72]">async def</span>{" "}
                  <span className="text-[#d2a8ff]">watch</span>():
                </div>
                <div className="pl-[5%] text-[#7ee787]">
                  + state = <span className="text-[#a5d6ff]">await</span>{" "}
                  poll_moonraker()
                </div>
                <div className="pl-[5%] text-[#7ee787]">
                  + <span className="text-[#ff7b72]">if</span> state =={" "}
                  <span className="text-[#a5d6ff]">&quot;paused&quot;</span>:
                </div>
                <div className="pl-[10%] text-[#7ee787]">
                  + push(<span className="text-[#a5d6ff]">&quot;Print paused&quot;</span>)
                </div>
                <div className="pl-[5%] text-[#7ee787]">
                  + <span className="text-[#ff7b72]">await</span> asyncio.sleep(
                  <span className="text-[#79c0ff]">5</span>)
                </div>
              </div>
              <div className="px-[3%] py-[1.8%] flex items-center gap-[2%] border-t border-[#1f242c] bg-[#0a0d13]">
                <span className="w-[3.2cqw] h-[3.2cqw] rounded-full bg-[#238636] flex items-center justify-center">
                  <CheckGlyph />
                </span>
                <span className="text-[2.8cqw] font-mono text-[#7ee787] font-semibold">
                  reviewer: APPROVE
                </span>
                <span className="ml-auto text-[2.6cqw] font-mono text-[#8b949e]">
                  build green
                </span>
              </div>
            </div>
          </div>

          {/* status pill */}
          <div className="self-start">
            <div className="inline-flex items-center gap-[2%] h-[3.4%] px-[3%] rounded-full bg-[#E8F8EE] text-[#1A6B33] text-[3.0cqw] font-semibold">
              <span className="w-[1.5cqw] h-[1.5cqw] rounded-full bg-[#22A150]" />
              Pushed to main · 1 commit
            </div>
          </div>
        </div>
      </div>

      {/* input bar */}
      <div className="relative shrink-0 px-[5%] pt-[2%] pb-[4%]">
        <div className="flex items-center gap-[2.5%] h-[5.8%] rounded-full bg-white border border-[#EFE9E5] px-[3.5%] shadow-sm">
          <span className="text-[#98989D] text-[3.5cqw] flex-1">
            Ask Owlka anything…
          </span>
          <span className="shrink-0 w-[6cqw] h-[6cqw] rounded-full bg-[#FF2D7A] flex items-center justify-center shadow-md">
            <MicGlyph />
          </span>
        </div>
        <div className="mt-[2%] flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-black/60" />
        </div>
      </div>
    </div>
  );
}

function OwlkaLogoMark() {
  return (
    <svg viewBox="0 0 32 32" className="w-[8cqw] h-[8cqw]" aria-hidden>
      <circle cx="16" cy="16" r="13" fill="#FF2D7A" />
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

function PillIcon({ glyph }: { glyph: "search" | "doc" | "menu" }) {
  return (
    <span className="w-[8cqw] h-[8cqw] rounded-[2cqw] bg-[#FFE0EC] flex items-center justify-center text-[#1A1A1F]">
      {glyph === "search" && (
        <svg viewBox="0 0 16 16" className="w-[4cqw] h-[4cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="7" cy="7" r="4" />
          <path d="M10 10l3 3" strokeLinecap="round" />
        </svg>
      )}
      {glyph === "doc" && (
        <svg viewBox="0 0 16 16" className="w-[4cqw] h-[4cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M4 2h6l2 2v10H4z" />
          <path d="M6 6h4M6 8.5h4M6 11h3" strokeLinecap="round" />
        </svg>
      )}
      {glyph === "menu" && (
        <svg viewBox="0 0 16 16" className="w-[4cqw] h-[4cqw]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M3 5h10M3 8h10M3 11h10" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

function MicGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.5cqw] h-[3.5cqw]" fill="white" aria-hidden>
      <rect x="6" y="2" width="4" height="8" rx="2" />
      <path d="M4 8a4 4 0 0 0 8 0M8 12v2" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2cqw] h-[2cqw]" fill="none" stroke="white" strokeWidth="2.4" aria-hidden>
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
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
