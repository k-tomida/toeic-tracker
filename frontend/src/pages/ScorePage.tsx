import { Header } from "../components/Header"
import { GoalSetting } from "../components/score/GoalSetting"
import { ScoreSummary } from "../components/score/ScoreSummay"

export const ScorePage = () => {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-4 mx-10 my-5">
                    <ScoreSummary />
                    <GoalSetting />
                </div>
            </main>
        </div>
    )
}