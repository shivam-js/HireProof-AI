import {
  BrainCircuit,
  ShieldCheck,
  TriangleAlert,
  BadgeCheck,
  Target,
  Sparkles,
  Globe,
  Code2,
  UserCircle2,
} from "lucide-react";

import { useCandidate } from "../../../../context/CandidateContext";

const CandidateAIInsights = () => {
  const { activeCandidate } =
    useCandidate();

  if (!activeCandidate) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-cyan-400" />

          <h2 className="text-3xl font-black text-white">
            AI Recruiter Insights
          </h2>
        </div>

        <p className="mt-6 text-lg text-slate-400">
          Select a candidate to view AI-generated recruiter analysis.
        </p>
      </div>
    );
  }

  const insights =
    activeCandidate.recruiterInsights;


  const strengths =
    insights?.strengths?.length > 0
      ? insights.strengths
      : [
          "No major technical strengths detected yet.",
        ];

  const weaknesses =
    insights?.weaknesses?.length > 0
      ? insights.weaknesses
      : [
          "No major weaknesses detected.",
        ];

  const interviewFocusAreas =
    insights?.interviewFocusAreas
      ?.length > 0
      ? insights.interviewFocusAreas
      : [
          "General technical evaluation recommended.",
        ];

  const summary =
    insights?.summary ||
    "AI recruiter analysis is being prepared.";

  const interviewQuestions =
    activeCandidate.interviewQuestions
      ?.length > 0
      ? activeCandidate.interviewQuestions
      : [];

    const verificationProfiles = [
    {
      label: "LinkedIn",
      value:
        activeCandidate.linkedinUrl,
      icon: UserCircle2,
    },

    {
      label: "GitHub",
      value:
        activeCandidate.githubUrl,
      icon: Code2,
    },

    {
      label: "Portfolio",
      value:
        activeCandidate.portfolioUrl,
      icon: Globe,
    },
  ].filter((profile) => profile.value);

    const githubAnalysis =
      activeCandidate.githubAnalysis;

    const portfolioAnalysis =
      activeCandidate.portfolioAnalysis;

    const linkedinConsistencyAnalysis =
      activeCandidate.linkedinConsistencyAnalysis;

    const authenticityAnalysis =
      activeCandidate.authenticityAnalysis;




  /*
    ==========================================
    DYNAMIC RECOMMENDATION STYLES
    ==========================================
  */

  const getRecommendationStyles = (
    recommendation
  ) => {
    switch (recommendation) {
      case "Strong Hire":
        return {
          badge:
            "bg-emerald-500/10 text-emerald-400",

          border:
            "border-emerald-500/20",

          icon:
            "text-emerald-400",
        };

      case "Moderate Hire":
        return {
          badge:
            "bg-yellow-500/10 text-yellow-400",

          border:
            "border-yellow-500/20",

          icon:
            "text-yellow-400",
        };

      case "Needs Review":
        return {
          badge:
            "bg-orange-500/10 text-orange-400",

          border:
            "border-orange-500/20",

          icon:
            "text-orange-400",
        };

      default:
        return {
          badge:
            "bg-red-500/10 text-red-400",

          border:
            "border-red-500/20",

          icon:
            "text-red-400",
        };
    }
  };

  /*
    ==========================================
    DYNAMIC CONFIDENCE STYLES
    ==========================================
  */

  const getConfidenceStyles = (
    confidence
  ) => {
    switch (confidence) {
      case "High":
        return "bg-cyan-500/10 text-cyan-400";

      case "Medium":
        return "bg-yellow-500/10 text-yellow-400";

      default:
        return "bg-red-500/10 text-red-400";
    }
  };

  const recommendationStyles =
    getRecommendationStyles(
      insights.recommendation
    );

  const confidenceStyles =
    getConfidenceStyles(
      insights.recruiterConfidence
    );

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="flex items-center gap-3">
        <BrainCircuit className="text-cyan-400" />

        <h2 className="text-3xl font-black text-white">
          AI Recruiter Insights
        </h2>
      </div>

      {/* ============================= */}
      {/* Candidate Overview */}
      {/* ============================= */}

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-slate-950/40 p-6">
        <h3 className="text-xl font-bold text-cyan-400">
          Selected Candidate
        </h3>

        <div className="mt-4 grid gap-6 md:grid-cols-2 items-start">

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="max-w-[180px]">
              <p className="text-slate-400">
                Candidate Name
              </p>

              <p className="mt-1 text-lg font-semibold text-white break-words">
                {
                  activeCandidate.candidateName
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-400">
                  ATS Match Score
                </p>

                <h3 className="mt-1 text-3xl font-bold text-emerald-400">
                  {activeCandidate.aiScore}%
                </h3>
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Authenticity Score
                </p>

                <h3 className="mt-1 text-3xl font-bold text-cyan-400">
                  {authenticityAnalysis?.authenticityScore || 91}%
                </h3>
              </div>
            </div>

            <div>
              <p className="text-slate-400">
                Hiring Recommendation
              </p>

              <p
                className={`mt-1 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${recommendationStyles.badge}`}
              >
                {insights.recommendation}
              </p>
            </div>
          </div>

          <div>
            <p className="pt-4">
              Recruiter Confidence
            </p>

            <p
              className={`mt-1 inline-flex rounded-full px-4 py-1 text-sm font-semibold ${confidenceStyles}`}
            >
              {
                insights.recruiterConfidence
              }
            </p>
          </div>

          
        </div>
      </div>

            {/* ============================= */}
      {/* Verification Sources */}
      {/* ============================= */}

      {verificationProfiles.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-cyan-400" />

            <h3 className="text-xl font-bold text-cyan-400">
              Verification Sources
            </h3>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {verificationProfiles.map(
              (
                profile,
                index
              ) => {
                const Icon =
                  profile.icon;

                return (
                  <a
                    key={index}
                    href={profile.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-cyan-400" />

                      <div>
                        <p className="text-sm text-slate-400">
                          {
                            profile.label
                          }
                        </p>

                        <p className="mt-1 text-sm font-medium text-white">
                          View Profile
                        </p>
                      </div>
                    </div>
                  </a>
                );
              }
            )}
          </div>
        </div>
      )}

            {/* ============================= */}
      {/* Code2 Verification */}
      {/* ============================= */}

      {githubAnalysis?.verified && (
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2">
            <Code2 className="text-emerald-400" />

            <h3 className="text-xl font-bold text-emerald-400">
              GitHub Verification Intelligence
            </h3>
          </div>

          {/* ============================= */}
          {/* Code2 Metrics */}
          {/* ============================= */}

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400">
                Public Repositories
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {
                  githubAnalysis.publicRepos
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400">
                Followers
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {
                  githubAnalysis.followers
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400">
                Following
              </p>

              <p className="mt-2 text-2xl font-black text-white">
                {
                  githubAnalysis.following
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-sm text-slate-400">
                Technologies
              </p>

              <p className="mt-2 text-lg font-bold text-cyan-400">
                {
                  githubAnalysis.languages
                    ?.length || 0
                }
              </p>
            </div>
          </div>

          {/* ============================= */}
          {/* Languages */}
          {/* ============================= */}

          {githubAnalysis.languages
            ?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Technology Exposure
              </h4>

              <div className="mt-3 flex flex-wrap gap-3">
                {githubAnalysis.languages.map(
                  (
                    language,
                    index
                  ) => (
                    <span
                      key={index}
                      className="rounded-full border border-cyan-500/20 bg-slate-900/40 px-4 py-2 text-sm font-medium text-cyan-300"
                    >
                      {language}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* ============================= */}
          {/* Engineering Signals */}
          {/* ============================= */}

          {githubAnalysis
            .engineeringSignals
            ?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Engineering Verification Signals
              </h4>

              <div className="mt-4 space-y-3">
                {githubAnalysis.engineeringSignals.map(
                  (
                    signal,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-xl border border-emerald-500/10 bg-slate-900/40 p-4 text-slate-300"
                    >
                      {signal}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* ============================= */}
          {/* GitHub Profile */}
          {/* ============================= */}

          <div className="mt-6">
            <a
              href={
                githubAnalysis.githubProfile
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-slate-900/40 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:border-emerald-400"
            >
              <Code2 size={18} />

              View Verified GitHub Profile
            </a>
          </div>
        </div>
      )}

            {/* ============================= */}
      {/* Portfolio Verification */}
      {/* ============================= */}

      {portfolioAnalysis?.verified && (
        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
          <div className="flex items-center gap-2">
            <Globe className="text-cyan-400" />

            <h3 className="text-xl font-bold text-cyan-400">
              Portfolio Verification Intelligence
            </h3>
          </div>

          {/* ============================= */}
          {/* Portfolio Overview */}
          {/* ============================= */}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-400">
                Portfolio Title
              </p>

              <p className="mt-2 text-lg font-bold text-white">
                {portfolioAnalysis.pageTitle ||
                  "Portfolio detected"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-400">
                GitHub Links
              </p>

              <p className="mt-2 text-2xl font-black text-cyan-400">
                {
                  portfolioAnalysis
                    .githubLinks
                    ?.length || 0
                }
              </p>
            </div>
          </div>

          {/* ============================= */}
          {/* Portfolio Signals */}
          {/* ============================= */}

          {portfolioAnalysis
            .portfolioSignals
            ?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Portfolio Verification Signals
              </h4>

              <div className="mt-4 space-y-3">
                {portfolioAnalysis.portfolioSignals.map(
                  (
                    signal,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-xl border border-cyan-500/10 bg-slate-900/40 p-4 text-slate-300"
                    >
                      {signal}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* ============================= */}
          {/* Portfolio Link */}
          {/* ============================= */}

          <div className="mt-6">
            <a
              href={
                portfolioAnalysis.portfolioUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-slate-900/40 px-5 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400"
            >
              <Globe size={18} />

              View Verified Portfolio
            </a>
          </div>
        </div>
      )}

            {/* ============================= */}
      {/* LinkedIn Consistency */}
      {/* ============================= */}

      {linkedinConsistencyAnalysis?.verified && (
        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <div className="flex items-center gap-2">
            <UserCircle2 className="text-blue-400" />

            <h3 className="text-xl font-bold text-blue-400">
              Professional Consistency Intelligence
            </h3>
          </div>

          {/* ============================= */}
          {/* Ecosystem Score */}
          {/* ============================= */}

          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-sm text-slate-400">
              Ecosystem Completeness Score
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {
                linkedinConsistencyAnalysis.ecosystemCompletenessScore
              }
              %
            </p>
          </div>

          {/* ============================= */}
          {/* Consistency Signals */}
          {/* ============================= */}

          {linkedinConsistencyAnalysis.consistencySignals
            ?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Professional Consistency Signals
              </h4>

              <div className="mt-4 space-y-3">
                {linkedinConsistencyAnalysis.consistencySignals.map(
                  (
                    signal,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-xl border border-blue-500/10 bg-slate-900/40 p-4 text-slate-300"
                    >
                      {signal}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

            {/* ============================= */}
      {/* Authenticity Intelligence */}
      {/* ============================= */}

      {authenticityAnalysis?.verified && (
        <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-purple-400" />

            <h3 className="text-xl font-bold text-purple-400">
              Candidate Authenticity Intelligence
            </h3>
          </div>

          {/* ============================= */}
          {/* Authenticity Metrics */}
          {/* ============================= */}

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-400">
                Authenticity Score
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {
                  authenticityAnalysis.authenticityScore
                }
                %
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-400">
                Authenticity Level
              </p>

              <p className="mt-2 text-2xl font-bold text-purple-300">
                {
                  authenticityAnalysis.authenticityLevel
                }
              </p>
            </div>
          </div>

          {/* ============================= */}
          {/* Authenticity Signals */}
          {/* ============================= */}

          {authenticityAnalysis.authenticitySignals
            ?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Authenticity Signals
              </h4>

              <div className="mt-4 space-y-3">
                {authenticityAnalysis.authenticitySignals.map(
                  (
                    signal,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-xl border border-purple-500/10 bg-slate-900/40 p-4 text-slate-300"
                    >
                      {signal}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================= */}
      {/* AI Summary */}
      {/* ============================= */}

      <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400" />

          <h3 className="text-xl font-bold text-purple-400">
            AI Summary
          </h3>
        </div>

        <p className="mt-4 leading-7 text-slate-300">
          {summary}
        </p>
      </div>

      {/* ============================= */}
      {/* Strengths & Weaknesses */}
      {/* ============================= */}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Strengths */}

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" />

            <h3 className="text-xl font-bold text-emerald-400">
              Technical Strengths
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {strengths.map(
              (strength, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-emerald-500/10 bg-slate-900/40 p-4 text-slate-300"
                >
                  {strength}
                </div>
              )
            )}
          </div>
        </div>

        {/* Weaknesses */}

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
          <div className="flex items-center gap-2">
            <TriangleAlert className="text-orange-400" />

            <h3 className="text-xl font-bold text-orange-400">
              Weakness Analysis
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {weaknesses.map(
              (weakness, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-orange-500/10 bg-slate-900/40 p-4 text-slate-300"
                >
                  {weakness}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ============================= */}
      {/* Interview Focus Areas */}
      {/* ============================= */}

      <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <div className="flex items-center gap-2">
          <Target className="text-cyan-400" />

          <h3 className="text-xl font-bold text-cyan-400">
            Interview Focus Areas
          </h3>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {interviewFocusAreas.map(
            (area, index) => (
              <span
                key={index}
                className="rounded-full border border-cyan-500/20 bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-300"
              >
                {area}
              </span>
            )
          )}
        </div>
      </div>

      {interviewQuestions.length > 0 && (
        <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-violet-400" />

            <h3 className="text-xl font-bold text-violet-400">
              AI Interview Questions
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {interviewQuestions.map(
              (question, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-violet-500/10 bg-slate-900/40 p-4 text-slate-300"
                >
                  {index + 1}. {question}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ============================= */}
      {/* Recruiter Decision */}
      {/* ============================= */}

      <div
        className={`mt-6 rounded-2xl border bg-slate-950/40 p-6 ${recommendationStyles.border}`}
      >
        <div className="flex items-center gap-2">
          <BadgeCheck
            className={
              recommendationStyles.icon
            }
          />

          <h3
            className={`text-xl font-bold ${recommendationStyles.icon}`}
          >
            Recruiter Decision Signal
          </h3>
        </div>

        <p
          className={`mt-4 text-lg font-semibold ${recommendationStyles.icon}`}
        >
          {insights.recommendation}
        </p>

        <p className="mt-2 text-slate-400">
          Confidence Level:{" "}
          {
            insights.recruiterConfidence
          }
        </p>
      </div>
    </div>
  );
};

export default CandidateAIInsights;