/**
 * PrinterPilot iOS app — faithful copy of the real "analytics" pane Tim
 * captured. Three stacked graphs: Speed Profile (green spikes), Layer
 * Complexity (red spikes), ETA History (gold ascending line). Top chrome
 * is "◀ Owlka" back affordance + status bar.
 *
 * Palette = TimSharedKit AppTheme (navy bg #1A1A2E, card #16213E, chart
 * bg #0D1520, gold accent #C9A96E).
 */
export function PrinterPilotSessionScreen() {
  return (
    <div className="relative h-full w-full bg-[#1A1A2E] flex flex-col text-[#E0E0E0]">
      {/* iOS status bar — white glyphs on navy */}
      <div className="relative shrink-0 h-[5.6%] flex items-end justify-between pb-[1.5%] px-[8%] text-[3.6cqw] font-semibold tracking-tight text-white">
        <span>9:41</span>
        <span className="flex items-center gap-[1.4cqw] text-white">
          <SignalDots />
          <WifiGlyph />
          <BatteryGlyph />
        </span>
      </div>

      {/* "◀ Owlka" back affordance */}
      <div className="relative shrink-0 px-[5%] pt-[0.6%] pb-[1.2%] flex items-center">
        <span className="inline-flex items-center gap-[1cqw] text-[3.4cqw] font-medium text-white/95">
          <BackChevron />
          Owlka
        </span>
      </div>

      {/* scrollable analytics pane — three graphs */}
      <div className="relative flex-1 overflow-hidden px-[4%] flex flex-col gap-[2.4cqw]">
        <GraphCard
          title="Speed Profile"
          legend={
            <div className="flex items-center gap-[2.2cqw] text-[2cqw] mt-[1cqw]">
              <LegendDot color="#3DC88A" label="Optimal %" />
              <LegendDot color="#3DC8D2" label="Current" />
              <LegendDot color="#C9A96E" label="Set: 80%" outlined />
            </div>
          }
        >
          <SpeedProfileGraph />
        </GraphCard>

        <GraphCard
          title="Layer Complexity"
          legend={
            <div className="flex items-center gap-[2.2cqw] text-[1.9cqw] mt-[1cqw] text-[#AAA]">
              <span>Low α = simple</span>
              <span className="text-[#FF6B6B]">High α = complex</span>
            </div>
          }
        >
          <LayerComplexityGraph />
        </GraphCard>

        <GraphCard
          title="ETA History"
          badge={
            <span className="inline-flex items-center gap-[0.6cqw] h-[3.6cqw] px-[1.4cqw] rounded-[1cqw] bg-[#3A1A1F] text-[#FF8A8A] text-[1.9cqw] font-semibold">
              ↗ 40m late
            </span>
          }
          footer={
            <div className="mt-[1cqw] text-right text-[2cqw] text-[#C9A96E] font-semibold">
              Current ETA: Fri 04:06
            </div>
          }
        >
          <EtaHistoryGraph />
        </GraphCard>
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

function GraphCard({
  title,
  badge,
  legend,
  footer,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  legend?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.6cqw] bg-[#16213E] p-[1.6cqw]">
      <div className="flex items-center justify-between mb-[1cqw]">
        <span className="text-[2.6cqw] font-semibold text-white tracking-tight">
          {title}
        </span>
        {badge}
      </div>
      <div className="rounded-[1cqw] bg-[#0D1520] p-[1cqw]">
        {children}
      </div>
      {legend}
      {footer}
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
    <span className="inline-flex items-center gap-[0.6cqw] text-[#CCC]">
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

function SpeedProfileGraph() {
  // Generate a noisy green spike profile across width 0..1180, height 0..600.
  // Most spikes 200-400, occasional drops to 50, target line at 80%.
  const points: string[] = [];
  const N = 240;
  for (let i = 0; i < N; i++) {
    const x = (i / N) * 1180;
    // base ~300, ±150 noise, plus occasional dip
    const noise = Math.sin(i * 2.13) * 120 + Math.cos(i * 0.71) * 80 + (Math.sin(i * 4.7) * 60);
    let y = 320 + noise;
    if (i % 17 === 3) y = 60;
    y = Math.max(20, Math.min(560, y));
    points.push(`${x.toFixed(1)},${(600 - y).toFixed(1)}`);
  }
  const yAxisLabels = [600, 400, 200, 0];
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-[34cqw]" preserveAspectRatio="none" aria-hidden>
      {/* y axis labels */}
      {yAxisLabels.map((v, i) => (
        <g key={v}>
          <text x="6" y={20 + i * 200} fontSize="34" fill="#666">
            {v}
          </text>
          <line
            x1="100"
            x2="1280"
            y1={i * 200 + 10}
            y2={i * 200 + 10}
            stroke="#1B2738"
            strokeWidth="1"
          />
        </g>
      ))}
      {/* set: 80% dashed line (at y=600-80*7.5*… use proportional) */}
      <line
        x1="100"
        x2="1280"
        y1={720 - (80 / 600) * 720}
        y2={720 - (80 / 600) * 720}
        stroke="#C9A96E"
        strokeDasharray="14 10"
        strokeWidth="1.6"
        opacity="0.85"
      />
      {/* y label rotated */}
      <text x="10" y="380" fontSize="32" fill="#888" transform="rotate(-90, 10, 380)">
        Speed %
      </text>
      {/* green spike chart */}
      <polyline
        points={points.map((p) => {
          const [x, y] = p.split(",");
          return `${100 + parseFloat(x)},${(parseFloat(y) / 600) * 720}`;
        }).join(" ")}
        fill="none"
        stroke="#3DC88A"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      {/* current marker — blue dot near 85% across */}
      <line x1={100 + 0.78 * 1180} x2={100 + 0.78 * 1180} y1="0" y2="720" stroke="#3DC8D2" strokeDasharray="6 4" strokeWidth="1" opacity="0.6" />
      <circle cx={100 + 0.78 * 1180} cy={720 - (200 / 600) * 720} r="8" fill="#3DC8D2" />
      {/* x axis labels */}
      <text x="100" y="710" fontSize="30" fill="#666">0</text>
      <text x="430" y="710" fontSize="30" fill="#666">300</text>
      <text x="760" y="710" fontSize="30" fill="#666">600</text>
      <text x="1090" y="710" fontSize="30" fill="#666">900</text>
      <text x="640" y="710" fontSize="30" fill="#888" textAnchor="middle"></text>
    </svg>
  );
}

function LayerComplexityGraph() {
  // Red spike profile, y axis 0..0.8
  const points: string[] = [];
  const N = 240;
  for (let i = 0; i < N; i++) {
    const x = (i / N) * 1180;
    let alpha = 0.25 + Math.sin(i * 0.31) * 0.05 + Math.cos(i * 1.7) * 0.12 + Math.sin(i * 3.1) * 0.08;
    if (i > 70 && i < 200) alpha += 0.25; // mid section more complex
    alpha = Math.max(0.05, Math.min(0.78, alpha));
    const y = 720 - (alpha / 0.8) * 720;
    points.push(`${100 + x.toFixed(1)},${y.toFixed(1)}`);
  }
  const labels = [0.8, 0.6, 0.4, 0.2, 0];
  return (
    <svg viewBox="0 0 1280 720" className="w-full h-[34cqw]" preserveAspectRatio="none" aria-hidden>
      {labels.map((v, i) => (
        <g key={v}>
          <text x="6" y={20 + i * 180} fontSize="34" fill="#666">
            {v.toFixed(1)}
          </text>
          <line
            x1="100"
            x2="1280"
            y1={i * 180 + 10}
            y2={i * 180 + 10}
            stroke="#1B2738"
            strokeWidth="1"
          />
        </g>
      ))}
      <text x="10" y="380" fontSize="36" fill="#888" transform="rotate(-90, 10, 380)">
        α
      </text>
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#FF6B6B"
        strokeWidth="1.4"
      />
      {/* current marker (blue dot ~78%) */}
      <line x1={100 + 0.78 * 1180} x2={100 + 0.78 * 1180} y1="0" y2="720" stroke="#3DC8D2" strokeDasharray="6 4" strokeWidth="1" opacity="0.6" />
      <circle cx={100 + 0.78 * 1180} cy={720 - (0.18 / 0.8) * 720} r="8" fill="#3DC8D2" />
      <text x="100" y="710" fontSize="30" fill="#666">0</text>
      <text x="430" y="710" fontSize="30" fill="#666">300</text>
      <text x="760" y="710" fontSize="30" fill="#666">600</text>
      <text x="1090" y="710" fontSize="30" fill="#666">900</text>
    </svg>
  );
}

function EtaHistoryGraph() {
  // Gold ascending line — Sun 02:06 -> Sun 03:13 over elapsed 0..8h
  const labels = ["Sun 03:13", "Sun 02:40", "Sun 02:06"];
  return (
    <svg viewBox="0 0 1280 540" className="w-full h-[24cqw]" preserveAspectRatio="none" aria-hidden>
      {labels.map((v, i) => (
        <g key={v}>
          <text x="6" y={40 + i * 220} fontSize="32" fill="#888">
            {v}
          </text>
          <line
            x1="240"
            x2="1280"
            y1={i * 220 + 30}
            y2={i * 220 + 30}
            stroke="#1B2738"
            strokeWidth="1"
          />
        </g>
      ))}
      {/* gold ascending line */}
      <polyline
        points="240,440 380,400 540,360 720,300 880,250 1040,180 1200,100"
        fill="none"
        stroke="#C9A96E"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* x axis */}
      <text x="240" y="525" fontSize="30" fill="#666">0</text>
      <text x="480" y="525" fontSize="30" fill="#666">2</text>
      <text x="720" y="525" fontSize="30" fill="#666">4</text>
      <text x="960" y="525" fontSize="30" fill="#666">6</text>
      <text x="1200" y="525" fontSize="30" fill="#666">8</text>
      <text x="720" y="525" fontSize="30" fill="#888" textAnchor="middle"></text>
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
