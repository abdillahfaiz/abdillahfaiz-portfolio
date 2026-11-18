import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { ASSETS, PROJECTS } from './data/portfolioContent';
import { DesktopIcons } from './components/DesktopIcons';
import { Dock } from './components/Dock';
import { MacWindow } from './components/MacWindow';
import { MenuBar } from './components/MenuBar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AboutWindow } from './components/windows/AboutWindow';
import { ContactWindow } from './components/windows/ContactWindow';
import { ExperienceWindow } from './components/windows/ExperienceWindow';
import { PortfolioWindow } from './components/windows/PortfolioWindow';
import { ProjectDetailWindow } from './components/windows/ProjectDetailWindow';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { ResumeWindow } from './components/windows/ResumeWindow';
import { SkillsWindow } from './components/windows/SkillsWindow';
import { shouldShowWelcome } from './utils/welcomeSequence';
import {
  closeWindow,
  createInitialDesktopState,
  focusWindow,
  minimizeWindow,
  moveWindow,
  openOrFocusWindow,
  resizeWindow,
  toggleMaximizeWindow,
  type DesktopState,
  type ViewportBounds,
  type WindowId,
  type WindowRect,
} from './utils/windowManager';

const THEME_STORAGE_KEY = 'abdillah_portfolio_theme_v1';

function getViewportBounds(): ViewportBounds {
  if (typeof window === 'undefined') {
    return { width: 1440, height: 900 };
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    topBarHeight: 36,
    dockHeight: 88,
  };
}

function readInitialWelcomeVisibility(): boolean {
  if (typeof window === 'undefined') return true;
  const params = new URLSearchParams(window.location.search);
  const autostartParam = params.get('autostart');
  return shouldShowWelcome({
    storageValue: null,
    autostartParam,
    forceReplay: false,
  });
}

function readInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    // ignore storage errors
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState<boolean>(() =>
    readInitialWelcomeVisibility()
  );
  const [welcomeKey, setWelcomeKey] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => readInitialTheme());
  const [bounds, setBounds] = useState<ViewportBounds>(() => getViewportBounds());
  const [desktop, setDesktop] = useState<DesktopState>(() =>
    createInitialDesktopState(getViewportBounds())
  );
  const [projectDetailTab, setProjectDetailTab] = useState<
    'overview' | 'architecture'
  >('overview');
  const [contactSubjectPrefill, setContactSubjectPrefill] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setBounds(getViewportBounds());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = bounds.width < 768;

  const handleCompleteWelcome = useCallback(() => {
    setShowWelcome(false);
  }, []);

  const handleReplayWelcome = useCallback(() => {
    setWelcomeKey((k) => k + 1);
    setShowWelcome(true);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const handleOpenWindow = useCallback((id: WindowId) => {
    setDesktop((prev) => openOrFocusWindow(prev, id));
  }, []);

  const handleCloseWindow = useCallback((id: WindowId) => {
    setDesktop((prev) => closeWindow(prev, id));
  }, []);

  const handleMinimizeWindow = useCallback((id: WindowId) => {
    setDesktop((prev) => minimizeWindow(prev, id));
  }, []);

  const handleToggleMaximize = useCallback((id: WindowId) => {
    setDesktop((prev) => toggleMaximizeWindow(prev, id));
  }, []);

  const handleFocusWindow = useCallback((id: WindowId) => {
    setDesktop((prev) => focusWindow(prev, id));
  }, []);

  const handleMoveWindow = useCallback(
    (id: WindowId, x: number, y: number) => {
      setDesktop((prev) => moveWindow(prev, id, x, y, bounds));
    },
    [bounds]
  );

  const handleResizeWindow = useCallback(
    (id: WindowId, rect: WindowRect) => {
      setDesktop((prev) => resizeWindow(prev, id, rect, bounds));
    },
    [bounds]
  );

  const handleSelectProject = useCallback(
    (projectId: string, initialTab: 'overview' | 'architecture' = 'overview') => {
      setProjectDetailTab(initialTab);
      const matched = PROJECTS.find((p) => p.id === projectId);
      const displayName =
        matched?.name ?? projectId.charAt(0).toUpperCase() + projectId.slice(1);
      setDesktop((prev) =>
        openOrFocusWindow(prev, 'project-detail', {
          projectId,
          title: `Preview — ${displayName}`,
        })
      );
    },
    []
  );

  const handleContactAboutProject = useCallback((projectName: string) => {
    setContactSubjectPrefill(`Inquiry about ${projectName}`);
    setDesktop((prev) => openOrFocusWindow(prev, 'contact'));
  }, []);

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case 'portfolio':
        return (
          <PortfolioWindow
            onOpenWindow={handleOpenWindow}
            onReplayWelcome={handleReplayWelcome}
          />
        );
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow onSelectProject={handleSelectProject} />;
      case 'project-detail':
        return (
          <ProjectDetailWindow
            projectId={desktop.selectedProjectId}
            initialTab={projectDetailTab}
            onBackToProjects={() => handleOpenWindow('projects')}
            onContactAboutProject={handleContactAboutProject}
          />
        );
      case 'skills':
        return <SkillsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'contact':
        return <ContactWindow prefillSubject={contactSubjectPrefill} />;
      case 'resume':
        return <ResumeWindow />;
    }
  };

  const windowIds = Object.keys(desktop.windows) as WindowId[];

  return (
    <div
      data-testid="desktop-root"
      data-theme={theme}
      className="relative h-screen w-screen overflow-hidden bg-[#E8EDFA] text-[#111827] dark:bg-[#0B1020] dark:text-[#F1F5F9]"
    >
      {/* Abstract macOS Sonoma/Sequoia Inspired Wallpaper & Ambient Light */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <img
          src={ASSETS.wallpaperLight}
          alt=""
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover opacity-90 transition-opacity duration-500 dark:opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8EDFA]/45 via-transparent to-[#8B5CF6]/18 dark:from-[#0B1020]/75 dark:via-[#111831]/65 dark:to-[#1E1B4B]/75" />
        {/* Soft translucent ambient shapes */}
        <div className="absolute -left-24 top-1/4 h-96 w-96 rounded-full bg-[#2563EB]/12 blur-3xl dark:bg-[#2563EB]/20" />
        <div className="absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-[#8B5CF6]/15 blur-3xl dark:bg-[#8B5CF6]/20" />
      </div>

      {/* Desktop Environment (mounted beneath welcome screen for seamless crossfade) */}
      <div
        aria-hidden={showWelcome}
        className={showWelcome ? 'pointer-events-none opacity-0' : 'opacity-100 transition-opacity duration-300'}
      >
        <MenuBar
          activeWindowId={desktop.activeWindowId}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenWindow={handleOpenWindow}
          onReplayWelcome={handleReplayWelcome}
        />

        <main className="relative z-10 h-screen w-screen pt-9">
          <DesktopIcons onOpenWindow={handleOpenWindow} />

          {/* Empty desktop fallback hint if user closes all windows */}
          {windowIds.every(
            (id) => !desktop.windows[id].isOpen || desktop.windows[id].isMinimized
          ) && (
            <div className="flex h-[calc(100%-6rem)] flex-col items-center justify-center px-6 text-center">
              <div className="max-w-sm rounded-2xl border border-white/60 bg-[rgba(255,255,255,0.68)] p-6 shadow-xl backdrop-blur-2xl dark:border-white/15 dark:bg-[rgba(20,26,42,0.78)]">
                <p className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                  Desktop Workspace Ready
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                  Select any app from the Dock below or desktop shortcuts to open a window.
                </p>
                <button
                  type="button"
                  onClick={() => handleOpenWindow('portfolio')}
                  className="mt-4 min-h-[38px] rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                >
                  Open Main Portfolio
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {windowIds.map((id) => {
              const win = desktop.windows[id];
              if (!win.isOpen || win.isMinimized) return null;
              return (
                <MacWindow
                  key={id}
                  win={win}
                  isActive={desktop.activeWindowId === id}
                  isMobile={isMobile}
                  bounds={bounds}
                  onFocus={handleFocusWindow}
                  onClose={handleCloseWindow}
                  onMinimize={handleMinimizeWindow}
                  onToggleMaximize={handleToggleMaximize}
                  onMove={handleMoveWindow}
                  onResize={handleResizeWindow}
                >
                  {renderWindowContent(id)}
                </MacWindow>
              );
            })}
          </AnimatePresence>
        </main>

        <Dock
          windows={desktop.windows}
          activeWindowId={desktop.activeWindowId}
          onOpenWindow={handleOpenWindow}
        />
      </div>

      {/* First-Visit macOS Hello Welcome Sequence */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen
            key={welcomeKey}
            onComplete={handleCompleteWelcome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
