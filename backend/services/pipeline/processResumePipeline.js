import fs from "fs";
import pdf from "pdf-parse";
import generateInterviewQuestions from "../ai/interviewQuestionEngine.js";

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
  "Code2",
  "REST API",
  "Firebase",
  "Python",
  "Java",
];

/*
  ==========================================
  EMAIL EXTRACTION
  ==========================================
*/

const extractEmail = (text) => {
  const match = text.match(
    /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  );

  return match ? match[0] : "";
};

/*
  ==========================================
  PHONE EXTRACTION
  ==========================================
*/

const extractPhone = (text) => {
  const match = text.match(
    /(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}/
  );

  return match ? match[0] : "";
};

/*
  ==========================================
  SKILLS EXTRACTION
  ==========================================
*/

const extractSkills = (text) => {
  const detectedSkills = [];

  COMMON_SKILLS.forEach((skill) => {
    if (
      text
        .toLowerCase()
        .includes(skill.toLowerCase())
    ) {
      detectedSkills.push(skill);
    }
  });

  return [...new Set(detectedSkills)];
};

/*
  ==========================================
  PROJECT EXTRACTION
  ==========================================
*/

const extractProjects = (text) => {
  const projectKeywords = [
    "project",
    "portfolio",
    "dashboard",
    "management system",
    "web app",
    "application",
    "platform",
    "clone",
  ];

  const blockedProjectHeadings = [
    "project",
    "projects",
    "project details",
    "technical skills",
    "skills",
    "experience",
    "education",
    "internships",
    "certifications",
    "achievements",
  ];

  const detectedProjects = [];

  const lines = text
    .split("\n")
    .map((line) => line.trim());

  lines.forEach((line) => {
    const lowerLine =
      line.toLowerCase();

    const hasProjectKeyword =
      projectKeywords.some((keyword) =>
        lowerLine.includes(keyword)
      );

    const isSectionHeading =
      blockedProjectHeadings.includes(
        lowerLine
      );

    if (
      hasProjectKeyword &&
      line.length > 10 &&
      !isSectionHeading
    ) {
      detectedProjects.push(line);
    }
  });

  return [
    ...new Set(detectedProjects),
  ].slice(0, 5);
};

/*
  ==========================================
  EXPERIENCE EXTRACTION
  ==========================================
*/

const extractExperience = (
  text
) => {
  const experienceKeywords = [
    "intern",
    "internship",
    "experience",
    "developer",
    "engineer",
    "worked",
    "company",
    "software engineer",
  ];

  const detectedExperience =
    [];

  const lines = text
    .split("\n")
    .map((line) => line.trim());

  lines.forEach((line) => {
    const lowerLine =
      line.toLowerCase();

    const hasExperienceKeyword =
      experienceKeywords.some(
        (keyword) =>
          lowerLine.includes(keyword)
      );

    if (
      hasExperienceKeyword &&
      line.length > 10
    ) {
      detectedExperience.push(line);
    }
  });

  return [
    ...new Set(
      detectedExperience
    ),
  ].slice(0, 5);
};

/*
  ==========================================
  MAIN PIPELINE
  ==========================================
*/

export const processResumePipeline =
  async (filePath) => {
    try {
      const dataBuffer =
        fs.readFileSync(filePath);

      const pdfData = await pdf(
        dataBuffer
      );

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
          ?.replace(
            /[^a-zA-Z\s]/g,
            ""
          )
          ?.trim()
          ?.slice(0, 60) ||
        "Unnamed Candidate";

      const extractedSkills =
        extractSkills(cleanedText);

      /*
        ==========================================
        NEW ENHANCED EXTRACTION
        ==========================================
      */

      const projects =
        extractProjects(rawText);

      const experience =
        extractExperience(rawText);

      const interviewQuestions =
        await generateInterviewQuestions({
          extractedText: cleanedText,
          skills: extractedSkills,
          projects,
          experience,
        });

      return {
        rawText: cleanedText,

        extractedName,

        extractedEmail:
          extractEmail(cleanedText),

        extractedPhone:
          extractPhone(cleanedText),

        extractedSkills,

        /*
          ==========================================
          NEW RECRUITER INTELLIGENCE DATA
          ==========================================
        */

        projects,

        experience,

        interviewQuestions,
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