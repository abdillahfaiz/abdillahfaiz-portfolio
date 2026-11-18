import { useState } from 'react';
import { BookOpen, Compass, Cpu, GraduationCap, Sparkles, UserRound } from 'lucide-react';
import { ABOUT_CONTENT, ASSETS, EDUCATION, PROFILE } from '../../data/portfolioContent';
import { ResilientImage } from '../ResilientImage';

export function AboutWindow() {
  const [selectedId, setSelectedId] = useState<string>('all');

  const sidebarItems = [
    { id: 'all', label: 'Overview', icon: UserRound },
    { id: 'introduction', label: 'Introduction', icon: Compass },
    { id: 'journey', label: 'Career Journey', icon: BookOpen },
    { id: 'philosophy', label: 'Standards', icon: Sparkles },
    { id: 'learning', label: 'Education & Focus', icon: Cpu },
  ];

  const visibleSections =
    selectedId === 'all'
      ? ABOUT_CONTENT.sections
      : ABOUT_CONTENT.sections.filter((s) => s.id === selectedId);

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      {/* Finder Sidebar */}
      <aside
        aria-label="About sections"
        className="w-full shrink-0 border-b border-slate-900/8 bg-slate-900/[0.03] p-3 md:w-52 md:border-b-0 md:border-r dark:border-white/10 dark:bg-white/[0.02]"
      >
        <p className="mb-2 px-2.5 text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Favorites
        </p>
        <div className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = selectedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`flex min-h-[36px] items-center gap-2.5 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#334155] hover:bg-slate-900/6 dark:text-[#CBD5E1] dark:hover:bg-white/10'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Finder Content Canvas */}
      <div className="flex-1 space-y-6 p-6 sm:p-8">
        <div className="flex flex-col gap-5 border-b border-slate-900/8 pb-6 sm:flex-row sm:items-center dark:border-white/10">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm dark:border-white/15">
            <ResilientImage
              src={ASSETS.portrait}
              alt="Abdillah Faiz"
              fallbackTitle="AF"
              className="h-full w-full origin-[52%_64%] scale-[1.65] object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#111827] dark:text-[#F8FAFC]">
              {PROFILE.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
              {PROFILE.shortRole} · {PROFILE.location}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              {ABOUT_CONTENT.summary}
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {visibleSections.map((section) => (
            <article key={section.id} className="space-y-1.5">
              <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                {section.label}
              </p>
              <h4 className="text-base font-semibold text-[#111827] dark:text-[#F1F5F9]">
                {section.title}
              </h4>
              <p className="text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        {/* Education Summary */}
        <div className="space-y-2.5">
          {EDUCATION.map((edu) => (
            <div
              key={edu.id}
              className="flex flex-col justify-between gap-2 rounded-xl border border-slate-900/8 bg-white/60 p-4 sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#93C5FD]">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    {edu.degree} · {edu.institution}
                  </p>
                  <p className="text-xs text-[#475569] dark:text-[#CBD5E1]">
                    {edu.major} · GPA <span className="tabular-nums font-semibold">{edu.gpa}</span>
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-[#64748B] tabular-nums dark:text-[#94A3B8]">
                {edu.period}
              </span>
            </div>
          ))}
        </div>

        {/* Personal Statement */}
        <div className="rounded-xl border border-slate-900/8 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
            Personal Statement
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-[#111827] dark:text-[#F1F5F9]">
            &ldquo;{ABOUT_CONTENT.statement}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
