'use server'
import { ChatOpenAI } from '@langchain/openai'

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generatePrompt() {
  const prompt = `Hello, please write for me a paragraph about anything you want and a question about that paragraph with 4 possible answers with only one that is correct, do in in json structure with the paragraph in "paragraph" the question in "question" and the answers in array inside "questions" and the correct answer in "correct".`
  const response = await chatModel.invoke(prompt)
  return JSON.parse(response.lc_kwargs.content as string)
}
