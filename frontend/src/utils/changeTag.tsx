import type { ReactNode } from "react";
import type { categoryType } from "../types/studySessionType";
import type { statusType, wordClassType } from "../types/vocabularyType";
import type { UseFormRegisterReturn } from "react-hook-form";

// カテゴリ別にタグの色を変える関数
export const changeTagByCategory = (
    category: categoryType,
    type: "span" | "radio",
    checked?: boolean,
    registerProps?: UseFormRegisterReturn<"category">,
    isPending?: boolean
): ReactNode => {

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
        MOCK_EXAM: "模試",
    };

    if (type === "span") {
        return (
            <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category]}`}>
                {categoryLabelMap[category]}
            </span>
        );
    }

    if (type === "radio") {
        return (
            <label
                key={category}
                className={`text-lg px-2 py-0.5 rounded-full font-medium cursor-pointer ${checked ? tagStyles[category] : "bg-gray-100 text-gray-700 border border-gray-200"}`}
            >
                <input
                    {...registerProps}
                    type="radio"
                    disabled={isPending}
                    value={category}
                    className="sr-only"
                />
                {categoryLabelMap[category]}
            </label>
        );
    }
};

export const changeTagByWordClass = (wordClass: wordClassType) => {
    const classTagStyles: Record<wordClassType, string> = {
        NOUN: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        VERB: "bg-blue-50 text-blue-800 border border-blue-200",
        ADJECTIVE: "bg-amber-50 text-amber-800 border border-amber-200",
        ADVERB: "bg-purple-50 text-purple-800 border border-purple-200",
        PREPOSITION: "bg-rose-50 text-rose-800 border border-rose-200",
        CONJUNCTION: "bg-slate-50 text-slate-800 border border-slate-200",
        AUXILIARY_VERB: "bg-orange-50 text-orange-800 border border-orange-200",
    };

    const classLabels: Record<wordClassType, string> = {
        NOUN: "名詞",
        VERB: "動詞",
        ADJECTIVE: "形容詞",
        ADVERB: "副詞",
        PREPOSITION: "前置詞",
        CONJUNCTION: "接続詞",
        AUXILIARY_VERB: "助動詞",
    };
    return (
        <span className={`text-sm px-2 py-0.5 rounded-full font-medium truncate ${classTagStyles[wordClass]}`}>
            {classLabels[wordClass]}
        </span>
    );
};

export const changeTagByStatus = (
    status: statusType,
    type: "span" | "radio",
    checked?: boolean,
    registerProps?: UseFormRegisterReturn<"status">,
    isPending?: boolean) => {

    const statusTagStyles: Record<statusType, string> = {
        ACQUIRED: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        UNACQUIRED: "bg-red-100 text-red-700 border border-red-200",
    };

    const statusLabels: Record<statusType, string> = {
        ACQUIRED: "習得済み",
        UNACQUIRED: "未習得",
    };
    if (type === "span") {
        return (
            <span className={`text-sm px-2 py-0.5 rounded-full font-medium truncate ${statusTagStyles[status]}`}>
                {statusLabels[status]}
            </span>
        );
    };
    if (type === "radio") {
        return (
            <label
                key={status}
                className={`text-lg px-8 py-2 rounded-full font-medium ${checked ? statusTagStyles[status] : "bg-gray-100 text-gray-700 border border-gray-200"}`}
            >
                <input
                    {...registerProps}
                    type="radio"
                    disabled={isPending}
                    value={status}
                    className="sr-only"

                />
                {statusLabels[status]}
            </label>

        );
    };

};