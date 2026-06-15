"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AuroraBackground } from "./AuroraBackground";

type Status = "idle" | "submitting" | "success" | "error";
type FieldKey = "firstName" | "lastName" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX_LEN = 80;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  // Which input the current error message belongs to. null = either no
  // error, or a general (network/upstream) error that doesn't map to
  // one specific field.
  const [invalidField, setInvalidField] = useState<FieldKey | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLParagraphElement>(null);

  // Move focus to the success heading once it mounts so screen-reader
  // users land on the confirmation instead of nowhere.
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  function fail(field: FieldKey | null, msg: string) {
    setStatus("error");
    setMessage(msg);
    setInvalidField(field);
    // Defer focus until the role="alert" + aria-describedby update has
    // committed so SR users hear the linked message on the input.
    requestAnimationFrame(() => {
      if (field === "firstName") firstNameRef.current?.focus();
      else if (field === "lastName") lastNameRef.current?.focus();
      else if (field === "email") emailRef.current?.focus();
    });
  }

  function clearError() {
    if (status === "error") {
      setStatus("idle");
      setMessage("");
      setInvalidField(null);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    // Mirror server validation so we surface a useful message without
    // a round trip. Server still re-validates.
    if (!trimmedFirst || trimmedFirst.length > NAME_MAX_LEN) {
      fail("firstName", "Please enter your first name.");
      return;
    }
    if (!trimmedLast || trimmedLast.length > NAME_MAX_LEN) {
      fail("lastName", "Please enter your last name.");
      return;
    }
    if (!EMAIL_RE.test(trimmedEmail) || trimmedEmail.length > 254) {
      fail("email", "Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    setInvalidField(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: trimmedFirst,
          lastName: trimmedLast,
          source: "owlka.com",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const code = typeof data?.error === "string" ? data.error : null;
        fail(fieldForCode(code), errorMessage(code));
        return;
      }
      setStatus("success");
      setMessage(
        "You're on the list. We'll email you when there is something worth your time.",
      );
      setInvalidField(null);
      setEmail("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      // Network/JSON failure — log so production has a breadcrumb, then
      // fall back to a generic message.
      console.error("[waitlist] submission failed", err);
      fail(null, "Network error. Please try again.");
    }
  }

  const errorId = "waitlist-error";

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
            <span className="uppercase text-mark tracking-wider">
              Stay in the loop
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
            Be first to hear what is new.
          </h2>
          <p className="mt-5 text-lg text-text/70 leading-relaxed max-w-xl mx-auto">
            Drop your name and email and we&rsquo;ll let you know when big new
            features land. Owlka is free to download now.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 mx-auto max-w-md p-8 rounded-card bg-surface border border-mark/40 shadow-lg shadow-mark/10"
              role="status"
              aria-live="polite"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-mark text-surface flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-6 h-6"
                  aria-hidden
                >
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className="text-lg font-semibold outline-none"
                tabIndex={-1}
                ref={successHeadingRef}
              >
                You&rsquo;re on the list
              </p>
              <p className="mt-2 text-sm text-text/70 leading-relaxed">
                {message}
              </p>
            </motion.div>
          ) : (
            <>
              <form
                onSubmit={onSubmit}
                className="mt-10 mx-auto max-w-md space-y-3"
                noValidate
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    maxLength={NAME_MAX_LEN}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      clearError();
                    }}
                    disabled={status === "submitting"}
                    ref={firstNameRef}
                    aria-label="First name"
                    aria-invalid={invalidField === "firstName"}
                    aria-describedby={
                      invalidField === "firstName" ? errorId : undefined
                    }
                    className="flex-1 h-12 px-5 rounded-pill bg-surface border border-border text-base focus:outline-none focus:border-mark focus:ring-2 focus:ring-tint-mark transition disabled:opacity-60 aria-[invalid=true]:border-mark aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-tint-mark"
                  />
                  <input
                    type="text"
                    required
                    autoComplete="family-name"
                    placeholder="Last name"
                    maxLength={NAME_MAX_LEN}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      clearError();
                    }}
                    disabled={status === "submitting"}
                    ref={lastNameRef}
                    aria-label="Last name"
                    aria-invalid={invalidField === "lastName"}
                    aria-describedby={
                      invalidField === "lastName" ? errorId : undefined
                    }
                    className="flex-1 h-12 px-5 rounded-pill bg-surface border border-border text-base focus:outline-none focus:border-mark focus:ring-2 focus:ring-tint-mark transition disabled:opacity-60 aria-[invalid=true]:border-mark aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-tint-mark"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    inputMode="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    disabled={status === "submitting"}
                    ref={emailRef}
                    aria-label="Email address"
                    aria-invalid={invalidField === "email"}
                    aria-describedby={
                      invalidField === "email" ? errorId : undefined
                    }
                    className="flex-1 h-12 px-5 rounded-pill bg-surface border border-border text-base focus:outline-none focus:border-mark focus:ring-2 focus:ring-tint-mark transition disabled:opacity-60 aria-[invalid=true]:border-mark aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-tint-mark"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="h-12 px-7 rounded-pill bg-mark text-surface text-base font-medium shadow-lg shadow-mark/25 hover:opacity-90 hover:shadow-xl hover:shadow-mark/35 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all"
                  >
                    {status === "submitting" ? "Sending..." : "Notify me"}
                  </button>
                </div>
              </form>

              {message && status === "error" && (
                <p
                  id={errorId}
                  role="alert"
                  aria-live="polite"
                  className="mt-5 text-sm text-mark"
                >
                  {message}
                </p>
              )}
            </>
          )}

          <p className="mt-8 text-xs text-muted">
            No spam. Just the occasional email when something matters.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function fieldForCode(code: string | null): FieldKey | null {
  switch (code) {
    case "invalid_email":
      return "email";
    case "invalid_first_name":
      return "firstName";
    case "invalid_last_name":
      return "lastName";
    default:
      return null;
  }
}

function errorMessage(code: string | null): string {
  switch (code) {
    case "invalid_email":
      return "Please enter a valid email address.";
    case "invalid_first_name":
      return "Please enter your first name.";
    case "invalid_last_name":
      return "Please enter your last name.";
    case "rate_limited":
      return "Too many submissions. Please wait a minute and try again.";
    case "upstream_failed":
    case "upstream_unreachable":
      return "We couldn't reach the waitlist server. Please try again shortly.";
    default:
      return "Something went wrong. Please try again.";
  }
}
