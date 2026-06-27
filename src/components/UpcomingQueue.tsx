import { type FC } from "react";
import type { Birthday } from "../types/birthday";
import { MONTH_COLORS } from "../types/birthday";
import {
  daysUntilBirthday,
  formatBirthdayDate,
  isBirthdayToday,
  sortByUpcoming,
} from "../lib/dates";

interface Props {
  birthdays: Birthday[];
  clubMode: boolean;
}

export const UpcomingQueue: FC<Props> = ({ birthdays, clubMode }) => {
  const upcoming = [...birthdays].sort(sortByUpcoming).slice(0, 5);
  const todayCount = birthdays.filter((b) => isBirthdayToday(b)).length;

  if (birthdays.length === 0) return null;

  return (
    <section aria-label="Upcoming birthdays" className="relative">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-end gap-0.5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-[#06ffa5]"
              style={{
                height: `${12 + (i % 3) * 8}px`,
                animation: clubMode ? `equalizer 0.${5 + i}s ease-in-out infinite` : "none",
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
        <div className="text-left">
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            Now Playing
          </h2>
          {todayCount > 0 && (
            <p className="text-sm font-medium text-[#ff006e]">
              {todayCount} celebration{todayCount > 1 ? "s" : ""} today 🎉
            </p>
          )}
        </div>
      </div>

      <ol className="space-y-2">
        {upcoming.map((birthday, index) => {
          const color = MONTH_COLORS[birthday.month - 1];
          const daysUntil = daysUntilBirthday(birthday);
          const isToday = isBirthdayToday(birthday);

          return (
            <li
              key={birthday.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                isToday
                  ? "border-[#ff006e]/40 bg-[#ff006e]/10"
                  : "border-white/5 bg-white/[0.02]"
              }`}
            >
              <span className="font-mono text-xs text-white/20">{String(index + 1).padStart(2, "0")}</span>

              <div
                className="h-8 w-1 rounded-full"
                style={{ background: color.accent, boxShadow: `0 0 8px ${color.glow}` }}
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-white">{birthday.name}</p>
                <p className="font-mono text-xs text-white/40">{formatBirthdayDate(birthday)}</p>
              </div>

              <span
                className="shrink-0 font-mono text-xs uppercase tracking-wider"
                style={{ color: isToday ? "#ff006e" : color.accent }}
              >
                {isToday ? "LIVE" : daysUntil === 1 ? "Tmrw" : `${daysUntil}d`}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
