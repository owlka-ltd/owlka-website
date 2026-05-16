type Props = {
  className?: string;
  /** When true, omits the background fill so the mark sits on the page bg */
  transparent?: boolean;
};

/**
 * Owlka brand mark — V4 form, P01 pink classic.
 * Geometry locked in ~/code/owlka-brand/BRAND.md §1.
 * Source: ~/code/owlka-brand/icons-round4b/svg/P01_pink_classic.svg
 */
export function OwlkaMark({ className, transparent = false }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      className={className}
      aria-label="Owlka"
    >
      {!transparent && <rect width="1024" height="1024" fill="#FAFAF7" />}
      <g transform="translate(337.5, 512) scale(1.0000)">
        <ellipse cx="0" cy="0" rx="244" ry="260" fill="#FF2D7A" />
        <path
          d="M -151 13 C -97 95 -259 210 -274 218"
          fill="none"
          stroke="#FAFAF7"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 151 13 C 97 95 259 210 274 218"
          fill="none"
          stroke="#FAFAF7"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle cx="-65" cy="-65" r="30" fill="#FAFAF7" />
        <circle cx="65" cy="-65" r="30" fill="#FAFAF7" />
        <line
          x1="260"
          y1="-280"
          x2="260"
          y2="265"
          stroke="#FF2D7A"
          strokeWidth="70"
          strokeLinecap="round"
        />
        <line
          x1="260"
          y1="30"
          x2="430"
          y2="-120"
          stroke="#FF2D7A"
          strokeWidth="70"
          strokeLinecap="round"
        />
        <line
          x1="260"
          y1="30"
          x2="460"
          y2="260"
          stroke="#FF2D7A"
          strokeWidth="70"
          strokeLinecap="round"
        />
        <circle cx="514" cy="202" r="58" fill="#FF2D7A" />
        <circle cx="514" cy="202" r="42" fill="#FAFAF7" />
        <rect x="550" y="144" width="22" height="116" fill="#FF2D7A" />
      </g>
    </svg>
  );
}
