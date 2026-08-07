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
    "How Owlka handles your data. Plain English. Last updated 2026-07-31.",
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
            <p className="mt-4 text-sm text-muted">Last updated 2026-07-31</p>
          </header>

          <div className="prose prose-neutral max-w-none text-text/85 leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mt-0 mb-4">
                The short version
              </h2>
              <p>
                Owlka is a desktop app for your Mac or Windows PC and a
                companion app for your iPhone. Your conversations, code, and
                memory live on your own desktop. The two apps talk through an
                encrypted relay that
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
                  <strong>Usage analytics. On by default, in every version of
                  the app.</strong> Owlka can record which screens and features
                  you use (for example that the chat screen was opened), tagged
                  with a random per-install identifier and the app version, so
                  we can see which parts of the app people actually use. These
                  events never contain your messages, your files, or your
                  commands, only fixed screen and feature names. The first time
                  you open the app we show a notice telling you this is on, with
                  a one-tap off switch. You can change it at any time under More,
                  then Account &amp; Subscription, and we keep these events for
                  90 days.
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
                  through the in-app support form or email support@owlka.com, we
                  keep that thread, including your name, email, and any logs you
                  choose to attach, so we can help you.
                </li>
                <li>
                  <strong>Payment details: none, today.</strong> Owlka costs
                  &pound;4.99 a month or &pound;49.99 a year after a free first
                  30 days, but billing is not switched on yet, so we currently
                  collect no payment information of any kind. When billing does
                  start it will run through this website rather than through
                  Apple, and we will update this policy with a new &ldquo;Last
                  updated&rdquo; date, naming our payment processor, before any
                  charge is taken.
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
                  <strong>Speech audio.</strong> Owlka does not transcribe
                  speech on your device. If you use Owlka&rsquo;s microphone
                  button, the recording is sent to ElevenLabs and transcribed
                  there. This is possible only once you have added your own
                  ElevenLabs API key on your desktop; with no key the button is
                  greyed out and your microphone is never opened. From the
                  iPhone app the recording travels end-to-end encrypted to your
                  own paired Mac, which passes it to ElevenLabs using your key;
                  from the desktop app it goes straight to ElevenLabs. When
                  Owlka speaks a reply aloud, the text of that reply is sent to
                  ElevenLabs as well. Our relay cannot read any of it and Owlka
                  never receives the recording or the transcript. ElevenLabs
                  acts as a processor reached by your own machine with your own
                  key, under its own terms.
                </li>
                <li>
                  <strong>Location.</strong> Owlka never accesses your location.
                  The app contains no location code and asks for no location
                  permission, so there is nothing to collect, send, or store.
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
                What Owlka keeps per pair: your Owlka memory, the accounts you
                connect through Owlka and the credentials for them, and the
                per-pair settings and skills Owlka stores itself. Each of those
                is filed under the pair it belongs to. The first person&rsquo;s
                phone sees their own memory and their own connected accounts.
                The second person&rsquo;s phone sees theirs. Switching active
                desktops on the phone switches that context to the pair you
                switched to.
              </p>
              <p className="mt-4">
                Two limits on that, stated plainly because they are how the
                software actually behaves today.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Anything that is simply a file on the desktop is
                  shared by everyone who uses that desktop.</strong> Claude runs
                  on your computer as your computer&rsquo;s user. Your projects,
                  your code, your Claude configuration, and Claude&rsquo;s own
                  memory and skills are ordinary files under your operating
                  system account, so every pair on that machine reaches the same
                  ones. Owlka partitions the records Owlka keeps. It does not,
                  and cannot, partition your hard disk. If two people share a
                  desktop, treat that desktop as shared.
                </li>
                <li>
                  <strong>If Owlka cannot work out which pair a session belongs
                  to, it falls back to a shared default rather than
                  stopping.</strong> In that case the session reads and writes a
                  single default memory store instead of a pair-specific one, so
                  a session that lost its pair identity can see memory written
                  by another session that also lost its pair identity on the same
                  desktop. It fails open, not closed. We chose availability over
                  isolation there, and you should know it.
                </li>
              </ul>
              <p className="mt-4">
                There is no cross-pair sharing control. Owlka has no setting that
                lets a desktop owner grant one pair access to another
                pair&rsquo;s memory or connected accounts, and no such feature
                ships today.
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
                  <strong>Our relay host, Hetzner.</strong> A single small
                  server rented from Hetzner Online GmbH in Nuremberg, Germany.
                  It shuttles sealed packets between phones and desktops and
                  stores the account data described above (name, email, device
                  tokens, session tokens). It cannot read packet contents.
                </li>
                <li>
                  <strong>ElevenLabs.</strong> Only if you have added your own
                  ElevenLabs API key on your desktop. Your desktop then uses
                  ElevenLabs to transcribe what you say and to speak replies
                  aloud; the key stays on your desktop. Your audio reaches
                  ElevenLabs via your own machine and your own account, not via
                  Owlka&rsquo;s servers.
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

            {/*
              Retention periods below are the ones the relay actually enforces
              in code, not aspirations. Verified 2026-07-25 against
              owlka-relay: diag.rs (30 day diagnostics sweep), telemetry.rs
              (90 day ui_events sweep), admin.rs (90 day events sweep,
              OWLKA_METRICS_RETENTION_DAYS), logging.rs (14 day log rotation
              sweep), parking.rs (31 day PARK_MAX_AGE).

              2026-08-01: the two rows that were commitments rather than
              descriptions have been corrected to describe what the code
              actually does. There is NO inactivity sweeper for dormant
              accounts (no such job exists in the relay), and support
              correspondence has NO automatic expiry (contact.rs and
              debug_logs.rs contain no retention code at all). Do not
              reintroduce a period here that nothing enforces. If a sweeper
              ships later, state its real period and cite the file.

              Also corrected: account deletion is immediate in the live
              database but off-box snapshots are kept ~28 days
              (scripts/backup/hetzner-snapshot.sh), so "immediately and
              permanently" was not accurate on its own.
            */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                How long we keep things
              </h2>
              <p>
                We delete on a schedule rather than keeping things
                indefinitely. The periods below are the ones our servers
                actually enforce.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Your account (name, email, device tokens, session
                  token): for as long as you have an Owlka account.</strong> We
                  do not put a timer on it because it is what keeps your account
                  working, and we do not currently delete dormant accounts on a
                  schedule. Delete your account and it is removed from our live
                  database straight away. We also take encrypted backups of that
                  database and keep them for about 28 days, so a deleted account
                  can persist in a backup for up to that long before the backup
                  itself expires.
                </li>
                <li>
                  <strong>Device pairing identifiers: until you unpair or delete
                  your account.</strong> Re-pairing generates new ones and the
                  old ones stop being used.
                </li>
                <li>
                  <strong>Usage analytics events: 90 days.</strong> Deleted
                  automatically after that.
                </li>
                <li>
                  <strong>Crash reports: we keep the most recent 500.</strong>{" "}
                  Older ones are dropped as new ones arrive.
                </li>
                <li>
                  <strong>Diagnostic log uploads: 30 days.</strong> This covers
                  both the ones you send by switching on &ldquo;Share
                  diagnostics&rdquo; and the one-off pulls you agree to when you
                  report a problem.
                </li>
                <li>
                  <strong>Connection metadata (device public-key identifiers, IP
                  address, packet size, timing): 90 days.</strong>
                </li>
                <li>
                  <strong>Relay server logs: 14 days.</strong>
                </li>
                <li>
                  <strong>A sealed message waiting for a device that is offline:
                  deleted as soon as it is delivered, and in any case after 31
                  days.</strong> We cannot read it while it waits.
                </li>
                <li>
                  <strong>Support correspondence: kept until we delete it by
                  hand.</strong> We are not going to claim a tidy period here,
                  because nothing automatically expires it today. If you have
                  written to us, or sent us diagnostic logs through the support
                  form, assume we still hold that thread. Ask us to delete it and
                  we will.
                </li>
              </ul>
              <p className="mt-3">
                Where the law requires us to keep something for longer, for
                example a record we need to defend a legal claim, we keep only
                that record and only for as long as the law requires.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Where your data is, and transfers out of the UK and EEA
              </h2>
              <p>
                The account data and relay metadata described above are stored
                on a single server in <strong>Nuremberg, Germany</strong>, rented
                from Hetzner Online GmbH. Germany is in the European Economic
                Area, so for readers in the EEA this is not an international
                transfer at all, and for readers in the United Kingdom it is
                covered by the UK&rsquo;s adequacy regulations for the EEA.
              </p>
              <p className="mt-4">
                Three of the providers named above may process data outside the
                UK and the EEA in the course of doing their job:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong>Cloudflare</strong> fronts the relay from whichever of
                  its locations is nearest to you, so it may see your IP address
                  and sealed bytes outside the UK and EEA.
                </li>
                <li>
                  <strong>Apple</strong> operates Sign in with Apple and the push
                  notification service from its own global infrastructure, which
                  includes the United States.
                </li>
                <li>
                  <strong>Vercel</strong> serves owlka.com, the public website,
                  from a global network. This affects page requests only, not
                  your account data or your messages.
                </li>
              </ul>
              <p className="mt-4">
                Where those transfers happen, they rely on the transfer
                safeguards in each provider&rsquo;s own terms, which is an
                adequacy decision where one applies and otherwise the UK
                International Data Transfer Addendum or the EU Standard
                Contractual Clauses. You can ask us for the detail by emailing{" "}
                <Link
                  href="mailto:support@owlka.com"
                  className="text-mark hover:underline"
                >
                  support@owlka.com
                </Link>
                . Your conversations, code, and memory are not part of any of
                this: they never leave your own devices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Account deletion
              </h2>
              <p>
                You can delete your Owlka account from inside the app. On
                iPhone, open More, then Subscription. On Android, open More,
                then Account. On either, tap &ldquo;Delete my account and
                data.&rdquo; The app will:
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
                  There is no Owlka subscription to cancel today, because
                  billing is not switched on. When it is, you will cancel from
                  this website rather than in Apple Settings, since Owlka is not
                  sold through in-app purchase.
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
                  and the Service you have signed up for. When billing is
                  switched on, the subscription and payment records needed to
                  run it will be processed on this basis too.
                </li>
                <li>
                  <strong>Legitimate interests.</strong> Processing relay
                  metadata to keep the relay working and to detect abuse, and
                  handling support correspondence you send us. Also the usage
                  analytics that every version of the app starts with switched
                  on, described in the next bullet.
                </li>
                <li>
                  <strong>Consent.</strong> Crash and diagnostics reporting is
                  off everywhere until you switch it on, and is processed only
                  on your consent. Usage analytics works differently, and we
                  will not claim consent where we do not have it: every version
                  of the app starts with usage analytics switched on, so for
                  anyone who has not switched it off we are relying on our
                  legitimate interest in finding out which parts of the app
                  people use and whether a build works, not on consent. You are
                  told at first run, you can switch it off at any time under
                  More, then Account &amp; Subscription, and you can object to
                  that processing by emailing us.
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
