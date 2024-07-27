"use client";
import { Dispatch, SetStateAction, useState } from "react";
import StarRating from "./starRating";
import { Button } from "@/components/ui/button";
import { AddReviewToTeacher } from "@/lib/ServerActions/ServerActions";
import { useRouter } from "next/navigation";

interface AddReviewProps {
  review: number | null | undefined;
  teacherId: string | undefined;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const AddReview: React.FC<AddReviewProps> = ({
  review,
  teacherId,
  setIsLoading,
}) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>();
  const [ratingError, setRatingError] = useState<boolean>(false);

  const handleSaveChanges = async () => {
    if (!rating || !teacherId) {
      return;
    }
    const ExistReview = review != null;
    setIsLoading(true);
    await AddReviewToTeacher(ExistReview, rating, teacherId);
    router.refresh();
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col mx-auto py-4" dir="rtl">
      <h3 className="text-center text-xl sm:text-2xl text-lightRed">
        בחר דירוג למורה:
      </h3>
      <div className="flex flex-col items-center my-2 justify-center">
        <StarRating
          rating={rating}
          setRating={setRating}
          setRatingError={setRatingError}
        />
        {ratingError && <div className="text-red-500 text-sm">חסר דירוג</div>}
      </div>
      {!rating ? (
        <p className="text-center text-xl sm:text-2xl text-darkRed">
          דירוג נוכחי:
          <br />
          {review}/5
        </p>
      ) : (
        <>
          {rating && (
            <p className="text-center text-xl sm:text-2xl text-darkRed">
              {rating}/5
            </p>
          )}
        </>
      )}
      <div className="flex flex-col items-center justify-center mt-8 ">
        <Button
          variant={"outline"}
          className="bg-lightBeige border border-lightRed rounded-full text-lightRed"
          onClick={() => handleSaveChanges()}
        >
          שמור שינויים
        </Button>
      </div>
    </div>
  );
};

export default AddReview;
