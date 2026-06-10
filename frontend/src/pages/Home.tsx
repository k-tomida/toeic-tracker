import { Header } from "../components/Header"
import { HeatMap } from "../components/HeatMap"
import { KpiCards } from "../components/KpiCards"

const dummyData = [
    { date: "2026-10-01", studyTime: 60 },
    { date: "2026-10-02", studyTime: 30 },
    { date: "2026-11-15", studyTime: 90 },
];

export const Home = () => {
    return (
        <div className="min-h-screen bg-stone-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <KpiCards />
                <HeatMap data={dummyData} />
            </main>
        </div>
    )
}