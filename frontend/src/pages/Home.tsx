import { Header } from "../components/Header"
import { GoalProgress } from "../components/home/GoalProgress";
import { HeatMap } from "../components/home/HeatMap"
import { KpiCards } from "../components/home/KpiCards"
import { ScoreChart } from "../components/home/ScoreChart";

const dummyData = [
    { date: "2026-06-23", studyTime: 120 },
    { date: "2026-10-01", studyTime: 60 },
    { date: "2026-10-02", studyTime: 30 },
    { date: "2026-11-15", studyTime: 90 }
];

export const Home = () => {
    return (
        <div className="min-h-screen ">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <KpiCards />
                <HeatMap data={dummyData} />
                <GoalProgress />
                <ScoreChart />
            </main>
        </div>
    )
}