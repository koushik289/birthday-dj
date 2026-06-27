import {
  differenceInDays,
  format,
  isLeapYear,
  isSameDay,
  setYear,
  startOfDay,
} from "date-fns";
import type { Birthday } from "../types/birthday";

export function daysInMonth(month: number, year = new Date().getFullYear()): number {
  return new Date(year, month, 0).getDate();
}

export function isValidBirthdayDate(month: number, day: number): boolean {
  if (month < 1 || month > 12 || day < 1) return false;
  return day <= daysInMonth(month);
}

export function nextBirthdayDate(birthday: Birthday, from = new Date()): Date {
  const today = startOfDay(from);
  let candidate = setYear(new Date(today.getFullYear(), birthday.month - 1, birthday.day), today.getFullYear());

  if (candidate < today) {
    candidate = setYear(candidate, today.getFullYear() + 1);
  }

  if (birthday.month === 2 && birthday.day === 29 && !isLeapYear(candidate.getFullYear())) {
    candidate = new Date(candidate.getFullYear(), 1, 28);
  }

  return candidate;
}

export function daysUntilBirthday(birthday: Birthday, from = new Date()): number {
  return differenceInDays(nextBirthdayDate(birthday, from), startOfDay(from));
}

export function isBirthdayToday(birthday: Birthday, from = new Date()): boolean {
  return isSameDay(nextBirthdayDate(birthday, from), startOfDay(from));
}

export function formatBirthdayDate(birthday: Birthday): string {
  const date = new Date(2000, birthday.month - 1, birthday.day);
  return format(date, "MMMM d");
}

export function turningAge(birthday: Birthday, from = new Date()): number | null {
  if (!birthday.year) return null;
  const next = nextBirthdayDate(birthday, from);
  return next.getFullYear() - birthday.year;
}

export function sortByUpcoming(a: Birthday, b: Birthday, from = new Date()): number {
  return daysUntilBirthday(a, from) - daysUntilBirthday(b, from);
}

export function sortByDayOfMonth(a: Birthday, b: Birthday): number {
  return a.day - b.day;
}
