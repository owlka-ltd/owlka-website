import Link from "next/link";
import { IOS_APP_STORE_AVAILABLE, WINDOWS_AVAILABLE } from "@/lib/flags";
import { AppleMark, AppStoreBadge, WindowsMark } from "./PlatformMarks";

// A compact "what does this run on" strip for the home page. Its whole job is
// to let a visitor answer "will this work on my machine" without scrolling to
// the download page, using the platform marks people already recognise.
//
// It is INFORMATIONAL, not a download surface. The marks are compatibility
// signalling ("Owlka runs on macOS") sitting beside a plain statement of what
// is actually available. Deliberately not wired to the .dmg/.exe: firing a
// 35 MB download off a small logo on the home page is a surprise, and the
// download page one click away exists to do that properly, with the version,
// signing and beta caveats a visitor should read first.
//
// Every row states its REAL availability. macOS and Windows ship today. The
// iPhone row says TestFlight, because that is what it is: as of 2026-07-31 an
// iTunes lookup on com.owlkaltd.app returns zero results in GB and US. Flip
// IOS_APP_STORE_AVAILABLE in src/lib/flags.ts when Apple issues the listing and
// this row renders Apple's official App Store badge instead, with no copy to
// hunt down.
//
// Deliberately absent: Android and Google Play. See the note in
// PlatformMarks.tsx for the evidence and the rule.
//
// Layout: stacks vertically on a narrow phone, becomes a centred wrapping row
// from `sm` up. Nothing is fixed-width, so it cannot overflow a small viewport.

export function PlatformAvailability({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="platform-availability-heading"
      className={`mx-auto max-w-4xl px-6 ${className}`}
      data-testid="platform-availability"
    >
      <h2
        id="platform-availability-heading"
        className="text-center text-sm font-medium uppercase tracking-wider text-muted"
      >
        Runs on
      </h2>

      {/* Stacked on a narrow phone, centred row from `sm` up. On mobile the
          list is `w-max mx-auto` so the rows share one left edge and the marks
          line up in a column, instead of each row centring on its own width
          and leaving the logos ragged. */}
      <ul className="mt-6 flex flex-col items-start w-max mx-auto sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-x-10 gap-y-5">
        <PlatformRow
          mark={<AppleMark className="w-6 h-6 shrink-0" />}
          name="macOS"
          detail="Signed and notarised"
          testId="platform-mac"
        />

        {WINDOWS_AVAILABLE ? (
          <PlatformRow
            mark={<WindowsMark className="w-6 h-6 shrink-0" />}
            name="Windows"
            detail="Code-signed beta"
            testId="platform-windows"
          />
        ) : null}

        {IOS_APP_STORE_AVAILABLE ? (
          <li className="flex items-center" data-testid="platform-iphone">
            <AppStoreBadge />
          </li>
        ) : (
          <PlatformRow
            mark={<AppleMark className="w-6 h-6 shrink-0" />}
            name="iPhone"
            detail={
              <Link
                href="/download"
                className="hover:text-mark hover:underline underline-offset-4 transition-colors"
              >
                TestFlight beta
              </Link>
            }
            testId="platform-iphone"
          />
        )}
      </ul>
    </section>
  );
}

function PlatformRow({
  mark,
  name,
  detail,
  testId,
}: {
  mark: React.ReactNode;
  name: string;
  detail: React.ReactNode;
  testId: string;
}) {
  return (
    <li className="flex items-center gap-3" data-testid={testId}>
      <span className="text-text/85">{mark}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-medium text-text">{name}</span>
        <span className="text-sm text-muted">{detail}</span>
      </span>
    </li>
  );
}
