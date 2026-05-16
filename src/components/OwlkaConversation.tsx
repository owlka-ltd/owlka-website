"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Scene = {
  user: string;
  reply: string;
  code?: string[];
  status: { label: string; tone: "thinking" | "review" | "live" };
};

const scenes: Scene[] = [
  {
    user: "Build me a watcher that pings me when BGT 2026 dates drop.",
    reply: "Done. Polling ITV + 3 backup sources every 15 min.",
    code: ["+ watcher.py", "+ schedule_poll()", "+ notify(family_chat)"],
    status: { label: "Live · 0 alerts", tone: "live" },
  },
  {
    user: "Make me a Streamlit dashboard for the school's attendance data.",
    reply: "Spec drafted. Reviewer agent challenging the schema.",
    code: ["~ dashboard.py", "+ load_attendance()", "+ term_compare()"],
    status: { label: "Reviewer · 1 fix found", tone: "review" },
  },
  {
    user: "Ship the printer monitor to TestFlight.",
    reply: "Signed, archived, uploaded. Build 47 processing.",
    code: ["✓ archive", "✓ sign", "↑ upload TestFlight"],
    status: { label: "Deployed · Build 47", tone: "live" },
  },
];

export function OwlkaConversation({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % scenes.length), 4800);
    return () => clearInterval(t);
  }, []);

  const scene = scenes[i];

  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[60px] bg-gradient-to-br from-mark/30 via-accent/20 to-transparent blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[320px]">
        <div className="relative rounded-[44px] bg-gradient-to-b from-[#1a1a1f] to-[#2a2a30] p-2.5 shadow-2xl shadow-mark/20">
          <div className="relative rounded-[36px] bg-bg overflow-hidden aspect-[9/19]">
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-2">
              <div className="h-5 w-24 rounded-full bg-[#1a1a1f]" />
            </div>

            <div className="relative h-full flex flex-col pt-10 pb-4 px-4">
              <div className="flex items-center gap-2 px-1 pb-3 border-b border-border/60">
                <div className="w-7 h-7 rounded-full bg-mark flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-surface" fill="currentColor" aria-hidden>
                    <circle cx="9" cy="10" r="2.5" />
                    <circle cx="15" cy="10" r="2.5" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-semibold leading-tight">Owlka</div>
                  <div className="flex items-center gap-1 text-[9px] text-muted leading-tight">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                    Working
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden pt-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col gap-2.5"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                      className="self-end max-w-[80%]"
                    >
                      <div className="px-3 py-2 rounded-2xl rounded-br-md bg-mark text-surface text-[11px] leading-snug">
                        {scene.user}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.6 }}
                      className="self-start max-w-[85%]"
                    >
                      <div className="px-3 py-2 rounded-2xl rounded-bl-md bg-surface border border-border text-[11px] leading-snug text-text">
                        {scene.reply}
                      </div>
                    </motion.div>

                    {scene.code && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 1.1 }}
                        className="self-start max-w-[90%]"
                      >
                        <div className="px-3 py-2.5 rounded-xl bg-[#1a1a1f] font-mono text-[9.5px] leading-relaxed text-surface/90">
                          {scene.code.map((line, k) => (
                            <motion.div
                              key={k}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.25, delay: 1.3 + k * 0.18 }}
                              className={
                                line.startsWith("+")
                                  ? "text-[#7ee787]"
                                  : line.startsWith("~")
                                  ? "text-[#ffb86c]"
                                  : line.startsWith("✓") || line.startsWith("↑")
                                  ? "text-mark"
                                  : "text-surface/70"
                              }
                            >
                              {line}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 2.2 }}
                      className="self-start mt-1"
                    >
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] font-semibold ${
                          scene.status.tone === "live"
                            ? "bg-green-100 text-green-700"
                            : scene.status.tone === "review"
                            ? "bg-tint-accent text-mark"
                            : "bg-tint-mark text-mark"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            scene.status.tone === "live"
                              ? "bg-green-500"
                              : "bg-mark"
                          } animate-pulse-dot`}
                        />
                        {scene.status.label}
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 pt-3 border-t border-border/60">
                <div className="flex items-center gap-2 px-1">
                  <div className="flex-1 h-7 rounded-full bg-surface border border-border flex items-center px-3">
                    <span className="text-[10px] text-muted">Say what you want…</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-mark flex items-center justify-center shadow-md shadow-mark/30">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-surface" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                      <path d="M12 3v12M7 14l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -right-12 top-1/4 hidden lg:block">
          <FloatingChip delay={0.2} tone="mark">
            <span className="w-1.5 h-1.5 rounded-full bg-mark" /> Memory · 47 sessions
          </FloatingChip>
        </div>
        <div className="absolute -left-16 top-2/3 hidden lg:block">
          <FloatingChip delay={0.6} tone="surface">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Reviewer · APPROVE
          </FloatingChip>
        </div>
      </div>
    </div>
  );
}

function FloatingChip({
  children,
  delay,
  tone,
}: {
  children: React.ReactNode;
  delay: number;
  tone: "mark" | "surface";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium backdrop-blur-md shadow-lg ${
        tone === "mark"
          ? "bg-surface/90 text-text border border-border"
          : "bg-surface/90 text-text border border-border"
      }`}
    >
      {children}
    </motion.div>
  );
}
