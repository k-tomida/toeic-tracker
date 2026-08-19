import { changeTagByCategory } from "../../utils/changeTag";
import { formatDate } from "../../utils/formatDate";
import { sortTableByOrder } from "../../utils/sortData";
import type { studySessionType } from "../../types/studySessionType";

export const StudySession = ({ studySessions }: { studySessions: studySessionType[] }) => {
    const items = sortTableByOrder("newest", studySessions).slice(0, 5);
    return (
        <div className="w-full bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0">
            <p className="mb-5 text-xl font-medium text-gray-600">直近の学習記録</p>
            {items.map((data) => (
                <div key={data.id} className="flex items-center justify-between gap-2 py-3 mx-0 sm:mx-2 border-b border-gray-200 last:border-b-0">
                    {/* 日付 */}
                    <div className="text-sm font-medium text-gray-700 shrink-0 w-20 sm:w-24">
                        {formatDate(data.date)}
                    </div>

                    {/* カテゴリタグ */}
                    <div className="flex gap-1 flex-wrap flex-1">
                        {changeTagByCategory(data.category, "span")}
                    </div>

                    {/* 学習時間 */}
                    <div className="text-sm text-gray-500 shrink-0">
                        {data.duration}min
                    </div>
                </div>
            ))}
        </div>
    );
}