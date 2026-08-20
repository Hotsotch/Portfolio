export const TRUNK_X = 12;

const PAPER = "#f9fcfa";

type WireComponent = "resistor" | "capacitor" | "switch";

type WireDividerProps = {
  /** Common circuit wire color, e.g. "#d92d20" (red), "#171717" (black). */
  color: string;
  /** Optional schematic symbol drawn inline on the straight run. */
  component?: WireComponent;
  /** Horizontal position of that symbol along the straight run, 0-100. */
  componentPosition?: number;
};

/** Fixed-size schematic symbol, drawn over its own paper-colored backing so
 *  it reads as a literal break in the wire rather than a decal on top of it. */
function ComponentSymbol({
  type,
  color,
}: {
  type: WireComponent;
  color: string;
}) {
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      className="block overflow-visible"
    >
      <rect x="-4" y="0" width="56" height="24" fill={PAPER} />
      {type === "resistor" ? (
        <path
          d="M0 12 L6 12 L9 4 L15 20 L21 4 L27 20 L33 4 L39 12 L48 12"
          {...common}
        />
      ) : null}
      {type === "capacitor" ? (
        <>
          <path d="M0 12 L20 12" {...common} />
          <path d="M28 12 L48 12" {...common} />
          <line x1="20" y1="3" x2="20" y2="21" {...common} />
          <line x1="28" y1="3" x2="28" y2="21" {...common} />
        </>
      ) : null}
      {type === "switch" ? (
        <>
          <path d="M0 12 L13 12" {...common} />
          <path d="M35 12 L48 12" {...common} />
          <line x1="15" y1="12" x2="33" y2="4" {...common} />
          <circle cx="14" cy="12" r="2.5" fill={color} />
          <circle cx="34" cy="12" r="2.5" fill={color} />
        </>
      ) : null}
    </svg>
  );
}

/**
 * Decorative section divider styled as a circuit wire — branches off the
 * vertical trunk running down the left edge of the page (see the trunk line
 * rendered alongside this in page.tsx) and runs across as the boundary
 * between sections. Purely decorative (aria-hidden).
 *
 * The curve is a fixed-size SVG (not stretched to viewport width) so its
 * bend always meets the trunk at the same x position, `TRUNK_X`, on every
 * screen size — only the straight run after it stretches to fill the rest
 * of the width.
 */
export default function WireDivider({
  color,
  component,
  componentPosition = 50,
}: WireDividerProps) {
  return (
    <div aria-hidden="true" className="flex h-8 w-full items-center">
      <svg
        width="120"
        height="32"
        viewBox="0 0 120 32"
        className="block shrink-0 overflow-visible"
      >
        <path
          d={`M ${TRUNK_X} 32 C ${TRUNK_X + 20} 32, ${TRUNK_X + 40} 16, ${TRUNK_X + 80} 16 L 120 16`}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx={TRUNK_X} cy="32" r="3.5" fill={color} />
      </svg>

      <div className="relative h-full flex-1">
        <div
          className="absolute left-0 right-0 top-1/2 h-[2.5px] -translate-y-1/2"
          style={{ backgroundColor: color }}
        />
        {component ? (
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${componentPosition}%` }}
          >
            <ComponentSymbol type={component} color={color} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
