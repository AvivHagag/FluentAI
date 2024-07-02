'use client'
import { Button } from '../../ui/button'
//import { Button } fro'@/coponents/ui/bun'
//import { generatePrompt } from '@/actions/openai'
import { generatePrompt } from '../../../actions/openai'
import { useState } from 'react'

export default function GrammerClient() {
  const [response, setResponse] = useState({
    mistake: '',
    correct: '',
  })
  const [userAnswer, setUserAnswer] = useState('')

  async function handleRequest(level: string) {
    let prompt = `Generate a sentence with a grammatical error and the correct sentence in a json format -
mistake under "mistake" and correct under "correct" do it in ${level} level.`
    let r = await generatePrompt(prompt)
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
