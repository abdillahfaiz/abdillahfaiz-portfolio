import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  closeWindow,
  computeResizedRect,
  createInitialDesktopState,
  focusWindow,
  minimizeWindow,
  moveWindow,
  openOrFocusWindow,
  resizeWindow,
  toggleMaximizeWindow,
} from './windowManager';

const DESKTOP_BOUNDS = { width: 1440, height: 900 };

test('initial desktop state opens only portfolio window as active with spacious sizing', () => {
  const state = createInitialDesktopState(DESKTOP_BOUNDS);
  assert.equal(state.activeWindowId, 'portfolio');
  assert.equal(state.windows.portfolio.isOpen, true);
  assert.equal(state.windows.projects.isOpen, false);
  assert.ok(state.windows.about.width >= 940);
  assert.ok(state.windows.about.height >= 600);
});

test('openOrFocusWindow reuses existing window without creating duplicates and increments zIndex', () => {
  let state = createInitialDesktopState(DESKTOP_BOUNDS);
  state = openOrFocusWindow(state, 'projects');
  assert.equal(state.activeWindowId, 'projects');
  assert.equal(state.windows.projects.isOpen, true);
  const projectsZ = state.windows.projects.zIndex;

  state = openOrFocusWindow(state, 'about');
  assert.equal(state.activeWindowId, 'about');
  assert.ok(state.windows.about.zIndex > projectsZ);

  // Re-opening projects focuses it cleanly and restores if minimized
  state = minimizeWindow(state, 'projects');
  assert.equal(state.windows.projects.isMinimized, true);
  state = openOrFocusWindow(state, 'projects');
  assert.equal(state.windows.projects.isMinimized, false);
  assert.equal(state.activeWindowId, 'projects');
});

test('closing or minimizing active window promotes next highest visible window', () => {
  let state = createInitialDesktopState(DESKTOP_BOUNDS);
  state = openOrFocusWindow(state, 'about');
  state = openOrFocusWindow(state, 'contact');
  assert.equal(state.activeWindowId, 'contact');

  state = closeWindow(state, 'contact');
  assert.equal(state.windows.contact.isOpen, false);
  assert.equal(state.activeWindowId, 'about');

  state = minimizeWindow(state, 'about');
  assert.equal(state.windows.about.isMinimized, true);
  assert.equal(state.activeWindowId, 'portfolio');
});

test('toggleMaximizeWindow toggles maximized state and focuses window', () => {
  let state = createInitialDesktopState(DESKTOP_BOUNDS);
  state = openOrFocusWindow(state, 'skills');
  assert.equal(state.windows.skills.isMaximized, false);

  state = toggleMaximizeWindow(state, 'skills');
  assert.equal(state.windows.skills.isMaximized, true);

  state = toggleMaximizeWindow(state, 'skills');
  assert.equal(state.windows.skills.isMaximized, false);
});

test('focusWindow brings background window to front and moveWindow clamps within safe bounds', () => {
  let state = createInitialDesktopState(DESKTOP_BOUNDS);
  state = openOrFocusWindow(state, 'experience');
  state = focusWindow(state, 'portfolio');
  assert.equal(state.activeWindowId, 'portfolio');

  state = moveWindow(state, 'portfolio', 200, -50, DESKTOP_BOUNDS);
  assert.ok(state.windows.portfolio.y >= 44, 'y should be clamped below top menu bar');

  state = moveWindow(state, 'portfolio', 5000, 5000, DESKTOP_BOUNDS);
  assert.ok(state.windows.portfolio.x < DESKTOP_BOUNDS.width);
  assert.ok(state.windows.portfolio.y < DESKTOP_BOUNDS.height - 88);
});

test('computeResizedRect & resizeWindow enforce minimum sizes and anchor opposite edges', () => {
  let state = createInitialDesktopState(DESKTOP_BOUNDS);
  const origin = { x: 240, y: 100, width: 900, height: 580 };

  // Shrinking from bottom-right respects minimum size
  const shrunkSe = computeResizedRect(origin, 'se', -800, -800, DESKTOP_BOUNDS);
  assert.equal(shrunkSe.width, MIN_WINDOW_WIDTH);
  assert.equal(shrunkSe.height, MIN_WINDOW_HEIGHT);
  assert.equal(shrunkSe.x, origin.x);
  assert.equal(shrunkSe.y, origin.y);

  // Shrinking from top-left anchors right and bottom edges
  const shrunkNw = computeResizedRect(origin, 'nw', 800, 800, DESKTOP_BOUNDS);
  assert.equal(shrunkNw.width, MIN_WINDOW_WIDTH);
  assert.equal(shrunkNw.height, MIN_WINDOW_HEIGHT);
  assert.equal(shrunkNw.x + shrunkNw.width, origin.x + origin.width);
  assert.equal(shrunkNw.y + shrunkNw.height, origin.y + origin.height);

  // Expanding updates window state cleanly
  const expanded = computeResizedRect(origin, 'se', 120, 80, DESKTOP_BOUNDS);
  state = resizeWindow(state, 'portfolio', expanded, DESKTOP_BOUNDS);
  assert.equal(state.windows.portfolio.width, 1020);
  assert.equal(state.windows.portfolio.height, 660);
});
