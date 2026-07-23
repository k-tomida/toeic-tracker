import { KpiCard } from "../../modules/KpiCard";
import type { scoreType } from "../../types/scoreType";
import { calcDaysUntilNextExam, calcExamTimes } from "../../utils/calcExam";
import { calcBestScoreAndDate, calcScoreByNumber } from "../../utils/calcScore";
import { formatDateSlash } from "../../utils/formatDate";

type Props = {
    nextExamDate: null | string;
    scores: scoreType[]
}

export const ScoreSummary = ({ nextExamDate, scores }: Props) => {
    const scoreDiff = calcScoreByNumber(0, scores) - calcScoreByNumber(1, scores);
    const scoreDiffStr = scoreDiff >= 0 ? `+${scoreDiff}` : `${scoreDiff}`;
    const [bestScore, bestScoreDate] = calcBestScoreAndDate(scores);

    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600">スコアサマリー</h2>
            <div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title={<span>最新スコア</span>} value={calcScoreByNumber(0, scores)} sub={`前回比 ${scoreDiffStr}`} />
                    <KpiCard title={<span>自己ベスト</span>} value={bestScore} sub={bestScoreDate} />
                </div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title={<span>受験回数</span>} value={calcExamTimes(scores)} unit="回" />
                    <KpiCard title={<span>次回受験まで</span>} value={calcDaysUntilNextExam(nextExamDate) ?? 0} unit="日" sub={nextExamDate ? `${formatDateSlash(nextExamDate)} 予定` : "未設定"} />
                </div>
            </div>
        </div>
    );
};