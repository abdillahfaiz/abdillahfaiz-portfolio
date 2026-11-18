import { Download, Printer } from 'lucide-react';
import { ASSETS } from '../../data/portfolioContent';
import { ResilientImage } from '../ResilientImage';

export function ResumeWindow() {
  return (
    <div className="flex flex-col gap-5 p-6 sm:p-8">
      {/* Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/8 pb-4 dark:border-white/10">
        <div>
          <h3 className="text-base font-semibold text-[#111827] dark:text-[#F8FAFC]">
            Resume.pdf
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Abdillah Faiz — Mobile Apps Developer CV (Preview)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-900/12 bg-white/80 px-3 py-1.5 text-xs font-medium text-[#111827] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:border-white/15 dark:bg-white/10 dark:text-[#F1F5F9] dark:hover:bg-white/15"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print PDF</span>
          </button>

          <a
            href={ASSETS.cvPdf}
            download="Abdillah_Faiz_CV_Final.pdf"
            className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#2563EB] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Rendered PDF CV Page Preview */}
      <div className="mx-auto w-full max-w-[780px] overflow-hidden rounded-xl border border-slate-900/12 bg-white p-2 shadow-sm sm:p-4 dark:border-white/15">
        <ResilientImage
          src={ASSETS.cvPreview}
          alt="Preview of Abdillah Faiz's Final CV PDF"
          fallbackTitle="Abdillah Faiz CV Preview"
          className="h-auto w-full rounded-lg object-contain"
        />
      </div>
    </div>
  );
}
