import { Header } from "../components/Header"
import { GoalSetting } from "../components/score/GoalSetting"
import { ScoreSummary } from "../components/score/ScoreSummay"
import { ScoreTable } from "../components/score/ScoreTable"
import { ScoreTrendChart } from "../components/score/ScoreTrendChart"
import { useUser } from "../hooks/user/useUser"

export const ScorePage = () => {
    const { data, isLoading, isError } = useUser();

    if (isLoading) return <div>読み込み中...</div>;
    if (isError || !data) return <div>データの取得に失敗しました</div>;
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <ScoreSummary nextExamDate={data.nextExamDate}/>
                    <GoalSetting user={data}/>
                </div>
                <ScoreTrendChart targetScore={data.targetScore}/>
                <ScoreTable />
            </main>
        </div>
    )
}