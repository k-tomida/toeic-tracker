import { FaPen } from "react-icons/fa";
import { dummyScoreData } from "../../data/dummyScoreData"
import { Button } from "../../ui/Button"
import { sortScoreByNewest } from "../../utils/sortTableByOrder"
import { calcTotalScore } from "../../utils/calcScore";
import { useState } from "react";
import { getPageNumbers } from "../../utils/getPageNumbers";
import { formatDateSlash } from "../../utils/formatDate";
import type { scoreType } from "../../types/scoreType";
import { ScorePopUp } from "../../modules/ScorePopUp";

const ITEMS_PER_PAGE = 5;

export const ScoreTable = () => {
    const [page, setPage] = useState(1);
    const sortScoreData = sortScoreByNewest(dummyScoreData);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState<scoreType | null>(null);

    const openPopUp = (data: scoreType | null) => {
        setPopUpData(data);
        setIsPopUpOpen(true);
    };

    //ページネーション機能
    const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(page * ITEMS_PER_PAGE, sortScoreData.length);
    const pageTables = sortScoreData.slice(startItem - 1, endItem);
    const totalPages = Math.ceil(sortScoreData.length / ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <div className="flex justify-between m-2">
                <p className="mb-3 text-xl font-medium text-gray-600">スコア履歴</p>
                <Button onClick={() => openPopUp(null)}>
                    <div className="flex items-center gap-3">
                        <span>+</span>
                        <span>学習記録を追加</span>
                    </div>
                </Button>
            </div>
            <div className="mt-3">
                {sortScoreData.length === 0 ?
                    (<div>テーブルがありません</div>) :
                    (<div className="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="text-left text-sm text-emerald-900 bg-emerald-50">
                                    <th className="py-3 px-4 font-medium w-60">受験日</th>
                                    <th className="py-3 px-4 font-medium w-40">L</th>
                                    <th className="py-3 px-4 font-medium w-40">R</th>
                                    <th className="py-3 px-4 font-medium w-40">合計</th>
                                    <th className="py-3 px-4 font-medium w-108">メモ</th>
                                    <th className="py-3 px-4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageTables.map((data) => (
                                    <tr key={data.id} className="hover:bg-emerald-50/50 border-t border-gray-100 transition-colors">
                                        <td className="py-3 px-4 text-gray-700">{formatDateSlash(data.examDate)}</td>
                                        <td className="py-3 px-4 text-gray-700">{data.listening}</td>
                                        <td className="py-3 px-4 text-gray-700">{data.reading}</td>
                                        <td className="py-3 px-4 text-gray-700">{calcTotalScore(data.listening, data.reading)}</td>
                                        <td className="py-3 px-4 text-gray-500">{data.memo}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                className="cursor-pointer text-gray-400 hover:bg-gray-200 p-2 border border-gray-300 rounded-md"
                                                onClick={() => openPopUp(data)}>
                                                <FaPen />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 text-sm text-gray-500">
                            <span>全{sortScoreData.length}件中 {startItem}〜{endItem}件表示</span>
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
                    </div>)}
            </div>
            {isPopUpOpen && (
                <ScorePopUp
                    onClose={() => setIsPopUpOpen(false)}
                    data={popUpData}
                />
            )}
        </div >
    )
}