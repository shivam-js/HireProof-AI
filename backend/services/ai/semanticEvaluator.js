export const evaluateResumeSemantics = (
  resumeText = ""
) => {
  const text = resumeText.toLowerCase();

  let engineeringMaturity = 40;
  let projectComplexity = 40;
  let productionReadiness = 35;
  let resumeQuality = 40;
  let recruiterConfidence = 40;

  // -----------------------------------
  // ENGINEERING MATURITY
  // -----------------------------------

  if (text.includes("architecture"))
    engineeringMaturity += 10;

  if (text.includes("scalable"))
    engineeringMaturity += 8;

  if (text.includes("backend"))
    engineeringMaturity += 5;

  if (text.includes("authentication"))
    engineeringMaturity += 5;

  if (text.includes("api"))
    engineeringMaturity += 5;

  // -----------------------------------
  // PROJECT COMPLEXITY
  // -----------------------------------

  if (text.includes("rag"))
    projectComplexity += 12;

  if (text.includes("llm"))
    projectComplexity += 10;

  if (text.includes("ai"))
    projectComplexity += 6;

  if (text.includes("mongodb"))
    projectComplexity += 4;

  if (text.includes("jwt"))
    projectComplexity += 5;

  // -----------------------------------
  // PRODUCTION READINESS
  // -----------------------------------

  if (text.includes("deployment"))
    productionReadiness += 10;

  if (text.includes("vercel"))
    productionReadiness += 4;

  if (text.includes("railway"))
    productionReadiness += 4;

  if (text.includes("docker"))
    productionReadiness += 8;

  if (text.includes("aws"))
    productionReadiness += 8;

  // -----------------------------------
  // RESUME QUALITY
  // -----------------------------------

  if (text.includes("Code2"))
    resumeQuality += 5;

  if (text.includes("responsive"))
    resumeQuality += 4;

  if (text.includes("project"))
    resumeQuality += 4;

  if (text.includes("%"))
    resumeQuality += 10;

  // -----------------------------------
  // RECRUITER CONFIDENCE
  // -----------------------------------

  if (text.includes("internship"))
    recruiterConfidence += 8;

  if (text.includes("team"))
    recruiterConfidence += 4;

  if (text.includes("developed"))
    recruiterConfidence += 4;

  if (text.includes("engineered"))
    recruiterConfidence += 5;

  // -----------------------------------
  // NORMALIZATION
  // -----------------------------------

  const normalize = (value) =>
    Math.max(35, Math.min(value, 90));

  engineeringMaturity =
    normalize(engineeringMaturity);

  projectComplexity =
    normalize(projectComplexity);

  productionReadiness =
    normalize(productionReadiness);

  resumeQuality =
    normalize(resumeQuality);

  recruiterConfidence =
    normalize(recruiterConfidence);

  return {
    engineeringMaturity,
    projectComplexity,
    productionReadiness,
    resumeQuality,
    recruiterConfidence,
  };
};