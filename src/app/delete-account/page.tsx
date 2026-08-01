// Account + data deletion request page.
//
// WHY THIS IS ITS OWN ROUTE. Google Play's Data safety section requires a
// publicly reachable URL, resolvable without signing in or installing
// anything, where a user can request deletion of their account and its data.
// The privacy page describes deletion in prose, but Play wants a link whose
// whole subject is the request, and a deep link into a long policy page is
// the kind of thing that gets bounced in review.
//
// It is also the honest home for one fact the privacy page does not draw out:
// the in-app "Delete my account and data" button is iOS-only today. The
// Android app has no such control, so email is the route for those users
// until it ships. Pointing them at a screen that does not exist is worse than
// telling them to write to us. The relay side already works for both — the
// session token the app holds is enough to authorise the delete — so this is
// a missing button, not a missing capability.
//
// KEEP THE iOS STEPS IN SYNC with the Account deletion section of
// /privacy. If that flow moves, both pages change together.
import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { COMPANY_NAME } from "@/lib/company";

export const metadata: Metadata = {
  title: "Delete your account",
  description:
    "Request deletion of your Owlka account and the data held about it. What gets deleted, what was never held in the first place, and how long it takes.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Account deletion
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Delete your account and its data.
            </h1>
            <p className="mt-5 text-lg text-text/75 leading-relaxed">
              An Owlka account exists only so your phone can receive approval
              alerts. You can delete it whenever you like, and the app keeps
              working without one.
            </p>
          </header>

          <div className="mb-16 rounded-card border border-border bg-surface p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-muted mb-2">
              Request deletion
            </p>
            <p className="text-2xl font-semibold tracking-tight">
              <Link
                href="mailto:support@owlka.com?subject=Delete%20my%20account"
                className="text-mark hover:underline"
              >
                support@owlka.com
              </Link>
            </p>
            <p className="mt-4 text-text/80 leading-relaxed">
              Email us from the address you signed in with, or tell us which
              address it was. We do not ask you to prove anything else, because
              that address is essentially all we hold. We action requests
              within 30 days, and in practice within one working day.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                On iPhone, you can do it yourself
              </h2>
              <p className="text-text/80 leading-relaxed">
                Open the app, go to More, then the Beta (free) page, and tap
                &ldquo;Delete my account and data.&rdquo; The account and
                everything listed below are removed immediately, and the app
                wipes its local copy at the same time.
              </p>
              <p className="mt-3 text-text/80 leading-relaxed">
                The Android app does not have this button yet. Until it does,
                email is the route — same outcome, just not self-serve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What gets deleted
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-text/80 leading-relaxed">
                <li>
                  Your account record: the name and email address your Google
                  or Apple sign-in gave us, and the account identifier derived
                  from it.
                </li>
                <li>
                  Every device public key registered to the account, which is
                  what ends the relay&rsquo;s ability to route anything to you.
                </li>
                <li>
                  Push notification tokens for every phone on the account, so
                  no further alerts can be addressed to your devices.
                </li>
                <li>
                  Active sessions, so the account cannot be used again from a
                  device that is still signed in.
                </li>
              </ul>
              <p className="mt-4 text-text/80 leading-relaxed">
                Deletion is immediate and permanent. There is no restore
                window, so if you sign in again afterwards you get a new, empty
                account rather than your old one back.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What we never held anyway
              </h2>
              <p className="text-text/80 leading-relaxed">
                Almost everything you do in Owlka is end-to-end encrypted
                between your phone and your own computer. The relay carries
                sealed packets it cannot read and does not store, which means
                there is nothing for us to delete on your behalf:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3 text-text/80 leading-relaxed">
                <li>
                  Terminal output, commands, and anything Claude said or did on
                  your machine.
                </li>
                <li>Approval prompts and how you answered them.</li>
                <li>
                  Photos and files you sent from your phone to your computer.
                </li>
              </ul>
              <p className="mt-4 text-text/80 leading-relaxed">
                Your own computer keeps its own history in its own files. That
                is yours to manage on your machine; deleting your Owlka account
                does not touch it, and neither can we.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Deleting the app instead
              </h2>
              <p className="text-text/80 leading-relaxed">
                Uninstalling removes the keys and cached messages held on the
                phone, and unpairing from your computer stops that pair
                working. Neither deletes the account record on our side, which
                is what this page is for.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Who you are asking
              </h2>
              <p className="text-text/80 leading-relaxed">
                {COMPANY_NAME} is the data controller for the account data
                described above. For anything broader than deletion — a copy of
                what we hold, a correction, or a complaint — see the{" "}
                <Link href="/privacy" className="text-mark hover:underline">
                  privacy policy
                </Link>
                .
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
