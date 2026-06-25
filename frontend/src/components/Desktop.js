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
  const { windows, openApp, setPaletteOpen, user, wallpaper } = useOS();
  const wp = getWallpaper(wallpaper);

  useEffect(() => {
    if (windows.length === 0) {
      openApp("dashboard");
    }
  }, [openApp, windows.length]);

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
      <AnimatePresence mode="wait">
        <motion.div
          key={wp.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`wp-base ${wp.className}`}
        />
      </AnimatePresence>
      <div className="wp-particles" />
      <div className="wp-brand"><span>OMNI</span>VERSE<span>OS</span></div>
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />

      <TopBar />

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
