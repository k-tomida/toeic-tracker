
import { FaRegClock } from "react-icons/fa";
import { AiOutlineFire } from "react-icons/ai";
import { TfiCup } from "react-icons/tfi";
import { LuNotebookPen } from "react-icons/lu";
import { KpiCard } from "../../modules/KpiCard";
import { calcStreak } from "../../utils/calcStreak";
import { calcMaxStreak } from "../../utils/calcStreak";
import { calcStudyTimeInMonth } from "../../utils/calcStudyTime";
import { calcScoreByNumber } from "../../utils/calcScore";

export const KpiCards = () => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    const studyTimeDiff = calcStudyTimeInMonth(today) - calcStudyTimeInMonth(lastMonth);
    const studyTimeDiffStr = studyTimeDiff >= 0 ? `+${studyTimeDiff}` : `${studyTimeDiff}`;

    const scoreDiff = calcScoreByNumber(0) - calcScoreByNumber(1);
    const scoreDiffStr = scoreDiff >= 0 ? `+${scoreDiff}` : `${scoreDiff}`;

    return (
        <div className="flex max-w-7xl lg:mx-8 mx-auto justify-between flex-wrap ">
            <KpiCard title={<span className="flex items-center gap-1"><AiOutlineFire />ストリーク</span>} value={calcStreak()} unit="日" sub={`過去最高 ${calcMaxStreak()}日`} />
            <KpiCard title={<span className="flex items-center gap-1"><FaRegClock />今月の学習時間</span>} value={calcStudyTimeInMonth(today)} unit="h" sub={`先月比 ${studyTimeDiffStr}h`} />
            <KpiCard title={<span className="flex items-center gap-1"><TfiCup />最新スコア</span>} value={calcScoreByNumber(0)} sub={`前回比 ${scoreDiffStr}`} />
            <KpiCard title={<span className="flex items-center gap-1"><LuNotebookPen />登録語彙数</span>} value={342} sub="今週 +18語" />
        </div>

    )
}