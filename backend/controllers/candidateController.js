import Candidate from "../models/Candidate.js";

import { processResumePipeline } from "../services/pipeline/processResumePipeline.js";

import { analyzeCandidate } from "../services/ai/candidateAnalyzer.js";

export const uploadCandidateResume = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required.",
      });
    }

    const parsedResumeData =
      await processResumePipeline(req.file.path);

    const aiAnalysis =
      await analyzeCandidate({
        resumeText:
          parsedResumeData.rawText,

        extractedSkills:
          parsedResumeData.extractedSkills,
      });

    const candidate = await Candidate.create({
      candidateName:
        parsedResumeData.extractedName,

      email:
        parsedResumeData.extractedEmail || "",

      phone:
        parsedResumeData.extractedPhone || "",

      skills:
        parsedResumeData.extractedSkills,

      resumePath: req.file.path,

      resumeUrl: `/uploads/resumes/${req.file.filename}`,

      originalFileName:
        req.file.originalname,

      fileSize: req.file.size,

      aiScore: aiAnalysis.aiScore,

      scoreCategory:
        aiAnalysis.scoreCategory,

      aiStatus: "Analyzed",

      aiAnalysis: {
        candidateSummary:
          aiAnalysis.candidateSummary,

        technicalStrengths:
          aiAnalysis.technicalStrengths,

        weaknesses:
          aiAnalysis.weaknesses,

        hiringRecommendation:
          aiAnalysis.hiringRecommendation,

        interviewFocusAreas:
          aiAnalysis.interviewFocusAreas,
      },
    });

    return res.status(201).json({
      success: true,
      message:
        "Candidate uploaded successfully.",
      candidate,
    });
  } catch (error) {
    console.error(
      "Candidate Upload Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Candidate upload failed.",
    });
  }
};

export const getAllCandidates = async (
  req,
  res
) => {
  try {
    const candidates =
      await Candidate.find().sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      candidates,
    });
  } catch (error) {
    console.error(
      "Get Candidates Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch candidates.",
    });
  }
};

export const updateRecruitmentStatus =
  async (req, res) => {
    try {
      const { candidateId } = req.params;

      const { recruitmentStatus } =
        req.body;

      const candidate =
        await Candidate.findByIdAndUpdate(
          candidateId,
          {
            recruitmentStatus,
          },
          { new: true }
        );

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message:
            "Candidate not found.",
        });
      }

      return res.status(200).json({
        success: true,
        candidate,
      });
    } catch (error) {
      console.error(
        "Update Recruitment Status Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update recruitment status.",
      });
    }
  };

export const updateRecruiterNotes =
  async (req, res) => {
    try {
      const { candidateId } = req.params;

      const { recruiterNotes } =
        req.body;

      const candidate =
        await Candidate.findByIdAndUpdate(
          candidateId,
          {
            recruiterNotes,
          },
          { new: true }
        );

      if (!candidate) {
        return res.status(404).json({
          success: false,
          message:
            "Candidate not found.",
        });
      }

      return res.status(200).json({
        success: true,
        candidate,
      });
    } catch (error) {
      console.error(
        "Update Recruiter Notes Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update recruiter notes.",
      });
    }
  };