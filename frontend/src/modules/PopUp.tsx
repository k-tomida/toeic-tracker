import { useState } from "react";
import type { tableType } from "../types/tableType";
import { formatDate } from "../utils/formatDate";

type Props = {
    onClose: () => void;
    data: tableType;
};

const tagStyles: Record<string, string> = {
    リスニング: "bg-blue-50 text-blue-800 border border-blue-200",
    単語: "bg-amber-50 text-amber-800 border border-amber-200",
    文法: "bg-green-50 text-green-800 border border-green-200",
    模試: "bg-orange-50 text-orange-800 border border-orange-200",
};

const allCategories = ["模試", "リスニング", "単語", "文法"];

export const PopUp = ({ onClose, data }: Props) => {
    const [date, setDate] = useState(data.date);
    const [duration, setDuration] = useState(data.duration);
    const [category, setCategory] = useState(data.category);
    const [memo, setMemo] = useState(data.memo);

    const toggleCategory = (c: string) => {
        setCategory((prev) =>
            prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
        );
    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">{formatDate(data.date)}</h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {/*日付と学習時間の入力  */}
                <div className="flex justify-between my-3">
                    <div>
                        <h2 className="text-gray-600 mb-1">日付</h2>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-56"
                        />
                    </div>
                    <div>
                        <h2 className="text-gray-600 mb-1">学習時間（分）</h2>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-56"
                        />
                    </div>
                </div>
                {/* カテゴリ選択 */}
                <div className="my-3">
                    <h2 className="text-gray-600 mb-2">カテゴリ（複数選択可）</h2>
                    <div className="flex gap-3 py-1">
                        {allCategories.map((c) => (
                            <button
                                key={c}
                                onClick={() => toggleCategory(c)}
                                className={`text-sm px-2 py-0.5 rounded-full font-medium hover:bg-gray-200
                                    ${category.includes(c) ? tagStyles[c] : "bg-gray-100 text-gray-400"}`
                                }
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
                {/* メモ */}
                <div>
                    <h2 className="text-gray-600 mb-2">メモ（任意）</h2>
                    <input
                        type="text"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                    />
                </div>
            </div>
        </div>
    )
}