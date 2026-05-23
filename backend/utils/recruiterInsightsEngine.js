const generateRecruiterInsights = (
  candidate
) => {
  /*
    ==========================================
    BASE DATA
    ==========================================
  */

  const aiScore =
    candidate.aiScore || 0;

  const skills =
    candidate.skills || [];

  const projects =
    candidate.projects || [];

  const experience =
    candidate.experience || [];

  /*
    ==========================================
    CENTRALIZED AI ANALYSIS
    ==========================================
  */

  const aiAnalysis =
    candidate.aiAnalysis || {};

  /*
    ==========================================
    CONTEXTUAL AI OUTPUTS
    ==========================================
  */

  const strengths =
    aiAnalysis.technicalStrengths ||
    [];

  const weaknesses =
    aiAnalysis.weaknesses || [];

  const interviewFocusAreas =
    aiAnalysis.interviewFocusAreas ||
    [];

  /*
    ==========================================
    RECRUITER DECISION ENGINE
    ==========================================
  */

  let recommendation =
    "Needs Review";

  let recruiterConfidence =
    "Medium";

  /*
    ==========================================
    RECOMMENDATION CALIBRATION
    ==========================================
  */

  const hasStrongSkills =
    skills.length >= 5;

  const hasProjects =
    projects.length >= 1;

  const hasExperience =
    experience.length >= 1;

  if (
    aiScore >= 85 &&
    hasStrongSkills &&
    (hasProjects || hasExperience)
  ) {
    recommendation =
      "Strong Hire";

    recruiterConfidence =
      "High";
  } else if (
    aiScore >= 70 &&
    (hasStrongSkills ||
      hasProjects)
  ) {
    recommendation =
      "Moderate Hire";

    recruiterConfidence =
      "Medium";
  } else if (aiScore >= 55) {
    recommendation =
      "Needs Review";

    recruiterConfidence =
      "Low";
  } else {
    recommendation =
      "Weak Match";

    recruiterConfidence =
      "Low";
  }

  /*
    ==========================================
    RECRUITER SUMMARY
    ==========================================
  */

  const summary = `
Candidate demonstrates ${recruiterConfidence.toLowerCase()} recruiter confidence with an ATS match score of ${aiScore}%.
Recommended hiring decision: ${recommendation}.
`.trim();

  /*
    ==========================================
    STABILIZED RETURN
    ==========================================
  */

  return {
    strengths,

    weaknesses,

    recommendation,

    recruiterConfidence,

    interviewFocusAreas,

    summary,
  };
};

export default generateRecruiterInsights;