import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const pdfParse = require("pdf-parse");

const parsePdfResume = async (filePath) => {
  try {
    // Read PDF file buffer
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text from PDF
    const pdfData = await pdfParse(dataBuffer);

    // Return extracted text
    return pdfData.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);

    throw new Error("Failed to parse PDF resume");
  }
};

export default parsePdfResume;