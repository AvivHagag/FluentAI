"use client";
import { useState } from "react";
import SideBarChosen from "./side-bar-chosen";
import UserProfile from "./profile/profile";
import TeacherReview from "./review/teacherReview";
import { Session } from "next-auth";

interface ChooseCategoryProps {
  session: Session;
  teacher: TeacherWithScore | null | undefined;
}

interface TeacherWithScore {
  id: string;
  name: string | null;
  image: string | null;
  score: number | null;
}

const ChooseCategory: React.FC<ChooseCategoryProps> = ({
  session,
  teacher,
}) => {
  const [categoryChosen, setCategoryChosen] = useState<string>("profile");

  const handleChooesn = (ChosenName: string) => {
    setCategoryChosen(ChosenName);
  };

  return (
    <>
      {
        <div className="flex justify-center min-h-screen md:min-h-[500px] mx-2 lg:mx-8 2xl:mx-16 border border-mediumBeige shadow-xl rounded-lg bg-lightBeige">
          <div className="min-h-screen md:min-h-[500px] flex-grow mx-2">
            {categoryChosen === "profile" && <UserProfile session={session} />}
            {categoryChosen === "teacher" && (
              <TeacherReview teacher={teacher} />
            )}
          </div>
          <SideBarChosen
            categoryChosen={categoryChosen}
            handleChooesn={handleChooesn}
          />
        </div>
      }
    </>
  );
};

export default ChooseCategory;
