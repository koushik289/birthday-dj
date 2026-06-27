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
}

export const UpcomingList: FC<Props> = ({ birthdays }) => {
  const upcoming = [...birthdays].sort(sortByUpcoming).slice(0, 5);
  const todayCount = birthdays.filter((b) => isBirthdayToday(b)).length;

  if (birthdays.length === 0) return null;

  return (
    <section aria-label="Upcoming birthdays">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase">Coming Up</h2>
        {todayCount > 0 && (
          <span className="brutal-border brutal-shadow-sm bg-brutal-yellow px-3 py-1 font-mono text-xs font-bold uppercase">
            {todayCount} today!
          </span>
        )}
      </div>

      <ol className="space-y-3">
        {upcoming.map((birthday, index) => {
          const color = MONTH_COLORS[birthday.month - 1];
          const daysUntil = daysUntilBirthday(birthday);
          const isToday = isBirthdayToday(birthday);

          return (
            <li
              key={birthday.id}
              className={[
                "flex items-center gap-3 brutal-border brutal-shadow-sm p-3",
                isToday ? "bg-brutal-yellow" : "bg-brutal-surface",
              ].join(" ")}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center brutal-border font-mono text-xs font-black"
                style={{ backgroundColor: color }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-black">{birthday.name}</p>
                <p className="font-mono text-xs font-medium">{formatBirthdayDate(birthday)}</p>
              </div>

              <span className="shrink-0 font-mono text-xs font-bold uppercase">
                {isToday ? "TODAY" : daysUntil === 1 ? "TMRW" : `${daysUntil}D`}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
