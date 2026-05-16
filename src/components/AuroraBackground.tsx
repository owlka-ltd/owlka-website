"use client";

type Props = {
  className?: string;
  intensity?: "soft" | "vivid";
};

export function AuroraBackground({ className = "", intensity = "soft" }: Props) {
  const opacity = intensity === "vivid" ? 0.85 : 0.55;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full blur-3xl animate-aurora-slow"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-tint-mark), transparent 70%)",
          opacity,
        }}
      />
      <div
        className="absolute top-20 -right-40 w-[36rem] h-[36rem] rounded-full blur-3xl animate-aurora-fast"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-tint-accent), transparent 70%)",
          opacity,
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full blur-3xl animate-aurora-slow"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-tint-mark), transparent 70%)",
          opacity: opacity * 0.6,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "var(--color-text)",
        }}
      />
    </div>
  );
}
