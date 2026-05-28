import {
  Eye,
  Download,
} from "lucide-react";

import { useCandidate } from "../../../../context/CandidateContext";

const CandidateTable = ({
  candidates,
  handleStatusUpdate,
}) => {
  const {
    activeCandidate,
    setActiveCandidate,
  } = useCandidate();

  const getScoreColor = (score) => {
    if (score >= 85) {
      return {
        text: "text-green-400",
        bg: "bg-green-500",
      };
    }

    if (score >= 70) {
      return {
        text: "text-yellow-400",
        bg: "bg-yellow-400",
      };
    }

    if (score >= 55) {
      return {
        text: "text-orange-400",
        bg: "bg-orange-500",
      };
    }

    return {
      text: "text-red-400",
      bg: "bg-red-500",
    };
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-black text-white">
            Candidate Pipeline
          </h2>

          <p className="mt-2 text-slate-400">
            Recruiter overview of uploaded candidates and AI analysis status.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-white">
            All
          </button>

          <button className="rounded-xl bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
            Top Match
          </button>

          <button className="rounded-xl bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
            Strong
          </button>

          <button className="rounded-xl bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700">
            Average
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-800 text-left text-sm uppercase tracking-wide text-slate-400">
              <th className="px-4 py-4">
                Candidate
              </th>

              <th className="px-4 py-4">
                Email
              </th>

              <th className="px-4 py-4">
                Phone
              </th>

              <th className="px-4 py-4">
                AI Status
              </th>

              <th className="px-4 py-4">
                Recruitment Status
              </th>

              <th className="px-4 py-4">
                Resume
              </th>

              <th className="px-4 py-4">
                Match Score
              </th>
            </tr>
          </thead>

          <tbody>
            {candidates?.length > 0 ? (
              candidates.map((candidate) => {
                const aiScore =
                  candidate.aiScore || 0;

                const scoreColors =
                  getScoreColor(aiScore);

                const API_BASE_URL =
                  import.meta.env.VITE_API_BASE_URL?.replace(
                    "/api",
                    ""
                  ) || "https://hireproof-ai.onrender.com";

                const resumeLink =
                  candidate.resumeUrl
                    ? `${API_BASE_URL}${candidate.resumeUrl}`
                    : "#";

                return (
                  <tr
                    key={candidate._id}
                    onClick={() =>
                      setActiveCandidate(
                        candidate
                      )
                    }
                    className={`cursor-pointer border-b border-slate-800 transition-all duration-300 hover:bg-slate-800/40 ${
                      activeCandidate?._id === candidate._id
                        ? "bg-slate-800/80 border-l-4 border-l-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                        : ""
                    }`}
                  >
                    <td className="px-4 py-5 font-semibold text-white">
                      {candidate.candidateName}
                    </td>

                    <td className="px-4 py-5 text-slate-300">
                      {candidate.email}
                    </td>

                    <td className="px-4 py-5 text-slate-300">
                      {candidate.phone}
                    </td>

                    <td className="px-4 py-5">
                      <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-400">
                        {candidate.aiStatus ||
                          "Analyzed"}
                      </span>
                    </td>

                    <td className="px-4 py-5">
                      <select
                        value={
                          candidate.recruitmentStatus ||
                          "New"
                        }
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                        onChange={(event) =>
                          handleStatusUpdate(
                            candidate._id,
                            event.target.value
                          )
                        }
                        className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none transition focus:border-cyan-500"
                      >
                        <option value="New">
                          New
                        </option>

                        <option value="Reviewed">
                          Reviewed
                        </option>

                        <option value="Shortlisted">
                          Shortlisted
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>
                      </select>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();

                            window.open(
                              resumeLink,
                              "_blank"
                            );
                          }}
                          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-cyan-400"
                        >
                          <Eye size={14} />
                          View
                        </button>

                        <a
                          href={resumeLink}
                          download
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
                        >
                          <Download size={14} />
                          Download
                        </a>
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-bold ${scoreColors.text}`}
                        >
                          {aiScore}%
                        </span>

                        <div className="h-2 w-28 rounded-full bg-slate-800">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${scoreColors.bg}`}
                            style={{
                              width: `${aiScore}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-10 text-center text-slate-500"
                >
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;