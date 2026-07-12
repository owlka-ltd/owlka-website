/**
 * PrinterPilot iOS app — faithful copy of the real dashboard order:
 * camera snapshot at top, then progress / ETA / temps, then the manual
 * speed slider with Apply button, then a Speed Profile sparkline as a
 * hint of the deeper analytics view. Maps to DashboardView.swift body
 * order (camera L116, progress L121, ETA L133, temps L155, speed L173,
 * SpeedProfileChart L188).
 *
 * Palette = TimSharedKit AppTheme (navy bg #1A1A2E, card #16213E, chart
 * bg #0D1520, gold accent #C9A96E, green #3DC88A, red #FF6B6B, teal
 * #3DC8D2).
 */
export function PrinterPilotSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#1A1A2E] flex flex-col text-[#E0E0E0]">
      {/* iOS status bar */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight text-white">
        <span>22:26</span>
        <span className="flex items-center gap-[1.4cqw] text-white">
          <SignalDots />
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* "◀ Owlka" back affordance + printer name */}
      <div className="relative shrink-0 px-[5%] pt-[0.6%] pb-[1%] flex items-center justify-between">
        <span className="inline-flex items-center gap-[1cqw] text-[3.4cqw] font-medium text-white/95">
          <BackChevron />
          Owlka
        </span>
        <span className="inline-flex items-center gap-[1cqw] h-[4.2cqw] px-[1.6cqw] rounded-full bg-[#3DC88A]/18 text-[#3DC88A] text-[2.2cqw] font-bold uppercase tracking-wider">
          <span className="w-[1.4cqw] h-[1.4cqw] rounded-full bg-[#3DC88A]" />
          Printing
        </span>
      </div>

      {/* scrollable pane */}
      <div className="relative flex-1 overflow-hidden px-[3.5%] flex flex-col gap-[1.6cqw]">
        <div className="text-[3.2cqw] font-semibold text-white tracking-tight pl-[0.5cqw]">
          Sovol SV08 Max
        </div>

        {/* CAMERA frame — stylised live feed of the printer bed */}
        <CameraSnapshot />

        {/* progress bar */}
        <ProgressRow percent={62.3} />

        {/* layer + ETA row */}
        <div className="flex items-center justify-between text-[2.5cqw]">
          <span className="inline-flex items-center gap-[1cqw] text-white/85">
            <LayerGlyph />
            <span className="text-white/60">Layers</span>
            <span className="font-mono font-semibold text-white">218 / 350</span>
          </span>
          <span className="inline-flex items-center gap-[1cqw] text-white/85">
            <ClockGlyph />
            <span className="text-white/60">ETA</span>
            <span className="font-mono font-semibold text-[#C9A96E]">Fri 04:06</span>
          </span>
        </div>

        {/* temperatures: bed + nozzle */}
        <div className="grid grid-cols-2 gap-[1.6cqw]">
          <TempTile label="Bed" temp={65} target={65} color="#3DC8D2" />
          <TempTile label="Nozzle" temp={228} target={230} color="#FF8A5A" />
        </div>

        {/* SPEED SLIDER — manual speed factor, 50-250%, with Apply */}
        <SpeedSliderCard />

        {/* Speed Profile sparkline — hint of the analytics view */}
        <SpeedProfileSparkline />
      </div>

      {/* home indicator */}
      <div className="relative shrink-0 pb-[2%] pt-[1.5%]">
        <div className="flex justify-center">
          <div className="w-[28%] h-[0.5%] rounded-full bg-white/85" />
        </div>
      </div>
    </div>
  );
}

function CameraSnapshot() {
  // Stylised view of a printer bed mid-print: dark scene, partially
  // printed teal object, gantry hint, "LIVE" pill + timestamp overlay.
  return (
    <div className="relative w-full aspect-[16/10] rounded-[1.6cqw] overflow-hidden border border-white/8 bg-[#0A0E18]">
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden>
        {/* warm overhead glow */}
        <defs>
          <radialGradient id="cam-glow" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#3A2A1A" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#161018" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#070910" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="bed-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1B1F2A" />
            <stop offset="100%" stopColor="#0A0D14" />
          </linearGradient>
          <linearGradient id="part-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5BD4D8" />
            <stop offset="100%" stopColor="#1F8A8E" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#cam-glow)" />
        {/* build plate */}
        <polygon points="35,170 285,170 305,135 15,135" fill="url(#bed-grad)" />
        <polygon points="15,135 305,135 305,128 15,128" fill="#262C3A" />
        {/* layer lines on the bed */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={30 + i * 10}
            x2={290 - i * 10}
            y1={170 - i * 5}
            y2={170 - i * 5}
            stroke="#1A2030"
            strokeWidth="0.6"
          />
        ))}
        {/* partially printed object — stepped teal block */}
        <polygon
          points="120,168 220,168 232,148 108,148"
          fill="#0E2A30"
        />
        <polygon
          points="115,148 225,148 235,124 105,124"
          fill="url(#part-grad)"
          opacity="0.92"
        />
        <polygon
          points="105,124 235,124 232,118 108,118"
          fill="#4FBABF"
        />
        {/* infill grid hint on top face */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1={110 + i * 16}
            x2={130 + i * 16}
            y1={124}
            y2={118}
            stroke="#0E2A30"
            strokeWidth="0.7"
            opacity="0.8"
          />
        ))}
        {/* nozzle + gantry */}
        <line x1="0" y1="60" x2="320" y2="60" stroke="#22293A" strokeWidth="2.2" />
        <line x1="0" y1="56" x2="320" y2="56" stroke="#3A4458" strokeWidth="0.8" />
        <rect x="178" y="58" width="22" height="6" fill="#2F3848" />
        <polygon points="184,64 194,64 192,76 186,76" fill="#C9A96E" />
        <line x1="189" y1="76" x2="189" y2="118" stroke="#3DC88A" strokeWidth="0.6" opacity="0.5" />
        {/* warm point-light blob near nozzle */}
        <circle cx="189" cy="118" r="3.2" fill="#FFB066" opacity="0.85" />
        <circle cx="189" cy="118" r="7" fill="#FFB066" opacity="0.18" />
      </svg>

      {/* LIVE pill */}
      <div className="absolute top-[1.2cqw] left-[1.4cqw] inline-flex items-center gap-[0.8cqw] h-[3.4cqw] px-[1.2cqw] rounded-full bg-black/55 backdrop-blur text-white text-[1.9cqw] font-bold uppercase tracking-wider">
        <span className="w-[1.2cqw] h-[1.2cqw] rounded-full bg-[#FF4D4D] animate-pulse" />
        Live
      </div>
      {/* timestamp */}
      <div className="absolute top-[1.2cqw] right-[1.4cqw] h-[3.4cqw] px-[1.2cqw] rounded-full bg-black/55 backdrop-blur text-white/85 text-[1.9cqw] font-mono">
        22:26:14
      </div>
      {/* fps counter */}
      <div className="absolute bottom-[1.2cqw] right-[1.4cqw] text-white/70 text-[1.8cqw] font-mono">
        1 fps · garage cam
      </div>
    </div>
  );
}

function ProgressRow({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col gap-[0.8cqw]">
      <div className="flex items-center justify-between text-[2.4cqw]">
        <span className="text-white/60">Progress</span>
        <span className="font-mono font-bold text-[#C9A96E] text-[2.8cqw]">
          {percent.toFixed(1)}%
        </span>
      </div>
      <div className="relative h-[1.8cqw] rounded-full bg-white/8 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#C9A96E]/85 to-[#C9A96E]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function TempTile({
  label,
  temp,
  target,
  color,
}: {
  label: string;
  temp: number;
  target: number;
  color: string;
}) {
  return (
    <div className="rounded-[1.4cqw] bg-[#16213E] px-[1.8cqw] py-[1.4cqw]">
      <div className="flex items-center justify-between text-[2.1cqw]">
        <span className="text-white/55">{label}</span>
        <span className="text-white/45 font-mono text-[1.9cqw]">→ {target}°</span>
      </div>
      <div className="mt-[0.4cqw] font-mono text-[3.6cqw] font-bold tabular-nums" style={{ color }}>
        {temp}°
      </div>
    </div>
  );
}

function SpeedSliderCard() {
  // Manual speed slider — DashboardView.swift L692, range 50-250 step 5.
  // Shown at 78% so it matches the analytics "current" marker.
  const pct = 78;
  const min = 50;
  const max = 250;
  const ratio = (pct - min) / (max - min);
  return (
    <div className="rounded-[1.6cqw] bg-[#16213E] px-[1.8cqw] py-[1.6cqw]">
      <div className="flex items-center justify-between text-[2.4cqw]">
        <span className="inline-flex items-center gap-[1cqw] text-white/75">
          <SpeedoGlyph />
          <span>Speed factor</span>
        </span>
        <span className="font-mono font-bold text-white text-[3cqw]">
          {pct}%
        </span>
      </div>

      {/* slider track */}
      <div className="relative mt-[1.4cqw] h-[2.4cqw] flex items-center">
        <div className="absolute inset-x-0 h-[0.7cqw] rounded-full bg-white/12" />
        <div
          className="absolute h-[0.7cqw] rounded-full bg-[#C9A96E]"
          style={{ width: `${ratio * 100}%` }}
        />
        <div
          className="absolute w-[3.4cqw] h-[3.4cqw] rounded-full bg-white shadow-[0_0_0_0.6cqw_rgba(201,169,110,0.18)]"
          style={{ left: `calc(${ratio * 100}% - 1.7cqw)` }}
        />
      </div>
      <div className="mt-[0.4cqw] flex items-center justify-between text-[1.8cqw] text-white/45 font-mono">
        <span>50%</span>
        <span>250%</span>
      </div>

      <button className="mt-[1.4cqw] w-full h-[6.2cqw] rounded-[1.2cqw] bg-[#C9A96E] text-[#1A1A2E] text-[2.6cqw] font-bold flex items-center justify-center">
        Apply {pct}%
      </button>
    </div>
  );
}

// Precomputed points for the Speed Profile chart (green-spike shape below
// the slider). Baked to a static string instead of computed from
// Math.sin/Math.cos at render time: those trig functions are not
// guaranteed bit-identical between Node's SSR engine and the browser's,
// and toFixed() amplified the last-bit drift into a real React hydration
// mismatch on every load. A static literal renders byte-identical on
// server and client.
const SPARKLINE_POINTS =
  "100.0,76.67 105.9,69.20 111.8,134.81 117.7,190.00 123.6,98.34 129.5,185.40 135.4,105.02 141.3,47.98 147.2,122.22 153.1,84.09 159.0,57.11 164.9,122.00 170.8,106.20 176.7,127.17 182.6,163.07 188.5,72.35 194.4,79.38 200.3,139.31 206.2,48.93 212.1,53.32 218.0,190.00 223.9,114.08 229.8,114.08 235.7,144.08 241.6,85.33 247.5,104.02 253.4,109.14 259.3,26.33 265.2,94.40 271.1,161.49 277.0,81.56 282.9,113.71 288.8,163.60 294.7,88.29 300.6,87.09 306.5,89.58 312.4,49.35 318.3,190.00 324.2,128.55 330.1,68.53 336.0,154.03 341.9,162.41 347.8,54.17 353.7,87.84 359.6,107.59 365.5,57.37 371.4,106.26 377.3,112.95 383.2,98.60 389.1,171.40 395.0,119.76 400.9,46.21 406.8,125.18 412.7,100.81 418.6,190.00 424.5,113.59 430.4,132.69 436.3,107.54 442.2,149.35 448.1,101.48 454.0,78.10 459.9,133.11 465.8,58.28 471.7,38.27 477.6,152.29 483.5,123.45 489.4,86.02 495.3,152.82 501.2,116.16 507.1,83.40 513.0,105.25 518.9,190.00 524.8,79.54 530.7,155.52 536.6,84.14 542.5,99.54 548.4,182.04 554.3,98.87 560.2,62.18 566.1,107.50 572.0,66.85 577.9,88.63 583.8,127.21 589.7,82.00 595.6,141.21 601.5,171.01 607.4,58.22 613.3,79.12 619.2,190.00 625.1,52.21 631.0,75.04 636.9,132.75 642.8,105.67 648.7,144.84 654.6,134.01 660.5,59.76 666.4,117.41 672.3,111.51 678.2,23.33 684.1,101.26 690.0,153.99 695.9,92.49 701.8,129.41 707.7,134.58 713.6,82.23 719.5,190.00 725.4,73.70 731.3,36.47 737.2,141.08 743.1,130.72 749.0,69.15 754.9,154.13 760.8,145.84 766.7,66.10 772.6,95.68 778.5,77.53 784.4,66.64 790.3,135.09 796.2,96.38 802.1,92.97 808.0,184.25 813.9,112.41 819.8,190.00 825.7,118.72 831.6,87.76 837.5,56.64 843.4,120.31 849.3,106.12 855.2,124.21 861.1,166.11 867.0,76.13 872.9,74.01 878.8,140.25 884.7,54.78 890.6,48.74 896.5,146.02 902.4,116.89 908.3,113.27 914.2,144.87 920.1,190.00 926.0,101.77 931.9,113.61 937.8,27.63 943.7,87.13 949.6,163.16 955.5,85.78 961.4,109.06 967.3,163.41 973.2,91.69 979.1,86.80 985.0,91.15 990.9,47.54 996.8,117.41 1002.7,133.09 1008.6,67.75 1014.5,147.89 1020.4,190.00 1026.3,58.10 1032.2,83.79 1038.1,108.32 1044.0,58.38 1049.9,104.81 1055.8,114.11 1061.7,95.33 1067.6,170.07 1073.5,126.44 1079.4,44.76 1085.3,120.59 1091.2,106.13 1097.1,32.80 1103.0,108.66 1108.9,133.30 1114.8,107.44 1120.7,190.00 1126.6,104.18 1132.5,74.77 1138.4,133.70 1144.3,64.26 1150.2,33.61 1156.1,147.85 1162.0,128.42 1167.9,85.42 1173.8,150.12 1179.7,118.45 1185.6,83.46 1191.5,107.11 1197.4,48.67 1203.3,73.86 1209.2,156.59 1215.1,88.75 1221.0,190.00 1226.9,180.74 1232.8,105.02 1238.7,61.34 1244.6,106.15 1250.5,67.75 1256.4,86.69 1262.3,129.03 1268.2,81.61 1274.1,135.81";

function SpeedProfileSparkline() {
  // Compressed Speed Profile chart — same green-spike shape as the
  // analytics view but small enough to live below the slider.
  return (
    <div className="rounded-[1.6cqw] bg-[#16213E] px-[1.6cqw] py-[1.4cqw]">
      <div className="flex items-center justify-between mb-[0.8cqw]">
        <span className="text-[2.4cqw] font-semibold text-white">
          Speed profile
        </span>
        <span className="text-[1.9cqw] text-white/45">layer 218</span>
      </div>
      <div className="rounded-[1cqw] bg-[#0D1520] px-[0.6cqw] py-[0.8cqw]">
        <svg
          viewBox="0 0 1300 240"
          preserveAspectRatio="none"
          className="w-full h-[16cqw]"
          aria-hidden
        >
          <line
            x1="100"
            x2="1300"
            y1={210 - (80 / 600) * 200}
            y2={210 - (80 / 600) * 200}
            stroke="#C9A96E"
            strokeDasharray="10 8"
            strokeWidth="1.4"
            opacity="0.8"
          />
          <polyline
            points={SPARKLINE_POINTS}
            fill="none"
            stroke="#3DC88A"
            strokeWidth="1.4"
          />
          <line
            x1={100 + 0.78 * 1180}
            x2={100 + 0.78 * 1180}
            y1="0"
            y2="240"
            stroke="#3DC8D2"
            strokeDasharray="5 4"
            strokeWidth="1"
            opacity="0.6"
          />
          <circle cx={100 + 0.78 * 1180} cy={210 - (200 / 600) * 200} r="6" fill="#3DC8D2" />
        </svg>
      </div>
      <div className="mt-[0.8cqw] flex items-center gap-[2cqw] text-[1.9cqw] text-white/55">
        <LegendDot color="#3DC88A" label="Actual" />
        <LegendDot color="#3DC8D2" label="Current" />
        <LegendDot color="#C9A96E" label="Set 80%" outlined />
      </div>
    </div>
  );
}

function LegendDot({
  color,
  label,
  outlined,
}: {
  color: string;
  label: string;
  outlined?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-[0.6cqw]">
      <span
        className="w-[1.4cqw] h-[1.4cqw] rounded-full"
        style={
          outlined
            ? { border: `0.3cqw solid ${color}` }
            : { background: color }
        }
      />
      {label}
    </span>
  );
}

function SpeedoGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.4cqw] h-[3.4cqw]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2.5 11.5 A6 6 0 1 1 13.5 11.5" />
      <path d="M8 11.5 L11 6" />
      <circle cx="8" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LayerGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.2cqw] h-[3.2cqw]" fill="none" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 2 L14 5 L8 8 L2 5 Z" />
      <path d="M2 8 L8 11 L14 8" />
      <path d="M2 11 L8 14 L14 11" />
    </svg>
  );
}

function ClockGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.2cqw] h-[3.2cqw]" fill="none" stroke="#C9A96E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5 V8 L10.6 9.6" />
    </svg>
  );
}

function BackChevron() {
  return (
    <svg viewBox="0 0 16 16" className="w-[3.2cqw] h-[3.2cqw]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 3 L5 8 L10 13" />
    </svg>
  );
}

function SignalDots() {
  return (
    <svg viewBox="0 0 16 8" className="w-[4.4cqw] h-[2.4cqw]" fill="currentColor" aria-hidden>
      <circle cx="1.4" cy="6.5" r="1" />
      <circle cx="4.4" cy="6.5" r="1" />
      <circle cx="1.4" cy="3.5" r="1" opacity="0.45" />
      <circle cx="4.4" cy="3.5" r="1" opacity="0.45" />
    </svg>
  );
}

function WifiGlyph() {
  return (
    <svg viewBox="0 0 16 12" className="w-[4.4cqw] h-[3.2cqw]" fill="currentColor" aria-hidden>
      <path d="M8 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 6.5c1.3-1.3 3.1-2 5-2s3.7.7 5 2l-1.2 1.2A5.4 5.4 0 0 0 8 6.2 5.4 5.4 0 0 0 4.2 7.7zM0 3.5C2.1 1.4 5 0.2 8 0.2s5.9 1.2 8 3.3L14.8 4.7A9.6 9.6 0 0 0 8 2 9.6 9.6 0 0 0 1.2 4.7z" />
    </svg>
  );
}

function BatteryGlyph() {
  return (
    <svg viewBox="0 0 26 12" className="w-[7cqw] h-[3.2cqw]" aria-hidden>
      <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" fill="currentColor" />
      <rect x="23.5" y="3.5" width="1.6" height="5" rx="0.6" fill="currentColor" />
      <text
        x="11.5"
        y="9"
        fontSize="6"
        fontWeight="700"
        textAnchor="middle"
        fill="#0d1216"
      >
        80
      </text>
    </svg>
  );
}
