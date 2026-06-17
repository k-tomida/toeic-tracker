import { Header } from "../components/Header";
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap";
import { KpiCards } from "../components/home/KpiCards";
import { ScoreChart } from "../components/home/ScoreChart";
import { StudySession } from "../components/home/StudySession";

const dummyData = [
  { date: "2026-06-23", studyTime: 120 },
  { date: "2026-10-01", studyTime: 60 },
  { date: "2026-10-02", studyTime: 30 },
  { date: "2026-11-15", studyTime: 90 },
];

export const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <KpiCards />
        <HeatMap data={dummyData} />
        <GoalProgress />
        <div className="flex justify-between flex-wrap gap-4 mx-10">
          <ScoreChart />
          <StudySession />
        </div>
      </main>
    </div>
  );
};
