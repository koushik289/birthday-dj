import { type FC } from "react";
import { MONTHS, MONTH_COLORS } from "../types/birthday";

interface Props {
  month: number;
  count: number;
}

export const VinylDisplay: FC<Props> = ({ month, count }) => {
  const color = MONTH_COLORS[month - 1];

  return (
    <div className="relative flex flex-col items-center" aria-hidden="true">
      <div
        className="relative h-36 w-36 rounded-full sm:h-44 sm:w-44"
        style={{
          background: `conic-gradient(from 0deg, ${color.accent}22, #0a0a12, ${color.accent}44, #0a0a12, ${color.accent}22)`,
          boxShadow: `0 0 60px ${color.glow}, inset 0 0 30px rgba(0,0,0,0.8)`,
        }}
      >
        <div className="animate-spin-slow absolute inset-2 rounded-full border border-white/5 bg-[#0a0a12]">
          <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-8 rounded-full border border-white/5" />
          <div className="absolute inset-12 rounded-full border border-white/5" />
          <div
            className="absolute inset-[38%] rounded-full"
            style={{ background: color.accent, boxShadow: `0 0 20px ${color.glow}` }}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p
          className="font-mono text-sm font-bold uppercase tracking-[0.3em]"
          style={{ color: color.accent }}
        >
          {MONTHS[month - 1]}
        </p>
        <p className="mt-1 font-mono text-xs text-white/30">
          {count} track{count !== 1 ? "s" : ""} on deck
        </p>
      </div>
    </div>
  );
};
