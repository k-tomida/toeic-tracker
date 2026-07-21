import { CiFilter } from "react-icons/ci";
import { Select } from "../../ui/Select";
import { Button } from "../../ui/Button";
import { useMemo, useState } from "react";
import type { statusType, vocabularyOrderType, vocabularyType, wordClassType } from "../../types/vocabularyType";
import { dummyVocabulary } from "../../data/dummyVocabulary";
import { FaPen } from "react-icons/fa";
import { changeTagByStatus, changeTagByWordClass } from "../../utils/changeTag";
import { getPageNumbers } from "../../utils/getPageNumbers";
import { sortVocabularyByOrder } from "../../utils/sortTableByOrder";
import { VocabularyPopUp } from "../../modules/VocabularyPopUp";


const wordClassOptions: { label: string, value: "all" | wordClassType }[] = [
    { label: "すべての品詞", value: "all" },
    { label: "名詞", value: "Noun" },
    { label: "動詞", value: "Verb" },
    { label: "形容詞", value: "Adjective" },
    { label: "副詞", value: "Adverb" },
    { label: "前置詞", value: "Preposition" },
    { label: "接続詞", value: "Conjunction" },
    { label: "助動詞", value: "AuxiliaryVerb" }
];

const statusOptions: { label: string, value: "all" | statusType }[] = [
    { label: "習得状況 : すべて", value: "all" },
    { label: "未習得", value: "unacquired" },
    { label: "習得済み", value: "acquired" }
];

const orderOptions: { label: string, value: vocabularyOrderType }[] = [
    { label: "並び順 : 新しい順", value: "newest" },
    { label: "古い順", value: "oldest" },
    { label: "アルファベット順", value: "alphabetical" }
]

const ITEMS_PER_PAGE = 10

export const VocabularyTable = () => {
    const [page, setPage] = useState(1);
    const [wordClass, setWordClass] = useState<"all" | wordClassType>(wordClassOptions[0].value);
    const [status, setStatus] = useState<"all" | statusType>(statusOptions[0].value);
    const [order, setOrder] = useState<vocabularyOrderType>(orderOptions[0].value);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    const [popUpData, setPopUpData] = useState<vocabularyType | null>(null);
    const [prevFilters, setPrevFilters] = useState({ wordClass, status, order });

    //filterがレンダリング前と違う場合ページを1にする
    if (
        prevFilters.wordClass !== wordClass ||
        prevFilters.status !== status ||
        prevFilters.order !== order
    ) {
        setPrevFilters({ wordClass, status, order });
        setPage(1);
    }

    //フィルタとソート
    const filteredStudyTables = useMemo(() => {
        const byWordClass = wordClass !== "all" ? dummyVocabulary.filter((data) => data.class === wordClass) : dummyVocabulary;
        const byStatus = status !== "all" ? byWordClass.filter((data) => data.status === status) : byWordClass;
        return sortVocabularyByOrder(order, byStatus);
    }, [wordClass, status, order])

    //ページネーション機能
    const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(page * ITEMS_PER_PAGE, filteredStudyTables.length);
    const pageTables = filteredStudyTables.slice(startItem - 1, endItem);
    const totalPages = Math.ceil(filteredStudyTables.length / ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">単語一覧</p>
            <div className="flex items-center justify-between m-5">
                <div className="flex justify-center gap-5 bg-emerald-50 border border-emerald-200 p-3 rounded-lg items-center flex-wrap">
                    <CiFilter size={28} />
                    <Select name="wordClass" value={wordClass} onChange={setWordClass} options={wordClassOptions} />
                    <Select name="status" value={status} onChange={setStatus} options={statusOptions} />
                    <Select name="order" value={order} onChange={setOrder} options={orderOptions} />

                </div>
                <Button onClick={() => { setPopUpData(null); setIsPopUpOpen(true); }}>
                    <div className="flex items-center gap-3">
                        <span>+</span>
                        <span>単語を追加</span>
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
                                <th className="py-3 px-4 font-medium w-50">単語</th>
                                <th className="py-3 px-4 font-medium w-30">品詞</th>
                                <th className="py-3 px-4 font-medium w-70">意味</th>
                                <th className="py-3 px-4 font-medium w-30">習得状況</th>
                                <th className="py-3 px-4 font-medium w-80">メモ</th>
                                <th className="py-3 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageTables.map((data) => (
                                <tr key={data.id} className="hover:bg-emerald-50/50 border-t border-gray-100 transition-colors">
                                    <td className="py-3 px-4 text-gray-700 text-lg font-bold">{data.word}</td>
                                    <td className="py-3 px-4 text-gray-700">{changeTagByWordClass(data.class)}</td>
                                    <td className="py-3 px-4 text-gray-700">{data.meaning}</td>
                                    <td className="py-3 px-4 text-gray-700">{changeTagByStatus(data.status)}</td>
                                    <td className="py-3 px-4 text-gray-700">{data.memo}</td>
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
                <VocabularyPopUp
                    onClose={() => setIsPopUpOpen(false)}
                    data={popUpData}
                />
            )}
        </div>
    )
}