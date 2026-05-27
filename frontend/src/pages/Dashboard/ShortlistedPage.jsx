import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";

import {
  getAllCandidates,
  sendShortlistEmail,
} from "../../services/candidateService";

const ShortlistedPage = () => {
  const [
    shortlistedCandidates,
    setShortlistedCandidates,
  ] = useState([]);

  const [
    selectedEmailCandidate,
    setSelectedEmailCandidate,
    ] = useState(null);

  const fetchShortlistedCandidates =
    async () => {
      try {
        const response =
          await getAllCandidates();

        const allCandidates =
          response?.candidates || [];

        const shortlistedOnly =
          allCandidates.filter(
            (candidate) =>
              candidate.recruitmentStatus ===
              "Shortlisted"
          );

        setShortlistedCandidates(
          shortlistedOnly
        );
      } catch (error) {
        console.error(
          "Fetch Shortlisted Candidates Error:",
          error
        );
      }
    };

    const handleSendEmail = async (
        candidateId
        ) => {
        try {
            const response =
            await sendShortlistEmail(
                candidateId
            );

            alert(
            response.message ||
                "Email sent successfully."
            );

            await fetchShortlistedCandidates();
        } catch (error) {
            console.error(
            "Send Email Error:",
            error
            );

            alert(
            "Failed to send email."
            );
        }
        };

  useEffect(() => {
    const loadCandidates = async () => {
        await fetchShortlistedCandidates();
    };

    loadCandidates();
    }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-400">
            <UserCheck size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-black text-white">
              Shortlisted Candidates
            </h1>

            <p className="mt-2 text-slate-400">
              Manage shortlisted candidates,
              interview pipeline,
              recruiter communication,
              and next hiring actions.
            </p>
          </div>
        </div>
      </div>

      {/* Candidate List */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        {shortlistedCandidates.length >
        0 ? (
          <div className="grid gap-6">
            {shortlistedCandidates.map(
              (candidate) => (
                <div
                  key={candidate._id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {
                          candidate.candidateName
                        }
                      </h2>

                      <p className="mt-2 text-slate-400">
                        {candidate.email}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-cyan-400">
                        {candidate.aiScore}%
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        AI Match Score
                      </p>
                    </div>
                  </div>

                   <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Shortlisted on{" "}
                            {new Date(
                            candidate.shortlistedAt
                            ).toLocaleDateString()}
                        </p>

                        <button
                            onClick={async () => {
                                setSelectedEmailCandidate(
                                candidate
                                );

                                await handleSendEmail(
                                candidate._id
                                );
                            }}
                            className="rounded-xl bg-cyan-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400"
                            >
                            Send Email
                        </button>
                    </div>

                    {selectedEmailCandidate?._id ===
                        candidate._id && (
                        <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">
                            <h3 className="text-lg font-bold text-white">
                            Congratulations Email Preview
                            </h3>

                            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                            <p>
                                Subject: Congratulations —
                                You’ve Been Shortlisted for
                                the Next Round
                            </p>

                            <p>
                                Hi {candidate.candidateName},
                            </p>

                            <p>
                                Congratulations! We’re pleased to
                                inform you that you’ve been shortlisted
                                for the next stage of our hiring process.
                            </p>

                            <p>
                                We’ll be sharing interview details
                                with you shortly.
                            </p>

                            <p>
                                Best regards,
                                <br />
                                Hiring Team
                            </p>
                            </div>
                        </div>
                        )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-12 text-center">
            <h2 className="text-2xl font-bold text-white">
              No shortlisted candidates yet
            </h2>

            <p className="mt-3 text-slate-400">
              Candidates marked as
              shortlisted from the
              Candidates workspace
              will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistedPage;