import React, { useState } from "react";

const BOOKMARKS = [
  { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Cyberpunk" },
  { name: "MDN", url: "https://developer.mozilla.org" },
  { name: "Hacker News", url: "https://news.ycombinator.com" },
  { name: "GitHub", url: "https://github.com/trending" },
];

export default function Browser() {
  const [tabs, setTabs] = useState([{ id: 1, url: "https://en.wikipedia.org/wiki/Cyberpunk", title: "Cyberpunk" }]);
  const [active, setActive] = useState(1);
  const [bar, setBar] = useState(tabs[0].url);

  const tab = tabs.find((t) => t.id === active);

  const newTab = () => {
    const id = Date.now();
    setTabs([...tabs, { id, url: "about:home", title: "New Tab" }]);
    setActive(id); setBar("");
  };
  const close = (id) => {
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next.length ? next : [{ id: 1, url: "about:home", title: "Home" }]);
    if (active === id && next[0]) { setActive(next[0].id); setBar(next[0].url); }
  };
  const go = () => {
    let url = bar.trim();
    if (!/^https?:\/\//.test(url)) url = "https://" + url;
    setTabs(tabs.map((t) => t.id === active ? { ...t, url, title: new URL(url).hostname } : t));
  };

  return (
    <div className="flex flex-col h-full text-white" data-testid="browser-app">
      <div className="flex items-center gap-1 px-2 pt-2 border-b border-white/10 bg-black/30">
        {tabs.map((t) => (
          <div key={t.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer ${active === t.id ? "bg-white/10" : "hover:bg-white/5"}`} onClick={() => { setActive(t.id); setBar(t.url); }}>
            <i className="fa-solid fa-globe text-[10px] text-[#00F0FF]"></i>
            <span className="truncate max-w-32">{t.title}</span>
            <button onClick={(e) => { e.stopPropagation(); close(t.id); }} className="text-slate-500 hover:text-[#FF003C]"><i className="fa-solid fa-xmark text-[10px]"></i></button>
          </div>
        ))}
        <button data-testid="new-tab" onClick={newTab} className="px-2 text-slate-400 hover:text-white"><i className="fa-solid fa-plus text-xs"></i></button>
      </div>
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <button onClick={() => window.history.back()} className="w-7 h-7 rounded hover:bg-white/10 text-slate-400"><i className="fa-solid fa-arrow-left text-xs"></i></button>
        <button onClick={() => window.history.forward()} className="w-7 h-7 rounded hover:bg-white/10 text-slate-400"><i className="fa-solid fa-arrow-right text-xs"></i></button>
        <input data-testid="url-bar" value={bar} onChange={(e) => setBar(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} className="input-cyber flex-1 !py-1 text-xs" placeholder="https://" />
      </div>
      <div className="flex-1 bg-white overflow-hidden">
        {tab?.url === "about:home" ? (
          <div className="bg-[#05050A] w-full h-full p-10 text-white">
            <div className="mono-label">// New Tab</div>
            <h2 className="font-heading text-3xl font-bold mb-6">Where to?</h2>
            <div className="grid grid-cols-4 gap-3 max-w-xl">
              {BOOKMARKS.map((b) => (
                <button key={b.name} onClick={() => { setBar(b.url); setTabs(tabs.map(t => t.id === active ? { ...t, url: b.url, title: b.name } : t)); }} className="glass-light rounded-xl p-4 hover:border-[#00F0FF]/40 text-center">
                  <i className="fa-solid fa-bookmark text-[#00F0FF] text-2xl mb-2"></i>
                  <div className="text-sm">{b.name}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <iframe src={tab?.url} className="w-full h-full" title="browser" />
        )}
      </div>
    </div>
  );
}
