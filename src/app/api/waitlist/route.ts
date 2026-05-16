import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PER_WINDOW = 4;
const WINDOW_MS = 60_000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || cur.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (cur.count >= MAX_PER_WINDOW) return false;
  cur.count += 1;
  return true;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again in a minute." },
      { status: 429 }
    );
  }

  let email: string | undefined;
  let referrer: string | undefined;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;
    referrer = typeof body?.referrer === "string" ? body.referrer : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const ts = new Date().toISOString();
  console.log(`[waitlist] ${ts} ip=${ip} email=${email} referrer=${referrer ?? "direct"}`);

  const apiKey = process.env.RESEND_API_KEY;
  const notify = process.env.WAITLIST_NOTIFY_EMAIL;
  const fromAddr = process.env.WAITLIST_FROM_EMAIL ?? "Owlka <onboarding@resend.dev>";

  if (apiKey && notify) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: fromAddr,
        to: notify,
        subject: `New Owlka waitlist signup: ${email}`,
        text: [
          `New signup at ${ts}`,
          ``,
          `Email: ${email}`,
          `Referrer: ${referrer ?? "direct"}`,
          `IP: ${ip}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error(`[waitlist] notify failed:`, err);
    }
  }

  return NextResponse.json({ ok: true });
}
