import { UploadCloud } from "lucide-react";

import {
  useRef,
  useState,
} from "react";

const UploadDropzone = ({
  onFilesUpload,
}) => {
  const [isDragging, setIsDragging] =
    useState(false);

  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    const fileArray =
      Array.from(files);

    onFilesUpload(fileArray);
  };

  const handleDragOver = (
    event
  ) => {
    event.preventDefault();

    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setIsDragging(false);

    const files =
      event.dataTransfer.files;

    processFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (
    event
  ) => {
    const files = event.target.files;

    processFiles(files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-3xl border-2 border-dashed p-10 transition-all duration-300 ${
        isDragging
          ? "border-cyan-400 bg-cyan-500/10 scale-[1.01]"
          : "border-slate-700 bg-slate-950/40"
      }`}
    >
      <input
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full transition-all duration-300 ${
            isDragging
              ? "bg-cyan-500/20 animate-bounce"
              : "bg-cyan-500/10"
          }`}
        >
          <UploadCloud
            size={48}
            className={`transition-all duration-300 ${
              isDragging
                ? "text-cyan-300"
                : "text-cyan-400"
            }`}
          />
        </div>

        <h3 className="mt-8 text-3xl font-black text-white">
          Drag & Drop Resumes Here
        </h3>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">
          Upload candidate resumes in PDF or
          DOCX format for AI-powered analysis,
          recruiter insights, and hiring
          evaluation.
        </p>

        <button
          type="button"
          onClick={handleBrowseClick}
          className="mt-8 rounded-2xl bg-cyan-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-cyan-400"
        >
          Browse Files
        </button>

        <span className="mt-5 text-sm text-slate-500">
          Supports multiple resume uploads
        </span>
      </div>
    </div>
  );
};

export default UploadDropzone;