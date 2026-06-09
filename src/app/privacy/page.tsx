import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Owlka handles your data. Plain English. Last updated 2026-05-19.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted">Last updated 2026-05-19</p>
          </header>

          <div className="prose prose-neutral max-w-none text-text/85 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4">
                The short version
              </h2>
              <p>
                Owlka is a desktop app for your Mac and a
                companion app for your iPhone. Your conversations, code, and
                memory live on your own desktop. The two apps talk through an
                encrypted relay that we cannot read. We do not sell or share
                your data. We do not run advertising trackers. We do not use
                anything you build to train any model.
              </p>
              <p className="mt-4">
                Owlka wraps your own Claude subscription on your desktop.
                Owlka does not resell Anthropic. You bring your own Claude
                Pro or Max subscription, and your desktop talks to Anthropic
                directly under your own login. We never see your Claude
                traffic.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What Owlka collects
              </h2>
              <p>
                We try to collect as little as possible. The full list is:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Device identifiers for pairing.</strong> When you
                  pair your phone with a desktop, Owlka generates a random
                  identifier for each device and a public key for each
                  pairing. We use these to route encrypted packets to the
                  right device. They are not linked to your name, your Apple
                  ID, or any other identity.
                </li>
                <li>
                  <strong>Apple subscription receipt, not collected during
                  the public beta.</strong> Owlka is free during the public
                  beta, so Apple does not send us a receipt. If and when we
                  switch on a paid subscription, Apple will send us an
                  anonymised receipt that confirms your subscription is
                  active; we never see your card details, your Apple ID, or
                  your name. This policy will be updated with a new
                  &ldquo;Last updated&rdquo; date before that change goes
                  live.
                </li>
                <li>
                  <strong>Crash logs, only if you opt in.</strong> If you
                  switch on crash reporting in iOS Settings, Apple may share
                  anonymised crash data with us so we can fix bugs. You can
                  switch it off at any time in Settings, Privacy and
                  Security, Analytics and Improvements.
                </li>
                <li>
                  <strong>Connection metadata.</strong> Our encrypted relay
                  records connection metadata so we can keep the service
                  running and measure load on it. The relay cannot decrypt
                  sealed packets. Message contents, file contents, tool
                  arguments, and tool output are end-to-end encrypted and
                  never visible to us.
                  <ul className="list-[circle] pl-6 space-y-2 mt-3">
                    <li>
                      <em>What we record today.</em> The public-key
                      identifiers of the devices currently connecting (the
                      per-pair keys you generated when you paired, never
                      your name or your Apple ID), the IP address of each
                      connection, the byte size of each sealed packet, and
                      the timing of packets.
                    </li>
                    <li>
                      <em>What we plan to add later.</em> As the beta
                      grows we intend to record the device type from the
                      User-Agent string the desktop app sends when it
                      connects, and a per-tool-start ping from the desktop
                      app that names the tool you invoked (for example
                      &ldquo;bash&rdquo; or &ldquo;edit&rdquo;) without
                      its arguments or output. Neither of these is live
                      today. Before either is turned on, this policy will
                      be updated with a new &ldquo;Last updated&rdquo;
                      date.
                    </li>
                    <li>
                      <em>What we use it for.</em> Product analytics
                      (daily, weekly, and monthly active devices, message
                      volume, retention cohorts) and abuse detection.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Support correspondence.</strong> If you email
                  support@owlka.com or security@owlka.com, we keep that
                  email thread so we can help you.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What Owlka does not collect
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Message content.</strong> Every message between
                  your phone and your desktop is end-to-end encrypted with
                  keys that only your devices hold. The relay carries sealed
                  bytes. We cannot read them.
                </li>
                <li>
                  <strong>Speech audio.</strong> When you dictate to Owlka,
                  the audio is transcribed on the device using Apple&rsquo;s
                  on-device Speech framework. The audio never leaves your
                  phone, and we never receive a recording.
                </li>
                <li>
                  <strong>Location.</strong> Owlka does not track your
                  location. Your phone only sends a location when you
                  explicitly ask a location-aware question (for example
                  &ldquo;what coffee shops are nearby&rdquo;). In that case
                  the location is included in the encrypted message to your
                  desktop and is not visible to us.
                </li>
                <li>
                  <strong>Your Anthropic OAuth token.</strong> Owlka never
                  sees, copies, or stores your Claude login. It lives where
                  the Claude desktop tools put it on your machine, under
                  your operating system&rsquo;s user permissions.
                </li>
                <li>
                  <strong>Your code, files, or project memory.</strong> All
                  of that lives on your own desktop. We never copy any of it
                  to a server.
                </li>
                <li>
                  <strong>Third-party advertising or tracking pixels.</strong>{" "}
                  Owlka runs none. We do not use third-party analytics that
                  identify you personally.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Per-pair partitioning
              </h2>
              <p>
                Owlka is built around the idea that one desktop can pair with
                many phones, and one phone can pair with many desktops. A
                household Mac mini might be paired with two people&rsquo;s
                phones. One person&rsquo;s phone might be paired with both a
                home desktop and a work laptop. Each phone-and-desktop pair
                is a separate boundary.
              </p>
              <p className="mt-4">
                Memory, skills, connected accounts, and credentials are
                partitioned by pair. The first person&rsquo;s phone sees only
                their own memory and their own connected accounts. The second
                person&rsquo;s phone sees only theirs. Switching active
                desktops on the phone switches the whole context to the
                memory and connectors for that pair. The desktop owner can
                grant cross-pair sharing for a specific topic if they choose,
                but the default is full isolation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Who else is involved
              </h2>
              <p>
                Owlka relies on a small number of named providers to deliver
                the product. Each one sees only the slice of data its job
                requires.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Apple.</strong> Apple distributes the iPhone app.
                  Owlka is currently in a public beta with no charge; if
                  and when we switch on a paid subscription, Apple will
                  handle billing and payment, and at that point Apple sees
                  your Apple ID and your billing details under its own
                  privacy policy.
                </li>
                <li>
                  <strong>Cloudflare.</strong> Cloudflare fronts the
                  encrypted relay. It sees connection metadata such as IP
                  addresses and timing, plus sealed bytes it cannot decrypt.
                </li>
                <li>
                  <strong>Vercel.</strong> Vercel hosts owlka.com. It logs
                  standard request metadata for the public pages.
                </li>
                <li>
                  <strong>The relay host.</strong> A small server that
                  shuttles sealed packets between phones and desktops. It
                  cannot read packet contents.
                </li>
                <li>
                  <strong>Your chosen Claude subscription.</strong> Your
                  desktop talks to Anthropic directly under your own
                  Anthropic account. Your usage is governed by your own
                  agreement with Anthropic. Anthropic is not an Owlka
                  sub-processor, because none of your Claude traffic ever
                  passes through us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Account deletion
              </h2>
              <p>
                You can delete your Owlka account from inside the app. Open
                Settings, Account, and tap Delete account. The app will:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Wipe the local data on your phone (cached messages, paired
                  device records, keys in the iOS Keychain).
                </li>
                <li>
                  Send a delete signal to the relay so the relay drops any
                  queued packets for your device identifiers and forgets
                  your device fingerprints.
                </li>
                <li>
                  Walk you through cancelling any active Owlka subscription
                  in Apple Settings (none exists during the public beta).
                  When the paid plan is live, Apple handles the actual
                  cancellation and any refund.
                </li>
              </ul>
              <p className="mt-3">
                If the in-app flow is unavailable, you can also email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                and we will delete the relay-side device records for you.
                Anything stored locally on your own desktop is yours to
                manage on your machine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Data controller
              </h2>
              <p>
                The data controller for the small amount of personal data
                Owlka processes is Owlka Ltd, a company registered in England
                and Wales (Company No. 17266868), registered office Singleton
                Court Business Park, Wonastow Road, Monmouth, Monmouthshire,
                United Kingdom, NP25 5JA. For data-protection enquiries, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Lawful bases we rely on (UK and EU GDPR)
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Contract.</strong> Processing your device
                  identifiers so we can deliver the Service you have signed
                  up for. If and when we switch on a paid subscription, we
                  will also process the anonymised Apple receipt on this
                  basis.
                </li>
                <li>
                  <strong>Legitimate interests.</strong> Processing relay
                  metadata to keep the relay working and to detect abuse;
                  processing opt-in crash logs to fix bugs.
                </li>
                <li>
                  <strong>Consent.</strong> Crash reporting and any
                  optional analytics are processed only if you switch
                  them on. You can switch them off again at any time.
                </li>
                <li>
                  <strong>Legal obligation.</strong> Where we are required
                  to retain or disclose data under applicable law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under UK GDPR and EU GDPR
              </h2>
              <p>
                If you are in the United Kingdom or the European Economic
                Area, you have the right to access the personal data we
                hold about you, to ask us to correct or delete it, to
                object to or restrict our processing of it, and to data
                portability. You also have the right to complain to the UK
                Information Commissioner&rsquo;s Office at{" "}
                <a
                  href="https://ico.org.uk"
                  className="text-mark hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  ico.org.uk
                </a>
                . To exercise any of these rights, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                . Because the conversation, code, and memory all live on
                your own desktop, the data we hold on you is limited to the
                items listed in &ldquo;What Owlka collects&rdquo; above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under California privacy law (CCPA and CPRA)
              </h2>
              <p>
                If you are a California resident, you have the right to know
                what personal information we collect about you, the right to
                request deletion, the right to correct inaccurate
                information, and the right not to be discriminated against
                for exercising these rights. We do not sell or share
                personal information for cross-context behavioural
                advertising. To make a request, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                . We will verify your request before acting on it and will
                respond within the timeframes the law sets.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Children</h2>
              <p>
                Owlka is rated 17+ on the App Store and is not directed at
                children. We do not knowingly collect personal data from
                children under 13 (or under 16 where local law sets the
                higher floor). If you believe a child has provided us with
                personal data, email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                and we will delete it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Changes to this policy
              </h2>
              <p>
                If we change this policy, the &ldquo;Last updated&rdquo;
                date at the top of the page will change. Material changes
                will also be announced inside the app the next time you
                open it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p>
                Questions, requests, or concerns:{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
