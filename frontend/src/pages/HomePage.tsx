import { Header } from "../components/Header";
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap";
import { KpiCards } from "../components/home/KpiCards";
import { ScoreChart } from "../components/home/ScoreChart";
import { StudySession } from "../components/home/StudySession";
import { useGetScore } from "../hooks/score/useGetScore";
import { useStudySession } from "../hooks/study_session/useStudySession";
import { useUser } from "../hooks/user/useUser";
import { useGetVocabulary } from "../hooks/vocabulary/useGetVocabulary";

export const HomePage = () => {
  const userQuery = useUser();
  const studySessionQuery = useStudySession();
  const scoreQuery = useGetScore();
  const vocabularyQuery = useGetVocabulary();

  if (userQuery.isLoading || studySessionQuery.isLoading || scoreQuery.isLoading || vocabularyQuery.isLoading) return <div>読み込み中...</div>;
  if (userQuery.isError || studySessionQuery.isError || scoreQuery.isError || vocabularyQuery.isError ||
    !userQuery.data || !studySessionQuery.data || !scoreQuery.data || !vocabularyQuery.data) {
    return <div>データの取得に失敗しました</div>;
  }
  return (
    <div className="min-h-screen ">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <KpiCards studySessions={studySessionQuery.data} scores={scoreQuery.data} vocabularies={vocabularyQuery.data} />
        <HeatMap studySessions={studySessionQuery.data} />
        <GoalProgress targetScore={userQuery.data.targetScore} scores={scoreQuery.data} />
        <div className="flex flex-wrap gap-4 mx-10">
          <ScoreChart scores={scoreQuery.data} />
          <StudySession studySessions={studySessionQuery.data} />
        </div>
      </main>
    </div>
  );
};