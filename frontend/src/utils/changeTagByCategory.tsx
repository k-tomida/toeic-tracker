import type { ReactNode } from "react";
import type { categoryType } from "../types/categoryType";

const tagStyles: Record<categoryType, string> = {
    listening: "bg-blue-50 text-blue-800 border border-blue-200",
    vocabulary: "bg-amber-50 text-amber-800 border border-amber-200",
    grammar: "bg-green-50 text-green-800 border border-green-200",
    mockExam: "bg-orange-50 text-orange-800 border border-orange-200",
    all: "bg-gray-100 text-gray-700 border border-gray-200",
};

const categoryLabelMap: Record<categoryType, string> = {
    listening: "リスニング",
    vocabulary: "単語",
    grammar: "文法",
    mockExam: "模試",
    all: "すべてのカテゴリ",
};

// カテゴリ別にタグの色を変える関数
export const changeTagByCategory = (category: categoryType): ReactNode => {
    return (
        <span
            className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category]}`}
            key={category}
        >
            {categoryLabelMap[category]}
        </span>
    );
};