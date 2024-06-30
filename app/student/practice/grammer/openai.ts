'use server'
import { ChatOpenAI } from '@langchain/openai'

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePrompt(level: string) {
  const prompt = `Generate a sentence with a grammatical error and the correct sentence in a json format -
mistake under "mistake" and correct under "correct" do it in ${level} level.`
  const response = await chatModel.invoke(prompt)
  return JSON.parse(response.lc_kwargs.content as string)
}
