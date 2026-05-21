export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return "";
};

export const validatePassword = (password) => {
  if (!password.trim()) return "Password is required";

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return "";
};

export const validateRequired = (value, fieldName) => {
  if (!value.trim()) return `${fieldName} is required`;

  return "";
};