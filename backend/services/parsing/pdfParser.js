import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

const parsePdfResume = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    return pdfData.text || "";
  } catch (error) {
    console.error("PDF Parsing Error:", error);

    return "";
  }
};

export const extractProfileLinksFromText = (text = "") => {
  const links = {
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
  };

  const urlRegex = /(https?:\/\/[^\s]+)/gi;

  const matches = text.match(urlRegex) || [];

  matches.forEach((url) => {
    const cleanUrl = url.trim();

    if (
      cleanUrl.includes("linkedin.com/in") &&
      !links.linkedinUrl
    ) {
      links.linkedinUrl = cleanUrl;
    }

    else if (
      cleanUrl.includes("github.com") &&
      !links.githubUrl
    ) {
      links.githubUrl = cleanUrl;
    }

    else if (!links.portfolioUrl) {
      links.portfolioUrl = cleanUrl;
    }
  });

  return links;
};

export const extractProfileLinksFromPdf = async (
  filePath
) => {
  const links = {
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
  };

  try {
    const data = new Uint8Array(
      fs.readFileSync(filePath)
    );

    const pdf =
      await pdfjsLib.getDocument({
        data,
      }).promise;

    for (
      let pageNum = 1;
      pageNum <= pdf.numPages;
      pageNum++
    ) {
      const page =
        await pdf.getPage(pageNum);

      const annotations =
        await page.getAnnotations();

      for (const annotation of annotations) {
        
        const url = annotation?.url || "";

        if (
          !url ||
          url.startsWith("mailto:") ||
          url.startsWith("tel:")
        ) {
          continue;
        }

        if (!url) continue;

        if (
          url.includes(
            "linkedin.com"
          ) &&
          !links.linkedinUrl
        ) {
          links.linkedinUrl = url;
        }

        else if (
          url.includes(
            "github.com"
          ) &&
          !links.githubUrl
        ) {
          links.githubUrl = url;
        }

        else if (
          !links.portfolioUrl
        ) {
          links.portfolioUrl = url;
        }
      }
    }

    return links;
  } catch (error) {
    console.error(
      "PDF Link Extraction Error:",
      error
    );

    return links;
  }
};

export default parsePdfResume;