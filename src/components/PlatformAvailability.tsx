import { AppleMark, PlayMark, WindowsMark } from "./PlatformMarks";

// A compact "what does this run on" strip for the home page. Its whole job is
// to let a visitor answer "will this work on my machine" without scrolling to
// the download page, using the platform marks people already recognise.
//
// It is INFORMATIONAL, not a download surface. Deliberately not wired to the
// .dmg/.exe: firing a 35 MB download off a small logo on the home page is a
// surprise, and the download page one click away exists to do that properly,
// with the version, signing and system requirements a visitor should read
// first.
//
// SHAPE (Tim, 2026-07-31, on a screenshot of the live strip): a mark and a
// name, nothing else. He asked for the grey subtitles to go, for the two Apple
// rows to collapse into one because he did not want the same logo twice, and
// for Google Play to be here alongside the others.
//
// What that means, and where the detail went:
//
//  - The subtitles are gone. "Signed and notarised", the Windows one and
//    "TestFlight beta" no longer appear here. None of it is LOST: /download
//    still carries the full story for every platform, and the iPhone half of it
//    still comes from IPhoneAppNote / IPhoneAppCta in IPhoneAppLink.tsx, which
//    remain the single source of truth for how to get the iPhone app. This
//    strip is now a compatibility answer only.
//  - Mac and iOS share one row and one Apple mark.
//  - Android is named "Android", not "Google Play", because every other row
//    here names a PLATFORM you run the app on, and mixing a store name into
//    that list answers a different question. The mark is the Play mark, which
//    is the part carrying the recognition Tim asked for. The store itself, with
//    its official badge, is in the hero strip (StoreBadges.tsx).
//
// Rows are no longer gated on availability flags. This is a "what platforms
// does Owlka cover" statement, and all four are covered: Mac and Windows ship,
// the iPhone app is in TestFlight with an App Store submission in review, and
// the Android app is in review at Google. Availability, which is a different
// and more perishable claim, is stated on /download and in the hero.
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
      {/* `max-w-full` clamps the `w-max` (width: max-content) list, which by
          definition never wraps and never shrinks. It fits today, but nothing
          stops a longer label pushing horizontal scroll onto the whole
          document, and no test would catch it. */}
      <ul className="mt-6 flex flex-col items-start w-max max-w-full mx-auto sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center gap-x-10 gap-y-5">
        <PlatformRow
          mark={<AppleMark className="w-6 h-6 shrink-0" />}
          name="Mac / iOS"
          testId="platform-apple"
        />
        <PlatformRow
          mark={<WindowsMark className="w-6 h-6 shrink-0" />}
          name="Windows"
          testId="platform-windows"
        />
        <PlatformRow
          mark={<PlayMark className="w-6 h-6 shrink-0" />}
          name="Android"
          testId="platform-android"
        />
      </ul>
    </section>
  );
}

// The mark is decorative: it is aria-hidden inside PlatformMarks, and the name
// beside it is real text, so a screen reader announces "Mac / iOS" once rather
// than naming the platform twice.
function PlatformRow({
  mark,
  name,
  testId,
}: {
  mark: React.ReactNode;
  name: string;
  testId: string;
}) {
  return (
    <li className="flex items-center gap-3" data-testid={testId}>
      <span className="text-text/85">{mark}</span>
      <span className="text-base font-medium text-text">{name}</span>
    </li>
  );
}
