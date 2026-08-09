import { useRef, useState } from "react";
import { pickRandomWords } from "../utils/calcVocabulary";
import type { scopeType, sendTestType, statusType, testCountType, vocabularyType } from "../types/vocabularyType";
import { useTestVocabulary } from "../hooks/vocabulary/useTestVocabulary";

type Props = {
    vocabularies: vocabularyType[]
    onClose: () => void;
    scope: scopeType;
    test: testCountType;
}

type resultType = {
    id: number;
    word: string;
    meaning: string;
    status: statusType;
}

export const VocabularyTestPopUp = ({ vocabularies, onClose, scope, test }: Props) => {
    const mutation = useTestVocabulary();
    const [testVocabularies] = useState(() => pickRandomWords(vocabularies, scope, test));
    const [number, setNumber] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const isFinished = number >= testVocabularies.length;
    const [result, setResult] = useState<resultType[]>([]);
    const sendData = useRef<sendTestType[]>([]);

    const handleAnswer = (wasCorrect: boolean, vocabulary: vocabularyType) => {
        if (wasCorrect) {
            setCorrectCount((prev) => prev + 1);
        }

        setNumber((prev) => prev + 1);
        setRevealed(false);

        setResult((prev) => [
            ...prev,
            {
                id: vocabulary.id,
                word: vocabulary.word,
                meaning: vocabulary.meaning,
                status: wasCorrect ? "ACQUIRED" : "UNACQUIRED",
            },
        ]);

        sendData.current.push({
            id: vocabulary.id,
            status: wasCorrect ? "ACQUIRED" : "UNACQUIRED",
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-white rounded-lg shadow-xl p-6 w-full mx-4 ${isFinished ? "max-w-2xl" : "max-w-lg"}`}>
                {isFinished ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1.5">テスト結果</p>
                        <p className="text-4xl font-semibold mb-1">
                            <span className="text-green-600">{correctCount}</span>
                            <span className="text-xl text-gray-500 font-normal"> / {testVocabularies.length}</span>
                        </p>
                        <p className="text-sm text-gray-500 mb-5">
                            正答率 {Math.round((correctCount / testVocabularies.length) * 100)}%
                        </p>

                        <div className="max-h-72 overflow-y-auto mb-5 border border-gray-200 rounded-lg">
                            {result.map((r, i) => (
                                <div
                                    key={r.id}
                                    className={
                                        i !== result.length - 1
                                            ? "flex items-center gap-2.5 px-3.5 py-2.5 border-b border-gray-200"
                                            : "flex items-center gap-2.5 px-3.5 py-2.5"
                                    }
                                >
                                    <span
                                        className={
                                            r.status === "ACQUIRED"
                                                ? "w-2 h-2 rounded-full bg-green-500 shrink-0"
                                                : "w-2 h-2 rounded-full bg-red-600 shrink-0"
                                        }
                                    />
                                    <span className="font-medium w-42 shrink-0 truncate  text-left">{r.word}</span>
                                    <span className="text-gray-500 flex-1 truncate text-left">{r.meaning}</span>
                                    <span
                                        className={
                                            r.status === "ACQUIRED"
                                                ? "text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0"
                                                : "text-xs text-red-800 bg-red-100 px-2 py-0.5 rounded-full shrink-0"
                                        }
                                    >
                                        {r.status === "ACQUIRED" ? "わかった" : "わからなかった"}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {mutation.isError &&
                            <p className="my-1 text-sm text-red-600 text-center">
                                {mutation.error.message}
                            </p>
                        }
                        <button
                            onClick={() => {
                                mutation.mutate(sendData.current, { onSuccess: onClose });
                            }}
                            disabled={mutation.isPending}
                            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2.5"
                        >
                            {mutation.isPending ? "保存中..." : "保存する"}
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-xs text-gray-400 text-right mb-2">
                            {number + 1} / {testVocabularies.length}
                        </p>
                        <p className="text-center text-sm text-gray-500 mb-2">この単語の意味は？</p>
                        <p className="text-center text-2xl font-medium mb-4">{testVocabularies[number].word}</p>

                        <div className="relative border border-gray-200 rounded-md min-h-[56px] flex items-center justify-center mb-4">
                            <p>{testVocabularies[number].meaning}</p>
                            {!revealed && (
                                <button
                                    onClick={() => setRevealed(true)}
                                    className="absolute inset-0 bg-red-500/90 text-white rounded-md"
                                >
                                    タップして確認
                                </button>
                            )}
                        </div>

                        {revealed ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAnswer(false, testVocabularies[number])}
                                    className="flex-1 border border-gray-300 rounded-md py-2.5"
                                >
                                    わからなかった
                                </button>
                                <button
                                    onClick={() => handleAnswer(true, testVocabularies[number])}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-md py-2.5"
                                >
                                    わかった
                                </button>
                            </div>
                        ) : (
                            <p className="text-center text-xs text-gray-400">
                                意味を思い出してからタップしてください
                            </p>
                        )}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 text-xs text-gray-400 underline block mx-auto"
                >
                    とじる
                </button>
            </div>
        </div>
    );
};
