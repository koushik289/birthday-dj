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
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  family: "Family",
  friend: "Friend",
  colleague: "Colleague",
  other: "Other",
};

export const MONTH_COLORS = [
  { accent: "#ff006e", glow: "rgba(255, 0, 110, 0.4)" },
  { accent: "#fb5607", glow: "rgba(251, 86, 7, 0.4)" },
  { accent: "#ffbe0b", glow: "rgba(255, 190, 11, 0.4)" },
  { accent: "#06ffa5", glow: "rgba(6, 255, 165, 0.4)" },
  { accent: "#00f5ff", glow: "rgba(0, 245, 255, 0.4)" },
  { accent: "#8338ec", glow: "rgba(131, 56, 236, 0.4)" },
  { accent: "#3a86ff", glow: "rgba(58, 134, 255, 0.4)" },
  { accent: "#ff006e", glow: "rgba(255, 0, 110, 0.4)" },
  { accent: "#06ffa5", glow: "rgba(6, 255, 165, 0.4)" },
  { accent: "#fb5607", glow: "rgba(251, 86, 7, 0.4)" },
  { accent: "#8338ec", glow: "rgba(131, 56, 236, 0.4)" },
  { accent: "#00f5ff", glow: "rgba(0, 245, 255, 0.4)" },
] as const;
