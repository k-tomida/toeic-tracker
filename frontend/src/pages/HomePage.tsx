import { Header } from "../components/Header";
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap";
import { KpiCards } from "../components/home/KpiCards";
import { ScoreChart } from "../components/home/ScoreChart";
import { StudySession } from "../components/home/StudySession";

export const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <KpiCards />
        <HeatMap />
        <GoalProgress />
        <div className="flex flex-wrap gap-4 mx-10">
          <ScoreChart />
          <StudySession />
        </div>
      </main>
    </div>
  );
};
