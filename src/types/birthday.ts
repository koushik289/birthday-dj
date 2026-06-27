export type Relationship = "family" | "friend" | "colleague" | "other";

export interface Birthday {
  id: string;
  name: string;
  month: number;
  day: number;
  year?: number;
  relationship: Relationship;
  notes?: string;
}

export interface BirthdayFormData {
  name: string;
  month: number;
  day: number;
  year?: number;
  relationship: Relationship;
  notes?: string;
}

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  family: "Family",
  friend: "Friend",
  colleague: "Colleague",
  other: "Other",
};

export const RELATIONSHIP_COLORS: Record<Relationship, string> = {
  family: "#ff6b9d",
  friend: "#6bcbff",
  colleague: "#c77dff",
  other: "#95e06c",
};

/** Flat neo-brutalism palette — one accent per month */
export const MONTH_COLORS = [
  "#6bcbff",
  "#ff6b9d",
  "#95e06c",
  "#c77dff",
  "#ffe66d",
  "#ff9f43",
  "#ff6b6b",
  "#4ecdc4",
  "#c8f135",
  "#ff9f43",
  "#6bcbff",
  "#ff6b9d",
] as const;
