"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const onClick = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full h-full"
        variant={"outline"}
        onClick={() => onClick()}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
