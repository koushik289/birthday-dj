import { type FC } from "react";
import { MONTH_SHORT, MONTH_COLORS } from "../types/birthday";
import { useBirthdayStore } from "../store/birthdayStore";

export const MonthPicker: FC = () => {
  const selectedMonth = useBirthdayStore((s) => s.selectedMonth);
  const setSelectedMonth = useBirthdayStore((s) => s.setSelectedMonth);
  const birthdays = useBirthdayStore((s) => s.birthdays);

  const counts = birthdays.reduce<Record<number, number>>((acc, b) => {
    acc[b.month] = (acc[b.month] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <section aria-label="Pick a month">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase">Months</h2>
        <span className="brutal-border brutal-shadow-sm bg-brutal-lime px-2 py-1 font-mono text-xs font-bold">
          12 tabs
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
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
              className={[
                "brutal-border brutal-press flex flex-col items-center gap-1 px-1 py-3 font-bold",
                isActive ? "brutal-press-active ring-2 ring-brutal-black ring-offset-2" : "brutal-shadow-sm hover:translate-x-px hover:translate-y-px",
              ].join(" ")}
              style={{ backgroundColor: color }}
            >
              <span className="text-xs uppercase sm:text-sm">{label}</span>
              <span className="flex h-6 w-6 items-center justify-center brutal-border bg-brutal-surface font-mono text-[10px]">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
