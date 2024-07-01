"use client";
import React, { useState } from "react";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Image from "next/image";

interface SideBarChooseProps {
  handleChooesn: (chosenName: string) => void;
}

const SideBarChoose: React.FC<SideBarChooseProps> = ({ handleChooesn }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex " dir="rtl">
      {!isSidebarOpen ? (
        <button
          className="fixed mr-1 text-darkRed w-10 h-10 sm:hidden z-[600]"
          onClick={toggleSidebar}
          aria-label="Open Sidebar"
        >
          <Squares2X2Icon width={30} height={30} />
        </button>
      ) : (
        <button
          className="fixed mr-1 text-darkRed w-10 h-10 sm:hidden z-[600]"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <XMarkIcon width={30} height={30} />
        </button>
      )}
      <div
        className={`flex flex-col rounded-r-lg w-32 md:w-40 transform transition-transform ease-in-out duration-300 inset-y-0 right-0 ${
          isSidebarOpen ? "translate-x-0 z-[500]" : "translate-x-full z-[500]"
        } sm:translate-x-0 sm:static sm:z-0`}
      >
        <div
          className={`flex flex-col min-h-96 h-full py-12 px-3 sm:py-3 sm:space-y-3 text-lightRed text-sm md:text-xl whitespace-nowrap space-y-4 rounded-r-lg border-l border-grayish bg-mediumBeige ${
            isSidebarOpen
              ? "z-[500]"
              : "border-transparent bg-transparent sm:border-l sm:border-grayish sm:bg-mediumBeige"
          }`}
        >
          <div
            className="cursor-pointer"
            onClick={() => handleChooesn("vocabulary")}
          >
            אוצר מילים
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleChooesn("grammar")}
          >
            דקדוק
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleChooesn("openQuestions")}
          >
            שאלות פתוחות
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarChoose;
