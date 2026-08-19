import { Header } from "../components/Header"
import { GoalSetting } from "../components/score/GoalSetting"
import { ScoreSummary } from "../components/score/ScoreSummay"
import { ScoreTable } from "../components/score/ScoreTable"
import { ScoreTrendChart } from "../components/score/ScoreTrendChart"
import { useGetScore } from "../hooks/score/useGetScore"
import { useGetUser } from "../hooks/user/useGetUser"
import { ErrorPage } from "./ErrorPage"
import { LoadingPage } from "./LoadingPage"

export const ScorePage = () => {
    const userQuery = useGetUser();
    const scoreQuery = useGetScore();

    if (userQuery.isLoading || scoreQuery.isLoading) {
        return (
            <div className="min-h-screen">
                <Header />
                <LoadingPage />
            </div>
        )
    };

    if (userQuery.isError || scoreQuery.isError ||
        !userQuery.data || !scoreQuery.data) {
        return (
            <div className="min-h-screen">
                <Header />
                <ErrorPage onRetry={() => {
                    userQuery.refetch();
                    scoreQuery.refetch();
                }} />
            </div>
        )
    }
    return (
        <div className="min-h-screen">
            <Header />
            <main className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="w-full max-w-5xl mx-auto space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        <ScoreSummary nextExamDate={userQuery.data.nextExamDate} scores={scoreQuery.data} />
                        <GoalSetting user={userQuery.data} scores={scoreQuery.data} />
                    </div>
                    <ScoreTrendChart targetScore={userQuery.data.targetScore} scores={scoreQuery.data} />
                    <ScoreTable scores={scoreQuery.data} />
                </div>
            </main>
        </div>
    )
}