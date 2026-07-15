import { useState } from "react"
import { countUnacquiredVocabulary, countVocabulary } from "../../utils/calcVocabulary"
import { VocabularyTestPopUp } from "../../modules/VocabularyTestPopUp"

type scopeType = "all" | "unacquired";
type testCountType = "ten" | "twenty" | "all";

export const VocabularyTest = () => {
    const [scope, setScope] = useState<scopeType>("all")
    const [test, setTest] = useState<testCountType>("all")
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600"> 単語テスト</h2>
            <div>
                <p className="text-lg text-gray-500 mb-2">出題範囲</p>
                <div className="flex gap-2 mb-5">
                    <button
                        onClick={() => setScope("all")}
                        className={scope === "all"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                scope === "all"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            すべて
                        </p>
                        <p className={scope === "all" ? "text-sm text-green-600" : "text-sm text-gray-500"}>
                            {countVocabulary()}語
                        </p>
                    </button>
                    <button
                        onClick={() => setScope("unacquired")}
                        className={scope === "unacquired"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                scope === "unacquired"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            未習得のみ
                        </p>
                        <p className={scope === "unacquired" ? "text-sm text-green-600" : "text-sm text-gray-500"}>
                            {countUnacquiredVocabulary()}語
                        </p>
                    </button>
                </div>

            </div>
            <div>
                <p className="text-lg text-gray-500 mb-2">問題数</p>
                <div className="flex gap-2 mb-5">
                    <button
                        onClick={() => setTest("ten")}
                        className={test === "ten"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                test === "ten"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            10問
                        </p>
                    </button>
                    <button
                        onClick={() => setTest("twenty")}
                        className={test === "twenty"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                test === "twenty"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            20問
                        </p>
                    </button>
                    <button
                        onClick={() => setTest("all")}
                        className={test === "all"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                test === "all"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            すべて
                        </p>
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className={countVocabulary() === 0 ?
                        "bg-red-500 font-medium rounded-lg p-3 text-white w-[400px]" :
                        "bg-green-500 font-medium rounded-lg p-3 text-white w-[400px] hover:bg-green-600 active:bg-green-700"}
                    onClick={() => setIsPopUpOpen(true)}
                    disabled={countVocabulary() === 0}
                >{countVocabulary() === 0 ? "単語がありません" : "開始する"}
                </button>
            </div>
            {isPopUpOpen && <VocabularyTestPopUp onClose={() => setIsPopUpOpen(false)} scope={scope} test={test} />}
        </div>
    )
}
