import { KpiCard } from "../../modules/KpiCard"
import type { studySessionType } from "../../types/studySessionType";
import { calcMonthsFromStart, calcStudyTimeAll, calcStudyTimeAverage, calcStudyTimeInMonth } from "../../utils/calcStudyTime"
import { calcStudyTimeInWeek } from "../../utils/calcStudyTime";

export const StudyTimeSummary = ({ studySessions }: { studySessions: studySessionType[] }) => {
    const today = new Date();

    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const diffWeek = Math.round((calcStudyTimeInWeek(today, studySessions) - calcStudyTimeInWeek(lastWeek, studySessions)) * 10) / 10;
    const diffStrWeek = diffWeek >= 0 ? `+${diffWeek}` : `${diffWeek}`;

    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const diffMonth = Math.round((calcStudyTimeInMonth(today, studySessions) - calcStudyTimeInMonth(lastMonth, studySessions)) * 10) / 10;
    const diffStrMonth = diffMonth >= 0 ? `+${diffMonth}` : `${diffMonth}`;

    return (
        <div className="w-full bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0">
            <h2 className="mb-3 text-xl font-medium text-gray-600">学習時間サマリー</h2>
            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    <KpiCard title={<span>今週</span>} value={calcStudyTimeInWeek(today, studySessions)} unit="h" sub={`先週比 ${diffStrWeek}h`} />
                    <KpiCard title={<span>今月</span>} value={calcStudyTimeInMonth(today, studySessions)} unit="h" sub={`先月比 ${diffStrMonth}h`} />
                </div>
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                    <KpiCard title={<span>平均（日）</span>} value={calcStudyTimeAverage(studySessions)} unit="h" />
                    <KpiCard title={<span>総学習時間</span>} value={calcStudyTimeAll(studySessions)} unit="h" sub={`開始から ${calcMonthsFromStart(studySessions)}ヶ月`} />
                </div>
            </div>
        </div>
    )
}