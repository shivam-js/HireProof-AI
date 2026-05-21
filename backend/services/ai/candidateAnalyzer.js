import { evaluateResumeSemantics } from "./semanticEvaluator.js";
import { extractResumeSections } from "./resumeSectionExtractor.js";
import { evaluateATSResume } from "./atsEvaluationEngine.js";


const SKILL_WEIGHTS = {
  react: 15,
  "node.js": 15,
  node: 15,
  express: 10,
  mongodb: 10,
  mongoose: 10,
  javascript: 10,
  typescript: 10,
  tailwind: 8,
  redux: 8,
  nextjs: 12,
  next: 12,
  docker: 15,
  aws: 20,
  api: 10,
  apis: 10,
  rest: 10,
  git: 5,
  github: 5,
  sql: 10,
  firebase: 8,
  python: 10,
  java: 10,
  internship: 15,
};

const SUMMARY_TEMPLATES = [
  "Candidate demonstrates balanced MERN-stack exposure with frontend architecture and backend API integration understanding.",
  "Candidate shows practical software development capability with modern web technology exposure.",
  "Candidate presents solid engineering fundamentals with hands-on project implementation experience.",
  "Candidate reflects growing full-stack development capability with scalable application understanding.",
];

const STRENGTH_LIBRARY = {
  react: "Strong frontend engineering skills using React ecosystem.",
  node: "Backend API development understanding using Node.js.",
  express: "Experience building Express-based server architecture.",
  mongodb: "Knowledge of MongoDB database design and integration.",
  docker: "Containerization and deployment workflow exposure.",
  aws: "Cloud infrastructure and AWS ecosystem familiarity.",
  javascript: "Strong JavaScript development foundation.",
  typescript: "Type-safe frontend/backend development understanding.",
  api: "REST API integration and architecture understanding.",
  git: "Version control workflow familiarity using Git.",
};

const WEAKNESS_LIBRARY = [
  "Resume lacks measurable project impact metrics.",
  "Limited evidence of production-scale deployment experience.",
  "Cloud infrastructure exposure could be strengthened.",
  "Testing and automation experience is not strongly demonstrated.",
  "Resume could better highlight scalability contributions.",
];

const INTERVIEW_FOCUS_LIBRARY = [
  "Assess real-world API architecture understanding.",
  "Evaluate debugging and problem-solving depth.",
  "Discuss scalability handling in previous projects.",
  "Validate frontend and backend integration knowledge.",
  "Assess deployment workflow familiarity.",
  "Evaluate database schema design understanding.",
];

const HIRING_RECOMMENDATIONS = {
  top:
    "Strong candidate with high recruiter consideration potential.",
  strong:
    "Candidate demonstrates promising technical alignment for shortlisting.",
  average:
    "Candidate shows foundational skills but requires deeper evaluation.",
};

const normalizeArray = (arr, fallbackItems, minimum = 3) => {
  const unique = [...new Set(arr)];

  while (unique.length < minimum) {
    const fallback =
      fallbackItems[Math.floor(Math.random() * fallbackItems.length)];

    if (!unique.includes(fallback)) {
      unique.push(fallback);
    }
  }

  return unique.slice(0, minimum);
};

const calculateScore = (
  resumeText,
  extractedSkills = []
) => {
  const text = resumeText.toLowerCase();

  let score = 25;

  // -----------------------------
  // CORE SKILL SCORING
  // -----------------------------

  const uniqueSkills = [
    ...new Set(
      extractedSkills.map((skill) =>
        skill.toLowerCase()
      )
    ),
  ];

  let coreSkillScore = 0;

  uniqueSkills.forEach((skill) => {
    if (SKILL_WEIGHTS[skill]) {
      coreSkillScore +=
        SKILL_WEIGHTS[skill];
    }
  });

  // Strict normalization
  if (coreSkillScore > 25) {
    coreSkillScore =
      25 +
      (coreSkillScore - 25) * 0.15;
  }

  score += Math.min(coreSkillScore, 32);

  // -----------------------------
  // PROJECT COMPLEXITY
  // -----------------------------

  let projectScore = 0;

  if (text.includes("jwt"))
    projectScore += 2;

  if (text.includes("authentication"))
    projectScore += 4;

  if (text.includes("rest api"))
    projectScore += 4;

  if (text.includes("rag"))
    projectScore += 3;

  if (text.includes("llm"))
    projectScore += 3;

  if (text.includes("ai"))
    projectScore += 2;

  if (text.includes("mongodb"))
    projectScore += 3;

  if (text.includes("deployment"))
    projectScore += 2;

  if (text.includes("scalable"))
    projectScore += 1;

  score += Math.min(projectScore, 14);

  // -----------------------------
  // EXPERIENCE SIGNALS
  // -----------------------------

  let experienceScore = 0;

  if (text.includes("internship"))
    experienceScore += 4;

  if (text.includes("team"))
    experienceScore += 2;

  if (text.includes("lead"))
    experienceScore += 2;

  if (text.includes("collaboration"))
    experienceScore += 2;

  score += Math.min(
    experienceScore,
    10
  );

  // -----------------------------
  // RESUME QUALITY
  // -----------------------------

  let resumeQuality = 0;

  if (text.includes("project"))
    resumeQuality += 2;

  if (text.includes("github"))
    resumeQuality += 2;

  if (text.includes("deployed"))
    resumeQuality += 3;

  if (text.includes("responsive"))
    resumeQuality += 2;

  if (text.includes("architecture"))
    resumeQuality += 3;

  score += Math.min(
    resumeQuality,
    10
  );

  // -----------------------------
  // PENALTIES
  // -----------------------------

  let penalty = 0;

  if (
    !text.includes("%") &&
    !text.includes("improved") &&
    !text.includes("increased")
  ) {
    penalty += 4;
  }

  if (
    !text.includes("testing") &&
    !text.includes("jest")
  ) {
    penalty += 3;
  }

  if (
    !text.includes("aws") &&
    !text.includes("docker")
  ) {
    penalty += 3;
  }

  score -= penalty;

  // -----------------------------
  // FINAL STRICT NORMALIZATION
  // -----------------------------

  if (score > 88) score = 88;

  if (score < 35) score = 35;

  return Math.round(score);
};

const determineScoreCategory = (score) => {
  if (score >= 85) return "Top Match";
  if (score >= 70) return "Strong Match";
  return "Average Match";
};

export const analyzeCandidate = async ({
  resumeText,
  extractedSkills = [],
}) => {
  try {

    const semanticAnalysis =evaluateResumeSemantics(resumeText);

    const resumeSections =extractResumeSections(resumeText);

    const atsEvaluation =evaluateATSResume({resumeText, resumeSections, extractedSkills,});

    const aiScore =atsEvaluation.finalScore;

    const scoreCategory = determineScoreCategory(aiScore);

    const candidateSummary =
      SUMMARY_TEMPLATES[
        Math.floor(Math.random() * SUMMARY_TEMPLATES.length)
      ];

    const technicalStrengths = [];

    extractedSkills.forEach((skill) => {
      const normalized = skill.toLowerCase();

      if (STRENGTH_LIBRARY[normalized]) {
        technicalStrengths.push(STRENGTH_LIBRARY[normalized]);
      }
    });

    const weaknesses = [];
    const interviewFocusAreas = [];

    while (weaknesses.length < 3) {
      const item =
        WEAKNESS_LIBRARY[
          Math.floor(Math.random() * WEAKNESS_LIBRARY.length)
        ];

      if (!weaknesses.includes(item)) {
        weaknesses.push(item);
      }
    }

    while (interviewFocusAreas.length < 3) {
      const item =
        INTERVIEW_FOCUS_LIBRARY[
          Math.floor(Math.random() * INTERVIEW_FOCUS_LIBRARY.length)
        ];

      if (!interviewFocusAreas.includes(item)) {
        interviewFocusAreas.push(item);
      }
    }

    const normalizedStrengths = normalizeArray(
      technicalStrengths,
      Object.values(STRENGTH_LIBRARY),
      3
    );

    let hiringRecommendation = HIRING_RECOMMENDATIONS.average;

    if (scoreCategory === "Top Match") {
      hiringRecommendation = HIRING_RECOMMENDATIONS.top;
    }

    if (scoreCategory === "Strong Match") {
      hiringRecommendation = HIRING_RECOMMENDATIONS.strong;
    }

    return {
      candidateSummary,
      technicalStrengths: normalizedStrengths,
      weaknesses,
      hiringRecommendation,
      interviewFocusAreas,
      aiScore,
      semanticAnalysis,
      resumeSections,
      atsEvaluation,
      scoreCategory,
      aiStatus: "completed",
    };
  } catch (error) {
    console.error("AI Candidate Analysis Error:", error);

    return {
      candidateSummary:
        "AI analysis temporarily unavailable for this candidate.",
      technicalStrengths: [
        "Resume parsing completed successfully.",
      ],
      weaknesses: [
        "Detailed AI analysis unavailable.",
      ],
      hiringRecommendation:
        "Manual recruiter review recommended.",
      interviewFocusAreas: [
        "Assess technical fundamentals manually.",
      ],
      aiScore: 60,
      scoreCategory: "Average Match",
      aiStatus: "fallback",
    };
  }
};