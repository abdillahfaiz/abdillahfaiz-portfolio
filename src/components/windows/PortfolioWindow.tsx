import { ArrowRight, Download, Mail, RotateCcw } from 'lucide-react';
import { ASSETS, PROFILE } from '../../data/portfolioContent';
import type { WindowId } from '../../utils/windowManager';
import { ResilientImage } from '../ResilientImage';

interface PortfolioWindowProps {
  onOpenWindow: (id: WindowId) => void;
  onReplayWelcome: () => void;
}

export function PortfolioWindow({
  onOpenWindow,
  onReplayWelcome,
}: PortfolioWindowProps) {
  return (
    <div className="flex flex-col justify-between gap-6 p-6 sm:p-8">
      {/* Main Hero Split */}
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col items-start md:col-span-7">
          <p className="text-xs font-medium tracking-wide text-[#2563EB] dark:text-[#93C5FD]">
            Abdillah Faiz · Mobile Apps Developer · 3 Years Experience
          </p>

          <h1 className="mt-2.5 text-balance text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl lg:text-[2.55rem] lg:leading-[1.12] dark:text-[#F8FAFC]">
            {PROFILE.heroHeadline}
          </h1>

          <p className="mt-3 text-base font-medium leading-relaxed text-[#1E293B] sm:text-lg dark:text-[#E2E8F0]">
            {PROFILE.heroSupporting}
          </p>

          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#475569] sm:text-[15px] dark:text-[#CBD5E1]">
            {PROFILE.heroDescription}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onOpenWindow('projects')}
              className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-xl bg-[#2563EB] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              <span>Explore My Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow('resume')}
              className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap shrink-0 rounded-xl border border-slate-900/12 bg-white/75 px-3.5 py-2 text-sm font-medium text-[#111827] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-white/10 dark:text-[#F1F5F9] dark:hover:bg-white/15"
            >
              <Download className="h-4 w-4 text-[#2563EB] dark:text-[#93C5FD]" />
              <span>Download Resume</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow('contact')}
              className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl px-3 py-2 text-sm font-medium text-[#334155] transition-colors hover:bg-slate-900/6 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#CBD5E1] dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {/* Profile Portrait Pop-Out Card */}
        <div className="flex flex-col items-center pt-12 md:col-span-5 md:items-end md:pt-14">
          <div className="group/card relative w-full max-w-[270px] rounded-2xl border border-white/70 bg-white/55 p-2 shadow-[0_20px_44px_-14px_rgba(15,23,42,0.22)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_24px_52px_-14px_rgba(37,99,235,0.28)] dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_20px_48px_-14px_rgba(0,0,0,0.6)]">
            {/* Inner Backdrop + Pop-Out Stage */}
            <div className="relative h-[200px] w-full">
              {/* Clipped Gradient Card Backdrop */}
              <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#DBEAFE] via-[#E0E7FF] to-[#EDE9FE] ring-1 ring-inset ring-slate-900/5 dark:from-[#1E3A8A]/55 dark:via-[#312E81]/55 dark:to-[#0F172A] dark:ring-white/10">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-6 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#3B82F6]/25 blur-2xl dark:bg-[#60A5FA]/25"
                />
                <div
                  aria-hidden="true"
                  className="absolute -top-6 right-2 h-24 w-24 rounded-full bg-white/60 blur-xl dark:bg-indigo-300/15"
                />
              </div>

              {/* Cutout Subject Layer: overflows above card top edge, clipped cleanly at bottom/sides */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 -top-20 overflow-hidden rounded-b-xl">
                <ResilientImage
                  src={ASSETS.portraitCutout}
                  alt="Portrait of Abdillah Faiz"
                  fallbackTitle="Abdillah Faiz"
                  className="h-full w-full origin-bottom scale-[1.58] object-contain object-bottom drop-shadow-[0_14px_20px_rgba(15,23,42,0.28)] transition-transform duration-300 ease-out group-hover/card:scale-[1.63]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between px-2 pb-1 pt-2.5 text-xs">
              <span className="font-semibold text-[#111827] dark:text-[#F1F5F9]">
                {PROFILE.name}
              </span>
              <span className="text-[#64748B] dark:text-[#94A3B8]">
                {PROFILE.shortLocation}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Workspace Strip: Core Stack & Replay Welcome */}
      <div className="flex flex-col gap-4 border-t border-slate-900/8 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
            Core Technologies
          </span>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium text-[#111827] dark:text-[#E2E8F0]">
            {PROFILE.techBadges.map((tech, index) => (
              <span key={tech} className="inline-flex items-center gap-2.5">
                {index > 0 && (
                  <span aria-hidden="true" className="text-[#94A3B8] dark:text-[#64748B]">
                    ·
                  </span>
                )}
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onReplayWelcome}
          className="inline-flex min-h-[38px] items-center gap-2 self-start whitespace-nowrap shrink-0 rounded-lg border border-slate-900/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#334155] transition-colors hover:bg-white hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] sm:self-auto dark:border-white/12 dark:bg-white/8 dark:text-[#CBD5E1] dark:hover:bg-white/15 dark:hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Replay Welcome Experience</span>
        </button>
      </div>
    </div>
  );
}
