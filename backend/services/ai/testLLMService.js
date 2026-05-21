import analyzeCandidate from "./candidateAnalyzer.js";

const testLLMConnection = async () => {
  try {
    const candidateData = {
      name: "John Doe",

      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
      ],

      experience:
        "2 years MERN stack development",

      resumeText:
        "Experienced MERN stack developer with strong frontend and backend skills.",
    };

    const analysis =
      await analyzeCandidate(candidateData);

    console.log(
      "\n===== STRUCTURED AI RESPONSE =====\n"
    );

    console.log(
      JSON.stringify(analysis, null, 2)
    );

    console.log(
      "\n==================================\n"
    );
  } catch (error) {
    console.error(
      "TEST AI ERROR:",
      error.message
    );
  }
};

export default testLLMConnection;