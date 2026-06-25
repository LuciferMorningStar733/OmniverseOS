import React, { useEffect } from "react";
import { useOS } from "../context/OSContext";
import Window from "./Window";
import Dock from "./Dock";
import TopBar from "./TopBar";
import CommandPalette from "./CommandPalette";
import NotificationCenter from "./NotificationCenter";
import { getApp } from "../lib/apps";
import { AnimatePresence, motion } from "framer-motion";
import { getWallpaper } from "../lib/wallpapers";

export default function Desktop() {
  const { windows, setPaletteOpen, wallpaper } = useOS();
  const wp = getWallpaper(wallpaper);
  // Note: we intentionally do NOT auto-open Dashboard. The desktop is the home.

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setPaletteOpen]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#05050A]" data-testid="desktop-root">
      {/* Wallpaper cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={wp.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`wp-base ${wp.className}`}
        >
          {/* Integrated branding — each wallpaper styles its own .wp-typo */}
          {wp.typo?.main && (
            <div className="wp-typo">
              {wp.typo.main}
              {wp.typo.line2 && <span>{wp.typo.line2}</span>}
            </div>
          )}
          {wp.typo?.sub && <div className="wp-typo-sub">{wp.typo.sub}</div>}
          {/* Decorative ambient layers per-wallpaper */}
          {wp.id === "quantum-horizon" && <div className="wp-fog" />}
          {(wp.id === "neural-core" || wp.id === "ai-nexus") && <div className="wp-beams" />}
        </motion.div>
      </AnimatePresence>

      {/* Shared ambient particles + subtle scanline across all wallpapers */}
      <div className="wp-particles" />
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      {/* Top bar fades in slightly later */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
      >
        <TopBar />
      </motion.div>

      {/* Window layer */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <AnimatePresence>
          {windows.map((w) => {
            const app = getApp(w.app);
            if (!app) return null;
            return (
              <div key={w.id} className="pointer-events-auto">
                <Window win={w}>
                  <app.Component />
                </Window>
              </div>
            );
          })}
        </AnimatePresence>
      </div>

      <Dock />
      <CommandPalette />
      <NotificationCenter />
    </div>
  );
}
