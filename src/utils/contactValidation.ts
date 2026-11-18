export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactFormErrors;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactFormValues): ContactValidationResult {
  const errors: ContactFormErrors = {};

  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedSubject = values.subject.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name should be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!trimmedSubject) {
    errors.subject = 'Please add a short subject.';
  } else if (trimmedSubject.length < 3) {
    errors.subject = 'Subject should be at least 3 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please write a message before sending.';
  } else if (trimmedMessage.length < 10) {
    errors.message = 'Message should be at least 10 characters so I have enough context.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
