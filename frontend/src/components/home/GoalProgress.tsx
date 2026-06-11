import { ProgressBar } from "../../ui/ProgressBar"

export const GoalProgress = () => {
    return (
        <div className="bg-white rounded-xl p-4 m-10 border border-gray-300">
            <p className="mb-3 text-xl font-medium text-gray-600">目標スコア達成率</p>
            <div className="flex justify-between items-end">
                <span className="ml-4 text-5xl">{820} <span className="text-xl text-gray-500">/ {900}</span></span>
                <span className="mr-4 text-gray-500">あと<span className="text-xl text-black">{80}点</span></span>
            </div>
            <div className="m-4">
                <ProgressBar current={820} target={900} />
                <div className="flex justify-between mt-2">
                    <span className="text-gray-500">0</span>
                    <span className="text-2xl">{92}%</span>
                    <span className="text-gray-500">{900}</span>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}