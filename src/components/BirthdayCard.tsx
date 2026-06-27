import { type FC } from "react";
import type { Birthday } from "../types/birthday";
import { RELATIONSHIP_LABELS, MONTH_COLORS } from "../types/birthday";
import {
  daysUntilBirthday,
  formatBirthdayDate,
  isBirthdayToday,
  turningAge,
} from "../lib/dates";

interface Props {
  birthday: Birthday;
  onEdit: (birthday: Birthday) => void;
  onDelete: (id: string) => void;
  clubMode?: boolean;
}

export const BirthdayCard: FC<Props> = ({ birthday, onEdit, onDelete, clubMode = false }) => {
  const color = MONTH_COLORS[birthday.month - 1];
  const daysUntil = daysUntilBirthday(birthday);
  const isToday = isBirthdayToday(birthday);
  const age = turningAge(birthday);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isToday && clubMode
          ? "animate-pulse-glow border-[#ff006e] shadow-[0_0_40px_rgba(255,0,110,0.3)]"
          : "border-white/8 hover:border-white/15"
      }`}
      style={{
        background: isToday
          ? `linear-gradient(135deg, ${color.glow}, rgba(12,12,20,0.95))`
          : "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(12,12,20,0.9))",
      }}
    >
      {isToday && (
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${color.accent}, transparent)` }}
          aria-hidden="true"
        />
      )}

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 text-left">
            <h3 className="truncate text-lg font-semibold text-white">{birthday.name}</h3>
            <p className="font-mono text-sm text-white/50">{formatBirthdayDate(birthday)}</p>
          </div>

          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold"
            style={{
              background: `${color.accent}18`,
              color: color.accent,
              boxShadow: `0 0 16px ${color.glow}`,
            }}
          >
            {birthday.day}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
            style={{ background: `${color.accent}15`, color: color.accent }}
          >
            {RELATIONSHIP_LABELS[birthday.relationship]}
          </span>

          {isToday ? (
            <span className="rounded-full bg-[#ff006e]/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#ff006e]">
              🎉 Today!
            </span>
          ) : daysUntil <= 7 ? (
            <span className="rounded-full bg-[#ffbe0b]/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#ffbe0b]">
              {daysUntil === 1 ? "Tomorrow" : `In ${daysUntil} days`}
            </span>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
              {daysUntil} days away
            </span>
          )}

          {age !== null && (
            <span className="font-mono text-[10px] text-white/30">
              Turning {age}
            </span>
          )}
        </div>

        {birthday.notes && (
          <p className="mb-4 text-left text-sm text-white/40 line-clamp-2">{birthday.notes}</p>
        )}

        <div className="flex gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(birthday)}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white/60 transition hover:border-white/20 hover:text-white"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(birthday.id)}
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20"
          >
            Drop
          </button>
        </div>
      </div>
    </article>
  );
};
