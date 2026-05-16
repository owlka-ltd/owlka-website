"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
      setMessage("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <section id="waitlist" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
            Early access
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Build the next thing from your sofa.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed max-w-xl mx-auto">
            We're rolling out invites in waves. Drop your email and we'll send
            yours when there's a slot.
          </p>

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
              disabled={status === "submitting" || status === "success"}
              className="flex-1 h-12 px-5 rounded-pill bg-surface border border-border text-base focus:outline-none focus:border-mark focus:ring-2 focus:ring-tint-mark transition"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            >
              {status === "submitting"
                ? "Sending..."
                : status === "success"
                ? "Joined"
                : "Join the waitlist"}
            </button>
          </form>

          {message && (
            <p
              role="status"
              className={`mt-5 text-sm ${
                status === "success" ? "text-mark" : "text-text/70"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-xs text-muted">
            No spam. Just a heads-up when your invite is ready.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
