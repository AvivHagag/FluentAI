'use client'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { generatePrompt } from '../../../actions/openai'

export default function OpenClient() {
  const [response, setResponse] = useState({
    paragraph: '',
    question: '',
    answers: ['1', '2', '3', '4'],
    correct: '',
  })
  const [correctOrNot, setCorrectOrNot] = useState('')

  useEffect(() => {
    async function onLoad() {
      let prompt = `Hello, please write for me a paragraph about anything you want and a question about that paragraph with 4 possible answers with only one that is correct, do in in json structure with the paragraph in "paragraph" the question in "question" and the answers in array inside "questions" and the correct answer in "correct".`
      let r = await generatePrompt(prompt)
      setResponse(r)
      console.log('hello man')
    }
    onLoad()
  }, [])

  function handleAnswer(answer: string) {
    if (answer == response.correct) {
      setCorrectOrNot('Correct, good job!')
    } else {
      setCorrectOrNot('Wrong, good luck next time!')
    }
  }
  return (
    <>
      <main>
        <div className="flex item-center gap-2 mb-4">
          <p>{response.paragraph}</p>
          <p>Question:{response.question}</p>
          <Button onClick={() => handleAnswer(response.answers[0])}>
            {response.answers[0]}
          </Button>
          <Button onClick={() => handleAnswer(response.answers[1])}>
            {response.answers[1]}
          </Button>
          <Button onClick={() => handleAnswer(response.answers[2])}>
            {response.answers[2]}
          </Button>
          <Button onClick={() => handleAnswer(response.answers[3])}>
            {response.answers[3]}
          </Button>
        </div>
        <div>{correctOrNot}</div>
      </main>
    </>
  )
}
