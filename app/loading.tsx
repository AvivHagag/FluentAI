import React from "react";
import HashLoader from "react-spinners/HashLoader";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center pb-2 space-x-2">
      <p className="text-darkRed text-xxs py-2" dir="rtl">
        טוען ..
      </p>
      <HashLoader color="#E85A4F" size={25} />
    </div>
  );
}
