"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyStudent = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string>();

  useEffect(() => {
    const encodedId = searchParams.get("id");
    setId(encodedId ? encodedId : "ID Not Found");
  }, [searchParams]);

  return <>{"Student ID - " + (id || "ID not found")}</>;
};

export default MyStudent;
