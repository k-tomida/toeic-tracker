import { useState } from "react";
import { formatDateSlash } from "../utils/formatDate";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import type { scoreType } from "../types/scoreType";

type Props = {
    onClose: () => void;
    data: scoreType | null;
};

export const ScorePopUp = ({ onClose, data }: Props) => {
    const [date, setDate] = useState(data?.examDate ?? new Date().toISOString().slice(0, 10));
    const [listening, setListening] = useState(data?.listeningScore ?? 0);
    const [reading, setReading] = useState(data?.readingScore ?? 0);
    const [memo, setMemo] = useState(data?.memo ?? "");

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? formatDateSlash(data.examDate) : "スコアを追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                {/* 日付 */}
                <div>
                    <h2 className="text-gray-600 mb-1">日付</h2>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                    />
                </div>
                {/* リスニングとリーディング*/}
                <div className="flex justify-between my-4">
                    <div>
                        <h2 className="text-gray-600">リスニング</h2>
                        <div className="flex items-end gap-1">
                            <input
                                type="number"
                                value={listening}
                                min={0}
                                max={495}
                                onChange={(e) => setListening(parseInt(e.target.value))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-40"
                            />
                            <span className="text-gray-600 text-lg">/495</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-gray-600">リーディング</h2>
                        <div className="flex items-end gap-1">
                            <input
                                type="number"
                                value={reading}
                                onChange={(e) => setReading(parseInt(e.target.value))}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-40"
                            />
                            <span className="text-gray-600 text-lg">/495</span>
                        </div>
                    </div>
                </div>
                {/* 合計 */}
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex justify-between items-center">
                    <span className="text-sm text-green-800">合計スコア</span>
                    <span className="text-2xl font-bold text-green-600">
                        {listening + reading}
                    </span>
                </div>
                {/* メモ*/}
                <div className="my-4">
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
                    {data !== null ?
                        (<Button onClick={onClose}>
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