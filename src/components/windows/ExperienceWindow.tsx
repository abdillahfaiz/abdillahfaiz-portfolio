import { Briefcase, Calendar, GraduationCap, MapPin } from 'lucide-react';
import { EDUCATION, EXPERIENCES } from '../../data/portfolioContent';

export function ExperienceWindow() {
  return (
    <div className="space-y-6 p-6 sm:p-8">
      <div className="border-b border-slate-900/8 pb-4 dark:border-white/10">
        <h3 className="text-lg font-semibold tracking-tight text-[#111827] dark:text-[#F8FAFC]">
          Work &amp; Engineering Experience
        </h3>
        <p className="mt-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
          Chronological overview of frontend, mobile, and backend engineering work.
        </p>
      </div>

      {/* Clean Timeline Layout */}
      <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-[9px] before:top-2 before:w-px before:bg-slate-900/12 dark:before:bg-white/15">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.id}
            className="relative rounded-2xl border border-slate-900/8 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            {/* Timeline Node */}
            <span
              aria-hidden="true"
              className="absolute -left-[22px] top-6 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#2563EB] bg-white dark:border-[#60A5FA] dark:bg-[#0F172A]"
            />

            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h4 className="text-base font-semibold text-[#111827] dark:text-[#F8FAFC]">
                  {exp.role}
                </h4>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{exp.company}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#64748B] dark:text-[#94A3B8]">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] sm:mt-0 dark:text-[#94A3B8]">
                <Calendar className="h-3.5 w-3.5" />
                <span>{exp.period}</span>
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              {exp.summary}
            </p>

            <ul className="mt-3 space-y-1.5">
              {exp.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#64748B] dark:bg-[#94A3B8]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-900/6 pt-3 dark:border-white/8">
              <p className="text-xs font-medium text-[#1E293B] dark:text-[#E2E8F0]">
                {exp.technologies.join(' · ')}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Education Section */}
      <div className="space-y-3 border-t border-slate-900/8 pt-5 dark:border-white/10">
        <h4 className="text-sm font-semibold tracking-tight text-[#111827] dark:text-[#F8FAFC]">
          Education
        </h4>
        <div className="space-y-3">
          {EDUCATION.map((edu) => (
            <article
              key={edu.id}
              className="flex flex-col justify-between gap-2 rounded-2xl border border-slate-900/8 bg-white/60 p-4 sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/[0.04]"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#93C5FD]">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                    D4 – {edu.institution}
                  </h5>
                  <p className="mt-0.5 text-xs text-[#475569] dark:text-[#CBD5E1]">
                    {edu.major} · GPA <span className="tabular-nums font-semibold">{edu.gpa}</span>
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] tabular-nums dark:text-[#94A3B8]">
                <Calendar className="h-3.5 w-3.5" />
                <span>{edu.period}</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
