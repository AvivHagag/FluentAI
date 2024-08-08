import StudentCard from "@/components/teacher/myStudent/studentCard";
import StudentStatistics from "@/components/student/studentStatistics";
import { getStudentData } from "@/lib/ServerActions/ServerActions";
import { Tasks } from "@/components/teacher/myStudent/tasks";
import TitleAndButton from "@/components/headerNav/TitleAndButton";
export default async function MyStudent({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const studentData = await getStudentData(searchParams.id);
  let studentDataForCard, studentDataForTask;
  if (studentData) {
    studentDataForCard = {
      name: studentData?.name,
      image: studentData?.image,
      email: studentData?.user.email,
    };
    studentDataForTask = {
      id: studentData.id,
      tasks: studentData.tasks,
      name: studentData?.name,
    };
  }

  return (
    <>
      <div className="w-2/3 mx-auto">
        <TitleAndButton PageName={"דף תלמיד"} />
      </div>
      <div className="flex flex-col space-y-8 justify-center">
        {studentDataForCard && <StudentCard {...studentDataForCard} />}
        <div className="flex flex-wrap space-x-3 md:space-x-2 sm:px-2 md:px-4 w-full md:w-4/5 mx-auto justify-center">
          {studentData && (
            <StudentStatistics studentStats={studentData.answers} />
          )}
        </div>
        {studentDataForTask && <Tasks {...studentDataForTask} />}
      </div>
    </>
  );
}
