import { FaPen } from "react-icons/fa";
import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";
import { changeTableByPeriod } from "../../utils/changeTableByPeriod";
import type { tableType } from "../../types/tableType";

const dummyStudySessions: tableType[] = [
    {
        id: "1",
        date: "2026-06-16",
        category: ["模試", "リスニング", "単語", "文法"],
        duration: 120,
        memo: "公式問題集Vol.3",
    },
    {
        id: "2",
        date: "2026-06-15",
        category: ["単語"],
        duration: 30,
        memo: "アプリで100問",
    },
    {
        id: "3",
        date: "2026-06-14",
        category: ["文法"],
        duration: 60,
        memo: "Part5対策",
    },
    {
        id: "4",
        date: "2026-06-13",
        category: ["リスニング"],
        duration: 45,
        memo: "Part2集中練習",
    },
    {
        id: "5",
        date: "2026-06-12",
        category: ["単語"],
        duration: 50,
        memo: "アプリで150問",
    },
    {
        id: "6",
        date: "2026-06-10",
        category: ["模試"],
        duration: 120,
        memo: "公式問題集Vol.2",
    },
    {
        id: "7",
        date: "2026-06-08",
        category: ["文法"],
        duration: 20,
        memo: "Part6対策",
    },
    {
        id: "8",
        date: "2026-06-06",
        category: ["リスニング"],
        duration: 40,
        memo: "Part3,4ディクテーション",
    },
    {
        id: "9",
        date: "2026-06-04",
        category: ["単語"],
        duration: 35,
        memo: "単語帳2周目",
    },
    {
        id: "10",
        date: "2026-06-02",
        category: ["文法"],
        duration: 55,
        memo: "Part5,6まとめ",
    },
];

type StudyTableProps = {
    category: string;
    period: string;
};

const categoryLabelMap: Record<string, string> = {
    listening: "リスニング",
    vocabulary: "単語",
    grammar: "文法",
    full: "模試",
};

export const StudyTable = ({ category, period }: StudyTableProps) => {
    let filteredStudyTables: tableType[] =
        category !== "all"
            ? dummyStudySessions.filter((studyTable) =>
                studyTable.category.includes(categoryLabelMap[category])
            )
            : dummyStudySessions;

    filteredStudyTables = changeTableByPeriod(period, filteredStudyTables);
    return (
        filteredStudyTables.length === 0 ? (
            <div>テーブルがありません</div>
        ) : (
            <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="text-left text-sm text-emerald-900 bg-emerald-50">
                            <th className="py-3 px-4 font-medium">日付</th>
                            <th className="py-3 px-4 font-medium">カテゴリ</th>
                            <th className="py-3 px-4 font-medium">学習時間</th>
                            <th className="py-3 px-4 font-medium">メモ</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudyTables.map((data) => (
                            <tr key={data.id} className="hover:bg-emerald-50/50 border-t border-gray-100 transition-colors">
                                <td className="py-3 px-4 text-gray-700">{formatDate(data.date)}</td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-1 flex-wrap">
                                        {data.category.map((c) => changeTagByCategory(c))}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-700">{data.duration}min</td>
                                <td className="py-3 px-4 text-gray-500">{data.memo}</td>
                                <td className="py-3 px-4">
                                    <button className="cursor-pointer text-gray-400 hover:text-red-500"><FaPen /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
                    <span>全{dummyStudySessions.length}件中{filteredStudyTables.length}件表示</span>
                    <div className="flex gap-1">
                        {[1, 2, 3].map((num) => (
                            <button
                                key={num}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${num === 1
                                    ? "bg-emerald-600 text-white"
                                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}