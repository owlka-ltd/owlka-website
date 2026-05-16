"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { AuroraBackground } from "./AuroraBackground";

type Status = "idle" | "submitting" | "success" | "error";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          referrer:
            typeof document !== "undefined" ? document.referrer || null : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch the moment your invite is ready.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section id="waitlist" className="relative overflow-hidden py-32 sm:py-40">
      <AuroraBackground intensity="soft" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 h-8 px-3 rounded-pill bg-surface/80 backdrop-blur-md border border-border text-xs font-medium mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-mark animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mark" />
            </span>
            <span className="uppercase text-mark tracking-wider">Coming soon</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Build the next thing from your sofa.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed max-w-xl mx-auto">
            We're rolling out invites in waves. Drop your email and we'll send
            yours when there's a slot.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 mx-auto max-w-md p-8 rounded-card bg-surface border border-mark/40 shadow-lg shadow-mark/10"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-mark text-surface flex items-center justify-center mb-4">
                <svg viewBox="0 0 16 16" fill="none" className="w-6 h-6" aria-hidden>
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold">You're on the list</p>
              <p className="mt-2 text-sm text-text/70 leading-relaxed">
                {message}
              </p>
            </motion.div>
          ) : (
            <>
              <form
                onSubmit={onSubmit}
                className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "submitting"}
                  className="flex-1 h-12 px-5 rounded-pill bg-surface border border-border text-base focus:outline-none focus:border-mark focus:ring-2 focus:ring-tint-mark transition disabled:opacity-60"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium shadow-lg shadow-mark/25 hover:opacity-90 hover:shadow-xl hover:shadow-mark/35 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
                >
                  {status === "submitting" ? "Sending..." : "Join the waitlist"}
                </button>
              </form>

              {message && status === "error" && (
                <p role="alert" className="mt-5 text-sm text-mark">
                  {message}
                </p>
              )}
            </>
          )}

          <p className="mt-8 text-xs text-muted">
            No spam. Just one email when your invite is ready.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
