import { ProgressBar } from "../../ui/ProgressBar"

export const CategoryBreakdown = () => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-0 min-w-[400px]">
            <h2 className="mb-3 text-xl font-medium text-gray-600">カテゴリ別内訳</h2>
            <div>
                <div className="">
                    <span>リスニング</span>
                    <ProgressBar current={10} target={100} barHeight="h-3" />
                </div>
            </div>
        </div>
    )
}