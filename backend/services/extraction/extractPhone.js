const extractPhone = (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    return null;
  }

  // Supports:
  // +91-9876543210
  // 9876543210
  // +91 9876543210

  const phoneRegex =
    /(\+?\d{1,3}[-.\s]?)?\d{10}/;

  const match = resumeText.match(phoneRegex);

  return match ? match[0] : null;
};

export default extractPhone;