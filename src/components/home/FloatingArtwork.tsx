import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

const ease = cubicBezier(0.33, 0.05, 0.3, 1);

/** Scroll ranges differ so the top pair leaves first, then the middle, then the bottom. */
const motionBySlot = {
  "left-top": { start: 0.02, end: 0.5, x: -460, y: -200, scale: 0.9 },
  "right-top": { start: 0.06, end: 0.54, x: 480, y: -180, scale: 0.88 },
  "left-middle": { start: 0.2, end: 0.72, x: -520, y: 24, scale: 0.93 },
  "right-middle": { start: 0.24, end: 0.76, x: 500, y: 16, scale: 0.94 },
  "left-bottom": { start: 0.4, end: 0.96, x: -440, y: 160, scale: 0.91 },
  "right-bottom": { start: 0.44, end: 1, x: 460, y: 180, scale: 0.9 },
} as const;

type Slot = keyof typeof motionBySlot;

export function FloatingArtwork({
  slot,
  src,
  alt,
  width,
  height,
  progress,
}: {
  slot: Slot;
  src: string;
  alt: string;
  width: number;
  height: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const spec = motionBySlot[slot];

  const x = useTransform(progress, (value) => (reducedRef.current ? 0 : spec.x * ranged(value, spec.start, spec.end)));
  const y = useTransform(progress, (value) => (reducedRef.current ? 0 : spec.y * ranged(value, spec.start, spec.end)));
  const scale = useTransform(progress, (value) =>
    reducedRef.current ? 1 : 1 + (spec.scale - 1) * ranged(value, spec.start, spec.end),
  );

  return (
    <motion.img
      className={`hero__float hero__float--${slot}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{ x, y, scale }}
    />
  );
}

function ranged(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  return ease(Math.min(1, Math.max(0, (value - start) / (end - start))));
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i += 1) {
      const slope = sampleDX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= (sampleX(t) - x) / slope;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
}
