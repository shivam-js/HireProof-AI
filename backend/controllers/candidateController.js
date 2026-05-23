import Candidate from "../models/Candidate.js";

import { processResumePipeline } from "../services/pipeline/processResumePipeline.js";

import { analyzeCandidate } from "../services/ai/candidateAnalyzer.js";

import generateRecruiterInsights from "../utils/recruiterInsightsEngine.js";

import { analyzeGitHubProfile } from "../services/ai/githubVerificationEngine.js";

import { analyzePortfolio } from "../services/ai/portfolioVerificationEngine.js";

import { analyzeLinkedInConsistency } from "../services/ai/linkedinConsistencyEngine.js";

import { analyzeAuthenticity } from "../services/ai/authenticityEngine.js";

import generateInterviewQuestions from "../services/ai/interviewQuestionEngine.js";

import {
  extractProfileLinksFromText,
  extractProfileLinksFromPdf,
} from "../services/parsing/pdfParser.js";
/*
  ==========================================
  UPLOAD CANDIDATE RESUME
  ==========================================
*/

export const uploadCandidateResume =
  async (req, res) => {
    try {
      /*
        ==========================================
        VALIDATION
        ==========================================
      */

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Resume file is required.",
        });
      }

      /*
        ==========================================
        RESUME PIPELINE
        ==========================================
      */

      const parsedResumeData =
        await processResumePipeline(
          req.file.path
        );

              /*
        ==========================================
        EXTERNAL PROFILE LINKS
        ==========================================
      */

      const textLinks =
        extractProfileLinksFromText(
          parsedResumeData.rawText
        );

      const pdfLinks =
        await extractProfileLinksFromPdf(
          req.file.path
        );

      const extractedLinks = {
        linkedinUrl:
          pdfLinks.linkedinUrl ||
          textLinks.linkedinUrl ||
          "",

        githubUrl:
          pdfLinks.githubUrl ||
          textLinks.githubUrl ||
          "",

        portfolioUrl:
          pdfLinks.portfolioUrl ||
          textLinks.portfolioUrl ||
          "",
      };

      const {
        linkedinUrl,
        githubUrl,
        portfolioUrl,
      } = extractedLinks;



      /*
        ==========================================
        AI ANALYSIS
        ==========================================
      */

      const aiAnalysis =
        await analyzeCandidate({
          resumeText:
            parsedResumeData.rawText,

          extractedSkills:
            parsedResumeData.extractedSkills,
        });

      /*
        ==========================================
        CENTRALIZED AI ANALYSIS OBJECT
        ==========================================
      */

      const centralizedAIAnalysis =
        {
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

          decisionFactors:
            aiAnalysis.decisionFactors,
        };

      /*
        ==========================================
        RECRUITER INSIGHTS
        ==========================================
      */

      const recruiterInsights =
        generateRecruiterInsights({
          aiScore:
            aiAnalysis.aiScore,

          skills:
            parsedResumeData.extractedSkills,

          projects:
            parsedResumeData.projects,

          experience:
            parsedResumeData.experience,

          interviewQuestions:
            parsedResumeData.interviewQuestions,

          aiAnalysis:
            centralizedAIAnalysis,
        });


              /*
        ==========================================
        GitHub VERIFICATION
        ==========================================
      */

      let githubAnalysis = {
        verified: false,
      };

      /*
        ==========================================
        CONDITIONAL GitHub ANALYSIS
        ==========================================
      */

      if (githubUrl) {
        githubAnalysis =
          await analyzeGitHubProfile(
            githubUrl
          );
      }

      const interviewQuestions =
        await generateInterviewQuestions({
          skills:
            parsedResumeData.extractedSkills,

          projects:
            parsedResumeData.projects,

            githubAnalysis,
        });

            /*
        ==========================================
        PORTFOLIO VERIFICATION
        ==========================================
      */

      let portfolioAnalysis = {
        verified: false,
      };

      /*
        ==========================================
        CONDITIONAL PORTFOLIO ANALYSIS
        ==========================================
      */

      if (portfolioUrl) {
        portfolioAnalysis =
          await analyzePortfolio(
            portfolioUrl
          );
      }

            /*
        ==========================================
        LINKEDIN CONSISTENCY
        ==========================================
      */

      const linkedinConsistencyAnalysis =
        analyzeLinkedInConsistency({
          linkedinUrl,

          githubUrl,

          portfolioUrl,

          extractedSkills:
            parsedResumeData.extractedSkills,

          experience:
            parsedResumeData.experience,
        });

              /*
        ==========================================
        AUTHENTICITY ANALYSIS
        ==========================================
      */

      const authenticityAnalysis =
        analyzeAuthenticity({
          githubAnalysis,

          portfolioAnalysis,

          linkedinConsistencyAnalysis,
        });

      /*
        ==========================================
        SAVE CANDIDATE
        ==========================================
      */

      const candidate =
        await Candidate.create({
          candidateName:
            parsedResumeData.extractedName,

          email:
            parsedResumeData.extractedEmail ||
            "",

          phone:
            parsedResumeData.extractedPhone ||
            "",

          linkedinUrl,

          githubUrl,

          portfolioUrl,

          skills:
            parsedResumeData.extractedSkills,

          /*
            ==========================================
            PROJECTS & EXPERIENCE
            ==========================================
          */

          projects:
            parsedResumeData.projects,

          experience:
            parsedResumeData.experience,

          /*
            ==========================================
            RESUME FILE
            ==========================================
          */

          resumePath:
            req.file.path,

          resumeUrl: `/uploads/resumes/${req.file.filename}`,

          originalFileName:
            req.file.originalname,

          fileSize:
            req.file.size,

          /*
            ==========================================
            AI SYSTEM
            ==========================================
          */

          aiScore:
            aiAnalysis.aiScore,

          scoreCategory:
            aiAnalysis.scoreCategory,

          aiStatus:
            "Analyzed",

          /*
            ==========================================
            CENTRALIZED AI ANALYSIS
            ==========================================
          */

          aiAnalysis:
            centralizedAIAnalysis,

          /*
            ==========================================
            RECRUITER INSIGHTS
            ==========================================
          */

          recruiterInsights,

          /*
            ==========================================
            INTERVIEW QUESTIONS
            ==========================================
          */

          interviewQuestions,

                    /*
            ==========================================
            Code2 VERIFICATION
            ==========================================
          */

          githubAnalysis,

                    /*
            ==========================================
            PORTFOLIO VERIFICATION
            ==========================================
          */

          portfolioAnalysis,

                    /*
            ==========================================
            LINKEDIN CONSISTENCY
            ==========================================
          */

          linkedinConsistencyAnalysis,

                    /*
            ==========================================
            AUTHENTICITY ANALYSIS
            ==========================================
          */

          authenticityAnalysis,

          /*
            ==========================================
            RAW TEXT
            ==========================================
          */

          extractedText:
            parsedResumeData.rawText,
        });

      /*
        ==========================================
        SUCCESS RESPONSE
        ==========================================
      */

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

/*
  ==========================================
  GET ALL CANDIDATES
  ==========================================
*/

export const getAllCandidates =
  async (req, res) => {
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

/*
  ==========================================
  UPDATE RECRUITMENT STATUS
  ==========================================
*/

export const updateRecruitmentStatus =
  async (req, res) => {
    try {
      const { candidateId } =
        req.params;

      const {
        recruitmentStatus,
      } = req.body;

      const candidate =
        await Candidate.findByIdAndUpdate(
          candidateId,
          {
            recruitmentStatus,
          },
          {
            new: true,
          }
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

/*
  ==========================================
  UPDATE RECRUITER NOTES
  ==========================================
*/

export const updateRecruiterNotes =
  async (req, res) => {
    try {
      const { candidateId } =
        req.params;

      const {
        recruiterNotes,
      } = req.body;

      const candidate =
        await Candidate.findByIdAndUpdate(
          candidateId,
          {
            recruiterNotes,
          },
          {
            new: true,
          }
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