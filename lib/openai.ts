"use server";
import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePrompt = async (Prompt: string) => {
  const response = await chatModel.invoke(Prompt);
  return JSON.parse(response.lc_kwargs.content as string);
};

export const GrammarRequest = async (LevelChoosen: string) => {
  const prompt = `Generate a question with a grammatical error appropriate for ${LevelChoosen} level, 
and provide the correct version of the question. Return the response in the following JSON format:
{
    "mistake": "<incorrect question>",
    "correct": "<correct question>"
}`;
  const Result = await generatePrompt(prompt);
  return Result;
};
