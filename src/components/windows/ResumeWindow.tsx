import { Download, Printer } from 'lucide-react';
import {
  ABOUT_CONTENT,
  ASSETS,
  EDUCATION,
  EXPERIENCES,
  PROFILE,
  SKILL_CATEGORIES,
} from '../../data/portfolioContent';

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
            Abdillah Faiz — Mobile Apps Developer CV
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
            download="Abdillah_Faiz_CV_Mobile_Apps_Developer.pdf"
            className="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#2563EB] px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Resume</span>
          </a>
        </div>
      </div>

      {/* Paper Sheet */}
      <div className="rounded-xl border border-slate-900/10 bg-white p-6 text-[#111827] shadow-sm sm:p-8 dark:border-white/10 dark:bg-slate-900/90 dark:text-[#F1F5F9]">
        <header className="border-b border-slate-200 pb-4 dark:border-slate-800">
          <h4 className="text-2xl font-semibold tracking-tight">{PROFILE.name}</h4>
          <p className="mt-1 text-sm font-medium text-[#2563EB] dark:text-[#93C5FD]">
            Mobile Apps Developer
          </p>
          <p className="mt-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
            {PROFILE.location} · {PROFILE.phone} · {PROFILE.email} · {PROFILE.githubHandle} ·{' '}
            {PROFILE.linkedinHandle}
          </p>
        </header>

        <section className="mt-5 space-y-1.5">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Profile
          </h5>
          <p className="text-xs leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
            {ABOUT_CONTENT.summary}
          </p>
        </section>

        <section className="mt-5 space-y-2">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Skills
          </h5>
          <p className="text-xs leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
            Dart, Flutter, Android, Kotlin, JavaScript, TypeScript, React.js, Next.js, Express.js,
            NestJS, Go, Laravel, Figma, Clean Architecture, BLoC, CI/CD
          </p>
          <div className="grid grid-cols-1 gap-1.5 pt-1 sm:grid-cols-2">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.id} className="text-xs">
                <span className="font-semibold">{cat.title}: </span>
                <span className="text-[#475569] dark:text-[#CBD5E1]">
                  {cat.items.map((i) => i.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5 space-y-4">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Experience
          </h5>
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{exp.company}</p>
                  <p className="text-xs font-medium italic text-[#475569] dark:text-[#CBD5E1]">
                    {exp.role}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#64748B] tabular-nums dark:text-[#94A3B8]">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-1 pl-4 text-xs leading-relaxed text-[#475569] list-disc dark:text-[#CBD5E1]">
                {exp.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mt-5 space-y-2">
          <h5 className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8]">
            Education
          </h5>
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-sm font-semibold">
                  D4 – {edu.institution}
                </p>
                <p className="text-xs italic text-[#475569] dark:text-[#CBD5E1]">
                  {edu.major} – GPA <span className="tabular-nums font-medium">{edu.gpa}</span>
                </p>
              </div>
              <span className="text-xs font-medium text-[#64748B] tabular-nums dark:text-[#94A3B8]">
                {edu.period}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
