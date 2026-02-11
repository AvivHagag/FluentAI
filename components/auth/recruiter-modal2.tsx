"use client";

import { Zoom } from "react-awesome-reveal";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import recruiterGif from "@/public/recruiterGif.webp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";

interface RecruiterModal2Props {
  open: boolean;
  onClose: () => void;
  onSelectAccount: (email: string, password: string) => void;
}

export function RecruiterModal2({
  open,
  onClose,
  onSelectAccount,
}: RecruiterModal2Props) {
  const handleAccountClick = (email: string, password: string) => {
    onSelectAccount(email, password);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent
        className="w-[95%] xs:max-w-[425px] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-lightBeige to-mediumBeige border border-white shadow-md p-6 text-right"
        dir="rtl"
      >
        <Zoom>
          <DialogHeader className="relative">
            <div className="flex justify-between items-center">
              <DialogTitle
                className="flex text-right text-2xl font-bold"
                dir="rtl"
              >
                מגייסים? ראשי צוות? <br />
                ברוכים הבאים!
              </DialogTitle>
              <Image
                src={recruiterGif}
                alt="brainAI"
                className="rounded-full sm:ml-2 md:ml-8 sm:mr-8 lg:mr-2"
                width={60}
                height={60}
              />
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <DialogDescription className="text-lg">
              על מנת לחסוך לכם זמן ולהימנע מתהליך ההרשמה הארוך, הכנתי עבורכם שני
              משתמשים לדוגמה!
              <br />
              אני שמח שהגעתם, להלן פרטי ההתחברות:
            </DialogDescription>

            <div className="p-4 bg-white rounded-lg shadow-sm space-y-2 text-right">
              <div
                onClick={() =>
                  handleAccountClick("teacher@teacher.com", "121212")
                }
                className="cursor-pointer"
              >
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="font-semibold text-darkRed">
                      התחבר בתור מורה:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>אימייל: teacher@teacher.com</p>
                      <p>סיסמה: 121212</p>
                    </div>
                  </div>
                  <CursorArrowRaysIcon className="w-8 h-8 animate-bounce" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm space-y-2 text-right">
              <div
                onClick={() => handleAccountClick("test@test.com", "121212")}
                className="cursor-pointer"
              >
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <p className="font-semibold text-darkRed">
                      התחבר בתור תלמיד:
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>אימייל: test@test.com</p>
                      <p>סיסמה: 121212</p>
                    </div>
                  </div>
                  <CursorArrowRaysIcon className="w-8 h-8 animate-bounce" />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p>👋 רוצים לדעת עוד? אני כאן בשבילכם!</p>
              <p>
                📧 צרו קשר:{" "}
                <a
                  href="mailto:danarvili@gmail.com"
                  className="hover:cursor-pointer hover:underline"
                >
                  danarvili@gmail.com
                </a>
              </p>
              <p>
                📞 או התקשרו:{" "}
                <a
                  href="tel:0533387584"
                  className="hover:cursor-pointer hover:underline"
                >
                  053-3387584
                </a>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-lightBeige hover:bg-mediumBeige border border-lightRed rounded-full text-lightRed"
            >
              הבנתי, תודה!
            </Button>
          </div>
        </Zoom>
      </DialogContent>
    </Dialog>
  );
}
