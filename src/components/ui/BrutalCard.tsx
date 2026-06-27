import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  color?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const BrutalCard: FC<Props> = ({
  children,
  className = "",
  color,
  padding = "md",
}) => (
  <div
    className={[
      "brutal-border brutal-shadow bg-brutal-surface",
      paddingStyles[padding],
      className,
    ].join(" ")}
    style={color ? { backgroundColor: color } : undefined}
  >
    {children}
  </div>
);
