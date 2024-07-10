import TeachersToApprove from "@/components/admin/teachers-to-approve";
import { getTeachersWaitingApproval } from "@/lib/ServerActions/ServerActions";

const TeacherApproval = async () => {
  const Teachers = await getTeachersWaitingApproval();
  return (
    <>
      <h2
        className="text-lg sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lightRed to-darkRed px-2 sm:px-4 xl:px-16 pt-4 sm:pt-8 lg:pt-16"
        dir="rtl"
      >
        אישור מורים חדשים לאתר:
      </h2>
      {Teachers && <TeachersToApprove Teachers={Teachers} />}
    </>
  );
};

export default TeacherApproval;
