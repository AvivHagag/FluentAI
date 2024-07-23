import { auth } from "@/auth";
import { PieChartComponent } from "@/components/stats/pieChartComponent";
import StudentOptionsCards from "@/components/student/StudentOptionsCards";
import WelcomePage from "@/components/welcome/welcome";
import { studentStats } from "@/lib/ServerActions/ServerActions";
const StudentPage = async () => {
  const session = await auth();
  const Stats = await studentStats(session?.user?.id);
  console.log(Stats);
  return (
    <>
      <div>
        {session?.user.name && <WelcomePage name={session?.user.name} />}
      </div>
      <h2 className="text-center text-xl md:text-2xl lg:text-3xl 2xl:text-5xl text-darkRed mb-2 sm:mb-4">
        סטטיסטיקות
      </h2>
      <div className="flex flex-row space-x-2 px-2 md:px-4 w-4/5 mx-auto">
        <div className="w-1/3">
          <PieChartComponent />
        </div>
        <div className="w-1/3">
          <PieChartComponent />
        </div>
        <div className="w-1/3">
          <PieChartComponent />
        </div>
      </div>
      <StudentOptionsCards />
    </>
  );
};

export default StudentPage;
