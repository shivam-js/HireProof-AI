import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    candidateName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    aiScore: {
      type: Number,
      default: 0,
    },

    aiStatus: {
        type: String,

        enum: [
            "Pending",
            "Analyzed",
            "Shortlisted",
            "Rejected",
        ],

        default: "Pending",
    },

    recruitmentStatus: {
      type: String,
      enum: [
        "New",
        "Reviewed",
        "Shortlisted",
        "Rejected",
        "Interview Scheduled",
      ],
      default: "New",
    },

    recruiterNotes: {
      type: String,
      default: "",
    },

    aiAnalysis: {
      candidateSummary: {
        type: String,
        default: "",
      },

      technicalStrengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      hiringRecommendation: {
        type: String,
        default: "",
      },

      interviewFocusAreas: {
        type: [String],
        default: [],
      },
    },

    extractedText: {
      type: String,
      default: "",
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    skills: [String],
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model(
  "Candidate",
  candidateSchema
);

export default Candidate;