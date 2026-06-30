import { FaPen } from "react-icons/fa";
import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";
import { changeTableByPeriod } from "../../utils/changeTableByPeriod";
import type { tableType } from "../../types/tableType";
import { sortTableByOrder } from "../../utils/sortTableByOrder";
import { useState } from "react";
import { dummyStudySessions } from "../../data/dummyStudySession";
import type { categoryType } from "../../types/categoryType";
import type { periodType } from "../../types/periodType";
import type { OrderType } from "../../types/orderType";

type StudyTableProps = {
    category: categoryType;
    period: periodType;
    order: OrderType;
    onEdit: (data: tableType) => void;
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
                studyTable.category.includes(category)
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