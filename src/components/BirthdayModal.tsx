import { type FC, useEffect, useState } from "react";
import type { Birthday, BirthdayFormData, Relationship } from "../types/birthday";
import { RELATIONSHIP_LABELS, MONTHS } from "../types/birthday";
import { daysInMonth, isValidBirthdayDate } from "../lib/dates";

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
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="birthday-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-t-3xl border border-white/10 bg-[#12121c] p-6 shadow-[0_-20px_60px_rgba(0,0,0,0.5)] sm:rounded-3xl"
      >
        <h2 id="birthday-modal-title" className="mb-6 text-left text-xl font-bold text-white">
          {initial ? "Remix Entry" : "Drop a Birthday"}
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[#8338ec]/50 focus:ring-2 focus:ring-[#8338ec]/20"
              placeholder="Their name"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label htmlFor="month" className="mb-1.5 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-[#8338ec]/50"
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1} className="bg-[#12121c]">
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="day" className="mb-1.5 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
                Day
              </label>
              <select
                id="day"
                value={form.day}
                onChange={(e) => setForm({ ...form, day: Number(e.target.value) })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-[#8338ec]/50"
              >
                {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d} className="bg-[#12121c]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="mb-1.5 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
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
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white outline-none focus:border-[#8338ec]/50"
                placeholder="Opt."
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
              Relationship
            </span>
            <div className="flex flex-wrap gap-2">
              {RELATIONSHIPS.map((rel) => (
                <label
                  key={rel}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                    form.relationship === rel
                      ? "border-[#8338ec] bg-[#8338ec]/20 text-[#c084fc]"
                      : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"
                  }`}
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
            <label htmlFor="notes" className="mb-1.5 block text-left font-mono text-xs uppercase tracking-wider text-white/40">
              Notes
            </label>
            <textarea
              id="notes"
              value={form.notes ?? ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#8338ec]/50"
              placeholder="Gift ideas, reminders..."
            />
          </div>

          {error && (
            <p role="alert" className="text-left text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/10 py-3 font-mono text-xs uppercase tracking-wider text-white/60 transition hover:border-white/20"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#8338ec] py-3 font-mono text-xs font-medium uppercase tracking-wider text-white shadow-[0_0_30px_rgba(131,56,236,0.3)] transition hover:shadow-[0_0_40px_rgba(131,56,236,0.5)]"
          >
            {initial ? "Save Mix" : "Add to Deck"}
          </button>
        </div>
      </form>
    </div>
  );
};
