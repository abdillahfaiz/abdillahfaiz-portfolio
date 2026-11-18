import { useState, type ComponentType } from 'react';
import {
  Database,
  Layers,
  LayoutGrid,
  Server,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { ASSETS, PROFILE, SKILL_CATEGORIES } from '../../data/portfolioContent';
import { ResilientImage } from '../ResilientImage';

const CATEGORY_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  mobile: Smartphone,
  frontend: LayoutGrid,
  backend: Server,
  database: Database,
  tools: Wrench,
};

export function SkillsWindow() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const visibleCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === selectedCategory);

  return (
    <div className="flex min-h-full flex-col md:h-full md:min-h-0 md:flex-row md:overflow-hidden">
      {/* macOS System Settings Sidebar */}
      <aside
        aria-label="Skill categories"
        className="macos-scroll w-full shrink-0 border-b border-slate-900/8 bg-slate-900/[0.03] p-3 md:h-full md:w-56 md:overflow-y-auto md:border-b-0 md:border-r dark:border-white/10 dark:bg-white/[0.02]"
      >
        <div className="mb-3 flex items-center gap-2.5 rounded-xl px-2 py-1.5">
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/50 bg-white shadow-sm">
            <ResilientImage
              src={ASSETS.portrait}
              alt="Abdillah Faiz"
              fallbackTitle="AF"
              className="h-full w-full origin-[52%_64%] scale-[1.65] object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#111827] dark:text-[#F8FAFC]">
              {PROFILE.name}
            </p>
            <p className="truncate text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              Technical Stack
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`flex min-h-[36px] items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
              selectedCategory === 'all'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#334155] hover:bg-slate-900/6 dark:text-[#CBD5E1] dark:hover:bg-white/10'
            }`}
          >
            <Layers className="h-3.5 w-3.5 shrink-0" />
            <span>All Skills</span>
          </button>

          {SKILL_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Wrench;
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`flex min-h-[36px] items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#334155] hover:bg-slate-900/6 dark:text-[#CBD5E1] dark:hover:bg-white/10'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* System Settings Content Panel */}
      <div className="macos-scroll min-h-0 flex-1 space-y-6 p-6 sm:p-7 md:h-full md:overflow-y-auto">
        {visibleCategories.map((category) => {
          const Icon = CATEGORY_ICONS[category.id] ?? Wrench;
          return (
            <section key={category.id} className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#93C5FD]">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-900/8 overflow-hidden rounded-xl border border-slate-900/8 bg-white/60 dark:divide-white/10 dark:border-white/10 dark:bg-white/[0.04]">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 text-sm font-semibold text-[#111827] sm:w-32 dark:text-[#F1F5F9]">
                      {skill.name}
                    </span>
                    <p className="flex-1 text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
