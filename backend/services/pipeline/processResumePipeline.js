import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const COMMON_SKILLS = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "Redux",
  "Next.js",
  "Docker",
  "AWS",
  "Git",
  "GitHub",
  "REST API",
  "Firebase",
  "Python",
  "Java",
];

const extractEmail = (text) => {
  const match = text.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );

  return match ? match[0] : "";
};

const extractPhone = (text) => {
  const match = text.match(
    /(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}/
  );

  return match ? match[0] : "";
};

const extractSkills = (text) => {
  const detectedSkills = [];

  COMMON_SKILLS.forEach((skill) => {
    if (
      text.toLowerCase().includes(skill.toLowerCase())
    ) {
      detectedSkills.push(skill);
    }
  });

  return [...new Set(detectedSkills)];
};

export const processResumePipeline = async (
  filePath
) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdf(dataBuffer);

    const rawText = pdfData.text;

    const cleanedText = rawText
      .replace(/\s+/g, " ")
      .trim();

    const lines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const extractedName =
      lines[0]
        ?.replace(/[^a-zA-Z\s]/g, "")
        ?.trim()
        ?.slice(0, 60) ||
      "Unnamed Candidate";

    const extractedSkills =
      extractSkills(cleanedText);

    return {
      rawText: cleanedText,

      extractedName,

      extractedEmail:
        extractEmail(cleanedText),

      extractedPhone:
        extractPhone(cleanedText),

      extractedSkills,
    };
  } catch (error) {
    console.error(
      "Resume Pipeline Processing Error:",
      error
    );

    throw new Error(
      "Resume processing failed."
    );
  }
};