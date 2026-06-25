// Wallpaper registry — id used in localStorage; class is applied on the wp-base layer.
export const WALLPAPERS = [
  { id: "neural-grid",  name: "Cyan Neural Grid",   className: "wp-neural-grid",   accent: "#00F0FF" },
  { id: "crimson-aurora", name: "Crimson Aurora",   className: "wp-crimson-aurora", accent: "#FF003C" },
  { id: "skyline",      name: "Cyberpunk Skyline",  className: "wp-skyline",        accent: "#00F0FF" },
  { id: "circuit",      name: "AI Circuit Core",    className: "wp-circuit",        accent: "#00F0FF" },
  { id: "glass-waves",  name: "Dark Glass Waves",   className: "wp-glass-waves",    accent: "#00F0FF" },
  { id: "hex",          name: "Futuristic Hex",     className: "wp-hex",            accent: "#00F0FF" },
  { id: "neural-flow",  name: "Abstract Neural Flow", className: "wp-neural-flow",  accent: "#00F0FF" },
];

export const DEFAULT_WALLPAPER = "neural-grid";

export const getWallpaper = (id) =>
  WALLPAPERS.find((w) => w.id === id) || WALLPAPERS[0];
