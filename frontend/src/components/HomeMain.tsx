import { KpiCard } from "../ui/KpiCard"

export const HomeMain = () => {
    return (
        <div className="flex max-w-7xl mx-auto justify-between">
            <KpiCard title="ストリーク" />
            <KpiCard title="今週の学習時間" />
            <KpiCard title="最新スコア" />
            <KpiCard title="登録語彙数" />
        </div>
    )
}