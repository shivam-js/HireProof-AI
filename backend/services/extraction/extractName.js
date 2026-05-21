const extractName = (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    return null;
  }

  // Split text into lines
  const lines = resumeText.split("\n");

  // Usually first non-empty line is candidate name
  const possibleName = lines.find(
    (line) => line.trim().length > 2
  );

  return possibleName ? possibleName.trim() : null;
};

export default extractName;