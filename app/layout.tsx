import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
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
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {session && <Navbar />}
          <main className="flex-grow w-full min-h-screen text-xl bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige">
            {children}
          </main>
          {session && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
