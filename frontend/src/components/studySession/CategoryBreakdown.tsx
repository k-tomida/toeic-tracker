import { ProgressBar } from "../../ui/ProgressBar"

export const CategoryBreakdown = () => {
    return (
        <div className="bg-white rounded-xl p-4 border border-gray-300 flex-1 min-w-[400px]">
            <h2 className="mb-5 text-xl font-medium text-gray-600">カテゴリ別内訳</h2>
            <div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20 flex items-center gap-2"><div className="rounded-full bg-green-400 w-3 h-3"></div>単語</span>
                    <ProgressBar current={10} target={100} barHeight="h-3" />
                    <span>{22}h</span>
                </div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20">文法</span>
                    <ProgressBar current={10} target={100} barHeight="h-3" />
                    <span>{22}h</span>
                </div>
                <div className="flex items-center gap-10 mb-6 justify-between">
                    <span className="w-20">リスニング</span>
                    <ProgressBar current={10} target={100} barHeight="h-3" />
                    <span>{22}h</span>
                </div>
                <div className="flex items-center gap-10 mb-5 justify-between">
                    <span className="w-20">模試</span>
                    <ProgressBar current={10} target={100} barHeight="h-3" />
                    <span>{22}h</span>
                </div>
            </div>
        </div>
    )
}