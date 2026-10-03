import { useEffect, useRef } from "react";
import { earthToHepta, type HeptaConfig, type HeptaInstant } from "@/lib/hepta/engine";
import { usePrefersReducedMotion } from "@/lib/hepta/use-now";
import { cn } from "@/lib/utils";

type Props = {
  config: HeptaConfig;
  className?: string;
};

function r(n: number): number {
  return Math.round(n * 100) / 100;
}

const CX = 200;
const CY = 200;

function hourAngle(h: HeptaInstant): number {
  const displayIndex = h.hour === 0 ? 24 : h.hour - 1;
  const hours = displayIndex + h.minute / 60 + (h.second + h.subsecond) / 3600;
  return (hours / 25) * 360;
}

function minuteAngle(h: HeptaInstant): number {
  return ((h.minute + (h.second + h.subsecond) / 60) / 60) * 360;
}

function secondAngle(h: HeptaInstant, sweep: boolean): number {
  const s = sweep ? h.second + h.subsecond : h.second;
  return (s / 60) * 360;
}

export function AnalogDial({ config, className }: Props) {
  const hourRef = useRef<SVGGElement>(null);
  const minuteRef = useRef<SVGGElement>(null);
  const secondRef = useRef<SVGGElement>(null);
  const labelRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();
  const { mode, epochMs, epochClockSeconds } = config;

  useEffect(() => {
    let raf = 0;
    const apply = (el: SVGGElement | null, deg: number) => {
      if (el) el.setAttribute("transform", `rotate(${deg} ${CX} ${CY})`);
    };
    const loop = () => {
      const h = earthToHepta(new Date(), { mode, epochMs, epochClockSeconds });
      apply(hourRef.current, hourAngle(h));
      apply(minuteRef.current, minuteAngle(h));
      apply(secondRef.current, secondAngle(h, !reduced));
      const svg = labelRef.current;
      if (svg) {
        const displayHour = h.hour === 0 ? 25 : h.hour;
        const t = `${String(displayHour).padStart(2, "0")}:${String(h.minute).padStart(2, "0")}:${String(h.second).padStart(2, "0")}`;
        svg.setAttribute("aria-label", `Montre 25 heures, ${t}`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode, epochMs, epochClockSeconds, reduced]);

  const hourMarks = Array.from({ length: 25 }, (_, i) => i);
  const minuteMarks = Array.from({ length: 60 }, (_, i) => i);
  const labeled = new Set(Array.from({ length: 25 }, (_, i) => i));

  return (
    <svg
      ref={labelRef}
      viewBox="0 0 400 400"
      className={cn("w-full h-auto select-none", className)}
      role="img"
      aria-label="Montre 25 heures"
    >
      <circle
        cx={CX}
        cy={CY}
        r="188"
        fill="var(--color-surface)"
        stroke="var(--color-border-strong)"
        strokeWidth="1"
      />
      <circle cx={CX} cy={CY} r="176" fill="none" stroke="var(--color-border)" strokeWidth="1" />

      {minuteMarks.map((i) => {
        const a = (i / 60) * 360;
        const rad = ((a - 90) * Math.PI) / 180;
        const inner = i % 5 === 0 ? 158 : 164;
        const outer = 170;
        return (
          <line
            key={`m-${i}`}
            x1={r(CX + Math.cos(rad) * inner)}
            y1={r(CY + Math.sin(rad) * inner)}
            x2={r(CX + Math.cos(rad) * outer)}
            y2={r(CY + Math.sin(rad) * outer)}
            stroke="var(--color-faint)"
            strokeWidth={i % 5 === 0 ? 1.4 : 0.7}
          />
        );
      })}

      {hourMarks.map((i) => {
        const a = (i / 25) * 360;
        const rad = ((a - 90) * Math.PI) / 180;
        const isMajor = labeled.has(i);
        const inner = isMajor ? 128 : 138;
        const outer = 152;
        const lx = r(CX + Math.cos(rad) * 114);
        const ly = r(CY + Math.sin(rad) * 114);
        return (
          <g key={`h-${i}`}>
            <line
              x1={r(CX + Math.cos(rad) * inner)}
              y1={r(CY + Math.sin(rad) * inner)}
              x2={r(CX + Math.cos(rad) * outer)}
              y2={r(CY + Math.sin(rad) * outer)}
              stroke="var(--color-fg)"
              strokeWidth={isMajor ? 2 : 1}
              strokeLinecap="round"
              opacity={isMajor ? 1 : 0.45}
            />
            {isMajor && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-fg)"
                fontFamily="var(--font-display)"
                fontSize={16}
                fontWeight={500}
              >
                {String(i === 0 ? 25 : i).padStart(2, "0")}
              </text>
            )}
          </g>
        );
      })}

      <text
        x={CX}
        y={248}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontFamily="var(--font-sans)"
        fontSize="9"
        letterSpacing="0.28em"
      >
        HEPTA
      </text>
      <text
        x={CX}
        y={262}
        textAnchor="middle"
        fill="var(--color-faint)"
        fontFamily="var(--font-sans)"
        fontSize="8"
        letterSpacing="0.22em"
      >
        25 H
      </text>

      <g ref={hourRef}>
        <line
          x1={CX}
          y1={CY + 14}
          x2={CX}
          y2={CY - 78}
          stroke="var(--color-fg)"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
      </g>
      <g ref={minuteRef}>
        <line
          x1={CX}
          y1={CY + 18}
          x2={CX}
          y2={CY - 118}
          stroke="var(--color-accent)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </g>
      <g ref={secondRef}>
        <line
          x1={CX}
          y1={CY + 28}
          x2={CX}
          y2={CY - 132}
          stroke="var(--color-muted)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>
      <circle cx={CX} cy={CY} r="5" fill="var(--color-fg)" />
      <circle cx={CX} cy={CY} r="2.2" fill="var(--color-bg)" />
    </svg>
  );
}
