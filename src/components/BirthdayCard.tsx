import { type FC } from "react";
import type { Birthday } from "../types/birthday";
import { MONTH_COLORS, RELATIONSHIP_COLORS, RELATIONSHIP_LABELS } from "../types/birthday";
import {
  daysUntilBirthday,
  formatBirthdayDate,
  isBirthdayToday,
  turningAge,
} from "../lib/dates";
import { BrutalBadge } from "./ui/BrutalBadge";
import { BrutalButton } from "./ui/BrutalButton";

interface Props {
  birthday: Birthday;
  onEdit: (birthday: Birthday) => void;
  onDelete: (id: string) => void;
}

export const BirthdayCard: FC<Props> = ({ birthday, onEdit, onDelete }) => {
  const monthColor = MONTH_COLORS[birthday.month - 1];
  const relColor = RELATIONSHIP_COLORS[birthday.relationship];
  const daysUntil = daysUntilBirthday(birthday);
  const isToday = isBirthdayToday(birthday);
  const age = turningAge(birthday);

  return (
    <article
      className={[
        "group brutal-border brutal-shadow bg-brutal-surface transition-transform hover:-translate-y-0.5",
        isToday && "ring-4 ring-brutal-black ring-offset-2",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="h-3 brutal-border border-x-0 border-t-0"
        style={{ backgroundColor: monthColor }}
        aria-hidden="true"
      />

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 text-left">
            <h3 className="truncate text-lg font-black">{birthday.name}</h3>
            <p className="font-mono text-sm font-medium">{formatBirthdayDate(birthday)}</p>
          </div>

          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center brutal-border brutal-shadow-sm font-mono text-lg font-black"
            style={{ backgroundColor: monthColor }}
          >
            {birthday.day}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <BrutalBadge color={relColor}>{RELATIONSHIP_LABELS[birthday.relationship]}</BrutalBadge>

          {isToday ? (
            <BrutalBadge color="#ffe66d">Today!</BrutalBadge>
          ) : daysUntil <= 7 ? (
            <BrutalBadge color="#ff9f43">
              {daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`}
            </BrutalBadge>
          ) : (
            <span className="font-mono text-xs font-medium uppercase">{daysUntil}d away</span>
          )}

          {age !== null && (
            <span className="font-mono text-xs font-medium">Turning {age}</span>
          )}
        </div>

        {birthday.notes && (
          <p className="mb-4 border-l-4 border-brutal-black pl-3 text-left text-sm font-medium line-clamp-2">
            {birthday.notes}
          </p>
        )}

        <div className="flex gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
          <BrutalButton
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(birthday)}
          >
            Edit
          </BrutalButton>
          <BrutalButton variant="danger" size="sm" onClick={() => onDelete(birthday.id)}>
            Delete
          </BrutalButton>
        </div>
      </div>
    </article>
  );
};
