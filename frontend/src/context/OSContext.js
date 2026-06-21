import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authApi } from "../lib/api";

const OSContext = createContext(null);

const LS_WINDOWS = "omniverse_windows";
const LS_NOTIFS = "omniverse_notifs";

export const OSProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [windows, setWindows] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_WINDOWS) || "[]"); } catch { return []; }
  });
  const [activeId, setActiveId] = useState(null);
  const [zCounter, setZCounter] = useState(100);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_NOTIFS) || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(LS_WINDOWS, JSON.stringify(windows.map(w => ({ id: w.id, app: w.app, x: w.x, y: w.y, w: w.w, h: w.h }))));
  }, [windows]);
  useEffect(() => {
    localStorage.setItem(LS_NOTIFS, JSON.stringify(notifications.slice(0, 30)));
  }, [notifications]);

  useEffect(() => {
    const token = localStorage.getItem("omniverse_token");
    if (!token) { setLoading(false); return; }
    authApi.me().then(setUser).catch(() => {
      localStorage.removeItem("omniverse_token");
    }).finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user } = await authApi.login({ email, password });
    localStorage.setItem("omniverse_token", token);
    setUser(user);
    return user;
  }, []);

  const signup = useCallback(async (email, password, name) => {
    const { token, user } = await authApi.signup({ email, password, name });
    localStorage.setItem("omniverse_token", token);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("omniverse_token");
    setUser(null);
    setWindows([]);
  }, []);

  const openApp = useCallback((appId) => {
    let newZ = 0;
    setZCounter((z) => { newZ = z + 1; return newZ; });
    setWindows((prev) => {
      const existing = prev.find((w) => w.app === appId);
      if (existing) {
        setActiveId(existing.id);
        return prev.map((w) => w.id === existing.id ? { ...w, z: newZ, minimized: false } : w);
      }
      const id = `${appId}-${Date.now()}`;
      setActiveId(id);
      const win = {
        id,
        app: appId,
        x: 80 + (prev.length * 30) % 200,
        y: 80 + (prev.length * 25) % 150,
        w: 920,
        h: 600,
        z: newZ,
        minimized: false,
        maximized: false,
      };
      return [...prev, win];
    });
  }, []);

  const closeWindow = useCallback((id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id) => {
    let newZ = 0;
    setZCounter((z) => { newZ = z + 1; return newZ; });
    setActiveId(id);
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, z: newZ, minimized: false } : w));
  }, []);

  const updateWindow = useCallback((id, patch) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, ...patch } : w));
  }, []);

  const toggleMaximize = useCallback((id) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, maximized: !w.maximized } : w));
  }, []);

  const minimize = useCallback((id) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, minimized: true } : w));
  }, []);

  const pushNotification = useCallback((title, message, type = "info") => {
    const n = { id: `n-${Date.now()}`, title, message, type, time: new Date().toISOString() };
    setNotifications((prev) => [n, ...prev].slice(0, 50));
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  return (
    <OSContext.Provider value={{
      user, loading, login, signup, logout,
      windows, activeId, openApp, closeWindow, focusWindow, updateWindow, toggleMaximize, minimize,
      paletteOpen, setPaletteOpen,
      notifOpen, setNotifOpen, notifications, pushNotification, clearNotifications,
    }}>
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => useContext(OSContext);
