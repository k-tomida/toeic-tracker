import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";
import { dummyStudySessions } from "../../data/dummyStudySession";
import { sortTableByOrder } from "../../utils/sortTableByOrder";

export const StudySession = () => {
    const items = sortTableByOrder("newest", dummyStudySessions).slice(0, 5);
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[400px]">
            <p className="mb-5 text-xl font-medium text-gray-600">直近の学習セッション</p>
            {items.map((data) => (
                <div key={data.date} className="flex justify-between gap-3 py-3 m-2 border-b border-gray-200 last:border-b-0">
                    {/* 日付 */}
                    <div className="text-sm font-medium text-gray-700 shrink-0 w-24">
                        {formatDate(data.date)}
                    </div>

                    {/* カテゴリタグ */}
                    <div className="flex gap-1 flex-wrap flex-1">
                        {data.category.map((category) => changeTagByCategory(category))}
                    </div>

                    {/* 学習時間 */}
                    <div className="text-sm text-gray-500 shrink-0">
                        {data.duration}min
                    </div>
                </div>
            ))}
        </div>
    )
}