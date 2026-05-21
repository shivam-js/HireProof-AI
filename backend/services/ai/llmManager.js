import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

import aiConfig from "../../config/aiConfig.js";

const createOpenAIModel = () => {
  return new ChatOpenAI({
    openAIApiKey: aiConfig.openai.apiKey,
    modelName: aiConfig.model,
    temperature: aiConfig.temperature,
    maxTokens: aiConfig.maxTokens,
  });
};

const createGroqModel = () => {
  return new ChatGroq({
    apiKey: aiConfig.groq.apiKey,
    model: aiConfig.model,
    temperature: aiConfig.temperature,
    maxTokens: aiConfig.maxTokens,
  });
};

const getLLM = () => {
  switch (aiConfig.provider) {
    case "openai":
      return createOpenAIModel();

    case "groq":
      return createGroqModel();

    default:
      throw new Error("Unsupported AI provider");
  }
};

export { getLLM };