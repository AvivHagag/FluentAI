import { StudentAnswer } from "@prisma/client";
import PieChartComponent from "../stats/pieChartComponent";
import { studentStats } from "@/lib/ServerActions/ServerActions";

interface Stats {
  id: string;
  studentId: string;
  question: QuestionType;
  questionId: string;
  givenAnswer: string;
  isCorrect: boolean;
}

interface QuestionType {
  type: string;
}

interface StudentStatisticsProps {
  id: string;
}

const processStatsData = (stats: Stats[]) => {
  const processedData: Record<
    string,
    { type: string; correctCount: number; totalCount: number }
  > = {};

  stats.forEach((stat) => {
    const { type } = stat.question;
    if (!processedData[type]) {
      processedData[type] = { type, correctCount: 0, totalCount: 0 };
    }
    processedData[type].totalCount += 1;
    if (stat.isCorrect) {
      processedData[type].correctCount += 1;
    }
  });

  return Object.values(processedData);
};

const StudentStatistics: React.FC<StudentStatisticsProps> = async ({ id }) => {
  const Stats = await studentStats(id);
  const processedStats = processStatsData(Stats);
  return (
    <>
      {processedStats.map((item) => (
        <div className="w-1/3" key={item.type}>
          <PieChartComponent item={item} />
        </div>
      ))}
    </>
  );
};

export default StudentStatistics;
