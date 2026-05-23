const generateInterviewQuestions = async ({
  skills = [],
  projects = [],
  githubAnalysis = {},
}) => {
  try {
    const questions = [];

    /*
    ==============================
    PROJECT-BASED QUESTIONS
    ==============================
    */

    const cleanProjects = projects
      .filter(
        (project) =>
          project &&
          project.length > 8 &&
          project.length < 80 &&
          !project.includes("|")
      )
      .slice(0, 2);

    cleanProjects.forEach(
      (project) => {
        questions.push(
          `Can you walk me through the architecture of "${project}" and explain the key technical decisions you made while building it?`
        );
      }
    );

    /*
    ==============================
    SKILL-BASED QUESTIONS
    ==============================
    */

    skills
      .slice(0, 4)
      .forEach((skill) => {
        questions.push(
          `How have you used ${skill} in real-world projects, and what technical challenges did you solve using it?`
        );
      });

    /*
    ==============================
    GITHUB-BASED QUESTIONS
    ==============================
    */

    if (
      githubAnalysis?.repositories
        ?.length > 0
    ) {
      const topRepo =
        githubAnalysis.repositories[0];

      if (topRepo?.name) {
        questions.push(
          `I noticed your GitHub project "${topRepo.name}" — what was the most challenging engineering problem you solved while building it?`
        );
      }
    }

    /*
    ==============================
    FALLBACK QUESTIONS
    ==============================
    */

    if (
      questions.length < 6
    ) {
      questions.push(
        "Tell me about the most technically challenging problem you solved recently."
      );

      questions.push(
        "How do you approach debugging production issues in a live application?"
      );

      questions.push(
        "If you were asked to scale one of your projects to 10x traffic, how would you approach it?"
      );
    }

    return [
      ...new Set(questions),
    ].slice(0, 6);
  } catch (error) {
    console.error(
      "Interview Question Generation Error:",
      error
    );

    return [];
  }
};

export default generateInterviewQuestions;