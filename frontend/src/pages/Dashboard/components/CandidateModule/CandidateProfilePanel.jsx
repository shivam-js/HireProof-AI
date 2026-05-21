import {
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  AlertTriangle,
  Target,
  FileText,
  Calendar,
} from "lucide-react";

const CandidateProfilePanel = ({
  activeCandidate,
}) => {
  if (!activeCandidate) {
    return null;
  }

  const {
    candidateName,
    email,
    phone,
    aiScore,
    aiStatus,
    recruitmentStatus,
    recruiterNotes,
    aiInsights,
    createdAt,
  } = activeCandidate;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
      {/* HEADER */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
            <User className="h-8 w-8 text-cyan-400" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              {candidateName}
            </h2>

            <div className="mt-3 flex flex-col gap-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  Added on{" "}
                  {new Date(
                    createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SCORE */}
        <div className="flex flex-wrap gap-4">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4">
            <p className="text-sm text-slate-400">
              Match Score
            </p>

            <h3 className="mt-1 text-3xl font-bold text-cyan-400">
              {aiScore}%
            </h3>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4">
            <p className="text-sm text-slate-400">
              AI Status
            </p>

            <h3 className="mt-1 text-xl font-bold text-emerald-400">
              {aiStatus}
            </h3>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-4">
            <p className="text-sm text-slate-400">
              Recruitment
            </p>

            <h3 className="mt-1 text-xl font-bold text-yellow-400">
              {recruitmentStatus}
            </h3>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
            {/* VIEW RESUME */}
            <a
                href={`http://localhost:5000/${activeCandidate.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-3 font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20"
            >
                View Resume
            </a>

            {/* DOWNLOAD RESUME */}
            <a
                href={`http://localhost:5000/${activeCandidate.resumeUrl}`}
                download
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 transition-all hover:bg-emerald-500/20"
            >
                Download Resume
            </a>
        </div>
      </div>

      {/* GRID */}
      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        {/* SUMMARY */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-cyan-400" />

            <h3 className="text-2xl font-bold text-white">
              Candidate Summary
            </h3>
          </div>

          <p className="mt-5 leading-8 text-slate-300">
            {aiInsights?.summary}
          </p>
        </div>

        {/* RECOMMENDATION */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-emerald-400" />

            <h3 className="text-2xl font-bold text-white">
              Hiring Recommendation
            </h3>
          </div>

          <p className="mt-5 leading-8 text-slate-300">
            {
              aiInsights?.hiringRecommendation
            }
          </p>
        </div>

        {/* STRENGTHS */}
        <div className="rounded-2xl border border-emerald-500/20 bg-slate-950/40 p-6">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-emerald-400" />

            <h3 className="text-2xl font-bold text-white">
              Technical Strengths
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {aiInsights?.strengths?.map(
              (strength, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-slate-200"
                >
                  {strength}
                </div>
              )
            )}
          </div>
        </div>

        {/* WEAKNESSES */}
        <div className="rounded-2xl border border-yellow-500/20 bg-slate-950/40 p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />

            <h3 className="text-2xl font-bold text-white">
              Weaknesses
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            {aiInsights?.weaknesses?.map(
              (weakness, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-slate-200"
                >
                  {weakness}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* NOTES */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-pink-400" />

          <h3 className="text-2xl font-bold text-white">
            Recruiter Notes
          </h3>
        </div>

        <div className="mt-5 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="leading-7 text-slate-300">
            {recruiterNotes ||
              "No recruiter notes added yet."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePanel;