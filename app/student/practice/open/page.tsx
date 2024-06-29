'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generatePrompt } from './openai'

export default function PracticePage() {
  const [response, setResponse] = useState({
    paragraph: '',
    question: '',
    answers: ['1', '2', '3', '4'],
    correct: '',
  })
  const [correctOrNot, setCorrectOrNot] = useState('')

  useEffect(() => {
    async function onLoad() {
      let r = await generatePrompt()
      setResponse(r)
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
