import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import {
  computeResizedRect,
  type ResizeDirection,
  type ViewportBounds,
  type WindowId,
  type WindowInstance,
  type WindowRect,
} from '../utils/windowManager';

interface MacWindowProps {
  win: WindowInstance;
  isActive: boolean;
  isMobile: boolean;
  bounds: ViewportBounds;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onToggleMaximize: (id: WindowId) => void;
  onMove: (id: WindowId, x: number, y: number) => void;
  onResize: (id: WindowId, rect: WindowRect) => void;
  children: React.ReactNode;
}

const RESIZE_HANDLES: Array<{
  dir: ResizeDirection;
  className: string;
  label: string;
}> = [
  { dir: 'n', className: 'inset-x-3 -top-1 h-2 cursor-ns-resize', label: 'Resize top edge' },
  { dir: 's', className: 'inset-x-3 -bottom-1 h-2 cursor-ns-resize', label: 'Resize bottom edge' },
  { dir: 'e', className: 'inset-y-3 -right-1 w-2 cursor-ew-resize', label: 'Resize right edge' },
  { dir: 'w', className: 'inset-y-3 -left-1 w-2 cursor-ew-resize', label: 'Resize left edge' },
  { dir: 'nw', className: '-left-1 -top-1 h-3.5 w-3.5 cursor-nwse-resize', label: 'Resize top-left corner' },
  { dir: 'ne', className: '-right-1 -top-1 h-3.5 w-3.5 cursor-nesw-resize', label: 'Resize top-right corner' },
  { dir: 'sw', className: '-bottom-1 -left-1 h-3.5 w-3.5 cursor-nesw-resize', label: 'Resize bottom-left corner' },
  { dir: 'se', className: '-bottom-0.5 -right-0.5 h-4 w-4 cursor-nwse-resize', label: 'Resize bottom-right corner' },
];

export function MacWindow({
  win,
  isActive,
  isMobile,
  bounds,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  onResize,
  children,
}: MacWindowProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const dragStateRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const resizeStateRef = useRef<{
    resizing: boolean;
    direction: ResizeDirection;
    startX: number;
    startY: number;
    originRect: WindowRect;
  } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const resize = resizeStateRef.current;
      if (resize && resize.resizing) {
        const dx = e.clientX - resize.startX;
        const dy = e.clientY - resize.startY;
        const nextRect = computeResizedRect(
          resize.originRect,
          resize.direction,
          dx,
          dy,
          bounds
        );
        onResize(win.id, nextRect);
        return;
      }

      const drag = dragStateRef.current;
      if (!drag || !drag.dragging) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      onMove(win.id, drag.originX + dx, drag.originY + dy);
    };

    const handlePointerUp = () => {
      if (dragStateRef.current) {
        dragStateRef.current.dragging = false;
      }
      if (resizeStateRef.current) {
        resizeStateRef.current.resizing = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [win.id, bounds, onMove, onResize]);

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const handleTitleBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || win.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus(win.id);
    dragStateRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      originX: win.x,
      originY: win.y,
    };
  };

  const handleResizePointerDown = (
    direction: ResizeDirection,
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (isMobile || win.isMaximized) return;
    e.stopPropagation();
    e.preventDefault();
    onFocus(win.id);
    resizeStateRef.current = {
      resizing: true,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      originRect: {
        x: win.x,
        y: win.y,
        width: win.width,
        height: win.height,
      },
    };
  };

  if (isMobile) {
    return (
      <motion.section
        aria-label={win.title}
        data-testid={`window-${win.id}`}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: prefersReducedMotion ? 0.05 : 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: win.zIndex }}
        className="fixed inset-x-0 bottom-16 top-10 z-30 flex flex-col overflow-hidden rounded-t-2xl border-t border-white/50 bg-[rgba(255,255,255,0.88)] shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[rgba(17,24,39,0.92)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-900/8 px-4 py-2.5 dark:border-white/10">
          <h2 className="truncate text-sm font-semibold text-[#111827] dark:text-[#F1F5F9]">
            {win.title}
          </h2>
          <button
            type="button"
            onClick={() => onClose(win.id)}
            aria-label={`Close ${win.title}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/5 text-[#475569] transition-colors hover:bg-slate-900/10 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="macos-scroll flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </motion.section>
    );
  }

  const topOffset = bounds.topBarHeight ?? 36;
  const dockOffset = bounds.dockHeight ?? 88;
  const desktopStyle: React.CSSProperties = win.isMaximized
    ? {
        left: 12,
        top: topOffset + 8,
        width: Math.max(320, bounds.width - 24),
        height: Math.max(360, bounds.height - topOffset - dockOffset - 16),
        zIndex: win.zIndex,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <motion.section
      aria-label={win.title}
      data-testid={`window-${win.id}`}
      onPointerDown={() => onFocus(win.id)}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: prefersReducedMotion ? 0.05 : 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={desktopStyle}
      className={`fixed flex flex-col overflow-hidden rounded-2xl border backdrop-blur-2xl transition-shadow duration-200 ${
        isActive
          ? 'border-white/70 bg-[rgba(255,255,255,0.78)] shadow-[0_24px_60px_-12px_rgba(15,23,42,0.24),0_0_0_1px_rgba(255,255,255,0.35)] dark:border-white/15 dark:bg-[rgba(20,26,42,0.84)] dark:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.65)]'
          : 'border-white/50 bg-[rgba(255,255,255,0.65)] shadow-[0_14px_34px_-10px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-[rgba(20,26,42,0.72)] dark:shadow-[0_14px_34px_-10px_rgba(0,0,0,0.45)]'
      }`}
    >
      {/* macOS Title Bar */}
      <div
        onPointerDown={handleTitleBarPointerDown}
        onDoubleClick={() => onToggleMaximize(win.id)}
        className="group/titlebar flex h-11 shrink-0 cursor-grab select-none items-center justify-between border-b border-slate-900/8 bg-white/40 px-4 active:cursor-grabbing dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            aria-label={`Close ${win.title}`}
            title="Close"
            className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF5F57] text-[9px] font-bold leading-none text-[#7A0B06] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <span className="opacity-0 transition-opacity group-hover/titlebar:opacity-100 group-focus-visible/btn:opacity-100">
              ×
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            aria-label={`Minimize ${win.title}`}
            title="Minimize"
            className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FEBC2E] text-[9px] font-bold leading-none text-[#7E4D00] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <span className="opacity-0 transition-opacity group-hover/titlebar:opacity-100 group-focus-visible/btn:opacity-100">
              −
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMaximize(win.id);
            }}
            aria-label={win.isMaximized ? `Restore ${win.title}` : `Maximize ${win.title}`}
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            className="group/btn flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#28C840] text-[9px] font-bold leading-none text-[#0B5A18] ring-1 ring-black/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
          >
            <span className="opacity-0 transition-opacity group-hover/titlebar:opacity-100 group-focus-visible/btn:opacity-100">
              +
            </span>
          </button>
        </div>

        <h2 className="pointer-events-none truncate px-4 text-xs font-semibold tracking-tight text-[#1E293B] dark:text-[#E2E8F0]">
          {win.title}
        </h2>

        <div className="w-14 shrink-0" aria-hidden="true" />
      </div>

      {/* Window Content */}
      <div className="macos-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      {/* 8-Direction Resize Handles (Desktop, non-maximized) */}
      {!win.isMaximized &&
        RESIZE_HANDLES.map((handle) => (
          <div
            key={handle.dir}
            data-resize-handle={handle.dir}
            aria-label={handle.label}
            onPointerDown={(e) => handleResizePointerDown(handle.dir, e)}
            className={`absolute z-20 select-none ${handle.className}`}
          >
            {handle.dir === 'se' && (
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className="pointer-events-none absolute bottom-1 right-1 h-2.5 w-2.5 text-slate-400/70 dark:text-slate-500/70"
              >
                <path
                  d="M11 3L3 11M11 7L7 11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        ))}
    </motion.section>
  );
}
