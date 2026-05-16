const items = [
  "A 3D printer monitor",
  "An Ofsted assistant",
  "A dragon maze",
  "A ticket alert daemon",
  "An iOS terminal app",
  "A live leaderboard",
  "A Cloudflare worker",
  "A Streamlit dashboard",
  "A Klipper safety hook",
  "A scraping pipeline",
  "A native iPhone game",
  "A persistent monitor",
];

export function Marquee() {
  const doubled = [...items, ...items];
  return (
    <section
      className="relative py-12 border-y border-border bg-surface overflow-hidden"
      aria-label="What people build with Owlka"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center mx-6 shrink-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-mark mr-6" />
            <span className="text-lg font-medium tracking-tight text-text/85">
              {item}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
