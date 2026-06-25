import React from "react";
import { useOS } from "../context/OSContext";
import { WALLPAPERS } from "../lib/wallpapers";

export default function Settings() {
  const { user, logout, wallpaper, setWallpaper } = useOS();
  return (
    <div className="p-6 text-white overflow-y-auto h-full" data-testid="settings-app">
      <div className="mono-label">// Profile</div>
      <h2 className="font-heading text-2xl font-bold mb-5">Settings</h2>

      <div className="glass-light rounded-xl p-5 mb-3 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#FF003C] flex items-center justify-center text-2xl font-bold text-black">{user?.name?.[0]?.toUpperCase()}</div>
        <div>
          <div className="font-heading text-lg font-bold">{user?.name}</div>
          <div className="text-sm text-slate-400">{user?.email}</div>
          <div className="mono-label opacity-60 mt-1">Joined {new Date(user?.created_at).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="glass-light rounded-xl p-5 mb-3">
        <div className="mono-label mb-2">// Wallpaper</div>
        <h3 className="font-heading text-base font-bold mb-3">Desktop background</h3>
        <div className="grid grid-cols-3 gap-3" data-testid="wallpaper-grid">
          {WALLPAPERS.map((w) => {
            const active = wallpaper === w.id;
            return (
              <button
                key={w.id}
                data-testid={`wallpaper-${w.id}`}
                onClick={() => setWallpaper(w.id)}
                className={`group relative aspect-video rounded-lg overflow-hidden border transition ${active ? "border-[#00F0FF] ring-2 ring-[#00F0FF]/40" : "border-white/10 hover:border-white/30"}`}
              >
                <div className={`absolute inset-0 ${w.className}`} />
                <div className="absolute inset-x-0 bottom-0 px-2 py-1 bg-gradient-to-t from-black/85 to-transparent text-left">
                  <div className="text-[11px] font-medium truncate">{w.name}</div>
                </div>
                {active && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#00F0FF] text-black flex items-center justify-center text-[10px]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="glass-light rounded-xl p-5 space-y-3 mb-3">
        <div className="mono-label">// System</div>
        {[
          ["Theme", "Cyberpunk Dark"],
          ["AI Model", "Claude Sonnet 4.6"],
          ["Storage", "MongoDB"],
          ["Build", "OmniverseOS v1.1.0"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm py-1">
            <span className="text-slate-400">{k}</span>
            <span className="font-mono text-[#00F0FF]">{v}</span>
          </div>
        ))}
      </div>

      <button onClick={logout} className="neon-btn danger w-full">
        <i className="fa-solid fa-right-from-bracket mr-2"></i>Logout
      </button>
    </div>
  );
}
