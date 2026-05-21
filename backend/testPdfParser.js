import path from "path";
import { fileURLToPath } from "url";

import processResumePipeline from "./services/pipeline/processResumePipeline.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testParser = async () => {
  try {
    const filePath = path.join(
      __dirname,
      "uploads",
      "resumes",
      "1778939637773-932173559.pdf"
    );

    const parsedResume = await processResumePipeline(filePath);

    console.log("\n========== STRUCTURED RESUME DATA ==========\n");

    console.log(JSON.stringify(parsedResume, null, 2));

    console.log("\n========== END ==========\n");
  } catch (error) {
    console.error(error.message);
  }
};

testParser();