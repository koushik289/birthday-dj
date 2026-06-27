import { useMemo, useState } from "react";
import type { Birthday } from "./types/birthday";
import { MONTHS, MONTH_COLORS } from "./types/birthday";
import { sortByDayOfMonth } from "./lib/dates";
import { useBirthdayStore } from "./store/birthdayStore";
import { Header } from "./components/Header";
import { MonthPicker } from "./components/MonthPicker";
import { BirthdayCard } from "./components/BirthdayCard";
import { BirthdayModal } from "./components/BirthdayModal";
import { UpcomingList } from "./components/UpcomingList";
import { BrutalButton } from "./components/ui/BrutalButton";
import { BrutalCard } from "./components/ui/BrutalCard";

function App() {
  const birthdays = useBirthdayStore((s) => s.birthdays);
  const selectedMonth = useBirthdayStore((s) => s.selectedMonth);
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

  const monthColor = MONTH_COLORS[selectedMonth - 1];

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
    <div className="min-h-svh bg-brutal-bg">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <BrutalCard>
            <MonthPicker />
          </BrutalCard>

          <BrutalCard color="#ffe66d">
            <UpcomingList birthdays={birthdays} />
          </BrutalCard>
        </div>

        <section aria-labelledby="month-heading">
          <div
            className="mb-6 flex flex-wrap items-end justify-between gap-4 brutal-border brutal-shadow p-5 sm:p-6"
            style={{ backgroundColor: monthColor }}
          >
            <div className="text-left">
              <p className="font-mono text-xs font-bold uppercase tracking-widest">
                Selected month
              </p>
              <h2 id="month-heading" className="text-3xl font-black uppercase sm:text-4xl">
                {MONTHS[selectedMonth - 1]}
              </h2>
              <p className="mt-1 font-mono text-sm font-bold">
                {monthBirthdays.length} birthday{monthBirthdays.length !== 1 ? "s" : ""}
              </p>
            </div>

            <BrutalButton size="lg" onClick={openAdd}>
              + Add Birthday
            </BrutalButton>
          </div>

          {monthBirthdays.length === 0 ? (
            <BrutalCard padding="lg" className="text-center">
              <p className="mb-2 text-5xl" aria-hidden="true">
                📅
              </p>
              <p className="text-xl font-black uppercase">Nothing here yet</p>
              <p className="mx-auto mt-2 max-w-sm font-medium">
                Add birthdays for {MONTHS[selectedMonth - 1]} so you never forget to celebrate.
              </p>
              <BrutalButton className="mt-6" onClick={openAdd}>
                Add first birthday
              </BrutalButton>
            </BrutalCard>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {monthBirthdays.map((birthday) => (
                <li key={birthday.id}>
                  <BirthdayCard
                    birthday={birthday}
                    onEdit={openEdit}
                    onDelete={removeBirthday}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="mt-12 brutal-border border-x-0 border-b-0 bg-brutal-teal py-5 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-widest">
          Birthday Board · Never miss a celebration
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
