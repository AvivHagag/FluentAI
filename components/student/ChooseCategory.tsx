"use client";

import { useState } from "react";
import SideBarChoosen from "./side-bar-choosen";

const ChooseCategory = () => {
  const [categoryChoosen, setCategoryChoosen] = useState<string>("Vocabulary");

  const handleChooesn = (ChoosenName: string) => {
    setCategoryChoosen(ChoosenName);
  };

  return (
    <>
      {
        <div className="flex justify-center min-h-96 mx-2 border border-grayish rounded-lg bg-lightBeige">
          <div className="w-full">{categoryChoosen}</div>

          <SideBarChoosen handleChooesn={handleChooesn} />
        </div>
      }
    </>
  );
};

export default ChooseCategory;
