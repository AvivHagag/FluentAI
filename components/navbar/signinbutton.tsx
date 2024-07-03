"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";

interface SigninButtonProps {
  session: Session;
}

const SigninButton: React.FC<SigninButtonProps> = ({ session }) => {
  const [open, setOpen] = useState(false);
  const nameParts = session?.user.name?.split(" ");
  const userInitials =
    nameParts && nameParts.length >= 2
      ? nameParts[0][0] + nameParts[1][0]
      : "AA";
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className="flex items-center space-x-2 bg-transparent border"
            onClick={() => setOpen(!open)}
          >
            <p className="text-darkRed" dir="rtl">
              {session?.user.name}
            </p>
            {session?.user.image ? (
              <>
                <Image
                  src={session?.user.image ?? ""}
                  alt={session?.user.name ?? ""}
                  className="rounded-full"
                  width={32}
                  height={32}
                />{" "}
              </>
            ) : (
              <>
                <Avatar>
                  <AvatarImage />
                  <AvatarFallback className="bg-lightRed">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>{" "}
              </>
            )}
          </NavigationMenuTrigger>
          <NavigationMenuContent
            className="shadow-lg rounded-lg p-4 bg-lightBeige"
            {...(open ? { style: { display: "block" } } : {})}
          >
            <div className="w-32">
              <ul className="flex flex-col items-center space-y-2 text-sm sm:text-base">
                {session?.user.role === "ADMIN" && (
                  <li className="hover:text-naivyBlue hover:scale-105 dark:hover:text-glowGreen">
                    <Link href="/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="hover:text-naivyBlue hover:scale-105 dark:hover:text-glowGreen">
                  <Link href="/setting">Settings</Link>
                </li>
                <Button
                  variant="destructive"
                  className="hover:scale-105"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SigninButton;
