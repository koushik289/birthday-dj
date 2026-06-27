import { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  active?: boolean;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-brutal-yellow hover:bg-[#ffd93d]",
  secondary: "bg-brutal-surface hover:bg-brutal-bg",
  danger: "bg-brutal-red text-white hover:bg-[#ff5252]",
  ghost: "bg-transparent hover:bg-brutal-bg brutal-shadow-none border-0 shadow-none hover:underline",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const BrutalButton: FC<Props> = ({
  variant = "primary",
  size = "md",
  active = false,
  className = "",
  type = "button",
  children,
  ...props
}) => {
  const isGhost = variant === "ghost";

  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide",
        "brutal-press cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
        !isGhost && "brutal-border brutal-shadow",
        active && !isGhost && "brutal-press-active",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
