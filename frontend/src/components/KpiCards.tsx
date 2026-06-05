import { KpiCard } from "../modules/KpiCard"
import { FaRegClock } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import { TfiCup } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";

export const KpiCards = () => {
    return (
        <div className="flex max-w-7xl mx-auto justify-between">
            <KpiCard title="ストリーク" icon={<AiOutlineFire />} />
            <KpiCard title="今週の学習時間" icon={<FaRegClock />} />
            <KpiCard title="最新スコア" icon={<TfiCup />} />
            <KpiCard title="登録語彙数" icon={<LuNotebookPen />} />
        </div>
    )
}