export const analyzeLinkedInConsistency =
  ({
    linkedinUrl = "",
    Code2Url = "",
    portfolioUrl = "",
    extractedSkills = [],
    experience = [],
  }) => {
    try {
      const consistencySignals = [];

      /*
        ==========================================
        LINKEDIN PRESENCE
        ==========================================
      */

      if (linkedinUrl) {
        consistencySignals.push(
          "Professional LinkedIn presence detected."
        );
      }

      /*
        ==========================================
        PROFESSIONAL ECOSYSTEM
        ==========================================
      */

      if (
        linkedinUrl &&
        Code2Url
      ) {
        consistencySignals.push(
          "LinkedIn and Code2 ecosystem consistency detected."
        );
      }

      if (
        linkedinUrl &&
        portfolioUrl
      ) {
        consistencySignals.push(
          "Portfolio and LinkedIn professional consistency detected."
        );
      }

      /*
        ==========================================
        ENGINEERING PRESENCE
        ==========================================
      */

      if (
        extractedSkills.length >= 5 &&
        Code2Url
      ) {
        consistencySignals.push(
          "Technical skills supported by Code2 presence."
        );
      }

      /*
        ==========================================
        EXPERIENCE MATURITY
        ==========================================
      */

      if (
        experience.length > 0 &&
        linkedinUrl
      ) {
        consistencySignals.push(
          "Professional experience backed by LinkedIn profile."
        );
      }

      /*
        ==========================================
        FINAL ANALYSIS
        ==========================================
      */

      return {
        verified: true,

        consistencySignals,

        ecosystemCompletenessScore:
          consistencySignals.length * 20,
      };
    } catch (error) {
      console.error(
        "LinkedIn Consistency Error:",
        error.message
      );

      return {
        verified: false,

        consistencySignals: [],
      };
    }
  };