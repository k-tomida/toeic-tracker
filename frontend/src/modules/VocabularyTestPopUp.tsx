import { useState } from "react";
import { dummyVocabulary } from "../data/dummyVocabulary";
import { pickRandomWords } from "../utils/calcVocabulary";

type Props = {
    onClose: () => void;
    scope: "all" | "unacquired";
    test: "ten" | "twenty" | "all";
}

export const VocabularyTestPopUp = ({ onClose, scope, test }: Props) => {
    const [vocabularys] = useState(() => pickRandomWords(dummyVocabulary, scope, test));
    const [number, setNumber] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const isFinished = number >= vocabularys.length;

    const handleAnswer = (wasCorrect: boolean) => {
        if (wasCorrect) setCorrectCount((prev) => prev + 1);
        setNumber((prev) => prev + 1);
        setRevealed(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-4">
                {isFinished ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">テスト結果</p>
                        <p className="text-3xl font-medium mb-6">
                            {correctCount} / {vocabularys.length}
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6 py-2.5"
                        >
                            閉じる
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-xs text-gray-400 text-right mb-2">
                            {number + 1} / {vocabularys.length}
                        </p>
                        <p className="text-center text-sm text-gray-500 mb-2">この単語の意味は？</p>
                        <p className="text-center text-2xl font-medium mb-4">{vocabularys[number].word}</p>

                        <div className="relative border border-gray-200 rounded-md min-h-[56px] flex items-center justify-center mb-4">
                            <p>{vocabularys[number].meaning}</p>
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
                                    onClick={() => handleAnswer(false)}
                                    className="flex-1 border border-gray-300 rounded-md py-2.5"
                                >
                                    わからなかった
                                </button>
                                <button
                                    onClick={() => handleAnswer(true)}
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
