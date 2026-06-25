import { FaPen } from "react-icons/fa";
import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";
import { changeTableByPeriod } from "../../utils/changeTableByPeriod";
import type { tableType } from "../../types/tableType";
import { sortTableByOrder } from "../../utils/sortTableByOrder";
import { useState } from "react";

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
    {
        id: "11",
        date: "2026-05-31",
        category: ["リスニング"],
        duration: 50,
        memo: "Part3シャドーイング",
    },
    {
        id: "12",
        date: "2026-05-29",
        category: ["単語"],
        duration: 40,
        memo: "金フレ200語",
    },
    {
        id: "13",
        date: "2026-05-27",
        category: ["文法"],
        duration: 45,
        memo: "時制復習",
    },
    {
        id: "14",
        date: "2026-05-25",
        category: ["模試"],
        duration: 120,
        memo: "公式問題集Vol.1",
    },
    {
        id: "15",
        date: "2026-05-23",
        category: ["リスニング"],
        duration: 35,
        memo: "Part2復習",
    },
    {
        id: "16",
        date: "2026-05-21",
        category: ["単語"],
        duration: 30,
        memo: "アプリで80問",
    },
    {
        id: "17",
        date: "2026-05-19",
        category: ["文法"],
        duration: 60,
        memo: "仮定法まとめ",
    },
    {
        id: "18",
        date: "2026-05-17",
        category: ["リスニング"],
        duration: 55,
        memo: "Part4対策",
    },
    {
        id: "19",
        date: "2026-05-15",
        category: ["単語"],
        duration: 45,
        memo: "金フレ3周目",
    },
    {
        id: "20",
        date: "2026-05-13",
        category: ["模試"],
        duration: 120,
        memo: "オンライン模試",
    },
    {
        id: "21",
        date: "2026-05-11",
        category: ["文法"],
        duration: 35,
        memo: "Part5演習",
    },
    {
        id: "22",
        date: "2026-05-09",
        category: ["リスニング"],
        duration: 40,
        memo: "ニュース英語",
    },
    {
        id: "23",
        date: "2026-05-07",
        category: ["単語"],
        duration: 25,
        memo: "金フレ復習",
    },
    {
        id: "24",
        date: "2026-05-05",
        category: ["文法"],
        duration: 50,
        memo: "接続詞問題",
    },
    {
        id: "25",
        date: "2026-05-03",
        category: ["リスニング"],
        duration: 45,
        memo: "Part1,2練習",
    },
    {
        id: "26",
        date: "2026-05-01",
        category: ["単語"],
        duration: 35,
        memo: "英単語帳チェック",
    },
    {
        id: "27",
        date: "2026-04-29",
        category: ["模試"],
        duration: 120,
        memo: "時間計測あり",
    },
    {
        id: "28",
        date: "2026-04-27",
        category: ["文法"],
        duration: 40,
        memo: "関係詞復習",
    },
    {
        id: "29",
        date: "2026-04-25",
        category: ["リスニング"],
        duration: 60,
        memo: "Part3,4総復習",
    },
    {
        id: "30",
        date: "2026-04-23",
        category: ["単語"],
        duration: 30,
        memo: "アプリで120問",
    },
];

type StudyTableProps = {
    category: string;
    period: string;
    order: string;
    onEdit: (data: tableType) => void; // ← 追加
};

const categoryLabelMap: Record<string, string> = {
    listening: "リスニング",
    vocabulary: "単語",
    grammar: "文法",
    full: "模試",
};

const ITEMS_PER_PAGE = 10

export const StudyTable = ({ category, period, order, onEdit }: StudyTableProps) => {
    const [page, setPage] = useState(1);

    const [prevFilters, setPrevFilters] = useState({ category, period, order });

    //filterがレンダリング前と違う場合ページを1にする
    if (
        prevFilters.category !== category ||
        prevFilters.period !== period ||
        prevFilters.order !== order
    ) {
        setPrevFilters({ category, period, order });
        setPage(1);
    }

    // categoryでフィルタする
    let filteredStudyTables: tableType[] =
        category !== "all"
            ? dummyStudySessions.filter((studyTable) =>
                studyTable.category.includes(categoryLabelMap[category])
            )
            : dummyStudySessions;

    //期間でフィルタする
    filteredStudyTables = changeTableByPeriod(period, filteredStudyTables);

    //日付でソートする
    filteredStudyTables = sortTableByOrder(order, filteredStudyTables);

    //ページネーション機能
    const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(page * ITEMS_PER_PAGE, filteredStudyTables.length);
    const pageTables = filteredStudyTables.slice(startItem - 1, endItem);
    const totalPages = Math.ceil(filteredStudyTables.length / ITEMS_PER_PAGE);


    return (
        <div>
            {filteredStudyTables.length === 0 ? (
                <div>テーブルがありません</div>
            ) : (
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm text-emerald-900 bg-emerald-50">
                                <th className="py-3 px-4 font-medium w-40">日付</th>
                                <th className="py-3 px-4 font-medium w-92">カテゴリ</th>
                                <th className="py-3 px-4 font-medium w-40">学習時間</th>
                                <th className="py-3 px-4 font-medium w-108">メモ</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageTables.map((data) => (
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
                                        <button
                                            className="cursor-pointer text-gray-400 hover:bg-gray-200 p-2 border border-gray-300 rounded-md"
                                            onClick={() => onEdit(data)}>
                                            <FaPen />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
                        <span>全{filteredStudyTables.length}件中 {startItem}〜{endItem}件表示</span>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPage(num)}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors ${num === page
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
            )}
        </div>
    );
}