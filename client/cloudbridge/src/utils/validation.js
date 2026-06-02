/**
 * Frontend Validation Utilities
 * Provides reusable validation functions for email and password
 */

// Email regex pattern - standard RFC 5322 simplified regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Constants
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== "string") {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
    };
  }

  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return {
      isValid: false,
      error: "Email is required.",
    };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return {
      isValid: false,
      error: "Please enter a valid email address.",
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates password length
 * @param {string} password - Password to validate
 * @returns {object} - { isValid: boolean, error: string | null }
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== "string") {
    return {
      isValid: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates login credentials
 * @param {object} credentials - { email: string, password: string }
 * @returns {object} - { isValid: boolean, errors: { email?: string, password?: string } }
 */
export const validateLoginCredentials = (credentials) => {
  const errors = {};

  const emailValidation = validateEmail(credentials.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(credentials.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates registration data
 * @param {object} data - { name: string, email: string, password: string, companyName?: string }
 * @returns {object} - { isValid: boolean, errors: { field: string } }
 */
export const validateRegistrationData = (data) => {
  const errors = {};

  // Validate name
  if (!data.name || !data.name.trim()) {
    errors.name = "Full name is required.";
  }

  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  // Validate company name if needed
  if (data.accountType === "company" || data.accountType === "COMPANY") {
    if (!data.companyName || !data.companyName.trim()) {
      errors.companyName = "Company name is required.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
