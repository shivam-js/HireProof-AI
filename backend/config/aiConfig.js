import dotenv from "dotenv";

dotenv.config();


const aiConfig = {
  provider: process.env.LLM_PROVIDER || "groq",

  model: process.env.AI_MODEL,

  temperature: Number(process.env.AI_TEMPERATURE) || 0.3,

  maxTokens: Number(process.env.AI_MAX_TOKENS) || 2000,

  openai: {
    apiKey: process.env.OPENAI_API_KEY,
  },

  groq: {
    apiKey: process.env.GROQ_API_KEY,
  },
};

console.log("AI CONFIG DEBUG:", {
  provider: process.env.LLM_PROVIDER,
  model: process.env.AI_MODEL,
});

export default aiConfig;