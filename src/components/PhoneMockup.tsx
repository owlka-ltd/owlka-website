type ScreenKind = "governors" | "printer" | "bgt" | "dragon";

type Props = {
  kind: ScreenKind;
  className?: string;
};

export function PhoneMockup({ kind, className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 220 440"
        className="w-full h-auto drop-shadow-2xl"
        aria-hidden
      >
        <defs>
          <linearGradient id={`phone-bezel-${kind}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1a1f" />
            <stop offset="1" stopColor="#2a2a30" />
          </linearGradient>
          <clipPath id={`screen-clip-${kind}`}>
            <rect x="12" y="14" width="196" height="412" rx="32" />
          </clipPath>
        </defs>

        <rect
          x="4"
          y="6"
          width="212"
          height="428"
          rx="40"
          fill={`url(#phone-bezel-${kind})`}
        />
        <rect
          x="12"
          y="14"
          width="196"
          height="412"
          rx="32"
          fill="#FAFAF7"
        />

        <g clipPath={`url(#screen-clip-${kind})`}>
          {kind === "governors" && <GovernorsScreen />}
          {kind === "printer" && <PrinterScreen />}
          {kind === "bgt" && <BgtScreen />}
          {kind === "dragon" && <DragonScreen />}
        </g>

        <rect
          x="78"
          y="22"
          width="64"
          height="18"
          rx="9"
          fill="#1a1a1f"
        />
      </svg>
    </div>
  );
}

function GovernorsScreen() {
  return (
    <g>
      <rect x="12" y="14" width="196" height="64" fill="#FFE0EC" />
      <text x="28" y="58" fill="#FF2D7A" fontSize="13" fontWeight="700">
        Castle Vale · Governors
      </text>

      <rect x="22" y="92" width="176" height="42" rx="10" fill="#FFFFFF" stroke="#EFE9E5" />
      <circle cx="36" cy="113" r="6" fill="#FF2D7A" />
      <text x="50" y="110" fill="#1A1A1F" fontSize="9" fontWeight="600">Safeguarding evidence</text>
      <text x="50" y="124" fill="#98989D" fontSize="7">Drafted · 4 sources cited</text>

      <rect x="22" y="142" width="176" height="42" rx="10" fill="#FFFFFF" stroke="#EFE9E5" />
      <circle cx="36" cy="163" r="6" fill="#FFB8D4" />
      <text x="50" y="160" fill="#1A1A1F" fontSize="9" fontWeight="600">SEND provision review</text>
      <text x="50" y="174" fill="#98989D" fontSize="7">Match to framework 6.2</text>

      <rect x="22" y="192" width="176" height="42" rx="10" fill="#FFFFFF" stroke="#EFE9E5" />
      <circle cx="36" cy="213" r="6" fill="#FF2D7A" />
      <text x="50" y="210" fill="#1A1A1F" fontSize="9" fontWeight="600">Attendance trends</text>
      <text x="50" y="224" fill="#98989D" fontSize="7">Term comparison ready</text>

      <rect x="22" y="252" width="176" height="100" rx="14" fill="#FFE8F1" />
      <text x="34" y="274" fill="#FF2D7A" fontSize="8" fontWeight="700">INSPECTOR Q</text>
      <text x="34" y="290" fill="#1A1A1F" fontSize="9" fontWeight="600">How do you know it's working?</text>
      <rect x="34" y="302" width="152" height="36" rx="8" fill="#FFFFFF" />
      <text x="42" y="316" fill="#1A1A1F" fontSize="7">Evidence chain: data → action</text>
      <text x="42" y="328" fill="#1A1A1F" fontSize="7">→ outcome · 3 governors saw</text>

      <rect x="22" y="372" width="176" height="32" rx="16" fill="#FF2D7A" />
      <text x="80" y="392" fill="#FAFAF7" fontSize="10" fontWeight="600">Run rehearsal</text>
    </g>
  );
}

function PrinterScreen() {
  return (
    <g>
      <rect x="12" y="14" width="196" height="220" fill="#1a1a1f" />
      <circle cx="110" cy="124" r="58" fill="none" stroke="#FF2D7A" strokeWidth="2" opacity="0.4" />
      <circle cx="110" cy="124" r="42" fill="none" stroke="#FFB8D4" strokeWidth="2" opacity="0.6" />
      <circle cx="110" cy="124" r="6" fill="#FF2D7A" />
      <text x="64" y="200" fill="#FAFAF7" fontSize="9" fontWeight="600" opacity="0.7">LIVE · Toolhead</text>

      <rect x="22" y="248" width="84" height="56" rx="10" fill="#FFFFFF" stroke="#EFE9E5" />
      <text x="32" y="266" fill="#98989D" fontSize="7" fontWeight="600">NOZZLE</text>
      <text x="32" y="286" fill="#1A1A1F" fontSize="16" fontWeight="700">218°</text>
      <rect x="32" y="294" width="64" height="3" rx="1.5" fill="#FFE0EC" />
      <rect x="32" y="294" width="48" height="3" rx="1.5" fill="#FF2D7A" />

      <rect x="114" y="248" width="84" height="56" rx="10" fill="#FFFFFF" stroke="#EFE9E5" />
      <text x="124" y="266" fill="#98989D" fontSize="7" fontWeight="600">BED</text>
      <text x="124" y="286" fill="#1A1A1F" fontSize="16" fontWeight="700">60°</text>
      <rect x="124" y="294" width="64" height="3" rx="1.5" fill="#FFE0EC" />
      <rect x="124" y="294" width="60" height="3" rx="1.5" fill="#FF2D7A" />

      <rect x="22" y="314" width="176" height="62" rx="12" fill="#FFE0EC" />
      <text x="34" y="334" fill="#FF2D7A" fontSize="8" fontWeight="700">PRINT IN PROGRESS</text>
      <text x="34" y="352" fill="#1A1A1F" fontSize="9" fontWeight="600">dragon_v3.gcode</text>
      <rect x="34" y="360" width="152" height="4" rx="2" fill="#FFFFFF" />
      <rect x="34" y="360" width="98" height="4" rx="2" fill="#FF2D7A" />

      <rect x="22" y="386" width="84" height="22" rx="11" fill="#1A1A1F" />
      <text x="48" y="400" fill="#FAFAF7" fontSize="8" fontWeight="600">Pause</text>
      <rect x="114" y="386" width="84" height="22" rx="11" fill="#FF2D7A" />
      <text x="138" y="400" fill="#FAFAF7" fontSize="8" fontWeight="600">Cancel</text>
    </g>
  );
}

function BgtScreen() {
  return (
    <g>
      <rect x="12" y="14" width="196" height="80" fill="#FF2D7A" />
      <text x="28" y="48" fill="#FAFAF7" fontSize="11" fontWeight="700">BGT 2026</text>
      <text x="28" y="68" fill="#FAFAF7" fontSize="9" opacity="0.85">Date watcher · live</text>
      <circle cx="184" cy="44" r="6" fill="#FAFAF7" opacity="0.9" />
      <circle cx="184" cy="44" r="3" fill="#FF2D7A" />

      <rect x="22" y="108" width="176" height="74" rx="12" fill="#FFE0EC" stroke="#FF2D7A" />
      <text x="34" y="128" fill="#FF2D7A" fontSize="8" fontWeight="700">NEW · 2 mins ago</text>
      <text x="34" y="146" fill="#1A1A1F" fontSize="11" fontWeight="600">Auditions: 16 Jan</text>
      <text x="34" y="162" fill="#1A1A1F" fontSize="9">Manchester Apollo confirmed</text>
      <text x="34" y="175" fill="#98989D" fontSize="7">Source · ITV schedule API</text>

      <rect x="22" y="190" width="176" height="56" rx="12" fill="#FFFFFF" stroke="#EFE9E5" />
      <text x="34" y="208" fill="#98989D" fontSize="8" fontWeight="700">YESTERDAY</text>
      <text x="34" y="224" fill="#1A1A1F" fontSize="10" fontWeight="600">Semi-finals: ITV1 prime</text>
      <text x="34" y="238" fill="#98989D" fontSize="8">Rumour · BGT subreddit</text>

      <rect x="22" y="254" width="176" height="56" rx="12" fill="#FFFFFF" stroke="#EFE9E5" />
      <text x="34" y="272" fill="#98989D" fontSize="8" fontWeight="700">3 DAYS AGO</text>
      <text x="34" y="288" fill="#1A1A1F" fontSize="10" fontWeight="600">Final: 31 May provisional</text>
      <text x="34" y="302" fill="#98989D" fontSize="8">Source · production tweet</text>

      <rect x="22" y="320" width="176" height="84" rx="14" fill="#FFE8F1" />
      <text x="34" y="340" fill="#FF2D7A" fontSize="8" fontWeight="700">FAMILY GROUP CHAT</text>
      <rect x="34" y="352" width="152" height="40" rx="10" fill="#FFFFFF" />
      <text x="44" y="368" fill="#1A1A1F" fontSize="8">"Date locked · 16 Jan"</text>
      <text x="44" y="382" fill="#98989D" fontSize="7">Sent · 1 min ago · 5 read</text>
    </g>
  );
}

function DragonScreen() {
  return (
    <g>
      <rect x="12" y="14" width="196" height="412" fill="#1a1a1f" />

      <g opacity="0.7">
        <circle cx="40" cy="50" r="1" fill="#FAFAF7" />
        <circle cx="170" cy="80" r="1" fill="#FAFAF7" />
        <circle cx="60" cy="120" r="1" fill="#FAFAF7" />
        <circle cx="190" cy="150" r="1" fill="#FAFAF7" />
      </g>

      <text x="28" y="56" fill="#FFB8D4" fontSize="9" fontWeight="700" opacity="0.7">DAY 47</text>
      <text x="28" y="78" fill="#FAFAF7" fontSize="16" fontWeight="700">Dragon Maze</text>

      <rect x="22" y="98" width="176" height="176" rx="14" fill="#2a2a30" />
      <g stroke="#FF2D7A" strokeWidth="1.5" fill="none" opacity="0.9">
        <path d="M 40 130 L 90 130 L 90 170 L 130 170 L 130 210 L 180 210" />
        <path d="M 40 170 L 60 170 L 60 200 L 100 200 L 100 240 L 140 240" />
        <path d="M 50 240 L 80 240 L 80 260 L 150 260" />
      </g>
      <circle cx="40" cy="130" r="5" fill="#FFB8D4" />
      <circle cx="180" cy="210" r="7" fill="#FF2D7A" />
      <g fill="#FAFAF7" opacity="0.4">
        <circle cx="90" cy="170" r="2" />
        <circle cx="130" cy="170" r="2" />
        <circle cx="130" cy="210" r="2" />
      </g>

      <rect x="22" y="288" width="84" height="46" rx="10" fill="#2a2a30" />
      <text x="32" y="306" fill="#98989D" fontSize="7" fontWeight="700">SCORE</text>
      <text x="32" y="324" fill="#FAFAF7" fontSize="14" fontWeight="700">1,420</text>

      <rect x="114" y="288" width="84" height="46" rx="10" fill="#2a2a30" />
      <text x="124" y="306" fill="#98989D" fontSize="7" fontWeight="700">DAILY RANK</text>
      <text x="124" y="324" fill="#FAFAF7" fontSize="14" fontWeight="700">#12</text>

      <rect x="22" y="344" width="176" height="62" rx="14" fill="#FF2D7A" />
      <text x="64" y="370" fill="#FAFAF7" fontSize="13" fontWeight="700">Next maze</text>
      <text x="60" y="388" fill="#FAFAF7" fontSize="8" opacity="0.85">Fresh seed in 4h 12m</text>
    </g>
  );
}
