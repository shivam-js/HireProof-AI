const clampScore = (
  score,
  min = 45,
  max = 95
) => {
  return Math.max(
    min,
    Math.min(score, max)
  );
};

// -----------------------------------
// PROJECT EVALUATION
// -----------------------------------

const evaluateProjects = (
  projects = [],
  globalResumeText = ""
) => {
  const projectsText =
    projects.join(" ");

  const text =
    (
      projectsText +
      " " +
      globalResumeText
    ).toLowerCase();

  let score = 50;

  // -----------------------------------
  // CORE ENGINEERING SIGNALS
  // -----------------------------------

  if (text.includes("jwt"))
    score += 5;

  if (
    text.includes("authentication")
  )
    score += 5;

  if (text.includes("rest api"))
    score += 5;

  if (text.includes("mongodb"))
    score += 4;

  if (text.includes("deployment"))
    score += 5;

  if (text.includes("realtime"))
    score += 5;

  // -----------------------------------
  // MODERN FULL STACK BONUS
  // -----------------------------------

  if (text.includes("mern"))
    score += 7;

  if (text.includes("full stack"))
    score += 7;

  if (text.includes("dashboard"))
    score += 5;

  if (text.includes("chat"))
    score += 5;

  if (text.includes("socket"))
    score += 5;

  if (text.includes("api"))
    score += 4;

  // -----------------------------------
  // AI + ADVANCED ENGINEERING
  // -----------------------------------

  if (text.includes("rag"))
    score += 8;

  if (text.includes("llm"))
    score += 8;

  if (text.includes("ai"))
    score += 5;

  // -----------------------------------
  // ADVANCED ARCHITECTURE SIGNALS
  // -----------------------------------

  const advancedProjectSignals =
    [
      "architecture",
      "scalable",
      "microservices",
      "redis",
      "websocket",
      "queue",
      "caching",
      "docker",
      "aws",
      "ci/cd",
      "pipeline",
      "optimization",
      "performance",
      "analytics",
    ];

  let advancedCount = 0;

  advancedProjectSignals.forEach(
    (signal) => {
      if (
        text.includes(signal)
      ) {
        advancedCount += 1;
      }
    }
  );

  score += advancedCount * 2;

  // -----------------------------------
  // PROJECT QUANTITY BONUS
  // -----------------------------------

  if (projects.length >= 1)
    score += 5;

  if (projects.length >= 2)
    score += 5;

  if (projects.length >= 4)
    score += 5;

  return clampScore(score);
};

// -----------------------------------
// EXPERIENCE EVALUATION
// -----------------------------------

const evaluateExperience = (
  experience = [],
  globalResumeText = ""
) => {
  const experienceText =
    experience.join(" ");

  const text =
    (
      experienceText +
      " " +
      globalResumeText
    ).toLowerCase();

  let score = 52;

  if (text.includes("internship"))
    score += 10;

  if (text.includes("team"))
    score += 5;

  if (
    text.includes(
      "collaboration"
    )
  )
    score += 4;

  if (
    text.includes("developed")
  )
    score += 5;

  if (
    text.includes("production")
  )
    score += 6;

  if (
    text.includes("deployment")
  )
    score += 5;

  if (
    text.includes("frontend")
  )
    score += 4;

  if (
    text.includes("backend")
  )
    score += 4;

  if (
    text.includes("full stack")
  )
    score += 5;

  return clampScore(score);
};

// -----------------------------------
// SKILLS EVALUATION
// -----------------------------------

const evaluateSkills = (
  skills = [],
  globalResumeText = ""
) => {
  const totalSkills =
    skills.length;

  const text =
    globalResumeText.toLowerCase();

  let score = 52;

  if (totalSkills >= 5)
    score += 8;

  if (totalSkills >= 8)
    score += 8;

  if (totalSkills >= 12)
    score += 8;

  if (totalSkills >= 16)
    score += 5;

  const lowerSkills =
    skills.map((skill) =>
      skill.toLowerCase()
    );

  // -----------------------------------
  // PREMIUM ENGINEERING STACK
  // -----------------------------------

  const premiumSkills = [
    "react",
    "next.js",
    "node.js",
    "mongodb",
    "express",
    "docker",
    "aws",
    "typescript",
    "socket.io",
    "redis",
    "postgresql",
    "tailwind",
    "jwt",
    "graphql",
    "python",
    "langchain",
    "openai",
  ];

  let premiumCount = 0;

  premiumSkills.forEach(
    (skill) => {
      if (
        lowerSkills.includes(
          skill
        ) ||
        text.includes(skill)
      ) {
        premiumCount += 1;
      }
    }
  );

  score += premiumCount * 2;

  return clampScore(score);
};

// -----------------------------------
// ATS COMPATIBILITY
// -----------------------------------

const evaluateATSCompatibility =
  (
    resumeSections,
    globalResumeText = ""
  ) => {
    let score = 50;

    if (
      resumeSections.profile
        ?.length
    )
      score += 5;

    if (
      resumeSections.skills
        ?.length
    )
      score += 10;

    if (
      resumeSections.projects
        ?.length
    )
      score += 12;

    if (
      resumeSections.experience
        ?.length
    )
      score += 10;

    if (
      resumeSections.education
        ?.length
    )
      score += 5;

    // fallback richness detection

    if (
      globalResumeText.length >
      2500
    )
      score += 5;

    // -----------------------------------
    // SECTION RICHNESS BONUS
    // -----------------------------------

    const sectionCount = Object.keys(
      resumeSections
    ).filter(
      (key) =>
        resumeSections[key]
          ?.length
    ).length;

    if (sectionCount >= 5)
      score += 5;

    return clampScore(score);
  };

// -----------------------------------
// RECRUITER CONFIDENCE
// -----------------------------------

const evaluateRecruiterConfidence =
  (resumeText = "") => {
    const text =
      resumeText.toLowerCase();

    let score = 52;

    // -----------------------------------
    // ACTION VERBS
    // -----------------------------------

    if (
      text.includes("developed")
    )
      score += 5;

    if (
      text.includes("engineered")
    )
      score += 6;

    if (
      text.includes("optimized")
    )
      score += 5;

    if (
      text.includes(
        "implemented"
      )
    )
      score += 5;

    if (
      text.includes("designed")
    )
      score += 4;

    if (
      text.includes("built")
    )
      score += 5;

    // -----------------------------------
    // IMPACT SIGNALS
    // -----------------------------------

    if (text.includes("%"))
      score += 8;

    if (
      text.includes("performance")
    )
      score += 5;

    if (
      text.includes("scalable")
    )
      score += 5;

    if (
      text.includes("system")
    )
      score += 4;

    if (
      text.includes("deployed")
    )
      score += 5;

    if (
      text.includes("Code2")
    )
      score += 5;

    if (
      text.includes("api")
    )
      score += 4;

    return clampScore(score);
  };

// -----------------------------------
// FINAL ATS ENGINE
// -----------------------------------

export const evaluateATSResume =
  ({
    resumeText,
    resumeSections,
    extractedSkills,
  }) => {
    const projectScore =
      evaluateProjects(
        resumeSections.projects,
        resumeText
      );

    const experienceScore =
      evaluateExperience(
        resumeSections.experience,
        resumeText
      );

    const skillsScore =
      evaluateSkills(
        extractedSkills,
        resumeText
      );

    const atsCompatibilityScore =
      evaluateATSCompatibility(
        resumeSections,
        resumeText
      );

    const recruiterConfidenceScore =
      evaluateRecruiterConfidence(
        resumeText
      );

    // -----------------------------------
    // BALANCED ATS SCORING
    // -----------------------------------

    let finalScore =
      Math.round(
        projectScore * 0.34 +
          experienceScore *
            0.16 +
          skillsScore * 0.24 +
          atsCompatibilityScore *
            0.11 +
          recruiterConfidenceScore *
            0.15
      );

    // -----------------------------------
    // FRESHER NORMALIZATION
    // -----------------------------------

    if (
      finalScore >= 65 &&
      finalScore <= 74
    ) {
      finalScore += 5;
    }

    if (
      finalScore >= 75 &&
      finalScore <= 82
    ) {
      finalScore += 3;
    }

    finalScore =
      clampScore(finalScore);

    return {
      projectScore,
      experienceScore,
      skillsScore,
      atsCompatibilityScore,
      recruiterConfidenceScore,
      finalScore,
    };
  };