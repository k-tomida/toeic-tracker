import { Header } from "../components/Header"
import { GoalSetting } from "../components/score/GoalSetting"
import { ScoreSummary } from "../components/score/ScoreSummay"
import { ScoreTable } from "../components/score/ScoreTable"
import { ScoreTrendChart } from "../components/score/ScoreTrendChart"
import { useGetScore } from "../hooks/score/useGetScore"
import { useUser } from "../hooks/user/useUser"

export const ScorePage = () => {
    const userQuery = useUser();
    const scoreQuery = useGetScore();

    if (userQuery.isLoading || scoreQuery.isLoading) return <div>読み込み中...</div>;
    if (userQuery.isError || scoreQuery.isError ||
        !userQuery.data || !scoreQuery.data) return <div>データの取得に失敗しました</div>;
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <ScoreSummary nextExamDate={userQuery.data.nextExamDate} scores={scoreQuery.data} />
                    <GoalSetting user={userQuery.data} scores={scoreQuery.data} />
                </div>
                <ScoreTrendChart targetScore={userQuery.data.targetScore} scores={scoreQuery.data} />
                <ScoreTable scores={scoreQuery.data} />
            </main>
        </div>
    )
}