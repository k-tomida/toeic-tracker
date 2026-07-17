import type { ReactNode } from "react";
import type { categoryType } from "../types/categoryType";
import type { statusType, wordClassType } from "../types/vocabularyType";

// カテゴリ別にタグの色を変える関数
export const changeTagByCategory = (category: categoryType): ReactNode => {

    const tagStyles: Record<categoryType, string> = {
        listening: "bg-blue-50 text-blue-800 border border-blue-200",
        vocabulary: "bg-amber-50 text-amber-800 border border-amber-200",
        grammar: "bg-green-50 text-green-800 border border-green-200",
        mockExam: "bg-purple-50 text-purple-800 border border-purple-200",
        all: "bg-gray-100 text-gray-700 border border-gray-200",
    };

    const categoryLabelMap: Record<categoryType, string> = {
        listening: "リスニング",
        vocabulary: "単語",
        grammar: "文法",
        mockExam: "模試",
        all: "すべてのカテゴリ",
    };
    return (
        <span
            className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category]}`}
            key={category}
        >
            {categoryLabelMap[category]}
        </span>
    );
};

export const changeTagByWordClass = (wordClass: wordClassType) => {
    const classTagStyles: Record<wordClassType, string> = {
        Noun: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        Verb: "bg-blue-50 text-blue-800 border border-blue-200",
        Adjective: "bg-amber-50 text-amber-800 border border-amber-200",
        Adverb: "bg-purple-50 text-purple-800 border border-purple-200",
        Preposition: "bg-rose-50 text-rose-800 border border-rose-200",
        Conjunction: "bg-slate-50 text-slate-800 border border-slate-200",
        AuxiliaryVerb: "bg-orange-50 text-orange-800 border border-orange-200",
    };

    const classLabels: Record<wordClassType, string> = {
        Noun: "名詞",
        Verb: "動詞",
        Adjective: "形容詞",
        Adverb: "副詞",
        Preposition: "前置詞",
        Conjunction: "接続詞",
        AuxiliaryVerb: "助動詞",
    };
    return (
        <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${classTagStyles[wordClass]}`}>
            {classLabels[wordClass]}
        </span>
    );
};

export const changeTagByStatus = (status: statusType) => {

    const statusTagStyles: Record<statusType, string> = {
        acquired: "bg-emerald-50 text-emerald-800 border border-emerald-200",
        unacquired: "bg-gray-100 text-gray-700 border border-gray-200",
    };

    const statusLabels: Record<statusType, string> = {
        acquired: "習得済み",
        unacquired: "未習得",
    };
    return (
        <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${statusTagStyles[status]}`}>
            {statusLabels[status]}
        </span>
    );
};