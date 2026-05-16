"use client";

import { motion } from "framer-motion";

type Kind = "voice" | "review" | "memory" | "ship";

export function StepGraphic({ kind }: { kind: Kind }) {
  return (
    <div className="relative w-full aspect-square max-w-[220px] rounded-2xl bg-gradient-to-br from-tint-mark to-tint-accent overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          color: "var(--color-text)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {kind === "voice" && <VoiceGraphic />}
        {kind === "review" && <ReviewGraphic />}
        {kind === "memory" && <MemoryGraphic />}
        {kind === "ship" && <ShipGraphic />}
      </div>
    </div>
  );
}

function VoiceGraphic() {
  const bars = [0.45, 0.85, 0.6, 1, 0.7, 0.95, 0.55, 0.8, 0.5];
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="absolute w-24 h-24 rounded-full bg-mark/15 animate-pulse-dot" />
      <div className="absolute w-16 h-16 rounded-full bg-mark/25" />
      <div className="relative w-12 h-12 rounded-full bg-mark flex items-center justify-center shadow-lg shadow-mark/40">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-surface" fill="currentColor" aria-hidden>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-mark"
            initial={{ scaleY: 0.3 }}
            animate={{ scaleY: [0.3, h, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
            style={{ height: "100%", transformOrigin: "bottom" }}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewGraphic() {
  return (
    <div className="relative w-[170px] h-[160px]">
      <div className="absolute inset-0 rounded-xl bg-[#1a1a1f] p-3 shadow-xl font-mono text-[8.5px] leading-relaxed">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-[#7ee787]"
        >
          + def watch():
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-[#7ee787] pl-3"
        >
          + poll(url)
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-[#f97583] pl-3"
        >
          - sleep(60)
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="text-[#7ee787] pl-3"
        >
          + backoff()
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="text-surface/60 mt-1"
        >
          ─────────────
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="text-[#ffb86c]"
        >
          reviewer: APPROVE
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 1.6, type: "spring", stiffness: 200 }}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/40"
      >
        <svg viewBox="0 0 16 16" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

function MemoryGraphic() {
  const nodes = [
    { x: 30, y: 30, r: 8, delay: 0 },
    { x: 90, y: 20, r: 6, delay: 0.15 },
    { x: 150, y: 45, r: 7, delay: 0.3 },
    { x: 50, y: 85, r: 6, delay: 0.45 },
    { x: 110, y: 95, r: 9, delay: 0.6 },
    { x: 160, y: 130, r: 6, delay: 0.75 },
    { x: 35, y: 145, r: 7, delay: 0.9 },
    { x: 100, y: 160, r: 8, delay: 1.05 },
  ];
  const edges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [3, 4], [2, 5], [4, 5], [3, 6], [6, 7], [4, 7],
  ];

  return (
    <div className="relative w-[190px] h-[190px]">
      <svg viewBox="0 0 190 190" className="w-full h-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="var(--color-mark)"
            strokeWidth="1"
            strokeOpacity="0.35"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="var(--color-mark)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.5, delay: n.delay, ease: "easeOut" }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="none"
            stroke="var(--color-mark)"
            strokeWidth="1.5"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
            transition={{
              duration: 2,
              delay: 1.5 + i * 0.25,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          />
        ))}
      </svg>
    </div>
  );
}

function ShipGraphic() {
  return (
    <div className="relative w-[180px] h-[180px]">
      <svg viewBox="0 0 180 180" className="absolute inset-0">
        <motion.path
          d="M 30 150 Q 90 100 150 30"
          stroke="var(--color-mark)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        initial={{ x: 0, y: 0, opacity: 0, scale: 0.7 }}
        animate={{
          x: [0, 120],
          y: [0, -120],
          opacity: [0, 1, 1, 0],
          scale: [0.7, 1, 1, 1.1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: "easeOut",
          times: [0, 0.2, 0.85, 1],
        }}
        className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-mark to-[#ff5e9d] shadow-2xl shadow-mark/40 flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-surface" fill="currentColor" aria-hidden>
          <circle cx="9" cy="10" r="2.5" />
          <circle cx="15" cy="10" r="2.5" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-[9px] font-bold uppercase tracking-wide shadow-md"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
        Live
      </motion.div>

      <div className="absolute bottom-3 right-3 flex flex-col gap-1 items-end">
        <div className="text-[9px] font-mono text-text/60">v1.0.47</div>
        <div className="flex gap-1">
          {["iOS", "Web", "API"].map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded bg-surface/80 text-[8px] font-semibold text-mark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
