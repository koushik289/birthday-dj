import { type FC } from "react";

export const Header: FC = () => (
  <header className="brutal-border border-x-0 border-t-0 bg-brutal-yellow">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <div className="flex items-center gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center brutal-border brutal-shadow-sm bg-brutal-surface text-3xl"
          aria-hidden="true"
        >
          🎂
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
            Birthday Board
          </h1>
          <p className="font-mono text-xs font-medium uppercase tracking-widest">
            Track every celebration
          </p>
        </div>
      </div>

      <div className="hidden sm:block brutal-border brutal-shadow-sm bg-brutal-pink px-4 py-2 font-mono text-xs font-bold uppercase">
        {new Date().getFullYear()}
      </div>
    </div>
  </header>
);
