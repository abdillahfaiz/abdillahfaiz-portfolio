import React, { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PROFILE } from '../../data/portfolioContent';
import {
  validateContactForm,
  type ContactFormErrors,
} from '../../utils/contactValidation';

interface ContactWindowProps {
  prefillSubject?: string;
}

export function ContactWindow({ prefillSubject = '' }: ContactWindowProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(prefillSubject);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefillSubject) {
      setSubject(prefillSubject);
    }
  }, [prefillSubject]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactForm({ name, email, subject, message });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus('idle');
      return;
    }

    setErrors({});
    setStatus('submitted');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
    setStatus('idle');
  };

  return (
    <div className="flex min-h-full flex-col md:flex-row">
      {/* Mail Sidebar: Direct Channels */}
      <aside className="w-full shrink-0 border-b border-slate-900/8 bg-slate-900/[0.03] p-5 md:w-64 md:border-b-0 md:border-r dark:border-white/10 dark:bg-white/[0.02]">
        <p className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
          Direct Channels
        </p>

        <p className="mt-3 text-sm font-medium leading-relaxed text-[#111827] dark:text-[#F1F5F9]">
          Have a project in mind? Let&apos;s build something meaningful together.
        </p>

        <div className="mt-5 space-y-2.5">
          <div className="rounded-xl border border-slate-900/8 bg-white/70 p-3 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
              <Mail className="h-3.5 w-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Email</span>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="mt-1 block truncate text-xs font-semibold text-[#111827] hover:text-[#2563EB] dark:text-[#F8FAFC] dark:hover:text-[#93C5FD]"
            >
              {PROFILE.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#2563EB] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#93C5FD]"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy email address</span>
                </>
              )}
            </button>
          </div>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl border border-slate-900/8 bg-white/70 px-3 py-2.5 text-xs font-medium text-[#111827] transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F1F5F9] dark:hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <Github className="h-4 w-4 text-[#475569] dark:text-[#CBD5E1]" />
              <span>GitHub</span>
            </span>
            <span className="text-[#64748B] dark:text-[#94A3B8]">
              {PROFILE.githubHandle}
            </span>
          </a>

          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-slate-900/8 bg-white/70 px-3 py-2.5 text-xs font-medium text-[#111827] transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F1F5F9] dark:hover:bg-white/10"
          >
            <span className="flex items-center gap-2">
              <Linkedin className="h-4 w-4 shrink-0 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>LinkedIn</span>
            </span>
            <span className="mt-0.5 block pl-6 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              {PROFILE.linkedinHandle}
            </span>
          </a>

          <a
            href={`tel:${PROFILE.phone}`}
            className="flex items-center justify-between gap-2 rounded-xl border border-slate-900/8 bg-white/70 px-3 py-2.5 text-xs font-medium text-[#111827] transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F1F5F9] dark:hover:bg-white/10"
          >
            <span className="flex shrink-0 items-center gap-2">
              <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Phone</span>
            </span>
            <span className="tabular-nums text-[#64748B] dark:text-[#94A3B8]">
              {PROFILE.phone}
            </span>
          </a>

          <div className="rounded-xl border border-slate-900/8 bg-white/70 px-3 py-2.5 text-xs font-medium text-[#111827] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#F1F5F9]">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#64748B] dark:text-[#94A3B8]" />
              <span>Location</span>
            </span>
            <span className="mt-0.5 block pl-6 text-[11px] text-[#64748B] dark:text-[#94A3B8]">
              {PROFILE.location}
            </span>
          </div>
        </div>
      </aside>

      {/* Mail Compose Pane */}
      <div className="flex-1 p-5 sm:p-7">
        {status === 'submitted' ? (
          <div
            role="status"
            data-testid="contact-success"
            className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-emerald-600/20 bg-emerald-50/70 p-6 dark:border-emerald-400/20 dark:bg-emerald-950/30"
          >
            <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Message Prepared &amp; Sent</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
              Thank you, <span className="font-semibold">{name}</span>. Your message regarding{' '}
              <span className="font-semibold">&ldquo;{subject}&rdquo;</span> has been recorded. You
              can also reach me directly at{' '}
              <a
                href={`mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`}
                className="font-medium text-[#2563EB] underline dark:text-[#93C5FD]"
              >
                {PROFILE.email}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 min-h-[38px] rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
            >
              Compose Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-900/8 pb-3 dark:border-white/10">
              <div>
                <h3 className="text-base font-semibold text-[#111827] dark:text-[#F8FAFC]">
                  New Message
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  To: {PROFILE.name} ({PROFILE.email})
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap shrink-0 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Message</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1 block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Alex Pratama"
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-xl border border-slate-900/12 bg-white/80 px-3 py-2 text-sm text-[#111827] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-[#F8FAFC]"
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1 block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholder="alex@company.com"
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-xl border border-slate-900/12 bg-white/80 px-3 py-2 text-sm text-[#111827] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-[#F8FAFC]"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-1 block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                }}
                placeholder="Flutter mobile app or backend collaboration"
                aria-invalid={Boolean(errors.subject)}
                className="w-full rounded-xl border border-slate-900/12 bg-white/80 px-3 py-2 text-sm text-[#111827] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-[#F8FAFC]"
              />
              {errors.subject && (
                <p role="alert" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1 block text-xs font-medium text-[#334155] dark:text-[#CBD5E1]"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                }}
                placeholder="Tell me a little about your product, timeline, or engineering needs..."
                aria-invalid={Boolean(errors.message)}
                className="w-full resize-none rounded-xl border border-slate-900/12 bg-white/80 px-3 py-2 text-sm text-[#111827] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-[#F8FAFC]"
              />
              {errors.message && (
                <p role="alert" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">
                  {errors.message}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
