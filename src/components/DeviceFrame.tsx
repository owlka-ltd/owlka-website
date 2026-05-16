import Image from "next/image";

type CommonProps = {
  /** Tailwind class for max width of the frame, e.g. "max-w-[320px]". */
  className?: string;
  /** Force light or dark frame chrome. Default: dark titanium. */
  chrome?: "dark" | "light";
};

type ImageProps = CommonProps & {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  children?: never;
  /** Aspect override. Default uses width/height. */
  aspect?: never;
};

type ChildrenProps = CommonProps & {
  children: React.ReactNode;
  /** Aspect ratio of the screen, e.g. "1206 / 2622". Defaults to iPhone 17 Pro. */
  aspect?: string;
  src?: never;
  alt?: never;
  width?: never;
  height?: never;
  priority?: never;
};

type Props = ImageProps | ChildrenProps;

/**
 * iPhone 17 Pro device frame. Renders either a real screenshot (image)
 * or arbitrary children (HTML-rendered app UI) inside a refined
 * titanium bezel with dynamic island + glass highlights.
 */
export function DeviceFrame(props: Props) {
  const { className = "max-w-[320px]", chrome = "dark" } = props;

  const bezelBg =
    chrome === "dark"
      ? "bg-gradient-to-b from-[#3a3a3f] via-[#1c1c20] to-[#0e0e10]"
      : "bg-gradient-to-b from-[#f5f5f0] via-[#e6e6df] to-[#d4d4cc]";

  const aspect =
    "src" in props && props.width && props.height
      ? `${props.width} / ${props.height}`
      : ("aspect" in props && props.aspect) || "1206 / 2622";

  return (
    <div className={`relative ${className} w-full`}>
      <div
        className={`relative ${bezelBg} rounded-[44px] p-[3px] shadow-[0_60px_120px_-30px_rgba(15,15,20,0.55),0_30px_60px_-20px_rgba(15,15,20,0.35)]`}
      >
        <div className="relative rounded-[42px] bg-[#0a0a0c] p-[10px]">
          <div
            className="relative overflow-hidden rounded-[34px] bg-bg"
            style={{ aspectRatio: aspect }}
          >
            {"src" in props && props.src ? (
              <Image
                src={props.src}
                alt={props.alt!}
                width={props.width!}
                height={props.height!}
                priority={props.priority}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0">{props.children}</div>
            )}

            <div
              aria-hidden
              className="absolute left-1/2 top-[1.6%] z-20 h-[3.1%] w-[28%] -translate-x-1/2 rounded-full bg-black"
            />

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
