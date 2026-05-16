/**
 * Castle Federation Ofsted Agent — faithful HTML mock of the real
 * governors.timtrailor.com web app rendered inside the device frame.
 *
 * Palette captured from `~/code/ofsted-agent/app.py`:
 *   NAVY   #2a2e45   question bubble bg / open-file pill bg variant
 *   GOLD   #C1A559   question border, gold accents
 *   GREEN  #2dcc70   answer border, bullet arrows, model label
 *   IVORY  #faf8f2   evidence inset bg
 *   PILL   #1e3a5f   open-file pill bg, gold text on top
 *
 * Content is a real transcript slice from the PDF Tim uploaded
 * (Castle Federation, Victoria school, 2026-05).
 */
export function GovernorsSessionScreen() {
  return (
    <div className="relative h-full w-full bg-white flex flex-col text-[#2a2e45]">
      {/* iOS status bar (dark glyphs on white) */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight">
        <span>9:41</span>
        <span className="flex items-center gap-[3px]">
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* app title row */}
      <div className="relative shrink-0 px-[5%] pt-[1%] pb-[1.5%] flex items-center justify-between border-b border-black/5">
        <span className="inline-flex items-center gap-[2%]">
          <CastleGlyph />
          <span className="text-[3.6cqw] font-bold tracking-tight text-[#2a2e45]">
            Castle Federation
          </span>
        </span>
        <span className="text-[2.8cqw] font-semibold text-[#C1A559] uppercase tracking-wider">
          Ofsted Agent
        </span>
      </div>

      {/* filter bar: 5 controls — School / Synth / Approach / Time / New Chat */}
      <div className="relative shrink-0 px-[3%] pt-[1.8%] pb-[1.8%] bg-[#f7f6f1] border-b border-black/5">
        <div className="grid grid-cols-5 gap-[1.2cqw]">
          <FilterCell label="School" value="Victoria" />
          <FilterCell label="Synth" value="Sonnet" />
          <FilterCell label="Approach" value="Hybrid" />
          <FilterCell label="Time" value="All" />
          <div className="flex flex-col">
            <span className="text-[1.8cqw] font-semibold text-[#888] uppercase tracking-wider mb-[0.4cqw]">
              &nbsp;
            </span>
            <span className="h-[5.6cqw] rounded-[1.2cqw] bg-[#2a2e45] text-white text-[2.4cqw] font-semibold flex items-center justify-center gap-[0.6cqw]">
              <span className="text-[#C1A559]">+</span>
              New Chat
            </span>
          </div>
        </div>
      </div>

      {/* chat thread */}
      <div className="relative flex-1 overflow-hidden px-[4%] pt-[3%] flex flex-col gap-[2.4cqw]">
        {/* question bubble — right aligned, navy bg, gold left border */}
        <div className="self-end max-w-[88%]">
          <div className="rounded-[2cqw] bg-[#2a2e45] text-white border-l-[0.9cqw] border-[#C1A559] px-[3.5%] py-[2.4%] shadow-sm">
            <div className="text-[2.2cqw] font-semibold uppercase tracking-wider text-[#C1A559] mb-[0.8cqw]">
              Tim&rsquo;s Question
            </div>
            <div className="text-[2.9cqw] leading-snug">
              What are the key functions governors must fulfil at Victoria,
              and how are we evidencing the disadvantaged-pupil gap?
            </div>
          </div>
        </div>

        {/* answer bubble — left aligned, white bg, green left border */}
        <div className="self-start w-full">
          <div className="rounded-[2cqw] bg-white border border-black/8 border-l-[0.9cqw] border-l-[#2dcc70] px-[3.5%] py-[2.6%] shadow-sm">
            <div className="text-[2.2cqw] font-semibold uppercase tracking-wider text-[#2dcc70] mb-[1cqw]">
              Answer for Tim &middot; Sonnet (balanced)
            </div>

            <ul className="flex flex-col gap-[1cqw] text-[2.7cqw] leading-snug text-[#2a2e45]">
              <ArrowBullet>
                <strong>Strategic direction</strong> — set vision, ethos, and
                three-year priorities (Oracy, Writing, PPG gap, Attendance,
                Budget).
              </ArrowBullet>
              <ArrowBullet>
                <strong>Hold leaders to account</strong> — Rebecca Roberts (EHT)
                reports termly; Lisa Freeman leads PPG; Nicci Boddam-Whetham is
                link governor.
              </ArrowBullet>
              <ArrowBullet>
                <strong>Oversee financial probity</strong> — £7,575 PPG
                allocation tracked against impact on FSM readers.
              </ArrowBullet>
              <ArrowBullet>
                <strong>Evidence the gap</strong> — attendance 96.3%, EYFS GLD
                81%, PSC 86.7% (whole) / 50% (FSM) — gap is the standing item.
              </ArrowBullet>
            </ul>

            {/* evidence inset — ivory bg, gold tint */}
            <div className="mt-[2cqw] rounded-[1.4cqw] bg-[#faf8f2] border border-[#C1A559]/30 px-[3%] py-[2%]">
              <div className="flex items-center gap-[1cqw] text-[2.2cqw] font-semibold text-[#9a8038] uppercase tracking-wider mb-[0.8cqw]">
                <ChartGlyph />
                Evidence
              </div>
              <ul className="flex flex-col gap-[0.6cqw] text-[2.4cqw] leading-snug text-[#4a4530]">
                <li className="flex items-start gap-[1cqw]">
                  <span className="shrink-0 mt-[0.8cqw] w-[1cqw] h-[1cqw] rounded-full bg-[#C1A559]" />
                  <span>
                    Governor Functions and Responsibilities — Castle Federation
                    Governance Handbook
                  </span>
                </li>
                <li className="flex items-start gap-[1cqw]">
                  <span className="shrink-0 mt-[0.8cqw] w-[1cqw] h-[1cqw] rounded-full bg-[#C1A559]" />
                  <span>
                    Pupil Premium Strategy 2025–26, Victoria — sections 2 &amp; 4
                  </span>
                </li>
                <li className="flex items-start gap-[1cqw]">
                  <span className="shrink-0 mt-[0.8cqw] w-[1cqw] h-[1cqw] rounded-full bg-[#C1A559]" />
                  <span>
                    Autumn pupil-progress report — PSC and EYFS GLD tables
                  </span>
                </li>
              </ul>
            </div>

            {/* open-file pills */}
            <div className="mt-[1.6cqw] flex flex-wrap gap-[1cqw]">
              <OpenFilePill name="Governance Handbook.docx" />
              <OpenFilePill name="PPG Strategy 25-26.docx" />
            </div>
          </div>
        </div>
      </div>

      {/* compose bar */}
      <div className="relative shrink-0 px-[4%] pt-[2%] pb-[3%] border-t border-black/5 bg-white">
        <div className="flex items-center gap-[1.5cqw] h-[6.4cqw] rounded-[1.4cqw] bg-[#f7f6f1] border border-black/8 px-[3%]">
          <span className="text-[#888] text-[2.7cqw] flex-1 truncate">
            Ask another inspection question…
          </span>
          <span className="shrink-0 w-[5cqw] h-[5cqw] rounded-[1cqw] bg-[#2a2e45] flex items-center justify-center">
            <ArrowUpGlyph />
          </span>
        </div>
        <div className="mt-[1.6%] flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-black/40" />
        </div>
      </div>
    </div>
  );
}

function FilterCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-[1.8cqw] font-semibold text-[#888] uppercase tracking-wider mb-[0.4cqw]">
        {label}
      </span>
      <span className="h-[5.6cqw] rounded-[1.2cqw] bg-white border border-black/10 px-[1.2cqw] flex items-center justify-between gap-[0.4cqw] text-[2.4cqw] font-semibold text-[#2a2e45]">
        <span className="truncate">{value}</span>
        <ChevronDown />
      </span>
    </div>
  );
}

function ArrowBullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-[1.2cqw]">
      <span className="shrink-0 text-[#2dcc70] font-bold leading-none mt-[0.4cqw] text-[3cqw]">
        →
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

function OpenFilePill({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-[0.8cqw] h-[4.4cqw] px-[1.6cqw] rounded-[1cqw] bg-[#1e3a5f] text-[#C9A96E] text-[2.2cqw] font-semibold">
      <FolderGlyph />
      <span>Open: {name}</span>
    </span>
  );
}

function CastleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-[4cqw] h-[4cqw] text-[#C1A559]" fill="currentColor" aria-hidden>
      <path d="M3 10V7h2v2h2V7h2v2h2V7h2v2h2V7h2v2h2V7h2v3h-1v10h-3v-5h-4v5H4V10z" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2cqw] h-[2cqw] text-[#888]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.6cqw] h-[2.6cqw]" fill="none" stroke="#9a8038" strokeWidth="1.8" aria-hidden>
      <path d="M2 13h12M4 11V7M7 11V4M10 11V8M13 11V6" strokeLinecap="round" />
    </svg>
  );
}

function FolderGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.4cqw] h-[2.4cqw]" fill="currentColor" aria-hidden>
      <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h2.8l1.4 1.5h4.8A1.5 1.5 0 0 1 14 6v6a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12V4.5z" />
    </svg>
  );
}

function ArrowUpGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3cqw] h-[3cqw]" fill="none" stroke="#C1A559" strokeWidth="2.4" aria-hidden>
      <path d="M8 12V4M4 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
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
