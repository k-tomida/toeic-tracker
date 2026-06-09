import { KpiCard } from "../modules/KpiCard"
import { FaRegClock } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import { TfiCup } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";

export const KpiCards = () => {
    return (
        <div className="flex max-w-7xl mx-auto justify-between flex-wrap">
            <KpiCard title="ストリーク" icon={<AiOutlineFire />} value={14} unit="日" sub="過去最高 21日" />
            <KpiCard title="今週の学習時間" icon={<FaRegClock />} value={18} unit="h" sub="先月比 +3h" />
            <KpiCard title="最新スコア" icon={<TfiCup />} value={820} sub="前回比 +25" />
            <KpiCard title="登録語彙数" icon={<LuNotebookPen />} value={342} sub="今週 +18語" />
        </div>
    )
}