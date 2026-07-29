"use client";

import { useSyncExternalStore } from "react";
import { MAC_DMG_URL, WINDOWS_EXE_URL } from "@/lib/flags";
import {
  detectOS,
  isMobileOS,
  serverSnapshot,
  subscribeToNothing,
  type DetectedOS,
} from "@/lib/os";
import { IPhoneAppCta, IPhoneAppNote } from "./IPhoneAppLink";

// Both download buttons live here so we can auto-highlight the visitor's OS
// after hydration without hiding either platform. Mac stays the visual primary
// (stable, signed) and Windows is the secondary beta. Detection runs client-side
// only, so the server render is stable and there is no hydration mismatch: the
// "recommended for your device" hint and highlight ring are added post-mount.
//
// Phone and tablet visitors get a different primary action. They cannot install
// a desktop app at all, and before 2026-07-25 iPhone Safari matched the Mac
// test (its user agent contains "like Mac OS X") so they were told a 35 MB Mac
// disk image was "recommended for your Mac". Detection now lives in
// src/lib/os.ts and is unit-tested against real user-agent strings.

export function PlatformDownloads() {
  const os = useSyncExternalStore<DetectedOS>(
    subscribeToNothing,
    detectOS,
    serverSnapshot,
  );

  const macRecommended = os === "mac";
  const windowsRecommended = os === "windows";
  const onMobile = isMobileOS(os);

  return (
    <>
      {/* Phone and tablet: the desktop app is not installable here, so lead
          with the phone app and explain that a computer is still needed. */}
      {onMobile ? (
        <div
          className="mt-12 flex flex-col items-center gap-4"
          data-testid="mobile-visitor-block"
        >
          {os === "ios" ? (
            <IPhoneAppCta />
          ) : (
            <p className="text-lg font-medium">
              Owlka does not have an Android app yet.
            </p>
          )}
          <p className="text-sm text-muted max-w-md text-center">
            {os === "ios" ? <IPhoneAppNote /> : null} Owlka also needs the
            desktop app running on your own Mac or PC, which is where Claude
            actually runs. Open this page on that computer to install it, or use
            the links below.
          </p>
        </div>
      ) : null}

      {/* Mac: stable, signed, the default */}
      <div
        className={`${onMobile ? "mt-10" : "mt-12"} flex flex-col items-center gap-4`}
      >
        <a
          href={MAC_DMG_URL}
          className={`inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill text-lg font-semibold shadow-sm hover:opacity-95 transition ${
            onMobile
              ? "border border-border bg-surface text-text"
              : "bg-mark text-bg"
          } ${
            macRecommended
              ? "ring-2 ring-mark/40 ring-offset-2 ring-offset-bg"
              : ""
          }`}
          data-testid="download-mac-dmg"
        >
          <AppleGlyph />
          Download for Mac
        </a>
        <p className="text-sm text-muted max-w-md text-center">
          {macRecommended ? (
            <span className="font-medium text-mark">
              Recommended for your Mac.{" "}
            </span>
          ) : null}
          Universal binary, signed and notarised by Apple. Runs on Apple Silicon
          and Intel Macs (macOS 13+). Free for your first 30 days. Linux to
          follow.
          Questions to{" "}
          <a
            href="mailto:support@owlka.com"
            className="text-mark hover:underline"
          >
            support@owlka.com
          </a>
          .
        </p>
      </div>

      {/* Windows: beta, code-signed */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <a
          href={WINDOWS_EXE_URL}
          className={`inline-flex items-center justify-center gap-3 h-14 px-9 rounded-pill border border-border bg-surface text-text text-lg font-semibold shadow-sm hover:opacity-95 transition ${
            windowsRecommended
              ? "ring-2 ring-mark/40 ring-offset-2 ring-offset-bg"
              : ""
          }`}
          data-testid="download-windows-exe"
        >
          <WindowsGlyph />
          Download for Windows
        </a>
        <span
          className="inline-flex items-center gap-1.5 rounded-pill bg-tint-mark px-3 py-1 text-xs font-semibold uppercase tracking-wider text-mark"
          data-testid="windows-beta-badge"
        >
          Beta
        </span>
        <p className="text-sm text-muted max-w-md text-center">
          {windowsRecommended ? (
            <span className="font-medium text-mark">
              Recommended for your PC.{" "}
            </span>
          ) : null}
          Beta. Windows support is new. Signed and ready for 64-bit Windows 10
          and 11. Free for your first 30 days.
        </p>
      </div>

      {/* Desktop visitors still need to know where the phone app comes from. */}
      {onMobile ? null : (
        <p
          className="mt-10 text-sm text-muted max-w-md mx-auto text-center"
          data-testid="iphone-app-note"
        >
          <IPhoneAppNote />
        </p>
      )}
    </>
  );
}

function WindowsGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M3 5.1l7.5-1.02v7.23H3V5.1zm0 13.8l7.5 1.02v-7.14H3v6.12zm8.4 1.14L21 21.5v-8.55h-9.6v7.09zM11.4 3.96L21 2.5v8.55h-9.6V3.96z" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
      <path d="M17.05 12.04c-.03-2.9 2.37-4.3 2.48-4.37-1.36-1.98-3.47-2.25-4.22-2.28-1.8-.18-3.51 1.06-4.42 1.06-.93 0-2.32-1.04-3.82-1.01-1.96.03-3.78 1.14-4.78 2.89-2.05 3.56-.52 8.81 1.46 11.7.97 1.42 2.12 3 3.62 2.95 1.46-.06 2.01-.94 3.77-.94 1.76 0 2.26.94 3.79.91 1.57-.03 2.56-1.43 3.52-2.86 1.11-1.64 1.57-3.23 1.59-3.31-.04-.02-3.04-1.17-3.07-4.74zM14.34 3.97c.81-.98 1.35-2.34 1.2-3.69-1.16.05-2.57.78-3.4 1.75-.75.86-1.4 2.24-1.22 3.56 1.29.1 2.61-.66 3.42-1.62z" />
    </svg>
  );
}
