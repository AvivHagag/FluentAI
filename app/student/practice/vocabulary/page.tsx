'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { generatePrompt } from './openai'
import {
  hardAnswersVocabulary,
  mediumAnswersVocabulary,
  easyAnswersVocabulary,
} from '@/components/vocabulary-random/vocabulary'

export default function VocabularyPage() {
  const [fourAnswersArray, setFourAnswersArray] = useState<string[][]>([])
  const [rightOrWrong, setRightOrWrong] = useState<string[]>(Array(10).fill(''))
  const [response, setResponse] = useState({
    words: [],
    answers: [],
  })

  function handleRightOrWrong(
    answer: string,
    realAnswer: string,
    index: number
  ) {
    if (answer === realAnswer) {
      const tempArray = [...rightOrWrong]
      tempArray[index] = 'Good Job'
      setRightOrWrong(tempArray)
    } else {
      const tempArray = [...rightOrWrong]
      tempArray[index] = 'Bad choice'
      setRightOrWrong(tempArray)
    }
  }

  async function handleRequest(level: string) {
    let r = await generatePrompt(level)
    setResponse(r)

    let answersArray: string[] = []
    let tempFourAnswersArray: string[][] = []

    r.words.map((word: string, index: number) => {
      if (level === 'Hard') {
        answersArray = hardAnswersVocabulary()
      } else if (level === 'Medium') {
        answersArray = mediumAnswersVocabulary()
      } else {
        answersArray = easyAnswersVocabulary()
      }

      let correctIndex = Math.floor(Math.random() * 4)
      answersArray[correctIndex] = r.answers[index]
      tempFourAnswersArray[index] = [...answersArray] // Use spread operator to avoid reference issues
    })

    setFourAnswersArray(tempFourAnswersArray)
  }

  return (
    <>
      <header>
        <div className="flex item-center gap-2 mb-4">
          <h2>Hello, Choose your level please.</h2>
          <Button onClick={() => handleRequest('Hard')}>Hard</Button>
          <Button onClick={() => handleRequest('Medium')}>Medium</Button>
          <Button
            onClick={() => {
              handleRequest('Easy')
            }}>
            Easy
          </Button>
        </div>
      </header>

      <main>
        {response.words.length > 0 && (
          <div>
            {response.words.map((word, index) => (
              <div key={index} className="mb-4">
                <h3>{word}</h3>

                <ul>
                  {fourAnswersArray[index]?.map((answer, key) => (
                    <>
                      <Button
                        onClick={() =>
                          handleRightOrWrong(
                            answer,
                            response.answers[index],
                            index
                          )
                        }>
                        {answer}
                      </Button>
                    </>
                  ))}
                  <p>{rightOrWrong[index]}</p>
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
