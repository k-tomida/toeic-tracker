import { useState } from "react";
import type { studySessionType, categoryType } from "../types/studySessionType";
import { formatDate } from "../utils/formatDate";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
    onClose: () => void;
    data: studySessionType | null;
};

const tagStyles: Record<categoryType, string> = {
    LISTENING: "bg-blue-50 text-blue-800 border border-blue-200",
    VOCABULARY: "bg-amber-50 text-amber-800 border border-amber-200",
    GRAMMAR: "bg-green-50 text-green-800 border border-green-200",
    MOCK_EXAM: "bg-purple-50 text-purple-800 border border-purple-200",
};

const categoryLabelMap: Record<categoryType, string> = {
    LISTENING: "リスニング",
    VOCABULARY: "単語",
    GRAMMAR: "文法",
    MOCK_EXAM: "模試"
};

const allCategories: categoryType[] = ["LISTENING", "VOCABULARY", "GRAMMAR", "MOCK_EXAM"];

export const StudyPopUp = ({ onClose, data }: Props) => {
    const [date, setDate] = useState(data?.date ?? new Date().toISOString().slice(0, 10));
    const [duration, setDuration] = useState(data?.duration ?? 0);
    const [category, setCategory] = useState(data?.category ?? []);
    const [memo, setMemo] = useState(data?.memo ?? "");

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
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56"
                        />
                    </div>
                    <div>
                        <h2 className="text-gray-600 mb-1">学習時間（分）</h2>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56"
                        />
                    </div>
                </div>
                {/* カテゴリ選択*/}
                <div className="my-3">
                    <h2 className="text-gray-600 mb-2">カテゴリ</h2>
                    <div className="flex gap-3 py-1">
                        {allCategories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`text-lg px-2 py-0.5 rounded-full font-medium hover:bg-gray-200
                                    ${category === c ? tagStyles[c] : "bg-gray-100 text-gray-400"}`}
                            >
                                {categoryLabelMap[c]}
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
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
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