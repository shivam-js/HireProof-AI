const cleanLines = (
  text = ""
) => {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const extractSection = (
  lines,
  keywords
) => {
  const section = [];

  let capture = false;

  for (const line of lines) {
    const lower =
      line.toLowerCase();

    if (
      keywords.some((keyword) =>
        lower.includes(keyword)
      )
    ) {
      capture = true;
      continue;
    }

    const isNewSection =
      [
        "education",
        "skills",
        "projects",
        "experience",
        "certifications",
        "internship",
        "profile",
        "summary",
      ].some((sectionKeyword) =>
        lower.includes(sectionKeyword)
      );

    if (
      capture &&
      isNewSection
    ) {
      break;
    }

    if (capture) {
      section.push(line);
    }
  }

  return section;
};

export const extractResumeSections = (
  resumeText = ""
) => {
  const lines =
    cleanLines(resumeText);

  return {
    profile: extractSection(
      lines,
      ["profile", "summary"]
    ),

    skills: extractSection(
      lines,
      ["skills", "technical skills"]
    ),

    projects: extractSection(
      lines,
      ["projects"]
    ),

    experience: extractSection(
      lines,
      [
        "experience",
        "internship",
      ]
    ),

    education: extractSection(
      lines,
      ["education"]
    ),

    certifications:
      extractSection(lines, [
        "certifications",
        "certificate",
      ]),
  };
};