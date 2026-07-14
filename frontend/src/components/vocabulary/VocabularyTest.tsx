import { useState } from "react"
import { countUnaquiredVocabulary, countVocabulary } from "../../utils/calcVocabulary"

export const VocabularyTest = () => {
    const [scope, setScope] = useState("all")
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
                        onClick={() => setScope("unaquired")}
                        className={scope === "unaquired"
                            ? "flex-1 text-left rounded-lg p-3 border-[1.5px] border-green-500 bg-green-50"
                            : "flex-1 text-left rounded-lg p-3 border-[1.5px] border-gray-200"}
                    >
                        <p
                            className={
                                scope === "unaquired"
                                    ? "font-medium text-green-800 mb-0.5"
                                    : "font-medium text-gray-900 mb-0.5"
                            }
                        >
                            未習得のみ
                        </p>
                        <p className={scope === "unaquired" ? "text-sm text-green-600" : "text-sm text-gray-500"}>
                            {countUnaquiredVocabulary()}語
                        </p>
                    </button>
                </div>

            </div>
            <div>
                <p className="text-lg text-gray-500 mb-2">問題数</p>
                <div>
                    <button>10問</button>
                    <button>20問</button>
                    <button>すべて</button>
                </div>
            </div>
            <div>
                <button>開始する</button>
            </div>
        </div>
    )
}