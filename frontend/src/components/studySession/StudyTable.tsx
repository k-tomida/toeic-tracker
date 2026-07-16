import { FaPen } from "react-icons/fa";
import { changeTagByCategory } from "../../utils/changeTagByCategory";
import { formatDate } from "../../utils/formatDate";
import { changeTableByPeriod } from "../../utils/changeTableByPeriod";
import type { tableType } from "../../types/tableType";
import { sortTableByOrder } from "../../utils/sortTableByOrder";
import { useMemo, useState } from "react";
import { dummyStudySessions } from "../../data/dummyStudySession";
import type { categoryType } from "../../types/categoryType";
import type { periodType } from "../../types/periodType";
import type { orderType } from "../../types/orderType";
import { getPageNumbers } from "../../utils/getPageNumbers";
import { CiFilter } from "react-icons/ci";
import { Select } from "../../ui/Select";
import { Button } from "../../ui/Button";
import { StudyPopUp } from "../../modules/StudyPopUp";

const categoryOptions: { label: string, value: categoryType }[] = [
    { label: "すべてのカテゴリ", value: "all" },
    { label: "リスニング", value: "listening" },
    { label: "単語", value: "vocabulary" },
    { label: "文法", value: "grammar" },
    { label: "模試", value: "mockExam" },
];

const periodOptions: { label: string, value: periodType }[] = [
    { label: "期間 : すべて", value: "all" },
    { label: "今月", value: "thisMonth" },
    { label: "先月", value: "lastMonth" },
    { label: "過去3ヶ月", value: "lastThreeMonth" }
];

const orderOptions: { label: string, value: orderType }[] = [
    { label: "並び順 : 新しい順", value: "newest" },
    { label: "古い順", value: "oldest" },
    { label: "学習時間が長い順", value: "longest" },
];

const ITEMS_PER_PAGE = 10

export const StudyTable = () => {
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState<categoryType>(categoryOptions[0].value);
    const [period, setPeriod] = useState<periodType>(periodOptions[0].value);
    const [order, setOrder] = useState<orderType>(orderOptions[0].value);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState<tableType | null>(null);

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

    const filteredStudyTables = useMemo(() => {
        const byCategory =
            category !== "all"
                ? dummyStudySessions.filter((studyTable) =>
                    studyTable.category.includes(category)
                )
                : dummyStudySessions;

        const byPeriod = changeTableByPeriod(period, byCategory);
        return sortTableByOrder(order, byPeriod);
    }, [category, period, order]);

    //ページネーション機能
    const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(page * ITEMS_PER_PAGE, filteredStudyTables.length);
    const pageTables = filteredStudyTables.slice(startItem - 1, endItem);
    const totalPages = Math.ceil(filteredStudyTables.length / ITEMS_PER_PAGE);


    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">学習記録履歴</p>
            <div className="flex items-center justify-between m-5">
                <div className="flex justify-center gap-5 bg-emerald-50 border border-emerald-200 p-3 rounded-lg items-center flex-wrap">
                    <CiFilter size={28} />
                    <Select name="category" value={category} onChange={setCategory} options={categoryOptions} />
                    <Select name="period" value={period} onChange={setPeriod} options={periodOptions} />
                    <Select name="order" value={order} onChange={setOrder} options={orderOptions} />
                </div>
                <Button onClick={() => { setPopUpData(null); setIsPopUpOpen(true); }}>
                    <div className="flex items-center gap-3">
                        <span>+</span>
                        <span>学習記録を追加</span>
                    </div>
                </Button>
            </div>
            {filteredStudyTables.length === 0 ? (
                <div>データがありません</div>
            ) : (
                <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm text-emerald-900 bg-emerald-50">
                                <th className="py-3 px-4 font-medium w-40">日付</th>
                                <th className="py-3 px-4 font-medium w-80">カテゴリ</th>
                                <th className="py-3 px-4 font-medium w-40">学習時間</th>
                                <th className="py-3 px-4 font-medium w-100">メモ</th>
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
                                            onClick={() => { setPopUpData(data); setIsPopUpOpen(true); }}>
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
                            {getPageNumbers(page, totalPages).map((num, i) => (
                                <button
                                    key={i}
                                    onClick={() => typeof num === "number" && setPage(num)}
                                    disabled={num === "..."}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors ${num === page
                                        ? "bg-emerald-600 text-white"
                                        : num === "..."
                                            ? "text-gray-400 cursor-default"
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
            {isPopUpOpen && (
                <StudyPopUp
                    onClose={() => setIsPopUpOpen(false)}
                    data={popUpData}
                />
            )}
        </div>
    );
}