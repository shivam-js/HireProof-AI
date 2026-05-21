const buildCandidateAnalysisPrompt = (candidateData) => {
  return `
You are an expert AI recruiter and hiring analyst.

Analyze this candidate professionally.

Candidate Information:

Name:
${candidateData.name}

Skills:
${candidateData.skills?.join(", ")}

Experience:
${candidateData.experience || "Not provided"}

Resume Content:
${candidateData.resumeText}

IMPORTANT:

Return ONLY valid raw JSON.

Do NOT include markdown.
Do NOT include explanation text.
Do NOT include triple backticks.

Use this exact JSON structure:

{
  "candidateSummary": "",
  "technicalStrengths": [],
  "weaknesses": [],
  "hiringRecommendation": "",
  "interviewFocusAreas": []
}

Keep responses professional and recruiter-focused.
`;
};

export {
  buildCandidateAnalysisPrompt,
};