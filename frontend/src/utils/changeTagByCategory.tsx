import type { ReactNode } from "react"

const tagStyles: Record<string, string> = {
    リスニング: "bg-blue-50 text-blue-800",
    単語: "bg-amber-50 text-amber-800",
    文法: "bg-green-50 text-green-800",
    模試: "bg-orange-50 text-orange-800",
};
//カテゴリ別にタグの色を変える関数
export const changeTagByCategory = (category: string): ReactNode => {
    return (
        <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category] ?? "bg-gray-100 text-gray-700"}`}>
            {category}
        </span>
    )
};