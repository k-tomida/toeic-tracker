import { useState } from "react";
import type { tableType } from "../types/tableType";
import { formatDate } from "../utils/formatDate";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
    onClose: () => void;
    data: tableType | null; // null = 新規追加
};

const tagStyles: Record<string, string> = {
    リスニング: "bg-blue-50 text-blue-800 border border-blue-200",
    単語: "bg-amber-50 text-amber-800 border border-amber-200",
    文法: "bg-green-50 text-green-800 border border-green-200",
    模試: "bg-orange-50 text-orange-800 border border-orange-200",
};

const allCategories = ["模試", "リスニング", "単語", "文法"];

export const PopUp = ({ onClose, data }: Props) => {
    const [date, setDate] = useState(data?.date ?? "");
    const [duration, setDuration] = useState(data?.duration ?? 0);
    const [category, setCategory] = useState(data?.category ?? []);
    const [memo, setMemo] = useState(data?.memo ?? "");

    const toggleCategory = (c: string) => {
        setCategory((prev) =>
            prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? formatDate(data.date) : "学習記録を追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {/* 日付と学習時間*/}
                <div className="flex justify-between my-3">
                    <div>
                        <h2 className="text-gray-600 mb-1">日付</h2>
                        <input
                            type="date"
                            value={data !== null ? date : new Date().toISOString().slice(0, 10)}
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
                {/* カテゴリ選択*/}
                <div className="my-3">
                    <h2 className="text-gray-600 mb-2">カテゴリ（複数選択可）</h2>
                    <div className="flex gap-3 py-1">
                        {allCategories.map((c) => (
                            <button
                                key={c}
                                onClick={() => toggleCategory(c)}
                                className={`text-sm px-2 py-0.5 rounded-full font-medium hover:bg-gray-200
                                    ${category.includes(c) ? tagStyles[c] : "bg-gray-100 text-gray-400"}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
                {/* メモ*/}
                <div className="my-3">
                    <h2 className="text-gray-600 mb-2">メモ（任意）</h2>
                    <input
                        type="text"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full"
                    />
                </div>
                {/* 削除ボタンは編集時のみ表示 */}
                <div className="flex justify-between mt-7">
                    {data !== null ? (
                        <Button onClick={onClose}>
                            <span className="flex gap-2 items-center">
                                <FaRegTrashAlt /> 削除
                            </span>
                        </Button>) : (<div />)}
                    <Button onClick={onClose}>保存する</Button>
                </div>
            </div>
        </div>
    );
};