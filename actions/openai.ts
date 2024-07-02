'use server'
import { ChatOpenAI } from '../node_modules/@langchain/openai'
const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePrompt(practicePrompt: string) {
  const response = await chatModel.invoke(practicePrompt)
  return JSON.parse(response.lc_kwargs.content as string)
}
