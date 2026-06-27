import { type FC } from "react";
import { MONTH_SHORT, MONTH_COLORS } from "../types/birthday";
import { useBirthdayStore } from "../store/birthdayStore";

export const MonthMixer: FC = () => {
  const selectedMonth = useBirthdayStore((s) => s.selectedMonth);
  const setSelectedMonth = useBirthdayStore((s) => s.setSelectedMonth);
  const birthdays = useBirthdayStore((s) => s.birthdays);

  const counts = birthdays.reduce<Record<number, number>>((acc, b) => {
    acc[b.month] = (acc[b.month] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section aria-label="Month selector" className="relative">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
          Channel Mixer
        </h2>
        <span className="font-mono text-xs text-white/30">12 CH</span>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 sm:gap-1.5">
        {MONTH_SHORT.map((label, index) => {
          const month = index + 1;
          const isActive = selectedMonth === month;
          const count = counts[month] ?? 0;
          const color = MONTH_COLORS[index];

          return (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedMonth(month)}
              aria-pressed={isActive}
              aria-label={`${label}, ${count} birthdays`}
              className="group flex min-w-[52px] flex-col items-center gap-2 rounded-lg border px-1.5 py-3 transition-all duration-200 sm:min-w-[60px] sm:px-2"
              style={{
                borderColor: isActive ? color.accent : "rgba(255,255,255,0.06)",
                background: isActive ? `${color.glow}` : "rgba(255,255,255,0.02)",
                boxShadow: isActive ? `0 0 20px ${color.glow}` : "none",
              }}
            >
              <span
                className="font-mono text-[10px] font-bold tracking-wider transition-colors sm:text-xs"
                style={{ color: isActive ? color.accent : "rgba(255,255,255,0.35)" }}
              >
                {label}
              </span>

              <div className="relative flex h-16 w-3 items-end justify-center rounded-full bg-black/40 sm:h-20 sm:w-3.5">
                <div
                  className="w-full rounded-full transition-all duration-500"
                  style={{
                    height: count === 0 ? "8%" : `${Math.min(20 + count * 18, 100)}%`,
                    background: isActive
                      ? `linear-gradient(to top, ${color.accent}, ${color.accent}88)`
                      : count > 0
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(255,255,255,0.06)",
                    boxShadow: isActive ? `0 0 12px ${color.glow}` : "none",
                  }}
                />
              </div>

              <span
                className="flex h-5 w-5 items-center justify-center rounded-full font-mono text-[10px] font-bold"
                style={{
                  background: count > 0 ? `${color.accent}22` : "rgba(255,255,255,0.04)",
                  color: count > 0 ? color.accent : "rgba(255,255,255,0.2)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
