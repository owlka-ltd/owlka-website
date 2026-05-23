# Owlka status page

Live operational status for the user-visible Owlka surfaces. Linked from
the iOS app (Settings, Help) and the website footer.

## Hosting

The status page is served by the main `owlka-website` Vercel project so
it shares the brand assets, Nav, Footer, fonts and edge cache with the
rest of the marketing site.

| URL | Source |
|---|---|
| `https://owlka.com/status` | `src/app/status/page.tsx` (rendered) |
| `https://status.owlka.com` | Vercel custom domain alias of the same project (pending DNS, see below) |
| `https://owlka.com/api/status` | `src/app/api/status/route.ts` (probe + JSON) |

The iOS app links to `https://status.owlka.com`. Until the DNS record is
added, the page is still reachable at `https://owlka.com/status` and
both URLs serve the same React tree once the alias is attached.

## How it polls

The page is split into two layers.

1. **Server-side probe.** `/api/status` runs once per request (edge cache
   `s-maxage=30, stale-while-revalidate=60`). It `fetch`es three
   endpoints from a Vercel edge with a 4 second timeout each and rolls
   the results into a single overall status.

   | Component | Probe URL | Healthy when |
   |---|---|---|
   | Encrypted middleman | `https://relay.owlka.com/health` | HTTP 200 and JSON body has `status == "ok"` |
   | Mac app downloads | `https://download.owlka.com/health` | HTTP 200 |
   | Owlka website | `https://owlka.com/api/og?title=ping` | HTTP 200 (proves the same Vercel project is serving) |

   The relay validator checks the actual `status` field returned by
   `owlka-relay`, not just that the HTTP request completed. This catches
   the cloudflared tunnel staying up while the relay process died.

2. **Client-side polling.** `StatusBoard.tsx` is a client component that
   fetches `/api/status` once on mount and every 60 seconds after. It
   renders coloured dots per component and a roll-up headline.

The probes are server-to-server, so no CORS preflight is involved and no
internal IPs are exposed in the rendered page. The page never reads
Tailscale or LAN addresses.

### Status taxonomy

| Status | When | Headline |
|---|---|---|
| `ok` | All probes returned 200 and any validator passed | All systems operational |
| `degraded` | At least one component is `degraded` or a mix of `ok` + `unknown` | Some systems degraded |
| `down` | At least one component returned a hard failure | Active outage |
| `unknown` | All probes either timed out or refused to connect | Status unknown |

## Recording an incident

Incidents live in `src/content/incidents.ts` as a typed array. The file
is checked in and ships with the next Vercel deploy. TypeScript checks
the shape of every entry at build time, so a malformed incident cannot
ship.

```typescript
export const INCIDENTS: Incident[] = [
  {
    id: "2026-05-23-relay-flap",
    title: "Relay restart after deploy",
    status: "resolved",
    started_at: "2026-05-23T07:12:00Z",
    resolved_at: "2026-05-23T07:18:00Z",
    components: ["relay"],
    updates: [
      {
        ts: "2026-05-23T07:12:00Z",
        body: "Relay restarted after a config push; reconnects observed.",
      },
      {
        ts: "2026-05-23T07:18:00Z",
        body: "All clients reconnected, health check green.",
      },
    ],
  },
];
```

Fields:

- `id`: unique, kebab-case, dated.
- `title`: one short line, plain English. No jargon.
- `status`: `investigating`, `identified`, `monitoring`, `resolved`.
- `started_at`: ISO-8601 UTC.
- `resolved_at`: ISO-8601 UTC, or `null` while the incident is open.
- `components`: array of component ids (`relay`, `downloads`, `website`).
- `updates`: chronological list of timestamped status updates.

Active incidents (`resolved_at == null`) appear in a dedicated "Active"
section. Resolved incidents from the last 7 days appear in "Resolved in
the last 7 days". Older incidents stay in the JSON for the historical
record but are not rendered.

To file a new incident:

1. Branch from `main`.
2. Append an entry to `src/content/incidents.ts`.
3. Commit and push. Vercel auto-deploys; the next page load shows it.

To update an open incident: edit the entry's `status` and append a new
item to `updates`. Push.

To close an incident: set `resolved_at` to the ISO-8601 timestamp and
`status` to `resolved`. Push.

## Subdomain DNS (pending)

`status.owlka.com` is the canonical link target from the iOS app. To
make the subdomain resolve to the Vercel deployment that hosts this
page:

1. In the Vercel dashboard for `owlka-website`, add `status.owlka.com`
   as a custom domain. Vercel will hand back a CNAME target
   (`cname.vercel-dns.com.`) and a TXT validation record.
2. In the Cloudflare zone `owlka.com`, add a proxied CNAME
   `status` -> `cname.vercel-dns.com.` (orange cloud on). Add any
   TXT validation Vercel asks for.
3. Wait for Vercel to issue the cert (usually under a minute).
4. Verify with `curl -sI https://status.owlka.com`.

DNS changes are T4 in Tim's tier system (see
`~/.claude/rules/operational.md`), so Claude must stop before executing
the Cloudflare API call. Tim runs steps 1 and 2 personally, or
explicitly authorises a session to run them.

Until the subdomain lands, the iOS app deep link still works in the
sense that `https://status.owlka.com` is what's printed; on tap the OS
will fail to resolve. The fallback path is the website footer link
which already points to `/status` on the apex.

## Rollback

The status page is content, not infrastructure. To revert:

```bash
cd ~/code/owlka-website
git revert <commit-sha-of-status-page-live>
git push
```

Vercel redeploys on push and the old static page returns within a
minute. The `/api/status` endpoint then disappears with the route file;
clients fall back to the legacy static text.

If only the probe behaviour is misbehaving (false negatives, e.g. a
probe timeout caused by a Cloudflare edge issue rather than a real
outage), the cheap fix is to:

1. Edit `src/app/api/status/route.ts`.
2. Comment out the offending probe in `PROBES`.
3. Commit and push. Done.

## What this page is not

- It is not a marketing claim. We never write "99.99% uptime" here. The
  page reports what its probes currently see, period.
- It is not a status-history graph. There is no time-series store; the
  page shows current status plus the manually-recorded incident log.
- It is not a subscriber list. There is no email or SMS subscription;
  the page is read-only.
- It does not poll Anthropic. If Claude itself is down, Owlka's relay
  may stay green while users get errors from `claude` on their own Mac.
  We'll add an Anthropic upstream indicator when we have a clean signal
  (Anthropic publishes a status feed at `status.anthropic.com`).
