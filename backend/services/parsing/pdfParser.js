import fs from "fs";
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

export const extractProfileLinksFromPdf = async (filePath) => {
  try {
    const text = await parsePdfResume(filePath);

    return extractProfileLinksFromText(text);
  } catch (error) {
    console.error("PDF Link Extraction Error:", error);

    return {
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    };
  }
};

export default parsePdfResume;