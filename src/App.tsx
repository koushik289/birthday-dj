import { useMemo, useState } from "react";
import type { Birthday } from "./types/birthday";
import { MONTHS } from "./types/birthday";
import { sortByDayOfMonth } from "./lib/dates";
import { useBirthdayStore } from "./store/birthdayStore";
import { Header } from "./components/Header";
import { MonthMixer } from "./components/MonthMixer";
import { BirthdayCard } from "./components/BirthdayCard";
import { BirthdayModal } from "./components/BirthdayModal";
import { UpcomingQueue } from "./components/UpcomingQueue";
import { VinylDisplay } from "./components/VinylDisplay";

function App() {
  const birthdays = useBirthdayStore((s) => s.birthdays);
  const selectedMonth = useBirthdayStore((s) => s.selectedMonth);
  const clubMode = useBirthdayStore((s) => s.clubMode);
  const addBirthday = useBirthdayStore((s) => s.addBirthday);
  const updateBirthday = useBirthdayStore((s) => s.updateBirthday);
  const removeBirthday = useBirthdayStore((s) => s.removeBirthday);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Birthday | undefined>();

  const monthBirthdays = useMemo(
    () =>
      birthdays
        .filter((b) => b.month === selectedMonth)
        .sort(sortByDayOfMonth),
    [birthdays, selectedMonth],
  );

  const openAdd = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const openEdit = (birthday: Birthday) => {
    setEditing(birthday);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditing(undefined);
  };

  return (
    <div
      className={`relative min-h-svh ${clubMode ? "club-mode" : ""}`}
      style={{
        background: clubMode
          ? "radial-gradient(ellipse at top, rgba(255,0,110,0.08) 0%, #07070d 50%), radial-gradient(ellipse at bottom right, rgba(131,56,236,0.06) 0%, transparent 50%), #07070d"
          : "radial-gradient(ellipse at top, rgba(131,56,236,0.06) 0%, #07070d 40%), #07070d",
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <Header />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm sm:p-6">
            <MonthMixer />
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm sm:p-6">
            <UpcomingQueue birthdays={birthdays} clubMode={clubMode} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
          <div className="hidden lg:flex lg:items-start lg:justify-center lg:pt-8">
            <VinylDisplay month={selectedMonth} count={monthBirthdays.length} />
          </div>

          <section aria-labelledby="month-heading">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div className="text-left">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
                  Active Channel
                </p>
                <h2 id="month-heading" className="text-2xl font-bold text-white sm:text-3xl">
                  {MONTHS[selectedMonth - 1]}
                </h2>
                <p className="mt-1 font-mono text-sm text-white/40">
                  {monthBirthdays.length} birthday{monthBirthdays.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff006e] to-[#8338ec] px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,0,110,0.25)] transition hover:shadow-[0_0_40px_rgba(255,0,110,0.4)]"
              >
                <span className="text-lg leading-none">+</span>
                Drop Birthday
              </button>
            </div>

            {monthBirthdays.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 text-center">
                <p className="mb-2 text-4xl" aria-hidden="true">
                  🎧
                </p>
                <p className="text-lg font-medium text-white/60">No tracks on this channel</p>
                <p className="mt-1 max-w-sm text-sm text-white/30">
                  Add birthdays for {MONTHS[selectedMonth - 1]} to keep the mix going.
                </p>
                <button
                  type="button"
                  onClick={openAdd}
                  className="mt-6 rounded-xl border border-white/10 px-6 py-2.5 font-mono text-xs uppercase tracking-wider text-white/60 transition hover:border-[#8338ec]/50 hover:text-white"
                >
                  Add first birthday
                </button>
              </div>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {monthBirthdays.map((birthday) => (
                  <li key={birthday.id}>
                    <BirthdayCard
                      birthday={birthday}
                      clubMode={clubMode}
                      onEdit={openEdit}
                      onDelete={removeBirthday}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center">
        <p className="font-mono text-xs text-white/20">
          Birthday DJ · Your personal celebration deck
        </p>
      </footer>

      <BirthdayModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={editing ? (data) => updateBirthday(editing.id, data) : addBirthday}
        initial={editing}
        defaultMonth={selectedMonth}
      />
    </div>
  );
}

export default App;
