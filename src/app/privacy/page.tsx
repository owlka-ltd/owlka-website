import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  COMPANY_NAME,
  COMPANY_NUMBER,
  COMPANY_JURISDICTION,
  REGISTERED_OFFICE,
} from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Owlka handles your data. Plain English. Last updated 2026-07-23.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-3xl px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <header className="mb-12">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-muted">Last updated 2026-07-23</p>
          </header>

          <div className="prose prose-neutral max-w-none text-text/85 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4">
                The short version
              </h2>
              <p>
                Owlka is a desktop app for your Mac and a companion app for
                your iPhone. Your conversations, code, and memory live on your
                own desktop. The two apps talk through an encrypted relay that
                we cannot read. We do not sell or share your data. We do not
                run advertising trackers. We do not use anything you build to
                train any model.
              </p>
              <p className="mt-4">
                Owlka wraps your own Claude subscription on your desktop. Owlka
                does not resell Anthropic. You bring your own Claude Pro or Max
                subscription, and your desktop talks to Anthropic directly
                under your own login. We never see your Claude traffic.
              </p>
              <p className="mt-4">
                To keep your account and to send you notifications, we do hold
                a small amount of account data on our server when you choose to
                sign in with Apple: your name and email. The detail is below.
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
                  <strong>Your name and email, if you sign in with Apple.</strong>{" "}
                  Signing in is optional. You can use Owlka by tapping
                  &ldquo;Not now&rdquo; and pairing a Mac without an account.
                  If you do sign in with Apple, Apple gives us your name and
                  email, and we store them on our relay server so we can keep
                  your account, route push notifications to your devices, and
                  let you manage or delete the account. This is linked to your
                  account identity. It is not used for advertising and is never
                  sold or shared for marketing.
                </li>
                <li>
                  <strong>Device identifiers for pairing.</strong> When you
                  pair your phone with a desktop, Owlka generates a random
                  identifier for each device and a public key for each pairing.
                  We use these to route encrypted packets to the right device.
                  They are random, reset if you re-pair or reinstall, and are
                  not derived from your name or your Apple ID.
                </li>
                <li>
                  <strong>Usage analytics, optional and off by default in
                  the App Store app.</strong> Owlka can record which screens
                  and features you use (for example that the chat screen was
                  opened), tagged with a random per-install identifier and the
                  app version, so we can see which parts of the app people
                  actually use. These events never contain your messages, your
                  files, or your commands, only fixed screen and feature
                  names. In the App Store build this is off unless you turn it
                  on; in beta builds it may be on by default with a one-time
                  notice and an off switch. You control it any time in Settings.
                </li>
                <li>
                  <strong>Crash and diagnostic reports, opt-in and off by
                  default.</strong> If you turn on &ldquo;Share
                  diagnostics&rdquo; in Settings, Owlka will upload crash and
                  hang reports and a redacted debug log to our relay so we can
                  fix bugs. This is off unless you switch it on. Separately, so
                  we can help when you report a specific problem, our support
                  team can request a one-off pull of your redacted debug log
                  from your device; that log is scrubbed of message content by
                  the operating system&rsquo;s logging privacy rules and never
                  contains your message text, file contents, or tool output.
                  You can see and control the diagnostics setting in Settings.
                </li>
                <li>
                  <strong>Connection metadata.</strong> Our encrypted relay
                  records connection metadata so we can keep the service
                  running and measure load on it. The relay cannot decrypt
                  sealed packets. Message contents, file contents, tool
                  arguments, and tool output are end-to-end encrypted and never
                  visible to us. What we record is: the public-key identifiers
                  of the devices currently connecting (the per-pair keys you
                  generated when you paired, never your name or your Apple ID),
                  the IP address of each connection, the byte size of each
                  sealed packet, and the timing of packets. We use this for
                  service reliability, load measurement, and abuse detection.
                </li>
                <li>
                  <strong>Support correspondence.</strong> If you contact us
                  through the in-app support form or email support@owlka.com or
                  security@owlka.com, we keep that thread, including your name,
                  email, and any logs you choose to attach, so we can help you.
                </li>
                <li>
                  <strong>Apple subscription receipt, not collected during
                  the public beta.</strong> Owlka is free during the public
                  beta, so Apple does not send us a receipt. If we ever switch
                  on a paid subscription, Apple will send us an anonymised
                  receipt confirming your subscription is active; we never see
                  your card details or Apple ID. This policy will be updated
                  with a new &ldquo;Last updated&rdquo; date before that
                  change goes live.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                What Owlka does not collect
              </h2>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Message content.</strong> Every message between your
                  phone and your desktop is end-to-end encrypted with keys that
                  only your devices hold. The relay carries sealed bytes. We
                  cannot read them.
                </li>
                <li>
                  <strong>Speech audio, in the default voice mode.</strong>{" "}
                  When you dictate to Owlka in the default mode, the audio is
                  transcribed on the device using Apple&rsquo;s on-device
                  Speech framework. It never leaves your phone and we never
                  receive a recording. If you separately turn on{" "}
                  <strong>Live voice</strong> in Settings, your audio is sent,
                  end-to-end encrypted, to your own paired Mac, which performs
                  the transcription and speech using an ElevenLabs key that
                  lives on your Mac. In that mode the audio leaves your phone
                  only to reach your own Mac; our relay still cannot read it,
                  and Owlka never receives the recording. ElevenLabs acts as a
                  processor reached by your Mac, under its own terms.
                </li>
                <li>
                  <strong>Location.</strong> Owlka does not track your location.
                  Your phone only sends a location when you explicitly ask a
                  location-aware question (for example &ldquo;what coffee shops
                  are nearby&rdquo;). In that case the location is included in
                  the encrypted message to your desktop and is not visible to us.
                </li>
                <li>
                  <strong>Your Anthropic login.</strong> Owlka never sees,
                  copies, or stores your Claude login. It lives where the
                  Claude desktop tools put it on your machine, under your
                  operating system&rsquo;s user permissions.
                </li>
                <li>
                  <strong>Your code, files, or project memory.</strong> All of
                  that lives on your own desktop. We never copy any of it to a
                  server.
                </li>
                <li>
                  <strong>Third-party advertising or tracking pixels.</strong>{" "}
                  Owlka runs none. We do not use third-party analytics that
                  identify you personally, and we do not track you across other
                  apps or websites.
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
                home desktop and a work laptop. Each phone-and-desktop pair is
                a separate boundary.
              </p>
              <p className="mt-4">
                Memory, skills, connected accounts, and credentials are
                partitioned by pair. The first person&rsquo;s phone sees only
                their own memory and their own connected accounts. The second
                person&rsquo;s phone sees only theirs. Switching active desktops
                on the phone switches the whole context to the memory and
                connectors for that pair. The desktop owner can grant cross-pair
                sharing for a specific topic if they choose, but the default is
                full isolation.
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
                  <strong>Apple.</strong> Apple distributes the iPhone app and
                  provides Sign in with Apple. When you sign in, Apple confirms
                  your identity and passes us your name and email. Apple also
                  delivers our push notifications. If we ever switch on a paid
                  subscription, Apple will handle billing under its own privacy
                  policy.
                </li>
                <li>
                  <strong>Cloudflare.</strong> Cloudflare fronts the encrypted
                  relay. It sees connection metadata such as IP addresses and
                  timing, plus sealed bytes it cannot decrypt.
                </li>
                <li>
                  <strong>Our relay host.</strong> A small server that shuttles
                  sealed packets between phones and desktops and stores the
                  account data described above (name, email, device tokens,
                  session tokens). It cannot read packet contents.
                </li>
                <li>
                  <strong>ElevenLabs.</strong> Only if you turn on Live voice.
                  Your Mac uses ElevenLabs to transcribe and speak; the key
                  lives on your Mac. Your audio reaches ElevenLabs via your own
                  Mac, not via Owlka&rsquo;s servers.
                </li>
                <li>
                  <strong>Vercel.</strong> Vercel hosts owlka.com. It logs
                  standard request metadata for the public pages.
                </li>
                <li>
                  <strong>Your chosen Claude subscription.</strong> Your desktop
                  talks to Anthropic directly under your own Anthropic account.
                  Your usage is governed by your own agreement with Anthropic.
                  Anthropic is not an Owlka sub-processor, because none of your
                  Claude traffic ever passes through us.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Account deletion
              </h2>
              <p>
                You can delete your Owlka account from inside the app. Open
                More, then the Beta (free) page, and tap &ldquo;Delete my
                account and data.&rdquo; The app will:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  Wipe the local data on your phone (cached messages, paired
                  device records, keys in the iOS Keychain).
                </li>
                <li>
                  Delete your account on our relay, removing your stored name
                  and email, your device public keys, your push device tokens,
                  and your session tokens, and disconnecting any live session.
                </li>
                <li>
                  For Sign in with Apple accounts, revoke your Apple tokens with
                  Apple&rsquo;s token-revocation service so the sign-in grant is
                  fully torn down.
                </li>
                <li>
                  Walk you through cancelling any active Owlka subscription in
                  Apple Settings (none exists during the public beta). When a
                  paid plan is live, Apple handles the actual cancellation and
                  any refund.
                </li>
              </ul>
              <p className="mt-3">
                Deletion always takes effect on your device even if a server
                step is briefly unreachable. If the in-app flow is unavailable,
                you can also email{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>{" "}
                and we will delete your account and relay-side records for you.
                Anything stored locally on your own desktop is yours to manage
                on your machine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Data controller
              </h2>
              <p>
                The data controller for the personal data Owlka processes is{" "}
                {COMPANY_NAME}, a company registered in {COMPANY_JURISDICTION}{" "}
                (Company No. {COMPANY_NUMBER}), registered office{" "}
                {REGISTERED_OFFICE}. For data-protection enquiries, email{" "}
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
                  <strong>Contract.</strong> Processing your account data (name,
                  email) and device identifiers so we can deliver the account
                  and the Service you have signed up for. If and when we switch
                  on a paid subscription, we will also process the anonymised
                  Apple receipt on this basis.
                </li>
                <li>
                  <strong>Legitimate interests.</strong> Processing relay
                  metadata to keep the relay working and to detect abuse, and
                  handling support correspondence you send us.
                </li>
                <li>
                  <strong>Consent.</strong> Usage analytics and
                  crash/diagnostics reporting are processed only if you switch
                  them on (analytics is off by default in the App Store app;
                  diagnostics is off by default everywhere). You can switch them
                  off again at any time in Settings.
                </li>
                <li>
                  <strong>Legal obligation.</strong> Where we are required to
                  retain or disclose data under applicable law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under UK GDPR and EU GDPR
              </h2>
              <p>
                If you are in the United Kingdom or the European Economic Area,
                you have the right to access the personal data we hold about
                you, to ask us to correct or delete it, to object to or
                restrict our processing of it, and to data portability. You
                also have the right to complain to the UK Information
                Commissioner&rsquo;s Office at{" "}
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
                . Because the conversation, code, and memory all live on your
                own desktop, the data we hold on you is limited to the items
                listed in &ldquo;What Owlka collects&rdquo; above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Your rights under California privacy law (CCPA and CPRA)
              </h2>
              <p>
                If you are a California resident, you have the right to know
                what personal information we collect about you, the right to
                request deletion, the right to correct inaccurate information,
                and the right not to be discriminated against for exercising
                these rights. We do not sell or share personal information for
                cross-context behavioural advertising. To make a request, email{" "}
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
                Owlka is not directed at children and is age-rated accordingly
                on the App Store. We do not knowingly collect personal data from
                children under 13 (or under 16 where local law sets the higher
                floor). If you believe a child has provided us with personal
                data, email{" "}
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
                If we change this policy, the &ldquo;Last updated&rdquo; date at
                the top of the page will change. Material changes will also be
                announced inside the app the next time you open it.
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
