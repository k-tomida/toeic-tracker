import { useState } from "react";
import type { vocabularyType, wordClassType } from "../types/vocabularyType";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { FaRegTrashAlt } from "react-icons/fa";

type Props = {
    onClose: () => void;
    data: vocabularyType | null;
};

const wordClassOptions: { label: string, value: wordClassType }[] = [
    { label: "名詞", value: "Noun" },
    { label: "動詞", value: "Verb" },
    { label: "形容詞", value: "Adjective" },
    { label: "副詞", value: "Adverb" },
    { label: "前置詞", value: "Preposition" },
    { label: "接続詞", value: "Conjunction" },
    { label: "助動詞", value: "AuxiliaryVerb" }
];

export const VocabularyPopUp = ({ onClose, data }: Props) => {
    const [word, setWord] = useState(data?.word ?? "")
    const [wordClass, setWordClass] = useState(data?.class ?? "Noun")
    const [meaning, setMeaning] = useState(data?.meaning ?? "")
    const [memo, setMemo] = useState(data?.memo ?? "");
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-start">
                    {/* タイトルを追加/編集で出し分け */}
                    <h2 className="text-lg font-semibold">
                        {data !== null ? "単語を編集" : "単語を追加"}
                    </h2>
                    <button className="font-semibold text-gray-500 px-2 py-1 border border-gray-300 rounded hover:bg-gray-200" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="flex justify-between my-4">
                    <div>
                        <h2 className="text-gray-600 mb-1">単語</h2>
                        <input
                            type="text"
                            value={word}
                            placeholder="例 : people"
                            onChange={(e) => setWord(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-56" />
                    </div>
                    <div>
                        <h2 className="text-gray-600 mb-1">品詞</h2>
                        <Select name="wordClass" value={wordClass} onChange={setWordClass} options={wordClassOptions} />
                    </div>
                </div>
                <div>
                    <h2 className="text-gray-600">意味</h2>
                    <input
                        type="text"
                        value={meaning}
                        placeholder="例 : 人々"
                        onChange={(e) => setMeaning(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full" />
                </div>
                <div className="my-3">
                    <h2 className="text-gray-600 mb-2">メモ（任意）</h2>
                    <input
                        type="text"
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-lg w-full"
                    />
                </div>
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
        </div >
    )
}