"use client";

import { Button } from "@/components/ui/button";
import {
  GrammarRequest,
  OpenQuestionsRequest,
  vocabularyRequest,
} from "@/lib/openai";
import { Question } from "@prisma/client";
import { useEffect, useState } from "react";
import GrammarQuestion from "./GrammarQuestion";
import OpenQuestion from "./OpenQuestion";
import VocabularyQuestion from "./VocabularyQuestion";
import HashLoader from "react-spinners/HashLoader";

interface QuestionComponentProps {
  questionArr: Question[];
  setQuestionArr: React.Dispatch<React.SetStateAction<Question[]>>;
  currentPage: number;
  level: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  questionArr,
  setQuestionArr,
  currentPage,
  level,
  setCurrentPage,
}) => {
  const [Error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [CurrentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("");
  const [responseVocabulary, setResponseVocabulary] = useState({
    words: [],
    answers: [],
  });
  const [responseOpenQuestions, setResponseOpenQuestions] = useState({
    paragraph: "",
    question: "",
    answers: ["1", "2", "3", "4"],
    correctAnswer: 1,
  });
  const [responseGrammar, setResponseGrammar] = useState({
    mistake: "",
    correct: "",
  });
  const getRandomQuestionType = (): string => {
    const questionTypes = ["Grammar", "Vocabulary", "OpenQuestion"];
    const randomIndex = Math.floor(Math.random() * questionTypes.length);
    return questionTypes[randomIndex];
  };

  useEffect(() => {
    setCurrentQuestion(questionArr[currentPage - 1] || null);
  }, [questionArr, currentPage]);

  const handleDeleteQuestion = () => {
    const newQuestionArr = questionArr.filter(
      (_, index) => index !== currentPage - 1
    );
    setQuestionArr(newQuestionArr);
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleSaveQuestion = () => {
    const newQuestion: Question = {
      id: "",
      type: selectedQuestionType,
      text: "",
      correctAnswer: "",
      falseAnswer1: null,
      falseAnswer2: null,
      falseAnswer3: null,
    };

    switch (selectedQuestionType) {
      case "Grammar":
        newQuestion.text = `Mistake: ${responseGrammar.mistake}, Correct: ${responseGrammar.correct}`;
        newQuestion.correctAnswer = responseGrammar.correct;
        break;
      case "Vocabulary":
        newQuestion.text = `Words: ${responseVocabulary.words.join(", ")}`;
        newQuestion.correctAnswer = responseVocabulary.answers[0];
        newQuestion.falseAnswer1 = responseVocabulary.answers[1];
        newQuestion.falseAnswer2 = responseVocabulary.answers[2];
        newQuestion.falseAnswer3 = responseVocabulary.answers[3];
        break;
      case "OpenQuestion":
        newQuestion.text = `Paragraph: ${responseOpenQuestions.paragraph}, Question: ${responseOpenQuestions.question}`;
        newQuestion.correctAnswer =
          responseOpenQuestions.answers[responseOpenQuestions.correctAnswer];
        newQuestion.falseAnswer1 = responseOpenQuestions.answers[0];
        newQuestion.falseAnswer2 = responseOpenQuestions.answers[1];
        newQuestion.falseAnswer3 = responseOpenQuestions.answers[2];
        break;
    }
    setQuestionArr([...questionArr, newQuestion]);
    setCurrentQuestion(newQuestion);
  };

  const handleGenerateQuestion = async () => {
    setIsLoading(true);
    const selectedQuestionType = getRandomQuestionType();
    console.log(selectedQuestionType);
    setSelectedQuestionType(selectedQuestionType);
    try {
      let result;
      switch (selectedQuestionType) {
        case "Grammar":
          result = await GrammarRequest(level);
          setResponseGrammar(result);
          console.log(result);
          break;
        case "Vocabulary":
          result = await vocabularyRequest(level);
          setResponseVocabulary(result);
          console.log(result);
          break;
        case "OpenQuestion":
          result = await OpenQuestionsRequest(level);
          setResponseOpenQuestions(result);
          console.log(result);
          break;
      }
    } catch (error) {
      setError("מצטערים, אך אירעה שגיאה בעת יצירת הבקשה.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pb-2 space-x-2">
          <p className="text-darkRed text-xxs py-2" dir="rtl">
            טוען ..
          </p>
          <HashLoader color="#E85A4F" size={25} />
        </div>
      ) : (
        <>
          {!Error ? (
            <>
              {CurrentQuestion ? (
                <>
                  {CurrentQuestion.type === "Grammar" && (
                    <GrammarQuestion
                      responseGrammar={{
                        mistake: CurrentQuestion.text
                          .split(", Correct: ")[0]
                          .split(": ")[1],
                        correct: CurrentQuestion.correctAnswer,
                      }}
                    />
                  )}
                  {CurrentQuestion.type === "OpenQuestion" && (
                    <OpenQuestion
                      responseOpenQuestions={{
                        paragraph: CurrentQuestion.text
                          .split(", Question: ")[0]
                          .split(": ")[1],
                        question: CurrentQuestion.text.split(", Question: ")[1],
                        answers: [
                          CurrentQuestion.correctAnswer,
                          CurrentQuestion.falseAnswer1!,
                          CurrentQuestion.falseAnswer2!,
                          CurrentQuestion.falseAnswer3!,
                        ],
                        correctAnswer: 0, // This will need to be dynamically set if the correct answer is not always the first one
                      }}
                    />
                  )}
                  {CurrentQuestion.type === "Vocabulary" && (
                    <VocabularyQuestion
                      responseVocabulary={{
                        words: CurrentQuestion.text
                          .split("Words: ")[1]
                          .split(", "),
                        answers: [
                          CurrentQuestion.correctAnswer,
                          CurrentQuestion.falseAnswer1!,
                          CurrentQuestion.falseAnswer2!,
                          CurrentQuestion.falseAnswer3!,
                        ],
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  {selectedQuestionType === "Grammar" && (
                    <GrammarQuestion responseGrammar={responseGrammar} />
                  )}
                  {selectedQuestionType === "OpenQuestion" && (
                    <OpenQuestion
                      responseOpenQuestions={responseOpenQuestions}
                    />
                  )}
                  {selectedQuestionType === "Vocabulary" && (
                    <VocabularyQuestion
                      responseVocabulary={responseVocabulary}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <p className="text-darkRed text-xxs py-2" dir="rtl">
              {Error}
            </p>
          )}
          <div className="flex space-x-8 justify-center items-end w-4/5 p-4 mt-auto">
            {CurrentQuestion && (
              <Button
                variant={"outline"}
                className="bg-lightBeige border border-lightRed rounded-md text-lightRed"
                dir="rtl"
                onClick={() => handleDeleteQuestion()}
              >
                מחיקת שאלה ❌
              </Button>
            )}
            {!CurrentQuestion && (
              <Button
                variant={"outline"}
                className="bg-lightBeige border rounded-md border-green-400 text-green-400"
                dir="rtl"
                onClick={() => handleSaveQuestion()}
              >
                שמירת שאלה ⬇
              </Button>
            )}
            <Button
              variant={"outline"}
              className="bg-lightBeige border rounded-md border-black text-black"
              dir="rtl"
              onClick={() => handleGenerateQuestion()}
            >
              יצירת שאלה חדשה ✚
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionComponent;
