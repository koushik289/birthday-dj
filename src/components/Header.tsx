import { type FC } from "react";
import { useBirthdayStore } from "../store/birthdayStore";

export const Header: FC = () => {
  const clubMode = useBirthdayStore((s) => s.clubMode);
  const toggleClubMode = useBirthdayStore((s) => s.toggleClubMode);

  return (
    <header className="relative z-10 border-b border-white/5 bg-[#0c0c14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#ff006e]/20 to-[#8338ec]/20 text-2xl shadow-[0_0_30px_rgba(255,0,110,0.15)]"
            aria-hidden="true"
          >
            🎂
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              <span className="bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text text-transparent">
                Birthday DJ
              </span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
              Mix · Track · Celebrate
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleClubMode}
          aria-pressed={clubMode}
          className={`group relative overflow-hidden rounded-full border px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-widest transition-all duration-300 ${
            clubMode
              ? "border-[#ff006e] bg-[#ff006e]/20 text-[#ff006e] shadow-[0_0_30px_rgba(255,0,110,0.4)]"
              : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${clubMode ? "animate-pulse-glow bg-[#ff006e]" : "bg-white/30"}`} />
            Club Mode
          </span>
          {clubMode && (
            <span
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#ff006e]/10 via-[#8338ec]/10 to-[#00f5ff]/10"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </header>
  );
};
