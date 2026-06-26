import { dummyStudySessions } from "../../data/dummyStudySession";

/** 
 * 引数のstartDateから一年間の日付を取得する
 *
 * @param startDate 最初の日付(Data型)
 * @returns 一年間の日付すべて
 * getDatesForOneYear(new Date("2026-01-01"))の返り値は["2026-01-01,2026-01-02, ..... ,2026-12-31"]
 */
function getDatesForOneYear(startDate: Date): string[] {
    const dates: string[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 365; i++) {
        dates.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

export const HeatMap = () => {
    const dates = getDatesForOneYear(new Date("2026-01-01"));

    // 7行（日〜土）× 53列のグリッドに並べる==========
    const weeks: string[][] = [];
    let week: string[] = [];

    dates.forEach((date, i) => {
        if (i === 0) {
            //はじめの日の曜日に合わせて空文字をpushする
            const firstDate = new Date(date);
            for (let j = 0; j < firstDate.getDay(); j++) {
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

    const getStudyTimeByDate = (date: string) => {
        const studyData = dummyStudySessions.find(item => item.date === date);
        return studyData ? studyData.duration : 0;
    }

    const getColor = (count: number) => {
        if (count === 0) return "bg-gray-100";
        if (count <= 30) return "bg-green-200";
        if (count <= 60) return "bg-green-400";
        if (count <= 90) return "bg-green-600";
        return "bg-green-800";
    };

    const months: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];


    return (
        <div className="bg-white rounded-xl p-4 overflow-x-auto m-10 border border-gray-300">
            <div className="min-w-fit pr-4 ml-10">
                <p className="mb-3 text-xl font-medium text-gray-600">学習アクティビティ</p>
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
    );
}