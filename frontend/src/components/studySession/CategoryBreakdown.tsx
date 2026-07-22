import type { studySessionType } from "../../types/studySessionType";
import { ProgressBar } from "../../ui/ProgressBar"
import { calcStudyTimeByCategory, calcStudyTimeInMonth } from "../../utils/calcStudyTime"

export const CategoryBreakdown = ({ studySessions }: { studySessions: studySessionType[] }) => {
    const allStudyTime = calcStudyTimeInMonth(new Date(), studySessions);

    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <div className="flex items-baseline gap-2 mb-3">
                <h2 className="text-xl font-medium text-gray-600">カテゴリ別内訳</h2>
            </div>
            <div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20 flex items-center gap-2"><div className="rounded-full bg-amber-300 w-3 h-3" />単語</span>
                    <ProgressBar current={calcStudyTimeByCategory("VOCABULARY", studySessions)} target={allStudyTime} barHeight="h-3" color="bg-amber-300" />
                    <span>{calcStudyTimeByCategory("VOCABULARY", studySessions)}h</span>
                </div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20 flex items-center gap-2"><div className="rounded-full bg-green-300 w-3 h-3" />文法</span>
                    <ProgressBar current={calcStudyTimeByCategory("GRAMMAR", studySessions)} target={allStudyTime} barHeight="h-3" color="bg-green-300" />
                    <span>{calcStudyTimeByCategory("GRAMMAR", studySessions)}h</span>
                </div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20 flex items-center gap-2"><div className="rounded-full bg-blue-300 w-3 h-3" />リスニング</span>
                    <ProgressBar current={calcStudyTimeByCategory("LISTENING", studySessions)} target={allStudyTime} barHeight="h-3" color="bg-blue-300" />
                    <span>{calcStudyTimeByCategory("LISTENING", studySessions)}h</span>
                </div>
                <div className="flex items-center gap-10 mb-5 justify-between">
                    <span className="w-20 flex items-center gap-2"><div className="rounded-full bg-purple-300 w-3 h-3" />模試</span>
                    <ProgressBar current={calcStudyTimeByCategory("MOCK_EXAM", studySessions)} target={allStudyTime} barHeight="h-3" color="bg-purple-300" />
                    <span>{calcStudyTimeByCategory("MOCK_EXAM", studySessions)}h</span>
                </div>
            </div>
            <div className="text-xl flex items-center gap-10 mb-5 justify-between border border-transparent border-t-gray-300 pt-5">
                <span className="w-20">今月合計</span>
                <span>{allStudyTime}h</span>
            </div>
        </div>
    )
}