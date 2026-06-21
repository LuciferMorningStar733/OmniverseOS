import Dashboard from "../apps/Dashboard";
import AIChat from "../apps/AIChat";
import ImageGen from "../apps/ImageGen";
import Voice from "../apps/Voice";
import Memory from "../apps/Memory";
import Notes from "../apps/Notes";
import Tasks from "../apps/Tasks";
import CalendarApp from "../apps/CalendarApp";
import Music from "../apps/Music";
import Videos from "../apps/Videos";
import Watchlist from "../apps/Watchlist";
import FileManager from "../apps/FileManager";
import CodeEditor from "../apps/CodeEditor";
import Finance from "../apps/Finance";
import Analytics from "../apps/Analytics";
import DiscordApp from "../apps/DiscordApp";
import Browser from "../apps/Browser";
import Settings from "../apps/Settings";

export const APPS = [
  { id: "dashboard", name: "Dashboard", icon: "fa-grip", color: "#00F0FF", Component: Dashboard, group: "core" },
  { id: "chat", name: "AI Chat", icon: "fa-comments", color: "#00F0FF", Component: AIChat, group: "ai" },
  { id: "image", name: "Image Gen", icon: "fa-image", color: "#FF003C", Component: ImageGen, group: "ai" },
  { id: "voice", name: "Voice", icon: "fa-microphone", color: "#FCEE09", Component: Voice, group: "ai" },
  { id: "memory", name: "Memory", icon: "fa-brain", color: "#39FF14", Component: Memory, group: "ai" },
  { id: "notes", name: "Notes", icon: "fa-note-sticky", color: "#FCEE09", Component: Notes, group: "productivity" },
  { id: "tasks", name: "Tasks", icon: "fa-list-check", color: "#00F0FF", Component: Tasks, group: "productivity" },
  { id: "calendar", name: "Calendar", icon: "fa-calendar", color: "#FF003C", Component: CalendarApp, group: "productivity" },
  { id: "music", name: "Music", icon: "fa-music", color: "#39FF14", Component: Music, group: "media" },
  { id: "videos", name: "Videos", icon: "fa-video", color: "#FF003C", Component: Videos, group: "media" },
  { id: "watchlist", name: "Watchlist", icon: "fa-film", color: "#FCEE09", Component: Watchlist, group: "media" },
  { id: "files", name: "Files", icon: "fa-folder", color: "#00F0FF", Component: FileManager, group: "system" },
  { id: "code", name: "Code", icon: "fa-code", color: "#39FF14", Component: CodeEditor, group: "system" },
  { id: "finance", name: "Finance", icon: "fa-chart-line", color: "#39FF14", Component: Finance, group: "data" },
  { id: "analytics", name: "Analytics", icon: "fa-chart-pie", color: "#FF003C", Component: Analytics, group: "data" },
  { id: "discord", name: "Discord", icon: "fa-hashtag", color: "#00F0FF", Component: DiscordApp, group: "social" },
  { id: "browser", name: "Browser", icon: "fa-globe", color: "#FCEE09", Component: Browser, group: "system" },
  { id: "settings", name: "Settings", icon: "fa-gear", color: "#94A3B8", Component: Settings, group: "system" },
];

export const getApp = (id) => APPS.find((a) => a.id === id);
