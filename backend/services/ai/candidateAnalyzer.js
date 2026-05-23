import { evaluateResumeSemantics } from "./semanticEvaluator.js";

import { extractResumeSections } from "./resumeSectionExtractor.js";

import { evaluateATSResume } from "./atsEvaluationEngine.js";

/*
  ==========================================
  STRENGTH LIBRARY
  ==========================================
*/

const STRENGTH_LIBRARY = {
  react:
    "Strong frontend engineering skills using React ecosystem.",

  node:
    "Backend API development understanding using Node.js.",

  express:
    "Experience building Express-based server architecture.",

  mongodb:
    "Knowledge of MongoDB database design and integration.",

  docker:
    "Containerization and deployment workflow exposure.",

  aws:
    "Cloud infrastructure and AWS ecosystem familiarity.",

  javascript:
    "Strong JavaScript development foundation.",

  typescript:
    "Type-safe frontend/backend development understanding.",

  api:
    "REST API integration and architecture understanding.",

  git:
    "Version control workflow familiarity using Git.",
};

/*
  ==========================================
  ENGINEERING SIGNAL DETECTION
  ==========================================
*/

const detectEngineeringSignals = (
  resumeText
) => {
  const text =
    resumeText.toLowerCase();

  return {
    hasDeployment:
      text.includes("vercel") ||
      text.includes("netlify") ||
      text.includes("render") ||
      text.includes("railway") ||
      text.includes("deployment"),

    hasArchitecture:
      text.includes("architecture") ||
      text.includes("scalable") ||
      text.includes("microservice") ||
      text.includes("system design"),

    hasLeadership:
      text.includes("lead") ||
      text.includes("mentored") ||
      text.includes("ownership") ||
      text.includes("collaborated"),

    hasOptimization:
      text.includes("optimized") ||
      text.includes("performance") ||
      text.includes("efficient") ||
      text.includes("caching"),

    hasTesting:
      text.includes("testing") ||
      text.includes("jest") ||
      text.includes("cypress"),

    hasRealtime:
      text.includes("socket") ||
      text.includes("realtime") ||
      text.includes("websocket"),

    hasCI:
      text.includes("ci/cd") ||
      text.includes("pipeline") ||
      text.includes("Code2 actions"),
  };
};

/*
  ==========================================
  INTERVIEW FOCUS GENERATOR
  ==========================================
*/

const generateInterviewFocusAreas =
  (
    resumeText,
    skills,
    signals
  ) => {
    const areas = [];

    if (
      skills.includes("React")
    ) {
      areas.push(
        "Evaluate React component architecture and state management understanding."
      );
    }

    if (
      skills.includes("Node.js")
    ) {
      areas.push(
        "Assess backend API design and authentication handling."
      );
    }

    if (
      skills.includes("MongoDB")
    ) {
      areas.push(
        "Evaluate database schema optimization and scalability understanding."
      );
    }

    if (
      signals.hasDeployment
    ) {
      areas.push(
        "Discuss production deployment workflow and hosting decisions."
      );
    }

    if (
      signals.hasArchitecture
    ) {
      areas.push(
        "Evaluate scalable architecture and system design understanding."
      );
    }

    if (
      signals.hasRealtime
    ) {
      areas.push(
        "Assess realtime communication and websocket implementation knowledge."
      );
    }

    if (
      areas.length < 4
    ) {
      areas.push(
        "Assess debugging and problem-solving depth."
      );
    }

    return [
      ...new Set(areas),
    ].slice(0, 5);
  };

/*
  ==========================================
  CONTEXTUAL WEAKNESS GENERATOR
  ==========================================
*/

const generateWeaknesses = (
  resumeText,
  extractedSkills,
  aiScore,
  signals
) => {
  const weaknesses = [];

  const text =
    resumeText.toLowerCase();

  /*
    --------------------------------------
    IMPACT METRICS
    --------------------------------------
  */

  if (
    !text.includes("%") &&
    !text.includes("improved") &&
    !text.includes("optimized")
  ) {
    weaknesses.push(
      "Resume lacks measurable engineering impact metrics and quantified technical achievements."
    );
  }

  /*
    --------------------------------------
    TESTING
    --------------------------------------
  */

  if (
    !signals.hasTesting
  ) {
    weaknesses.push(
      "Testing and application reliability practices are not clearly demonstrated."
    );
  }

  /*
    --------------------------------------
    DEPLOYMENT
    --------------------------------------
  */

  if (
    !signals.hasDeployment
  ) {
    weaknesses.push(
      "Production deployment and hosting exposure could be strengthened."
    );
  }

  /*
    --------------------------------------
    ARCHITECTURE
    --------------------------------------
  */

  if (
    !signals.hasArchitecture
  ) {
    weaknesses.push(
      "Resume could better demonstrate scalable architecture and system design exposure."
    );
  }

  /*
    --------------------------------------
    LEADERSHIP
    --------------------------------------
  */

  if (
    !signals.hasLeadership
  ) {
    weaknesses.push(
      "Engineering ownership and collaboration contributions are not strongly highlighted."
    );
  }

  /*
    --------------------------------------
    OPTIMIZATION
    --------------------------------------
  */

  if (
    !signals.hasOptimization
  ) {
    weaknesses.push(
      "Performance optimization and engineering efficiency improvements are not clearly demonstrated."
    );
  }

  /*
    --------------------------------------
    ATS QUALITY
    --------------------------------------
  */

  if (aiScore < 75) {
    weaknesses.push(
      "Resume ATS optimization can be improved for stronger recruiter visibility."
    );
  }

  /*
    --------------------------------------
    HIGH SCORE CALIBRATION
    --------------------------------------
  */

  if (
    aiScore >= 85
  ) {
    weaknesses.push(
      "Candidate appears technically strong, but deeper scalability and system design evaluation is recommended during interviews."
    );
  }

  return [
    ...new Set(weaknesses),
  ].slice(0, 6);
};

/*
  ==========================================
  DECISION FACTOR GENERATOR
  ==========================================
*/

const generateDecisionFactors = (
  aiScore,
  signals,
  extractedSkills
) => {
  const factors = [];

  /*
    --------------------------------------
    ATS SCORE
    --------------------------------------
  */

  if (aiScore >= 85) {
    factors.push(
      "ATS optimization score exceeded strong recruiter benchmark."
    );
  }

  /*
    --------------------------------------
    FULLSTACK ALIGNMENT
    --------------------------------------
  */

  const hasFrontend =
    extractedSkills.includes(
      "React"
    );

  const hasBackend =
    extractedSkills.includes(
      "Node.js"
    );

  if (
    hasFrontend &&
    hasBackend
  ) {
    factors.push(
      "Strong frontend and backend engineering alignment detected."
    );
  }

  /*
    --------------------------------------
    DEPLOYMENT
    --------------------------------------
  */

  if (
    signals.hasDeployment
  ) {
    factors.push(
      "Production deployment and hosting workflow exposure identified."
    );
  }

  /*
    --------------------------------------
    ARCHITECTURE
    --------------------------------------
  */

  if (
    signals.hasArchitecture
  ) {
    factors.push(
      "Scalable architecture and system design terminology detected."
    );
  }

  /*
    --------------------------------------
    TESTING
    --------------------------------------
  */

  if (
    !signals.hasTesting
  ) {
    factors.push(
      "Testing and application reliability practices were not strongly demonstrated."
    );
  }

  /*
    --------------------------------------
    LEADERSHIP
    --------------------------------------
  */

  if (
    signals.hasLeadership
  ) {
    factors.push(
      "Leadership and collaboration indicators identified within resume content."
    );
  }

  return [
    ...new Set(factors),
  ].slice(0, 5);
};

/*
  ==========================================
  SUMMARY GENERATOR
  ==========================================
*/

const generateSummary = (
  aiScore,
  extractedSkills,
  signals
) => {
  const hasFrontend =
    extractedSkills.includes(
      "React"
    );

  const hasBackend =
    extractedSkills.includes(
      "Node.js"
    );

  if (
    aiScore >= 85 &&
    hasFrontend &&
    hasBackend &&
    signals.hasDeployment
  ) {
    return "Candidate demonstrates strong full-stack engineering capability with practical frontend, backend, and deployment workflow exposure.";
  }

  if (
    signals.hasArchitecture
  ) {
    return "Candidate shows promising engineering maturity with scalable architecture and implementation exposure.";
  }

  if (
    aiScore >= 70
  ) {
    return "Candidate reflects balanced software engineering fundamentals with practical development understanding.";
  }

  return "Candidate demonstrates foundational engineering exposure with potential for technical growth.";
};

/*
  ==========================================
  SCORE CATEGORY
  ==========================================
*/

const determineScoreCategory = (
  score
) => {
  if (score >= 85)
    return "Top Match";

  if (score >= 70)
    return "Strong Match";

  return "Average Match";
};

/*
  ==========================================
  MAIN ANALYZER
  ==========================================
*/

export const analyzeCandidate =
  async ({
    resumeText,
    extractedSkills = [],
  }) => {
    try {
      const semanticAnalysis =
        evaluateResumeSemantics(
          resumeText
        );

      const resumeSections =
        extractResumeSections(
          resumeText
        );

      const atsEvaluation =
        evaluateATSResume({
          resumeText,
          resumeSections,
          extractedSkills,
        });

      const aiScore =
        atsEvaluation.finalScore;

      const scoreCategory =
        determineScoreCategory(
          aiScore
        );

      /*
        ==========================================
        ENGINEERING SIGNALS
        ==========================================
      */

      const signals =
        detectEngineeringSignals(
          resumeText
        );

        /*
        ==========================================
        DECISION FACTORS
        ==========================================
      */

      const decisionFactors =
        generateDecisionFactors(
          aiScore,
          signals,
          extractedSkills
        );

        
      /*
        ==========================================
        SUMMARY
        ==========================================
      */

      const candidateSummary =
        generateSummary(
          aiScore,
          extractedSkills,
          signals
        );

      /*
        ==========================================
        STRENGTHS
        ==========================================
      */

      const technicalStrengths =
        [];

      extractedSkills.forEach(
        (skill) => {
          const normalized =
            skill.toLowerCase();

          if (
            STRENGTH_LIBRARY[
              normalized
            ]
          ) {
            technicalStrengths.push(
              STRENGTH_LIBRARY[
                normalized
              ]
            );
          }
        }
      );

      /*
        ==========================================
        ADVANCED ENGINEERING SIGNALS
        ==========================================
      */

      if (
        signals.hasDeployment
      ) {
        technicalStrengths.push(
          "Demonstrates deployment and production hosting workflow familiarity."
        );
      }

      if (
        signals.hasArchitecture
      ) {
        technicalStrengths.push(
          "Shows understanding of scalable architecture and engineering system design concepts."
        );
      }

      if (
        signals.hasOptimization
      ) {
        technicalStrengths.push(
          "Demonstrates awareness of performance optimization and engineering efficiency improvements."
        );
      }

      /*
        ==========================================
        WEAKNESSES
        ==========================================
      */

      const weaknesses =
        generateWeaknesses(
          resumeText,
          extractedSkills,
          aiScore,
          signals
        );

      /*
        ==========================================
        INTERVIEW FOCUS
        ==========================================
      */

      const interviewFocusAreas =
        generateInterviewFocusAreas(
          resumeText,
          extractedSkills,
          signals
        );

      /*
        ==========================================
        HIRING RECOMMENDATION
        ==========================================
      */

      let hiringRecommendation =
        "Candidate requires deeper technical evaluation before recruiter shortlisting.";

      if (
        scoreCategory ===
        "Top Match"
      ) {
        hiringRecommendation =
          "Strong candidate with high recruiter consideration potential.";
      }

      if (
        scoreCategory ===
        "Strong Match"
      ) {
        hiringRecommendation =
          "Candidate demonstrates promising technical alignment for shortlisting.";
      }

      return {
        candidateSummary,

        technicalStrengths:
          [
            ...new Set(
              technicalStrengths
            ),
          ].slice(0, 7),

        weaknesses,

        hiringRecommendation,

        interviewFocusAreas,

        decisionFactors,

        aiScore,

        semanticAnalysis,

        resumeSections,

        atsEvaluation,

        scoreCategory,

        aiStatus: "completed",
      };
    } catch (error) {
      console.error(
        "AI Candidate Analysis Error:",
        error
      );

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

        scoreCategory:
          "Average Match",

        aiStatus: "fallback",
      };
    }
  };