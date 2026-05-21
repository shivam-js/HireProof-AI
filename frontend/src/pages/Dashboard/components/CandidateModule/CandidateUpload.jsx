import {
  useEffect,
  useState,
} from "react";

import {
  Brain,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import UploadDropzone from "./UploadDropzone";
import CandidateTable from "./CandidateTable";
import CandidateAIInsights from "./CandidateAIInsights";

import {
  uploadCandidateResume,
  getAllCandidates,
  updateCandidateStatus,
  updateRecruiterNotes,
} from "../../../../services/candidateService";

const CandidateUpload = () => {
  // =========================
  // STATE MANAGEMENT
  // =========================

  const [candidates, setCandidates] =
    useState([]);

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(null);

  const [isUploading, setIsUploading] =
    useState(false);

  const [uploadError, setUploadError] =
    useState("");

  const [uploadSuccess, setUploadSuccess] =
    useState("");

  // =========================
  // DERIVED ACTIVE CANDIDATE
  // =========================

  const activeCandidate =
    selectedCandidate ||
    candidates[0] ||
    null;

  // =========================
  // FETCH CANDIDATES
  // =========================

  const fetchCandidates =
    async () => {
      try {
        const response =
          await getAllCandidates();

        const candidateData =
          response?.candidates || [];

        setCandidates(candidateData);
      } catch (error) {
        console.error(
          "Fetch Candidates Error:",
          error
        );

        setUploadError(
          "Failed to load candidates."
        );
      }
    };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchCandidates();
  }, []);

  // =========================
  // HANDLE FILE UPLOAD
  // =========================

  const handleFilesUpload =
    async (files) => {
      try {
        setUploadError("");

        setUploadSuccess("");

        setIsUploading(true);

        const allowedExtensions = [
          "pdf",
          "doc",
          "docx",
        ];

        const maxFileSize =
          5 * 1024 * 1024;

        let uploadedCount = 0;

        for (const file of files) {
          const extension =
            file.name
              .split(".")
              .pop()
              .toLowerCase();

          // =========================
          // FILE TYPE VALIDATION
          // =========================

          if (
            !allowedExtensions.includes(
              extension
            )
          ) {
            setUploadError(
              `Unsupported file format: ${file.name}`
            );

            continue;
          }

          // =========================
          // FILE SIZE VALIDATION
          // =========================

          if (
            file.size > maxFileSize
          ) {
            setUploadError(
              `${file.name} exceeds 5MB upload limit.`
            );

            continue;
          }

          // =========================
          // FORM DATA
          // =========================

          const formData =
            new FormData();

          formData.append(
            "resume",
            file
          );

          // =========================
          // API CALL
          // =========================

          await uploadCandidateResume(
            formData
          );

          uploadedCount++;
        }

        // =========================
        // REFRESH CANDIDATES
        // =========================

        await fetchCandidates();

        // =========================
        // SUCCESS MESSAGE
        // =========================

        if (uploadedCount > 0) {
          setUploadSuccess(
            `${uploadedCount} resume(s) uploaded and analyzed successfully.`
          );

          // Auto hide success banner
          setTimeout(() => {
            setUploadSuccess("");
          }, 5000);
        }
      } catch (error) {
        console.error(
          "Upload Error:",
          error
        );

        setUploadError(
          error?.response?.data
            ?.message ||
            "Resume upload failed."
        );
      } finally {
        setIsUploading(false);
      }
    };

  // =========================
  // STATUS UPDATE
  // =========================

  const handleStatusUpdate =
    async (
      candidateId,
      recruitmentStatus
    ) => {
      try {
        await updateCandidateStatus(
          candidateId,
          recruitmentStatus
        );

        await fetchCandidates();
      } catch (error) {
        console.error(
          "Status Update Error:",
          error
        );
      }
    };

  // =========================
  // NOTES UPDATE
  // =========================

  const handleNotesUpdate =
    async (
      candidateId,
      recruiterNotes
    ) => {
      try {
        await updateRecruiterNotes(
          candidateId,
          recruiterNotes
        );

        await fetchCandidates();
      } catch (error) {
        console.error(
          "Notes Update Error:",
          error
        );
      }
    };

  // =========================
  // UI
  // =========================

  return (
    <div className="space-y-8">
      {/* ========================= */}
      {/* UPLOAD SECTION */}
      {/* ========================= */}

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <div className="flex items-center gap-3">
          <Brain
            size={34}
            className="text-cyan-400"
          />

          <h2 className="text-4xl font-black text-white">
            Candidate Resume Upload
          </h2>
        </div>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Upload resumes for AI-powered
          ATS evaluation, recruiter
          insights, semantic analysis,
          candidate scoring, and hiring
          workflow management.
        </p>

        {/* ========================= */}
        {/* SUCCESS MESSAGE */}
        {/* ========================= */}

        {uploadSuccess && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-emerald-300">
            <CheckCircle2 size={22} />

            <span className="font-medium">
              {uploadSuccess}
            </span>
          </div>
        )}

        {/* ========================= */}
        {/* ERROR MESSAGE */}
        {/* ========================= */}

        {uploadError && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
            {uploadError}
          </div>
        )}

        {/* ========================= */}
        {/* UPLOAD LOADER */}
        {/* ========================= */}

        {isUploading && (
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-4 text-cyan-300">
            Uploading and analyzing resumes...
          </div>
        )}

        {/* ========================= */}
        {/* DROPZONE */}
        {/* ========================= */}

        <div className="mt-8">
          <UploadDropzone
            onFilesUpload={
              handleFilesUpload
            }
          />
        </div>

        {/* ========================= */}
        {/* AI FEATURE STRIP */}
        {/* ========================= */}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <h4 className="font-bold text-white">
                ATS Analysis
              </h4>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Realistic ATS evaluation
              with semantic resume
              parsing and recruiter
              scoring.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <h4 className="font-bold text-white">
                AI Insights
              </h4>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Technical strengths,
              resume weaknesses, and
              interview focus areas
              generated automatically.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-cyan-400"
              />

              <h4 className="font-bold text-white">
                Recruiter Pipeline
              </h4>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Track hiring stages,
              shortlist candidates, and
              manage recruitment
              workflows professionally.
            </p>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* CANDIDATE TABLE */}
      {/* ========================= */}

      <CandidateTable
        candidates={candidates}
        selectedCandidate={
          activeCandidate
        }
        setSelectedCandidate={
          setSelectedCandidate
        }
        handleStatusUpdate={
          handleStatusUpdate
        }
      />

      {/* ========================= */}
      {/* AI INSIGHTS */}
      {/* ========================= */}

      <CandidateAIInsights
        selectedCandidate={
          activeCandidate
        }
        handleNotesUpdate={
          handleNotesUpdate
        }
      />
    </div>
  );
};

export default CandidateUpload;