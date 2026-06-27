import { type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: string;
  className?: string;
}

export const BrutalBadge: FC<Props> = ({
  children,
  color = "var(--color-brutal-blue)",
  className = "",
}) => (
  <span
    className={[
      "inline-block border-2 border-brutal-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider brutal-shadow-sm",
      className,
    ].join(" ")}
    style={{ backgroundColor: color }}
  >
    {children}
  </span>
);
