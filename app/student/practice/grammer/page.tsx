'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { generatePrompt } from './openai'

export default function VocabularyPage() {
  const [response, setResponse] = useState({
    mistake: '',
    correct: '',
  })
  const [userAnswer, setUserAnswer] = useState('')

  async function handleRequest(level: string) {
    let r = await generatePrompt(level)
    setResponse(r)
  }

  function handleAnswerSubmit() {
    if (userAnswer.trim().toLowerCase() === response.correct.toLowerCase()) {
      setResponse((prevResponse) => ({
        ...prevResponse,
        mistake: 'Correct!',
      }))
    } else {
      setResponse((prevResponse) => ({
        ...prevResponse,
        mistake: 'Incorrect. Try again.',
      }))
    }
  }

  return (
    <>
      <header>
        <div className="flex items-center gap-2 mb-4">
          <h2>Hello, Choose your level for grammar please.</h2>
          <Button onClick={() => handleRequest('Hard')}>Hard</Button>
          <Button onClick={() => handleRequest('Medium')}>Medium</Button>
          <Button onClick={() => handleRequest('Easy')}>Easy</Button>
        </div>
      </header>

      <main>
        {response.correct && (
          <div>
            <h1>{response.mistake}</h1>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
            />
            <Button onClick={handleAnswerSubmit}>Submit Answer</Button>
          </div>
        )}
      </main>
    </>
  )
}
