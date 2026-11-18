export interface GreetingItem {
  id: string;
  text: string;
  lang: string;
  dir: 'ltr' | 'rtl';
  languageLabel: string;
}

export const WELCOME_STORAGE_KEY = 'abdillah_portfolio_welcome_completed_v1';

export const GREETINGS: GreetingItem[] = [
  { id: 'en', text: 'Hello', lang: 'en', dir: 'ltr', languageLabel: 'English' },
  { id: 'ja', text: 'こんにちは', lang: 'ja', dir: 'ltr', languageLabel: 'Japanese' },
  { id: 'ar', text: 'مرحباً', lang: 'ar', dir: 'rtl', languageLabel: 'Arabic' },
  { id: 'id', text: 'Halo', lang: 'id', dir: 'ltr', languageLabel: 'Indonesian' },
];

export interface WelcomeVisibilityInput {
  storageValue: string | null;
  autostartParam: string | null;
  forceReplay: boolean;
}

export function shouldShowWelcome(input: WelcomeVisibilityInput): boolean {
  if (input.forceReplay) return true;
  if (input.autostartParam === '1' || input.autostartParam === 'true') return false;
  return true;
}

export interface WelcomeDurations {
  greetingStepMs: number;
  greetingTransitionMs: number;
  introHoldMs: number;
  identityHoldMs: number;
  enteringHoldMs: number;
}

export function getWelcomeDurations(prefersReducedMotion: boolean): WelcomeDurations {
  if (prefersReducedMotion) {
    return {
      greetingStepMs: 650,
      greetingTransitionMs: 50,
      introHoldMs: 550,
      identityHoldMs: 900,
      enteringHoldMs: 600,
    };
  }

  return {
    greetingStepMs: 1250,
    greetingTransitionMs: 420,
    introHoldMs: 1100,
    identityHoldMs: 2200,
    enteringHoldMs: 1150,
  };
}
