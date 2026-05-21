const extractEmail = (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    return null;
  }

  // Email regex pattern
  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i;

  const match = resumeText.match(emailRegex);

  return match ? match[0] : null;
};

export default extractEmail;