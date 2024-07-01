import { CardWrapper } from "./card-wrapper";
import GameLogo from "@/public/studentCards/GameLogo (1).png";
import SelfLearningLogo from "@/public/studentCards/SelfLearningLogo (1).png";
import TasksLogo from "@/public/studentCards/TasksLogo (1).png";
const StudentOptionsCards = () => {
  return (
    <div className="flex flex-wrap items-center justify-center py-16">
      <CardWrapper
        image={GameLogo}
        headerTitle="משחק"
        urlPath="/student/game"
      />
      <CardWrapper
        image={SelfLearningLogo}
        headerTitle="לימוד עצמי"
        urlPath="/student/selflearning"
      />
      <CardWrapper
        image={TasksLogo}
        headerTitle="משימות לביצוע"
        urlPath="/student/tasks"
      />
    </div>
  );
};

export default StudentOptionsCards;
