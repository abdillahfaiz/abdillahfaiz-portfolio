import type { ComponentType } from 'react';
import {
  Briefcase,
  FileText,
  FolderKanban,
  Mail,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import type { WindowId } from '../utils/windowManager';

interface DesktopIconsProps {
  onOpenWindow: (id: WindowId) => void;
}

interface DesktopShortcut {
  id: WindowId;
  label: string;
  icon: ComponentType<{ className?: string }>;
  accentClass: string;
}

const SHORTCUTS: DesktopShortcut[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: UserRound,
    accentClass: 'from-[#3B82F6] to-[#2563EB]',
  },
  {
    id: 'projects',
    label: 'My Projects',
    icon: FolderKanban,
    accentClass: 'from-[#60A5FA] to-[#3B82F6]',
  },
  {
    id: 'experience',
    label: 'My Experience',
    icon: Briefcase,
    accentClass: 'from-[#8B5CF6] to-[#6D28D9]',
  },
  {
    id: 'skills',
    label: 'My Skills',
    icon: SlidersHorizontal,
    accentClass: 'from-[#475569] to-[#1E293B]',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    accentClass: 'from-[#0EA5E9] to-[#2563EB]',
  },
  {
    id: 'resume',
    label: 'Resume.pdf',
    icon: FileText,
    accentClass: 'from-[#F8FAFC] to-[#E2E8F0] !text-[#1E293B]',
  },
];

export function DesktopIcons({ onOpenWindow }: DesktopIconsProps) {
  return (
    <nav
      aria-label="Desktop shortcuts"
      className="fixed left-5 top-14 z-10 hidden flex-col gap-3 md:flex"
    >
      {SHORTCUTS.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenWindow(item.id)}
            className="group flex w-28 flex-col items-center gap-1.5 rounded-xl p-2 text-center transition-colors hover:bg-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:hover:bg-white/10"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accentClass} text-white shadow-[0_8px_18px_-4px_rgba(15,23,42,0.28)] ring-1 ring-white/40 transition-transform duration-150 group-hover:-translate-y-0.5 group-active:scale-95`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <span className="whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-medium leading-tight text-[#111827] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:text-[#F8FAFC] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
