import CandidateUpload from "./components/CandidateModule/CandidateUpload";

const CandidatesPage = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-black text-white">
              Candidates Workspace
            </h1>

            <p className="mt-3 max-w-3xl text-slate-400">
              Manage candidate resumes, AI analysis,
              recruiter workflows, interview tracking,
              and hiring pipeline operations.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Recruiter Workspace
            </p>

            <h3 className="mt-2 text-3xl font-black text-white">
              AI Hiring
            </h3>
          </div>
        </div>
      </div>

      <CandidateUpload />
    </div>
  );
};

export default CandidatesPage;