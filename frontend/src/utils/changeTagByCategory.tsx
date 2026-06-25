import type { ReactNode } from "react"

const tagStyles: Record<string, string> = {
    リスニング: "bg-blue-50 text-blue-800 border border-blue-200",
    単語: "bg-amber-50 text-amber-800 border border-amber-200",
    文法: "bg-green-50 text-green-800 border border-green-200",
    模試: "bg-orange-50 text-orange-800 border border-orange-200",
};
//カテゴリ別にタグの色を変える関数
export const changeTagByCategory = (category: string): ReactNode => {
    return (
        <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${tagStyles[category]}`}>
            {category}
        </span>
    )
};