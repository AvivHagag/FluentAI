"use client";
import React, { useState } from "react";
// import NavigationComponent from "./NavigationComponent";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import LogoButton from "./logoButton";
// import NavigationAccordion from "./NavigationAccordion";

interface NavbarcontentProps {
  Role: string;
}

const Navbarcontent: React.FC<NavbarcontentProps> = ({ Role }) => {
  const [imdobileMenuOpen, setImdobileMenuOpen] = useState(false);
  const url = "/";
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => setImdobileMenuOpen(!imdobileMenuOpen)}
          className="md:hidden mr-2 z-40"
        >
          {imdobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7 text-black" />
          ) : (
            <Bars3Icon className="h-7 w-7 text-black" />
          )}
        </button>
        <div className="hidden md:flex flex-row items-center space-x-1">
          <LogoButton />
          {/* <NavigationComponent url={url} /> */}
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-mediumBeige dark:bg-slate-950 p-8 z-20 md:hidden transition-transform ${
          imdobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center">
          <div
            className="mx-auto pb-2"
            onClick={() => setImdobileMenuOpen(false)}
          >
            <LogoButton />
          </div>{" "}
          {/* <NavigationAccordion
            setImdobileMenuOpen={setImdobileMenuOpen}
            url={url}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Navbarcontent;
