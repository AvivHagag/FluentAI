"use client";
import { Question, Student } from "@prisma/client";
import { PaginationPage } from "./PaginationPage";
import { useEffect, useRef, useState } from "react";
import QuestionComponent from "./Question";
import { Button } from "@/components/ui/button";

interface TaskCreatorProps {
  student: Student;
}

interface level {
  name: string;
  label: string;
}

export function TaskCreator({ student }: TaskCreatorProps) {
  const [level, setLevel] = useState<level | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const topOfComponentRef = useRef<HTMLDivElement>(null);
  const [questionArr, setQuestionArr] = useState<Question[]>([]);
  const Levels = [
    { name: "Easy", label: "קל" },
    { name: "Medium", label: "בינוני" },
    { name: "Hard", label: "קשה" },
  ];

  const ScrollUp = () => {
    // if (topOfComponentRef.current) {
    //   topOfComponentRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
  };
  const handleLevelChosen = (LevelChosen: level) => {
    setLevel(LevelChosen);
  };

  const AddQuesion = () => {};

  useEffect(() => {
    console.log(questionArr);
  }, [questionArr]);

  return (
    <>
      {!level ? (
        <div className="flex flex-col items-center m-1 sm:m-2 mb-4">
          <div
            className="text-center text-base sm:text-xl text-black"
            dir="rtl"
          >
            אנא בחר את הרמה של המשימה
          </div>
          <div className="flex flex-col sm:flex-row" dir="rtl">
            {Levels.map((level) => (
              <Button
                key={level.label}
                variant="outline"
                className="m-2 border-mediumBeige hover:bg-grayish text-mediumBeige"
                onClick={() => handleLevelChosen(level)}
              >
                {level.label}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-full min-h-full px-2"
          ref={topOfComponentRef}
        >
          <div
            className="text-center text-base sm:text-md md:text-lg text-darkRed py-1"
            dir="rtl"
          >
            כמות שאלות במשימה כרגע - {questionArr.length + 1}
          </div>
          <div className="flex justify-between">
            <div
              className="text-base sm:text-md md:text-lg text-grayish underline py-1"
              dir="rtl"
            >
              רמת שאלות - {level.label}
            </div>
            <div
              className="text-base sm:text-md md:text-lg text-grayish underline py-1"
              dir="rtl"
            >
              שאלה נוכחית כרגע - {currentPage}
            </div>
          </div>
          <div className="flex flex-col flex-grow justify-center items-center">
            <QuestionComponent
              key={currentPage}
              questionArr={questionArr}
              setQuestionArr={setQuestionArr}
              currentPage={currentPage}
              level={level.name}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <div className="flex flex-col justify-center items-end mt-auto">
            <PaginationPage
              questionAmount={questionArr.length + 1}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              ScrollUp={ScrollUp}
              AddQuesion={AddQuesion}
            />
          </div>
        </div>
      )}
    </>
  );
}
