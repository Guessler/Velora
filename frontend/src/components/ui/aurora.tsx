import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface AuroraProps extends ComponentProps<"div"> {
  /**
   * Up to five CSS colors for the curtains, repeated when there are fewer.
   * By default emerald, mint and teal; pass theme variables such as
   * `var(--primary)` to follow your theme.
   */
  colors?: string[];
  /**
   * Fades the aurora out from the top corner on the end side (top right,
   * top left on a right-to-left page); `false` fills the whole box.
   *
   * @default true
   */
  fade?: boolean;
  /**
   * How strongly the curtains show over the surface.
   *
   * @default "medium"
   */
  intensity?: "subtle" | "medium" | "strong";
  /**
   * How fast the curtains drift: 2 is twice as fast, 0.5 half as fast.
   *
   * @default 1
   */
  speed?: number;
}

/** The layer's opacity: paler on a light surface, brighter on a dark one. */
const INTENSITY = {
  medium: "opacity-60 dark:opacity-75",
  strong: "opacity-80 dark:opacity-95",
  subtle: "opacity-40 dark:opacity-50",
} as const;

/** The fade: a mask that keeps the top corner on the end side, top right or (RTL) top left. */
const FADE =
  "[mask-image:radial-gradient(ellipse_at_100%_0%,#000_10%,transparent_75%)] rtl:[mask-image:radial-gradient(ellipse_at_0%_0%,#000_10%,transparent_75%)]";

/**
 * The variables the props set, `colors` repeated to five; a prop left out
 * writes nothing, so the stylesheet's default (or yours) applies.
 */
const layerVars = (speed: number | undefined, colors: string[] = []) =>
  ({
    "--aurora-speed": speed === undefined ? undefined : String(speed),
    ...Object.fromEntries(
      colors.length === 0
        ? []
        : [1, 2, 3, 4, 5].map((n) => [
            `--aurora-color-${n}`,
            colors[(n - 1) % colors.length],
          ])
    ),
  }) as CSSProperties;

/**
 * Soft curtains of color that drift across the box, like the northern
 * lights, behind whatever you put inside it. Two layers of color bands,
 * tilted, slide past each other in opposite directions (the
 * `aurora-veil` keyframes), each by exactly one stripe, so the loop never
 * jumps; they move with `translate` only, so the browser never repaints
 * them, and there's no blur filter. A faint wash under them fills the
 * gaps. With reduced motion the curtains stand still.
 *
 * @cssvar --aurora-color-1 The first curtain color (emerald).
 * @cssvar --aurora-color-2 The second curtain color (bright emerald).
 * @cssvar --aurora-color-3 The third curtain color (mint), the brightest.
 * @cssvar --aurora-color-4 The fourth curtain color (light teal).
 * @cssvar --aurora-color-5 The fifth curtain color (teal).
 * @cssvar --aurora-speed The drift's speed, a multiplier (`1`).
 */
export const Aurora = (props: AuroraProps) => {
  const {
    colors,
    fade = true,
    intensity = "medium",
    speed,
    className,
    children,
    ...rest
  } = props;
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-background",
        className
      )}
      data-slot="aurora"
      {...rest}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 [container-type:size] [content-visibility:auto]",
          INTENSITY[intensity],
          fade && FADE
        )}
        data-slot="aurora-layer"
        style={layerVars(speed, colors)}
      >
        {/*
          Stripes stay vertical inside a skewed box, so the period is exact;
          11cqh each side covers the corners the 12° skew pulls in.
        */}
        <div className="aurora-wash absolute -inset-x-[11cqh] inset-y-0 -skew-x-12">
          {/* Each band is one stripe wider than the box and slides by one stripe. */}
          <div className="aurora-band-a absolute inset-y-0 left-0 w-[125%] animate-aurora-veil bg-size-[20%_100%] [--aurora-veil-shift:-20%] [--aurora-veil-time:10s] motion-reduce:[animation-play-state:paused]" />
          <div className="aurora-band-b absolute inset-y-0 -left-[20%] w-[120%] animate-aurora-veil bg-size-[16.6667%_100%] [--aurora-veil-shift:16.6667%] [--aurora-veil-time:17s] motion-reduce:[animation-play-state:paused]" />
        </div>
      </div>
      {children}
    </div>
  );
};
