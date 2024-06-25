import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentAI",
  description:
    "FluentAI offers a personalized and interactive learning experience for English language learners of all levels.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main className="h-full flex flex-col w-full text-xl bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige">
            <div className="flex-grow">{children}</div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
