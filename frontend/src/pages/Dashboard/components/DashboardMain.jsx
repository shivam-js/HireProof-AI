import {
  Brain,
  UploadCloud,
  FileText,
} from "lucide-react";

const DashboardMain = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
            <Brain size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              AI Hiring Workspace
            </h2>

            <p className="mt-2 max-w-2xl text-slate-400">
              Upload candidate resumes for AI-powered
              screening, ranking, and recruiter evaluation.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-950/50 p-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
            <UploadCloud size={40} />
          </div>

          <h3 className="mt-6 text-2xl font-bold text-white">
            Resume Upload Moved
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-slate-400">
            Candidate upload and recruiter insights are now
            available inside the Candidates section for a
            cleaner recruiter dashboard workflow.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-cyan-300">
            <FileText size={18} />
            Open Candidates Section
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="text-xl font-bold text-white">
          Recent Activity
        </h3>

        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-6 text-slate-500">
          No activity yet.
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;