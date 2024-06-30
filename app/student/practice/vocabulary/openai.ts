'use server'
import { ChatOpenAI } from '@langchain/openai'

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePrompt(level: string) {
  const prompt = `Hello, please write 10 words in english in ${level} level, do it in json format words will be in an array under "words" and the translation of them in Hebrew will be in an array under "answers" corresponding to the words.`
  const response = await chatModel.invoke(prompt)
  return JSON.parse(response.lc_kwargs.content as string)
}
