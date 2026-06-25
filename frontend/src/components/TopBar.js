import React, { useEffect, useState } from "react";
import { useOS } from "../context/OSContext";

export default function TopBar() {
  const { user, logout, setPaletteOpen, setNotifOpen, notifications } = useOS();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unread = notifications.length;

  return (
    <div
      className="absolute top-2 left-2 right-2 h-11 z-40 rounded-xl px-3 flex items-center"
      style={{
        background: "rgba(8, 10, 16, 0.55)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      data-testid="topbar"
    >
      {/* left cluster */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#00F0FF,#FF003C)" }}
        >
          <i className="fa-solid fa-infinity text-black text-xs" />
        </div>
        <span className="font-heading font-bold text-sm tracking-tight">OmniverseOS</span>
        <span className="mono-label opacity-50 hidden md:inline">
          // {time.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </span>
      </div>

      {/* center: premium search */}
      <button
        data-testid="open-command-palette"
        onClick={() => setPaletteOpen(true)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group flex items-center gap-3 px-4 py-1.5 rounded-full transition-all"
        style={{
          width: "min(420px, 40vw)",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <i className="fa-solid fa-magnifying-glass text-[#00F0FF] text-xs transition-all group-hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]" />
        <span className="text-xs text-slate-400 font-mono group-hover:text-slate-200 transition flex-1 text-left truncate">
          Search apps, files or ask AI…
        </span>
        <kbd className="px-1.5 py-0.5 text-[10px] bg-white/10 rounded font-mono text-slate-300">⌘K</kbd>
      </button>

      {/* right cluster */}
      <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
        <button
          data-testid="open-notifications"
          onClick={() => setNotifOpen(true)}
          className="relative w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition"
          title="Notifications"
        >
          <i className="fa-regular fa-bell text-slate-300 text-sm" />
          {unread > 0 && (
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: "#FF003C", boxShadow: "0 0 8px rgba(255,0,60,0.8)" }}
            />
          )}
        </button>

        <div className="font-mono text-xs tracking-wider text-white px-2 tabular-nums">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-white/10">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-black font-bold text-xs"
            style={{ background: "linear-gradient(135deg,#00F0FF,#FF003C)" }}
            title={user?.name}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <button
            data-testid="logout-btn"
            onClick={logout}
            className="text-xs text-slate-500 hover:text-[#FF003C] transition"
            title="Logout"
          >
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        </div>
      </div>
    </div>
  );
}
