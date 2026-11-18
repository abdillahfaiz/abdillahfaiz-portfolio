import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from './contactValidation';

test('validateContactForm rejects empty or invalid inputs without bypassing validation', () => {
  const emptyResult = validateContactForm({
    name: '   ',
    email: '',
    subject: '',
    message: '',
  });
  assert.equal(emptyResult.isValid, false);
  assert.ok(emptyResult.errors.name);
  assert.ok(emptyResult.errors.email);
  assert.ok(emptyResult.errors.subject);
  assert.ok(emptyResult.errors.message);

  const badEmail = validateContactForm({
    name: 'Alex',
    email: 'not-an-email',
    subject: 'Project inquiry',
    message: 'Would love to collaborate on a mobile app.',
  });
  assert.equal(badEmail.isValid, false);
  assert.ok(badEmail.errors.email);
});

test('validateContactForm accepts valid complete inquiry', () => {
  const valid = validateContactForm({
    name: 'Siti Rahma',
    email: 'siti@example.com',
    subject: 'Flutter + NestJS Collaboration',
    message: 'Hi Abdillah, we would like to discuss a mobile & API project.',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});
