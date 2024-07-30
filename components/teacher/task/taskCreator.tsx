"use client";

import { Button } from "@/components/ui/button";
import { Student } from "@prisma/client";
import { PaginationPage } from "./PaginationPage";
import { useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";

interface TaskCreatorProps {
  student: Student;
}

export function TaskCreator({ student }: TaskCreatorProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [questionAmount, setQuestionAmount] = useState<number>(1);
  const topOfComponentRef = useRef<HTMLDivElement>(null);

  const ScrollUp = () => {
    if (topOfComponentRef.current) {
      topOfComponentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const AddQuesion = () => {
    setQuestionAmount(questionAmount + 1);
  };

  return (
    <div className="flex flex-col w-full h-full px-2" ref={topOfComponentRef}>
      <div
        className="text-center text-base sm:text-md md:text-lg text-darkRed py-1"
        dir="rtl"
      >
        כמות שאלות במשימה כרגע - {questionAmount}
      </div>
      <div
        className="text-base sm:text-md md:text-lg text-grayish underline py-1"
        dir="rtl"
      >
        שאלה נוכחית כרגע - {currentPage}
      </div>

      <div className="flex flex-col items-end justify-center">
        <PaginationPage
          questionAmount={questionAmount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ScrollUp={ScrollUp}
          AddQuesion={AddQuesion}
        />
      </div>
    </div>
  );
}
