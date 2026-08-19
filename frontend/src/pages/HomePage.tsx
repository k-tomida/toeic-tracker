import { Header } from "../components/Header";
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap";
import { KpiCards } from "../components/home/KpiCards";
import { ScoreChart } from "../components/home/ScoreChart";
import { StudySession } from "../components/home/StudySession";
import { useGetScore } from "../hooks/score/useGetScore";
import { useGetStudySession } from "../hooks/study_session/useGetStudySession";
import { useGetUser } from "../hooks/user/useGetUser";
import { useGetVocabulary } from "../hooks/vocabulary/useGetVocabulary";
import { ErrorPage } from "./ErrorPage";
import { LoadingPage } from "./LoadingPage";

export const HomePage = () => {
  const userQuery = useGetUser();
  const studySessionQuery = useGetStudySession();
  const scoreQuery = useGetScore();
  const vocabularyQuery = useGetVocabulary();

  if (userQuery.isLoading || studySessionQuery.isLoading || scoreQuery.isLoading || vocabularyQuery.isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <LoadingPage />
      </div>
    )
  };

  if (userQuery.isError || studySessionQuery.isError || scoreQuery.isError || vocabularyQuery.isError ||
    !userQuery.data || !studySessionQuery.data || !scoreQuery.data || !vocabularyQuery.data) {
    return (
      <div className="min-h-screen">
        <Header />
        <ErrorPage onRetry={() => {
          userQuery.refetch();
          studySessionQuery.refetch();
          scoreQuery.refetch();
          vocabularyQuery.refetch();
        }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="w-full max-w-5xl mx-auto space-y-6">
          <KpiCards studySessions={studySessionQuery.data} scores={scoreQuery.data} vocabularies={vocabularyQuery.data} />
          <HeatMap studySessions={studySessionQuery.data} />
          <GoalProgress targetScore={userQuery.data.targetScore} scores={scoreQuery.data} />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <ScoreChart scores={scoreQuery.data} />
            <StudySession studySessions={studySessionQuery.data} />
          </div>
        </div>
      </main>
    </div>
  );
};