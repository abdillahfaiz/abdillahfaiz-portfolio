export type WindowId =
  | 'portfolio'
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'skills'
  | 'experience'
  | 'contact'
  | 'resume';

export interface WindowInstance {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface DesktopState {
  windows: Record<WindowId, WindowInstance>;
  activeWindowId: WindowId | null;
  topZIndex: number;
  selectedProjectId: string;
}

export interface ViewportBounds {
  width: number;
  height: number;
  topBarHeight?: number;
  dockHeight?: number;
}

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const MIN_WINDOW_WIDTH = 480;
export const MIN_WINDOW_HEIGHT = 340;

export const DEFAULT_WINDOW_SPECS: Record<
  WindowId,
  {
    title: string;
    width: number;
    height: number;
    widthRatio: number;
    heightRatio: number;
    offsetX: number;
    offsetY: number;
  }
> = {
  portfolio: {
    title: 'Abdillah Faiz — Portfolio',
    width: 1040,
    height: 660,
    widthRatio: 0.78,
    heightRatio: 0.85,
    offsetX: 24,
    offsetY: -2,
  },
  about: {
    title: 'Finder — About Me',
    width: 980,
    height: 640,
    widthRatio: 0.74,
    heightRatio: 0.83,
    offsetX: -12,
    offsetY: 8,
  },
  projects: {
    title: 'Finder — Projects',
    width: 1040,
    height: 660,
    widthRatio: 0.8,
    heightRatio: 0.86,
    offsetX: 28,
    offsetY: 6,
  },
  'project-detail': {
    title: 'Project Preview',
    width: 960,
    height: 640,
    widthRatio: 0.74,
    heightRatio: 0.83,
    offsetX: 44,
    offsetY: 14,
  },
  skills: {
    title: 'System Settings — Skills',
    width: 980,
    height: 640,
    widthRatio: 0.74,
    heightRatio: 0.83,
    offsetX: 0,
    offsetY: 12,
  },
  experience: {
    title: 'Experience — Timeline',
    width: 940,
    height: 620,
    widthRatio: 0.72,
    heightRatio: 0.8,
    offsetX: 34,
    offsetY: 8,
  },
  contact: {
    title: 'Mail — Contact Abdillah Faiz',
    width: 940,
    height: 620,
    widthRatio: 0.72,
    heightRatio: 0.8,
    offsetX: -16,
    offsetY: 12,
  },
  resume: {
    title: 'Preview — Resume.pdf',
    width: 900,
    height: 650,
    widthRatio: 0.7,
    heightRatio: 0.84,
    offsetX: 22,
    offsetY: 0,
  },
};

export function clampWindowPosition(
  x: number,
  y: number,
  width: number,
  height: number,
  bounds: ViewportBounds
): { x: number; y: number } {
  const topBar = bounds.topBarHeight ?? 36;
  const dock = bounds.dockHeight ?? 88;
  const minVisibleWidth = 160;
  const minX = -Math.max(0, width - minVisibleWidth);
  const maxX = Math.max(16, bounds.width - minVisibleWidth);
  const minY = topBar + 8;
  const maxY = Math.max(minY, bounds.height - dock - 48);

  return {
    x: Math.round(Math.min(Math.max(x, minX), maxX)),
    y: Math.round(Math.min(Math.max(y, minY), maxY)),
  };
}

export function computeResizedRect(
  origin: WindowRect,
  direction: ResizeDirection,
  dx: number,
  dy: number,
  bounds: ViewportBounds
): WindowRect {
  const topBar = bounds.topBarHeight ?? 36;
  const dock = bounds.dockHeight ?? 88;
  const minW = Math.min(MIN_WINDOW_WIDTH, Math.max(280, bounds.width - 24));
  const minH = Math.min(MIN_WINDOW_HEIGHT, Math.max(240, bounds.height - topBar - dock - 16));
  const minLeft = 8;
  const maxRight = Math.max(minLeft + minW, bounds.width - 8);
  const minTop = topBar + 6;
  const maxBottom = Math.max(minTop + minH, bounds.height - dock - 6);

  let nextX = origin.x;
  let nextY = origin.y;
  let nextWidth = origin.width;
  let nextHeight = origin.height;

  if (direction.includes('e')) {
    const maxW = Math.max(minW, maxRight - origin.x);
    nextWidth = Math.min(Math.max(origin.width + dx, minW), maxW);
  }

  if (direction.includes('w')) {
    const rightEdge = origin.x + origin.width;
    const rawLeft = origin.x + dx;
    const clampedLeft = Math.min(Math.max(rawLeft, minLeft), rightEdge - minW);
    nextX = clampedLeft;
    nextWidth = rightEdge - clampedLeft;
  }

  if (direction.includes('s')) {
    const maxH = Math.max(minH, maxBottom - origin.y);
    nextHeight = Math.min(Math.max(origin.height + dy, minH), maxH);
  }

  if (direction.includes('n')) {
    const bottomEdge = origin.y + origin.height;
    const rawTop = origin.y + dy;
    const clampedTop = Math.min(Math.max(rawTop, minTop), bottomEdge - minH);
    nextY = clampedTop;
    nextHeight = bottomEdge - clampedTop;
  }

  return {
    x: Math.round(nextX),
    y: Math.round(nextY),
    width: Math.round(nextWidth),
    height: Math.round(nextHeight),
  };
}

export function createInitialDesktopState(bounds: ViewportBounds): DesktopState {
  const topBar = bounds.topBarHeight ?? 36;
  const dock = bounds.dockHeight ?? 88;
  const usableHeight = Math.max(360, bounds.height - topBar - dock - 20);
  const usableWidth = Math.max(340, bounds.width - 156);

  const windows = {} as Record<WindowId, WindowInstance>;
  const ids = Object.keys(DEFAULT_WINDOW_SPECS) as WindowId[];

  ids.forEach((id, index) => {
    const spec = DEFAULT_WINDOW_SPECS[id];
    const targetWidth = Math.max(spec.width, Math.round(usableWidth * spec.widthRatio));
    const targetHeight = Math.max(spec.height, Math.round(usableHeight * spec.heightRatio));
    const width = Math.min(targetWidth, usableWidth);
    const height = Math.min(targetHeight, usableHeight);
    const centerX = Math.round((bounds.width - width) / 2 + spec.offsetX);
    const centerY = Math.round(
      topBar + Math.max(10, (usableHeight - height) / 2) + spec.offsetY
    );
    const clamped = clampWindowPosition(centerX, centerY, width, height, bounds);

    windows[id] = {
      id,
      title: spec.title,
      isOpen: id === 'portfolio',
      isMinimized: false,
      isMaximized: false,
      x: clamped.x,
      y: clamped.y,
      width,
      height,
      zIndex: id === 'portfolio' ? 20 : 10 + index,
    };
  });

  return {
    windows,
    activeWindowId: 'portfolio',
    topZIndex: 20,
    selectedProjectId: 'harmone',
  };
}

function findNextVisibleWindowId(
  windows: Record<WindowId, WindowInstance>,
  excludeId?: WindowId
): WindowId | null {
  let topId: WindowId | null = null;
  let maxZ = -1;

  (Object.values(windows) as WindowInstance[]).forEach((win) => {
    if (win.id !== excludeId && win.isOpen && !win.isMinimized && win.zIndex > maxZ) {
      maxZ = win.zIndex;
      topId = win.id;
    }
  });

  return topId;
}

export function openOrFocusWindow(
  state: DesktopState,
  id: WindowId,
  options?: { projectId?: string; title?: string }
): DesktopState {
  const existing = state.windows[id];
  const nextZ = state.topZIndex + 1;

  return {
    ...state,
    topZIndex: nextZ,
    activeWindowId: id,
    selectedProjectId: options?.projectId ?? state.selectedProjectId,
    windows: {
      ...state.windows,
      [id]: {
        ...existing,
        title: options?.title ?? existing.title,
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    },
  };
}

export function closeWindow(state: DesktopState, id: WindowId): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen) return state;

  const updatedWindows: Record<WindowId, WindowInstance> = {
    ...state.windows,
    [id]: {
      ...existing,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
    },
  };

  const nextActive =
    state.activeWindowId === id
      ? findNextVisibleWindowId(updatedWindows, id)
      : state.activeWindowId;

  return {
    ...state,
    windows: updatedWindows,
    activeWindowId: nextActive,
  };
}

export function minimizeWindow(state: DesktopState, id: WindowId): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen || existing.isMinimized) return state;

  const updatedWindows: Record<WindowId, WindowInstance> = {
    ...state.windows,
    [id]: {
      ...existing,
      isMinimized: true,
    },
  };

  const nextActive =
    state.activeWindowId === id
      ? findNextVisibleWindowId(updatedWindows, id)
      : state.activeWindowId;

  return {
    ...state,
    windows: updatedWindows,
    activeWindowId: nextActive,
  };
}

export function toggleMaximizeWindow(state: DesktopState, id: WindowId): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen) return state;

  const nextZ = state.topZIndex + 1;

  return {
    ...state,
    topZIndex: nextZ,
    activeWindowId: id,
    windows: {
      ...state.windows,
      [id]: {
        ...existing,
        isMinimized: false,
        isMaximized: !existing.isMaximized,
        zIndex: nextZ,
      },
    },
  };
}

export function focusWindow(state: DesktopState, id: WindowId): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen) return state;
  if (state.activeWindowId === id && !existing.isMinimized) return state;

  const nextZ = state.topZIndex + 1;

  return {
    ...state,
    topZIndex: nextZ,
    activeWindowId: id,
    windows: {
      ...state.windows,
      [id]: {
        ...existing,
        isMinimized: false,
        zIndex: nextZ,
      },
    },
  };
}

export function moveWindow(
  state: DesktopState,
  id: WindowId,
  x: number,
  y: number,
  bounds: ViewportBounds
): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen || existing.isMaximized) return state;

  const clamped = clampWindowPosition(x, y, existing.width, existing.height, bounds);

  return {
    ...state,
    windows: {
      ...state.windows,
      [id]: {
        ...existing,
        x: clamped.x,
        y: clamped.y,
      },
    },
  };
}

export function resizeWindow(
  state: DesktopState,
  id: WindowId,
  rect: WindowRect,
  bounds: ViewportBounds
): DesktopState {
  const existing = state.windows[id];
  if (!existing.isOpen || existing.isMaximized) return state;

  const topBar = bounds.topBarHeight ?? 36;
  const dock = bounds.dockHeight ?? 88;
  const minW = Math.min(MIN_WINDOW_WIDTH, Math.max(280, bounds.width - 24));
  const minH = Math.min(MIN_WINDOW_HEIGHT, Math.max(240, bounds.height - topBar - dock - 16));

  const width = Math.round(Math.min(Math.max(rect.width, minW), bounds.width - 16));
  const height = Math.round(
    Math.min(Math.max(rect.height, minH), bounds.height - topBar - dock - 12)
  );
  const x = Math.round(Math.min(Math.max(rect.x, 8), Math.max(8, bounds.width - width - 8)));
  const y = Math.round(
    Math.min(Math.max(rect.y, topBar + 6), Math.max(topBar + 6, bounds.height - dock - height - 6))
  );

  return {
    ...state,
    windows: {
      ...state.windows,
      [id]: {
        ...existing,
        x,
        y,
        width,
        height,
      },
    },
  };
}
