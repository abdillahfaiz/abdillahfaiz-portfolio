import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GREETINGS, getWelcomeDurations } from '../utils/welcomeSequence';

interface WelcomeScreenProps {
  onComplete: () => void;
}

type WelcomeStage =
  | { type: 'greeting'; index: number }
  | { type: 'intro-lead' }
  | { type: 'identity' }
  | { type: 'entering' };

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const durations = getWelcomeDurations(prefersReducedMotion);

  const [stage, setStage] = useState<WelcomeStage>({ type: 'greeting', index: 0 });
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  const finishIntro = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    window.setTimeout(
      () => {
        onComplete();
      },
      prefersReducedMotion ? 50 : 480
    );
  };

  useEffect(() => {
    const timers: number[] = [];
    let elapsed = 0;

    // Step through the exact greeting sequence: Hello -> こんにちは -> مرحباً -> Halo
    for (let i = 1; i < GREETINGS.length; i++) {
      elapsed += durations.greetingStepMs;
      const nextIdx = i;
      timers.push(
        window.setTimeout(() => {
          setStage({ type: 'greeting', index: nextIdx });
        }, elapsed)
      );
    }

    // Pause on final greeting, then fade into "Hello, I'm"
    elapsed += durations.greetingStepMs;
    timers.push(
      window.setTimeout(() => {
        setStage({ type: 'intro-lead' });
      }, elapsed)
    );

    // Reveal "Abdillah Faiz" + tagline + subtitle
    elapsed += durations.introHoldMs;
    timers.push(
      window.setTimeout(() => {
        setStage({ type: 'identity' });
      }, elapsed)
    );

    // Show "Entering Portfolio..." indicator
    elapsed += durations.identityHoldMs;
    timers.push(
      window.setTimeout(() => {
        setStage({ type: 'entering' });
      }, elapsed)
    );

    // Complete transition into desktop
    elapsed += durations.enteringHoldMs;
    timers.push(
      window.setTimeout(() => {
        finishIntro();
      }, elapsed)
    );

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion]);

  const currentGreeting =
    stage.type === 'greeting' ? GREETINGS[stage.index] : null;

  return (
    <motion.div
      data-testid="welcome-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: prefersReducedMotion ? 0.05 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#E8EDFA] via-[#EEF2FF] to-[#E5DFFA] px-6 text-[#111827] dark:from-[#0B1020] dark:via-[#111831] dark:to-[#171330] dark:text-[#F8FAFC]"
    >
      {/* Subtle macOS ambient light diffusion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#2563EB]/16 via-[#8B5CF6]/18 to-[#60A5FA]/14 blur-3xl dark:from-[#2563EB]/22 dark:via-[#8B5CF6]/20 dark:to-[#3B82F6]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/12 blur-3xl dark:bg-[#8B5CF6]/18"
      />

      {/* Centered Cinematic Typography Stage */}
      <div className="relative z-10 flex min-h-[240px] w-full max-w-3xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {stage.type === 'greeting' && currentGreeting && (
            <motion.div
              key={currentGreeting.id}
              lang={currentGreeting.lang}
              dir={currentGreeting.dir}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, y: -8 }}
              transition={{
                duration: durations.greetingTransitionMs / 1000,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center justify-center"
            >
              <span
                className="select-none text-6xl font-semibold tracking-tight text-[#111827] sm:text-7xl md:text-8xl dark:text-[#F8FAFC]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {currentGreeting.text}
              </span>
            </motion.div>
          )}

          {stage.type === 'intro-lead' && (
            <motion.div
              key="intro-lead"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              <p className="text-3xl font-medium tracking-tight text-[#1E293B] sm:text-4xl dark:text-[#E2E8F0]">
                Hello, I&apos;m
              </p>
            </motion.div>
          )}

          {(stage.type === 'identity' || stage.type === 'entering') && (
            <motion.div
              key="identity-stage"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              <p className="mb-2 text-lg font-medium text-[#64748B] sm:text-xl dark:text-[#94A3B8]">
                Hello, I&apos;m
              </p>
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-[#111827] sm:text-6xl md:text-7xl dark:text-[#F8FAFC]">
                Abdillah Faiz
              </h1>
              <p className="mt-4 max-w-xl text-balance text-lg font-medium text-[#2563EB] sm:text-xl dark:text-[#93C5FD]">
                Mobile Developer. Backend Enthusiast. Problem Solver.
              </p>
              <p className="mt-2 text-sm font-normal text-[#64748B] sm:text-base dark:text-[#94A3B8]">
                Welcome to my digital space.
              </p>

              <div className="mt-8 h-6">
                {stage.type === 'entering' && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.05 : 0.35 }}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#475569] dark:text-[#CBD5E1]"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#2563EB]/30 border-t-[#2563EB] dark:border-[#93C5FD]/30 dark:border-t-[#93C5FD]"
                    />
                    <span>Entering Portfolio...</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Skip Intro Control */}
      <div className="fixed bottom-8 right-8 z-20">
        <button
          type="button"
          onClick={finishIntro}
          className="min-h-[40px] rounded-lg px-4 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-white/50 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-[#CBD5E1] dark:hover:bg-white/10 dark:hover:text-white"
        >
          Skip Intro
        </button>
      </div>
    </motion.div>
  );
}
