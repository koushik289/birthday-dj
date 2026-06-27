import { type FC, useEffect, useState } from "react";
import type { Birthday, BirthdayFormData, Relationship } from "../types/birthday";
import { RELATIONSHIP_LABELS, RELATIONSHIP_COLORS, MONTHS } from "../types/birthday";
import { daysInMonth, isValidBirthdayDate } from "../lib/dates";
import { BrutalButton } from "./ui/BrutalButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BirthdayFormData) => void;
  initial?: Birthday;
  defaultMonth?: number;
}

const RELATIONSHIPS: Relationship[] = ["family", "friend", "colleague", "other"];

const emptyForm = (month: number): BirthdayFormData => ({
  name: "",
  month,
  day: 1,
  relationship: "friend",
  notes: "",
});

const inputClass =
  "brutal-input w-full px-4 py-3 font-medium placeholder:text-black/40";

export const BirthdayModal: FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initial,
  defaultMonth = new Date().getMonth() + 1,
}) => {
  const [form, setForm] = useState<BirthdayFormData>(emptyForm(defaultMonth));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(
        initial
          ? {
              name: initial.name,
              month: initial.month,
              day: initial.day,
              year: initial.year,
              relationship: initial.relationship,
              notes: initial.notes ?? "",
            }
          : emptyForm(defaultMonth),
      );
      setError(null);
    }
  }, [isOpen, initial, defaultMonth]);

  if (!isOpen) return null;

  const maxDay = daysInMonth(form.month);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = form.name.trim();
    if (!trimmed) {
      setError("Name is required.");
      return;
    }
    if (!isValidBirthdayDate(form.month, form.day)) {
      setError("Please enter a valid date.");
      return;
    }
    onSubmit({
      ...form,
      name: trimmed,
      notes: form.notes?.trim() || undefined,
      year: form.year || undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="birthday-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brutal-black/40 brutal-dot-grid"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md brutal-border brutal-shadow-lg bg-brutal-surface p-6"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id="birthday-modal-title" className="text-left text-xl font-black uppercase">
            {initial ? "Edit Birthday" : "Add Birthday"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="brutal-border brutal-shadow-sm bg-brutal-red px-2 py-1 text-sm font-black text-white brutal-press"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-left font-mono text-xs font-bold uppercase">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
              placeholder="Their name"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="month" className="mb-2 block text-left font-mono text-xs font-bold uppercase">
                Month
              </label>
              <select
                id="month"
                value={form.month}
                onChange={(e) => {
                  const month = Number(e.target.value);
                  setForm({
                    ...form,
                    month,
                    day: Math.min(form.day, daysInMonth(month)),
                  });
                }}
                className={inputClass}
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="day" className="mb-2 block text-left font-mono text-xs font-bold uppercase">
                Day
              </label>
              <select
                id="day"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
                className={inputClass}
              >
                {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="mb-2 block text-left font-mono text-xs font-bold uppercase">
                Year
              </label>
              <input
                id="year"
                type="number"
                min={1900}
                max={new Date().getFullYear()}
                value={form.year ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    year: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                className={inputClass}
                placeholder="Opt."
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-left font-mono text-xs font-bold uppercase">
              Relationship
            </span>
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIPS.map((rel) => (
                <label
                  key={rel}
                  className={[
                    "cursor-pointer brutal-border brutal-press px-3 py-2 font-mono text-xs font-bold uppercase",
                    form.relationship === rel
                      ? "brutal-press-active ring-2 ring-brutal-black ring-offset-1"
                      : "brutal-shadow-sm bg-brutal-surface",
                  ].join(" ")}
                  style={
                    form.relationship === rel
                      ? { backgroundColor: RELATIONSHIP_COLORS[rel] }
                      : undefined
                  }
                >
                  <input
                    type="radio"
                    name="relationship"
                    value={rel}
                    checked={form.relationship === rel}
                    onChange={() => setForm({ ...form, relationship: rel })}
                    className="sr-only"
                  />
                  {RELATIONSHIP_LABELS[rel]}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block text-left font-mono text-xs font-bold uppercase">
              Notes
            </label>
            <textarea
              id="notes"
              value={form.notes ?? ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Gift ideas, reminders..."
            />
          </div>

          {error && (
            <p role="alert" className="brutal-border bg-brutal-red px-3 py-2 text-left text-sm font-bold text-white">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <BrutalButton variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </BrutalButton>
          <BrutalButton type="submit" variant="primary" className="flex-1">
            {initial ? "Save" : "Add"}
          </BrutalButton>
        </div>
      </form>
    </div>
  );
};
