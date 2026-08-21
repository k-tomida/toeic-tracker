import type { studySessionType } from "../../types/studySessionType";
import { formatLocalDate } from "../../utils/formatDate";
/**
 * 指定された年のすべての日付を取得する
 *
 * @param year 対象年
 * @returns 対象年の日付一覧
 */
function getDatesForYear(year: number): string[] {
    const dates: string[] = [];
    const current = new Date(year, 0, 1);

    while (current.getFullYear() === year) {
        dates.push(formatLocalDate(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}

export const HeatMap = ({ studySessions, }: { studySessions: studySessionType[]; }) => {
    const currentYear = new Date().getFullYear();
    const dates = getDatesForYear(currentYear);

    // 7行（日〜土）× 53列のグリッドに並べる==========
    const weeks: string[][] = [];
    let week: string[] = [];

    dates.forEach((date, i) => {
        if (i === 0) {
            const firstDayOfWeek = new Date(currentYear, 0, 1).getDay();
            for (let j = 0; j < firstDayOfWeek; j++) {
                week.push("");
            }
        }
        week.push(date);

        if (week.length === 7 || i === dates.length - 1) {
            weeks.push(week);
            week = [];
        }
    });
    // 7行（日〜土）× 53列のグリッドに並べる==========

    const getStudyTimeByDate = (date: string): number => {
        const studyData: studySessionType[] = studySessions.filter(item => item.date === date);
        let studyTime = 0;
        studyData.forEach(d => {
            studyTime += d.duration
        });
        return studyTime;
    }

    const getColor = (count: number) => {
        if (count === 0) return "bg-gray-100";
        if (count <= 30) return "bg-green-200";
        if (count <= 60) return "bg-green-400";
        if (count <= 120) return "bg-green-600";
        return "bg-green-800";
    };

    const months: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];


    return (
        <div className="w-full bg-white rounded-xl p-4 overflow-x-auto border border-gray-300">
            <div className="min-w-max pr-4">
                <p className="mb-3 text-xl font-medium text-gray-600">学習アクティビティ（{currentYear}年）</p>
                <div className="ml-10">
                    {/* 月ラベル */}
                    <div className="whitespace-nowrap">
                        {months.map((month, mi) => (
                            <span
                                key={mi}
                                className="text-sm text-gray-400 pr-6 pl-6 "
                            >{month}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        {/* 曜日ラベル */}
                        <div className="flex flex-col gap-1 mr-1">
                            {["", "月", "", "水", "", "金", ""].map((d, i) => (
                                <div key={i} className="w-3 h-3 text-xs text-gray-400 flex items-center">
                                    {d}
                                </div>
                            ))}
                        </div>
                        {/* 週ごとの列 */}
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-1">
                                {week.map((date, di) => (
                                    <div
                                        key={di}
                                        className={`w-3 h-3 rounded-sm ${date ? getColor(getStudyTimeByDate(date)) : "bg-transparent"}`}
                                        title={`${date}: ${getStudyTimeByDate(date)}分`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* 凡例ラベル */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                        <span>少ない</span>
                        {["bg-gray-100", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"].map((c) => (
                            <div key={c} className={`w-3 h-3 rounded-sm ${c}`} />
                        ))}
                        <span>多い</span>
                    </div>
                </div>
            </div>
        </div>
    );
}