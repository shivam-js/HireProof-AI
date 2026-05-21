const getScoreColor = (score) => {
  if (score >= 85) {
    return {
      text: "text-green-400",
      bg: "bg-green-500",
      border: "border-green-500/20",
      card: "bg-green-500/10",
    };
  }

  if (score >= 70) {
    return {
      text: "text-yellow-400",
      bg: "bg-yellow-400",
      border: "border-yellow-500/20",
      card: "bg-yellow-500/10",
    };
  }

  if (score >= 55) {
    return {
      text: "text-orange-400",
      bg: "bg-orange-500",
      border: "border-orange-500/20",
      card: "bg-orange-500/10",
    };
  }

  return {
    text: "text-red-400",
    bg: "bg-red-500",
    border: "border-red-500/20",
    card: "bg-red-500/10",
  };
};


const CandidateAIInsights = ({
  activeCandidate,
  handleNotesUpdate,
}) => {
  if (!activeCandidate) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h2 className="text-3xl font-black text-white">
          AI Recruiter Insights
        </h2>

        <p className="mt-3 text-slate-400">
          Select a candidate to view AI-generated recruiter analysis.
        </p>
      </div>
    );
  }

  const analysis =
    activeCandidate.aiAnalysis || {};

  const scoreColors = getScoreColor(
    activeCandidate.aiScore || 0
  );

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-4xl font-black text-white">
            AI Recruiter Insights
          </h2>

          <p className="mt-3 text-lg text-slate-400">
            AI-generated recruiter evaluation and candidate intelligence report.
          </p>
        </div>

        <div className="rounded-2xl border$ {scoreColors.border} ${scoreColors.card} px-8 py-6 text-center">
          <p className="text-sm uppercase tracking-wider text-slate-400">
            Match Score
          </p>

          <h3 className={`mt-2 text-5xl font-black ${scoreColors.text}`}>
            {activeCandidate.aiScore ||
              85}
            %
          </h3>
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-8">
          <h3 className="text-3xl font-bold text-white">
            Candidate Summary
          </h3>

          <p className="mt-5 text-lg leading-relaxed text-slate-300">
            {analysis.summary}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-slate-950/50 p-8">
          <h3 className="text-3xl font-bold text-white">
            Technical Strengths
          </h3>

          <div className="mt-6 space-y-4">
            {analysis.strengths?.map(
              (strength, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-lg text-emerald-200"
                >
                  {strength}
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-500/20 bg-slate-950/50 p-8">
          <h3 className="text-3xl font-bold text-white">
            Weaknesses
          </h3>

          <div className="mt-6 space-y-4">
            {analysis.weaknesses?.map(
              (weakness, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5 text-lg text-yellow-200"
                >
                  {weakness}
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-8">
          <h3 className="text-3xl font-bold text-white">
            Hiring Recommendation
          </h3>

          <p className="mt-5 text-lg leading-relaxed text-slate-200">
            {analysis.recommendation}
          </p>
        </div>

        <div className="rounded-3xl border border-fuchsia-500/20 bg-slate-950/50 p-8">
          <h3 className="text-3xl font-bold text-white">
            Interview Focus Areas
          </h3>

          <div className="mt-6 space-y-4">
            {analysis.interviewFocusAreas?.map(
              (area, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-5 text-lg text-fuchsia-200"
                >
                  {area}
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/50 p-8">
          <h3 className="text-3xl font-bold text-white">
            Recruiter Notes
          </h3>

          <textarea
            rows="6"
            defaultValue={
              activeCandidate.recruiterNotes ||
              ""
            }
            onBlur={(event) =>
              handleNotesUpdate(
                activeCandidate._id,
                event.target.value
              )
            }
            placeholder="Write recruiter notes here..."
            className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-900 p-5 text-lg text-white outline-none transition focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateAIInsights;