import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "../context/OSContext";
import { APPS } from "../lib/apps";

export default function Dock() {
  const { openApp, windows, activeId } = useOS();
  const [hoverId, setHoverId] = useState(null);

  // Magnification: nearest hovered icon = 1.0, neighbors taper down by index distance.
  const sizeFor = (id, index) => {
    if (!hoverId) return 1;
    const hoverIndex = APPS.findIndex((a) => a.id === hoverId);
    const d = Math.abs(index - hoverIndex);
    if (d === 0) return 1.35;
    if (d === 1) return 1.18;
    if (d === 2) return 1.06;
    return 1;
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, type: "spring", damping: 22, stiffness: 220 }}
      className="absolute left-0 right-0 bottom-4 z-40 flex justify-center pointer-events-none"
      data-testid="dock-root"
    >
      <div
        className="pointer-events-auto flex items-end gap-1.5 px-3 py-2 rounded-2xl"
        style={{
          background: "rgba(8, 10, 16, 0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,240,255,0.04)",
        }}
        onMouseLeave={() => setHoverId(null)}
      >
        {APPS.map((app, i) => {
          const open = windows.some((w) => w.app === app.id);
          const isActive = open && windows.find((w) => w.app === app.id)?.id === activeId;
          const scale = sizeFor(app.id, i);
          return (
            <motion.button
              key={app.id}
              data-testid={`dock-item-${app.id}`}
              onMouseEnter={() => setHoverId(app.id)}
              onClick={() => openApp(app.id)}
              animate={{ scale }}
              whileTap={{ scale: scale * 0.88 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, mass: 0.4 }}
              className="group relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
              style={{
                background: isActive ? "rgba(0,240,255,0.10)" : "transparent",
                transformOrigin: "bottom center",
              }}
              title={app.name}
            >
              <i className={`fa-solid ${app.icon} text-base`} style={{ color: app.color }} />
              {/* running indicator — crimson dot only when active, cyan when open but inactive */}
              {open && (
                <span
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full"
                  style={{
                    width: isActive ? 6 : 4,
                    height: isActive ? 6 : 4,
                    background: isActive ? "#FF003C" : "#00F0FF",
                    boxShadow: isActive
                      ? "0 0 10px rgba(255,0,60,0.7)"
                      : "0 0 8px rgba(0,240,255,0.5)",
                  }}
                />
              )}
              {/* tooltip */}
              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-black/90 border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap text-white">
                {app.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
