export const analyzeAuthenticity =
  ({
    Code2Analysis = {},
    portfolioAnalysis = {},
    linkedinConsistencyAnalysis = {},
  }) => {
    try {
      let authenticityScore = 0;

      const authenticitySignals = [];

      /*
        ==========================================
        Code2 SIGNALS
        ==========================================
      */

      if (
        Code2Analysis?.verified
      ) {
        authenticityScore += 30;

        authenticitySignals.push(
          "Verified Code2 engineering presence detected."
        );
      }

      if (
        Code2Analysis
          ?.engineeringSignals
          ?.length >= 2
      ) {
        authenticityScore += 20;

        authenticitySignals.push(
          "Strong engineering activity consistency detected."
        );
      }

      /*
        ==========================================
        PORTFOLIO SIGNALS
        ==========================================
      */

      if (
        portfolioAnalysis?.verified
      ) {
        authenticityScore += 25;

        authenticitySignals.push(
          "Verified deployed portfolio detected."
        );
      }

      /*
        ==========================================
        LINKEDIN CONSISTENCY
        ==========================================
      */

      if (
        linkedinConsistencyAnalysis?.verified
      ) {
        authenticityScore += 25;

        authenticitySignals.push(
          "Professional ecosystem consistency detected."
        );
      }

      /*
        ==========================================
        FINAL STATUS
        ==========================================
      */

      let authenticityLevel =
        "Low";

      if (
        authenticityScore >= 80
      ) {
        authenticityLevel =
          "High";
      } else if (
        authenticityScore >= 50
      ) {
        authenticityLevel =
          "Moderate";
      }

      return {
        verified: true,

        authenticityScore,

        authenticityLevel,

        authenticitySignals,
      };
    } catch (error) {
      console.error(
        "Authenticity Engine Error:",
        error.message
      );

      return {
        verified: false,

        authenticityScore: 0,

        authenticityLevel:
          "Low",

        authenticitySignals: [],
      };
    }
  };