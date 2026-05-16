import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Intrinsic width of the screenshot in pixels (used for layout). */
  width: number;
  /** Intrinsic height of the screenshot in pixels. */
  height: number;
  /** Tailwind class for max width of the frame, e.g. "max-w-[320px]". */
  className?: string;
  /** Force light or dark frame chrome. Default: dark titanium. */
  chrome?: "dark" | "light";
  priority?: boolean;
};

/**
 * iPhone 17 Pro device frame. Renders a real screenshot inside a refined
 * titanium bezel with dynamic island + glass highlights. Replaces the
 * earlier hand-drawn SVG PhoneMockup.
 */
export function DeviceFrame({
  src,
  alt,
  width,
  height,
  className = "max-w-[320px]",
  chrome = "dark",
  priority = false,
}: Props) {
  const bezelBg =
    chrome === "dark"
      ? "bg-gradient-to-b from-[#3a3a3f] via-[#1c1c20] to-[#0e0e10]"
      : "bg-gradient-to-b from-[#f5f5f0] via-[#e6e6df] to-[#d4d4cc]";

  return (
    <div className={`relative ${className} w-full`}>
      {/* outer titanium bezel */}
      <div
        className={`relative ${bezelBg} rounded-[44px] p-[3px] shadow-[0_60px_120px_-30px_rgba(15,15,20,0.55),0_30px_60px_-20px_rgba(15,15,20,0.35)]`}
      >
        {/* inner bezel shadow ring */}
        <div className="relative rounded-[42px] bg-[#0a0a0c] p-[10px]">
          {/* screen */}
          <div
            className="relative overflow-hidden rounded-[34px] bg-bg"
            style={{ aspectRatio: `${width} / ${height}` }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* dynamic island */}
            <div
              aria-hidden
              className="absolute left-1/2 top-[1.6%] z-20 h-[3.1%] w-[28%] -translate-x-1/2 rounded-full bg-black"
            />

            {/* subtle glass highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-[34px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 22%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.05) 100%)",
              }}
            />
          </div>
        </div>

        {/* side button hints */}
        <span
          aria-hidden
          className={`absolute top-[18%] -left-[2px] h-[8%] w-[2px] rounded-l-sm ${
            chrome === "dark" ? "bg-[#1f1f23]" : "bg-[#c8c8c0]"
          }`}
        />
        <span
          aria-hidden
          className={`absolute top-[30%] -left-[2px] h-[14%] w-[2px] rounded-l-sm ${
            chrome === "dark" ? "bg-[#1f1f23]" : "bg-[#c8c8c0]"
          }`}
        />
        <span
          aria-hidden
          className={`absolute top-[50%] -left-[2px] h-[14%] w-[2px] rounded-l-sm ${
            chrome === "dark" ? "bg-[#1f1f23]" : "bg-[#c8c8c0]"
          }`}
        />
        <span
          aria-hidden
          className={`absolute top-[24%] -right-[2px] h-[18%] w-[2px] rounded-r-sm ${
            chrome === "dark" ? "bg-[#1f1f23]" : "bg-[#c8c8c0]"
          }`}
        />
      </div>
    </div>
  );
}
