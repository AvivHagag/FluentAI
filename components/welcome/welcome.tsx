"use client";
import Image from "next/image";
import brain from "@/public/brain.png";
import { useEffect, useState } from "react";

interface WelcomePageProps {
  name: string;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ name }) => {
  const [displayedText, setDisplayedText] = useState("");
  const text =
    "בברוכים הבאים ל- FluentAI, הדרך החדשה שלך לשליטה באנגלית באמצעות הכוח של AI.<br/> FluentAI מציעה פלטפורמה דינמית ואינטואיטיבית המתאימה לסגנון ולקצב הלמידה האישיים שלך.<br/> בין אתה מתחיל מאפס או מחפש לחדד את כישורי השפה שלך, התרגילים מונעי הבינה המלאכותית שלנו, השיעורים האינטראקטיביים והמשוב בזמן אמת מותאמים כדי להפוך את חווית הלמידה שלך למרתקת ויעילה.<br/> שמחים שהצטרפת ל- FluentAI, על מנת להתחיל את המסע שלך בחר אחת מהאופציות למטה.";

  const speed = 25;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(intervalId);
    }, speed);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="flex justify-between px-2 w-full">
      <div className="relative w-1/2 lg:w-2/5 animate-pingSmall">
        <Image
          src={brain}
          alt={"brainAI"}
          className="rounded-full mx-4"
          layout="responsive"
          width={300}
          height={300}
        />
      </div>
      <div
        className="flex flex-col justify-center w-1/2 lg:w-3/5 mx-2"
        dir="rtl"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl text-darkRed mb-8">
          ברוך השב, {name}
        </h1>
        <div
          className="text-xs md:text-md lg:text-md font-medium text-lightRed"
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        ></div>
      </div>
    </div>
  );
};

export default WelcomePage;
