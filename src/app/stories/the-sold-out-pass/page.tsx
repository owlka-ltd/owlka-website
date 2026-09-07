import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const TITLE = "How Owlka booked a sold-out pass";
const STANDFIRST =
  "I think it's fair to say my wife wasn't the biggest fan of Owlka. That was two days ago. Now she 'gets it'.";
const OG_IMAGE = "/stories/sold-out-pass.jpg";
const PHOTO_ALT =
  "On the log flume at Chessington, the day the pass came through.";
const PUBLISHED = "2026-09-07";

export const metadata: Metadata = {
  title: TITLE,
  description: STANDFIRST,
  alternates: { canonical: "/stories/the-sold-out-pass" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    url: `${SITE_URL}/stories/the-sold-out-pass`,
    title: TITLE,
    description: STANDFIRST,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1536,
        height: 2048,
        alt: PHOTO_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: STANDFIRST,
    images: [OG_IMAGE],
  },
};

export default function TheSoldOutPassPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg text-text">
        <article className="mx-auto max-w-[680px] px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
          <header className="mb-10">
            <Link
              href="/stories"
              className="text-sm text-muted hover:text-text transition-colors"
            >
              &larr; Stories
            </Link>
            <p className="mt-6 text-sm font-medium text-mark uppercase tracking-wider">
              Story
            </p>
            <h1 className="mt-3 text-4xl sm:text-[42px] font-semibold tracking-tight leading-tight">
              {TITLE}
            </h1>
            <p className="mt-5 text-lg text-text/70 leading-relaxed">
              {STANDFIRST}
            </p>
            <p className="mt-4 text-sm text-muted">
              <time dateTime={PUBLISHED}>7 September 2026</time>
            </p>
          </header>

          <div className="space-y-6 text-[17px] text-text/80 leading-relaxed">
            <p>
              I think it&rsquo;s fair to say my wife wasn&rsquo;t the biggest
              fan of Owlka. Not for what it is, but for the hours I have put
              into it. Night after night I have sat on the sofa next to her
              building it instead of being with her, and she did not
              understand why. Then a couple of days ago in the space of about
              half an hour she watched it turn a stressful day for our
              daughter into a delightful one. She does not hate it (quite so
              much) any more.
            </p>

            <h2 className="pt-4 text-2xl font-semibold tracking-tight text-text">
              Our Saturday
            </h2>

            <p>
              My wife went to the gym on Saturday morning and came back with a
              plan. She had got talking to another mum, one from our
              daughter&rsquo;s class, and they had decided to take the kids
              to Chessington World of Adventure the following day. For most
              parents that is an easy, casual yes. For the parent of a child
              with ADHD it is not. We&rsquo;d be signing Sophie up for a
              whole day of standing in line and navigating crowds and just
              hoping it goes ok.
            </p>

            <p>
              The one thing that makes that day bearable is the accessibility
              pass that lets you queue virtually. But that was sold out. So
              the excited initial yes turned into a real dilemma: go anyway
              and try to carry our daughter through a day that could fall
              apart, or pull out and let her miss the day with her friend.
              There was no easy answer. My wife was honestly torn.
            </p>

            <p>
              At 21:44 I was on the sofa next to her and we were talking it
              through. I picked up my phone and asked Owlka whether it could
              watch the site and tell us if anyone cancelled and a pass
              became available again. It checked the Chessington site,
              confirmed that it could do that, but it would need her Access
              Card number.
            </p>

            <p>
              Next time I got up (22:03) I took a quick picture of the card
              and uploaded it to Owlka. I typed nothing else. It read the
              details straight off the picture. A minute later it checked
              availability itself and confirmed what we already knew: the
              passes were genuinely gone for the next day.
            </p>

            <p>
              By 22:05 it had set up a watcher on my Mac Mini, checking
              regularly and emailing both me and my wife if any passes became
              available.
            </p>

            <p>
              I iterated the plan over four short messages between 22:06 and
              22:10. I increased the check frequency to every minute (from
              every three), then asked Owlka to actually book it if any
              became available (don&rsquo;t just alert me - take action).
            </p>

            <p>
              Amazingly, at 22:15 a slot opened. It booked it, emailed me and
              my wife, and then shut down the (now unneeded) monitoring
              service. We were both amazed it had worked so quickly (we got
              lucky). I asked it to double-check, at 22:17, it re-queried and
              confirmed the booking existed on the park&rsquo;s own system,
              not just in its own record of what it thought it had done.
            </p>

            <p>Thirty-one minutes from asking to booked.</p>

            <p>
              I did not go to a computer. If I had needed to, I would not
              have bothered that late, and our daughter would have spent the
              day in queues she struggles to cope with. It needed me on the
              sofa, sending four sentences and a photo of a pass. That is the
              whole of it.
            </p>

            <p>
              A child who was anxious a few hours ago had a wonderful day.
              And the person who most doubted the hours I put into this now
              understands them.
            </p>

            <figure className="not-prose my-10 overflow-hidden rounded-card border border-border bg-surface">
              <Image
                src="/stories/sold-out-pass.jpg"
                alt={PHOTO_ALT}
                width={1536}
                height={2048}
                className="w-full h-auto"
              />
            </figure>
          </div>

          <footer className="mt-16 border-t border-border pt-6 text-sm text-muted">
            <p>
              Curious what Owlka can do for you?{" "}
              <Link
                href="/download"
                className="underline hover:text-text transition-colors"
              >
                Download Owlka for Mac
              </Link>
              . Questions? Email{" "}
              <a
                href="mailto:support@owlka.com"
                className="underline hover:text-text transition-colors"
              >
                support@owlka.com
              </a>
              .
            </p>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
