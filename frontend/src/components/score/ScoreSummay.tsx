import { KpiCard } from "../../modules/KpiCard";
import { calcBestScoreAndDate, calcScoreByNumber } from "../../utils/calcScore";

export const ScoreSummary = () => {
    const scoreDiff = calcScoreByNumber(0) - calcScoreByNumber(1);
    const scoreDiffStr = scoreDiff >= 0 ? `+${scoreDiff}` : `${scoreDiff}`;
    const [bestScore, bestScoreDate] = calcBestScoreAndDate();

    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600">スコアサマリー</h2>
            <div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">
                    <KpiCard title={<span>最新スコア</span>} value={calcScoreByNumber(0)} sub={`前回比 ${scoreDiffStr}`} />
                    <KpiCard title={<span>自己ベスト</span>} value={bestScore} sub={bestScoreDate} />
                </div>
                <div className="flex mx-auto justify-center flex-wrap xl:gap-8">

                </div>
            </div>
        </div>
    );
};