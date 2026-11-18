import { useEffect, useRef, useState } from 'react';
import { BatteryCharging, Moon, RotateCcw, Sun, Wifi } from 'lucide-react';
import type { WindowId } from '../utils/windowManager';

interface MenuBarProps {
  activeWindowId: WindowId | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenWindow: (id: WindowId) => void;
  onReplayWelcome: () => void;
}

const MENU_NAV_ITEMS: Array<{ id: WindowId; label: string }> = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

function formatMacDateTime(date: Date): string {
  const datePart = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${datePart}  ${timePart}`;
}

export function MenuBar({
  activeWindowId,
  theme,
  onToggleTheme,
  onOpenWindow,
  onReplayWelcome,
}: MenuBarProps) {
  const [now, setNow] = useState(() => new Date());
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAppleMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-9 items-center justify-between border-b border-white/40 bg-[rgba(255,255,255,0.62)] px-3 text-xs text-[#111827] backdrop-blur-xl sm:px-4 dark:border-white/10 dark:bg-[rgba(15,23,42,0.72)] dark:text-[#F1F5F9]">
      {/* Left Zone: Apple-inspired icon + menu links */}
      <div className="flex items-center gap-1 sm:gap-2" ref={menuRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setAppleMenuOpen((prev) => !prev)}
            aria-expanded={appleMenuOpen}
            aria-label="System menu"
            className="flex h-7 items-center gap-1.5 rounded-md px-2 font-semibold transition-colors hover:bg-slate-900/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:hover:bg-white/12"
          >
            {/* Minimalist Apple-inspired geometric leaf mark */}
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5"
            >
              <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
            </svg>
          </button>

          {appleMenuOpen && (
            <div
              role="menu"
              className="absolute left-0 top-8 z-50 w-60 rounded-xl border border-white/60 bg-[rgba(255,255,255,0.92)] p-1.5 shadow-xl backdrop-blur-2xl dark:border-white/15 dark:bg-[rgba(20,26,42,0.95)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  onOpenWindow('portfolio');
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs font-medium text-[#111827] hover:bg-[#2563EB] hover:text-white dark:text-[#F1F5F9]"
              >
                <span>About This Portfolio</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  onOpenWindow('skills');
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs font-medium text-[#111827] hover:bg-[#2563EB] hover:text-white dark:text-[#F1F5F9]"
              >
                <span>System Settings — Skills</span>
              </button>
              <div className="my-1 border-t border-slate-900/10 dark:border-white/10" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setAppleMenuOpen(false);
                  onReplayWelcome();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-medium text-[#111827] hover:bg-[#2563EB] hover:text-white dark:text-[#F1F5F9]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Replay Welcome Experience</span>
              </button>
            </div>
          )}
        </div>

        <nav aria-label="Top menu navigation" className="hidden items-center gap-0.5 md:flex">
          {MENU_NAV_ITEMS.map((item, idx) => {
            const isCurrent = activeWindowId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenWindow(item.id)}
                className={`whitespace-nowrap shrink-0 rounded-md px-2.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  idx === 0 ? 'font-semibold' : 'font-medium'
                } ${
                  isCurrent
                    ? 'bg-slate-900/10 text-[#111827] dark:bg-white/15 dark:text-white'
                    : 'text-[#1E293B]/85 hover:bg-slate-900/6 hover:text-[#111827] dark:text-[#E2E8F0]/85 dark:hover:bg-white/10 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <span className="truncate font-semibold text-[#111827] md:hidden dark:text-white">
          Abdillah Faiz
        </span>
      </div>

      {/* Right Zone: Status Icons, Date/Time, Theme Toggle */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <span
          aria-hidden="true"
          title="Wi-Fi Connected"
          className="hidden items-center text-[#334155] sm:inline-flex dark:text-[#CBD5E1]"
        >
          <Wifi className="h-3.5 w-3.5" />
        </span>
        <span
          aria-hidden="true"
          title="Battery 100%"
          className="hidden items-center text-[#334155] sm:inline-flex dark:text-[#CBD5E1]"
        >
          <BatteryCharging className="h-4 w-4" />
        </span>

        <time
          dateTime={now.toISOString()}
          className="whitespace-nowrap font-medium tabular-nums text-[#1E293B] dark:text-[#E2E8F0]"
        >
          {formatMacDateTime(now)}
        </time>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-7 items-center gap-1.5 rounded-md px-2 font-medium text-[#1E293B] transition-colors hover:bg-slate-900/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#E2E8F0] dark:hover:bg-white/12"
        >
          {theme === 'dark' ? (
            <Sun className="h-3.5 w-3.5 text-amber-300" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-[#2563EB]" />
          )}
          <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
