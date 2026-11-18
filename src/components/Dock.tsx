import { useState, type ComponentType } from 'react';
import {
  Briefcase,
  Compass,
  FileText,
  FolderKanban,
  Mail,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import type { WindowId, WindowInstance } from '../utils/windowManager';

interface DockProps {
  windows: Record<WindowId, WindowInstance>;
  activeWindowId: WindowId | null;
  onOpenWindow: (id: WindowId) => void;
}

interface DockItem {
  id: WindowId;
  label: string;
  mobileLabel: string;
  icon: ComponentType<{ className?: string }>;
  gradient: string;
}

const DOCK_ITEMS: DockItem[] = [
  {
    id: 'portfolio',
    label: 'Finder / Home',
    mobileLabel: 'Home',
    icon: Compass,
    gradient: 'from-[#2563EB] to-[#1D4ED8]',
  },
  {
    id: 'about',
    label: 'About',
    mobileLabel: 'About',
    icon: UserRound,
    gradient: 'from-[#3B82F6] to-[#2563EB]',
  },
  {
    id: 'projects',
    label: 'Projects',
    mobileLabel: 'Projects',
    icon: FolderKanban,
    gradient: 'from-[#6366F1] to-[#4F46E5]',
  },
  {
    id: 'skills',
    label: 'Skills',
    mobileLabel: 'Skills',
    icon: SlidersHorizontal,
    gradient: 'from-[#475569] to-[#334155]',
  },
  {
    id: 'experience',
    label: 'Experience',
    mobileLabel: 'Work',
    icon: Briefcase,
    gradient: 'from-[#8B5CF6] to-[#7C3AED]',
  },
  {
    id: 'contact',
    label: 'Mail / Contact',
    mobileLabel: 'Mail',
    icon: Mail,
    gradient: 'from-[#0EA5E9] to-[#0284C7]',
  },
  {
    id: 'resume',
    label: 'Resume',
    mobileLabel: 'Resume',
    icon: FileText,
    gradient: 'from-[#F8FAFC] to-[#CBD5E1] !text-[#0F172A]',
  },
];

export function Dock({ windows, activeWindowId, onOpenWindow }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getScaleClass = (index: number) => {
    if (hoveredIndex === null) return 'scale-100 translate-y-0';
    const distance = Math.abs(hoveredIndex - index);
    if (distance === 0) return 'scale-[1.28] -translate-y-2.5';
    if (distance === 1) return 'scale-[1.12] -translate-y-1';
    return 'scale-100 translate-y-0';
  };

  return (
    <>
      {/* Desktop Floating Glass Dock */}
      <nav
        aria-label="Application Dock"
        className="fixed bottom-3 left-1/2 z-40 hidden -translate-x-1/2 items-end gap-2 rounded-2xl border border-white/60 bg-[rgba(255,255,255,0.62)] px-3 py-2 shadow-[0_18px_42px_-12px_rgba(15,23,42,0.28)] backdrop-blur-2xl md:flex dark:border-white/15 dark:bg-[rgba(15,23,42,0.72)] dark:shadow-[0_18px_42px_-12px_rgba(0,0,0,0.6)]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {DOCK_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = windows[item.id]?.isOpen;
          const isFocused = activeWindowId === item.id;

          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {/* Hover Tooltip */}
              {hoveredIndex === idx && (
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-12 z-20 whitespace-nowrap rounded-lg border border-white/40 bg-slate-900/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg dark:bg-slate-800/95"
                >
                  {item.label}
                </div>
              )}

              <button
                type="button"
                aria-label={`Open ${item.label}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => onOpenWindow(item.id)}
                className={`flex h-12 w-12 origin-bottom items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md ring-1 ring-white/40 transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${getScaleClass(
                  idx
                )} ${isFocused ? 'ring-2 ring-white/80 dark:ring-blue-400/70' : ''}`}
              >
                <Icon className="h-6 w-6" />
              </button>

              {/* Active App Indicator */}
              <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full transition-opacity ${
                  isOpen
                    ? 'bg-[#111827] opacity-90 dark:bg-[#F8FAFC]'
                    : 'opacity-0'
                }`}
              />
            </div>
          );
        })}
      </nav>

      {/* Mobile Touch-Friendly Bottom Navigation Bar (<= 64px height) */}
      <nav
        aria-label="Mobile Application Dock"
        className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-white/50 bg-[rgba(255,255,255,0.86)] px-1 backdrop-blur-2xl md:hidden dark:border-white/10 dark:bg-[rgba(15,23,42,0.9)]"
      >
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon;
          const isFocused = activeWindowId === item.id && windows[item.id]?.isOpen;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenWindow(item.id)}
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-1 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                isFocused
                  ? 'text-[#2563EB] dark:text-[#60A5FA]'
                  : 'text-[#475569] dark:text-[#94A3B8]'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span>{item.mobileLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
