import React from "react";
import { motion } from "framer-motion";
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
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="mono-label">// Wallpaper</div>
            <h3 className="font-heading text-base font-bold">Desktop background</h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{WALLPAPERS.length} scenes</span>
        </div>

        <div className="grid grid-cols-2 gap-3" data-testid="wallpaper-grid">
          {WALLPAPERS.map((w) => {
            const active = wallpaper === w.id;
            return (
              <motion.button
                key={w.id}
                data-testid={`wallpaper-${w.id}`}
                onClick={() => setWallpaper(w.id)}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className={`relative rounded-xl overflow-hidden text-left border transition-colors ${
                  active
                    ? "border-[#00F0FF] shadow-[0_0_0_3px_rgba(0,240,255,0.18),0_18px_40px_rgba(0,0,0,0.5)]"
                    : "border-white/10 hover:border-white/30"
                }`}
                style={{ aspectRatio: "16 / 10" }}
              >
                {/* Live miniature of the wallpaper */}
                <div className={`absolute inset-0 ${w.className}`}>
                  <div
                    className="wp-typo"
                    style={{
                      fontSize: "clamp(18px, 3vw, 32px)",
                      WebkitTextStroke: "0.7px rgba(0,240,255,0.5)",
                      textShadow: "0 0 10px rgba(0,240,255,0.25)",
                    }}
                  >
                    {w.typo.main}
                    {w.typo.line2 && (
                      <span style={{ WebkitTextStroke: "0.7px rgba(255,0,60,0.65)" }}>{w.typo.line2}</span>
                    )}
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/90 via-black/55 to-transparent">
                  <div className="text-xs font-semibold text-white">{w.name}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{w.id}</div>
                </div>

                {active && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 18 }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#00F0FF] text-black flex items-center justify-center text-[11px] shadow-[0_0_14px_rgba(0,240,255,0.7)]"
                  >
                    <i className="fa-solid fa-check"></i>
                  </motion.div>
                )}
              </motion.button>
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
          ["Build", "OmniverseOS v1.2.0"],
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
