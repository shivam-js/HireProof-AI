import axios from "axios";

import * as cheerio from "cheerio";

/*
  ==========================================
  VALIDATE PORTFOLIO URL
  ==========================================
*/

const validatePortfolioUrl = (
  portfolioUrl = ""
) => {
  try {
    const url =
      new URL(portfolioUrl);

    return (
      url.protocol === "https:"
    );
  } catch (error) {
    return false;
  }
};

/*
  ==========================================
  FETCH PORTFOLIO HTML
  ==========================================
*/

const fetchPortfolioHtml =
  async (portfolioUrl) => {
    const response =
      await axios.get(
        portfolioUrl,
        {
          timeout: 10000,
        }
      );

    return response.data;
  };

/*
  ==========================================
  PORTFOLIO VERIFICATION ENGINE
  ==========================================
*/

export const analyzePortfolio =
  async (
    portfolioUrl = ""
  ) => {
    try {
      /*
        ==========================================
        VALIDATION
        ==========================================
      */

      if (!portfolioUrl) {
        return {
          verified: false,

          message:
            "Portfolio URL not provided.",
        };
      }

      /*
        ==========================================
        URL VALIDATION
        ==========================================
      */

      const isValid =
        validatePortfolioUrl(
          portfolioUrl
        );

      if (!isValid) {
        return {
          verified: false,

          message:
            "Portfolio must use HTTPS.",
        };
      }

      /*
        ==========================================
        FETCH HTML
        ==========================================
      */

      const html =
        await fetchPortfolioHtml(
          portfolioUrl
        );

      /*
        ==========================================
        LOAD HTML
        ==========================================
      */

      const $ = cheerio.load(html);

      /*
        ==========================================
        TITLE
        ==========================================
      */

      const pageTitle =
        $("title").text().trim();

      /*
        ==========================================
        Code2 LINKS
        ==========================================
      */

      const Code2Links = [];

      $("a").each((_, element) => {
        const href =
          $(element).attr("href");

        if (
          href &&
          href.includes("Code2.com")
        ) {
          Code2Links.push(href);
        }
      });

      /*
        ==========================================
        DEPLOYMENT SIGNALS
        ==========================================
      */

      const portfolioSignals =
        [];

      if (pageTitle) {
        portfolioSignals.push(
          "Professional portfolio title detected."
        );
      }

      if (
        Code2Links.length > 0
      ) {
        portfolioSignals.push(
          "Code2 project references detected."
        );
      }

      if (
        portfolioUrl.includes(
          ".vercel.app"
        ) ||
        portfolioUrl.includes(
          ".netlify.app"
        )
      ) {
        portfolioSignals.push(
          "Modern frontend deployment platform detected."
        );
      }

      if (
        !portfolioUrl.includes(
          ".vercel.app"
        ) &&
        !portfolioUrl.includes(
          ".netlify.app"
        )
      ) {
        portfolioSignals.push(
          "Custom portfolio domain detected."
        );
      }

      /*
        ==========================================
        FINAL ANALYSIS
        ==========================================
      */

      return {
        verified: true,

        portfolioUrl,

        pageTitle,

        Code2Links,

        portfolioSignals,
      };
    } catch (error) {
      console.error(
        "Portfolio Verification Error:",
        error.message
      );

      return {
        verified: false,

        message:
          "Portfolio verification failed.",
      };
    }
  };