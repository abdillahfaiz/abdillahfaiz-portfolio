import { useState } from 'react';
import {
  ChevronRight,
  ExternalLink,
  Folder,
  FolderOpen,
  Layers,
  Play,
} from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../../data/portfolioContent';
import { ResilientImage } from '../ResilientImage';

interface ProjectsWindowProps {
  onSelectProject: (projectId: string, initialTab?: 'overview' | 'architecture') => void;
}

type CategoryFilter = 'All' | ProjectItem['category'];

const FOLDER_ITEMS: Array<{ id: CategoryFilter; label: string }> = [
  { id: 'All', label: 'All Projects' },
  { id: 'Published', label: 'Published' },
  { id: 'POS & Operations', label: 'POS & Operations' },
  { id: 'Corporate & AI', label: 'Corporate & AI' },
];

export function ProjectsWindow({ onSelectProject }: ProjectsWindowProps) {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filteredProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === filter);

  const activeFolderLabel =
    FOLDER_ITEMS.find((f) => f.id === filter)?.label ?? 'All Projects';

  return (
    <div className="flex min-h-full flex-col md:h-full md:min-h-0 md:flex-row md:overflow-hidden">
      {/* macOS Finder Left Folder Sidebar */}
      <aside
        aria-label="Project folders"
        className="macos-scroll w-full shrink-0 border-b border-slate-900/8 bg-slate-900/[0.03] p-3 md:h-full md:w-52 md:overflow-y-auto md:border-b-0 md:border-r dark:border-white/10 dark:bg-white/[0.02]"
      >
        <p className="mb-2 px-2.5 text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Folders
        </p>

        <div
          role="tablist"
          aria-label="Filter projects by folder"
          className="flex flex-row gap-1 overflow-x-auto md:flex-col"
        >
          {FOLDER_ITEMS.map((folder) => {
            const active = filter === folder.id;
            const count =
              folder.id === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === folder.id).length;
            const FolderIcon = active ? FolderOpen : Folder;

            return (
              <button
                key={folder.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(folder.id)}
                className={`flex min-h-[36px] items-center justify-between gap-2 whitespace-nowrap shrink-0 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] md:w-full ${
                  active
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#334155] hover:bg-slate-900/6 dark:text-[#CBD5E1] dark:hover:bg-white/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FolderIcon
                    className={`h-4 w-4 shrink-0 ${
                      active
                        ? 'text-white'
                        : 'text-[#3B82F6] dark:text-[#60A5FA]'
                    }`}
                  />
                  <span>{folder.label}</span>
                </span>
                <span
                  className={`tabular-nums text-[11px] ${
                    active
                      ? 'text-white/85'
                      : 'text-[#64748B] dark:text-[#94A3B8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Finder Right Gallery Canvas */}
      <div className="macos-scroll min-h-0 flex-1 space-y-5 p-5 sm:p-6 md:h-full md:overflow-y-auto">
        {/* Finder Folder Path Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/8 pb-3.5 dark:border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span>Projects</span>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-[#111827] dark:text-[#F8FAFC]">
                {activeFolderLabel}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
              Click any project tile to inspect screenshots, architecture &amp; stack details.
            </p>
          </div>

          <span className="tabular-nums text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Finder Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-900/8 bg-white/65 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04]"
            >
              {/* Preview Image Trigger */}
              <button
                type="button"
                onClick={() => onSelectProject(project.id, 'overview')}
                aria-label={`Preview ${project.name}`}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F4F6] p-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB] dark:bg-slate-900/70"
              >
                <ResilientImage
                  src={project.image}
                  alt={`${project.name} application preview`}
                  fallbackTitle={project.name}
                  className="h-full w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>

              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id, 'overview')}
                      className="text-left text-base font-semibold text-[#111827] hover:text-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#F8FAFC] dark:hover:text-[#93C5FD]"
                    >
                      {project.name}
                    </button>
                    <span className="shrink-0 text-[11px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                      {project.category}
                    </span>
                  </div>

                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                    {project.description}
                  </p>

                  {/* Unboxed clean typographic stack list */}
                  <p className="mt-3 text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
                    {project.stack.join(' · ')}
                  </p>
                </div>

                {/* Project Action Buttons */}
                <div className="flex items-center gap-1.5 border-t border-slate-900/6 pt-3 dark:border-white/8">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project.id, 'overview')}
                    className="inline-flex min-h-[34px] flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#2563EB] px-2.5 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <Play className="h-3 w-3 shrink-0" />
                    <span>Preview</span>
                  </button>

                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[34px] flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-slate-900/12 bg-white/80 px-2.5 py-1.5 text-[11px] font-medium text-[#111827] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-white/10 dark:text-[#F1F5F9] dark:hover:bg-white/15"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span>{project.externalLabel ?? 'Play Store'}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectProject(project.id, 'architecture')}
                      className="inline-flex min-h-[34px] flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-slate-900/12 bg-white/80 px-2.5 py-1.5 text-[11px] font-medium text-[#111827] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-white/10 dark:text-[#F1F5F9] dark:hover:bg-white/15"
                    >
                      <Layers className="h-3 w-3 shrink-0" />
                      <span>Architecture</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
