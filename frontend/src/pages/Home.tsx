import { Header } from "../components/Header"
import { HeatMap } from "../components/HeatMap"
import { KpiCards } from "../components/KpiCards"

export const Home = () => {
    return (
        <div className="min-h-screen bg-stone-100">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <KpiCards />
                <HeatMap />
            </main>
        </div>
    )
}