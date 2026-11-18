import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { PROJECTS } from '../../data/portfolioContent';
import { ResilientImage } from '../ResilientImage';

interface ProjectDetailWindowProps {
  projectId: string;
  initialTab?: 'overview' | 'architecture';
  onBackToProjects: () => void;
  onContactAboutProject: (projectName: string) => void;
}

export function ProjectDetailWindow({
  projectId,
  initialTab = 'overview',
  onBackToProjects,
  onContactAboutProject,
}: ProjectDetailWindowProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture'>(initialTab);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [projectId, initialTab]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [projectId]);

  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0];
  const galleryItems =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [{ src: project.image, caption: `${project.name} preview` }];
  const safeIndex = selectedIndex < galleryItems.length ? selectedIndex : 0;
  const activeMedia = galleryItems[safeIndex];
  const hasMultiple = galleryItems.length > 1;

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % galleryItems.length);
  };

  return (
    <div className="flex flex-col gap-6 p-6 sm:p-7">
      {/* Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/8 pb-4 dark:border-white/10">
        <button
          type="button"
          onClick={onBackToProjects}
          className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#334155] transition-colors hover:bg-slate-900/6 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#CBD5E1] dark:hover:bg-white/10 dark:hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </button>

        <div
          role="tablist"
          aria-label="Project details tabs"
          className="inline-flex items-center gap-1 rounded-xl bg-slate-900/6 p-1 dark:bg-white/8"
        >
          {(
            [
              { id: 'overview', label: 'Overview' },
              { id: 'architecture', label: 'Architecture' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                activeTab === tab.id
                  ? 'bg-white text-[#111827] shadow-sm dark:bg-slate-800 dark:text-white'
                  : 'text-[#475569] hover:text-[#111827] dark:text-[#CBD5E1] dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Header + Media */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="flex flex-col gap-2.5 md:col-span-6">
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-slate-900/8 bg-[#F3F4F6] p-2 dark:border-white/10 dark:bg-slate-900/80">
            <ResilientImage
              src={activeMedia.src}
              alt={`${project.name} — ${activeMedia.caption}`}
              fallbackTitle={project.name}
              className="aspect-[4/3] w-full rounded-xl object-contain"
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[#111827] shadow-md backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/85 text-[#111827] shadow-md backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {hasMultiple && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="font-medium text-[#334155] dark:text-[#CBD5E1]">
                  {activeMedia.caption}
                </span>
                <span className="tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                  {safeIndex + 1} / {galleryItems.length}
                </span>
              </div>

              <div
                aria-label={`${project.name} screenshots`}
                className="macos-scroll flex gap-2 overflow-x-auto pb-1"
              >
                {galleryItems.map((item, idx) => {
                  const active = idx === safeIndex;
                  return (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}: ${item.caption}`}
                      aria-current={active ? 'true' : undefined}
                      className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border bg-[#F3F4F6] p-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:bg-slate-900 ${
                        active
                          ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30'
                          : 'border-slate-900/10 opacity-75 hover:opacity-100 dark:border-white/15'
                      }`}
                    >
                      <ResilientImage
                        src={item.src}
                        alt={item.caption}
                        fallbackTitle={`${idx + 1}`}
                        className="h-full w-full rounded object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-4 md:col-span-6">
          <div>
            <p className="text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
              {project.category} · {project.tagline}
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight text-[#111827] dark:text-[#F8FAFC]">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
              {project.longDescription}
            </p>

            <div className="mt-4">
              <p className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                Technology Stack
              </p>
              <p className="mt-1 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
                {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => onContactAboutProject(project.name)}
              className="inline-flex min-h-[38px] items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              <span>Discuss This Project</span>
            </button>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl border border-slate-900/12 bg-white/80 px-3.5 py-2 text-xs font-medium text-[#111827] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-white/10 dark:text-[#F1F5F9] dark:hover:bg-white/15"
              >
                <ExternalLink className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#93C5FD]" />
                <span>Open on {project.externalLabel ?? 'Google Play'}</span>
              </a>
            )}
            <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">
              {project.demoPreviewNote}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="rounded-2xl border border-slate-900/8 bg-white/55 p-5 dark:border-white/10 dark:bg-white/[0.03]">
        {activeTab === 'overview' && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#111827] dark:text-[#F1F5F9]">
              Key Engineering Highlights
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#8B5CF6] dark:text-[#A78BFA]" />
              <h4 className="text-sm font-semibold text-[#111827] dark:text-[#F1F5F9]">
                System &amp; Code Architecture
              </h4>
            </div>
            <ul className="space-y-2.5">
              {project.architectureNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B5CF6]"
                  />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
