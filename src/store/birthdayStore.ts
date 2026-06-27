import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Birthday, BirthdayFormData } from "../types/birthday";

interface BirthdayState {
  birthdays: Birthday[];
  selectedMonth: number;
  addBirthday: (data: BirthdayFormData) => void;
  updateBirthday: (id: string, data: BirthdayFormData) => void;
  removeBirthday: (id: string) => void;
  setSelectedMonth: (month: number) => void;
}

const SAMPLE_BIRTHDAYS: Birthday[] = [
  { id: "1", name: "Mom", month: 3, day: 15, relationship: "family" },
  { id: "2", name: "Alex", month: 3, day: 22, year: 1995, relationship: "friend" },
  { id: "3", name: "Dad", month: 7, day: 4, relationship: "family" },
  { id: "4", name: "Jordan", month: 7, day: 18, relationship: "friend" },
  { id: "5", name: "Sarah", month: 12, day: 25, year: 1990, relationship: "colleague" },
];

function createId(): string {
  return crypto.randomUUID();
}

export const useBirthdayStore = create<BirthdayState>()(
  persist(
    (set) => ({
      birthdays: SAMPLE_BIRTHDAYS,
      selectedMonth: new Date().getMonth() + 1,

      addBirthday: (data) =>
        set((state) => ({
          birthdays: [...state.birthdays, { ...data, id: createId() }],
        })),

      updateBirthday: (id, data) =>
        set((state) => ({
          birthdays: state.birthdays.map((b) =>
            b.id === id ? { ...data, id } : b,
          ),
        })),

      removeBirthday: (id) =>
        set((state) => ({
          birthdays: state.birthdays.filter((b) => b.id !== id),
        })),

      setSelectedMonth: (month) => set({ selectedMonth: month }),
    }),
    {
      name: "birthday-board-storage",
      partialize: (state) => ({ birthdays: state.birthdays }),
    },
  ),
);
