/**
 * PrinterPilot iOS app — real chrome captured from Tim's phone 2026-05-17.
 * Palette = TimSharedKit AppTheme (navy bg #1A1A2E, card #16213E, gold
 * accent #C9A96E, chart bg #0D1520, body text #E0E0E0).
 *
 * The real app is a long scrollable dashboard. The website pane shows
 * the most informative slice: header + printer tabs + active-print card
 * (title + status + webcam + progress + temps) + Speed Factor slider +
 * bottom nav. Mirrors PrinterDetailView / DashboardView.
 */
export function PrinterPilotSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#1A1A2E] flex flex-col text-[#E0E0E0]">
      {/* iOS status bar (white glyphs on navy) */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight text-white">
        <span>9:41</span>
        <span className="flex items-center gap-[3px]">
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* "Printers" title + refresh */}
      <div className="relative shrink-0 px-[6%] pt-[1%] pb-[1.5%] flex items-center justify-center">
        <span className="text-[4.8cqw] font-semibold text-white tracking-tight">
          Printers
        </span>
        <span className="absolute right-[6%] w-[8cqw] h-[8cqw] rounded-full border border-white/25 flex items-center justify-center text-[#C9A96E]">
          <RefreshGlyph />
        </span>
      </div>

      {/* 3-printer tab selector — SV08 Max active */}
      <div className="relative shrink-0 px-[4%] pt-[1.5%]">
        <div className="flex items-stretch rounded-[3cqw] bg-[#0D1520] p-[0.6cqw]">
          <PrinterTab label="SV08 Max" active />
          <PrinterTab label="Bambu A1" active={false} />
          <PrinterTab label="U1" active={false} />
        </div>
      </div>

      {/* main scrollable pane */}
      <div className="relative flex-1 overflow-hidden px-[4%] pt-[1.8%] flex flex-col gap-[1.6cqw]">
        {/* printer header — title + status pill + filename */}
        <div>
          <div className="flex items-center justify-between gap-[2cqw]">
            <span className="text-[3.8cqw] font-bold text-white tracking-tight">
              Sovol SV08 Max
            </span>
            <span className="shrink-0 inline-flex items-center gap-[1cqw] h-[4.8cqw] px-[1.6cqw] rounded-full bg-[#1B3A2E] text-[#3DC88A] text-[2.2cqw] font-semibold">
              <span className="w-[1.2cqw] h-[1.2cqw] rounded-full bg-[#3DC88A]" />
              printing
            </span>
          </div>
          <div className="mt-[0.4cqw] font-mono text-[2cqw] text-[#888] truncate">
            275pct_Zephyros_PLA_0.2_1d4h35m.gcode
          </div>
        </div>

        {/* webcam panel — clearly framed live feed */}
        <div className="relative w-full aspect-[16/9] rounded-[2cqw] overflow-hidden bg-[#0D1520] ring-1 ring-white/8">
          <WebcamMock />
          <span className="absolute top-[1.2cqw] left-[1.2cqw] inline-flex items-center gap-[0.8cqw] h-[3.2cqw] px-[1.4cqw] rounded-full bg-black/65 backdrop-blur text-[1.8cqw] font-semibold text-white">
            <span className="w-[1cqw] h-[1cqw] rounded-full bg-[#FF4D6D] animate-pulse" />
            LIVE
          </span>
          <span className="absolute top-[1.2cqw] right-[1.2cqw] inline-flex items-center gap-[0.6cqw] h-[3.2cqw] px-[1.2cqw] rounded-full bg-black/65 backdrop-blur text-[1.7cqw] font-medium text-white/85">
            <CameraGlyph />
            Webcam
          </span>
        </div>

        {/* progress strip — bar + percent + layers/ETA inline */}
        <div>
          <div className="flex items-center justify-between text-[2cqw] text-[#AAA]">
            <span>Layer 277 / 501</span>
            <span>ETA <span className="text-[#C9A96E] font-semibold">02:57</span> · 3h 0m left</span>
          </div>
          <div className="mt-[0.6cqw] h-[1.4cqw] rounded-full bg-[#0D1520] overflow-hidden relative">
            <div
              className="h-full rounded-full bg-[#C9A96E]"
              style={{ width: "91%" }}
            />
            <span className="absolute right-[0.6cqw] top-1/2 -translate-y-1/2 text-[1.6cqw] font-bold text-[#1A1A2E]">
              91.0%
            </span>
          </div>
        </div>

        {/* temperature graphs — hotend + bed sparklines */}
        <div className="rounded-[2cqw] bg-[#16213E] p-[1.8cqw]">
          <div className="flex items-center justify-between mb-[1cqw]">
            <span className="text-[2.2cqw] font-medium text-[#E0E0E0]">
              Temperatures
            </span>
            <span className="text-[1.8cqw] text-[#888]">last 5 min</span>
          </div>
          <div className="grid grid-cols-2 gap-[1.4cqw]">
            <TempCard
              label="Hotend"
              current="218.4"
              target="220"
              color="#FF6B6B"
              path="M0,24 L6,22 L12,18 L18,15 L24,12 L30,10 L36,8 L42,7 L48,6.5 L54,6.5 L60,6 L66,6"
            />
            <TempCard
              label="Bed"
              current="60.1"
              target="60"
              color="#3DC8D2"
              path="M0,22 L6,20 L12,17 L18,14 L24,12 L30,11 L36,10.5 L42,10 L48,10 L54,10 L60,10 L66,10"
            />
          </div>
        </div>

        {/* Speed Factor control panel */}
        <div className="rounded-[2cqw] bg-[#16213E] p-[1.8cqw]">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-[1cqw] text-[2.4cqw] text-[#E0E0E0]">
              <GaugeGlyph />
              <span className="font-medium">Speed Factor</span>
            </span>
            <span className="text-[2.8cqw] font-bold text-white">100%</span>
          </div>
          <div className="mt-[1cqw] flex items-center gap-[1.2cqw]">
            <span className="text-[1.8cqw] text-[#888]">50%</span>
            <div className="flex-1 h-[1.2cqw] rounded-full bg-[#0D1520] overflow-hidden relative">
              <div
                className="absolute inset-y-0 left-0 bg-[#C9A96E]"
                style={{ width: "25%" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-[3.2cqw] h-[3.2cqw] rounded-full bg-white shadow"
                style={{ left: "calc(25% - 1.6cqw)" }}
              />
            </div>
            <span className="text-[1.8cqw] text-[#888]">250%</span>
          </div>
          <div className="mt-[0.8cqw] flex items-center justify-between text-[1.9cqw]">
            <span className="text-[#C9A96E]/80">Live Velocity</span>
            <span className="font-mono font-semibold text-white">22.7 mm/s</span>
          </div>
        </div>
      </div>

      {/* bottom tab bar */}
      <div className="relative shrink-0 px-[3%] pb-[2%] pt-[1.5%]">
        <div className="flex items-stretch rounded-[5cqw] bg-[#0D1520]/85 backdrop-blur px-[1.5cqw] py-[1cqw]">
          <BottomTab label="Printers" active glyph="printer" />
          <BottomTab label="Control" glyph="controller" />
          <BottomTab label="Console" glyph="console" />
          <BottomTab label="Alerts" glyph="bell" />
          <BottomTab label="Settings" glyph="gear" />
        </div>
        <div className="mt-[1.2%] flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-white/85" />
        </div>
      </div>
    </div>
  );
}

function PrinterTab({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`flex-1 text-center py-[1.6cqw] rounded-[2.4cqw] text-[2.6cqw] font-semibold tracking-tight ${
        active
          ? "bg-[#3A445C] text-white"
          : "text-[#AAA]"
      }`}
    >
      {label}
    </span>
  );
}

function TempCard({
  label,
  current,
  target,
  color,
  path,
}: {
  label: string;
  current: string;
  target: string;
  color: string;
  path: string;
}) {
  return (
    <div className="rounded-[1.4cqw] bg-[#0D1520] px-[1.2cqw] py-[1cqw]">
      <div className="flex items-baseline justify-between">
        <span className="text-[1.8cqw] font-medium text-[#AAA]">{label}</span>
        <span className="text-[1.6cqw] text-[#666]">→ {target}°C</span>
      </div>
      <div className="flex items-baseline gap-[0.6cqw] mt-[0.2cqw]">
        <span className="text-[2.6cqw] font-bold" style={{ color }}>
          {current}
        </span>
        <span className="text-[1.6cqw] text-[#888]">°C</span>
      </div>
      <svg viewBox="0 0 66 28" className="mt-[0.4cqw] w-full h-[7cqw]" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={`tempFill-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.35" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L66,28 L0,28 Z`} fill={`url(#tempFill-${label})`} />
        <path d={path} stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CameraGlyph() {
  return (
    <svg viewBox="0 0 16 12" className="w-[2.4cqw] h-[1.8cqw]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="1" y="2.5" width="10" height="7" rx="1.2" />
      <path d="M11 4.5 L15 2.5 V9.5 L11 7.5 Z" />
    </svg>
  );
}

function WebcamMock() {
  return (
    <svg viewBox="0 0 160 90" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bedGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1B2738" />
          <stop offset="1" stopColor="#0A0F18" />
        </linearGradient>
        <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FF6BA0" />
          <stop offset="0.25" stopColor="#FFD66B" />
          <stop offset="0.5" stopColor="#7ED957" />
          <stop offset="0.75" stopColor="#3DC8D2" />
          <stop offset="1" stopColor="#A36BFF" />
        </linearGradient>
        <linearGradient id="topGantry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2C3A52" />
          <stop offset="1" stopColor="#1B2738" />
        </linearGradient>
      </defs>
      {/* enclosure interior */}
      <rect x="0" y="0" width="160" height="90" fill="url(#bedGrad)" />
      {/* gantry rail across top */}
      <rect x="0" y="14" width="160" height="6" fill="url(#topGantry)" />
      {/* toolhead */}
      <g transform="translate(78,18)">
        <rect x="-7" y="0" width="14" height="11" rx="1.5" fill="#5A6E8C" />
        <rect x="-3.5" y="11" width="7" height="6" fill="#3A445C" />
        <circle cx="0" cy="18.5" r="1.4" fill="#FFC1D9" />
      </g>
      {/* bed plate */}
      <rect x="6" y="68" width="148" height="4" fill="#3A445C" />
      {/* rainbow striped print rows */}
      {Array.from({ length: 7 }).map((_, i) => (
        <g key={i} transform={`translate(0,${66 - i * 2.1})`}>
          <rect x="22" y="0" width="116" height="1.8" fill="url(#rainbow)" opacity={1 - i * 0.04} rx="0.4" />
        </g>
      ))}
      {/* a few stringy wisps */}
      <path d="M 40 50 Q 55 45 62 58" stroke="#FFD66B" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 95 52 Q 110 47 120 60" stroke="#7ED957" strokeWidth="0.4" fill="none" opacity="0.55" />
      <path d="M 70 55 Q 78 50 85 60" stroke="#FF6BA0" strokeWidth="0.35" fill="none" opacity="0.5" />
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.4cqw] h-[2.4cqw]" fill="currentColor" aria-hidden>
      <path d="M4 2h8v3H4zM3 6h10a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-1V10H4v2H3a1.5 1.5 0 0 1-1.5-1.5v-3A1.5 1.5 0 0 1 3 6zm2 5h6v3H5z" />
    </svg>
  );
}

function GaugeGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[2.8cqw] h-[2.8cqw] text-[#C9A96E]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 8 L11.2 5.6" />
      <circle cx="8" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

function RefreshGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[4cqw] h-[4cqw]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 4 V7 H10" />
      <path d="M3 12 V9 H6" />
      <path d="M12.6 7 A5 5 0 0 0 4 6.4" />
      <path d="M3.4 9 A5 5 0 0 0 12 9.6" />
    </svg>
  );
}

function BottomTab({
  label,
  glyph,
  active,
}: {
  label: string;
  glyph: "printer" | "controller" | "console" | "bell" | "gear";
  active?: boolean;
}) {
  const color = active ? "#C9A96E" : "#AAA";
  return (
    <div className="flex-1 flex flex-col items-center gap-[0.4cqw] py-[0.6cqw]">
      <div
        className={`w-[8.5cqw] h-[6.4cqw] rounded-[2cqw] flex items-center justify-center ${
          active ? "bg-[#1F2A40]" : ""
        }`}
        style={{ color }}
      >
        {glyph === "printer" && <PrinterIcon />}
        {glyph === "controller" && (
          <svg viewBox="0 0 16 16" className="w-[3.4cqw] h-[3.4cqw]" fill="currentColor" aria-hidden>
            <path d="M5 5h6a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-.4l-1.1-1.1A1.5 1.5 0 0 0 8.4 9.5H7.6a1.5 1.5 0 0 0-1.1.4L5.4 11H5a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3z" />
            <circle cx="4.5" cy="8" r="0.7" fill="#1A1A2E" />
            <circle cx="6" cy="8" r="0.7" fill="#1A1A2E" />
            <circle cx="11" cy="7.4" r="0.6" fill="#1A1A2E" />
            <circle cx="12" cy="8.6" r="0.6" fill="#1A1A2E" />
          </svg>
        )}
        {glyph === "console" && (
          <svg viewBox="0 0 16 16" className="w-[3.4cqw] h-[3.4cqw]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="2" y="3" width="12" height="10" rx="1.5" />
            <path d="M5 6.5 L7 8.5 L5 10.5" />
            <path d="M9 10.5 H11.5" />
          </svg>
        )}
        {glyph === "bell" && (
          <svg viewBox="0 0 16 16" className="w-[3.2cqw] h-[3.2cqw]" fill="currentColor" aria-hidden>
            <path d="M8 1.5a4 4 0 0 0-4 4v2.2L2.6 10.5a.6.6 0 0 0 .5.9h9.8a.6.6 0 0 0 .5-.9L12 7.7V5.5a4 4 0 0 0-4-4zm-1.5 12h3a1.5 1.5 0 0 1-3 0z" />
          </svg>
        )}
        {glyph === "gear" && (
          <svg viewBox="0 0 16 16" className="w-[3.4cqw] h-[3.4cqw]" fill="currentColor" aria-hidden>
            <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm6.8 1.6l-1.4-.2a5 5 0 0 0-.5-1.2l.9-1.1a.5.5 0 0 0 0-.7l-1.2-1.2a.5.5 0 0 0-.7 0l-1.1.9a5 5 0 0 0-1.2-.5L9.4 1.2A.5.5 0 0 0 8.9 1H7.1a.5.5 0 0 0-.5.2l-.2 1.4a5 5 0 0 0-1.2.5l-1.1-.9a.5.5 0 0 0-.7 0L2.2 3.4a.5.5 0 0 0 0 .7l.9 1.1a5 5 0 0 0-.5 1.2l-1.4.2A.5.5 0 0 0 1 7.1v1.8a.5.5 0 0 0 .2.5l1.4.2c.1.4.3.8.5 1.2l-.9 1.1a.5.5 0 0 0 0 .7l1.2 1.2a.5.5 0 0 0 .7 0l1.1-.9c.4.2.8.4 1.2.5l.2 1.4a.5.5 0 0 0 .5.2h1.8a.5.5 0 0 0 .5-.2l.2-1.4c.4-.1.8-.3 1.2-.5l1.1.9a.5.5 0 0 0 .7 0l1.2-1.2a.5.5 0 0 0 0-.7l-.9-1.1c.2-.4.4-.8.5-1.2l1.4-.2a.5.5 0 0 0 .2-.5V7.1a.5.5 0 0 0-.2-.5z" />
          </svg>
        )}
      </div>
      <span className="text-[1.8cqw] font-medium" style={{ color }}>
        {label}
      </span>
    </div>
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
      <rect x="2" y="2" width="18" height="8" rx="1" fill="#3DC88A" />
      <rect x="22.5" y="3.5" width="1.5" height="5" rx="0.6" fill="currentColor" />
    </svg>
  );
}
