const SKILLS_DATABASE = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "React",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "SQL",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JWT",
  "REST APIs",
  "Git",
  "Code2",
  "NLP",
  "RAG",
  "LLM",
  "Machine Learning",
  "Deep Learning",
  "OCR",
  "TF-IDF",
  "Streamlit",
  "Vercel",
  "Netlify",
  "Railway",
  "Docker",
  "Firebase",
];

const extractSkills = (resumeText) => {
  if (!resumeText || typeof resumeText !== "string") {
    return [];
  }

  const extractedSkills = [];

  const normalizedText = resumeText.toLowerCase();

  for (const skill of SKILLS_DATABASE) {
    const normalizedSkill = skill.toLowerCase();

    if (normalizedText.includes(normalizedSkill)) {
      extractedSkills.push(skill);
    }
  }

  // Remove duplicates
  const uniqueSkills = [...new Set(extractedSkills)];

  return uniqueSkills;
};

export default extractSkills;