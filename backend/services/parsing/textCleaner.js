const cleanResumeText = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    return "";
  }

  let cleanedText = rawText;

  // Remove excessive spaces
  cleanedText = cleanedText.replace(/[ \t]+/g, " ");

  // Normalize multiple line breaks
  cleanedText = cleanedText.replace(/\n\s*\n/g, "\n\n");

  // Remove leading/trailing whitespace
  cleanedText = cleanedText.trim();

  return cleanedText;
};

export default cleanResumeText;