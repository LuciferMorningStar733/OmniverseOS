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

      // Dynamically calculate boundaries to guarantee no off-screen clipping
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(920, vw * 0.85); 
      const h = Math.min(600, vh * 0.8);

      // True center calculation + stacking offset
      const cascadeOffset = (prev.length * 30) % 120;
      const x = Math.max(0, (vw - w) / 2) + cascadeOffset;
      const y = Math.max(0, (vh - h) / 2) + cascadeOffset;

      const win = {
        id,
        app: appId,
        x,
        y,
        w,
        h,
        z: newZ,
        minimized: false,
        maximized: false,
      };
      
      return [...prev, win];
    });
  }, []);