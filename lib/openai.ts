"use server";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrompt = async (Prompt: string) => {
  const response = await chatModel.invoke(Prompt);
  return JSON.parse(response.lc_kwargs.content as string);
};
