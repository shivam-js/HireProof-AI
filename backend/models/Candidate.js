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

    linkedinUrl: {
      type: String,
      default: "",
    },

    githubUrl: {
      type: String,
      default: "",
    },

    portfolioUrl: {
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
    },
    
      recruiterInsights: {
        strengths: {
          type: [String],
          default: [],
        },

        weaknesses: {
          type: [String],
          default: [],
        },

        recommendation: {
          type: String,
          default: "",
        },

        recruiterConfidence: {
          type: String,
          default: "",
        },

        interviewFocusAreas: {
          type: [String],
          default: [],
        },

        summary: {
          type: String,
          default: "",
        },
      },

        githubAnalysis: {
          verified: {
          type: Boolean,
          default: false,
        },

        portfolioAnalysis: {
          verified: {
          type: Boolean,
          default: false,
        },

        linkedinConsistencyAnalysis: {
          verified: {
            type: Boolean,
            default: false,
          },

          authenticityAnalysis: {
            verified: {
              type: Boolean,
              default: false,
            },

            authenticityScore: {
              type: Number,
              default: 0,
            },

            authenticityLevel: {
              type: String,
              default: "Low",
            },

            authenticitySignals: {
              type: [String],
              default: [],
            },
          },

          ecosystemCompletenessScore: {
            type: Number,
            default: 0,
          },

          consistencySignals: {
            type: [String],
            default: [],
          },
        },

        portfolioUrl: {
          type: String,
          default: "",
        },

        pageTitle: {
          type: String,
          default: "",
        },

        githubLinks: {
          type: [String],
          default: [],
        },

        portfolioSignals: {
          type: [String],
          default: [],
        },
      },

      username: {
        type: String,
        default: "",
      },

      Code2Profile: {
        type: String,
        default: "",
      },

      profileImage: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      publicRepos: {
        type: Number,
        default: 0,
      },

      followers: {
        type: Number,
        default: 0,
      },

      following: {
        type: Number,
        default: 0,
      },

      languages: {
        type: [String],
        default: [],
      },

      engineeringSignals: {
        type: [String],
        default: [],
      },

      repositories: {
        type: [
          {
            name: String,

            description: String,

            stars: Number,

            forks: Number,

            language: String,

            repoUrl: String,

            deployedUrl: String,
          },
        ],

        default: [],
      },
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

      interviewQuestions: {
        type: [String],
        default: [],
      },

    extractedText: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    skills: [String],

    shortlistedAt: {
      type: Date,
      default: null,
    },

    timeline: [
      {
        label: {
          type: String,
          required: true,
        },

        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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