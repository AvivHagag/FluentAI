"use client";
import { useState } from "react";
import SideBarChoosen from "./side-bar-choosen";
import GrammerClient from "./grammar/grammarContent";

const ChooseCategory = () => {
  const [categoryChoosen, setCategoryChoosen] = useState<string>("grammar");

  const handleChooesn = (ChoosenName: string) => {
    console.log(ChoosenName);
    setCategoryChoosen(ChoosenName);
  };

  return (
    <>
      {
        <div className="flex justify-center min-h-96 mx-2 border border-grayish rounded-lg bg-lightBeige">
          <div className="flex-grow mx-2 mt-8">
            {categoryChoosen === "grammar" && <GrammerClient />}
          </div>
          <SideBarChoosen
            categoryChoosen={categoryChoosen}
            handleChooesn={handleChooesn}
          />
        </div>
      }
    </>
  );
};

export default ChooseCategory;
