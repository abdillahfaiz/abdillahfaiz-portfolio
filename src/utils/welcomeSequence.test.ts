import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GREETINGS,
  getWelcomeDurations,
  shouldShowWelcome,
} from './welcomeSequence';

test('GREETINGS follows exact required multilingual sequence', () => {
  assert.deepEqual(
    GREETINGS.map((g) => g.text),
    ['Hello', 'こんにちは', 'مرحباً', 'Halo']
  );
  assert.equal(GREETINGS[2].dir, 'rtl');
});

test('shouldShowWelcome shows welcome on every visit regardless of storageValue, while respecting autostart and replay', () => {
  assert.equal(
    shouldShowWelcome({ storageValue: null, autostartParam: null, forceReplay: false }),
    true
  );
  assert.equal(
    shouldShowWelcome({ storageValue: 'completed', autostartParam: null, forceReplay: false }),
    true
  );
  assert.equal(
    shouldShowWelcome({ storageValue: null, autostartParam: '1', forceReplay: false }),
    false
  );
  assert.equal(
    shouldShowWelcome({ storageValue: 'completed', autostartParam: '1', forceReplay: true }),
    true
  );
});

test('getWelcomeDurations shortens transitions for prefers-reduced-motion', () => {
  const normal = getWelcomeDurations(false);
  const reduced = getWelcomeDurations(true);
  assert.ok(reduced.greetingStepMs < normal.greetingStepMs);
  assert.ok(reduced.greetingTransitionMs < normal.greetingTransitionMs);
});
