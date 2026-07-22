import { Header } from "../components/Header";
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap";
import { KpiCards } from "../components/home/KpiCards";
import { ScoreChart } from "../components/home/ScoreChart";
import { StudySession } from "../components/home/StudySession";
import { useStudySession } from "../hooks/study_session/useStudySession";
import { useUser } from "../hooks/user/useUser";

export const HomePage = () => {
  const userQuery = useUser();
  const studySessionQuery = useStudySession();

  if (userQuery.isLoading || studySessionQuery.isLoading) return <div>読み込み中...</div>;
  if (userQuery.isError || studySessionQuery.isError ||
    !userQuery.data || !studySessionQuery.data) return <div>データの取得に失敗しました</div>;
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <KpiCards studySessions={studySessionQuery.data} />
        <HeatMap studySessions={studySessionQuery.data} />
        <GoalProgress targetScore={userQuery.data.targetScore} />
        <div className="flex flex-wrap gap-4 mx-10">
          <ScoreChart />
          <StudySession studySessions={studySessionQuery.data} />
        </div>
      </main>
    </div>
  );
};