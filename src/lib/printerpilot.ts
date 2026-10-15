// PrinterPilot microsite helpers. Pure functions so src/lib/__tests__/printerpilot.test.mts can run them under Node.
//
// The rule they enforce: a download link is shown only for a file that is recorded as existing, with an https address and
// a SHA-256. The 2026-10-12 state is that nothing has been built or uploaded, so every entry in availability.json is null
// and every page says "not available yet" rather than linking to a 404.

export type PublishedFile = {
  url: string;
  version: string;
  sha256: string;
  sizeBytes: number;
};

export type Availability = {
  legalUpdated: string;
  macHub: PublishedFile | null;
  windowsHub: PublishedFile | null;
  designToolsSource: PublishedFile | null;
};

export function isPublishable(f: unknown): f is PublishedFile {
  if (!f || typeof f !== "object") return false;
  const x = f as Record<string, unknown>;
  return (
    typeof x.url === "string" &&
    x.url.startsWith("https://") &&
    typeof x.version === "string" &&
    x.version.length > 0 &&
    typeof x.sha256 === "string" &&
    /^[0-9a-f]{64}$/.test(x.sha256) &&
    typeof x.sizeBytes === "number" &&
    x.sizeBytes > 0
  );
}

/** The file to link to, or null when there is none to link to. A malformed entry counts as none. */
export function linkableFile(f: unknown): PublishedFile | null {
  return isPublishable(f) ? f : null;
}

export function formatMb(bytes: number): string {
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

export const PP_SUPPORT_EMAIL = "support@owlka.com";
